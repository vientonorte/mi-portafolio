# HANDOFF — Sprint 3 · 20-05-2026

## Estado del deploy

| Campo | Valor |
|-------|-------|
| **Rama** | `main` |
| **URL** | https://vientonorte.github.io/mi-portafolio/ |
| **Estado** | ✅ Pusheado · desplegando vía GitHub Pages |
| **Base path** | `/mi-portafolio` |

---

## Resumen ejecutivo

Sprint enfocado en estabilización del build y limpieza editorial. Se corrigieron 40 archivos con imports rotos (`@vientonorte/tokens/css`, `@vientonorte/ui/*`) que impedían compilar. Se rediseñó el Hero con estética editorial estilo Fintual (número ancla −40%, layout left-aligned, sin ornamentos). Se normalizó el contact info (email y LinkedIn en 3 archivos), se completó la página de Privacy que era un placeholder de 1 línea, y se conectó la ruta de detalle de procesos (`/cases/process/:processId`). Se eliminó información sensible de cliente de AuditoriaPortfolio.tsx y se borró el duplicado con espacio en el nombre.

---

## Archivos clave

| Archivo | Descripción |
|---------|-------------|
| `src/App.tsx` | Rutas principales; `ProcessDetailPage` ahora conectado |
| `src/components/organisms/Navigation.tsx` | Logo → `#inicio`, "Casos" en navItems, handler auditoria explícito |
| `src/components/organisms/Hero.tsx` | Rediseño editorial: anchor −40%, left-aligned, stats row |
| `src/components/Footer.tsx` | Email y enlace Privacy corregidos |
| `src/pages/Privacy.tsx` | Página legal completa (5 secciones) |
| `src/pages/AuditoriaPortfolio.tsx` | Sin URL cliente, nombre anonimizado |

---

## Tabla de fixes aplicados

| # | Fix | Archivos | Severidad |
|---|-----|----------|-----------|
| 1 | Imports `@vientonorte/*` rotos → paths locales | 40 archivos `.tsx` | 🔴 Crítico |
| 2 | Logo navigation → `#inicio` + "Casos" al menú | `Navigation.tsx` | 🟡 Medio |
| 3 | Dead code `"case-studies"` eliminado en desktop nav | `Navigation.tsx` | 🟢 Bajo |
| 4 | Hero rediseño editorial estilo Fintual | `Hero.tsx` | 🟡 Medio |
| 5 | Email/LinkedIn normalizados | `Footer.tsx`, `Contact.tsx`, `AuditoriaPortfolio.tsx` | 🟡 Medio |
| 6 | Privacy.tsx completada (era 1 línea) | `Privacy.tsx` | 🟡 Medio |
| 7 | Ruta `/cases/process/:processId` conectada | `App.tsx` | 🟡 Medio |
| 8 | URL cliente y nombre real removidos de AuditoriaPortfolio | `AuditoriaPortfolio.tsx` | 🔴 Crítico |
| 9 | Eliminado `AuditoriaPortfolio 2.tsx` (duplicado) | — | 🟢 Bajo |

---

## Commits del sprint

```
feat(hero): rediseño editorial estilo Fintual — número ancla, left-aligned, stats row
fix(contact): email gaete.gaona@gmail.com + LinkedIn rodrigo-gaete-ux en todos los archivos
fix(privacy): página de privacidad completa (era placeholder de 1 línea)
fix(nav+routes): Navigation logo→#inicio, "Casos" en menú, ruta process/:processId
fix(build): eliminados imports @vientonorte/* inexistentes — 40 archivos corregidos
fix(auditoria): removida URL cliente y nombre real
chore: eliminar AuditoriaPortfolio 2.tsx
```

---

## Deuda técnica pendiente

