#!/usr/bin/env python3
"""Build src/data/patchnotes.json from Riot's official TFT patch-notes articles.

Riot publishes every patch note at
  https://teamfighttactics.leagueoflegends.com/<locale>/news/game-updates/teamfight-tactics-patch-<slug>/
and the whole body ships inside the page's __NEXT_DATA__ blob under the
"patchNotesRichText" blade — no scraping of layout HTML needed. Each article
exists in ar-ae / en-us / ja-jp (the same three locales the site ships), so we
parse the shared structure once from the English article and attach the
localized strings of the other two.

The structure is a flat event stream: section headers (h2), group headers (h4),
designer commentary (blockquote), and change lists (ul). Change lists hold two
shapes — nested entities (<li>Name<ul><li>Stat: old ⇒ new</li></ul></li>) and
flat bullets (<li>Name Stat: old ⇒ new</li> or plain prose). Entity names are
resolved against src/data/{champions,traits,items,augments}.json by their
English name so the app can show portraits/icons for the right game object.

Run:  python3 scripts/fetch_patch_notes.py [slug ...]
      npm run fetch-patch-notes
"""
from __future__ import annotations

import json
import re
import sys
import urllib.error
import urllib.request
from datetime import date
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "src" / "data"
OUT = DATA / "patchnotes.json"

SITE = "https://teamfighttactics.leagueoflegends.com"
LISTING = f"{SITE}/en-us/news/tags/patch-notes/"
# app locale -> Riot site locale
LOCALES = ["ar", "en", "ja"]
RIOT_LOCALE = {"ar": "ar-ae", "en": "en-us", "ja": "ja-jp"}
DEFAULT_MAX = 6  # keep the most recent N patches of the current set

VOID = {
    "br", "img", "hr", "meta", "link", "input", "source", "wbr",
    "area", "base", "col", "embed", "track",
}


def norm(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


# --------------------------------------------------------------------------- HTML tree

class Node:
    __slots__ = ("tag", "attrs", "kids", "parent")

    def __init__(self, tag: str, attrs: dict | None = None, parent: "Node | None" = None):
        self.tag = tag
        self.attrs = attrs or {}
        self.kids: list = []
        self.parent = parent


class TreeParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("#root")
        self.cur = self.root

    def handle_starttag(self, tag, attrs):
        node = Node(tag, dict(attrs), self.cur)
        self.cur.kids.append(node)
        if tag not in VOID:
            self.cur = node

    def handle_startendtag(self, tag, attrs):
        self.cur.kids.append(Node(tag, dict(attrs), self.cur))

    def handle_endtag(self, tag):
        n = self.cur
        while n is not None and n.tag != tag:
            n = n.parent
        if n is not None and n.parent is not None:
            self.cur = n.parent

    def handle_data(self, data):
        if data:
            self.cur.kids.append(data)


def text_of(node: Node) -> str:
    parts: list[str] = []

    def rec(n: Node) -> None:
        for k in n.kids:
            if isinstance(k, str):
                parts.append(k)
            elif k.tag == "br":
                parts.append(" ")
            else:
                rec(k)

    rec(node)
    return norm("".join(parts))


def find_img(node: Node) -> str | None:
    for k in node.kids:
        if isinstance(k, str):
            continue
        if k.tag == "img":
            return k.attrs.get("src")
        found = find_img(k)
        if found:
            return found
    return None


def parse_ul(ul: Node) -> list[dict]:
    """<li>Name<ul><li>line</li></ul></li> -> {name, lines}; bare <li> -> {name, lines:[]}."""
    items: list[dict] = []
    for li in (k for k in ul.kids if not isinstance(k, str) and k.tag == "li"):
        name_bits: list[str] = []
        lines: list[str] = []
        for k in li.kids:
            if isinstance(k, str):
                name_bits.append(k)
            elif k.tag == "br":
                name_bits.append(" ")
            elif k.tag in ("ul", "ol"):
                for sub in k.kids:
                    if not isinstance(sub, str) and sub.tag == "li":
                        lines.append(text_of(sub))
            else:
                name_bits.append(text_of(k))
        name = norm("".join(name_bits))
        lines = [ln for ln in (norm(x) for x in lines) if ln]
        if name or lines:
            items.append({"name": name, "lines": lines})
    return items


def events_of(body: str) -> list[tuple]:
    """Flatten the rich-text body into an ordered event stream."""
    parser = TreeParser()
    parser.feed(body)
    events: list[tuple] = []

    def walk(node: Node) -> None:
        for k in node.kids:
            if isinstance(k, str):
                continue
            cls = k.attrs.get("class", "")
            if k.tag == "header" and "header-primary" in cls:
                h2 = next((c for c in k.kids if not isinstance(c, str) and c.tag == "h2"), None)
                if h2 is not None:
                    events.append(("h2", h2.attrs.get("id", ""), text_of(h2)))
                    continue
                walk(k)
            elif k.tag == "h2":
                events.append(("h2", k.attrs.get("id", ""), text_of(k)))
            elif k.tag == "h4":
                events.append(("h4", "", text_of(k)))
            elif k.tag == "blockquote":
                events.append(("blockquote", text_of(k)))
            elif k.tag == "div" and "context-designers" in cls:
                names = [
                    text_of(c)
                    for c in k.kids
                    if not isinstance(c, str) and "context-designer" in c.attrs.get("class", "")
                ]
                events.append(("designers", names))
            elif k.tag == "ul":
                events.append(("ul", parse_ul(k)))
            elif k.tag == "p":
                img = find_img(k)
                if img is not None:
                    events.append(("img", img))
                else:
                    txt = text_of(k)
                    if txt:
                        events.append(("note", txt))
            else:
                walk(k)

    walk(parser.root)
    return events


def signature(events: list[tuple]) -> list[tuple]:
    """Locale-independent shape of an event stream (used to align translations)."""
    sig: list[tuple] = []
    for ev in events:
        if ev[0] == "h2":
            sig.append(("h2", ev[1]))
        elif ev[0] == "ul":
            sig.append(("ul", tuple((i["name"] != "", len(i["lines"])) for i in ev[1])))
        elif ev[0] == "designers":
            sig.append(("designers", len(ev[1])))
        else:
            sig.append((ev[0],))
    return sig


# --------------------------------------------------------------------------- fetching

def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (MokaTroy data script)"})
    with urllib.request.urlopen(req, timeout=45) as resp:
        return resp.read().decode("utf-8", "replace")


def next_data(html: str) -> dict | None:
    m = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.S)
    return json.loads(m.group(1)) if m else None


