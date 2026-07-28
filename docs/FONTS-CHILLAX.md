# Chillax — carga de tipografía

## Fuente de verdad

| Pieza | Path |
|-------|------|
| Archivos woff2 | `public/fonts/chillax/chillax-{300,400,500,600,700}.woff2` |
| `@font-face` | `src/styles/chillax-local.css` |
| Import | `src/main.tsx` (antes de `globals.css`) |
| Tokens | `--font-chillax`, `@theme --font-sans` en `globals.css` |
| Atom títulos | `SectionTitle` + `.section-title` en `design-system.css` |

## Por qué self-host

Fontshare CDN (`//cdn.fontshare.com`) falla a menudo en **preview local** (`http://127.0.0.1:4173`) por URLs protocol-relative y/o `media=print`+onload. Self-host garantiza Chillax en local y en GitHub Pages.

## QA

1. `npm run build && npm run preview -- --host 127.0.0.1 --port 4173`
2. Hard refresh `Cmd+Shift+R`
3. Network → `chillax-400.woff2` → **200** desde `/fonts/chillax/`
4. Computed → `font-family: Chillax, …`

## Regla

No forzar `text-3xl` / utilidades de tamaño en `h1–h3`: opt-out de la escala Chillax. Usar atomic `SectionTitle` / `SectionHeader`.
