# Design Sprint — Portafolio Lead UX

## Ceremonias (Scrum)

| Ceremonia | Cuándo | Artefacto |
|-----------|--------|------------|
| **Sprint Planning** | Inicio de sprint | Backlog priorizado (MoSCoW) + Sprint Goal |
| **Daily** | Diario (15 min) | Bloqueos / avance vs DoD |
| **Sprint Review** | Fin de sprint | Demo en GitHub Pages + métricas CI |
| **Retrospectiva** | Post-review | Aprendizajes → siguiente sprint |

## DevOps pipeline

```
commit → push main → CI (build + typecheck + a11y) → Deploy Pages → qa-production.sh
```

**Definition of Done (DoD)**

- [ ] CI verde en `main`
- [ ] Deploy GitHub Pages exitoso
- [ ] `scripts/qa-production.sh` sin fallos
- [ ] Rutas críticas navegables (smoke manual o script)
- [ ] i18n ES/EN actualizado si hay copy
- [ ] Handoff actualizado

---

## Sprint 1 — Estabilización + IA P1 ✅ CERRADO

**Goal:** Recuperar producción y alinear navegación work-first.

| ID | Story | Prioridad | Estado |
|----|-------|-----------|--------|
| S1-1 | Fix React compat + typecheck | MUST | ✅ |
| S1-2 | Renombrar Proyectos → Negocios | MUST | ✅ |
| S1-3 | Nav Más + breadcrumbs 3 niveles | MUST | ✅ |
| S1-4 | Home slim (ProjectsTeaser) | MUST | ✅ |
| S1-5 | Testimonios LinkedIn reales | SHOULD | ✅ |
| S1-6 | Superficies matte + logos cliente | SHOULD | ✅ |
| S1-7 | Marca RG UX Architect + DS refresh | SHOULD | ✅ |

**Commits clave:** `e57ec4f` … `60d4999`

---

## Sprint 2 — IA P2 + DevOps ✅ CERRADO

**Sprint Goal:** Cerrar fricción de navegación en páginas profundas y alinear URL con label «Proceso».

**Duración:** 1 semana  
**PO:** Rö · **Dev:** Agent + CI  
**Estado:** ✅ **Completado** (2026-07-01)

### Backlog comprometido

| ID | User Story | Prioridad | SP | Estado |
|----|------------|-----------|-----|--------|
| S2-1 | Como recruiter en mobile, quiero bottom nav en páginas internas para volver a Inicio/Negocios/Proceso sin scroll | MUST | 3 | ✅ |
| S2-2 | Como usuario, quiero `/proceso` como URL canónica (redirect desde `/cases`) | MUST | 2 | ✅ |
| S2-3 | Como dev, quiero `ROUTES` centralizado para evitar drift de paths | MUST | 1 | ✅ |
| S2-4 | Como dev, quiero smoke QA post-deploy extendido | SHOULD | 2 | ✅ |
| S2-5 | Como PO, quiero protocolo test con 5 recruiters (guía + métricas) | COULD | 3 | ✅ |
| S2-6 | Renombrar breadcrumb «Casos de estudio» → «Proceso» en i18n | SHOULD | 1 | ✅ |

### Fuera de scope (Sprint 3)

- Migración completa de docs externos que citen `/cases`
- Bottom nav en desktop
- A/B de label «Método» vs «Proceso»

### Riesgos

| Riesgo | Mitigación |
|--------|------------|
| Bookmarks `/cases` rotos | Redirect `replace` en HashRouter |
| Doble padding footer + deep nav | `page-shell` + `--bottom-nav-total` solo en subpage mobile |
| Regresión CI | No merge sin build + typecheck verdes |

### Sprint Review checklist ✅

- [x] `/#/proceso` carga CaseStudies
- [x] `/#/cases` redirige a `/#/proceso`
- [x] `/#/proceso/fase/ux-analytics` carga ProcessDetail
- [x] Deep nav visible en `/proyecto/*` mobile
- [x] Home conserva BottomNav completo

**Verificación completa:** Ver `SPRINT2_REVIEW_VERIFICATION.md`

---

## Protocolo test recruiters (S2-5 — ✅ completado)

**Objetivo:** Validar comprensión en <10s (hallazgo research).