def article_page(riot_locale: str, slug: str) -> dict | None:
    url = f"{SITE}/{riot_locale}/news/game-updates/teamfight-tactics-patch-{slug}/"
    try:
        page = next_data(fetch(url))
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError) as exc:
        print(f"  ! {riot_locale}/{slug}: {exc}", file=sys.stderr)
        return None
    if not page:
        return None
    return page.get("props", {}).get("pageProps", {}).get("page")


def rich_body(page: dict) -> str | None:
    blades = page.get("blades") or []
    for blade in blades:
        body = (blade.get("richText") or {}).get("body")
        if body and "patch-notes-container" in body:
            return body
    for blade in blades:
        body = (blade.get("richText") or {}).get("body")
        if body:
            return body
    return None


def discover_slugs(max_patches: int) -> list[str]:
    html = fetch(LISTING)
    found = set(re.findall(r"teamfight-tactics-patch-(\d+-\d+[a-z]?)", html))
    set_major = int(json.loads((DATA / "meta.json").read_text())["set"])
    current = [s for s in found if int(s.split("-")[0]) == set_major]

    def key(slug: str) -> tuple:
        m = re.match(r"(\d+)-(\d+)([a-z]*)$", slug)
        return (int(m.group(1)), int(m.group(2)), m.group(3)) if m else (0, 0, "")

    return sorted(current, key=key, reverse=True)[:max_patches]


# --------------------------------------------------------------------------- assembly

def kind_of_group(title: str) -> str:
    u = title.upper()
    if "WISP" in u or "UNIT" in u:
        return "champion"
    if "TRAIT" in u:
        return "trait"
    if "EMBLEM" in u or "ITEM" in u:
        return "item"
    if "AUGMENT" in u:
        return "augment"
    return "system"


def norm_name(s: str) -> str:
    return norm(s).replace("’", "'").replace("‘", "'").strip().rstrip(":").lower()


def build_lookup() -> dict[str, dict[str, dict]]:
    """kind -> {normalized en name -> {k, id, name}} (name = full Localized row name)"""
    lookup: dict[str, dict[str, dict]] = {}
    files = {
        "champion": "champions.json",
        "trait": "traits.json",
        "item": "items.json",
        "augment": "augments.json",
    }
    for kind, fname in files.items():
        entries: dict[str, dict] = {}
        for row in json.loads((DATA / fname).read_text()):
            key = norm_name(row["name"]["en"])
            if key and key not in entries:
                entries[key] = {"k": kind, "id": row["id"], "name": row["name"]}
        lookup[kind] = entries
    return lookup


LOOKUP = build_lookup()


