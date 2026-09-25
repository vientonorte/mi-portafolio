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


OG_WEB_EXPRESS = OG_HOME  # TODO(Rö): OG 1200×630 propio para /s/web-express/ si se pauta en Meta.
WEB_EXPRESS_URL = "https://vientonorte.io/s/web-express/"
WEB_EXPRESS_CTA = "Quiero mi web en 72h"


def web_express_extra_head() -> str:
    return """    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://vientonorte.io/s/web-express/",
        "name": "Web profesional en 72h",
        "url": "https://vientonorte.io/s/web-express/",
        "image": "https://vientonorte.io/images/branding/og-home-1200.png",
        "serviceType": "Diseño y desarrollo de sitio web one-page",
        "provider": {
          "@type": "Organization",
          "name": "Viento Norte",
          "url": "https://vientonorte.io/",
          "email": "contacto@vientonorte.io"
        },
        "areaServed": { "@type": "Country", "name": "Chile" },
        "description": "Web one-page con plantilla Viento Norte adaptada a tu marca, botón WhatsApp o formulario de contacto, responsive y 1 ronda de cambios. Entrega en 72 horas hábiles tras recibir el contenido. No incluye dominio ni hosting.",
        "offers": {
          "@type": "Offer",
          "name": "Web profesional en 72h",
          "price": "30000",
          "priceCurrency": "CLP",
          "availability": "https://schema.org/InStock",
          "url": "https://vientonorte.io/s/web-express/",
          "seller": { "@type": "Organization", "name": "Viento Norte" }
        }
      }
    </script>"""


def web_express_script() -> str:
    return """      <script>
        (function () {
          // TODO(Rö): pegar el link real de Mercado Pago (anticipo 50% = $15.000). Aún no existe.
          var MP_LINK_ANTICIPO = "TODO_MP_LINK";
          // TODO(Rö): número WhatsApp VN, formato internacional sin "+" (ej. 569XXXXXXXX). No hay número en el repo.
          var VN_WHATSAPP = "TODO_WHATSAPP";
          // Relay existente del sitio (worker/src/contact.js · src/lib/site-contact.ts CONTACT_API_URL).
          var CONTACT_API_URL = "https://contact.vientonorte.io/api/contact";
          var CONTACT_EMAIL = "contacto@vientonorte.io";
          var WA_TEXT = "Hola, quiero mi web profesional en 72h por $30.000.";
          var isTodo = function (v) { return !v || v.indexOf("TODO") === 0; };
          var dl = (window.dataLayer = window.dataLayer || []);
          var track = function (event, params) {
            var payload = { event: event, product: "web_express_72h" };
            for (var k in params) payload[k] = params[k];
            dl.push(payload);
          };

          // Paso 1 · CTA principal → WhatsApp (o formulario mientras VN_WHATSAPP sea TODO).
          document.querySelectorAll("[data-we-cta]").forEach(function (a) {
            if (!isTodo(VN_WHATSAPP)) {
              a.href = "https://wa.me/" + VN_WHATSAPP + "?text=" + encodeURIComponent(WA_TEXT);
              a.target = "_blank";
              a.rel = "noopener";
            }
            a.addEventListener("click", function () {
              track("web_express_cta_click", {
                location: a.getAttribute("data-we-cta"),
                destination: isTodo(VN_WHATSAPP) ? "form" : "whatsapp"
              });
            });
          });

          // Paso 3 · anticipo Mercado Pago (secundario, dentro de «Cómo funciona»).
          document.querySelectorAll("[data-we-mp]").forEach(function (a) {
            if (!isTodo(MP_LINK_ANTICIPO)) {
              a.href = MP_LINK_ANTICIPO;
              a.target = "_blank";
              a.rel = "noopener";
            }
            a.addEventListener("click", function () {
              track("web_express_mp_click", { configured: !isTodo(MP_LINK_ANTICIPO) });
            });
          });

          // Barra fija mobile: se oculta cuando el hero o el CTA final están a la vista.
          var sticky = document.getElementById("we-sticky");
          if (sticky) {
            document.body.classList.add("has-offer-sticky");
            var watched = document.querySelectorAll("[data-we-hide-sticky]");
            if ("IntersectionObserver" in window && watched.length) {
              var visible = new Set();
              var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                  if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target);
                });
                sticky.hidden = visible.size > 0;
              });
              watched.forEach(function (el) { io.observe(el); });
            }
          }

          // Formulario de respaldo → relay existente; si falla, mailto prellenado.
          var form = document.getElementById("we-form");
          if (form) {
            var status = document.getElementById("we-form-status");
            form.addEventListener("submit", function (ev) {
              ev.preventDefault();
              if (!form.reportValidity()) return;
              var f = form.elements;
              var lines = [
                "Producto: Web profesional en 72h ($30.000)",
                "Rubro: " + f.rubro.value.trim(),
                "Instagram o sitio: " + (f.link.value.trim() || "-"),
                "WhatsApp: " + (f.whatsapp.value.trim() || "-")
              ];
              var body = {
                name: f.name.value.trim(),
                email: f.email.value.trim(),
                message: lines.join("\\n"),
                _gotcha: f._gotcha.value,
                source: "form",
                intent: "web-express-72h",
                consent: f.consent.checked,
                language: "es"
              };
              var mailto = "mailto:" + CONTACT_EMAIL +
                "?subject=" + encodeURIComponent("Web en 72h · " + body.name) +
                "&body=" + encodeURIComponent("Nombre: " + body.name + "\\nEmail: " + body.email + "\\n" + body.message);
              var btn = form.querySelector("button[type=submit]");
              btn.disabled = true;
              status.textContent = "Enviando…";
              fetch(CONTACT_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(body)
              })
                .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return r.ok && j.ok; }); })
                .catch(function () { return false; })
                .then(function (ok) {
                  btn.disabled = false;
                  track("web_express_form_submit", { status: ok ? "ok" : "fallback_mailto" });
                  if (ok) {
                    form.reset();
                    status.textContent = "¡Listo! Te escribimos dentro de 1 día hábil.";
                  } else {
                    status.textContent = "No pudimos enviarlo. Abrimos tu correo para que lo mandes directo.";
                    window.location.href = mailto;
                  }
                });
            });
          }
        })();
      </script>"""


