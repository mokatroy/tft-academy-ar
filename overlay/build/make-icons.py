#!/usr/bin/env python3
"""Generate the overlay's app + tray icons (hex board motif, no font needed).

Run with: python3 build/make-icons.py
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
GOLD = (245, 196, 81, 255)
GOLD_DIM = (245, 196, 81, 90)
DARK_TOP = (16, 24, 37, 255)
DARK_BOTTOM = (6, 10, 16, 255)
SCALE = 4


def hexagon(cx: float, cy: float, radius: float) -> list[tuple[float, float]]:
    # Flat-top hex, matching a TFT board tile.
    import math

    return [
        (cx + radius * math.cos(math.radians(60 * i)), cy + radius * math.sin(math.radians(60 * i)))
        for i in range(6)
    ]


def app_icon(size: int = 512) -> Image.Image:
    big = size * SCALE
    canvas = Image.new('RGBA', (big, big), (0, 0, 0, 0))

    # Vertical gradient background with rounded corners.
    gradient = Image.new('RGBA', (big, big))
    draw = ImageDraw.Draw(gradient)
    for y in range(big):
        t = y / (big - 1)
        color = tuple(round(DARK_TOP[i] + (DARK_BOTTOM[i] - DARK_TOP[i]) * t) for i in range(4))
        draw.line([(0, y), (big, y)], fill=color)

    mask = Image.new('L', (big, big), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, big - 1, big - 1], radius=int(big * 0.22), fill=255)
    canvas.paste(gradient, (0, 0), mask)

    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(
        [big * 0.02, big * 0.02, big * 0.98, big * 0.98],
        radius=int(big * 0.21),
        outline=(245, 196, 81, 70),
        width=int(big * 0.012),
    )

    center = big / 2
    outer = big * 0.33
    draw.polygon(hexagon(center, center, outer), outline=GOLD, width=int(big * 0.028))
    draw.polygon(hexagon(center, center, outer * 0.66), fill=GOLD_DIM)
    draw.polygon(hexagon(center, center, outer * 0.36), fill=GOLD)

    return canvas.resize((size, size), Image.LANCZOS)


def tray_icon(size: int = 32) -> Image.Image:
    big = size * SCALE
    canvas = Image.new('RGBA', (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    center = big / 2
    draw.polygon(hexagon(center, center, big * 0.44), fill=GOLD)
    draw.polygon(hexagon(center, center, big * 0.26), fill=(10, 14, 21, 255))
    return canvas.resize((size, size), Image.LANCZOS)


if __name__ == '__main__':
    app_icon(512).save(HERE / 'icon.png')
    tray_icon(32).save(HERE / 'tray.png')
    print('wrote', HERE / 'icon.png', 'and', HERE / 'tray.png')