def resolve(name: str, hint: str) -> dict | None:
    """Return {k, id, name} for a known English entity name, else None."""
    key = norm_name(name)
    if not key:
        return None
    order = [hint] + [k for k in LOOKUP if k != hint]
    for kind in order:
        ref = LOOKUP.get(kind, {}).get(key)
        if ref:
            return ref
    return None


def flat_line(raw_name: str, lang: str, data_name: dict | None) -> str:
    """"Camille Ability Damage: 150… ⇒ 150…" (flat bullet) -> "Ability Damage: 150…".
    Strips the known game-object name (per locale, from our dataset) so the
    localized remainder becomes the change line; falls back to the full text."""
    prefix = (data_name or {}).get(lang) or ""
    if prefix and raw_name.lower().startswith(prefix.lower()):
        rest = re.sub(r"^[\s\-–—:：]+", "", raw_name[len(prefix):])
        return rest or raw_name
    return raw_name


def resolve_prefix(head: str, rest: str, hint: str) -> tuple[str, str] | None:
    """Flat bullets glue name and stat: 'Hold the Line AP: 10% ⇒ 11%'.
    Try progressively shorter prefixes of the head for a known entity name.
    Returns (line with the matched name stripped, matched name)."""
    words = head.split()
    for take in range(len(words), 0, -1):
        candidate = " ".join(words[:take])
        if resolve(candidate, hint):
            stat = " ".join(words[take:])
            line = norm(f"{stat}: {rest}") if stat else norm(f"{head}: {rest}")
            return line, candidate
    return None


def split_line(text: str) -> tuple[str, str] | None:
    m = re.match(r"^(.+?):\s*(.*)$", text)
    if not m or "⇒" not in text and "→" not in text:
        return None
    return m.group(1), m.group(2)


def _append_entry(group: dict, entry: dict) -> None:
    key = (entry["ref"]["k"], entry["ref"]["id"]) if entry["ref"] else ("name", entry["_raw_name"].lower())
    for existing in group["entries"]:
        ekey = (existing["ref"]["k"], existing["ref"]["id"]) if existing["ref"] else ("name", existing["_raw_name"].lower())
        if ekey == key:
            existing["lines"].extend(entry["lines"])
            return
    group["entries"].append(entry)


