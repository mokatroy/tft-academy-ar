#!/usr/bin/env python3
"""Build mokatroystft-source.zip: the site plus the desktop overlay sources.

Skips build output, dependencies and screenshots so the archive stays a clean
source drop that can be unzipped and run with `npm install`.

Run with: npm run archive
"""
from __future__ import annotations

import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ARCHIVE = ROOT / "mokatroystft-source.zip"

TOP_FILES = [
    ".gitignore",
    "README.md",
    "index.html",
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "vite.config.ts",
    "public/_redirects",
]

SOURCE_DIRS = [
    "src",
    "public",
    "scripts",
    "overlay",
]

EXTRA = [
    ".github/workflows/deploy-cloudflare.yml",
]

SKIP_DIRS = {"node_modules", "dist", "release", "__pycache__", ".git", ".cache"}
SKIP_SUFFIXES = {".zip", ".test.mjs", ".smoke.cjs", ".log"}
SKIP_FILES = {"mokatroystft-source.zip"}


def iter_files(base: Path):
    for path in sorted(base.rglob("*")):
        if not path.is_file():
            continue
        relative = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in relative.parts):
            continue
        if path.name in SKIP_FILES or any(path.name.endswith(suffix) for suffix in SKIP_SUFFIXES):
            continue
        yield path


def main() -> int:
    entries: set[Path] = set()

    for name in TOP_FILES + EXTRA:
        candidate = ROOT / name
        if candidate.is_file():
            entries.add(candidate)
        else:
            print(f"skip (missing): {name}")

    for directory in SOURCE_DIRS:
        base = ROOT / directory
        if not base.is_dir():
            print(f"skip (missing dir): {directory}")
            continue
        for path in iter_files(base):
            # The overlay's screenshots/scripts output is not source.
            if path.name.endswith(".mjs") and path.parent.name == "scripts" and path.name != "preview.mjs":
                continue
            entries.add(path)

    with zipfile.ZipFile(ARCHIVE, "w", zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(entries):
            archive.write(path, path.relative_to(ROOT).as_posix())

    with zipfile.ZipFile(ARCHIVE) as archive:
        bad = archive.testzip()
        count = len(archive.namelist())

    if bad:
        print(f"corrupt entry: {bad}")
        return 1

    print(f"{ARCHIVE.name}: {count} entries, {ARCHIVE.stat().st_size} bytes")
    return 0


if __name__ == "__main__":
    sys.exit(main())
