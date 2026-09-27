#!/usr/bin/env python3
"""Generate public/servicios HTML + merge locs into sitemap from service-landings.json."""
from __future__ import annotations

import json
import posixpath
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "src/data/service-landings.json").read_text())
ORIGIN = DATA["origin"]
LASTMOD = DATA["lastmod"]
# URL canon (Ro, 2026-09-27): nada client-facing usa /s/ ni /#/. Las fichas viven en
# /servicios/<slug>/ y todos los links internos son RELATIVOS, para que /qa/servicios/*
# nunca salte a producción. Canonical / og:url siguen absolutos (SEO).
RELAY_URL = "https://contact.vientonorte.io/api/contact"
CONTACT_EMAIL = "contacto@vientonorte.io"
# Opciones de «¿Qué necesitas?» → campo intent del relay (worker/src/contact.js, <=80).
INTENT_OPTIONS = [
    "Revisión gratis de un flujo",
    "Web nueva",
    "Otro servicio digital",
]
# Fichas enlazadas desde el nav de todas las páginas (ids de service-landings.json).
NAV_IDS = ["consultoria-ux", "wcag"]

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


def relurl(from_dir: str, to: str) -> str:
    """Relative URL from page directory `from_dir` (e.g. /servicios/x/) to site path `to`."""
    frag = ""
    if "#" in to:
        to, frag = to.split("#", 1)
        frag = "#" + frag
    if to == from_dir:
        return frag or "./"
    is_dir = to.endswith("/")
    r = posixpath.relpath(to, from_dir)
    if is_dir and r != ".":
        r += "/"
    elif r == ".":
        r = "./"
    return r + frag


def hop_html(canon: str, target: str) -> str:
    """Redirect hop. canon = absolute production URL; target = RELATIVE location."""
    return f"""<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Redirigiendo · Viento Norte</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="{esc(canon)}" />
    <meta http-equiv="refresh" content="0;url={esc(target)}" />
    <script>window.location.replace({json.dumps(target)});</script>
  </head>
  <body>
    <p>Esta página se movió: <a href="{esc(target)}">continuar</a>.</p>
  </body>
</html>
"""


def contact_form_html(item: dict) -> str:
    """In-page contact form (#contacto) → relay. Vanilla JS, no deps."""
    form = item["form"]
    source = form["source"]
    preset = form.get("intent", "")
    opts = []
    if not preset:
        opts.append('                <option value="">Elige una opción</option>')
    for o in INTENT_OPTIONS:
        sel = " selected" if o == preset else ""
        opts.append(f'                <option value="{esc(o)}"{sel}>{esc(o)}</option>')
    options = "\n".join(opts)
    subject = esc(f"Consulta · {item['h1']}").replace(" ", "%20")
    lead = esc(form.get("lead", "Cuéntanos qué necesitas. Te respondemos dentro de 1 día hábil."))
    return f"""      <section class="share-contact" id="contacto" aria-labelledby="contacto-title" tabindex="-1">
        <h2 id="contacto-title">Escríbenos</h2>
        <p>{lead}</p>
        <form class="share-form" id="contacto-form" novalidate data-relay="{RELAY_URL}" data-source="{esc(source)}" aria-labelledby="contacto-title">
          <div class="share-form__grid">
            <div class="share-field">
              <label for="contacto-nombre">Nombre</label>
              <input id="contacto-nombre" name="name" type="text" autocomplete="name" required minlength="2" aria-describedby="contacto-nombre-error" />
              <p class="share-field__error" id="contacto-nombre-error" hidden>Escribe tu nombre (mínimo 2 letras).</p>
            </div>
            <div class="share-field">
              <label for="contacto-correo">Correo</label>
              <input id="contacto-correo" name="email" type="email" autocomplete="email" required aria-describedby="contacto-correo-error" />
              <p class="share-field__error" id="contacto-correo-error" hidden>Escribe un correo válido, por ejemplo nombre@empresa.cl.</p>
            </div>
            <div class="share-field">
              <label for="contacto-empresa">Empresa <span class="share-field__opt">(opcional)</span></label>
              <input id="contacto-empresa" name="empresa" type="text" autocomplete="organization" />
            </div>
            <div class="share-field">
              <label for="contacto-intent">¿Qué necesitas?</label>
              <select id="contacto-intent" name="intent" required aria-describedby="contacto-intent-error">
{options}
              </select>
              <p class="share-field__error" id="contacto-intent-error" hidden>Elige una opción.</p>
            </div>
          </div>
          <div class="share-field">
            <label for="contacto-detalle">Cuéntanos más <span class="share-field__opt">(mínimo 10 caracteres)</span></label>
            <textarea id="contacto-detalle" name="detalle" rows="4" required minlength="10" aria-describedby="contacto-detalle-error"></textarea>
            <p class="share-field__error" id="contacto-detalle-error" hidden>Cuéntanos un poco más (mínimo 10 caracteres).</p>
          </div>
          <div class="share-form__honeypot" aria-hidden="true">
            <label for="contacto-gotcha">No completar</label>
            <input id="contacto-gotcha" name="_gotcha" type="text" tabindex="-1" autocomplete="off" />
          </div>
          <div class="share-field share-field--check">
            <input id="contacto-consent" name="consent" type="checkbox" required aria-describedby="contacto-consent-error" />
            <label for="contacto-consent">Acepto que Viento Norte me contacte por esta solicitud.</label>
            <p class="share-field__error" id="contacto-consent-error" hidden>Necesitamos tu autorización para responderte.</p>
          </div>
          <div>
            <button class="share-cta share-form__submit" type="submit">Enviar</button>
          </div>
          <p class="share-form__status" id="contacto-status" role="status" aria-live="polite" tabindex="-1"></p>
        </form>
        <noscript><p>Sin JavaScript, escríbenos a <a href="mailto:{CONTACT_EMAIL}">{CONTACT_EMAIL}</a>.</p></noscript>
        <p class="share-contact__fallback">¿Prefieres correo? <a href="mailto:{CONTACT_EMAIL}?subject={subject}">{CONTACT_EMAIL}</a></p>
      </section>
{CONTACT_SCRIPT}"""


