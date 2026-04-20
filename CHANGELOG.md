# CHANGELOG

## [2026-04-19] CI — Lighthouse, type-check y Dependabot

| Área | Cambio |
|---|---|
| **Lighthouse CI** | Audita accesibilidad (≥0.9 bloquea PR), performance, SEO en cada PR |
| **Lighthouse CI** | `wait-on` + Chrome flags headless — fix NO_FCP en GitHub Actions |
| **Type-check** | `tsc --noEmit` en cada PR — errores de tipos bloquean antes del build |
| **Dependabot** | Updates npm semanales; `@radix-ui/*` agrupados en un solo PR |
