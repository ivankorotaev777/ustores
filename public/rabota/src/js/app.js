// ============================================================================
// Карта вакансий Ustores: где сейчас нужны администраторы пунктов выдачи.
//
// Данные читаются прямо из рабочей таблицы локаций (лист Main) при каждом
// открытии страницы, поэтому карта всегда совпадает с таблицей. Если таблица
// недоступна, показываем снимок из src/data/fallback.js.
//
// Правила чтения таблицы:
//   колонка «Статус»                  — «Закрыта» не показываем вообще;
//   колонка «Потребность в персонале» — пусто значит, что людей не ищем;
//   колонка «Дата выхода»             — ASAP или дата открытия пункта.
// ============================================================================

import { CONFIG } from "./config.js";
import { SNAPSHOT, SNAPSHOT_AT } from "../data/fallback.js";

const SHEET_ID = "1O9j79aN8E_xlaGiOWy9SJNH4BGG0g5nnaI4hfISW1hc";
const SHEET_GID = "58406550";
const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${SHEET_GID}`;

const BOT = "https://t.me/Mila2_ustores_bot";
const CITY_CENTER = { lat: 41.3111, lng: 69.2797 };
const TASHKENT_LL = `${CITY_CENTER.lng},${CITY_CENTER.lat}`;
const NEAREST_COUNT = 5;

const COLOR = { hiring: "#16a34a", soon: "#f59e0b", idle: "#94a3b8" };

let ALL = [];          // все пункты, кроме закрытых
let filtered = [];     // с учётом фильтров
let lastOrigin = null; // последняя точка пользователя

// ---------------------------------------------------------------- данные ---

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') { cell += '"'; i++; }
        else quoted = false;
      } else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (c !== "\r") cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const key = (s) => String(s || "").replace(/\s+/g, " ").trim().toLowerCase();

function toNumber(v) {
  const s = String(v || "").trim().replace(",", ".");
  if (!s) return null;
  let x = Number(s);
  if (!isFinite(x)) return null;
  // координаты в таблице записаны без точки: 41319058 = 41.319058
  while (Math.abs(x) > 180) x /= 10;
  return x;
}

function coordsOf(a, b, link) {
  const x = toNumber(a), y = toNumber(b);
  if (x !== null && y !== null) {
    const [lat, lng] = x > 35 && x < 46 ? [x, y] : [y, x];
    if (lat > 35 && lat < 46 && lng > 55 && lng < 75) return { lat, lng };
  }
  const m = String(link || "").match(/(\d{2}\.\d{4,})[%,]?C?(\d{2}\.\d{4,})/);
  if (m) {
    const p = Number(m[1]), q = Number(m[2]);
    return p > 35 && p < 46 ? { lat: p, lng: q } : { lat: q, lng: p };
  }
  return null;
}

// Telegram принимает в ссылке ?start= только латиницу, цифры, дефис и
// подчёркивание, поэтому кириллические названия транслитерируем. Тот же
// алгоритм повторён в боте, иначе он не поймёт, какой пункт выбрал человек.
const TRANSLIT_SLUG = {
  а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",
  м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",
  ш:"sh",щ:"sch",ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya",
};

function slugify(name) {
  const out = [];
  for (const ch of String(name).toLowerCase()) {
    if (ch in TRANSLIT_SLUG) out.push(TRANSLIT_SLUG[ch]);
    else if (/[a-z0-9]/.test(ch)) out.push(ch);
    else out.push("-");
  }
  return out.join("").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "pvz";
}

function rowsToLocations(rows) {
  const idx = {};
  rows[0].forEach((h, i) => { idx[key(h)] = i; });
  const get = (row, name) => {
    const i = idx[key(name)];
    return i === undefined ? "" : String(row[i] || "").trim();
  };
  const out = [];
  const seen = new Set();
  for (const row of rows.slice(1)) {
    const name = get(row, "Внутреннее название") || get(row, "Название для отчетности");
    const status = get(row, "Статус");
    if (!name || !status) continue;
    if (/^закры/i.test(status)) continue;            // закрытые пункты не показываем
    const c = coordsOf(
      get(row, "Координаты Долгота (latitude)"),
      get(row, "Координаты Широта (longitude)"),
      get(row, "Ссылка на локацию")
    );
    if (!c) continue;
    let id = slugify(name);
    while (seen.has(id)) id += "-2";
    seen.add(id);
    const need = parseInt(get(row, "Потребность в персонале"), 10);
    out.push({
      id,
      name,
      brand: get(row, "Тип бизнеса") || "",
      status,
      address: get(row, "Адрес"),
      need: isFinite(need) ? need : 0,
      deadline: get(row, "Дата выхода"),
      lat: c.lat,
      lng: c.lng,
    });
  }
  return out;
}

async function loadLocations() {
  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("sheet_http_" + res.status);
    const list = rowsToLocations(parseCsv(await res.text()));
    if (list.length) {
      stamp(`Данные из рабочей таблицы, обновлены только что · карта © OpenStreetMap`);
      return list;
    }
    throw new Error("sheet_empty");
  } catch {
    stamp(`Таблица недоступна, показываем снимок от ${SNAPSHOT_AT} · карта © OpenStreetMap`);
    return SNAPSHOT.filter((x) => !/^закры/i.test(x.status || ""));
  }
}

// ------------------------------------------------------------- состояние ---

const kind = (loc) => {
  if (!loc.need) return "idle";
  return /^работа/i.test(loc.status) ? "hiring" : "soon";
};

const isHiring = (loc) => loc.need > 0;

function applyFilters() {
  const onlyHiring = els.onlyHiring.checked;
  const brand = document.querySelector(".chip.is-on")?.dataset.brand || "";
  filtered = ALL.filter(
    (l) => (!onlyHiring || isHiring(l)) && (!brand || (l.brand || "").toLowerCase() === brand.toLowerCase())
  );
  renderMarkers();
  renderCards();
  if (lastOrigin) renderResults(lastOrigin, nearest(lastOrigin));
}

// -------------------------------------------------------------- геометрия ---

function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180, la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const fmtDist = (km) => (km < 1 ? `${Math.round(km * 1000)} м` : `${km.toFixed(1)} км`);

function nearest(origin, count = NEAREST_COUNT) {
  const pool = filtered.length ? filtered : ALL;
  return pool.map((loc) => ({ loc, km: haversineKm(origin, loc) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}

const routeLink = (origin, loc) =>
  origin
    ? `https://yandex.ru/maps/?rtext=${origin.lat},${origin.lng}~${loc.lat},${loc.lng}&rtt=mt`
    : `https://yandex.ru/maps/?pt=${loc.lng},${loc.lat}&z=16&l=map`;

