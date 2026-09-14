#!/usr/bin/env python3
"""Generate public/servicios HTML + merge locs into sitemap from service-landings.json."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "src/data/service-landings.json").read_text())
ORIGIN = DATA["origin"]
LASTMOD = DATA["lastmod"]
# Producto UI (HashRouter). No /s/consultoria (piloto Ads).
PRODUCT_UI = "/#/consultoria"
# Apple POC (PR #130) — not the SEM funnel.
POC_APPLE = "/#/consultoria/modulos/dashboard"

GTM = """    <script>
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-PM5LBQRP");
    </script>"""

NOSCRIPT = """    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-PM5LBQRP"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
        title="Google Tag Manager"
      ></iframe
    ></noscript>"""


def esc(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def hop_html(canon: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Redirigiendo a {esc(canon)} · Viento Norte</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="{esc(canon)}" />
    <meta http-equiv="refresh" content="0;url={esc(canon)}" />
    <script>window.location.replace("{canon}");</script>
  </head>
  <body>
    <p>Canon: <a href="{esc(canon)}">{esc(canon)}</a></p>
  </body>
</html>
"""


def page_html(item: dict, siblings: list[dict]) -> str:
    canon = ORIGIN + item["path"]
    others = [s for s in siblings if s["id"] != item["id"] and s["slug"]]
    cards = "\n".join(
        f'        <li class="share-card"><p class="share-card__title"><a href="{esc(s["path"])}">{esc(s["h1"])}</a></p></li>'
        for s in others[:5]
    )
    types = ", ".join(json.dumps(t, ensure_ascii=False) for t in item["serviceType"])
    ld = f"""{{
        "@context": "https://schema.org",
        "@type": "{"ItemList" if item["id"]=="hub" else "Service"}",
        "@id": "{canon}",
        "name": {json.dumps(item["h1"], ensure_ascii=False)},
        "url": "{canon}",
        "provider": {{ "@type": "Organization", "name": "Viento Norte", "url": "{ORIGIN}/" }},
        "areaServed": {{ "@type": "Country", "name": "Chile" }},
        "serviceType": [{types}],
        "description": {json.dumps(item["description"], ensure_ascii=False)}
      }}"""
    crumb_tail = (
        '<li><span aria-current="page">Servicios</span></li>'
        if item["id"] == "hub"
        else f'<li><a href="/servicios/">Servicios</a><span aria-hidden="true"> / </span></li>\n        <li><span aria-current="page">{esc(item["h1"])}</span></li>'
    )
    robots = "" if item.get("index", True) else '    <meta name="robots" content="noindex, follow" />\n'
    current = ' aria-current="page"' if item["id"] == "hub" else ""
    kicker = esc(item["kicker"]) if item.get("kicker") else "Viento Norte · Chile"
    # Apple POC = /#/consultoria. Only product landings teaser it; never seguridad/privacidad/WCAG.
    poc_html = ""
    if item.get("poc"):
        poc_alt = esc(f"Prototipo X|CMS · {item['h1']}")
        poc_html = f"""      <section class="share-poc" aria-labelledby="poc-apple">
        <p class="share-poc__kicker">Prototipo</p>
        <h2 id="poc-apple">El módulo en tu operación</h2>
        <p>Sin nube obligatoria. El dato queda en tu CMS o CRM. Mismo craft que la oferta.</p>
        <figure class="share-poc__device">
          <img src="/images/poc-modules/dashboard.png" width="1200" height="750" alt="{poc_alt}" />
        </figure>
        <p>
          <a class="share-cta" href="{POC_APPLE}">Ver prototipo</a>
        </p>
      </section>"""
    extra = []
    if item.get("pains"):
        lis = "\n".join(
            f'        <li class="share-card"><p class="share-card__title">{esc(p["h"])}</p><p>{esc(p["p"])}</p></li>'
            for p in item["pains"]
        )
        extra.append(f"      <h2>Qué duele</h2>\n      <ul class=\"share-cards\">\n{lis}\n      </ul>")
    if item.get("packs"):
        extra.append(
            """      <h2>Packs</h2>
      <ul class="share-cards">
        <li class="share-card"><p class="share-card__title">Diagnóstico</p><p>Un flujo. WCAG 2.2 AA.</p></li>
        <li class="share-card"><p class="share-card__title">Prototipo</p><p>Interfaz en tu CMS o CRM.</p></li>
        <li class="share-card"><p class="share-card__title">Proceso de equipo</p><p>Cómo operan juntos.</p></li>
      </ul>"""
        )
    if item.get("checklist"):
        extra.append(
            """      <h2>Checklist Ley 21.719 (en esta página)</h2>
      <p>Doce puntos. No es dictamen legal ni mentoría. CTA: Hablemos.</p>
      <ol>
        <li>Opt-in activo (checkboxes desmarcados).</li>
        <li>Finalidad visible + link a política.</li>
        <li>Scripts de medición no disparan antes del consentimiento.</li>
        <li>Rechazar cookies con la misma jerarquía que Aceptar.</li>
        <li>HTTPS en tránsito; cifrado en reposo en el CRM.</li>
        <li>Minimización de campos.</li>
        <li>RBAC + MFA en admin.</li>
        <li>API keys no en JavaScript de cliente.</li>
        <li>Sanitización XSS/SQLi en servidor.</li>
        <li>Log de consentimiento (timestamp + versión).</li>
        <li>Canal para derechos ARCOP.</li>
        <li>Borrado o anonimización en CMS + CRM + mail.</li>
      </ol>"""
        )
    extra_html = "\n".join(extra)
    return f"""<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{esc(item["title"])}</title>
    <meta name="description" content="{esc(item["description"])}" />
{robots}    <link rel="canonical" href="{esc(canon)}" />
    <link rel="stylesheet" href="/servicios/share.css" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{esc(canon)}" />
    <meta property="og:title" content="{esc(item["title"])}" />
    <meta property="og:description" content="{esc(item["description"])}" />
    <meta property="og:image" content="{ORIGIN}/images/branding/og-consultoria-1200.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="{ORIGIN}/images/branding/og-consultoria-1200.png" />
    <link rel="preload" as="font" type="font/woff2" href="/fonts/chillax/chillax-700.woff2" crossorigin />
{GTM}
    <script type="application/ld+json">
      {ld}
    </script>
  </head>
  <body>
{NOSCRIPT}
    <a class="skip-link" href="#main">Ir al contenido principal</a>
    <header class="share-banner" role="banner">
      <div class="share-banner__inner">
        <a class="share-logo" href="/" aria-label="Viento Norte · Inicio">
          <img src="/images/branding/isologo-512.png" width="28" height="28" alt="" />
          <span>Viento Norte</span>
        </a>
        <nav class="share-nav" aria-label="Principal">
          <a href="/">Inicio</a>
          <a href="/#/consultoria">Consultoría</a>
          <a href="/servicios/"{current}>Servicios</a>
          <a href="/#/proceso">Proceso</a>
        </nav>
      </div>
    </header>
    <nav class="share-crumbs" aria-label="Miga de pan">
      <ol>
        <li><a href="/">Inicio</a><span aria-hidden="true"> / </span></li>
        {crumb_tail}
      </ol>
    </nav>
    <main id="main" class="share-main" tabindex="-1">
      <section class="share-hero" aria-labelledby="page-h1">
        <div class="share-bar" aria-hidden="true"></div>
        <p class="meta">{kicker}</p>
        <h1 id="page-h1">{esc(item["h1"])}</h1>
        <p class="lead">{esc(item["description"])}</p>
      </section>
{poc_html}
{extra_html}
      <h2>También</h2>
      <ul class="share-cards">
{cards}
      </ul>
      <p>
        <a class="share-cta" href="/#/consultoria">Hablemos</a>
        <a class="share-cta share-cta--ghost" href="/#/consultoria">Gratis · un flujo WCAG</a>
      </p>
    </main>
    <footer class="share-footer">
      <div class="share-footer__inner">
        <p>Viento Norte · Diseño que reduce el ruido.</p>
        <p><a href="mailto:contacto@vientonorte.io">contacto@vientonorte.io</a></p>
      </div>
    </footer>
  </body>
</html>
"""


