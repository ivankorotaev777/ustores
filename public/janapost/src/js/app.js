// ============================================================================
// Jana Post locator — поиск ближайшего пункта выдачи по адресу/геолокации.
//
// Карта — интерактивный Leaflet (OpenStreetMap, без API-ключа): маркеры строятся
// из src/data/locations.js, поэтому всегда соответствуют таблице. Поиск геокодит
// адрес пользователя через бесплатный Nominatim, считает расстояние по формуле
// гаверсинуса, сортирует, показывает ближайшие и подсвечивает их на карте.
//
// Для продакшена при большом трафике лучше Яндекс Геокодер (нужен API-ключ) —
// см. README. Nominatim хватает для промо-страницы с низкой нагрузкой.
// ============================================================================

import { LOCATIONS, CITY_CENTER } from "../data/locations.js";
import { CONFIG } from "./config.js";

const TASHKENT_BBOX = "69.10,41.18,69.55,41.40"; // minLon,minLat,maxLon,maxLat — рамка поиска
const NEAREST_COUNT = 5;
const TASHKENT_LL = `${CITY_CENTER.lng},${CITY_CENTER.lat}`; // для Яндекса: lon,lat

// ---------- геометрия ----------
function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function fmtDist(km) {
  if (km < 1) return `${Math.round(km * 1000)} м`;
  return `${km.toFixed(1)} км`;
}

