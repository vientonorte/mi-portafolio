# Guidelines — mi-portafolio

## Atomic design (obligatorio)

| Nivel | Qué va ahí | Ejemplos |
|-------|------------|----------|
| **Atom** | UI irreducible, un solo rol | `SectionTitle`, `SectionBadge`, `Button` |
| **Molecule** | Composición de atoms | `SectionHeader`, `ImpactMetricCard` |
| **Organism** | Bloque de sección / feature | `Hero`, `ValueContentArsenal`, `Contact` |
| **Template / Page** | Layout + orquestación | `Home`, `ConsultoriaVientoNorte` |

### Reglas

1. **No inventes tipografía en organisms** con utilidades sueltas (`text-3xl`, `font-semibold` en `h1`/`h2`/`h3`).
2. **Títulos de sección** → atom `SectionTitle` / molecule `SectionHeader` (tokens Chillax del base layer).
3. **Un PR = un nivel** cuando sea posible (no rediseñar atoms “de paso” en un fix de page).
4. **CTAs / form** reutilizan molecules/organisms existentes (form contacto transversal).
5. **Demos** = mock estático (atom/molecule de poster), no iframes ad-hoc en el scroll de leads.

### Anti-patrones (no hacer)

```tsx
// ❌ Rompe Chillax / escala DS (globals.css opt-out con text-*)
<h2 className="text-3xl md:text-4xl font-semibold">…</h2>

// ✅ Atom + clase de design-system
<SectionTitle align="center">…</SectionTitle>
```

### Tipografía

- Fuente de títulos: **Chillax** vía design system / base layer.
- Cualquier `class` que empiece por `text-` en un heading puede **sacar** el nodo de esa escala.
- Color y alineación: clases DS (`.section-title--center`) o tokens CSS, no tamaños Tailwind en headings.

### Heading hierarchy (a11y)

| Rol | Semántica | Visual |
|-----|-----------|--------|
| Nombre de página / hero | **h1** (uno por vista) | hero DS |
| Título de sección con badge | **h3** vía `SectionTitle` / `SectionHeader` | `.section-title` (peso de sección) |
| Badge (“Recursos”, “Resultados”…) | **no es heading** — `SectionBadge` | chip/label |

Ejemplo: badge `Recursos` + title `Recursos que demuestran el método` → badge visual + **h3** title.

### Nav / landing

- Cambios de nav en `nav-config` (registry), no hardcode en `Navigation.tsx`.
- Surfaces: `NAV_SURFACE.headerPrimary` / `dock` / `mobileDrawer`.
