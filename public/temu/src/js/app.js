// ============================================================================
// Презентация Ustores для Temu: тексты EN/RU и запуск карты.
// Переключатель языка меняет все элементы с data-i18n; язык хранится в ?lang=
// и в localStorage. По умолчанию английский.
// ============================================================================

import { loadLocations, summarize, initMap, renderMarkers, invalidate } from "./map.js";

const I18N = {
  en: {
    "meta.title": "Ustores × Temu — the #1 last-mile network in Uzbekistan",
    "nav.cta": "Schedule a call",
    "hero.eyebrow": "Last mile · Tashkent · Uzbekistan",
    "hero.h1a": "The #1 last-mile network in Uzbekistan",
    "hero.h1b": "for the #1 marketplace in the world",
    "hero.sub": "Ustores runs the largest pickup-point network in Tashkent and already handles issuance for Ozon, Uzum and Pinduoduo. We are ready to hand Temu a live, staffed network on day one of the relaunch.",
    "hero.cta1": "Discuss the launch",
    "hero.cta2": "See the network",
    "hero.s1.v": "60+",
    "hero.s1.l": "pickup points in Tashkent",
    "hero.s2.v": "200k+",
    "hero.s2.l": "orders issued per month",
    "hero.s3.v": "10",
    "hero.s3.l": "months to build the network",
    "hero.s4.v": "#1",
    "hero.s4.l": "partner for Ozon, PDD and Uzum",
    "hero.note": "Live data from our operations sheet, updated as points open.",

    "net.badge": "Our network today",
    "net.title": "Almost 60 pickup points in 10 months",
    "net.sub": "Every point on this map is live or under construction right now. The data is read straight from our operations sheet, so what you see is what we run today.",
    "net.filter.all": "All",
    "net.filter.uzum": "Uzum",
    "net.filter.ozon": "Ozon · Jana Post",
    "net.legend.open": "Operating",
    "net.legend.building": "Under construction",
    "net.c.open": "operating",
    "net.c.building": "under construction",
    "net.c.total": "points in total",
    "net.c.uzum": "Uzum points",
    "net.c.ozon": "Ozon · Jana Post points",
    "net.source.live": "Live data from the operations sheet",
    "net.source.snapshot": "Snapshot from",
    "net.k1.v": "~60",
    "net.k1.l": "points opened in 10 months",
    "net.k2.v": "+60",
    "net.k2.l": "more points in one quarter — we have the capacity and the expertise to open them",
    "net.k3.v": "Largest",
    "net.k3.l": "share in the Ozon, PDD and Uzum partner networks",

    "why.badge": "Why Ustores",
    "why.title": "The largest network and the deepest expertise in the country",
    "why.sub": "Opening, staffing and running pickup points is our core business, not a side project.",
    "why.1.t": "Largest network in Uzbekistan",
    "why.1.d": "Nobody in the country has opened more partner pickup points over the last year. We know every district of Tashkent, every landlord type and every traffic pattern.",
    "why.2.t": "Biggest share in Ozon, Pinduoduo and Uzum networks",
    "why.2.d": "Marketplaces trust us with the largest slice of their partner issuance in Tashkent because our points deliver volume with stable quality.",
    "why.3.t": "Years with PDD. #1 partner in Tashkent",
    "why.3.d": "We have worked with Pinduoduo for years, and today all of their Tashkent issuance runs through our network. Cross-border parcels, returns and peak seasons are our daily routine.",
    "why.4.t": "Our own opening pipeline",
    "why.4.d": "Locations, landlords, renovation, signage, hiring and training of operators — a conveyor we run every week. That is why we can promise 60 points in a quarter.",

    "ready.badge": "Ready for Temu",
    "ready.title": "Issuance from day one, full coverage within a quarter",
    "ready.sub": "No waiting for openings. Temu gets a working network the day it relaunches, and a dedicated one three months later.",
    "ready.1.t": "Temu issuance in half of our network from day one",
    "ready.1.d": "Temu parcels go to about 30 existing points on the day of the relaunch. Trained operators, working IT, proven locations.",
    "ready.2.t": "Full coverage of Tashkent and the Tashkent region",
    "ready.2.d": "60 new Temu-dedicated points in one quarter — enough to close your pickup-point need across the city and the region.",
    "ready.3.t": "A joint Temu pickup-point brand book",
    "ready.3.d": "We co-design the store format with your team and build in the best practices of every competitor network we have already run with our own hands.",
    "ready.4.t": "One operations team, SLA and reporting",
    "ready.4.d": "Trained operators, 99% issuance SLA, daily reporting and a single point of contact on our side.",

    "tl.badge": "Timeline",
    "tl.title": "From a call to a dedicated network in one quarter",
    "tl.1.t": "Week 1",
    "tl.1.d": "Agreement, brand book kick-off, integration of order flow.",
    "tl.2.t": "Month 1",
    "tl.2.d": "Temu issuance live at ~30 existing Ustores points.",
    "tl.3.t": "Quarter 1",
    "tl.3.d": "60 new Temu points open across Tashkent and the region.",

    "cta.title": "Let's put Temu on the map of Tashkent",
    "cta.sub": "One call is enough to agree on the pilot and the opening plan.",
    "cta.tg": "Message in Telegram",
    "cta.call": "Call +998 90 347 86 92",
    "cta.foot": "Ustores · Tashkent · 2026 · private page, not indexed",
    "cta.logout": "Sign out",
  },
  ru: {
    "meta.title": "Ustores × Temu — сеть последней мили №1 в Узбекистане",
    "nav.cta": "Назначить звонок",
    "hero.eyebrow": "Последняя миля · Ташкент · Узбекистан",
    "hero.h1a": "Сеть последней мили №1 в Узбекистане",
    "hero.h1b": "для маркетплейса №1 в мире",
    "hero.sub": "Ustores управляет крупнейшей сетью пунктов выдачи в Ташкенте и уже ведёт выдачу для Ozon, Uzum и Pinduoduo. Мы готовы передать Temu живую, укомплектованную сеть в первый день возвращения на рынок.",
    "hero.cta1": "Обсудить запуск",
    "hero.cta2": "Посмотреть сеть",
    "hero.s1.v": "60+",
    "hero.s1.l": "пунктов выдачи в Ташкенте",
    "hero.s2.v": "200k+",
    "hero.s2.l": "заказов выдаём в месяц",
    "hero.s3.v": "10",
    "hero.s3.l": "месяцев на построение сети",
    "hero.s4.v": "№1",
    "hero.s4.l": "партнёр Ozon, PDD и Uzum",
    "hero.note": "Данные из рабочей таблицы, обновляются по мере открытия точек.",

    "net.badge": "Наша сеть сегодня",
    "net.title": "Почти 60 пунктов выдачи за 10 месяцев",
    "net.sub": "Каждая точка на карте работает или строится прямо сейчас. Данные читаются из нашей рабочей таблицы, поэтому вы видите то, чем мы управляем сегодня.",
    "net.filter.all": "Все",
    "net.filter.uzum": "Uzum",
    "net.filter.ozon": "Ozon · Jana Post",
    "net.legend.open": "Работает",
    "net.legend.building": "В стройке",
    "net.c.open": "работают",
    "net.c.building": "в стройке",
    "net.c.total": "точек всего",
    "net.c.uzum": "точек Uzum",
    "net.c.ozon": "точек Ozon · Jana Post",
    "net.source.live": "Живые данные из рабочей таблицы",
    "net.source.snapshot": "Снимок от",
    "net.k1.v": "~60",
    "net.k1.l": "точек открыто за 10 месяцев",
    "net.k2.v": "+60",
    "net.k2.l": "точек ещё за один квартал — у нас есть мощности и экспертиза, чтобы их открыть",
    "net.k3.v": "Крупнейшая",
    "net.k3.l": "доля в партнёрских сетях Ozon, PDD и Uzum",

    "why.badge": "Почему Ustores",
    "why.title": "Самая большая сеть и самая глубокая экспертиза в стране",
    "why.sub": "Открывать, укомплектовывать и вести пункты выдачи — наш основной бизнес, а не побочный проект.",
    "why.1.t": "Крупнейшая сеть в Узбекистане",
    "why.1.d": "Никто в стране не открыл больше партнёрских пунктов выдачи за последний год. Мы знаем каждый район Ташкента, каждый тип арендодателя и каждый поток людей.",
    "why.2.t": "Самая большая доля в сетях Ozon, Pinduoduo и Uzum",
    "why.2.d": "Маркетплейсы доверяют нам самый большой кусок партнёрской выдачи в Ташкенте, потому что наши точки дают объём при стабильном качестве.",
    "why.3.t": "Годы с PDD. Партнёр №1 в Ташкенте",
    "why.3.d": "Мы работаем с Pinduoduo много лет, и сегодня вся их выдача в Ташкенте идёт через нашу сеть. Трансграничные посылки, возвраты и пиковые сезоны — наша ежедневная рутина.",
    "why.4.t": "Собственный конвейер открытия точек",
    "why.4.d": "Помещения, арендодатели, ремонт, вывески, найм и обучение операторов — конвейер, который работает у нас каждую неделю. Поэтому мы можем обещать 60 точек за квартал.",

    "ready.badge": "Готовы под Temu",
    "ready.title": "Выдача с первого дня, полное покрытие за квартал",
    "ready.sub": "Не нужно ждать открытий. Temu получает работающую сеть в день возвращения и выделенную сеть через три месяца.",
    "ready.1.t": "Выдача Temu в половине нашей сети с первого дня",
    "ready.1.d": "Посылки Temu идут примерно в 30 действующих точек в день возвращения на рынок. Обученные операторы, работающая ИТ-часть, проверенные локации.",
    "ready.2.t": "Полное покрытие Ташкента и Ташкентской области",
    "ready.2.d": "60 новых точек под Temu за один квартал — достаточно, чтобы закрыть вашу потребность в пунктах выдачи по городу и области.",
    "ready.3.t": "Совместный бренд-бук пунктов выдачи Temu",
    "ready.3.d": "Вместе с вашей командой проектируем формат точки и закладываем в него лучшие практики всех конкурирующих сетей, которые мы уже прошли своими руками.",
    "ready.4.t": "Единая операционная команда, SLA и отчётность",
    "ready.4.d": "Обученные операторы, SLA выдачи 99%, ежедневная отчётность и одно контактное лицо с нашей стороны.",

    "tl.badge": "Сроки",
    "tl.title": "От звонка до выделенной сети за один квартал",
    "tl.1.t": "Неделя 1",
    "tl.1.d": "Договорённости, старт бренд-бука, подключение потока заказов.",
    "tl.2.t": "Месяц 1",
    "tl.2.d": "Выдача Temu работает примерно в 30 действующих точках Ustores.",
    "tl.3.t": "Квартал 1",
    "tl.3.d": "Открыты 60 новых точек Temu по Ташкенту и области.",

    "cta.title": "Давайте нанесём Temu на карту Ташкента",
    "cta.sub": "Одного звонка достаточно, чтобы договориться о пилоте и плане открытий.",
    "cta.tg": "Написать в Telegram",
    "cta.call": "Позвонить +998 90 347 86 92",
    "cta.foot": "Ustores · Ташкент · 2026 · закрытая страница, не индексируется",
    "cta.logout": "Выйти",
  },
};

