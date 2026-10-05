#!/usr/bin/env python3
"""Снимок пунктов выдачи для презентации Temu (/temu).

Берёт рабочую таблицу локаций Ustores (лист Main), оставляет пункты со статусом
«Работает» и «В стройке», нормализует координаты и пишет
public/temu/src/data/snapshot.js. Страница читает таблицу живьём, а этот
снимок показывает, если таблица недоступна.

Запуск из корня репозитория:  python3 scripts/build_temu_snapshot.py
"""
from __future__ import annotations

import csv
import datetime as dt
import io
import json
import pathlib
import re
import sys
import urllib.request

SHEET_ID = "1O9j79aN8E_xlaGiOWy9SJNH4BGG0g5nnaI4hfISW1hc"
GID = "58406550"
CSV_URL = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={GID}"
OUT = pathlib.Path(__file__).resolve().parents[1] / "public" / "temu" / "src" / "data" / "snapshot.js"

COORD_FROM_LINK = re.compile(r"(\d{2}\.\d{4,})[%,]?C?(\d{2}\.\d{4,})")


def key(s: str) -> str:
    return re.sub(r"\s+", " ", str(s or "")).strip().lower()


def num(v: str) -> float | None:
    s = str(v or "").strip().replace(",", ".")
    if not s:
        return None
    try:
        x = float(s)
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
        return (x, y) if 35 < x < 46 else (y, x)
    return None


TRANSLIT = str.maketrans({
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "e", "ж": "zh", "з": "z", "и": "i",
    "й": "y", "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t",
    "у": "u", "ф": "f", "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sch", "ъ": "", "ы": "y", "ь": "",
    "э": "e", "ю": "yu", "я": "ya",
})


def slug(name: str) -> str:
    s = str(name).lower().translate(TRANSLIT)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:40] or "pvz"


def brand_of(raw: str) -> str:
    r = key(raw)
    if "uzum" in r or "узум" in r:
        return "Uzum"
    if "ozon" in r or "озон" in r or "jana" in r or "жана" in r:
        return "Ozon"
    return raw.strip() or "Other"


def main() -> int:
    with urllib.request.urlopen(CSV_URL, timeout=30) as resp:
        text = resp.read().decode("utf-8")
    rows = list(csv.reader(io.StringIO(text)))
    if not rows:
        print("таблица пустая", file=sys.stderr)
        return 1
    idx = {key(h): i for i, h in enumerate(rows[0])}

    def g(row: list[str], name: str) -> str:
        i = idx.get(key(name))
        return row[i].strip() if i is not None and i < len(row) else ""

    out: list[dict] = []
    seen: set[str] = set()
    for row in rows[1:]:
        status = g(row, "Статус")
        name = g(row, "Внутреннее название") or g(row, "Название для отчетности")
        if not status or not name:
            continue
        if re.match(r"^закры", status, re.I):
            continue
        if re.match(r"^работа", status, re.I):
            st = "open"
        elif re.match(r"^в строй", status, re.I):
            st = "building"
        else:
            continue
        c = coords(
            g(row, "Координаты Долгота (latitude)"),
            g(row, "Координаты Широта (longitude)"),
            g(row, "Ссылка на локацию"),
        )
        if not c:
            continue
        sid = slug(name)
        while sid in seen:
            sid += "-2"
        seen.add(sid)
        out.append({
            "id": sid,
            "name": name,
            "brand": brand_of(g(row, "Тип бизнеса") or g(row, "Бренд")),
            "status": st,
            "address": g(row, "Адрес"),
            "lat": round(c[0], 6),
            "lng": round(c[1], 6),
        })

    today = dt.date.today().isoformat()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps(out, ensure_ascii=False, indent=2)
    OUT.write_text(
        "// Снимок пунктов выдачи Ustores для /temu. Генерируется скриптом\n"
        "// scripts/build_temu_snapshot.py, руками не править.\n"
        f'export const SNAPSHOT_AT = "{today}";\n'
        f"export const SNAPSHOT = {body};\n",
        encoding="utf-8",
    )
    opened = sum(1 for x in out if x["status"] == "open")
    building = len(out) - opened
    by_brand = {}
    for x in out:
        by_brand[x["brand"]] = by_brand.get(x["brand"], 0) + 1
    print(f"записано {len(out)} пунктов ({opened} работают, {building} строятся), бренды {by_brand} → {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
