"""Páginas de redirección estáticas (GitHub Pages no emite 301). Canon 2026-09-27.

Cada página:
- meta refresh 0 + JS location.replace con URL **relativa** (sirve igual en / y en /qa/),
- el JS conserva location.search (UTMs) y location.hash; si no hay hash usa el ancla de la tarjeta,
- canonical absoluto al destino (sin fragmento: un canonical no lleva '#'),
- robots noindex, follow.
"""
from __future__ import annotations

import json
from pathlib import Path

ORIGIN = "https://vientonorte.io"


def esc(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def _depth(from_path: str) -> int:
    """'/s/consultoria/' -> 2 · '/s/' -> 1 · '/poc/' -> 1."""
    return len([p for p in from_path.strip("/").split("/") if p])


def relative_target(from_path: str, to_path: str) -> str:
    """Ruta relativa desde el directorio de from_path hasta to_path (ambos absolutos desde la raíz)."""
    if not (from_path.startswith("/") and from_path.endswith("/")):
        raise ValueError(f"from_path debe ser un directorio absoluto: {from_path}")
    if not to_path.startswith("/"):
        raise ValueError(f"to_path debe ser absoluto: {to_path}")
    return "../" * _depth(from_path) + to_path.lstrip("/")


def redirect_html(from_path: str, to_path: str, anchor: str = "", label: str = "") -> str:
    """HTML de redirección from_path -> to_path(#anchor). Paths absolutos desde la raíz del sitio."""
    if "#" in to_path:
        raise ValueError("pasa el ancla en `anchor`, no en to_path")
    rel = relative_target(from_path, to_path)
    frag = f"#{anchor}" if anchor else ""
    canonical = ORIGIN + to_path
    visible = ORIGIN + to_path + frag
    name = label or "Servicios"
    return f"""<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Redirigiendo a {esc(name)} · Viento Norte</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="{esc(canonical)}" />
    <meta http-equiv="refresh" content="0;url={esc(rel + frag)}" />
    <script>
      (function () {{
        var target = {json.dumps(rel)};
        var anchor = {json.dumps(frag)};
        window.location.replace(target + window.location.search + (window.location.hash || anchor));
      }})();
    </script>
  </head>
  <body>
    <p>Esta página se movió a <a href="{esc(rel + frag)}">{esc(visible)}</a>.</p>
  </body>
</html>
"""


def write_redirect(root: Path, from_path: str, to_path: str, anchor: str = "", label: str = "") -> Path:
    dest = root / "public" / from_path.strip("/") / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(redirect_html(from_path, to_path, anchor, label), encoding="utf-8")
    return dest