const applyLink = (loc) => `${BOT}?start=pvz_${encodeURIComponent(loc.id)}`;

// ----------------------------------------------------- подсказки адресов ---

const TRANSLIT = {
  а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"j",з:"z",и:"i",й:"y",к:"k",л:"l",
  м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"x",ц:"ts",ч:"ch",ш:"sh",
  щ:"sh",ъ:"",ы:"i",ь:"",э:"e",ю:"yu",я:"ya",
};
const translit = (s) => s.toLowerCase().split("").map((c) => (c in TRANSLIT ? TRANSLIT[c] : c)).join("");
const inTashkent = (lat, lng) => lat >= 41.10 && lat <= 41.50 && lng >= 69.00 && lng <= 69.70;

async function suggestPhoton(query) {
  const q = /[а-яё]/i.test(query) ? translit(query) : query;
  const url = `https://photon.komoot.io/api/?limit=8&lang=en&lat=${CITY_CENTER.lat}&lon=${CITY_CENTER.lng}&q=${encodeURIComponent(q)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("suggest_failed");
  const data = await res.json();
  return (data.features || []).map((f) => {
    const [lng, lat] = f.geometry.coordinates;
    const p = f.properties || {};
    const main = p.name || [p.street, p.housenumber].filter(Boolean).join(" ") || p.city || "Без названия";
    const sub = [...new Set([p.district, p.city].filter(Boolean))].filter((x) => x !== main).join(", ");
    return { lat, lng, main, sub, full: [main, sub].filter(Boolean).join(", ") };
  }).filter((s) => inTashkent(s.lat, s.lng)).slice(0, 6);
}

async function suggestYandex(query) {
  const url = "https://suggest-maps.yandex.ru/v1/suggest" +
    `?apikey=${CONFIG.yandexSuggestKey}&text=${encodeURIComponent(query)}` +
    `&lang=ru_RU&results=6&ll=${TASHKENT_LL}&spn=0.5,0.4&print_address=1&types=geo`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("yandex_suggest_failed");
  const data = await res.json();
  return (data.results || []).map((r) => {
    const main = r.title?.text || "";
    const sub = r.subtitle?.text || "";
    return { main, sub, full: r.address?.formatted_address || [main, sub].filter(Boolean).join(", ") };
  });
}

async function geocodeYandex(text) {
  const url = "https://geocode-maps.yandex.ru/1.x/" +
    `?apikey=${CONFIG.yandexGeocoderKey}&format=json&lang=ru_RU&results=1` +
    `&ll=${TASHKENT_LL}&spn=0.5,0.4&geocode=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("yandex_geocode_failed");
  const data = await res.json();
  const member = data?.response?.GeoObjectCollection?.featureMember?.[0];
  if (!member) return null;
  const [lng, lat] = member.GeoObject.Point.pos.split(" ").map(Number);
  return { lat, lng };
}

