#!/usr/bin/env python3
"""Rebuild public/s/**, /poc/ y las fichas antiguas /servicios/<slug>/. 0 LLM.

Canon 2026-09-27 (PO):
- /s/polijuego-privacy/ se publica tal cual con chrome VN (fuera del sitemap).
- El resto de /s/**, /poc/ y las fichas /servicios/<slug>/ (ex share.css) son páginas de
  redirección a /servicios/ (o al ancla de la tarjeta), definidas en src/data/legacy-redirects.json.
- /servicios/ (índice, Vite + prerender de #277) y las landings por rubro /servicios/<slug>/ de
  src/data/rubros.json (P4) nunca se escriben aquí: write_redirect() falla (redirect_pages.vite_owned_paths).
- Migración P4: quitar la fila de legacy-redirects.json libera la ruta para la plantilla nueva
  (ver generate-service-landings.py, "renderer": "vite"). Ojo: el archivo ya escrito en
  public/servicios/<slug>/index.html hay que borrarlo en ese mismo PR.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from redirect_pages import write_redirect  # noqa: E402
from share_chrome import render_page  # noqa: E402

OG_HOME = "https://vientonorte.io/images/branding/og-home-1200.png"
REDIRECTS = json.loads((ROOT / "src/data/legacy-redirects.json").read_text())


def write(path: Path, html: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html)
    print(path.relative_to(ROOT))


def write_polijuego_privacy() -> None:
    poli_inner = """      <p class="meta">Viento Norte · bundle <code>io.vientonorte.polijuego</code></p>
      <h1>Privacidad · R.A.D.A.R. El Polijuego</h1>
      <div class="share-rule" aria-hidden="true"></div>
      <p class="lead">
        Política de privacidad de la app nativa RADAR El Polijuego (v1 Free).
        Página HTML estática. No es la política de consultoría ni el formulario
        de contacto del sitio.
      </p>
      <ul class="share-cards">
        <li class="share-card">
          <h2>Sin cuenta</h2>
          <p>No account. No hay cuenta, no hay registro y no hay servidor de identidad. El juego no pide email ni perfil.</p>
        </li>
        <li class="share-card">
          <h2>Cero red de contenido</h2>
          <p>No network for game content. v1 Free no envía cartas, notas, tableros ni partidas a internet. El contenido del juego vive en este dispositivo.</p>
        </li>
        <li class="share-card">
          <h2>Qué se guarda (vault)</h2>
          <p>AES-256-GCM vault on device. El tablero (sesiones, cartas, notas, acuerdos) se cifra con AES-256-GCM y queda solo en este teléfono. La clave está en Keychain/Keystore ThisDeviceOnly (<code>WHEN_UNLOCKED_THIS_DEVICE_ONLY</code>).</p>
        </li>
        <li class="share-card">
          <h2>Export JSON</h2>
          <p>Export JSON only on user action. «Exportar JSON» genera un archivo en claro en el share sheet. Solo ocurre si lo pides; no hay backup en la nube.</p>
        </li>
        <li class="share-card">
          <h2>Purge</h2>
          <p>Purge rotates key and deletes file. «Borrar todos mis datos» rota la clave, borra el archivo del vault y elimina sesiones y notas de este teléfono. No se puede deshacer. No hay cuenta que borrar en un servidor.</p>
        </li>
        <li class="share-card">
          <h2>Sin anuncios ni analítica</h2>
          <p>No ads/analytics. No hay SDK de anuncios ni de analytics. Las salas remotas y las compras in-app no están en esta versión.</p>
        </li>
        <li class="share-card">
          <h2>Quién publica</h2>
          <p>Viento Norte · <a href="mailto:contacto@vientonorte.io">contacto@vientonorte.io</a></p>
        </li>
      </ul>
      <p class="meta">Actualizado 24 ago 2026 · v1 Free</p>
      <h2 lang="en">English (store crawlers)</h2>
      <p lang="en">
        RADAR El Polijuego: no account; no network for game content; AES-256-GCM
        vault on device; Keychain/Keystore ThisDeviceOnly; export JSON only on
        user action; purge rotates key and deletes file; no ads/analytics.
      </p>"""
    write(
        ROOT / "public/s/polijuego-privacy/index.html",
        render_page(
            title="Privacidad · RADAR El Polijuego · Viento Norte",
            description="RADAR El Polijuego: no account; no network for game content; AES-256-GCM vault on device; Keychain/Keystore ThisDeviceOnly; export JSON only on user action; purge rotates key and deletes file; no ads/analytics.",
            canonical="https://vientonorte.io/s/polijuego-privacy/",
            og=OG_HOME,
            current="/s/polijuego-privacy/",
            crumbs=[("/", "Inicio"), ("/s/polijuego-privacy/", "Privacidad Polijuego")],
            inner=poli_inner,
            gtm=False,
        ),
    )


def write_redirects() -> None:
    for r in REDIRECTS["redirects"]:
        if r["from"] == "/servicios/":
            raise SystemExit("/servicios/ es la página Vite (#277); no puede redirigir")
        if r["from"] in REDIRECTS["keep"]:
            raise SystemExit(f"{r['from']} está en keep; no puede redirigir")
        dest = write_redirect(ROOT, r["from"], r["to"], r.get("anchor", ""))
        frag = f"#{r['anchor']}" if r.get("anchor") else ""
        print(dest.relative_to(ROOT), "->", r["to"] + frag)


def main() -> None:
    write_polijuego_privacy()
    write_redirects()


if __name__ == "__main__":
    main()
