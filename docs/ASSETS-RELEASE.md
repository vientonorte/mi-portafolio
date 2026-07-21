# Assets release · mi-portafolio

**Actualizado:** 2026-07-21 · **shipped**  
**PRs:** #118 (landing + GEES/UX Tools) · #119 (Coworking + Edu 21)  
**Prod:** https://vientonorte.github.io/mi-portafolio/

## Disponibilidad

| Superficie | Estado |
|------------|--------|
| Disco local `public/` | ✅ |
| Código (`portfolio-image-urls`, arsenal, registry, demos) | ✅ |
| Git (trackeados en rama) | ✅ |
| Producción | ✅ merge PR #118 · Pages 2026-07-21 · smoke HTTP 200 |

`base` Vite: `/mi-portafolio/` → URLs públicas bajo ese prefijo.

## Catálogo listo para ship (esta rama)

| ID / uso | Path `public/` | Código | Local | Prod |
|----------|----------------|--------|-------|------|
| GEES poster | `images/consultoria/gees-dashboard.png` | arsenal · demo | ✅ | ✅ |
| X \| CMS poster | `images/consultoria/x-cms-dashboard.png` | arsenal · demo | ✅ | ✅ |
| UX Tools ×4 | `images/ux-tools/*` + `resources/ux-tools/*.pdf` | arsenal | ✅ | ✅ |
| Coworking método ×6 | `images/method/coworking/*` | 4 arsenal + 2 reserva | ✅ | ✅ #119 |
| Edu 21 ×6 | `images/cases/edu21/*` | 4 arsenal + 2 reserva · marca sí | ✅ | ✅ #119 |
| Brands monogram ×7 | `images/brands/*.svg` | Experience / About | ✅ | ✅ |

### Re-captura / curación

```bash
bash scripts/capture-gees-screenshot.sh
# → public/images/consultoria/gees-dashboard.png

# UX Tools: origen iCloud PDFS/Diseño/UX TOOLS → thumbs qlmanage + copy PDF
# Ver public/resources/ux-tools/README.md
```

### Hash Figma (`src/assets/`) — build / figma:asset

| Qué | Path | Git |
|-----|------|-----|
| 39 PNG hash (imports `figma:asset` + vite aliases) | `src/assets/<hash>.png` | ✅ versionados (`git add -f`; necesarios para CI build) |
| Espejo local archive | `archive/src-assets-hash-2026-07-21/` | PNG gitignored |
| Registro VB | `docs/REGISTRO-src-assets-archive-2026-07-21.md` | ✅ versionado |

> **Nota 2026-07-21:** se intentó archivar-only; el build falló en CI. Se restauraron hashes en `src/assets` hasta migrar `src/imports/*` y `project-images.ts` a `public/images`.

## Smoke local

1. `npm run dev` → `http://127.0.0.1:5173/mi-portafolio/`
2. Home arsenal: cards GEES + 4 método UX Tools visibles
3. `/#/consultoria#consultoria-demo` → poster GEES ≠ X\|CMS
4. Abrir un PDF: `/mi-portafolio/resources/ux-tools/journey-map.pdf`
5. Sobre mí / Experience: monogramas marcas extendidas

## Smoke prod (post-deploy)

1. Hard refresh Pages
2. Mismos 4 checks con `https://vientonorte.github.io/mi-portafolio/`
3. Network: 200 en PNG/PDF (no 404 SW)

## Memoria

- Obsidian: `Viento Norte/Writing/Inventario assets portafolio.md`
- Studio: `10-productos/mi-portafolio/INVENTARIO-ASSETS.md`
- Sprint: `Viento Norte/Sprints/2026-07-21 Landing reduce el ruido.md` § Assets release
