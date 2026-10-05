// ============================================================================
// Карта сети Ustores для презентации Temu (/temu).
//
// Точки читаются прямо из рабочей таблицы локаций (лист Main) при каждом
// открытии страницы, как на /rabota. Если таблица недоступна, показываем
// снимок из src/data/snapshot.js (его собирает scripts/build_temu_snapshot.py).
//
// На страницу попадают только название, адрес, бренд и статус. Телефоны,
// Telegram-ID и численность персонала из таблицы здесь не используются.
// ============================================================================

import { SNAPSHOT, SNAPSHOT_AT } from "../data/snapshot.js";

const SHEET_ID = "1O9j79aN8E_xlaGiOWy9SJNH4BGG0g5nnaI4hfISW1hc";
const SHEET_GID = "58406550";
const SHEET_URL =
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${SHEET_GID}`;

const CITY_CENTER = { lat: 41.3111, lng: 69.2797 };

// Цвета брендов для светлой подложки карты (насыщенные, читаются на сером).
export const BRAND_COLOR = { Uzum: "#7c3aed", Ozon: "#2563eb", Other: "#64748b" };
export const TEMU_COLOR = "#FB7701";

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
    // колонки подписаны наоборот, поэтому решаем по диапазону
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

function brandOf(raw) {
  const r = key(raw);
  if (r.includes("uzum") || r.includes("узум")) return "Uzum";
  if (r.includes("ozon") || r.includes("озон") || r.includes("jana") || r.includes("жана")) return "Ozon";
  return "Other";
}

function rowsToLocations(rows) {
  const idx = {};
  rows[0].forEach((h, i) => { idx[key(h)] = i; });
  const get = (row, name) => {
    const i = idx[key(name)];
    return i === undefined ? "" : String(row[i] || "").trim();
  };
  const out = [];
  for (const row of rows.slice(1)) {
    const name = get(row, "Внутреннее название") || get(row, "Название для отчетности");
    const statusRaw = get(row, "Статус");
    if (!name || !statusRaw) continue;
    let status;
    if (/^работа/i.test(statusRaw)) status = "open";
    else if (/^в строй/i.test(statusRaw)) status = "building";
    else continue; // «Закрыта» и всё непонятное не показываем
    const c = coordsOf(
      get(row, "Координаты Долгота (latitude)"),
      get(row, "Координаты Широта (longitude)"),
      get(row, "Ссылка на локацию")
    );
    if (!c) continue;
    out.push({
      id: `${status}-${out.length}`,
      name,
      brand: brandOf(get(row, "Тип бизнеса") || get(row, "Бренд")),
      status,
      address: get(row, "Адрес"),
      lat: c.lat,
      lng: c.lng,
    });
  }
  return out;
}

/** Возвращает { list, source: 'live' | 'snapshot', at } */
export async function loadLocations() {
  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("sheet_http_" + res.status);
    const list = rowsToLocations(parseCsv(await res.text()));
    if (list.length) return { list, source: "live", at: new Date().toISOString().slice(0, 10) };
    throw new Error("sheet_empty");
  } catch {
    return { list: SNAPSHOT.slice(), source: "snapshot", at: SNAPSHOT_AT };
  }
}

export function summarize(list) {
  const s = { total: list.length, open: 0, building: 0, Uzum: 0, Ozon: 0, Other: 0 };
  for (const x of list) {
    if (x.status === "open") s.open++; else s.building++;
    s[x.brand in s ? x.brand : "Other"]++;
  }
  return s;
}

// ------------------------------------------------------------------ карта ---

const L = window.L;
let lmap = null, layer = null;

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export function initMap(el = "map") {
  if (!L || !document.getElementById(el)) return null;
  lmap = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25, attributionControl: true })
    .setView([CITY_CENTER.lat, CITY_CENTER.lng], 11);
  // Обычные плитки OpenStreetMap, слегка приглушённые CSS-фильтром (см. .leaflet-tile-pane в styles.css).
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(lmap);
  layer = L.layerGroup().addTo(lmap);
  return lmap;
}

function markerFor(loc, labels) {
  const color = BRAND_COLOR[loc.brand] || BRAND_COLOR.Other;
  const building = loc.status === "building";
  const m = L.circleMarker([loc.lat, loc.lng], {
    radius: building ? 7 : 8,
    color: building ? color : "#ffffff",
    weight: building ? 2 : 2,
    opacity: 1,
    fillColor: color,
    fillOpacity: building ? 0.12 : 0.9,
    dashArray: building ? "3 3" : null,
    className: "pvz-dot" + (building ? " is-building" : ""),
  });
  const status = building ? labels.building : labels.open;
  const brand = loc.brand === "Ozon" ? "Ozon · Jana Post" : loc.brand;
  m.bindPopup(
    `<div class="p-name">${escapeHtml(loc.name)}</div>` +
    `<div class="p-addr">${escapeHtml(loc.address || "")}</div>` +
    `<div class="p-tags"><span class="tag" style="--c:${color}">${escapeHtml(brand)}</span>` +
    `<span class="tag tag-status">${escapeHtml(status)}</span></div>`
  );
  return m;
}

export function renderMarkers(list, labels, fit = true) {
  if (!lmap) return;
  layer.clearLayers();
  const pts = [];
  for (const loc of list) {
    markerFor(loc, labels).addTo(layer);
    pts.push([loc.lat, loc.lng]);
  }
  if (fit && pts.length) lmap.fitBounds(L.latLngBounds(pts), { padding: [28, 28] });
}

export function invalidate() {
  if (lmap) setTimeout(() => lmap.invalidateSize(), 50);
}
