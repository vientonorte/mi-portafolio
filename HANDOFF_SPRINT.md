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

## Sprint 2 — IA P2 + DevOps (EN CURSO)

**Sprint Goal:** Cerrar fricción de navegación en páginas profundas y alinear URL con label «Proceso».

**Duración sugerida:** 1 semana  
**PO:** Rö · **Dev:** Agent + CI

### Backlog comprometido

| ID | User Story | Prioridad | SP | Estado |
|----|------------|-----------|-----|--------|
| S2-1 | Como recruiter en mobile, quiero bottom nav en páginas internas para volver a Inicio/Negocios/Proceso sin scroll | MUST | 3 | ✅ |
| S2-2 | Como usuario, quiero `/proceso` como URL canónica (redirect desde `/cases`) | MUST | 2 | ✅ |
| S2-3 | Como dev, quiero `ROUTES` centralizado para evitar drift de paths | MUST | 1 | ✅ |
| S2-4 | Como dev, quiero smoke QA post-deploy extendido | SHOULD | 2 | ✅ |
| S2-5 | Como PO, quiero protocolo test con 5 recruiters (guía + métricas) | COULD | 3 | ⏳ |
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

### Sprint Review checklist

- [ ] `/#/proceso` carga CaseStudies
- [ ] `/#/cases` redirige a `/#/proceso`
- [ ] `/#/proceso/fase/ux-analytics` carga ProcessDetail
- [ ] Deep nav visible en `/proyecto/*` mobile
- [ ] Home conserva BottomNav completo

---

## Protocolo test recruiters (S2-5 — pendiente)

**Objetivo:** Validar comprensión en <10s (hallazgo research).

1. 5 participantes perfil recruiter tech / hiring manager
2. Tarea: «¿Qué hace Rodrigo y en qué industrias?» — sin scroll 10s, luego navegación libre 3 min
3. Métricas: tiempo a `/proyectos`, comprensión Fintech/Mobility (Sí/No), NPS del portfolio (0–10)
4. Registro: spreadsheet o Notion — no bloquea deploy

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