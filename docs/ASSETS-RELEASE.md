# Assets release · mi-portafolio

**Actualizado:** 2026-07-21  
**Rama:** `feat/landing-reduce-ruido` · commit con assets: `c60fe47`  
**Prod:** https://vientonorte.github.io/mi-portafolio/ — solo tras merge `main` + Pages.

## Disponibilidad

| Superficie | Estado |
|------------|--------|
| Disco local `public/` | ✅ |
| Código (`portfolio-image-urls`, arsenal, registry, demos) | ✅ |
| Git (trackeados en rama) | ✅ |
| Producción | ⏳ pendiente PR/merge/deploy |

`base` Vite: `/mi-portafolio/` → URLs públicas bajo ese prefijo.

## Catálogo listo para ship (esta rama)

| ID / uso | Path `public/` | Código | Local | Prod |
|----------|----------------|--------|-------|------|
| GEES poster | `images/consultoria/gees-dashboard.png` | `consultoria.geesDashboard` · arsenal · demo showcase | ✅ | ⏳ |
| X \| CMS poster | `images/consultoria/x-cms-dashboard.png` | `consultoria.xCmsDashboard` | ✅ | (ya en main si previo) |
| UX Tools · journey | `images/ux-tools/journey-map.png` + `resources/ux-tools/journey-map.pdf` | arsenal `uxtools-journey-map` | ✅ | ⏳ |
| UX Tools · user-flow | `images/ux-tools/user-flow.png` + PDF | `uxtools-user-flow` | ✅ | ⏳ |
| UX Tools · usability | `images/ux-tools/usability-test.png` + PDF | `uxtools-usability-test` | ✅ | ⏳ |
| UX Tools · design system | `images/ux-tools/design-system.png` + PDF | `uxtools-design-system` · suite | ✅ | ⏳ |
| Brands monogram ×7 | `images/brands/*.svg` | `portfolioImages.brands` · Experience | ✅ | ⏳ |

### Re-captura / curación

```bash
bash scripts/capture-gees-screenshot.sh
# → public/images/consultoria/gees-dashboard.png

# UX Tools: origen iCloud PDFS/Diseño/UX TOOLS → thumbs qlmanage + copy PDF
# Ver public/resources/ux-tools/README.md
```

### Staging hash (no ship)

| Qué | Path | Git |
|-----|------|-----|
| 39 PNG Figma hash archivados | `archive/src-assets-hash-2026-07-21/` | PNG **gitignored** |
| Registro VB | `docs/REGISTRO-src-assets-archive-2026-07-21.md` | ✅ versionado |

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
