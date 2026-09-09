"""Static /s/ chrome matching FO landmarks + @vientonorte/tokens. No hash hop."""

from __future__ import annotations

GTM = "GTM-PM5LBQRP"
NAV = (
    ("/", "Inicio"),
    ("/s/consultoria/", "Consultoría"),
    ("/s/proceso/", "Proceso"),
)


def _gtm_head() -> str:
    return f"""    <script>
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
    </script>"""


def _gtm_noscript() -> str:
    return f"""    <noscript
      ><iframe
        src="https://www.googletagmanager.com/ns.html?id={GTM}"
        height="0"
        width="0"
        style="display: none; visibility: hidden"
        title="Google Tag Manager"
      ></iframe
    ></noscript>"""


def _nav(current: str) -> str:
    links = []
    for href, label in NAV:
        cur = ' aria-current="page"' if href == current else ""
        links.append(f'        <a href="{href}"{cur}>{label}</a>')
    return "\n".join(links)


def _crumbs(crumbs: list[tuple[str, str]]) -> str:
    items = []
    for i, (href, label) in enumerate(crumbs):
        last = i == len(crumbs) - 1
        if last or not href:
            items.append(
                f'          <li><span aria-current="page">{label}</span></li>'
            )
        else:
            items.append(f'          <li><a href="{href}">{label}</a><span aria-hidden="true"> / </span></li>')
    return f"""    <nav class="share-crumbs" aria-label="Miga de pan">
      <ol>
{chr(10).join(items)}
      </ol>
    </nav>"""


def render_page(
    *,
    title: str,
    description: str,
    canonical: str,
    og: str,
    current: str,
    crumbs: list[tuple[str, str]],
    inner: str,
    extra_head: str = "",
    og_type: str = "website",
    gtm: bool = True,
) -> str:
    gtm_head = _gtm_head() if gtm else ""
    gtm_body = _gtm_noscript() if gtm else ""
    return f"""<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content="{description}" />
    <link rel="canonical" href="{canonical}" />
    <link rel="stylesheet" href="/s/share.css" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:type" content="{og_type}" />
    <meta property="og:url" content="{canonical}" />
    <meta property="og:title" content="{title}" />
    <meta property="og:description" content="{description}" />
    <meta property="og:image" content="{og}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="{og}" />
    <link rel="preload" as="font" type="font/woff2" href="/fonts/chillax/chillax-700.woff2" crossorigin />
{gtm_head}
{extra_head}
  </head>
  <body>
{gtm_body}
    <a class="skip-link" href="#main">Ir al contenido principal</a>
    <header class="share-banner" role="banner">
      <div class="share-banner__inner">
        <a class="share-logo" href="/" aria-label="Viento Norte · Inicio">
          <img src="/images/branding/isologo-512.png" width="28" height="28" alt="" />
          <span>Viento Norte</span>
        </a>
        <nav class="share-nav" aria-label="Principal">
{_nav(current)}
        </nav>
      </div>
    </header>
{_crumbs(crumbs)}
    <main id="main" class="share-main" tabindex="-1">
{inner}
    </main>
    <footer class="share-footer">
      <div class="share-footer__inner">
        <p>Viento Norte · Diseño que reduce el ruido.</p>
        <p><a href="mailto:contacto@vientonorte.io">contacto@vientonorte.io</a></p>
        <nav aria-label="Pie">
          <a href="/">Inicio</a>
          <a href="/s/consultoria/">Consultoría</a>
          <a href="/s/proceso/">Proceso</a>
          <a href="/s/polijuego-privacy/">Privacidad Polijuego</a>
        </nav>
      </div>
    </footer>
  </body>
</html>
"""