async function suggest(query) {
  if (CONFIG.yandexSuggestKey) {
    try {
      const items = await suggestYandex(query);
      if (items.length) return items;
    } catch { /* ключ не активен или лимит — идём в запасной поиск */ }
  }
  return suggestPhoton(query);
}

async function resolveCoords(item) {
  if (item.lat != null) return { lat: item.lat, lng: item.lng };
  if (CONFIG.yandexGeocoderKey) {
    try {
      const c = await geocodeYandex(item.full);
      if (c) return c;
    } catch { /* запасной путь ниже */ }
  }
  const alt = await suggestPhoton(item.full);
  return alt.length ? { lat: alt[0].lat, lng: alt[0].lng } : null;
}

// ------------------------------------------------------------------ вид ----

const els = {
  input: document.getElementById("addr"),
  search: document.getElementById("searchBtn"),
  geo: document.getElementById("geoBtn"),
  results: document.getElementById("results"),
  state: document.getElementById("searchState"),
  list: document.getElementById("allList"),
  hiring: document.querySelectorAll("[data-hiring]"),
  hiringWord: document.querySelectorAll("[data-hiring-word]"),
  onlyHiring: document.getElementById("onlyHiring"),
  stamp: document.getElementById("dataStamp"),
};

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const stamp = (t) => { if (els.stamp) els.stamp.textContent = t; };

function pluralPunkt(n) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "пункт";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "пункта";
  return "пунктов";
}

function setState(msg) {
  els.state.textContent = msg || "";
  els.state.style.display = msg ? "block" : "none";
}

function badge(loc) {
  const k = kind(loc);
  if (k === "hiring") return `<span class="tag hiring">нужны люди${loc.need > 1 ? `: ${loc.need}` : ""}</span>`;
  if (k === "soon") return `<span class="tag soon">откроется ${escapeHtml(loc.deadline || "скоро")}</span>`;
  return `<span class="tag">набора нет</span>`;
}

function renderResults(origin, ranked) {
  lastOrigin = origin;
  els.results.innerHTML = "";
  if (!ranked.length) {
    setState("Подходящих пунктов не нашлось. Снимите фильтры или напишите нам — подскажем ближайший.");
    return;
  }
  setState("");
  ranked.forEach((item, i) => {
    const li = document.createElement("li");
    if (i === 0) li.className = "is-nearest";
    li.innerHTML = `
      <span class="rank">${i + 1}</span>
      <div class="r-body">
        <div class="r-name">${escapeHtml(item.loc.name)}</div>
        <div class="r-addr">${escapeHtml(item.loc.address || "")}</div>
        <div class="r-meta">
          <span class="r-dist">${fmtDist(item.km)}</span>
          ${badge(item.loc)}
          <span class="tag">${escapeHtml(item.loc.brand || "")}</span>
        </div>
      </div>
      <a class="r-apply" href="${applyLink(item.loc)}" target="_blank" rel="noopener">Откликнуться →</a>`;
    li.addEventListener("click", (e) => {
      if (e.target.closest(".r-apply")) return;
      focusLocation(item.loc);
    });
    els.results.appendChild(li);
  });
  highlightOnMap(origin, ranked);
}

