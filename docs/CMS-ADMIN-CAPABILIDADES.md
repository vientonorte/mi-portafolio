# CMS `#/admin` · capacidades y backlog de agentes

**Fecha:** 2026-08-13  
**Superficie:** https://vientonorte.io/#/admin (passkey) + https://vientonorte.io/#/admin/fotos  
**APIs:** https://contact.vientonorte.io  
**MCP:** `POST /mcp`  
**Canon:** marca **Viento Norte** / vientonorte.io (no “portafolio personal” en B2B)

Vamos excelente: el CMS ya es el tablero de las mismas BDs que alimentan landing, mail y agentes. Esto documenta **qué hay**, **por qué el share sale genérico**, y **qué se puede aplicar después** con APIs + skills de agentes. No inventa integraciones que no existen.

---

## 1. Qué hace el CMS hoy (live)

| Módulo | Dónde | API | Qué puedes hacer |
|--------|-------|-----|------------------|
| Overview | `#/admin` | `GET /api/admin/overview` | Contadores hoy/semana + últimos leads y bookings |
| Leads | tab Leads | `GET/PATCH /api/admin/leads` | Buscar, filtrar, cambiar estado (nuevo → contactado → cerrado) |
| Agenda | tab Agenda | `GET/PATCH /api/admin/bookings` | Ver slot + link Calendar, cambiar estado |
| Diagnósticos | tab Diagnósticos | `GET/PATCH /api/admin/diagnosticos` | Ver fricción + respuesta, estado |
| Servicios / casos | tabs | `GET /api/admin/services` · `/cases` | Catálogo **solo lectura** (Radar/Marco/Ops + módulos) |
| Fotos / OG | `#/admin/fotos` | `GET/POST/PATCH /api/admin/images` | Subir override a **R2**. Incluye `branding.ogPortfolio` |
| Público | web + agentes | `/api/health` `/services` `/cases` `/company` `/contact` `/leads` `/booking` `/diagnostico` | Captura y catálogo |
| Agentes | MCP | `list_services` `get_cases` `get_company_info` `submit_lead` `book_call` `request_diagnostico` | Misma BD |

Auth: cookie HttpOnly en `contact.vientonorte.io`. Gate: passkey (bootstrap si no hay OAuth GitHub).

---

## 2. Por qué al compartir una URL sale una imagen genérica

Evidencia en código, no opinión:

1. **HashRouter.** LinkedIn, Meta, WhatsApp y Slack **no ejecutan el JS de React**. Leen el `index.html` estático.
2. Ese HTML fija **una sola** imagen:

```html
<meta property="og:image"
  content="https://vientonorte.io/images/branding/og-portfolio.png" />
```

3. `SEOHead` (Helmet) puede cambiar `og:image` **después** de cargar la app. Los crawlers de share **no lo ven**.
4. El override de `#/admin/fotos` (`branding.ogPortfolio` → R2) cambia la imagen **dentro del sitio**. **No** reescribe el `index.html` que leen Meta/LinkedIn.

Por eso ves una img genérica (o el OG viejo de “portfolio”) aunque hayas subido una tuya.

**Shipped 2026-08-13 (código):** tarjetas 1200×630 `og-home-1200.png` / `og-consultoria-1200.png` · `og-portfolio.png` actualizado · URLs crawler `https://vientonorte.io/s/` y `/s/consultoria`.

**DoD para que el share use tu imagen**

| Paso | Qué |
|------|-----|
| A. Ahora | Subir 1200×630 a `#/admin/fotos` → `branding.ogPortfolio` **y** copiar ese PNG a `public/images/branding/og-portfolio.png` + deploy Pages |
| B. Siguiente API | `GET /og` o `GET /share/:ruta` que devuelve HTML o PNG **sin hash**, para crawlers |
| C. Agente | Skill Imagine genera OG por superficie (home, consultoría, caso) → Worker la publica → admin lista “previews de share” |

Depuradores oficiales (tras cambiar el estático):

- Meta: https://developers.facebook.com/tools/debug/
- LinkedIn: https://www.linkedin.com/post-inspector/
- Google rich results: Search Console / rich results test

---

## 3. Cómo se integra (y no se integra) la web con las redes

| Plataforma | Hoy (evidencia) | No está | Próximo con CMS + agentes |
|------------|-----------------|---------|---------------------------|
| **LinkedIn** | Link de perfil en contacto (`rodrigo-gaete-ux`). Share usa OG estático | Company Page API, post automático, pixel Insight | OG por URL + copy de kick-off (md). Company Page es acción humana |
| **Meta (FB/IG/WhatsApp)** | Mismo `og:image` estático | Pixel Meta, Catálogo, Business Manager | Pixel vía **GTM** (un solo contenedor). WhatsApp hereda OG |
| **Google** | Search Console (archivo de verificación). Calendar Appointment. Forms. dataLayer en código | `VITE_GTM_ID` / GA4 **no** en prod | GTM + tags `generate_lead` / `book_call` (`docs/GTM-KICKOFF.md`) |
| **Google Ads** | Skill `/google-ads-vn` local-first; SEM final URL `/#/consultoria` | Spend / pixel Ads | GTM conversion linker cuando el Test del path lo permita |
| **Google Business** | No hay ficha cableada en el repo | GBP API | Ficha humana + NAP coherente con schema.org del `index.html` |
| **GitHub** | Org `vientonorte`, Pages, OAuth opcional del admin | — | Ya es el deploy |

