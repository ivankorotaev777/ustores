#!/usr/bin/env python3
"""Снимок рабочей таблицы пунктов для карты вакансий /rabota → public/rabota/src/data/fallback.js.

Карта читает таблицу прямо из браузера. Снимок нужен для двух вещей:
  1) запасной вариант, если Google-таблица недоступна;
  2) дата последнего изменения данных. Google отдаёт время правки только
     с авторизацией, поэтому определяем его сами: скрипт запускается дважды
     в сутки (.github/workflows/rabota-snapshot.yml) и сравнивает «отпечаток»
     таблицы с прошлым. Если отпечаток другой — CHANGED_AT = сейчас.
     Если тот же — файл не трогаем, коммита и деплоя не будет.
     Отпечаток считается так же в app.js (fingerprint), чтобы страница могла
     понять, правили ли таблицу после последней проверки.

Запуск: python3 scripts/build_rabota_snapshot.py [путь/к/fallback.js]
Перенесён из HR_Ustores/scripts/build_map_data.py (21.10.2026).
"""
from __future__ import annotations

import csv
import io
import json
import re
import sys
import urllib.request
from datetime import datetime
from zoneinfo import ZoneInfo

SHEET_ID = "1O9j79aN8E_xlaGiOWy9SJNH4BGG0g5nnaI4hfISW1hc"
GID = "58406550"
URL = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&gid={GID}"
DEFAULT_DEST = "public/rabota/src/data/fallback.js"
TZ = ZoneInfo("Asia/Tashkent")

COORD_FROM_LINK = re.compile(r"(\d{2}\.\d{4,})[%,][C2c]*(\d{2}\.\d{4,})")

# Колонки, изменения в которых считаются «изменением данных карты».
FP_COLUMNS = ["Внутреннее название", "Название для отчетности", "Статус", "Тип бизнеса",
              "Адрес", "Потребность в персонале", "Дата выхода",
              "Координаты Долгота (latitude)", "Координаты Широта (longitude)", "Ссылка на локацию"]


def num(value: str) -> float | None:
    v = (value or "").strip().replace(",", ".")
    if not v:
        return None
    try:
        x = float(v)
    except ValueError:
        return None
    # в таблице координаты записаны без точки: 41319058 = 41.319058
    while abs(x) > 180:
        x /= 10
    return x


def coords(lat_raw: str, lng_raw: str, link: str) -> tuple[float, float] | None:
    a, b = num(lat_raw), num(lng_raw)
    # колонки в таблице подписаны наоборот, поэтому решаем по диапазону
    if a is not None and b is not None:
        lat, lng = (a, b) if 35 < a < 46 else (b, a)
        if 35 < lat < 46 and 55 < lng < 75:
            return lat, lng
    m = COORD_FROM_LINK.search(link or "")
    if m:
        x, y = float(m.group(1)), float(m.group(2))
        lat, lng = (x, y) if 35 < x < 46 else (y, x)
        return lat, lng
    return None


def need_int(value: str) -> int:
    try:
        return int(float((value or "").strip().replace(",", ".")))
    except ValueError:
        return 0


TRANSLIT = {'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'}


def slug(name: str) -> str:
    """Метка пункта для ссылки в Telegram: только латиница, цифры, дефис (тот же алгоритм в app.js и боте)."""
    out = []
    for ch in str(name).lower():
        if ch in TRANSLIT:
            out.append(TRANSLIT[ch])
        elif ch.isascii() and ch.isalnum():
            out.append(ch)
        else:
            out.append("-")
    s = re.sub(r"-+", "-", "".join(out)).strip("-")
    return s[:40] or "pvz"


def key(h: str) -> str:
    # в заголовках таблицы есть переносы строк и лишние пробелы
    return re.sub(r"\s+", " ", (h or "")).strip().lower()


def fnv1a(s: str) -> str:
    """FNV-1a 32 бита по UTF-16 — совпадает с fingerprint() в app.js."""
    h = 0x811C9DC5
    b = s.encode("utf-16-le")
    for i in range(0, len(b), 2):
        h ^= b[i] | (b[i + 1] << 8)
        h = (h * 0x01000193) & 0xFFFFFFFF
    return f"{h:08x}"


def fingerprint(rows: list[list[str]]) -> str:
    idx = {key(h): i for i, h in enumerate(rows[0])}
    cols = [idx.get(key(c)) for c in FP_COLUMNS]
    lines = []
    for row in rows[1:]:
        cells = [re.sub(r"\s+", " ", row[i]).strip() if i is not None and i < len(row) else "" for i in cols]
        if any(cells):
            lines.append("\u001f".join(cells))
    return fnv1a("\u001e".join(lines))


def locations(rows: list[list[str]]) -> list[dict]:
    idx = {key(h): i for i, h in enumerate(rows[0])}

    def g(row: list[str], name: str) -> str:
        i = idx.get(key(name))
        return row[i].strip() if i is not None and i < len(row) else ""

    out: list[dict] = []
    seen: set[str] = set()
    for row in rows[1:]:
        name = g(row, "Внутреннее название") or g(row, "Название для отчетности")
        status = g(row, "Статус")
        if not name or not status:
            continue
        if re.match(r"(?i)^закры", status):
            continue  # закрытые пункты в карту не берём (правило Ивана, 22.09.2026)
        c = coords(g(row, "Координаты Долгота (latitude)"), g(row, "Координаты Широта (longitude)"),
                   g(row, "Ссылка на локацию"))
        if not c:
            continue
        sid = slug(name)
        while sid in seen:
            sid += "-2"
        seen.add(sid)
        out.append({
            "id": sid,
            "name": name,
            "brand": g(row, "Тип бизнеса") or "",
            "status": status,
            "address": g(row, "Адрес"),
            "need": need_int(g(row, "Потребность в персонале")),
            "deadline": g(row, "Дата выхода"),
            "lat": round(c[0], 6),
            "lng": round(c[1], 6),
        })
    return out


def previous_fingerprint(dest: str) -> str | None:
    try:
        m = re.search(r'export const FINGERPRINT = "([0-9a-f]+)"', open(dest, encoding="utf-8").read())
        return m.group(1) if m else None
    except FileNotFoundError:
        return None


def main() -> None:
    dest = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_DEST
    raw = urllib.request.urlopen(URL, timeout=30).read().decode("utf-8")
    rows = list(csv.reader(io.StringIO(raw)))
    fp = fingerprint(rows)
    if fp == previous_fingerprint(dest):
        print(f"{dest}: таблица не менялась (отпечаток {fp}), файл не трогаем")
        return
    data = locations(rows)
    if not data:
        sys.exit("таблица пустая или не распознана — снимок не обновляем")
    stamp = datetime.now(TZ).strftime("%d.%m.%Y %H:%M")
    body = json.dumps(data, ensure_ascii=False, indent=0).replace("\n", "")
    with open(dest, "w", encoding="utf-8") as f:
        f.write(
            "// Снимок таблицы пунктов: запасной вариант и дата последнего изменения данных.\n"
            f"// Сгенерирован scripts/build_rabota_snapshot.py, {stamp} (Ташкент). Руками не править.\n"
            f"export const SNAPSHOT_AT = \"{stamp}\";\n"
            f"export const CHANGED_AT = \"{stamp}\";\n"
            f"export const FINGERPRINT = \"{fp}\";\n"
            f"export const SNAPSHOT = {body};\n"
        )
    hiring = sum(1 for x in data if x["need"] > 0)
    print(f"{dest}: данные изменились (отпечаток {fp}), {len(data)} пунктов, из них с набором {hiring}")


if __name__ == "__main__":
    main()