def assemble(per_locale: dict[str, list[tuple]], slug: str) -> dict | None:
    """Merge the aligned per-locale event streams into one patch object."""
    base_sig = signature(per_locale["en"])
    for lang in LOCALES:
        if lang != "en" and signature(per_locale[lang]) != base_sig:
            print(
                f"  ! {slug}: {lang} structure differs from en — falling back to English text",
                file=sys.stderr,
            )
            per_locale[lang] = per_locale["en"]

    n = len(per_locale["en"])
    intro: dict | None = None
    designers: list[str] = []
    sections: list[dict] = []
    sec: dict | None = None
    grp: dict | None = None
    in_intro = False
    skip = False

    def loc_text(i: int, pick) -> dict:
        return {lang: pick(per_locale[lang][i]) or "" for lang in LOCALES}

    for i in range(n):
        evs = {lang: per_locale[lang][i] for lang in LOCALES}
        kind = evs["en"][0]

        if kind == "h2":
            hid, title_en = evs["en"][1], evs["en"][2]
            if hid == "patch-top":
                in_intro, sec, grp = True, None, None
                continue
            in_intro = False
            skip = hid.startswith("patch-cosmetics") or "related" in hid
            if skip:
                sec, grp = None, None
                continue
            sec = {
                "id": hid,
                "title": {lang: evs[lang][2] for lang in LOCALES},
                "commentary": None,
                "groups": [],
            }
            sections.append(sec)
            grp = None
            continue
        if skip:
            continue

        if kind == "designers":
            for nm in evs["en"][1]:
                if nm and nm not in designers:
                    designers.append(nm)
            continue

        if kind == "img":
            continue  # decorative CMS banners are not stored

        if kind == "blockquote":
            text = loc_text(i, lambda ev: ev[1])
            if not any(text.values()):
                continue
            if in_intro:
                if intro is None:
                    intro = text
            elif grp is not None:
                if grp["commentary"] is None:
                    grp["commentary"] = text
            elif sec is not None:
                if sec["commentary"] is None:
                    sec["commentary"] = text
            continue

        if sec is None:  # content before the first real section header
            sec = {
                "id": "patch-body",
                "title": {"ar": "Patch", "en": "Patch", "ja": "パッチ"},
                "commentary": None,
                "groups": [],
            }
            sections.append(sec)

        if kind == "h4":
            title = loc_text(i, lambda ev: ev[2])
            grp = {
                "title": title,
                "kind": kind_of_group(evs["en"][2]),
                "commentary": None,
                "entries": [],
                "notes": [],
            }
            sec["groups"].append(grp)
            continue

        if grp is None:
            grp = {
                "title": {"ar": "", "en": "", "ja": ""},
                "kind": "system",
                "commentary": None,
                "entries": [],
                "notes": [],
            }
            sec["groups"].append(grp)

        if kind == "note":
            text = loc_text(i, lambda ev: ev[1])
            if any(text.values()):
                grp["notes"].append(text)
            continue

        # ---- ul: parse structure from en, attach localized strings by position
        items_en = evs["en"][1]
        # First pass (en): decide entity/note split + refs.
        planned: list[dict] = []
        for item in items_en:
            name, lines = item["name"], item["lines"]
            if lines:
                ref = resolve(name, grp["kind"])
                planned.append({
                    "type": "entity",
                    "flat": False,
                    "name_en": name,
                    "ref": ref,
                    "data_name": (ref or {}).get("name"),
                    "lines_en": lines,
                })
                continue
            if "⇒" in name or "→" in name:
                split = split_line(name)
                if split:
                    head, rest = split
                    resolved = resolve_prefix(head, rest, grp["kind"])
                    if resolved:
                        line, matched = resolved
                        ref = resolve(str(matched), grp["kind"])
                        planned.append({
                            "type": "entity",
                            "flat": True,
                            "name_en": str(matched),
                            "ref": ref,
                            "data_name": (ref or {}).get("name"),
                            "lines_en": [line],
                        })
                        continue
            planned.append({"type": "note", "name_en": name, "ref": None, "lines_en": []})

        # Second pass (all locales): attach localized names/lines by position.
        for idx, plan in enumerate(planned):
            if plan["type"] == "entity":
                if not plan["name_en"]:
                    # nameless entity (rare): keep its lines as plain notes
                    for ln in plan["lines_en"]:
                        grp["notes"].append({"ar": "", "en": ln, "ja": ""})
                    continue
                name_loc = {}
                for lang in LOCALES:
                    loc_items = evs[lang][1]
                    name_loc[lang] = loc_items[idx]["name"] if idx < len(loc_items) else plan["name_en"]
                if plan.get("flat"):
                    # Flat bullet: the localized text lives in the li's name
                    # ("Camille Ability Damage: … ⇒ …"); derive the line per locale.
                    line_loc = {}
                    for lang in LOCALES:
                        loc_items = evs[lang][1]
                        raw = loc_items[idx]["name"] if idx < len(loc_items) else ""
                        line_loc[lang] = (
                            flat_line(raw, lang, plan.get("data_name"))
                            if raw
                            else plan["lines_en"][0]
                        )
                    lines_loc = [line_loc]
                else:
                    lines_loc = []
                    for line_idx in range(len(plan["lines_en"])):
                        entry = {}
                        for lang in LOCALES:
                            loc_items = evs[lang][1]
                            loc_lines = loc_items[idx]["lines"] if idx < len(loc_items) else []
                            entry[lang] = loc_lines[line_idx] if line_idx < len(loc_lines) else plan["lines_en"][line_idx]
                        lines_loc.append(entry)
                ref = plan["ref"]
                _append_entry(grp, {
                    "name": name_loc,
                    "ref": {"k": ref["k"], "id": ref["id"]} if ref else None,
                    "lines": lines_loc,
                    "_raw_name": plan["name_en"],
                })
            else:
                if plan["name_en"]:
                    note = {}
                    for lang in LOCALES:
                        loc_items = evs[lang][1]
                        note[lang] = loc_items[idx]["name"] if idx < len(loc_items) else plan["name_en"]
                    grp["notes"].append(note)

    # drop groups/sections that ended up empty
    out_sections = []
    for s in sections:
        s["groups"] = [g for g in s["groups"] if g["entries"] or g["notes"] or g["commentary"]]
        if s["groups"] or s["commentary"]:
            out_sections.append(s)
    return {
        "slug": slug,
        "sections": out_sections,
        "intro": intro,
        "designers": designers,
    }


# --------------------------------------------------------------------------- direction report

NUM_RE = re.compile(r"\d+(?:\.\d+)?")


def line_dir(text: str) -> str | None:
    parts = re.split(r"[⇒→]", text)
    if len(parts) != 2:
        return None
    a = [float(x) for x in NUM_RE.findall(parts[0])]
    b = [float(x) for x in NUM_RE.findall(parts[1])]
    if not a or not b:
        return None
    if len(a) == len(b):
        diffs = [y - x for x, y in zip(a, b)]
        if all(d == 0 for d in diffs):
            return "adjust"
        if any(d > 0 for d in diffs) and any(d < 0 for d in diffs):
            return "adjust"
        return "buff" if any(d > 0 for d in diffs) else "nerf"
    if abs(sum(b) - sum(a)) < 1e-9:
        return "adjust"
    return "buff" if sum(b) > sum(a) else "nerf"


