# Mobile-first — Portfolio UX

> Quick wins 2026-06-20

## Patrón de navegación dual

| Viewport | Primaria | Secundaria |
|---|---|---|
| `<768px` | `BottomNav` (4 ítems) | Header hamburger → `MobileMenu` |
| `≥768px` | Header desktop | Bottom nav visible como dock inferior |

## Cambios recientes

- **BottomNav**: scroll spy inicio/contacto; inactivos `#404040`
- **MobileMenu**: `bottom-16` para no solapar bottom nav + safe-area
- **Rutas secundarias**: espacio inferior persistente en `/design-system`, `/proceso`, `/auditoria`
- **Contraste**: `--bottom-nav-inactive` en light/dark tokens

## Checklist QA (iPhone SE / 375px)

```
□ Bottom nav: tap Inicio → scroll top; Contacto → #contacto
□ Hamburger: no tapa bottom nav; Escape cierra
□ Design System: último componente visible sobre bottom nav
□ Focus visible en todos los botones de nav
□ Contraste labels inactivos legibles
```

## Tokens

```css
/* globals.css */
--bottom-nav-inactive: #404040; /* light */
--bottom-nav-inactive: #a3a3a3; /* dark */
```

## Archivos

- `src/components/molecules/BottomNav.tsx`
- `src/components/molecules/MobileMenu.tsx`
- `src/styles/global.css` — padding `#main` + bottom nav