#!/usr/bin/env python3
"""OG 1200×630 · Viento Norte — texto exacto (no Imagine)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "branding"
ISO = OUT / "isologo-512.png"
LOGO = ISO if ISO.exists() else OUT / "og-portfolio.png"
W, H = 1200, 630

FONTS = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/Library/Fonts/Arial.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = FONTS if not bold else [FONTS[0], *FONTS]
    for path in candidates:
        p = Path(path)
        if p.exists():
            try:
                return ImageFont.truetype(str(p), size)
            except OSError:
                continue
    return ImageFont.load_default()


def gradient() -> Image.Image:
    img = Image.new("RGB", (W, H), (18, 16, 15))
    px = img.load()
    for x in range(W):
        t = x / (W - 1)
        r = int(232 + (245 - 232) * t)
        g = int(93 + (166 - 93) * t)
        b = int(38 + (35 - 38) * t)
        for y in range(6):
            px[x, y] = (r, g, b)
    return img


def draw_card(title: str, line: str, kicker: str, dest: Path) -> None:
    img = gradient()
    draw = ImageDraw.Draw(img)
    if LOGO.exists():
        mark = Image.open(LOGO).convert("RGBA")
        mark.thumbnail((168, 168), Image.Resampling.LANCZOS)
        img.paste(mark, (72, 72), mark)
    draw.text((72, 280), kicker, fill=(232, 93, 38), font=font(22, True))
    draw.text((72, 322), title, fill=(250, 247, 242), font=font(56, True))
    draw.text((72, 410), line, fill=(196, 190, 182), font=font(28))
    draw.text((72, 548), "vientonorte.io", fill=(232, 93, 38), font=font(24, True))
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "PNG", optimize=True)
    print(dest, img.size)


def main() -> None:
    src = OUT / "og-portfolio.png"
    if src.exists() and not ISO.exists():
        Image.open(src).save(ISO, "PNG")
        print("archived isologo", ISO)
    draw_card(
        "Viento Norte",
        "Software que se instala. Cliente dueño del dato.",
        "UXtech · módulos a medida",
        OUT / "og-home-1200.png",
    )
    draw_card(
        "Consultoría UX",
        "Diagnóstico, prototipo o proceso. Kickoff en 30 min.",
        "Viento Norte · pymes",
        OUT / "og-consultoria-1200.png",
    )
    # Canonical share file crawlers already request:
    home = Image.open(OUT / "og-home-1200.png")
    home.save(OUT / "og-portfolio.png", "PNG", optimize=True)
    print("wrote og-portfolio.png", home.size)


if __name__ == "__main__":
    main()