def _we_cta(location: str, extra_class: str = "") -> str:
    cls = f"vn-btn vn-btn--primary {extra_class}".strip()
    return (
        f'<a class="{cls}" href="#formulario" data-we-cta="{location}" '
        f'data-todo="VN_WHATSAPP">{WEB_EXPRESS_CTA}</a>'
    )


def web_express_inner() -> str:
    mail_mp = "mailto:contacto@vientonorte.io?subject=Web%20en%2072h%20%C2%B7%20anticipo%20%2415.000"
    mock = """<div class="offer-mock{mod}" aria-hidden="true"><span class="offer-mock__bar"></span><span class="offer-mock__hero"></span><span class="offer-mock__line"></span><span class="offer-mock__line offer-mock__line--short"></span><span class="offer-mock__btn"></span></div>"""
    return f"""      <!-- Embudo: anuncio → esta landing → conversación (WhatsApp o formulario) → anticipo 50% (Mercado Pago). -->
      <!-- TODO(Rö): VN_WHATSAPP y MP_LINK_ANTICIPO son placeholders (script al final). Mientras sean TODO, el CTA lleva al formulario y el anticipo abre mailto. -->
      <section class="offer-hero" aria-labelledby="we-title" data-we-hide-sticky>
        <p class="meta">Viento Norte · para emprendedores y pymes</p>
        <h1 id="we-title">Tu web profesional en 72h por $30.000</h1>
        <div class="share-rule" aria-hidden="true"></div>
        <p class="lead">
          Pasa de solo Instagram a una página con tu marca y un botón para que tus clientes te escriban.
        </p>
        <ul class="offer-facts" aria-label="Resumen de la oferta">
          <li><span class="offer-price">$30.000</span> CLP</li>
          <li>72h hábiles</li>
          <li>50% al partir, 50% al entregar</li>
        </ul>
        <div class="offer-actions">
          {_we_cta("hero")}
        </div>
        <p class="offer-hint">Conversamos primero. Pagas solo cuando confirmamos.</p>
      </section>

      <section class="offer-section" aria-labelledby="we-recibes">
        <h2 id="we-recibes">Qué recibes</h2>
        <ul class="offer-grid">
          <li class="offer-card"><h3>Una página con todo</h3><p>Quién eres, qué ofreces y cómo contactarte, en una sola página.</p></li>
          <li class="offer-card"><h3>Tu marca, no una plantilla genérica</h3><p>Plantilla Viento Norte adaptada a tu logo, colores y textos.</p></li>
          <li class="offer-card"><h3>Botón WhatsApp o formulario</h3><p>Tus clientes te escriben en un toque.</p></li>
          <li class="offer-card"><h3>Se ve bien en el celular</h3><p>Responsive: celular, tablet y computador.</p></li>
          <li class="offer-card"><h3>1 ronda de cambios</h3><p>Revisas la web y ajustamos lo que necesites.</p></li>
          <li class="offer-card"><h3>Lista en 72h hábiles</h3><p>Desde que recibimos el anticipo y tu contenido.</p></li>
        </ul>
      </section>

      <section class="offer-section" aria-labelledby="we-ejemplos">
        <h2 id="we-ejemplos">Ejemplos</h2>
        <p class="meta">Maquetas ilustrativas de la plantilla. No son clientes reales.</p>
        <!-- TODO(Rö): reemplazar por entregas reales (con permiso del cliente) cuando existan. No inventar nombres ni testimonios. -->
        <ul class="offer-grid offer-grid--3">
          <li class="offer-card">
            {mock.format(mod="")}
            <h3>Ejemplo · Cafetería</h3>
            <p>Portada, carta destacada, horario, ubicación y botón WhatsApp.</p>
          </li>
          <li class="offer-card">
            {mock.format(mod=" offer-mock--alt")}
            <h3>Ejemplo · Servicio profesional</h3>
            <p>Quién eres, tus servicios, cómo trabajas y formulario de contacto.</p>
          </li>
          <li class="offer-card">
            {mock.format(mod=" offer-mock--warm")}
            <h3>Ejemplo · Emprendimiento de Instagram</h3>
            <p>Productos destacados, cómo comprar y botón directo a WhatsApp.</p>
          </li>
        </ul>
      </section>

      <section class="offer-section" id="como-funciona" aria-labelledby="we-pasos">
        <h2 id="we-pasos">Cómo funciona</h2>
        <ol class="offer-steps">
          <li>
            <h3>Nos escribes</h3>
            <p>Cuéntanos de tu negocio por WhatsApp o con el formulario.</p>
          </li>
          <li>
            <h3>Te decimos qué necesitamos</h3>
            <p>Logo, textos, 3 a 6 fotos y tu WhatsApp o correo. Si te falta algo, te ayudamos a ordenarlo.</p>
          </li>
          <li class="offer-step--pay">
            <h3>Confirmas y pagas 50% ($15.000)</h3>
            <p>Con link de Mercado Pago. Ahí parten las 72h hábiles.</p>
            <div class="offer-actions">
              <!-- TODO(Rö): MP_LINK_ANTICIPO pendiente; mientras tanto abre mailto. -->
              <a class="vn-btn vn-btn--secondary" href="{mail_mp}" data-we-mp data-todo="MP_LINK_ANTICIPO">Pagar anticipo $15.000</a>
            </div>
          </li>
          <li>
            <h3>Recibes tu web y pagas el resto</h3>
            <p>Revisas, pides tu ronda de cambios y pagas el 50% restante ($15.000) al entregar.</p>
          </li>
        </ol>
      </section>

      <section class="offer-section" aria-labelledby="we-no-incluye">
        <h2 id="we-no-incluye">Qué no incluye</h2>
        <ul class="offer-list">
          <li><strong>Dominio y hosting:</strong> se cotizan aparte. Te orientamos para elegir.</li>
          <li><strong>Tienda online</strong> (carrito o pagos dentro de la web).</li>
          <li><strong>Más páginas.</strong> Si necesitas más, lo cotizamos aparte.</li>
        </ul>
      </section>

      <section class="offer-section" aria-labelledby="we-faq">
        <h2 id="we-faq">Preguntas frecuentes</h2>
        <details class="offer-faq">
          <summary>¿Cuándo empiezan a correr las 72h?</summary>
          <p>Cuando recibimos el anticipo y tu contenido completo. Son 72 horas hábiles (lunes a viernes).</p>
        </details>
        <details class="offer-faq">
          <summary>No tengo dominio ni hosting, ¿qué hago?</summary>
          <p>No están incluidos en los $30.000. Te orientamos para elegir y, si quieres, te cotizamos aparte.</p>
        </details>
        <details class="offer-faq">
          <summary>¿Y si no me gusta el resultado?</summary>
          <p>Tienes 1 ronda de cambios incluida. Pagas el 50% restante solo al entregar.</p>
        </details>
        <details class="offer-faq">
          <summary>¿Puedo pedir más páginas o una tienda online?</summary>
          <p>Este producto es una sola página. Si necesitas más, escríbenos y lo cotizamos aparte.</p>
        </details>
      </section>

      <section class="offer-box offer-box--inverse" id="formulario" aria-labelledby="we-cta-final" data-we-hide-sticky>
        <h2 id="we-cta-final">¿Partimos con tu web?</h2>
        <p>$30.000 CLP · 72h hábiles · 50% al partir y 50% al entregar.</p>
        <div class="offer-actions">
          {_we_cta("final")}
        </div>
        <form class="offer-form" id="we-form" novalidate aria-labelledby="we-form-title">
          <h3 id="we-form-title">¿Prefieres que te escribamos?</h3>
          <p>Déjanos tus datos y te contactamos dentro de 1 día hábil.</p>
          <div class="offer-form__grid">
            <div class="offer-field">
              <label for="we-name">Nombre</label>
              <input id="we-name" name="name" type="text" autocomplete="name" required minlength="2" />
            </div>
            <div class="offer-field">
              <label for="we-rubro">Rubro</label>
              <input id="we-rubro" name="rubro" type="text" required placeholder="Ej: cafetería, peluquería" />
            </div>
            <div class="offer-field">
              <label for="we-link">Instagram o sitio actual (opcional)</label>
              <input id="we-link" name="link" type="text" inputmode="url" placeholder="@tunegocio" />
            </div>
            <div class="offer-field">
              <label for="we-email">Email</label>
              <input id="we-email" name="email" type="email" autocomplete="email" required />
            </div>
            <div class="offer-field">
              <label for="we-whatsapp">WhatsApp (opcional)</label>
              <input id="we-whatsapp" name="whatsapp" type="tel" autocomplete="tel" inputmode="tel" placeholder="+56 9" />
            </div>
          </div>
          <div class="offer-honeypot" aria-hidden="true">
            <label for="we-gotcha">No completar</label>
            <input id="we-gotcha" name="_gotcha" type="text" tabindex="-1" autocomplete="off" />
          </div>
          <label class="offer-check" for="we-consent">
            <input id="we-consent" name="consent" type="checkbox" required />
            <span>Acepto que Viento Norte me contacte por esta solicitud.</span>
          </label>
          <div>
            <button class="vn-btn vn-btn--secondary" type="submit">Enviar mis datos</button>
          </div>
          <p class="offer-status" id="we-form-status" role="status" aria-live="polite"></p>
        </form>
      </section>

      <div class="offer-sticky" id="we-sticky" role="region" aria-label="Acción rápida">
        {_we_cta("sticky")}
      </div>
{web_express_script()}"""


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


    write(
        ROOT / "public/s/web-express/index.html",
        render_page(
            title="Web profesional en 72h por $30.000 · Viento Norte",
            description="Tu web one-page con plantilla Viento Norte adaptada a tu marca, botón WhatsApp o formulario y responsive. Entrega en 72h hábiles. $30.000 CLP.",
            canonical=WEB_EXPRESS_URL,
            og=OG_WEB_EXPRESS,
            current="/s/web-express/",
            crumbs=[("/", "Inicio"), ("/s/web-express/", "Web en 72h")],
            inner=web_express_inner(),
            extra_head=web_express_extra_head(),
        ),
    )


if __name__ == "__main__":
    main()