Conectores de **agente** (esta sesión / skills), no del CMS público:

- Gmail, Calendar, Tasks, Drive, Figma, GitHub  
- Skills: `seo-vn`, `google-ads-vn`, `ux-writing-vn`, `lead-a11y-vn`, `docs-vn`, `imagine`, Agents SDK / MCP

Esos conectores **sí** pueden operar sobre las APIs del CMS (leer leads, redactar respuesta, agendar, generar OG). No equivalen a “la web está conectada a Meta Ads”.

---

## 4. Qué podemos aplicar ya (sin código nuevo)

Usando **APIs actuales + habilidades**:

1. **Operar leads** en `#/admin`: estado + mail de respuesta (Gmail draft, skill lead-a11y si es Radar gratis).
2. **Booking:** CTA Calendar → `book_call` + fila en Agenda.
3. **Agente MCP:** consultar servicios/casos/empresa; con `VN_API_KEY`, crear lead o booking.
4. **OG inmediato:** reemplazar `og-portfolio.png` (1200×630, marca VN) y scrapear de nuevo en LinkedIn/Meta debugger.
5. **Copy social:** `~/Downloads/vientonorte-kickoff-mvp.md` + skill `ux-writing-vn`.
6. **SEO local:** `/seo-vn` matrix antes de ads.

---

## 5. Nuevas APIs / módulos CMS (propuesta, no shipped)

Prioridad = impacto en share + conversión, reutilizando el Worker + admin.

| # | Módulo en `#/admin` | API nueva | Agente / skill | Para qué |
|---|---------------------|-----------|----------------|----------|
| P0 | **Share / OG** | `GET /share` (HTML crawler) · `GET /api/admin/og` · `POST /api/admin/og` (upload 1200×630) | Imagine + `seo-vn` | Dejar de servir una sola img genérica |
| P0 | **OG por ruta** | `GET /og/home.png` ` /og/consultoria.png` | Imagine variantes | Preview distinta al pegar `/` vs `/#/consultoria` (vía URL **sin hash** tipo `/s/consultoria`) |
| P1 | **UTM / campañas** | `GET/POST /api/admin/campaigns` | `google-ads-vn` | Guardar fuente Ads/LinkedIn/orgánico junto al lead |
| P1 | **GTM status** | `GET /api/ds/status` o `/api/analytics/status` | — | Ver si el build tiene `VITE_GTM_ID` |
| P1 | **Inbox acciones** | `POST /api/admin/leads/:id/draft-reply` | Gmail + `ux-writing-vn` | Draft desde el CMS, no send automático |
| P2 | **Servicios editables** | `PATCH /api/admin/services/:id` | — | Activar/ocultar módulo desde el CMS |
| P2 | **Publicar caso** | `PATCH /api/admin/cases/:id` `{ published }` | — | Encender caso sin deploy de código |
| P2 | **Diagnóstico agente** | ampliar `POST /api/diagnostico` | Agents SDK | Respuesta N2N, no solo eje sugerido |
| P3 | **Social publish** | `POST /api/admin/social/queue` | LinkedIn/Meta APIs (OAuth) | Cola de posts; no publicar sin Decider |

URLs de share **sin `#`** (imprescindible para crawlers):

```
https://vientonorte.io/s/consultoria  →  200 HTML con og:* de consultoría + redirect JS a /#/consultoria
https://vientonorte.io/s/            →  home
```

Eso es un Worker o Pages function, no un cambio de Helmet.

---

## 6. Mapa de skills → CMS

| Skill / conector | Entrada | Sale en el CMS |
|------------------|---------|----------------|
| MCP VN | Agente externo | Leads / bookings / catálogo |
| `lead-a11y-vn` | Lead gratis Radar | Label Gmail + draft + Calendar |
| `ux-writing-vn` | Copy OG / LinkedIn | Campos title/description del módulo Share |
| `seo-vn` | Tras cambiar OG | Matrix local PASS/FAIL |
| `google-ads-vn` | Campaña | UTM en lead + message-match |
| Imagine | Brief 1200×630 | Archivo en R2 + fila OG |
| Figma | Tokens / mock | Asset a `#/admin/fotos` |
| Gmail / Calendar | Ya en Worker | Confirmación + agenda 30 min |
| `docs-vn` | Este archivo | Canon |

---

## 7. Orden recomendado (Decider: Rö)

1. **OG canónico VN** (una imagen tuya, 1200×630) en estático + debugger LinkedIn/Meta.  
2. **GTM** (`docs/GTM-KICKOFF.md`) si quieres medir el kick-off.  
3. **Rutas `/s/...`** + pestaña Share en `#/admin`.  
4. **Draft reply** desde Leads.  
5. Pixel Meta / Company Page LinkedIn solo si hay ficha y Decider.

---

*Documento vivo · Viento Norte · CMS agent-ready · 2026-08-13*
