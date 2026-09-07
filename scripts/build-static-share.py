#!/usr/bin/env python3
"""Rebuild public/s index, consultoria, proceso, polijuego with VN chrome. 0 LLM."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from share_chrome import render_page  # noqa: E402

OG_HOME = "https://vientonorte.io/images/branding/og-home-1200.png"
OG_CONS = "https://vientonorte.io/images/branding/og-consultoria-1200.png"
OG_PROC = "https://vientonorte.io/images/branding/og-proceso-1200.png"


def write(path: Path, html: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html)
    print(path.relative_to(ROOT))


def consultoria_extra_head() -> str:
    return """    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://vientonorte.io/s/consultoria/",
        "name": "Consultoría UX · Viento Norte",
        "url": "https://vientonorte.io/s/consultoria/",
        "image": "https://vientonorte.io/images/branding/og-consultoria-1200.png",
        "provider": {
          "@type": "Organization",
          "name": "Viento Norte",
          "url": "https://vientonorte.io/"
        },
        "areaServed": { "@type": "Country", "name": "Chile" },
        "serviceType": [
          "Tecnología para empresas",
          "Operaciones digitales",
          "Diagnóstico UX",
          "Prototipo",
          "Proceso de equipo",
          "Accesibilidad WCAG"
        ],
        "description": "Tecnología para empresas: operaciones digitales y el flujo que usa tu cliente, en su CMS o CRM. Diagnóstico 5–7 días. Gratis: accesibilidad WCAG 2.2 AA de un flujo. Kickoff 30 min."
      }
    </script>"""


def proceso_extra_head() -> str:
    return """    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "https://vientonorte.io/s/proceso/",
        "name": "Proceso UX · Viento Norte",
        "url": "https://vientonorte.io/s/proceso/",
        "image": "https://vientonorte.io/images/branding/og-proceso-1200.png",
        "isPartOf": {
          "@type": "WebSite",
          "name": "Viento Norte",
          "url": "https://vientonorte.io/"
        },
        "description": "Diseño que reduce el ruido. 5 fases aplicadas sobre el CMS o CRM del cliente. No es un pack paid."
      }
    </script>"""


def main() -> None:
    home_inner = """      <h1>Tecnología para empresas</h1>
      <div class="share-rule" aria-hidden="true"></div>
      <p class="lead">
        Operaciones digitales y el flujo que usa tu cliente, en su CMS o CRM.
        Diagnóstico 5–7 días. Gratis: accesibilidad de un flujo. Kickoff 30 min.
      </p>
      <ul class="share-cards">
        <li class="share-card">Diagnóstico</li>
        <li class="share-card">Prototipo</li>
        <li class="share-card">Proceso de equipo</li>
        <li class="share-card">Operaciones digitales</li>
        <li class="share-card">Revisión gratis de un flujo</li>
        <li class="share-card">En su CMS o CRM</li>
      </ul>
      <p>
        <a class="share-cta" href="/s/consultoria/">Consultoría</a>
        <a class="share-cta share-cta--ghost" href="/">Sitio Viento Norte</a>
      </p>"""
    write(
        ROOT / "public/s/index.html",
        render_page(
            title="Tecnología para empresas · Viento Norte",
            description="Tecnología para empresas: operaciones digitales y el flujo que usa tu cliente, en su CMS o CRM. Diagnóstico 5–7 días. Gratis: accesibilidad de un flujo. Kickoff 30 min.",
            canonical="https://vientonorte.io/",
            og=OG_HOME,
            current="/",
            crumbs=[("/", "Inicio")],
            inner=home_inner,
        ),
    )

    cons_inner = """      <h1>Tecnología para empresas</h1>
      <div class="share-rule" aria-hidden="true"></div>
      <p class="lead">
        Operaciones digitales y el flujo que usa tu cliente, en su CMS o CRM.
        Diagnóstico 5–7 días. Gratis: accesibilidad de un flujo. Kickoff 30 min.
      </p>
      <ul class="share-cards">
        <li class="share-card">Diagnóstico</li>
        <li class="share-card">Prototipo</li>
        <li class="share-card">Proceso de equipo</li>
        <li class="share-card">Operaciones digitales</li>
        <li class="share-card">Revisión gratis de un flujo</li>
        <li class="share-card">En su CMS o CRM</li>
      </ul>
      <p>
        <a class="share-cta" href="/s/consultoria/">Gratis · un flujo WCAG</a>
        <a class="share-cta share-cta--ghost" href="/s/proceso/">Ver el proceso</a>
      </p>"""
    write(
        ROOT / "public/s/consultoria/index.html",
        render_page(
            title="Consultoría UX · Viento Norte",
            description="Tecnología para empresas: operaciones digitales y el flujo que usa tu cliente, en su CMS o CRM. Diagnóstico 5–7 días. Gratis: accesibilidad de un flujo. Kickoff 30 min.",
            canonical="https://vientonorte.io/s/consultoria/",
            og=OG_CONS,
            current="/s/consultoria/",
            crumbs=[("/", "Inicio"), ("/s/consultoria/", "Consultoría")],
            inner=cons_inner,
            extra_head=consultoria_extra_head(),
        ),
    )

    proc_inner = """      <p class="meta">Viento Norte</p>
      <h1>Diseño que reduce el ruido</h1>
      <div class="share-rule" aria-hidden="true"></div>
      <p class="lead">
        5 macroprocesos sobre tu CMS o CRM — Jira, SharePoint, Salesforce,
        headless. El dato y el tenant siguen siendo tuyos.
      </p>
      <ul class="share-cards">
        <li class="share-card"><h2>UX Analytics</h2></li>
        <li class="share-card"><h2>UX Research</h2></li>
        <li class="share-card"><h2>UX/UI Design</h2></li>
        <li class="share-card"><h2>UX Testing</h2></li>
        <li class="share-card"><h2>Refinamiento</h2></li>
      </ul>
      <p>
        Mismo método: branding de producto, analytics, research aplicado,
        contenidos y automatización social. No es un quinto pack paid.
      </p>
      <p>
        <a class="share-cta" href="/s/consultoria/">Diagnóstico / accesibilidad de un flujo</a>
        <a class="share-cta share-cta--ghost" href="/s/proceso/">Proceso UX</a>
      </p>"""
    write(
        ROOT / "public/s/proceso/index.html",
        render_page(
            title="Proceso UX · Viento Norte",
            description="Diseño que reduce el ruido. 5 fases sobre tu CMS o CRM: analytics, research, diseño, testing, refinamiento. SURA, Transvip, Karri.",
            canonical="https://vientonorte.io/s/proceso/",
            og=OG_PROC,
            current="/s/proceso/",
            crumbs=[("/", "Inicio"), ("/s/proceso/", "Proceso")],
            inner=proc_inner,
            extra_head=proceso_extra_head(),
        ),
    )

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


if __name__ == "__main__":
    main()
