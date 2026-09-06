#!/usr/bin/env python3
"""Generate static crawler HTML /s/news and /news from src/data/news-editions.json. 0 LLM.
No timed hop to /#/ — GSC treats that as a redirect error.
SPA stays at /#/news; crawlers index /s/news.
"""
from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = json.loads((ROOT / "src/data/news-editions.json").read_text())
GTM = "GTM-PM5LBQRP"


def hop_html(*, title: str, description: str, canonical: str, hash_path: str, h1: str, body_html: str, og: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content="{description}" />
    <link rel="canonical" href="{canonical}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="{canonical}" />
    <meta property="og:title" content="{title}" />
    <meta property="og:description" content="{description}" />
    <meta property="og:image" content="{og}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="{og}" />
    <script>
      (function (w, d, s, l, i) {{
        w[l] = w[l] || [];
        w[l].push({{ "gtm.start": new Date().getTime(), event: "gtm.js" }});
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      }})(window, document, "script", "dataLayer", "{GTM}");
    </script>
    <!-- SPA {hash_path} is separate. Do not auto-redirect this share URL to hash. -->
  </head>
  <body>
    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id={GTM}"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
        title="Google Tag Manager"
      ></iframe
    ></noscript>
    <main>
      <p>Viento Norte · News</p>
      <h1>{h1}</h1>
      {body_html}
    </main>
  </body>
</html>
"""


def write(path: Path, html: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html)
    print(path.relative_to(ROOT))


def main() -> None:
    og = "https://vientonorte.io/images/branding/og-consultoria-1200.png"
    index_title = "News para empresas · Viento Norte"
    lis = "".join(
        f'<li><a href="/s/news/{html.escape(e["slug"])}/">{html.escape(e["title"]["es"])} — {html.escape(e["company"])}</a></li>'
        for e in CATALOG["editions"]
    )
    upcoming = "".join(
        f'<li>{html.escape(u["company"])} · {html.escape(u["period"])} — {html.escape(u["note_es"])}</li>'
        for u in CATALOG.get("upcoming", [])
    )
    body = f"""<p>Privacidad, automatización y accesibilidad para empresas. Ediciones mensuales. Sin KPI inventados.</p>
      <ul>{lis}</ul>
      <h2>En preparación</h2>
      <ul>{upcoming}</ul>
      <p><a href="/s/consultoria/">Gratis · un flujo WCAG</a></p>"""
    index_html = hop_html(
        title=index_title,
        description="Newsletter mensual: privacidad, automatización y accesibilidad para empresas. Casos públicos, sin KPI inventados.",
        canonical=CATALOG["canonicalIndex"],
        hash_path="/news",
        h1="Privacidad, automatización y accesibilidad para empresas",
        body_html=body,
        og=og,
    )
    write(ROOT / "public/s/news/index.html", index_html)
    write(ROOT / "public/news/index.html", index_html)

    for e in CATALOG["editions"]:
        paras = "".join(f"<p>{html.escape(p)}</p>" for p in e["paragraphs"]["es"])
        evidence = "".join(f"<li>{html.escape(x)}</li>" for x in e["evidence"])
        body = f"""<p>{e["dek"]["es"]}</p>
      {paras}
      <h2>Evidencia (hub público)</h2>
      <ul>{evidence}</ul>
      <p>Fuente: {e["source"]}</p>
      <p><a href="/s/consultoria/">Gratis · un flujo WCAG · Agendar 30 min</a></p>"""
        canonical = f"https://vientonorte.io/s/news/{e['slug']}/"
        edition_html = hop_html(
            title=html.escape(f"{e['title']['es']} · Viento Norte"),
            description=html.escape(e["dek"]["es"]),
            canonical=canonical,
            hash_path=f"/news/{e['slug']}",
            h1=e["title"]["es"],
            body_html=body,
            og=og,
        )
        write(ROOT / f"public/s/news/{e['slug']}/index.html", edition_html)


if __name__ == "__main__":
    main()
