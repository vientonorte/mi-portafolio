# CHANGELOG

All notable changes to this project will be documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)

---

## [2026-08-22] — Recarga /#/sobre-mi: LCP shell no tapa inner routes

### Fixed
- El overlay LCP de home (#206) esperaba `#inicio`. En `/#/sobre-mi` nunca llega: recarga = pantalla “Tecnología para empresas” colgada.
- Inner hash (`sobre-mi`, `contacto`, …) oculta el shell **antes del paint**. Home/SEM siguen con LCP.
- Ya no se borra `rg-chunk-reload` al boot (loop 503 tras deploy). SW `controllerchange` una vez por sesión.

## [2026-08-22] — Sobre mí: chips VB 7+ / 3+ lead

### Fixed
- QA VB-SOBRE-MI en `/#/sobre-mi`: chips **7+ años** (craft) y **3+ lead** (mobility→wealth) otra vez visibles. Rail: SURA 23–26 · VN ahora. Copy i18n ya no pinta Lead UX como cargo actual.

## [2026-08-22] — Hero home: Agendar de vuelta

### Fixed
- `ConsultoriaLandingHero` otra vez abre Google Calendar desde el primer fold (`Agendar` + `Gratis · accesibilidad`). El parking DS lo había dejado solo en `#modalidades`.

## [2026-08-22] — CWV: recortar render delay CSR

### Changed
- LCP shell estático en `index.html` (H1 + copy de `section-header__description`); se oculta cuando pinta `#inicio`.
- Chillax desde `/fonts/chillax/` + preload 400/700; sin preconnect a Fontshare.
- Demos del home: `loading="lazy"` + WebP (PNG fallback).
- `Logo` no importa `motion` en el path del nav; i18n bootstrap carga solo el locale activo.

## [2026-08-20] — `/s/consultoria` GTM, sin gtag paralelo

### Changed
- Share paid: snippet `GTM-PM5LBQRP`. Quitado `gtag.js` `G-G7JXJKGCDV` (duplicaba `page_view`).
- Hop 1.5 s al SPA; Tag Assistant / `gtm_debug` se quedan en `/s/consultoria`.
- Tests del hop alineados al canon (GTM + noscript; no gtag paralelo).

## [2026-08-20] — Radio `?pack=ops` al listón Design Ops

### Changed
- Un H1 (sin duplicar «Elige tu alcance»). Alcance es **h2**. Un Agendar 30 min si hay pack.
- Copy SEM: sin app / Design Ops / `vientonorte.cl`. Selección con tokens `--vn-color-brand`.

## [2026-08-20] — `/poc#/auditoria` deprecado

### Changed
- `https://vientonorte.io/poc#/auditoria` redirige a `/#/consultoria`. No es freemium.
- `/#/auditoria` = muestra mentoría, `noindex`. Paid = `/s/consultoria`.

## [2026-08-20] — Radio de tres nombres (consultoría SEM)

### Changed
- `/#/consultoria`: tres radios Diagnóstico / Prototipo / Proceso. SKU Radar·Marco·Ops no se pinta.
- Un CTA **Agendar 30 min** (`?pack=` interno). Gratis = nota, misma agenda Diagnóstico.
- Hero sin Calendar ni CTAs duales. `/s/consultoria` lista 3 alcances + kickoff 30 min.

## [2026-08-18] — Admin Overview: subdominios (Option A)

### Added
- `#/admin` Overview muestra `updated` de `finanzas.vientonorte.io`. Si ≠ Calendar 18 ago → badge **stale** + P0 `wrangler deploy --keep-vars`.
- Clic abre el subdominio en pestaña nueva. Sin iframe. `noIndex` se mantiene. SEM $0.

## [2026-08-18] — CV: PDF + Word ATS

### Changed
- About: dos botones, **PDF** y **Word (ATS)**, según locale ES/EN.

## [2026-08-18] — CV PDF = ATS del otro chat

### Changed
- Los PDF públicos ya no son el print HTML de Chrome: mismo texto que `Rodrigo-Gaete-CV-*-ATS.docx` (1 columna, Arial).

## [2026-08-18] — CV ATS ES/EN

### Changed
- `public/cv-rodrigo-gaete-ux.pdf` y `-en.pdf` salen de los ATS de escritorio. Locale EN baja el EN.
- También en `public/` y `docs/entregables/`: `Rodrigo-Gaete-CV-ES-ATS.docx` / `EN`.

## [2026-08-18] — Tag Assistant no pierde `/s/consultoria`

### Fixed
- El hop ya no redirige al SPA si llega Tag Assistant, `gtm_debug` o un bot de cobertura Ads. Ahí se queda el `gtag G-`; el SPA sigue sin segundo gtag.

## [2026-08-17] — SEO P0: title y HTML para crawlers

### Changed
- Title de home (Helmet + `index.html`): **Tecnología para empresas · Viento Norte**.
- `/s/` y `/s/consultoria`: H1 + Diagnóstico · Prototipo · Proceso · App. Description con el query.
- Canonical de `/s/consultoria` = `https://vientonorte.io/s/consultoria/` (ya no el hash).
- `sitemap.xml` solo lista `/`, `/s/` y `/s/consultoria/`. Sin `#/`.

## [2026-08-16] — `/s/consultoria` lleva la Etiqueta de Google

### Fixed
- Cobertura GA4 *Sin etiquetar*: el HTML share ahora incluye `gtag.js` `G-G7JXJKGCDV` (lo que el crawler de la Etiqueta de Google busca).
- Sin GTM en esa hop de 2 s (el SPA sigue solo con `initGTM`) para no duplicar `page_view`.

## [2026-08-16] — Demo: sesión real, no solo Start

### Changed
- Admin Demos mide vista, start, tiempo en vivo (tick 5 s), abandono y CTAs.
- Mapa = clics/movimiento sobre poster y chrome. El iframe de Figma no se lee.

## [2026-08-16] — Demo Diagnóstico 1 min

### Changed
- Reloj de `/#/demo/diagnostic` de 3 min a **1 min** (poster; 3 min era largo).

## [2026-08-16] — GEES Sites oculta

### Changed
- `duct-juice-51509104.figma.site` ya no se iframea ni se abre desde el FO. Diagnóstico usa poster; la card va a `/#/demo/diagnostic`.

## [2026-08-16] — Heatmap admin de demos

### Added
- `#/admin` pestaña **Demos**: mapa de clics del chrome (gate, reloj, CTAs) por path.
- Worker `POST /api/demo/heat` (público, sin PII) y `GET /api/admin/demo/heat` (sesión).
- El iframe del producto no se mide (otro origen).

## [2026-08-16] — Measurement Protocol desde el Worker

### Added
- El API manda `generate_lead` y `book_call` a GA4 (`G-G7JXJKGCDV`) al guardar lead o agenda.
- Secreto `GA4_MP_API_SECRET` solo en Wrangler (no en git).

## [2026-08-16] — `/s/consultoria` lleva GTM

### Fixed
- La final URL paid ya no está “sin etiquetar”: snippet `GTM-PM5LBQRP` en el HTML estático (sin segundo gtag).
- El redirect a `/#/consultoria` espera el hit y conserva `gclid` / UTM.

## [2026-08-16] — Demo timed: marca VN + a11y AA

### Changed
- `/#/demo/*` usa PageShell, Badge, Card y tokens de marca (gradiente VN).
- Reloj ajustable: **Pausar** y **Sumar 1 min** (WCAG 2.2.1).
- Contraste, alt del poster, diálogo de fin con foco, sin debug de sessionStorage.

## [2026-08-16] — Mobile: chrome sin solapes en funnel y demos

### Fixed
- Pill **Agendar** ya no tapa cards ni dock en móvil (solo desktop).
- Demos `/#/demo/*` sin dock del sitio (el iframe no queda debajo).
- TOC 01–02–03 con target 44px; overflow-x `clip` para que el sticky no se caiga.
- Cards y hero: menos transform/animación en touch.

## [2026-08-16] — Demo con reloj en cada path de servicio

### Added
- Cada path (Diagnóstico · Prototipo · Proceso · App) tiene demo con límite de tiempo: 3 / 5 / 4 / 5 min.
- Rutas: `/#/demo/diagnostic` · `/#/demo/prototype` · `/#/demo/process` · `/#/demo/app`.
- `/#/demo/x-cms` sigue siendo el alias de campaña del prototipo (5 min).
- Home muestra las 4 demos. En las cards de pack: **Ver demo · N min**. SEM no añade sección extra.

## [2026-08-16] — `/#/consultoria` = solo funnel 01–02–03

### Changed
- SEM ya no reusa el home. Path: Modalidades → Empezar → Contacto.
- App strip, método y demos quedan fuera de `/#/consultoria` (siguen en `/` o interiores).

## [2026-08-15] — SEM: `/#/consultoria` = funnel 3 packs + OB

### Changed
- Paid landing `/#/consultoria` usa el mismo funnel que home (Diagnóstico · Prototipo · Proceso), no el tour fullscreen.
- **Empezar** en cada pack hace scroll a `#consultoria-onboarding` con `package_id`.
- Calendar abre con `?pack=` (campo que Rö añade en Appointment).
- Tour de módulos queda en `/#/consultoria/modulos/:id`.

### Docs
- `docs/BLUEPRINT-SEO-SEM.md` — checklist SEO/SEM y Decide de URLs.

## [2026-08-13] — Agenda: registro + mail automáticos

### Changed
- Click **Agendar** siempre escribe en KV (`bookings`) y avisa a `contacto` inbox.
- Sync de cita Google (eventId, slot, sitio, tel) sin exigir sesión previa.

---

## [2026-08-13] — Landing: Calendar único + contacto por mail

### Changed
- Hero y sticky: **un** CTA de Google Calendar.
- Alcance (packs) y contacto: mail con motivo (diagnóstico / prototipo / proceso / ayuda / simple).
- Fuera del landing: onboarding, N2N, edu y demos (viven en `/proceso`, `/proyectos`, `/#/consultoria`).

## [2026-08-13] — Admin fotos: nombre + aplicación web

### Added
- `#/admin/fotos`: subir foto con **nombre** y **aplicación** (share home/consultoría, schema, favicon, logo, Apple/PWA, FAQ, galería).
- `POST /api/admin/images` crea slot cableado o `custom.*` en KV/R2.

---

## [2026-08-13] — Kick-off consultora: landing + APIs + MCP + admin BD

### Added
- **APIs de negocio** en el Worker (`/api/health`, `/api/services`, `/api/cases`, `/api/company`, `/api/leads`, `/api/booking`, `/api/diagnostico`).
- **MCP JSON-RPC** en `POST /mcp` (`list_services`, `get_cases`, `get_company_info`, `submit_lead`, `book_call`, `request_diagnostico`). Escritura con `VN_API_KEY`.
- **Admin data browser** en `#/admin`: overview, tablas de leads/agenda/diagnósticos (cambio de estado) y catálogo de servicios/casos. Auth GitHub/passkey existente.
- Persistencia de leads del formulario de contacto en `ADMIN_KV`.

### Changed
- Confirmación de contacto: «desde **vientonorte.io**», voz Viento Norte (ya no “portafolio” / “te responderé”).
- Booking: `book_call` + registro opcional en `/api/booking` si hay identidad de sesión. Journey: `docs/BOOKING-JOURNEY.md`.
- HashRouter emite `page_view` al dataLayer. Receta GTM: `docs/GTM-KICKOFF.md`.
- Home: value prop y strip de modalidades alineados a UXtech / dueño del dato.
- SEO i18n home: `Viento Norte · UXtech` (Helmet ya coincidía con `index.html`).
- Privacidad: declara almacenamiento de leads en el Worker.
- Rutas: `consultingFunnel` = `/` (canon FO). Alias legacy `/consultoria/embudo`.

### Docs
- `docs/API-KICKOFF.md`
- `docs/CMS-ADMIN-CAPABILIDADES.md` — qué hace `#/admin`, por qué el share usa OG genérico, backlog de APIs/agentes (Meta/LinkedIn/Google).
- `docs/AUDITORIA-ADS-INSTAGRAM.md` — gate spend Google Ads / IG.

### Added
- OG 1200×630 (home + consultoría) y rutas de share **sin hash** `/s/` · `/s/consultoria`.

---

## [2026-08-03] — SEO root + SEM `/#/consultoria` (audit QA)

### Fixed
- **Canonical SEM:** en `/#/consultoria` el `SEOHead` usaba `ROUTES.consultingFunnel` (`/`) → ahora `ROUTES.consulting` → `https://vientonorte.io/#/consultoria` (message-match Ads / Google).

### Changed
- **Branding SEO home:** title/description dejan “Rodrigo Gaete · UX Lead” y alinean a **Viento Norte · UXtech** (orgánico root).
- **SEM meta** consultoría: “Elige tu alcance” + keywords design sprint / fintech / flujos UX (ES/EN).
- Static `index.html`: description hero-aligned · OG/Twitter · **JSON-LD** Organization + WebSite + ProfessionalService · alternate SEM URL.
- `sitemap.xml` lastmod 2026-08-03; baja prioridad legacy embudo.

### Product (Decider)
- **Empezar** en home → onboarding embudo in-place (**no** navega a SEM).
- SEM `/#/consultoria` = entrada paid; Empezar allí → onboarding local.
- Re-Map «tour fullscreen vs embudo home» **rechazada** (evidencia + DS).

### Docs
- `docs/audits/QA-SEO-SEM-PLAN-2026-08-03.md` · `docs/audits/HUs-SEO-SEM-2026-08-03.md` · PDF en `docs/audits/`.
- Gate: **no SEM spend** sin Test del path (Design Sprint VN).

---

## [2026-07-27] — Agendar a11y gratis con Google Calendar

- **Free Radar / a11y:** CTAs abren Google Calendar Appointment Schedule si hay `VITE_A11Y_FREE_SCHEDULE_URL` (fallback: form prearmado).
- Evento analytics **`generate_lead`** (`lead_type=free_a11y`, channel calendar|form).
- Strip modalidades: dual CTA «Agendar en Google Calendar» + «Escribir sin agenda».
- Banner `/auditoria` freemium → free radar (no mentoría).
- Deploy Pages bakea secrets `VITE_A11Y_FREE_SCHEDULE_URL` y `VITE_VIDEO_CALL_URL`.
- Docs: `docs/CONTACT_AND_PRIVACY.md` (crear appointment schedule + `gh secret set`).

## [2026-07-26] — Consultoría embudo, free a11y, DS, hygiene

### Added
- **Nav embudo** en `/consultoria`: `ProcessNavigation` (01–05) + dock `funnel` (Empezar → onboarding, Contacto → `#contacto`).
- **Sección Contact** al pie del embudo; asistente `surface="consulting"` (intent fijo, sin laboral/freelance).
- **Atmósferas de sección** (`section-atmosphere-*` + `PageSection atmosphere`) — lavados radiales en lugar de bloques solid planos.
- **Homologación DS:** labels dock vía i18n; motion tokens `--duration-*` / `--ease-out`; SEO consultoria alineado a Diagnóstico.
- Docs de valor: `docs/entregables/` (SEO-Ads onboarding, formato a11y freemium Transvip).

### Changed
- Hero: **Tecnología para empresas.** / **Elige tu alcance.**; CTAs **Hablemos** · **Gratis · accesibilidad** · **Ver opciones**.
- Free entry: mensaje y strip orientados a **accesibilidad de un flujo** (no mentoría `/auditoria`).
- Toolbar consultoría: isologo sin wordmark personal.
- Naming pyme: Diagnóstico en UI; Radar/Marco/Ops como packLabel en cards.

### Repo
- Limpieza de ramas: solo `main` local; remoto main + 4 dependabot open.

### Notes
- Skills user: `/seo-vn`, `/google-ads-vn` (local-first ≥100 checks). Matrix 111/111 PASS en local.
- Backlog: residual «Radar» en home SEM; interactions-pass; spy dock por sección.

---

## [2026-07-21] — Fix: dock legible al scroll

### Fixed
- **Dock (bottom nav):** glass más opaco + `isolation`/`translateZ(0)` para que no se pierda sobre el contenido al hacer scroll. Visible solo `< lg`.
- **Header:** se mantiene hide-on-scroll en desktop (comportamiento previo).

---

## [2026-07-21] — P1 form inteligente transversal + título audit

### Added
- **`navigateToContactAssistant`** (`src/lib/navigate-to-contact.ts`): API única para abrir el asistente desde cualquier CTA (intent, package, message, origin analytics).
- Soporte **intent-only** en `contact-draft` + deep link `?intent=consulting`.
- Banner de draft `cta` en i18n ES/EN.

### Changed
- **CTAs de conversión → asistente:** banner auditoría, hero path Auditoría, carousel consultoría/audit secondary, arsenal bundles, quoter, onboarding, partner-edu.
- **Contacto UI:** asistente por defecto; formulario clásico como enlace «Prefiero el formulario clásico» (menos ruido de tabs).
- **PremiumUxAuditBanner:** título más destacado (`font-black`, escala mayor, accent brand-gradient).
- Docs: `CONTACT_AND_PRIVACY.md`.

### Notes
- P2–P3 board: KPI layout, Recursos/pills B2B, demo landing Apple-like, About/testimonios + LinkedIn.

---

## [2026-07-21] — P0 rediseño landing (board FigJam)

### Changed
- **Hero:** combobox `HeroIntelligentSearch` → **3 path cards** (`HeroAudienceCta` layout `equal`) con click directo al contenido (Demo · Experiencia · Auditoría). Analytics: `hero_path_card`.
- **Dock móvil:** 5 slots → **3** — Inicio · Consultoría (centro liquid) · Contacto.
- **Header desktop:** primarios → **Negocios · Contacto**; Experiencia, Consultoría, Proceso y utilidades en «Más».
- Docs: `NAV_AND_SECTIONS.md`, `MAINTENANCE_GUIDE` alineados a P0.

---

## [2026-07-08] — QA rutas, hero mobile, assets consultoría

### Added
- **`scripts/qa-routes.mjs`** + `npm run qa:routes`: Playwright valida 39 rutas, secciones ancla, imágenes y sugerencias hero en mobile.
- Job **`qa-routes`** en CI (build + serve + Playwright chromium).
- **`useIsSmDown()`** (breakpoint Tailwind `sm`) para layout hero responsive.
- **`ROUTES.adminPhotos`** y validación `require_public` en `sync:images` (X CMS, Célula Evolutiva).

### Changed
- **Hero mobile:** sugerencias inline siempre visibles (&lt;640px); desktop mantiene dropdown al focus.
- **Manifest imágenes:** fetch solo en `/admin/fotos` (evita CORS en GitHub Pages).
- Nav mobile: **LogoMark**; auditoría con CTA consultoría Marco (sin embed ADPList).
- Playwright como **devDependency**.

### Fixed
- Crash `/consultoria` y `#valor`: claves `consultoria.xCmsDashboard` y `sura.celulaEvolutivaFlow` en `portfolioImages`.
- Hero: `overflow-hidden` recortaba dropdown; ahora `overflow-x-hidden` + blur aislado.

### Documented
- `MAINTENANCE_GUIDE`: `qa:routes`, manifest Worker, hero buscador.
- Pendiente externo: CORS en Worker (`Access-Control-Allow-Origin`) para overrides públicos con `VITE_IMAGE_MANIFEST_PUBLIC=true`.

---

## [2026-07-07] — Contacto Google Forms, hero buscador

### Added
- **Contacto → Google Forms**: front sin cambios; POST vía iframe con copia al remitente (config en el form) y notificación a `gaete.gaona@gmail.com` / alias `contacto@vientonorte.cl`. FormSubmit queda como respaldo.

## [2026-07-07] — Hero buscador inteligente, impacto por audiencia

### Added
- **`HeroIntelligentSearch`**: buscador con autosuggest, 3 líneas de negocio (tabs) y CTAs post-search — alineado con nav.
- **Consultoría X | CMS**: CTA principal → Figma Sites (`pouch-growl-74881457.figma.site`); secundario → Figma Make.

### Changed
- Preview embebido en `/consultoria#consultoria-demo` usa el sitio publicado, no el embed de Make.

## [2026-07-07] — Hero, impacto por audiencia, contenido SURA

### Changed
- **Proyecto destacado** (`#impacto`): layout en columna (header → imagen → 3 caminos) alineado con hero.
- Rutas por audiencia: Reclutadores → `/sobre-mi#experiencia` · Leads → caso RIA · Auditoría freemium → `/auditoria`.

## [2026-07-07] — Hero, contenido SURA, paths y assets

### Added
- **Consultoría demo** `X | CMS` (Figma Make): N2N · Design Thinking + Design Sprint en `/consultoria`.
- **`HeroUnifiedBanner`**: tabs Negocios / Contacto / Auditorías UX (layout tipo composer + chips).
- **POC IA** `sura-ia-automation-dashboard` en grid destacado + captura real DEI (`scripts/capture-ia-poc-screenshot.sh`).
- **`FeaturedCaseNavigator`**: 6 rutas de valor en proyecto destacado RIA (`#impacto`).
- **Autosuggest Fondos** completo (`PageSection`, métricas, CTAs); SEO sin `noIndex`.
- **`featured-path-routes.ts`**, entrada `sura.iaAutomationDashboard` en `image-registry`.
- Labels/issues backlog: #97–#99; #96 cerrado.
- Log de sesión: **`docs/SESSION-2026-07-07.md`**.

### Changed
- Hero: layout **una columna** (headline + banner ancho); eliminado scroll «Explorar» que competía con «¿Qué buscas?».
- Composer del banner: `composerHint` por tab (sin duplicar «Explorar negocios»).
- Nav: `consulting` / `audit` / `research` en i18n; menú móvil alineado con tabs del hero (Negocios · Contacto · Auditorías UX).
- Hero: eliminado `valueProp` visible y métricas SURA/Karri del panel Negocios.
- Dependabot: lucide 1.23, tailwind/vite 4.3.2, react+react-dom 19.2.7 alineados (#78 cerrado).
- `.gitignore`: `*.fig`, `*.deck`.

### Fixed
- Service worker v4 network-first para deploys frescos en GitHub Pages.
- Placeholder POC IA reemplazado por screenshot Figma Sites.

### Documented (pendiente implementación)
- FigJam [crítica de diseño](https://www.figma.com/board/WQ3yWzgIrOSZXTuExwRzS9/) → fase UX Testing.
- Figma Slides [tutoría asesor Colombia](https://www.figma.com/slides/xxKiHNAOPDpxmfuqyE7N72/) → `sura-ux-enterprise`.

---

## [2026-07-03] — Nav responsive, secciones y branding

### Added
- **`NavDock`** organism unificado (`home` / `deep`) y **`nav-config.ts`** como fuente única del dock.
- **`PageSection`** (`layout/`) con tokens de padding, ancho, tono y `scroll-mt` para anclas.
- **`LanguageToggle` compact** para header mobile y subpage toolbar.
- Documentación: **`docs/NAV_AND_SECTIONS.md`**.

### Changed
- Bottom nav **solo `< lg`**; desktop navega por header (sin dock redundante).
- **5 destinos** en home y subpáginas (Contacto → `/contacto` fuera de home).
- Scroll unificado vía **`scrollToSection`** (Navigation, MobileMenu, Hero).
- Hero: `100dvh`, padding inferior para dock, CTAs por audiencia (`HeroAudienceCta`).
- Secciones home migradas a `PageSection`: About, Experience, Contact, teasers, stats, testimonios.
- Experience: timeline visible en móvil.
- SubpageToolbar: **ThemeToggle** + idioma compacto.
- Avatar/logos: encuadre 4:5, logos por tema (SURA/Transvip/Karri), `plate` floating en nav.
- Foto perfil: retoque sutil frente (`profile-photo.jpg?v=20260703b`).

### Fixed
- Drawer mobile no solapa dock en tablet (`lg:bottom-0` en lugar de `md:bottom-0`).
- `PageShell` sin `md:pb-0` que dejaba contenido bajo el dock.
- `BackToTop` / `StickyCTA` offset con `max-lg` alineado al dock.

---

## [2026-07-02] — Contacto, privacidad y valor

### Added
- **Asistente de contacto guiado** (`ContactAssistant`): flujo intent → detalle → datos → revisión.
- **ContactConsentField**: checkbox de consentimiento + enlace a política de privacidad (formulario y asistente).
- **Política de privacidad bilingüe** (`/privacy`): copy Ley 21.719, FormSubmit, derechos ARCO (ES/EN).
- **ValueCarouselBanner**: carrusel de propuesta de valor en home.
- **ImpactStats**: narrativa, spoilers en hover y tap-to-expand en móvil.
- **Runbook** `docs/CONTACT_AND_PRIVACY.md` y `.env.example`.

### Changed
- **Canal de contacto (opción A):** FormSubmit en navegador como primario; Worker Cloudflare como respaldo silencioso; `mailto` como último recurso.
- Email público unificado: `contacto@vientonorte.cl` (inbox real vía FormSubmit, no expuesto en UI).
- Hero: eliminada línea duplicada de métricas (−40% · NPS · Karri).

### Fixed
- **TypeScript carousel:** re-export default de `embla-carousel-react@8.6.0` en `versioned-modules.d.ts`.
- **ESLint:** setState en effects de contacto → inicialización por props / transición a review.

---

## [Unreleased] — Sprint 20-05-2026

### Added
- **Hero editorial Fintual-style**: número ancla −40% como elemento visual principal, layout left-aligned, stats row (5+ países · 10+ proyectos · 6+ años), scroll indicator monospace minimal.
- **Privacy page completa**: `src/pages/Privacy.tsx` ahora incluye 5 secciones legales (datos recopilados, formulario, derechos, tecnologías). Antes era placeholder de 1 línea.
- **Ruta `/cases/process/:processId`**: `ProcessDetailPage` conectada en `App.tsx` con `onNavigateToProcess` funcional (antes noop).

### Fixed
- **Imports rotos** (40 archivos): eliminados `@vientonorte/tokens/css` y `@vientonorte/ui/*` (paquetes inexistentes) → migrados a paths locales `../ui/*`.
- **Navigation.tsx**: logo apunta a `#inicio` (era `navItems[0]=#sobre-mi`); añadido "Casos"/"Cases" al menú; handler `onNavigateToAuditoria` explícito; eliminado dead code `"case-studies" → "cases"` en desktop nav.
- **Navigation.tsx handleNavClick deps**: añadido `onNavigateToAuditoria` al array de deps del `useCallback` (stale closure, P3).
- **MobileMenu.tsx bug P1**: `"case-studies"` → `"cases"` — Casos ahora navega correctamente desde móvil.
- **MobileMenu.tsx useCallback deps P1**: `onNavigateToAuditoria` añadido al deps array de `handleNavClick` (stale closure).
- **Hero Tailwind v4 compat**: `pt-28` y `text-[clamp()]` no se generan en Tailwind v4 — padding del container y font-size del anchor movidos a `style` props; `md:gap-10` → `md:gap-8` (gap-10 no escaneado).
- **Contact info**: email `gaete.gaona@gmail.com` y LinkedIn `rodrigo-gaete-ux` corregidos en Footer, Contact y AuditoriaPortfolio.
- **AuditoriaPortfolio.tsx**: removido botón con URL cliente `laura-portfoli0.webflow.io`; nombre anonimizado `"Laura López"` → `"[Cliente]"`.
- **Hero**: eliminados Logo import, orb animado, partículas, flow-nodes con íconos; ambient light reducido a un único blur `opacity-[0.06]`.

### Removed
- `src/pages/AuditoriaPortfolio 2.tsx` — duplicado con espacio en el nombre.

---

## [2026-04-19] CI — Lighthouse, type-check y Dependabot

| Área | Cambio |
|---|---|
| **Lighthouse CI** | Audita accesibilidad (≥0.9 bloquea PR), performance, SEO en cada PR |
| **Lighthouse CI** | `wait-on` + Chrome flags headless — fix NO_FCP en GitHub Actions |
| **Type-check** | `tsc --noEmit` en cada PR — errores de tipos bloquean antes del build |
| **Dependabot** | Updates npm semanales; `@radix-ui/*` agrupados en un solo PR |