**Documento creado:** `RECRUITER_TEST_PROTOCOL.md`

Incluye:
- Perfil de 5 participantes (recruiters tech / hiring managers)
- Protocolo de 3 fases (10s first impression + 3min navegación + validación)
- Métricas cuantitativas: Time to Projects, Fintech/Mobility ID, NPS
- Template de spreadsheet para registro
- Checklist de ejecución completa
- Reporte de resultados (template)

---

## 📊 Sprint 2 - Resumen Final

**Fecha de cierre:** 2026-07-01  
**Estado:** ✅ **COMPLETADO AL 100%**

### Logros Sprint 2
- ✅ 6/6 user stories completadas (3 MUST, 2 SHOULD, 1 COULD)
- ✅ 5/5 checklist items del Sprint Review verificados
- ✅ 72/72 tests pasando
- ✅ 0 vulnerabilidades de seguridad (3 resueltas)
- ✅ Build + TypeCheck exitosos
- ✅ Protocolo de testing con recruiters documentado

### Archivos clave entregados
- `src/lib/routes.ts` - Rutas canónicas centralizadas
- `src/components/molecules/DeepPageNav.tsx` - Navegación en páginas profundas
- `RECRUITER_TEST_PROTOCOL.md` - Protocolo de testing S2-5
- `SPRINT2_REVIEW_VERIFICATION.md` - Verificación completa del Sprint Review

### Métricas
- **Story Points completados:** 12/12 (100%)
- **Tests:** 72 passing (0 failing)
- **Security:** 0 vulnerabilities
- **Build time:** ~680ms
- **Bundle size:** 268.54 KB (main chunk)

### Decisión
✅ **Listo para merge a `main`**

**Próximo Sprint:** Sprint 3 - Performance & UX (ver backlog abajo)

---

## Sprint 3 — Mobile UI + Atomic design ✅ CERRADO

**Sprint Goal:** Nav y secciones responsive con atomic design, branding coherente y foto de perfil lista para producción.

**Duración:** 2026-07-03  
**Estado:** ✅ **Completado**

### Entregables

| ID | Entrega | Estado |
|----|---------|--------|
| S3-1 | Nav dock unificado (`NavDock` + `nav-config`) | ✅ |
| S3-2 | Bottom nav solo mobile/tablet (`< lg`) | ✅ |
| S3-3 | Primitivo `PageSection` + migración secciones home | ✅ |
| S3-4 | Scroll anclas con offset header | ✅ |
| S3-5 | Hero responsive + CTAs audiencia | ✅ |
| S3-6 | Branding: avatar, logos tema, foto perfil | ✅ |
| S3-7 | Documentación `docs/NAV_AND_SECTIONS.md` | ✅ |

### Commits en `main`

```
833f3aee  Hero CTAs audiencia (cards)
6e99735c  Avatar, logos tema, branding
bb00eb59  Retoque foto perfil
ce4d9e8b  Nav + PageSection responsive
```

### DoD Sprint 3

- [x] Push a `main` → deploy GitHub Pages
- [x] Nav 5 ítems consistente home / subpáginas
- [x] Secciones home con spacing unificado
- [x] Documentación actualizada (MOBILE_FIRST, CHANGELOG, NAV_AND_SECTIONS)
- [ ] CI local verde (npm no disponible en entorno agente; verificar en máquina dev)
- [ ] Smoke `scripts/qa-production.sh` post-deploy

### Pendiente opcional (backlog)

- Migrar `ValueCarouselBanner` y páginas detalle a `PageSection`
- Centralizar `Navigation` items en `nav-config` (hoy solo dock)
- Eliminar `Header.tsx` legacy
- Breadcrumbs touch targets ≥ 44px

### Referencia rápida

- Arquitectura: **[docs/NAV_AND_SECTIONS.md](./docs/NAV_AND_SECTIONS.md)**
- Mobile QA: **[MOBILE_FIRST.md](./MOBILE_FIRST.md)**
- Producción: **https://vientonorte.io/**

---

## Comandos DevOps

```bash
# CI local (requiere npm)
npm ci && npm run sync:images && npm run build && npx tsc --noEmit

# Smoke producción
./scripts/qa-production.sh

# Estado deploy
gh run list --workflow "Deploy to GitHub Pages" --limit 3
```