CONTACT_SCRIPT = """      <script>
        (function () {
          var form = document.getElementById("contacto-form");
          if (!form) return;
          var endpoint = form.getAttribute("data-relay");
          var source = form.getAttribute("data-source");
          var status = document.getElementById("contacto-status");
          var btn = form.querySelector("button[type=submit]");
          var f = form.elements;
          var dl = (window.dataLayer = window.dataLayer || []);
          var EMAIL_RE = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

          // CTAs con data-intent (ej. «Gratis · un flujo WCAG») preseleccionan la necesidad.
          document.querySelectorAll('a[href="#contacto"][data-intent]').forEach(function (a) {
            a.addEventListener("click", function () {
              f.intent.value = a.getAttribute("data-intent");
            });
          });

          function setError(input, bad) {
            var err = document.getElementById(input.id + "-error");
            if (bad) input.setAttribute("aria-invalid", "true");
            else input.removeAttribute("aria-invalid");
            if (err) err.hidden = !bad;
            return bad;
          }

          function validate() {
            var invalid = [];
            if (setError(f.name, f.name.value.trim().length < 2)) invalid.push(f.name);
            if (setError(f.email, !EMAIL_RE.test(f.email.value.trim()))) invalid.push(f.email);
            if (setError(f.intent, !f.intent.value)) invalid.push(f.intent);
            if (setError(f.detalle, f.detalle.value.trim().length < 10)) invalid.push(f.detalle);
            if (setError(f.consent, !f.consent.checked)) invalid.push(f.consent);
            return invalid;
          }

          function say(text, state) {
            status.textContent = text;
            status.setAttribute("data-state", state);
          }

          form.addEventListener("submit", function (ev) {
            ev.preventDefault();
            var invalid = validate();
            if (invalid.length) {
              say("Revisa los campos marcados antes de enviar.", "error");
              invalid[0].focus();
              return;
            }
            var empresa = f.empresa.value.trim();
            var lines = [
              f.detalle.value.trim(),
              "",
              "Empresa: " + (empresa || "-"),
              "Necesidad: " + f.intent.value,
              "Página: " + window.location.pathname
            ];
            var body = {
              name: f.name.value.trim(),
              email: f.email.value.trim(),
              message: lines.join("\\n"),
              source: source,
              intent: f.intent.value,
              consent: f.consent.checked === true,
              language: "es",
              _gotcha: f._gotcha.value
            };
            btn.disabled = true;
            say("Enviando…", "pending");
            fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify(body)
            })
              .then(function (r) {
                return r.json().catch(function () { return {}; }).then(function (j) { return r.ok && j.ok === true; });
              })
              .catch(function () { return false; })
              .then(function (ok) {
                btn.disabled = false;
                dl.push({ event: "servicios_contact_submit", source: source, intent: body.intent, status: ok ? "ok" : "error" });
                if (ok) {
                  form.reset();
                  say("¡Listo! Recibimos tu mensaje. Te respondemos dentro de 1 día hábil.", "ok");
                } else {
                  say("No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos a contacto@vientonorte.io.", "error");
                }
                status.focus();
              });
          });
        })();
      </script>"""


