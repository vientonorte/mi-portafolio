# Mobile-first — Portfolio UX

> Actualizado: 2026-07-03 · Ver también [docs/NAV_AND_SECTIONS.md](./docs/NAV_AND_SECTIONS.md)

## Patrón de navegación

| Viewport | Primaria | Secundaria | Dock |
|----------|----------|------------|------|
| `< 1024px` | Header: logo + ES/EN + tema + menú | `MobileMenu` (drawer) | `NavDock` 5 ítems |
| `≥ 1024px` | Header: logo + nav + Más + tema + idioma | — | oculto |

**Subpáginas:** `SubpageToolbar` + `DeepPageNav` (sin header home).

## Dock — 5 destinos unificados

| Ítem | Home | Subpágina |
|------|------|-----------|
| Inicio | `#inicio` | `/` |
| Negocios | `/proyectos` | `/proyectos` |
| Experiencia | `/sobre-mi#experiencia` | idem |
| Proceso | `/proceso` | `/proceso` |
| Contacto | `#contacto` | `/contacto` |

Config: `src/lib/nav-config.ts` · UI: `src/components/organisms/NavDock.tsx`

## Secciones responsive

Primitivo `PageSection` (`src/components/layout/PageSection.tsx`):

- Padding: `compact` | `default` | `spacious`
- Ancho: `narrow` | `content` | `wide`
- Tono: `default` | `muted` | `matte` | `section`

## Scroll y safe areas

- Anclas: `scrollToSection()` — offset `--header-height`
- `scroll-padding-bottom` solo `< lg`
- Drawer: `bottom-[var(--bottom-nav-total)]` hasta `lg`
- Hero: `min-h-[100dvh]`, `pt-[var(--header-height)]`

## Touch targets

- Header controls: `h-11 w-11` (`mobile-header-classes.ts`)
- Dock tabs: `min-h-[44px]` (`NavTabItem`)
- Menú móvil: `min-h-[44px]` por ítem

## Checklist QA (375px)

```
□ Dock 5 ítems; labels no se solapan críticamente
□ Inicio / Contacto scroll correcto en home
□ Contacto abre /contacto fuera de home
□ Hamburger no cubre dock
□ Hero y footer no quedan bajo dock
□ Tema + idioma en header mobile y subpage toolbar
□ Timeline Experience visible en móvil
```

## Tokens

```css
--header-height: 4rem; /* 5rem @ 640px+ */
--bottom-nav-total: 4rem + safe-area;
--bottom-nav-inactive: #404040 (light) / #a3a3a3 (dark);
```

## Archivos clave

| Archivo | Rol |
|---------|-----|
| `src/lib/nav-config.ts` | Ítems dock |
| `src/components/organisms/NavDock.tsx` | Dock organism |
| `src/components/layout/PageSection.tsx` | Sección responsive |
| `src/lib/scroll-to-section.ts` | Scroll anclas |
| `src/styles/global.css` | Vars layout + subpage |