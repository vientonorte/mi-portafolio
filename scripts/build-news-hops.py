#!/usr/bin/env python3
"""Generate static crawler HTML /s/news and /news from src/data/news-editions.json. 0 LLM.
No timed hop to /#/ — GSC treats that as a redirect error.
SPA stays at /#/news; crawlers index /s/news.
"""
from __future__ import annotations

import html
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from share_chrome import render_page  # noqa: E402

CATALOG = json.loads((ROOT / "src/data/news-editions.json").read_text())


def hop_html(
    *,
    title: str,
    description: str,
    canonical: str,
    hash_path: str,
    h1: str,
    body_html: str,
    og: str,
    current: str,
    crumbs: list[tuple[str, str]],
) -> str:
    inner = f"""      <p class="meta">Viento Norte · News</p>
      <h1>{h1}</h1>
      <div class="share-rule" aria-hidden="true"></div>
      {body_html}"""
    return render_page(
        title=title,
        description=description,
        canonical=canonical,
        og=og,
        current=current,
        crumbs=crumbs,
        inner=inner,
        og_type="article",
        extra_head=f"    <!-- SPA {hash_path} is separate. Do not auto-redirect this share URL to hash. -->",
    )


def write(path: Path, html: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html)
    print(path.relative_to(ROOT))


def main() -> None:
    og = "https://vientonorte.io/images/branding/og-consultoria-1200.png"
    index_title = "News para empresas · Viento Norte"
    lis = "".join(
        f'<li class="share-card"><a href="/s/news/{html.escape(e["slug"])}/">{html.escape(e["title"]["es"])} — {html.escape(e["company"])}</a></li>'
        for e in CATALOG["editions"]
    )
    upcoming = "".join(
        f'<li>{html.escape(u["company"])} · {html.escape(u["period"])} — {html.escape(u["note_es"])}</li>'
        for u in CATALOG.get("upcoming", [])
    )
    body = f"""<p class="lead">Privacidad, automatización y accesibilidad para empresas. Ediciones mensuales. Sin KPI inventados.</p>
      <ul class="share-cards">{lis}</ul>
      <h2>En preparación</h2>
      <ul>{upcoming}</ul>
      <p><a class="share-cta" href="/s/consultoria/">Gratis · un flujo WCAG</a></p>"""
    index_html = hop_html(
        title=index_title,
        description="Newsletter mensual: privacidad, automatización y accesibilidad para empresas. Casos públicos, sin KPI inventados.",
        canonical=CATALOG["canonicalIndex"],
        hash_path="/news",
        h1="Privacidad, automatización y accesibilidad para empresas",
        body_html=body,
        og=og,
        current="/s/news/",
        crumbs=[("/", "Inicio"), ("/s/news/", "News")],
    )
    write(ROOT / "public/s/news/index.html", index_html)
    write(ROOT / "public/news/index.html", index_html)

    for e in CATALOG["editions"]:
        paras = "".join(f"<p>{html.escape(p)}</p>" for p in e["paragraphs"]["es"])
        evidence = "".join(f"<li>{html.escape(x)}</li>" for x in e["evidence"])
        body = f"""<p class="lead">{e["dek"]["es"]}</p>
      {paras}
      <h2>Evidencia (hub público)</h2>
      <ul>{evidence}</ul>
      <p class="meta">Fuente: {e["source"]}</p>
      <p><a class="share-cta" href="/s/consultoria/">Gratis · un flujo WCAG · Agendar 30 min</a></p>"""
        canonical = f"https://vientonorte.io/s/news/{e['slug']}/"
        edition_html = hop_html(
            title=html.escape(f"{e['title']['es']} · Viento Norte"),
            description=html.escape(e["dek"]["es"]),
            canonical=canonical,
            hash_path=f"/news/{e['slug']}",
            h1=e["title"]["es"],
            body_html=body,
            og=og,
            current="/s/news/",
            crumbs=[
                ("/", "Inicio"),
                ("/s/news/", "News"),
                (canonical.replace("https://vientonorte.io", ""), e["title"]["es"]),
            ],
        )
        write(ROOT / f"public/s/news/{e['slug']}/index.html", edition_html)


if __name__ == "__main__":
    main()