function renderCards() {
  const hiring = ALL.filter(isHiring);
  const show = filtered.filter(isHiring).length ? filtered.filter(isHiring) : hiring;
  els.list.innerHTML = "";
  show.sort((a, b) => (kind(a) === "hiring" ? 0 : 1) - (kind(b) === "hiring" ? 0 : 1) || a.name.localeCompare(b.name));
  show.forEach((loc) => {
    const card = document.createElement("div");
    card.className = "loc-card" + (kind(loc) === "hiring" ? " hiring" : "");
    card.innerHTML = `
      ${badge(loc)}
      <h3>${escapeHtml(loc.name)}</h3>
      <p>${escapeHtml(loc.address || "Адрес уточним в переписке")}</p>
      <p style="margin-top:6px">${escapeHtml(loc.brand || "")}</p>
      <a class="card-link" href="${applyLink(loc)}" target="_blank" rel="noopener">Откликнуться на этот пункт →</a>`;
    els.list.appendChild(card);
  });
  els.hiring.forEach((n) => (n.textContent = String(hiring.length)));
  els.hiringWord.forEach((n) => (n.textContent = pluralPunkt(hiring.length)));
}

// ------------------------------------------------------------------ карта ---

const L = window.L;
let lmap = null, userMarker = null, layer = null, highlighted = null;

function pinSVG(color) {
  return `<svg viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="${color}"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/></svg>`;
}