def merge_sitemap(locs: list[tuple[str, float]]) -> None:
    sm = ROOT / "public/sitemap.xml"
    xml = sm.read_text()
    # drop previous /servicios entries
    xml = re.sub(
        r"\s*<url>\s*<loc>https://vientonorte\.io/servicios/[^<]*</loc>.*?</url>",
        "",
        xml,
        flags=re.S,
    )
    xml = re.sub(
        r"\s*<url>\s*<loc>https://vientonorte\.io/s/servicios/[^<]*</loc>.*?</url>",
        "",
        xml,
        flags=re.S,
    )
    block = []
    for loc, pri in locs:
        block.append(
            f"""  <url>
    <loc>{loc}</loc>
    <lastmod>{LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>{pri}</priority>
  </url>"""
        )
    insert = "\n" + "\n".join(block) + "\n</urlset>"
    if "</urlset>" not in xml:
        raise SystemExit("sitemap missing urlset")
    xml = re.sub(r"</urlset>\s*$", insert, xml)
    sm.write_text(xml)
    print("sitemap", sm)


def main() -> None:
    landings = DATA["landings"]
    locs = []
    for item in landings:
        rel = item["slug"]
        dest = ROOT / "public" / "servicios" / rel / "index.html" if rel else ROOT / "public/servicios/index.html"
        dest.parent.mkdir(parents=True, exist_ok=True)
        hop_s = ROOT / "public/s/servicios" / rel / "index.html" if rel else ROOT / "public/s/servicios/index.html"
        hop_s.parent.mkdir(parents=True, exist_ok=True)
        hop_target = ORIGIN + item.get("hopTo", item["path"])
        if item.get("hopTo"):
            dest.write_text(hop_html(hop_target), encoding="utf-8")
            hop_s.write_text(hop_html(hop_target), encoding="utf-8")
            print("hop", dest, "->", hop_target)
            continue
        dest.write_text(page_html(item, landings), encoding="utf-8")
        hop_s.write_text(hop_html(ORIGIN + item["path"]), encoding="utf-8")
        print("page", dest)
        if item.get("inSitemap") and item.get("index"):
            locs.append((ORIGIN + item["path"], item["priority"]))
    merge_sitemap(locs)


if __name__ == "__main__":
    main()
