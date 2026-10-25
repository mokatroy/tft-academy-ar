#!/usr/bin/env python3
"""Build the tri-lingual (ar/en/ja) TFT dataset and local images from CommunityDragon.

Every name/description is emitted as {"ar":…, "en":…, "ja":…}. Champion traits are
resolved to stable trait apiNames (e.g. DA_18_Elderwood) so that all downstream joins
are locale-independent. Images are shared across locales (asset paths are identical).

Sources:
  https://raw.communitydragon.org/latest/cdragon/tft/ar_ae.json
  https://raw.communitydragon.org/latest/cdragon/tft/en_us.json
  https://raw.communitydragon.org/latest/cdragon/tft/ja_jp.json
Run with: npm run fetch-data
"""
from __future__ import annotations

import io
import json
import re
import sys
import time
import urllib.request
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / "scripts" / ".cache"
DATA = ROOT / "src" / "data"
PUBLIC = ROOT / "public"
GAME = "https://raw.communitydragon.org/latest/game/"
SET_NUMBER = "18"

LOCALES = ["ar_ae", "en_us", "ja_jp"]
# short code used in the app -> communitydragon file suffix
LOCALE_KEY = {"ar_ae": "ar", "en_us": "en", "ja_jp": "ja"}

CDRAGON = {loc: f"https://raw.communitydragon.org/latest/cdragon/tft/{loc}.json" for loc in LOCALES}

BASE_ITEMS = [
    "TFT_Item_BFSword",
    "TFT_Item_RecurveBow",
    "TFT_Item_NeedlesslyLargeRod",
    "TFT_Item_TearOfTheGoddess",
    "TFT_Item_ChainVest",
    "TFT_Item_NegatronCloak",
    "TFT_Item_GiantsBelt",
    "TFT_Item_SparringGloves",
]

CURATED_AUGMENTS = [
    "DA_18_ElderwoodTraitAugment",
    "DA_18_BlackthornTraitAugment",
    "DA_BlackthornTraitAugment",
    "DA_18_BlossomTraitAugment",
    "DA_18_InfernoTraitAugment",
    "DA_18_LunarTraitAugment",
    "DA_18_CovenTraitAugment",
    "DA_18_FaeTraitAugment",
    "DA_18_SolarTraitAugment",
    "DA_18_PrimalAugment_Sivir",
    "DA_18_PrimalAugment_Nidalee",
    "DA_18_RiftbeastTraitAugment",
    "DA_18_SprykinAugment",
    "DA_SpreadingRootsPlus",
    "DA_Ascension",
    "DA_PartialAscension",
    "DA_HealingOrbsI",
    "DA_CyberneticUplink_Gold",
    "DA_PandorasItemsII",
    "DA_Swordsmith",
    "DA_BoxingLessons",
    "DA_TonsOfStatsI",
    "DA_JeweledLotus_I",
    "DA_LevelUp",
    "DA_Min_Max",
    "DA_EarlyLearnings",
    "DA_TradeSector",
    "DA_ShoppingSpree",
    "DA_ComponentBuffet",
    "DA_BuriedTreasuresIII",
    "DA_HeroicGrabBag",
    "DA_LuckyGloves",
    "DA_GlassCannon_Gold",
    "DA_HoldTheLine",
    "DA_Corrosion",
    "DA_Retribution",
    "DA_WeStickTogether",
    "DA_GroupHugI",
    "DA_WovenMagic",
    "DA_FocusedFire",
    "DA_Kingslayer",
    "DA_SpeedyDoubleKill",
    "DA_GoingLong",
    "DA_LateGameScaling",
    "DA_PlotArmor",
    "DA_Slammin",
    "DA_LivingForge",
    "DA_MakeshiftArmorI",
    "DA_ElectrochargeI",
    "DA_SweetTreats",
    "DA_CalculatedLoss",
    "DA_BandOfThieves",
    "DA_PortableForge",
    "DA_Pilfer",
    "DA_Replication",
    "DA_SoloLeveling",
]


def fetch(url: str, retries: int = 3) -> bytes:
    last: Exception | None = None
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "tft-academy/1.0"})
            with urllib.request.urlopen(req, timeout=60) as res:
                return res.read()
        except Exception as exc:  # noqa: BLE001
            last = exc
            time.sleep(1 + attempt)
    raise last  # type: ignore[misc]


def strip_html(text: str) -> str:
    text = text.replace("<br>", " ").replace("<br/>", " ").replace("<br />", " ")
    text = re.sub(r"<row>|</row>", " ", text)
    text = re.sub(r"<[^>]+>", "", text)
    return re.sub(r"\s+", " ", text).strip()


