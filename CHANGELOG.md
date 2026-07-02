# CHANGELOG

All notable changes to this project will be documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)

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