def entity_dir(lines: list[dict]) -> str:
    dirs = [line_dir(ln["en"]) for ln in lines]
    dirs = [d for d in dirs if d]
    if not dirs:
        return "change"
    if all(d == "buff" for d in dirs):
        return "buff"
    if all(d == "nerf" for d in dirs):
        return "nerf"
    return "adjust"


def report(patches: list[dict]) -> None:
    for patch in patches:
        counts = {"buff": 0, "nerf": 0, "adjust": 0, "change": 0}
        unmatched: list[str] = []
        for sec in patch["sections"]:
            for grp in sec["groups"]:
                for entry in grp["entries"]:
                    entry.pop("_raw_name", None)  # internal merge key, not app data
                    counts[entity_dir(entry["lines"])] += 1
                    if not entry["ref"]:
                        unmatched.append(entry["name"]["en"])
        print(
            f"{patch['slug']}: {len(patch['sections'])} sections | "
            f"buff={counts['buff']} nerf={counts['nerf']} "
            f"adjust={counts['adjust']} change={counts['change']}"
        )
        if unmatched:
            print(f"  unmatched entities ({len(unmatched)}): {', '.join(sorted(set(unmatched)))}")


# --------------------------------------------------------------------------- main

def build_patch(slug: str) -> dict | None:
    pages: dict[str, dict] = {}
    for lang in LOCALES:
        page = article_page(RIOT_LOCALE[lang], slug)
        if page is None:
            if lang == "en":
                print(f"  ! {slug}: English article unavailable — skipping patch", file=sys.stderr)
                return None
            print(f"  ! {slug}: {lang} article unavailable — falling back to English", file=sys.stderr)
            pages[lang] = pages["en"]
            continue
        body = rich_body(page)
        if not body:
            if lang == "en":
                print(f"  ! {slug}: no rich-text body — skipping patch", file=sys.stderr)
                return None
            pages[lang] = pages["en"]
            continue
        pages[lang] = {"page": page, "events": events_of(body)}

    # normalize: keep only events per locale (English page for metadata)
    per_locale = {lang: pages[lang]["events"] for lang in LOCALES}
    en_page = pages["en"]["page"]

    hreflangs = {
        h.get("locale"): h.get("url")
        for h in (en_page.get("hreflangs") or [])
        if h.get("locale") and h.get("url")
    }
    urls = {}
    for lang in LOCALES:
        rl = RIOT_LOCALE[lang]
        urls[lang] = hreflangs.get(rl) or f"{SITE}/{rl}/news/game-updates/teamfight-tactics-patch-{slug}/"

    built = assemble(per_locale, slug)
    if built is None:
        return None
    m = re.match(r"(\d+)-(\d+)([a-z]*)$", slug)
    label = ".".join(m.group(1, 2)) + (m.group(3) or "") if m else slug
    patch = {
        "slug": slug,
        "label": label,
        "date": (en_page.get("displayedPublishDate") or "")[:10],
        "title": {lang: pages[lang]["page"].get("title") or f"TFT patch {label}" for lang in LOCALES},
        "desc": {lang: pages[lang]["page"].get("description") or "" for lang in LOCALES},
        "intro": built["intro"],
        "designers": built["designers"],
        "urls": urls,
        "sections": built["sections"],
    }
    return patch


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    max_arg = next((a for a in sys.argv[1:] if a.startswith("--max=")), None)
    max_patches = int(max_arg.split("=")[1]) if max_arg else DEFAULT_MAX

    slugs = args or discover_slugs(max_patches)
    if not slugs:
        print("no patch articles discovered", file=sys.stderr)
        return 1
    print(f"fetching patches: {', '.join(slugs)}")

    patches = []
    for slug in slugs:
        patch = build_patch(slug)
        if patch:
            patches.append(patch)

    if not patches:
        print("no patches fetched", file=sys.stderr)
        return 1

    report(patches)
    out = {
        "source": LISTING,
        "set": int(json.loads((DATA / "meta.json").read_text())["set"]),
        "fetched": date.today().isoformat(),
        "patches": patches,
    }
    OUT.write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")) + "\n")
    size = OUT.stat().st_size
    print(f"wrote {OUT.relative_to(ROOT)} — {len(patches)} patches, {size} bytes")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