def page_html(item: dict, siblings: list[dict]) -> str:
    canon = ORIGIN + item["path"]
    here = item["path"]
    by_id = {s["id"]: s for s in siblings}
    u = lambda to: esc(relurl(here, to))  # noqa: E731 — relative link from this page
    has_form = bool(item.get("form"))
    # Sin formulario propio → contacto en la ficha Consultoría UX (o WCAG para el flujo gratis).
    contact_href = "#contacto" if has_form else u(by_id["consultoria-ux"]["path"] + "#contacto")
    wcag_href = "#contacto" if has_form else u(by_id["wcag"]["path"] + "#contacto")
    others = [s for s in siblings if s["id"] != item["id"] and s["slug"] and not s.get("hopTo")]
    cards = "\n".join(
        f'        <li class="share-card"><p class="share-card__title"><a href="{u(s["path"])}">{esc(s["h1"])}</a></p></li>'
        for s in others[:5]
    )
    nav_links = []
    for nid in NAV_IDS:
        n = by_id[nid]
        cur = ' aria-current="page"' if n["id"] == item["id"] else ""
        nav_links.append(f'          <a href="{u(n["path"])}"{cur}>{esc(n["nav"])}</a>')
    nav_html = "\n".join(nav_links)
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
        else f'<li><a href="{u("/servicios/")}">Servicios</a><span aria-hidden="true"> / </span></li>\n        <li><span aria-current="page">{esc(item["h1"])}</span></li>'
    )
    robots = "" if item.get("index", True) else '    <meta name="robots" content="noindex, follow" />\n'
    current = ' aria-current="page"' if item["id"] == "hub" else ""
    kicker = esc(item["kicker"]) if item.get("kicker") else "Viento Norte · Chile"
    # Teaser del módulo (imagen) solo en fichas producto; sin link al SPA hash (canon 2026-09-27).
    poc_html = ""
    if item.get("poc"):
        poc_alt = esc(f"Prototipo X|CMS · {item['h1']}")
        poc_html = f"""      <section class="share-poc" aria-labelledby="poc-apple">
        <p class="share-poc__kicker">Prototipo</p>
        <h2 id="poc-apple">El módulo en tu operación</h2>
        <p>Sin nube obligatoria. El dato queda en tu CMS o CRM. Mismo craft que la oferta.</p>
        <figure class="share-poc__device">
          <img src="{u("/images/poc-modules/dashboard.png")}" width="1200" height="750" alt="{poc_alt}" />
        </figure>
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
    form_html = contact_form_html(item) + "\n" if has_form else ""
    return f"""<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{esc(item["title"])}</title>
    <meta name="description" content="{esc(item["description"])}" />
{robots}    <link rel="canonical" href="{esc(canon)}" />
    <link rel="stylesheet" href="{u("/servicios/share.css")}" />
    <link rel="icon" type="image/svg+xml" href="{u("/favicon.svg")}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{esc(canon)}" />
    <meta property="og:title" content="{esc(item["title"])}" />
    <meta property="og:description" content="{esc(item["description"])}" />
    <meta property="og:image" content="{ORIGIN}/images/branding/og-consultoria-1200.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="{ORIGIN}/images/branding/og-consultoria-1200.png" />
    <link rel="preload" as="font" type="font/woff2" href="{u("/fonts/chillax/chillax-700.woff2")}" crossorigin />
{GTM}
    <script type="application/ld+json">
      {ld}
    </script>
  </head>
  <body>
{NOSCRIPT}
    <a class="skip-link" href="#main">Ir al contenido principal</a>
    <div class="share-bar" aria-hidden="true"></div>
    <header class="share-banner" role="banner">
      <div class="share-banner__inner">
        <a class="share-logo" href="{u("/")}" aria-label="Viento Norte · Inicio">
          <img src="{u("/images/branding/isologo-512.png")}" width="28" height="28" alt="" />
          <span>Viento Norte</span>
        </a>
        <nav class="share-nav" aria-label="Principal">
          <a href="{u("/")}">Inicio</a>
          <a href="{u("/servicios/")}"{current}>Servicios</a>
{nav_html}
          <a href="{contact_href}">Contacto</a>
        </nav>
      </div>
    </header>
    <nav class="share-crumbs" aria-label="Miga de pan">
      <ol>
        <li><a href="{u("/")}">Inicio</a><span aria-hidden="true"> / </span></li>
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
        <a class="share-cta" href="{contact_href}">Hablemos</a>
        <a class="share-cta share-cta--ghost" href="{wcag_href}" data-intent="Revisión gratis de un flujo">Gratis · un flujo WCAG</a>
      </p>
{form_html}    </main>
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
        target = item.get("hopTo", item["path"])
        s_dir = "/s" + item["path"]  # /s/servicios/<slug>/ → /servicios/<slug>/ (relativo)
        if item.get("hopTo"):
            dest.write_text(hop_html(ORIGIN + target, relurl(item["path"], target)), encoding="utf-8")
            hop_s.write_text(hop_html(ORIGIN + target, relurl(s_dir, target)), encoding="utf-8")
            print("hop", dest, "->", target)
            continue
        dest.write_text(page_html(item, landings), encoding="utf-8")
        hop_s.write_text(hop_html(ORIGIN + target, relurl(s_dir, target)), encoding="utf-8")
        print("page", dest)
        if item.get("inSitemap") and item.get("index"):
            locs.append((ORIGIN + item["path"], item["priority"]))
    merge_sitemap(locs)


if __name__ == "__main__":
    main()
