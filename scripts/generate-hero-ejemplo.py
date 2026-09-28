#!/usr/bin/env python3
"""Hero 1440×900: sitio ficticio marcado Ejemplo. Sin cifras ni precios.

El marco del dispositivo lo pone DeviceFrame. Esta imagen es solo la página.
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "branding"
W, H = 1440, 900

# Tokens ya usados en la home (sin hex nuevos).
PRIMARY = (15, 106, 168)  # --primary #0f6aa8
INK = (10, 10, 10)
PAPER = (232, 229, 223)  # #E8E5DF
WHITE = (255, 255, 255)
MUTED = (120, 116, 110)

LINES = [
    "Ejemplo",
    "Tu negocio, en una página clara",
    "Quién eres, qué ofreces y cómo te contactan",
    "Inicio",
    "Servicios",
    "Contacto",
    "Escríbenos",
]


def font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def main() -> None:
    for line in LINES:
        if any(ch.isdigit() for ch in line) or "$" in line or "%" in line:
            raise SystemExit(f"el hero no puede llevar cifras ni precios: {line}")

    img = Image.new("RGB", (W, H), WHITE)
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, W, 88), fill=PRIMARY)
    draw.text((48, 26), LINES[3], fill=WHITE, font=font(28, True))
    draw.text((220, 26), LINES[4], fill=WHITE, font=font(28, True))
    draw.text((420, 26), LINES[5], fill=WHITE, font=font(28, True))

    draw.rounded_rectangle((48, 140, 280, 196), radius=28, fill=PRIMARY)
    draw.text((78, 152), LINES[0], fill=WHITE, font=font(32, True))

    draw.text((48, 240), LINES[1], fill=INK, font=font(54, True))
    draw.text((48, 330), LINES[2], fill=MUTED, font=font(28))

    blocks = [(48, 440), (500, 440), (952, 440)]
    for x, y in blocks:
        draw.rounded_rectangle((x, y, x + 400, y + 180), radius=16, fill=PAPER)
        draw.rectangle((x + 32, y + 36, x + 220, y + 64), fill=PRIMARY)
        draw.rectangle((x + 32, y + 88, x + 340, y + 112), fill=MUTED)
        draw.rectangle((x + 32, y + 128, x + 280, y + 148), fill=MUTED)

    draw.rounded_rectangle((48, 680, 360, 760), radius=12, fill=PRIMARY)
    draw.text((96, 698), LINES[6], fill=WHITE, font=font(32, True))

    OUT.mkdir(parents=True, exist_ok=True)
    png = OUT / "hero-ejemplo.png"
    webp = OUT / "hero-ejemplo.webp"
    img.save(png, "PNG", optimize=True)
    img.save(webp, "WEBP", quality=80, method=6)
    print(png, webp, img.size)


if __name__ == "__main__":
    main()
