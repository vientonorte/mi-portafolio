# Inventario · qué se usa y qué no

**Actualizado:** 2026-07-21  
**Repo:** `mi-portafolio`  
**Criterio “en uso”:** referenciado en `src/` (urls, registry, arsenal, logos) o servido como recurso de producto.

---

## 1 · Resumen ejecutivo

| Capa | En uso (producto) | Staging / no público | Solo iCloud (no en repo) |
|------|-------------------|----------------------|---------------------------|
| `public/images/**` | **43** PNG/SVG | 0 | — |
| `public/resources/**` PDF | **4** UX Tools | 0 | — |
| Arsenal cards | **34** items | — | — |
| Edu 21 pack | **6** en `public/cases/edu21/` · **4** en arsenal | espejo `docs/staging/` | ~243 en Asesorías |
| Asesorías resto | 0 | 0 | ~912 (default privado) |
| `src/assets` hash | **39** (build `figma:asset`) | espejo archive local | — |

---

## 2 · `public/images` — en uso (43)

### Consultoría
| Path | Uso |
|------|-----|
| `consultoria/x-cms-dashboard.png` | Arsenal + demo showcase |
| `consultoria/gees-dashboard.png` | Arsenal + demo showcase |

### UX Tools (cartas método)
| Path | Uso |
|------|-----|
| `ux-tools/journey-map.png` | Arsenal + PDF recurso |
| `ux-tools/user-flow.png` | Arsenal + PDF |
| `ux-tools/usability-test.png` | Arsenal + PDF |
| `ux-tools/design-system.png` | Arsenal + suite + PDF |

### Método · Coworking anonimizado (2026-07-21)
| Path | En arsenal | En registry/urls |
|------|------------|------------------|
| `method/coworking/funnel-structure.png` | ✅ `method-funnel-structure` | ✅ |
| `method/coworking/funnel-conversion.png` | ❌ (reserva) | ✅ urls only |
| `method/coworking/a11y-contrast.png` | ✅ `method-a11y-contrast` | ✅ |
| `method/coworking/a11y-readability.png` | ❌ (reserva) | ✅ urls only |
| `method/coworking/i18n-gap.png` | ✅ `method-i18n-gap` | ✅ |
| `method/coworking/service-discovery.png` | ✅ `method-service-discovery` | ✅ |

Origen iCloud: `Asesorías/Coworking/Benchmark/` (intacto). Paths públicos **sin** nombre de cliente.

### SURA / Transvip / Karri / framework / brands
Todos los paths bajo `sura/`, `transvip/`, `karri/`, `framework/`, `brands/`, `branding/og-portfolio.png` están cableados vía `portfolio-image-urls` y/o proyectos/Experience.

### `public/images` — no usados
**Ninguno** en el árbol actual (0 huérfanos en `public/images`).

---

## 3 · PDF en `public/resources`

| Path | En uso |
|------|--------|
| `resources/ux-tools/journey-map.pdf` | ✅ href arsenal |
| `resources/ux-tools/user-flow.pdf` | ✅ |
| `resources/ux-tools/usability-test.pdf` | ✅ |
| `resources/ux-tools/design-system.pdf` | ✅ |

---

## 4 · Edu 21 (GO 2026-07-21 · marca visible)

| Path | Estado |
|------|--------|
| `public/images/cases/edu21/01…06-*.png` | ✅ en sitio (registry + 4 arsenal) |
| `docs/staging/edu21-pack/` | espejo + `PERMISO.md` cerrado |
| Cotizaciones Asesorías | **no** copiadas |

**No en arsenal (sí en public/registry):** `02-competitive-benchmark`, `06-performance-seo` (reserva).

---

## 5 · Arsenal (`VALUE_PROOF_ITEMS`) — 34 cards

**En uso en home/consultoría** (`#valor`):

| Grupo | IDs |
|-------|-----|
| Demos | `x-cms-demo`, `gees-propuesta` |
| SURA / RIA | `ria-us`, `ria-celula-evolutiva`, `poc-ia-dei`, `sura-inversiones-dashboard`, `ecosistema-sura`, `sura-ux-enterprise`, `autosuggest`, `sura-ia-case`, `ux-analytics`, `sura-booking-flow` |
| Transvip / Karri | `transvip-*`, `karri-*` |
| Método UX Tools | `uxtools-suite`, `uxtools-journey-map`, `uxtools-user-flow`, `uxtools-usability-test`, `uxtools-design-system` |
| Método Coworking | `method-funnel-structure`, `method-a11y-contrast`, `method-i18n-gap`, `method-service-discovery` |
| Otros | `proceso-ux`, `design-system`, `auditoria-ejemplo`, `figjam-audit-board`, `consultoria-arbol`, `valuesite-avem-landing` |

**No hay card de arsenal** para Edu 21 (correcto hasta permiso).

---

## 6 · Build-only · `src/assets/<hash>.png` (39)

| Estado | Uso |
|--------|-----|
| **En uso en build** | Imports `figma:asset/…` + aliases en `vite.config.ts` + `project-images.ts` + `src/imports/*` |
| **No son** la URL pública del portafolio | Runtime público = `public/images/` |
| Archive local | `archive/src-assets-hash-2026-07-21/` (espejo; PNG gitignored ahí) |

---

## 7 · iCloud Asesorías — **no usados en producto** (salvo curaciones)

| Pool | n | En producto |
|------|---|-------------|
| `Asesorías/**` total | ~912 | **No** (default) |
| Coworking | 21 | **6 PNG copiados** anonimizados → method/ |
| Edu 21 | 243 | **6 thumbs** solo staging |
| Servicios PDF | 3 | No (decisión: no reescribir oferta) |
| Agua Vegana PDF | 1 | No (privado) |
| Personas/CV | ~25 carpetas | No |

Detalle: Obsidian `Viento Norte/Resources/Inventario Asesorías iCloud.md`.

---

## 8 · Mapa rápido “¿lo estoy usando?”

```
public/images/*          → SÍ (43/43)
public/resources/pdf     → SÍ (4/4)
method/coworking/*       → SÍ en código; 4 en arsenal + 2 reserva
docs/staging/edu21/*     → NO en UI (espera permiso)
Asesorías iCloud resto   → NO
src/assets hashes        → SÍ build, no URL semántica
Servicios/*.pdf          → NO (decisión)
Agua Vegana              → NO
```

---

## 9 · Próximos toggles

| Acción | Pasa a “en uso” cuando… |
|--------|-------------------------|
| Edu 21 | Permiso + move a `public/` + arsenal |
| 2 capturas coworking reserva | Añadir card arsenal o borrar |
| Migrar figma:asset | Menos dependencia de `src/assets` hashes |