let lang = "en";
const t = (k) => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;

function applyLang(next) {
  lang = I18N[next] ? next : "en";
  document.documentElement.lang = lang;
  document.title = t("meta.title");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll(".lang-btn").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.lang === lang);
    b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
  });
  try { localStorage.setItem("temu_lang", lang); } catch {}
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);
  renderSource();
  if (ALL.length) renderMarkers(filtered(), { open: t("net.legend.open"), building: t("net.legend.building") }, false);
}

function initialLang() {
  const q = new URLSearchParams(location.search).get("lang");
  if (q && I18N[q]) return q;
  try { const s = localStorage.getItem("temu_lang"); if (s && I18N[s]) return s; } catch {}
  return "en";
}

// ------------------------------------------------------------------ карта ---

let ALL = [];
let SOURCE = { source: "snapshot", at: "" };
let brandFilter = "all";

const filtered = () => (brandFilter === "all" ? ALL : ALL.filter((x) => x.brand === brandFilter));

function renderCounters() {
  const s = summarize(ALL);
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = String(v); };
  set("c-open", s.open);
  set("c-building", s.building);
  set("c-total", s.total);
  set("c-uzum", s.Uzum);
  set("c-ozon", s.Ozon);
}

function renderSource() {
  const el = document.getElementById("map-source");
  if (!el) return;
  el.textContent = SOURCE.source === "live"
    ? `${t("net.source.live")} · ${SOURCE.at}`
    : `${t("net.source.snapshot")} ${SOURCE.at}`;
}

function bindFilters() {
  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.addEventListener("click", () => {
      brandFilter = b.dataset.brand || "all";
      document.querySelectorAll(".filter-btn").forEach((x) => x.classList.toggle("is-active", x === b));
      renderMarkers(filtered(), { open: t("net.legend.open"), building: t("net.legend.building") }, true);
    });
  });
}

// ------------------------------------------------------------------ старт ---

(async function start() {
  applyLang(initialLang());
  document.querySelectorAll(".lang-btn").forEach((b) => b.addEventListener("click", () => applyLang(b.dataset.lang)));

  initMap("map");
  bindFilters();

  const { list, source, at } = await loadLocations();
  ALL = list;
  SOURCE = { source, at };
  renderCounters();
  renderSource();
  renderMarkers(filtered(), { open: t("net.legend.open"), building: t("net.legend.building") }, true);
  invalidate();

  // Появление блоков при прокрутке, как AnimateOnView на главной.
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  }
})();