| # | Item | Prioridad | Effort | Categoría | Estado |
|---|------|-----------|--------|-----------|--------|
| ~~P1~~ | ~~MobileMenu.tsx: `"case-studies"` → `"cases"`~~ | ~~Must~~ | ~~S~~ | ~~🔴 Bug~~ | ✅ Cerrado |
| ~~P1~~ | ~~MobileMenu.tsx useCallback deps: `onNavigateToAuditoria`~~ | ~~Must~~ | ~~S~~ | ~~🔴 Bug~~ | ✅ Cerrado |
| ~~P3~~ | ~~Navigation.tsx handleNavClick deps: `onNavigateToAuditoria`~~ | ~~Could~~ | ~~S~~ | ~~🟢 Código~~ | ✅ Cerrado |
| P2 | **PDF download es `window.print()`**: no genera PDF real; considerar jsPDF o endpoint de generación | Should | M | 🟡 Deuda técnica | Abierto |
| P2 | **Privacy**: verificar contraste en modo oscuro móvil | Should | S | 🟡 QA | Abierto |
| P3 | **Páginas huérfanas sin ruta**: `CompanyDetail.tsx`, `ProjectDetail.tsx`, `FrameworkDetail.tsx` sin entrada en `App.tsx` | Could | M | 🟢 Deuda | Abierto |

---

## Nota técnica — Tailwind v4 (hallazgo sprint 20-05-2026)

El proyecto usa **Tailwind CSS v4.1.3** via `@tailwindcss/vite`. En v4, solo se generan las clases que el scanner encuentra en los archivos fuente **en el momento del build/primer escaneo**. Clases como `pt-28` o `text-[clamp(...)]` (con comas en el valor arbitrario) no se generan aunque estén en el JSX. Solución aplicada: mover valores críticos de layout a `style` props de React.

**Regla para Hero.tsx y componentes que lo necesiten:** usar `style={{ fontSize: '...', padding: '...' }}` en lugar de clases Tailwind arbitrarias con `clamp()` o valores de spacing > `pt-16`.

---

## Verificación QA post-sprint

| Check | Resultado |
|-------|-----------|
| Logo apunta a `#inicio` | ✅ |
| "Casos" en navItems desktop | ✅ |
| `"case-studies"` eliminado de Navigation.tsx | ✅ |
| `"case-studies"` corregido en MobileMenu.tsx | ✅ (era P1) |
| MobileMenu: `onNavigateToAuditoria` en deps | ✅ (era P1) |
| Navigation: `onNavigateToAuditoria` en handleNavClick deps | ✅ (era P3) |
| Hero: anchor `−40%` a 160px (desktop) / 80px (móvil) | ✅ |
| Hero: label "LEAD UX DESIGNER" sobre el nav (clearance 32px) | ✅ |
| Hero: padding via style props (Tailwind v4 compat) | ✅ |
| Hero: sin Logo import | ✅ |
| Footer: `gaete.gaona@gmail.com` | ✅ |
| Privacy: página completa (no placeholder) | ✅ |
| App.tsx: ruta `/cases/process/:processId` | ✅ |
| `onNavigateToProcess` conectado (no noop) | ✅ |
| AuditoriaPortfolio: sin `laura-portfoli0.webflow.io` | ✅ |
| AuditoriaPortfolio: sin `"Laura López"` | ✅ |
| `AuditoriaPortfolio 2.tsx` eliminado | ✅ |

---

## Próximos pasos recomendados

1. **Sprint siguiente**: Decidir si `CompanyDetail`, `ProjectDetail` y `FrameworkDetail` se activan con rutas o se eliminan.
2. **Sprint siguiente**: Reemplazar `window.print()` por generación real de PDF en AuditoriaPortfolio.
3. **Opcional**: Revisar contraste de `/privacy` en modo oscuro en móvil.

## Backlog comprometido
### P1 (cerrado)
- [x] Merge + deploy del fix de compatibilidad React (listo para merge a `main`).
- [x] Corregir typecheck por archivos de licencia en `src/LICENSE`.
- [x] Verificación técnica local: build + typecheck.

### P2 (siguiente iteración)
- [ ] Verificación post-deploy en URL pública (`/`, `/proyectos`, `/sobre-mi`, `/contacto`) después del merge a `main`.
- [ ] Revisar ramas no mergeadas y consolidar solo mejoras seguras (evitar cambios de dependencias regresivos).

## Riesgos abiertos
- El deploy de Pages depende de merge a `main`; sin eso, la URL pública no se actualiza.
- Existen ramas históricas con cambios amplios y mezcla de dependencias; integrar sin curaduría puede reintroducir regresiones.

## Definición de Done
- Workflow **Deploy to GitHub Pages** en verde en `main`.
- Sitio navegable sin pantalla en blanco.
- CI de PR en verde (build smoke + typecheck).
- Handoff documentado con próximos pasos y riesgos.
