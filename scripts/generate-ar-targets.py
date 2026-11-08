#!/usr/bin/env python3
"""Blancos imprimibles para el prototipo /ar y la geometría que los recorre.

Lissajous usa la ecuación que muestra la ficha (x = sin 3t, y = sin 4t).
El trébol sigue la proyección de mate.py, con el mismo criterio de tramos ocultos.
El diagrama de Penrose es la imagen de Veritasium, aplanada sobre blanco.
"""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "ar"
TARGETS = OUT / "targets"
PENROSE_SRC = Path(
    "/home/ubuntu/.cursor/projects/agent-repos-mi-portafolio/uploads/veritasium_10cm_7b4d.png"
)

SIZE = 1024
INK = (13, 27, 61, 255)  # azul noche
MUTED = (74, 85, 104, 255)  # pizarra
PAPER = (255, 255, 255, 255)

SERIF = "/usr/share/fonts/truetype/noto/NotoSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/macos/Inter-Medium.ttf"
SANS_REG = "/usr/share/fonts/truetype/macos/Inter-Regular.ttf"


def sample(n: int, a: float = 0.0, b: float = 2 * np.pi) -> np.ndarray:
    return np.linspace(a, b, n, endpoint=False)


def lissajous_xy() -> np.ndarray:
    t = sample(2400)
    return np.column_stack((np.sin(3 * t), np.sin(4 * t)))


