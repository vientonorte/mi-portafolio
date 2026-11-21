#!/usr/bin/env python3
"""OG 1200×630 · Viento Norte — texto exacto (no Imagine).

El isologo sale de public/favicon.svg (esquinas transparentes).
isologo-512.png, icon-512 e og-portfolio.png traen el blanco horneado
(alpha opaco); no se usan como marca.
"""
from __future__ import annotations

import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "branding"
ISO = OUT / "isologo-512.png"
MARK_SVG = ROOT / "public" / "favicon.svg"
W, H = 1200, 630
MARK_XY = (72, 72)
MARK_SIZE = 168
WHITE = (255, 255, 255)

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


def render_mark(size: int = MARK_SIZE) -> Image.Image:
    """Raster de favicon.svg. Aborta si el archivo no trae transparencia real."""
    if not MARK_SVG.is_file():
        raise SystemExit(f"no está el logo transparente: {MARK_SVG}")
    with tempfile.TemporaryDirectory() as tmp:
        dest = Path(tmp) / "mark.png"
        subprocess.run(
            [
                "rsvg-convert",
                "-w",
                str(size),
                "-h",
                str(size),
                "-o",
                str(dest),
                str(MARK_SVG),
            ],
            check=True,
        )
        mark = Image.open(dest).convert("RGBA")
    if mark.size != (size, size):
        raise SystemExit(f"raster inesperado {mark.size}")
    if mark.getchannel("A").getextrema()[0] != 0:
        raise SystemExit("el raster del logo no tiene píxeles transparentes")
    if mark.getpixel((0, 0))[3] != 0 or mark.getpixel((size - 1, size - 1))[3] != 0:
        raise SystemExit("las esquinas del logo no son transparentes")
    return mark


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
    mark = render_mark(MARK_SIZE)
    img.paste(mark, MARK_XY, mark)
    draw.text((72, 280), kicker, fill=(232, 93, 38), font=font(22, True))
    draw.text((72, 322), title, fill=(250, 247, 242), font=font(56, True))
    draw.text((72, 410), line, fill=(196, 190, 182), font=font(28))
    draw.text((72, 548), "vientonorte.io", fill=(232, 93, 38), font=font(24, True))
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "PNG", optimize=True)
    print(dest, img.size)


def draw_servicios() -> None:
    """OG de /servicios/. Misma paleta que el resto; sin hex nuevos."""
    draw_card(
        "Servicios para pymes",
        "Web, revisión gratis y consultoría UX.",
        "Viento Norte",
        OUT / "og-servicios-1200.png",
    )


def slot_is_white_box(img: Image.Image) -> bool:
    """True si el slot 168×168 del logo es un recuadro blanco sobre fondo oscuro."""
    if img.size != (W, H):
        return False
    x, y = MARK_XY
    s = MARK_SIZE
    px = img.load()
    corners = (
        px[x, y],
        px[x + s - 1, y],
        px[x, y + s - 1],
        px[x + s - 1, y + s - 1],
    )
    if any(pixel != WHITE for pixel in corners):
        return False
    if px[x - 1, y + s // 2] == WHITE:
        return False
    return True


def patch_white_box(path: Path) -> bool:
    """Reemplaza solo el recuadro blanco. El texto y el resto del PNG quedan iguales."""
    img = Image.open(path).convert("RGB")
    if not slot_is_white_box(img):
        print(f"skip {path.name}: sin recuadro blanco en el slot del logo")
        return False
    x, y = MARK_XY
    s = MARK_SIZE
    bg = img.getpixel((x - 1, y + s // 2))
    patched = img.copy()
    ImageDraw.Draw(patched).rectangle([x, y, x + s - 1, y + s - 1], fill=bg)
    mark = render_mark(s)
    patched.paste(mark, (x, y), mark)
    src = img.load()
    out = patched.load()
    white = 0
    for yy in range(H):
        for xx in range(W):
            in_slot = x <= xx < x + s and y <= yy < y + s
            if in_slot:
                if out[xx, yy] == WHITE:
                    white += 1
                continue
            if out[xx, yy] != src[xx, yy]:
                raise SystemExit(f"pixel fuera del logo cambió en {path.name} ({xx},{yy})")
    if white:
        raise SystemExit(f"{path.name} todavía tiene {white} px blancos en el logo")
    if patched.size != (W, H):
        raise SystemExit(f"{path.name} size {patched.size}")
    patched.save(path, "PNG", optimize=True)
    nbytes = path.stat().st_size
    if nbytes >= 300 * 1024:
        raise SystemExit(f"{path.name} pesa {nbytes} bytes (≥ 300 KB)")
    print(f"patched {path.name} {patched.size} {nbytes} bytes bg={bg}")
    return True


def patch_brand_og() -> None:
    changed = 0
    for path in sorted(OUT.glob("og-*.png")):
        if patch_white_box(path):
            changed += 1
    if changed == 0:
        raise SystemExit("ningún og-*.png tenía el recuadro blanco")


def main() -> None:
    src = OUT / "og-portfolio.png"
    if src.exists() and not ISO.exists():
        Image.open(src).save(ISO, "PNG")
        print("archived isologo", ISO)
    draw_card(
        "Viento Norte",
        "Diseño que reduce el ruido.",
        "UXtech · consultoría",
        OUT / "og-home-1200.png",
    )
    draw_card(
        "Consultoría UX",
        "Un flujo WCAG. Luego herramientas en tu perímetro.",
        "Viento Norte · pymes",
        OUT / "og-consultoria-1200.png",
    )
    draw_servicios()
    # Canonical share file crawlers already request:
    home = Image.open(OUT / "og-home-1200.png")
    home.save(OUT / "og-portfolio.png", "PNG", optimize=True)
    print("wrote og-portfolio.png", home.size)


if __name__ == "__main__":
    import sys

    if "--patch-logo" in sys.argv:
        patch_brand_og()
    elif "--only-servicios" in sys.argv:
        draw_servicios()
    else:
        main()
