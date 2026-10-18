#!/usr/bin/env python3
"""Build the Arabic TFT dataset and local images from CommunityDragon.

Source: https://raw.communitydragon.org/latest/cdragon/tft/ar_ae.json
Run with: npm run fetch-data
"""
from __future__ import annotations

import io
import json
import os
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
CDRAGON = "https://raw.communitydragon.org/latest/cdragon/tft/ar_ae.json"
GAME = "https://raw.communitydragon.org/latest/game/"
SET_NUMBER = "18"

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
            req = urllib.request.Request(url, headers={"User-Agent": "mokatroytft/1.0"})
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


def main() -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    for folder in ("champions", "items", "augments"):
        (PUBLIC / folder).mkdir(parents=True, exist_ok=True)

    cache_file = CACHE / "tft_ar.json"
    if cache_file.exists():
        print(f"using cached {cache_file}")
        payload = cache_file.read_bytes()
    else:
        print("downloading CommunityDragon Arabic TFT data…")
        payload = fetch(CDRAGON)
        cache_file.write_bytes(payload)

    raw = json.loads(payload)
    set_data = raw["sets"][SET_NUMBER]
    all_items = {item["apiName"]: item for item in raw["items"]}

    # Not every icon path is a converted png; those wrapped in {hash} are skipped.
    def icon_url(path: str) -> str | None:
        if not path or path.startswith("{"):
            return None
        return GAME + path[:-4] + ".png" if path.endswith(".tex") else GAME + path

    champions = []
    seen = set()
    for champ in set_data["champions"]:
        if champ.get("cost", 0) <= 0 or not champ.get("traits"):
            continue
        if champ["apiName"] in seen or champ["name"].startswith("@"):
            continue
        seen.add(champ["apiName"])
        icon_path = champ.get("squareIcon") or champ.get("icon") or ""
        url = icon_url(icon_path)
        icon = f"/champions/{slugify(champ['apiName'])}.webp"
        if url:
            save_image(url, PUBLIC / icon.lstrip("/"), 160)
        champions.append(
            {
                "id": champ["apiName"],
                "name": champ["name"],
                "cost": champ["cost"],
                "traits": champ["traits"],
                "icon": icon if (PUBLIC / icon.lstrip("/")).exists() else None,
                "ability": {
                    "name": champ.get("ability", {}).get("name", ""),
                    "desc": strip_html(champ.get("ability", {}).get("desc", "")),
                    "variables": champ.get("ability", {}).get("variables", []),
                },
                "stats": champ.get("stats", {}),
                "role": champ.get("role", ""),
            }
        )
    champions.sort(key=lambda c: (c["cost"], c["name"]))
    (DATA / "champions.json").write_text(json.dumps(champions, ensure_ascii=False), "utf-8")

    traits = []
    for trait in set_data["traits"]:
        traits.append(
            {
                "id": trait["apiName"],
                "name": trait["name"],
                "desc": trait.get("desc", ""),
                "effects": trait.get("effects", []),
            }
        )
    traits.sort(key=lambda t: t["name"])
    (DATA / "traits.json").write_text(json.dumps(traits, ensure_ascii=False), "utf-8")

    items = []
    for api_name, item in all_items.items():
        composition = item.get("composition") or []
        is_component = api_name in BASE_ITEMS
        is_completed = len(composition) == 2 and all(c in BASE_ITEMS for c in composition)
        if not (is_component or is_completed) or "Corrupted" in api_name:
            continue
        url = icon_url(item.get("icon", ""))
        icon_path = f"/items/{slugify(api_name)}.webp"
        if url:
            save_image(url, PUBLIC / icon_path.lstrip("/"), 72)
        items.append(
            {
                "id": api_name,
                "name": item["name"],
                "desc": strip_html(item.get("desc", "")),
                "icon": icon_path if (PUBLIC / icon_path.lstrip("/")).exists() else None,
                "components": composition,
                "effects": item.get("effects", {}),
                "kind": "component" if is_component else "completed",
            }
        )
    items.sort(key=lambda i: (i["kind"], i["name"]))
    (DATA / "items.json").write_text(json.dumps(items, ensure_ascii=False), "utf-8")

    augments = []
    wanted = set(CURATED_AUGMENTS)
    for item in raw["items"]:
        if not item.get("isAugment") or item["apiName"] not in wanted:
            continue
        url = icon_url(item.get("icon", ""))
        icon_path = f"/augments/{slugify(item['apiName'])}.webp"
        local = PUBLIC / icon_path.lstrip("/")
        if url:
            save_image(url, local, 72)
        augments.append(
            {
                "id": item["apiName"],
                "name": item["name"],
                "desc": strip_html(item.get("desc", "")),
                "effects": item.get("effects", {}),
                "icon": icon_path if local.exists() else None,
            }
        )
    missing = wanted - {a["id"] for a in augments}
    if missing:
        print(f"  ! missing augments: {sorted(missing)}", file=sys.stderr)
    augments.sort(key=lambda a: a["name"])
    (DATA / "augments.json").write_text(json.dumps(augments, ensure_ascii=False), "utf-8")

    meta = {
        "set": 18,
        "setName": "المجموعة 18",
        "patch": "18.4b",
        "updated": "آخر تحديث قبل 11 ساعة",
        "source": CDRAGON,
    }
    (DATA / "meta.json").write_text(json.dumps(meta, ensure_ascii=False), "utf-8")

    print(
        f"done: {len(champions)} champions, {len(traits)} traits, "
        f"{len(items)} items, {len(augments)} augments"
    )


if __name__ == "__main__":
    main()