function nearest(origin, count = NEAREST_COUNT) {
  return LOCATIONS
    .map((loc) => ({ loc, km: haversineKm(origin, loc) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count);
}

// ссылка-маршрут в Яндекс.Картах от точки пользователя до пункта
function routeLink(origin, loc) {
  if (origin) {
    return `https://yandex.ru/maps/?rtext=${origin.lat},${origin.lng}~${loc.lat},${loc.lng}&rtt=auto`;
  }
  return `https://yandex.ru/maps/?pt=${loc.lng},${loc.lat}&z=16&l=map`;
}

// ---------- геокодинг/подсказки адреса (Photon, OSM) ----------
// Photon создан для автодополнения (в отличие от Nominatim, где автокомплит
// запрещён). Возвращает координаты сразу — повторный геокодинг не нужен.
function photonLabel(p) {
  const main =
    p.name ||
    [p.street, p.housenumber].filter(Boolean).join(" ") ||
    p.city ||
    "Без названия";
  const subParts = [p.district, p.city].filter(Boolean);
  const sub = [...new Set(subParts)].filter((x) => x !== main).join(", ");
  return { main, sub, full: [main, sub].filter(Boolean).join(", ") };
}

// В OSM по Узбекистану адреса записаны латиницей, а аудитория вводит кириллицей,
// поэтому транслитерируем запрос (рус. → лат.) перед поиском.
const TRANSLIT = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "j", з: "z", и: "i",
  й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
  у: "u", ф: "f", х: "x", ц: "ts", ч: "ch", ш: "sh", щ: "sh", ъ: "", ы: "i",
  ь: "", э: "e", ю: "yu", я: "ya",
};
function translit(s) {
  return s.toLowerCase().split("").map((c) => (c in TRANSLIT ? TRANSLIT[c] : c)).join("");
}

const [BB_W, BB_S, BB_E, BB_N] = TASHKENT_BBOX.split(",").map(Number);
function inTashkent(lat, lng) {
  return lat >= BB_S && lat <= BB_N && lng >= BB_W && lng <= BB_E;
}

async function suggestPhoton(query) {
  const q = /[а-яё]/i.test(query) ? translit(query) : query;
  const url =
    "https://photon.komoot.io/api/?limit=8&lang=en" +
    `&lat=${CITY_CENTER.lat}&lon=${CITY_CENTER.lng}` +
    `&q=${encodeURIComponent(q)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("suggest_failed");
  const data = await res.json();
  return (data.features || [])
    .map((f) => {
      const [lng, lat] = f.geometry.coordinates;
      return { lat, lng, ...photonLabel(f.properties || {}) };
    })
    .filter((s) => inTashkent(s.lat, s.lng))
    .slice(0, 6);
}

async function photonGeocode(text) {
  const items = await suggestPhoton(text);
  return items.length ? { lat: items[0].lat, lng: items[0].lng } : null;
}

// ---------- Яндекс Геосаджест + Геокодер ----------
// Саджест отдаёт только текст адреса (без координат), поэтому по выбору адреса
// координаты берём через Геокодер. Оба ключа ограничены по Referer в кабинете.
async function suggestYandex(query) {
  const url =
    "https://suggest-maps.yandex.ru/v1/suggest" +
    `?apikey=${CONFIG.yandexSuggestKey}&text=${encodeURIComponent(query)}` +
    `&lang=ru_RU&results=6&ll=${TASHKENT_LL}&spn=0.5,0.4&print_address=1&types=geo`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("yandex_suggest_failed");
  const data = await res.json();
  return (data.results || []).map((r) => {
    const main = (r.title && r.title.text) || "";
    const sub = (r.subtitle && r.subtitle.text) || "";
    // координат нет — геокодим по formatted_address (точнее сырого текста)
    const full =
      (r.address && r.address.formatted_address) ||
      [main, sub].filter(Boolean).join(", ");
    return { main, sub, full, needGeocode: true };
  });
}

async function geocodeYandex(text) {
  const url =
    "https://geocode-maps.yandex.ru/1.x/" +
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

// ---------- единый интерфейс: Яндекс с фолбэком на OSM/Photon ----------
async function suggest(query) {
  if (CONFIG.yandexSuggestKey) {
    try {
      const items = await suggestYandex(query);
      if (items.length) return items;
    } catch {
      /* ключ ещё активируется / лимит / сеть — падаем на Photon */
    }
  }
  return suggestPhoton(query);
}

// вернуть координаты для выбранной подсказки
async function resolveCoords(item) {
  if (item.lat != null) return { lat: item.lat, lng: item.lng }; // Photon — координаты уже есть
  if (CONFIG.yandexGeocoderKey) {
    try {
      const c = await geocodeYandex(item.full);
      if (c) return c;
    } catch {
      /* фолбэк ниже */
    }
  }
  return photonGeocode(item.full); // запасной геокодинг по OSM
}

// ---------- рендер ----------
const els = {
  input: document.getElementById("addr"),
  search: document.getElementById("searchBtn"),
  geo: document.getElementById("geoBtn"),
  results: document.getElementById("results"),
  state: document.getElementById("searchState"),
  list: document.getElementById("allList"),
  count: document.querySelectorAll("[data-count]"),
  countWord: document.querySelectorAll("[data-count-word]"),
};

// склонение: 1 пункт / 2 пункта / 5 пунктов
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

function renderResults(origin, ranked) {
  els.results.innerHTML = "";
  if (!ranked.length) {
    setState("Пункты не найдены.");
    return;
  }
  setState("");
  ranked.forEach((item, i) => {
    const li = document.createElement("li");
    if (i === 0) li.className = "is-nearest";
    li.title = "Показать на карте";
    li.innerHTML = `
      <span class="rank">${i + 1}</span>
      <div class="r-body">
        <div class="r-name">${escapeHtml(item.loc.name)}</div>
        <div class="r-addr">${escapeHtml(item.loc.address)}</div>
        <div class="r-meta">
          <span class="r-dist">${fmtDist(item.km)}</span>
          ${item.loc.hours ? `<span>${escapeHtml(item.loc.hours)}</span>` : ""}
        </div>
      </div>
      <a class="r-route" href="${routeLink(origin, item.loc)}" target="_blank" rel="noopener">Маршрут →</a>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.closest(".r-route")) return; // клик по «Маршрут» — не перехватываем
      focusLocation(item.loc);
    });
    els.results.appendChild(li);
  });
  highlightOnMap(origin, ranked);
}