def slugify(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def save_image(url: str, dest: Path, size: int, quality: int = 82) -> bool:
    if dest.exists():
        return True
    try:
        raw = fetch(url)
        img = Image.open(io.BytesIO(raw)).convert("RGBA")
        img.thumbnail((size, size), Image.LANCZOS)
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        canvas.alpha_composite(img, ((size - img.width) // 2, (size - img.height) // 2))
        dest.parent.mkdir(parents=True, exist_ok=True)
        canvas.save(dest, "WEBP", quality=quality, method=4)
        return True
    except Exception as exc:  # noqa: BLE001
        print(f"  ! image failed {url}: {exc}", file=sys.stderr)
        return False


def load_payload(loc: str) -> dict:
    CACHE.mkdir(parents=True, exist_ok=True)
    cache_file = CACHE / f"tft_{loc}.json"
    if cache_file.exists():
        payload = cache_file.read_bytes()
    else:
        print(f"downloading {CDRAGON[loc]} …")
        payload = fetch(CDRAGON[loc])
        cache_file.write_bytes(payload)
    return json.loads(payload)


def main() -> None:
    for folder in ("champions", "items", "augments"):
        (PUBLIC / folder).mkdir(parents=True, exist_ok=True)

    raw = {loc: load_payload(loc) for loc in LOCALES}
    sets = {loc: raw[loc]["sets"][SET_NUMBER] for loc in LOCALES}

    def icon_url(path: str) -> str | None:
        if not path or path.startswith("{"):
            return None
        return GAME + path[:-4] + ".png" if path.endswith(".tex") else GAME + path

    # Build a per-locale trait-name -> trait-id map so we can resolve champion.traits
    # (which are localized display names) to stable apiNames.
    trait_name_to_id: dict[str, dict[str, str]] = {}
    for loc in LOCALES:
        m: dict[str, str] = {}
        for trait in sets[loc]["traits"]:
            m[trait["name"]] = trait["apiName"]
        trait_name_to_id[loc] = m

    # ---------- champions ----------
    # Index by apiName across locales. Use the AR set for ordering/cost/traits-length.
    champ_index: dict[str, dict[str, dict]] = {loc: {} for loc in LOCALES}
    for loc in LOCALES:
        for champ in sets[loc]["champions"]:
            champ_index[loc][champ["apiName"]] = champ

    # Decide the canonical champion roster from the AR locale (has cost + traits).
    roster = []
    seen = set()
    for champ in sets["ar_ae"]["champions"]:
        if champ.get("cost", 0) <= 0 or not champ.get("traits"):
            continue
        if champ["apiName"] in seen or champ["name"].startswith("@"):
            continue
        seen.add(champ["apiName"])
        roster.append(champ["apiName"])

    champions = []
    for api_name in roster:
        ar_champ = champ_index["ar_ae"][api_name]
        # Resolve stable trait ids using the AR display names.
        trait_ids = []
        for ar_name in ar_champ["traits"]:
            tid = trait_name_to_id["ar_ae"].get(ar_name)
            if tid and tid not in trait_ids:
                trait_ids.append(tid)

        icon_path = ar_champ.get("squareIcon") or ar_champ.get("icon") or ""
        url = icon_url(icon_path)
        icon = f"/champions/{slugify(api_name)}.webp"
        if url:
            save_image(url, PUBLIC / icon.lstrip("/"), 160)

        name = {}
        ability_name = {}
        ability_desc = {}
        stats = ar_champ.get("stats", {})
        role = ar_champ.get("role", "")
        cost = ar_champ["cost"]
        for loc in LOCALES:
            key = LOCALE_KEY[loc]
            c = champ_index[loc].get(api_name, ar_champ)
            name[key] = c.get("name", ar_champ.get("name", ""))
            ab = c.get("ability", {})
            ability_name[key] = ab.get("name", "")
            ability_desc[key] = strip_html(ab.get("desc", ""))
            # stats/role are numeric/meta and identical across locales; take first non-empty.
            if c.get("stats"):
                stats = c["stats"]
            if c.get("role"):
                role = c["role"]

        champions.append(
            {
                "id": api_name,
                "name": name,
                "cost": cost,
                "traits": trait_ids,
                "icon": icon if (PUBLIC / icon.lstrip("/")).exists() else None,
                "ability": {
                    "name": ability_name,
                    "desc": ability_desc,
                    "variables": ar_champ.get("ability", {}).get("variables", []),
                },
                "stats": stats,
                "role": role,
            }
        )
    champions.sort(key=lambda c: (c["cost"], c["name"]["en"]))
    (DATA / "champions.json").write_text(json.dumps(champions, ensure_ascii=False), "utf-8")

    # ---------- traits ----------
    traits = []
    for trait in sets["ar_ae"]["traits"]:
        tid = trait["apiName"]
        name = {}
        desc = {}
        for loc in LOCALES:
            key = LOCALE_KEY[loc]
            t = next((x for x in sets[loc]["traits"] if x["apiName"] == tid), trait)
            name[key] = t.get("name", trait.get("name", ""))
            desc[key] = t.get("desc", "")
        traits.append(
            {
                "id": tid,
                "name": name,
                "desc": desc,
                "effects": trait.get("effects", []),
            }
        )
    traits.sort(key=lambda t: t["name"]["en"])
    (DATA / "traits.json").write_text(json.dumps(traits, ensure_ascii=False), "utf-8")

    # ---------- items ----------
    all_items = {loc: {i["apiName"]: i for i in raw[loc]["items"]} for loc in LOCALES}
    items = []
    for api_name, item in all_items["ar_ae"].items():
        composition = item.get("composition") or []
        is_component = api_name in BASE_ITEMS
        is_completed = len(composition) == 2 and all(c in BASE_ITEMS for c in composition)
        if not (is_component or is_completed) or "Corrupted" in api_name:
            continue
        url = icon_url(item.get("icon", ""))
        icon_path = f"/items/{slugify(api_name)}.webp"
        if url:
            save_image(url, PUBLIC / icon_path.lstrip("/"), 72)
        name = {}
        desc = {}
        for loc in LOCALES:
            key = LOCALE_KEY[loc]
            it = all_items[loc].get(api_name, item)
            name[key] = it.get("name", item.get("name", ""))
            desc[key] = strip_html(it.get("desc", ""))
        items.append(
            {
                "id": api_name,
                "name": name,
                "desc": desc,
                "icon": icon_path if (PUBLIC / icon_path.lstrip("/")).exists() else None,
                "components": composition,
                "effects": item.get("effects", {}),
                "kind": "component" if is_component else "completed",
            }
        )
    items.sort(key=lambda i: (i["kind"], i["name"]["en"]))
    (DATA / "items.json").write_text(json.dumps(items, ensure_ascii=False), "utf-8")

    # ---------- augments ----------
    augments = []
    wanted = set(CURATED_AUGMENTS)
    for api_name in sorted(wanted):
        ar_item = all_items["ar_ae"].get(api_name)
        if not ar_item or not ar_item.get("isAugment"):
            continue
        url = icon_url(ar_item.get("icon", ""))
        icon_path = f"/augments/{slugify(api_name)}.webp"
        local = PUBLIC / icon_path.lstrip("/")
        if url:
            save_image(url, local, 72)
        name = {}
        desc = {}
        for loc in LOCALES:
            key = LOCALE_KEY[loc]
            it = all_items[loc].get(api_name, ar_item)
            name[key] = it.get("name", ar_item.get("name", ""))
            desc[key] = strip_html(it.get("desc", ""))
        augments.append(
            {
                "id": api_name,
                "name": name,
                "desc": desc,
                "effects": ar_item.get("effects", {}),
                "icon": icon_path if local.exists() else None,
            }
        )
    missing = wanted - {a["id"] for a in augments}
    if missing:
        print(f"  ! missing augments: {sorted(missing)}", file=sys.stderr)
    augments.sort(key=lambda a: a["name"]["en"])
    (DATA / "augments.json").write_text(json.dumps(augments, ensure_ascii=False), "utf-8")

    # ---------- meta ----------
    meta = {
        "set": 18,
        "setName": {"ar": "المجموعة 18", "en": "Set 18", "ja": "セット18"},
        "patch": "18.4b",
        "updated": {
            "ar": "آخر تحديث قبل 11 ساعة",
            "en": "Updated 11 hours ago",
            "ja": "11時間前に更新",
        },
        "source": CDRAGON["ar_ae"],
    }
    (DATA / "meta.json").write_text(json.dumps(meta, ensure_ascii=False), "utf-8")

    print(
        f"done: {len(champions)} champions, {len(traits)} traits, "
        f"{len(items)} items, {len(augments)} augments × {len(LOCALES)} locales"
    )


if __name__ == "__main__":
    main()
