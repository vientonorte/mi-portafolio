# CHANGELOG

All notable changes to this project will be documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)

---

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