function renderAll() {
  els.list.innerHTML = "";
  LOCATIONS.forEach((loc) => {
    const card = document.createElement("div");
    card.className = "loc-card" + (loc.isHub ? " hub" : "");
    card.innerHTML = `
      ${loc.isHub ? `<span class="badge">Главный пункт</span>` : ""}
      <h3>${escapeHtml(loc.name)}</h3>
      <p>${escapeHtml(loc.address)}</p>
      ${loc.hours ? `<p style="margin-top:6px">${escapeHtml(loc.hours)}</p>` : ""}
      <a class="card-link" href="${routeLink(null, loc)}" target="_blank" rel="noopener">Открыть на карте →</a>
    `;
    els.list.appendChild(card);
  });
  els.count.forEach((n) => (n.textContent = String(LOCATIONS.length)));
  els.countWord.forEach((n) => (n.textContent = pluralPunkt(LOCATIONS.length)));
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

// ---------- карта (Leaflet) ----------
const L = window.L;
const BRAND = "#10b981", BRAND_DARK = "#059669";
let lmap = null;
let userMarker = null;
let highlightedLoc = null;

function pinSVG(color) {
  return `<svg viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="${color}"/>
    <circle cx="12" cy="12" r="5" fill="#fff"/></svg>`;
}

function pinIcon(isNearest) {
  const size = isNearest ? 36 : 26;
  return L.divIcon({
    className: "",
    html: `<div class="pin${isNearest ? " is-nearest" : ""}">${pinSVG(isNearest ? BRAND_DARK : BRAND)}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 2],
  });
}

function popupHtml(loc, origin) {
  return `
    <div class="p-name">${escapeHtml(loc.name)}</div>
    <div class="p-addr">${escapeHtml(loc.address)}</div>
    ${loc.phone ? `<div class="p-phone">📞 ${escapeHtml(loc.phone)}</div>` : ""}
    <a class="p-route" href="${routeLink(origin, loc)}" target="_blank" rel="noopener">Маршрут →</a>`;
}

function initMap() {
  if (!L || !document.getElementById("map")) return;
  lmap = L.map("map", { scrollWheelZoom: false, zoomSnap: 0.25 }).setView([CITY_CENTER.lat, CITY_CENTER.lng], 11);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(lmap);

  const pts = [];
  LOCATIONS.forEach((loc) => {
    const m = L.marker([loc.lat, loc.lng], { icon: pinIcon(false) })
      .addTo(lmap)
      .bindPopup(popupHtml(loc, null));
    loc.__marker = m;
    pts.push([loc.lat, loc.lng]);
  });
  if (pts.length) {
    const b = L.latLngBounds(pts);
    lmap.fitBounds(b, { padding: [12, 12] });
    lmap.setView(b.getCenter(), lmap.getZoom() + 1); // на ступень крупнее
  }
}

// подсветить ближайший пункт + точку пользователя, подогнать вид
function highlightOnMap(origin, ranked) {
  if (!lmap) return;
  if (highlightedLoc && highlightedLoc.__marker) {
    highlightedLoc.__marker.setIcon(pinIcon(false));
  }
  // обновить popup-маршруты с учётом точки старта
  LOCATIONS.forEach((loc) => loc.__marker && loc.__marker.setPopupContent(popupHtml(loc, origin)));

  const top = ranked[0];
  if (top && top.loc.__marker) {
    top.loc.__marker.setIcon(pinIcon(true));
    highlightedLoc = top.loc;
  }

  if (userMarker) userMarker.remove();
  userMarker = L.marker([origin.lat, origin.lng], {
    icon: L.divIcon({ className: "", html: `<div class="user-dot"></div>`, iconSize: [16, 16], iconAnchor: [8, 8] }),
    zIndexOffset: 1000,
  }).addTo(lmap).bindPopup("Вы здесь");

  const bounds = [[origin.lat, origin.lng], ...ranked.slice(0, 3).map((r) => [r.loc.lat, r.loc.lng])];
  lmap.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
  if (top && top.loc.__marker) top.loc.__marker.openPopup();
}

function focusLocation(loc) {
  if (!lmap || !loc.__marker) return;
  lmap.setView([loc.lat, loc.lng], 16, { animate: true });
  loc.__marker.openPopup();
}

// ---------- handlers ----------
async function chooseOrigin(item) {
  els.input.value = item.full;
  let origin = { lat: item.lat, lng: item.lng };
  if (item.lat == null) {
    setState("Определяем адрес…");
    try {
      origin = await resolveCoords(item);
    } catch {
      origin = null;
    }
    if (!origin) {
      setState("Не удалось определить координаты адреса. Попробуйте другой.");
      return;
    }
  }
  setState("");
  renderResults(origin, nearest(origin));
}

async function doSearch() {
  const q = els.input.value.trim();
  if (!q) {
    els.input.focus();
    return;
  }
  hideSuggest();
  setState("Ищем адрес…");
  els.results.innerHTML = "";
  try {
    const items = await suggest(q);
    if (!items.length) {
      setState("Не удалось распознать адрес. Уточните улицу или ориентир.");
      return;
    }
    chooseOrigin(items[0]);
  } catch {
    setState("Ошибка поиска адреса. Попробуйте ещё раз или укажите ориентир.");
  }
}

function useMyLocation() {
  if (!navigator.geolocation) {
    setState("Геолокация недоступна в этом браузере.");
    return;
  }
  setState("Определяем ваше местоположение…");
  els.results.innerHTML = "";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const origin = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      renderResults(origin, nearest(origin));
    },
    () => setState("Не удалось получить геолокацию. Введите адрес вручную."),
    { enableHighAccuracy: true, timeout: 8000 }
  );
}

// ---------- автодополнение адреса (выпадающий список) ----------
const sugEl = document.getElementById("suggest");
let sugItems = [];
let sugActive = -1;
let sugSeq = 0;

function debounce(fn, ms) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

function hideSuggest() {
  sugEl.hidden = true;
  sugEl.innerHTML = "";
  sugItems = [];
  sugActive = -1;
  els.input.setAttribute("aria-expanded", "false");
}

function setActive(i) {
  const lis = [...sugEl.querySelectorAll("li:not(.s-empty)")];
  lis.forEach((li) => li.classList.remove("active"));
  sugActive = i;
  if (i >= 0 && lis[i]) {
    lis[i].classList.add("active");
    lis[i].scrollIntoView({ block: "nearest" });
  }
}

function renderSuggest(items) {
  sugItems = items;
  sugActive = -1;
  sugEl.innerHTML = "";
  if (!items.length) {
    sugEl.innerHTML = `<li class="s-empty" aria-disabled="true">Ничего не найдено</li>`;
  } else {
    items.forEach((it, i) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.innerHTML =
        `<div class="s-main">${escapeHtml(it.main)}</div>` +
        (it.sub ? `<div class="s-sub">${escapeHtml(it.sub)}</div>` : "");
      // mousedown (не click) — чтобы успеть до blur инпута
      li.addEventListener("mousedown", (e) => {
        e.preventDefault();
        hideSuggest();
        chooseOrigin(it);
      });
      li.addEventListener("mouseenter", () => setActive(i));
      sugEl.appendChild(li);
    });
  }
  sugEl.hidden = false;
  els.input.setAttribute("aria-expanded", "true");
}

const onType = debounce(async () => {
  const q = els.input.value.trim();
  if (q.length < 3) {
    hideSuggest();
    return;
  }
  const seq = ++sugSeq;
  try {
    const items = await suggest(q);
    if (seq !== sugSeq) return; // устаревший ответ — игнорируем
    renderSuggest(items);
  } catch {
    hideSuggest();
  }
}, 250);

els.input.addEventListener("input", onType);
els.input.addEventListener("keydown", (e) => {
  if (sugEl.hidden || !sugItems.length) {
    if (e.key === "Enter") doSearch();
    return;
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    setActive(Math.min(sugActive + 1, sugItems.length - 1));
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    setActive(Math.max(sugActive - 1, 0));
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (sugActive >= 0) {
      const it = sugItems[sugActive];
      hideSuggest();
      chooseOrigin(it);
    } else {
      doSearch();
    }
  } else if (e.key === "Escape") {
    hideSuggest();
  }
});
els.input.addEventListener("focus", () => {
  if (sugItems.length) sugEl.hidden = false;
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".ac")) hideSuggest();
});

els.search.addEventListener("click", doSearch);
els.geo.addEventListener("click", useMyLocation);

renderAll();
initMap();