def trebol_xyz() -> tuple[np.ndarray, np.ndarray]:
    """Devuelve (puntos xyz, máscara de tramo visible en la proyección)."""
    n = 3000
    t = sample(n)
    x = np.sin(t) + 2 * np.sin(2 * t)
    y = np.cos(t) - 2 * np.cos(2 * t)
    z = -np.sin(3 * t)
    p = np.column_stack((x, y))
    hide = np.zeros(n, dtype=bool)
    idx = np.arange(n)
    for i in range(n):
        d = np.hypot(p[:, 0] - p[i, 0], p[:, 1] - p[i, 1])
        far = np.abs(((idx - i + n // 2) % n) - n // 2) > 100
        m = (d < 0.25) & far
        if m.any() and z[m].max() > z[i]:
            hide[i] = True
    return np.column_stack((x, y, z)), ~hide


def segments(mask: np.ndarray) -> list[np.ndarray]:
    """Índices contiguos visibles, en orden de parámetro. El cierre une cola y cabeza."""
    n = len(mask)
    if not mask.any():
        return []
    cuts = np.flatnonzero(mask & np.roll(~mask, 1))
    groups: list[np.ndarray] = []
    for start in cuts:
        run = [start]
        i = (start + 1) % n
        while mask[i] and i != start:
            run.append(i)
            i = (i + 1) % n
        if len(run) > 1:
            groups.append(np.array(run, dtype=int))
    return groups


def stamp_curve(canvas: np.ndarray, pts: np.ndarray, radius: float) -> None:
    h, w = canvas.shape
    r = int(np.ceil(radius))
    yy, xx = np.ogrid[-r : r + 1, -r : r + 1]
    disk = np.clip(radius + 0.6 - np.sqrt(xx * xx + yy * yy), 0, 1).astype(np.float32)
    for x, y in pts:
        ix, iy = int(round(x)), int(round(y))
        x0, y0 = ix - r, iy - r
        x1, y1 = ix + r + 1, iy + r + 1
        if x1 <= 0 or y1 <= 0 or x0 >= w or y0 >= h:
            continue
        sx0, sy0 = max(0, x0), max(0, y0)
        sx1, sy1 = min(w, x1), min(h, y1)
        dx0, dy0 = sx0 - x0, sy0 - y0
        canvas[sy0:sy1, sx0:sx1] = np.maximum(
            canvas[sy0:sy1, sx0:sx1],
            disk[dy0 : dy0 + (sy1 - sy0), dx0 : dx0 + (sx1 - sx0)],
        )


def fit_font(draw: ImageDraw.ImageDraw, text: str, path: str, max_w: int, start: int) -> ImageFont.FreeTypeFont:
    size = start
    while size > 16:
        font = ImageFont.truetype(path, size)
        if draw.textlength(text, font=font) <= max_w:
            return font
        size -= 1
    return ImageFont.truetype(path, 16)


def draw_plate(name: str, equation: str, footer: str, polylines: list[np.ndarray], radius: float = 7.5) -> tuple[Image.Image, dict]:
    img = Image.new("RGBA", (SIZE, SIZE), PAPER)
    draw = ImageDraw.Draw(img)
    frame = 36
    draw.rectangle((frame, frame, SIZE - 1 - frame, SIZE - 1 - frame), outline=INK, width=3)
    draw.rectangle((frame + 10, frame + 10, SIZE - 1 - frame - 10, SIZE - 1 - frame - 10), outline=INK, width=1)
    tick = 22
    span = SIZE - 2 * (frame + 18)
    for i in range(9):
        p = frame + 18 + int(round(i * span / 8))
        draw.line((p, frame, p, frame + tick), fill=INK, width=2)
        draw.line((p, SIZE - 1 - frame - tick, p, SIZE - 1 - frame), fill=INK, width=2)
        draw.line((frame, p, frame + tick, p), fill=INK, width=2)
        draw.line((SIZE - 1 - frame - tick, p, SIZE - 1 - frame, p), fill=INK, width=2)

    title_font = ImageFont.truetype(SERIF, 46)
    eq_font = fit_font(draw, equation, SANS, SIZE - 160, 26)
    foot_font = ImageFont.truetype(SANS_REG, 20)
    draw.text((SIZE / 2, 86), name, font=title_font, fill=INK, anchor="mm")
    draw.text((SIZE / 2, 138), equation, font=eq_font, fill=INK, anchor="mm")
    draw.text((SIZE / 2, SIZE - 78), footer, font=foot_font, fill=MUTED, anchor="mm")

    # Región de la curva, en píxeles, dentro del marco y bajo la ecuación.
    box = (150, 190, SIZE - 150, SIZE - 150)
    all_pts = np.vstack(polylines)
    mn = all_pts.min(axis=0)
    mx = all_pts.max(axis=0)
    extent = np.maximum(mx - mn, 1e-6)
    bw, bh = box[2] - box[0], box[3] - box[1]
    scale = min(bw / extent[0], bh / extent[1])
    fitted = (all_pts - mn) * scale
    fitted_ext = extent * scale
    origin = np.array(
        [box[0] + (bw - fitted_ext[0]) / 2, box[1] + (bh - fitted_ext[1]) / 2],
        dtype=float,
    )
    # Matemáticas con y hacia arriba; la imagen tiene y hacia abajo.
    placed: list[np.ndarray] = []
    for line in polylines:
        q = (line - mn) * scale
        q[:, 1] = fitted_ext[1] - q[:, 1]
        placed.append(q + origin)

    coverage = np.zeros((SIZE, SIZE), np.float32)
    for line in placed:
        stamp_curve(coverage, line, radius)
    ink = (coverage > 0.45).astype(np.uint8) * 255
    plate = np.array(img)
    plate[ink > 0, :3] = INK[:3]
    plate[ink > 0, 3] = 255
    out = Image.fromarray(plate, "RGBA")

    def to_marker(px: float, py: float, z_math: float = 0.0) -> list[float]:
        # 1 unidad MindAR = ancho del blanco. Origen en el centro, y hacia arriba.
        x = (px + 0.5) / SIZE - 0.5
        y = 0.5 - (py + 0.5) / SIZE
        z = z_math * scale / SIZE
        return [round(float(x), 5), round(float(y), 5), round(float(z), 5)]

    return out, {
        "scale": float(scale),
        "placed": placed,
        "to_marker": to_marker,
        "origin": origin,
        "mn": mn,
        "fitted_ext": fitted_ext,
    }


def decimate(pts: np.ndarray, step: int) -> np.ndarray:
    out = pts[::step]
    if len(pts) > 1 and not np.allclose(out[-1], pts[-1]):
        out = np.vstack((out, pts[-1]))
    return out


def marker_path(meta: dict, math_pts: np.ndarray, z: np.ndarray | None, step: int) -> list[list[float]]:
    pts = decimate(math_pts, step)
    z = None if z is None else decimate(z.reshape(-1, 1), step).reshape(-1)
    mn = meta["mn"]
    scale = meta["scale"]
    ext = meta["fitted_ext"]
    origin = meta["origin"]
    path = []
    for i, p in enumerate(pts):
        q = (p - mn) * scale
        px = float(q[0] + origin[0])
        py = float(ext[1] - q[1] + origin[1])
        zz = 0.0 if z is None else float(z[i])
        path.append(meta["to_marker"](px, py, zz))
    return path


def largest_component(mask: np.ndarray) -> np.ndarray:
    h, w = mask.shape
    seen = np.zeros_like(mask, dtype=bool)
    best: list[tuple[int, int]] = []
    ys, xs = np.nonzero(mask)
    for y0, x0 in zip(ys.tolist(), xs.tolist()):
        if seen[y0, x0]:
            continue
        stack = [(y0, x0)]
        seen[y0, x0] = True
        comp = [(y0, x0)]
        while stack:
            y, x = stack.pop()
            for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                if ny < 0 or nx < 0 or ny >= h or nx >= w or seen[ny, nx] or not mask[ny, nx]:
                    continue
                seen[ny, nx] = True
                stack.append((ny, nx))
                comp.append((ny, nx))
        if len(comp) > len(best):
            best = comp
    out = np.zeros_like(mask)
    for y, x in best:
        out[y, x] = True
    return out


def convex_hull(points: np.ndarray) -> np.ndarray:
    pts = np.unique(points, axis=0)
    pts = pts[np.lexsort((pts[:, 1], pts[:, 0]))]

    def cross(o, a, b) -> float:
        return float((a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]))

    lower: list[np.ndarray] = []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    upper: list[np.ndarray] = []
    for p in pts[::-1]:
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    hull = np.array(lower[:-1] + upper[:-1], dtype=float)
    return hull


def rdp(points: np.ndarray, eps: float) -> np.ndarray:
    if len(points) < 3:
        return points
    start, end = points[0], points[-1]
    seg = end - start
    norm = float(np.hypot(seg[0], seg[1]))
    if norm < 1e-9:
        d = np.hypot(points[:, 0] - start[0], points[:, 1] - start[1])
    else:
        d = np.abs(seg[0] * (start[1] - points[:, 1]) - (start[0] - points[:, 0]) * seg[1]) / norm
    i = int(np.argmax(d))
    if d[i] > eps:
        left = rdp(points[: i + 1], eps)
        right = rdp(points[i:], eps)
        return np.vstack((left[:-1], right))
    return np.vstack((start, end))


def max_pool(mask: np.ndarray, step: int) -> np.ndarray:
    """Una celda queda oscura si cualquier píxel del bloque lo está. Conserva líneas finas."""
    h, w = mask.shape
    h2, w2 = h // step, w // step
    cropped = mask[: h2 * step, : w2 * step]
    return cropped.reshape(h2, step, w2, step).any(axis=(1, 3))


def penrose_paths(image: Image.Image) -> dict:
    rgb = np.array(image.convert("RGB"))
    luma = rgb.mean(axis=2)
    dark = luma < 80
    # Agrupa sin romper las líneas del diagrama; los rótulos quedan aparte si no tocan el trazo.
    step = 3
    small = max_pool(dark, step)
    comp = largest_component(small)
    ys, xs = np.nonzero(comp)
    pts = np.column_stack((xs * step, ys * step)).astype(float)
    hull = convex_hull(pts)
    # Cerrar y simplificar. El contorno es el resalte.
    closed = np.vstack((hull, hull[0]))
    simple = rdp(closed, 6.0)
    if not np.allclose(simple[0], simple[-1]):
        simple = np.vstack((simple, simple[0]))
    w, h = image.size

    def pix_to_marker(px: float, py: float) -> list[float]:
        x = (px + 0.5) / w - 0.5
        y = (h / 2 - (py + 0.5)) / w
        return [round(float(x), 5), round(float(y), 5), 0.012]

    outline = [pix_to_marker(px, py) for px, py in simple[:-1]]
    left = hull[int(np.argmin(hull[:, 0]))]
    right = hull[int(np.argmax(hull[:, 0]))]
    # Camino que cruza el diagrama, de i⁰ (derecha) hacia el lado del horizonte.
    crossing = [pix_to_marker(right[0], right[1]), pix_to_marker(left[0], left[1])]
    return {
        "width": w,
        "height": h,
        "closed": [True, False],
        "radius": 0.007,
        "paths": [outline, crossing],
    }


def main() -> None:
    TARGETS.mkdir(parents=True, exist_ok=True)

    lisa = lissajous_xy()
    plate, meta = draw_plate(
        "Lissajous 3:4",
        "x = sin 3t     y = sin 4t",
        "Viento Norte  ·  blanco 1 de 3",
        [lisa],
    )
    plate.convert("RGB").save(TARGETS / "lissajous-3-4.png", optimize=True)
    lisa_path = marker_path(meta, lisa, None, 5)
    for p in lisa_path:
        p[2] = 0.012

    xyz, visible = trebol_xyz()
    groups = segments(visible)
    ink_lines = [xyz[idx, :2] for idx in groups]
    plate, meta = draw_plate(
        "Nudo trébol",
        "x = sin t + 2 sin 2t     y = cos t − 2 cos 2t",
        "Viento Norte  ·  blanco 2 de 3",
        ink_lines,
        radius=6.5,
    )
    plate.convert("RGB").save(TARGETS / "nudo-trebol.png", optimize=True)
    trebol_path = marker_path(meta, xyz[:, :2], xyz[:, 2], 4)
    ink_paths = []
    for line in ink_lines:
        ink_paths.append(marker_path(meta, line, None, 3))

    src = Image.open(PENROSE_SRC).convert("RGBA")
    paper = Image.new("RGB", src.size, (255, 255, 255))
    paper.paste(src, mask=src.split()[-1])
    paper.save(TARGETS / "penrose-veritasium.png", optimize=True)
    penrose = penrose_paths(paper)

    curves = {
        "order": ["lissajous", "trebol", "penrose"],
        "lissajous": {
            "width": SIZE,
            "height": SIZE,
            "closed": [True],
            "radius": 0.014,
            "paths": [lisa_path],
            "ink": [lisa_path],
        },
        "trebol": {
            "width": SIZE,
            "height": SIZE,
            "closed": [True],
            "radius": 0.012,
            "paths": [trebol_path],
            "ink": ink_paths,
        },
        "penrose": {
            **penrose,
            "ink": penrose["paths"],
        },
    }
    (OUT / "curves.json").write_text(json.dumps(curves, separators=(",", ":")), encoding="utf-8")
    print("lissajous", len(lisa_path), "trebol", len(trebol_path), "ink", len(ink_paths))
    print("penrose", penrose["width"], penrose["height"], "hull", len(penrose["paths"][0]))


if __name__ == "__main__":
    main()
