---
tags: [vn, ga4, gtm, propuesta, privacidad]
date: 2026-10-26
estado: propuesta — sin cambios aplicados
revisión: Rö · mar 27-oct 12:00 (Santiago)
---

# Propuesta GA4 / GTM · Viento Norte · 2026-10-26

> Solo propuesta. **No se tocó GA4 ni GTM** (admin requiere OK de Rö). Contenedor `GTM-PM5LBQRP` · GA4 `G-G7JXJKGCDV`.

## 1. Estado actual (evidencia)
- GTM v4 (20-ago): Etiqueta de Google + `GA4 · generate_lead` + `GA4 · book_call`.
- `book_call` PASS en Preview (20-ago). `generate_lead` **no activado** en Preview del 28-ago (solo Google tag) → gate $0 Ads sigue.
- El código (`src/vn-core/analytics/gtm.ts`) carga GTM/gtag **sin Consent Mode** (no hay `gtag('consent','default',…)`).
- El SPA emite ~20 eventos custom a `dataLayer` (nav_click, click_contact, value_*, demo_*, app_quoter_*, hero_banner_category…) que hoy **no tienen tag** → GA4 solo ve `page_view`.
- `/privacy` (`src/pages/Privacy.tsx`) no describe analítica ni cookies.
- Google Ads 811-405-3092 detenida por verificación de identidad del anunciante.

## 2. Qué medir (objetivo: lead B2B, no tráfico)
| Nivel | Pregunta | Métrica |
|---|---|---|
| Negocio | ¿Llegan leads? | `generate_lead`, `book_call` |
| Embudo | ¿Dónde se caen? | `/servicios/` vista → elección de pack → form start → submit |
| Canal | ¿Qué fuente trae leads? | UTM (`/servicios/?<utm>#ancla`) × conversiones |

## 3. Eventos propuestos (mínimos, sin PII)
| Evento | Disparo | Parámetros | Conversión (key event) |
|---|---|---|---|
| `generate_lead` | submit OK vía worker | `lead_type` (free_a11y/kickoff), `pack` (radar/marco/ops) | **Sí** |
| `book_call` | Agendar / Calendar | `source` (radar-free, pack) | **Sí** |
| `form_start` | primer input en form | `form_id` | No |
| `select_pack` | elige Diagnóstico/Prototipo/Proceso/App | `pack` | No |
| `cta_click` | consolidar nav_click/click_contact/value_carousel_cta | `cta_id`, `section` | No |
Resto de eventos custom: **no** crear tags (ruido); reevaluar en 30 días.
Nunca enviar nombre, email, teléfono ni texto del mensaje a GA4.

## 4. Consentimiento y privacidad (Ley 19.628 / 21.719)
- **Consent Mode v2** con default `denied` (analytics_storage, ad_storage, ad_user_data, ad_personalization) antes de cargar GTM; banner simple Aceptar/Rechazar con mismo peso visual (sistema de diseño VN, 44 px).
- Sin consentimiento: solo pings sin cookies (modelado), sin remarketing.
- Retención de datos GA4 a 2 meses; Google Signals off; IP/ubicación granular off.
- Actualizar `/privacy`: qué se mide, para qué, base legal (consentimiento), cómo revocar. Coherente con la línea «sin analítica» declarada para **campo** (esa app queda fuera de GA4).

## 5. Plan sugerido (cada paso requiere OK)
1. **Código (PR, sin admin):** Consent Mode default + banner + `/privacy` + normalizar `select_pack`/`form_start`/`cta_click`. CI + QA en `/qa/` + bloque QA humano.
2. **GTM (OK Rö):** tags `form_start`, `select_pack`, `cta_click`; configurar consentimiento en tags; Preview en Chrome logueado hasta PASS de `generate_lead` y `book_call`.
3. **GA4 (OK Rö):** marcar `generate_lead` y `book_call` como key events; retención 2 meses; dimensiones custom `pack`, `lead_type`.
4. **Ads:** importar conversiones solo cuando la cuenta salga de verificación y el gate $0 esté en PASS. Sin gasto sin OK.

## 6. Decisiones para Rö (27-oct 12:00)
- [ ] ¿Banner de consentimiento sí/no? (recomendado sí)
- [ ] ¿Eventos de la tabla §3 OK?
- [ ] ¿Key events = solo generate_lead + book_call?
- [ ] OK para tocar GTM/GA4 admin (paso 2–3).