function pinIcon(loc, big = false) {
  const size = big ? 38 : loc.need ? 28 : 20;
  return L.divIcon({
    className: "",
    html: `<div class="pin${big ? " is-nearest" : ""}">${pinSVG(COLOR[kind(loc)])}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 2],
  });
}

function popupHtml(loc, origin) {
  return `
    <div class="p-name">${escapeHtml(loc.name)}</div>
    <div class="p-addr">${escapeHtml(loc.address || "")}</div>
    <div>${badge(loc)} <span class="tag">${escapeHtml(loc.brand || "")}</span></div>
    <a class="p-apply" href="${applyLink(loc)}" target="_blank" rel="noopener">Откликнуться</a>
    <a class="r-apply" style="margin-left:8px" href="${routeLink(origin, loc)}" target="_blank" rel="noopener">Маршрут →</a>`;
}

function initMap() {
  if (!L || !document.getElementById("map")) return;
  lmap = L.map("map", { scrollWheelZoom: false, zoomSnap: 0.25 }).setView([CITY_CENTER.lat, CITY_CENTER.lng], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(lmap);
  layer = L.layerGroup().addTo(lmap);
}

function renderMarkers() {
  if (!lmap) return;
  layer.clearLayers();
  const pts = [];
  filtered.forEach((loc) => {
    const m = L.marker([loc.lat, loc.lng], { icon: pinIcon(loc) })
      .addTo(layer)
      .bindPopup(popupHtml(loc, lastOrigin));
    loc.__marker = m;
    pts.push([loc.lat, loc.lng]);
  });
  if (pts.length && !lastOrigin) lmap.fitBounds(L.latLngBounds(pts), { padding: [24, 24] });
}

function highlightOnMap(origin, ranked) {
  if (!lmap) return;
  if (highlighted?.__marker) highlighted.__marker.setIcon(pinIcon(highlighted));
  filtered.forEach((loc) => loc.__marker && loc.__marker.setPopupContent(popupHtml(loc, origin)));

  const top = ranked[0];
  if (top?.loc.__marker) {
    top.loc.__marker.setIcon(pinIcon(top.loc, true));
    highlighted = top.loc;
  }
  if (userMarker) userMarker.remove();
  userMarker = L.marker([origin.lat, origin.lng], {
    icon: L.divIcon({ className: "", html: `<div class="user-dot"></div>`, iconSize: [16, 16], iconAnchor: [8, 8] }),
    zIndexOffset: 1000,
  }).addTo(lmap).bindPopup("Вы здесь");

  lmap.fitBounds([[origin.lat, origin.lng], ...ranked.slice(0, 3).map((r) => [r.loc.lat, r.loc.lng])], {
    padding: [60, 60], maxZoom: 15,
  });
  if (top?.loc.__marker) top.loc.__marker.openPopup();
}

function focusLocation(loc) {
  if (!lmap || !loc.__marker) return;
  lmap.setView([loc.lat, loc.lng], 16, { animate: true });
  loc.__marker.openPopup();
}

// ------------------------------------------------------------- обработчики ---

async function chooseOrigin(item) {
  els.input.value = item.full;
  let origin = { lat: item.lat, lng: item.lng };
  if (item.lat == null) {
    setState("Определяем адрес…");
    try { origin = await resolveCoords(item); } catch { origin = null; }
    if (!origin) { setState("Не удалось определить адрес. Попробуйте другой ориентир."); return; }
  }
  setState("");
  renderResults(origin, nearest(origin));
}

async function doSearch() {
  const q = els.input.value.trim();
  if (!q) { els.input.focus(); return; }
  hideSuggest();
  setState("Ищем адрес…");
  els.results.innerHTML = "";
  try {
    const items = await suggest(q);
    if (!items.length) { setState("Не удалось распознать адрес. Уточните улицу или ориентир."); return; }
    chooseOrigin(items[0]);
  } catch {
    setState("Ошибка поиска адреса. Попробуйте ещё раз.");
  }
}

function useMyLocation() {
  if (!navigator.geolocation) { setState("Геолокация недоступна в этом браузере."); return; }
  setState("Определяем ваше местоположение…");
  els.results.innerHTML = "";
  navigator.geolocation.getCurrentPosition(
    (pos) => renderResults({ lat: pos.coords.latitude, lng: pos.coords.longitude }, nearest({ lat: pos.coords.latitude, lng: pos.coords.longitude })),
    () => setState("Не удалось получить геолокацию. Введите адрес вручную."),
    { enableHighAccuracy: true, timeout: 8000 }
  );
}

// --- выпадающие подсказки ---
const sugEl = document.getElementById("suggest");
let sugItems = [], sugActive = -1, sugSeq = 0;

function debounce(fn, ms) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

function hideSuggest() {
  sugEl.hidden = true; sugEl.innerHTML = ""; sugItems = []; sugActive = -1;
  els.input.setAttribute("aria-expanded", "false");
}

function setActive(i) {
  const lis = [...sugEl.querySelectorAll("li:not(.s-empty)")];
  lis.forEach((li) => li.classList.remove("active"));
  sugActive = i;
  if (i >= 0 && lis[i]) { lis[i].classList.add("active"); lis[i].scrollIntoView({ block: "nearest" }); }
}

function renderSuggest(items) {
  sugItems = items; sugActive = -1; sugEl.innerHTML = "";
  if (!items.length) {
    sugEl.innerHTML = `<li class="s-empty" aria-disabled="true">Ничего не найдено</li>`;
  } else {
    items.forEach((it, i) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.innerHTML = `<div class="s-main">${escapeHtml(it.main)}</div>` +
        (it.sub ? `<div class="s-sub">${escapeHtml(it.sub)}</div>` : "");
      li.addEventListener("mousedown", (e) => { e.preventDefault(); hideSuggest(); chooseOrigin(it); });
      li.addEventListener("mouseenter", () => setActive(i));
      sugEl.appendChild(li);
    });
  }
  sugEl.hidden = false;
  els.input.setAttribute("aria-expanded", "true");
}

const onType = debounce(async () => {
  const q = els.input.value.trim();
  if (q.length < 3) { hideSuggest(); return; }
  const seq = ++sugSeq;
  try {
    const items = await suggest(q);
    if (seq === sugSeq) renderSuggest(items);
  } catch { hideSuggest(); }
}, 250);

els.input.addEventListener("input", onType);
els.input.addEventListener("keydown", (e) => {
  if (sugEl.hidden || !sugItems.length) { if (e.key === "Enter") doSearch(); return; }
  if (e.key === "ArrowDown") { e.preventDefault(); setActive(Math.min(sugActive + 1, sugItems.length - 1)); }
  else if (e.key === "ArrowUp") { e.preventDefault(); setActive(Math.max(sugActive - 1, 0)); }
  else if (e.key === "Enter") {
    e.preventDefault();
    if (sugActive >= 0) { const it = sugItems[sugActive]; hideSuggest(); chooseOrigin(it); }
    else doSearch();
  } else if (e.key === "Escape") hideSuggest();
});
els.input.addEventListener("focus", () => { if (sugItems.length) sugEl.hidden = false; });
document.addEventListener("click", (e) => { if (!e.target.closest(".ac")) hideSuggest(); });

els.search.addEventListener("click", doSearch);
els.geo.addEventListener("click", useMyLocation);
els.onlyHiring.addEventListener("change", applyFilters);
document.getElementById("brandChips").addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  document.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-on"));
  chip.classList.add("is-on");
  applyFilters();
});

// ------------------------------------------------------------------ старт ---

(async function start() {
  initMap();
  ALL = await loadLocations();
  applyFilters();
})();
