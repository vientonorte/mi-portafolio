# Handoff multi-device (M1)

> ⚠ **Canon de URLs vigente (2026-10), prevalece sobre este doc.** El link final para clientes es `https://vientonorte.io/servicios/?<utm>`, con ancla opcional `#web-pymes`, `#revision-gratis` o `#consultoria-ux` (la UTM va antes del ancla). También valen las páginas de rubro publicadas. **No se envían a clientes:** `/s/` (salvo `/s/polijuego-privacy/`), `/#/`, `/news/`, `/qa/`, `/mi-portafolio/` ni los slugs viejos de `/servicios/`. El dev local es `http://localhost:3000/` (5173 está obsoleto). Prod se sirve con GitHub Pages en `vientonorte.io` (`vientonorte.github.io` ya no es la URL pública). Las rutas `/#/…` que quedan abajo son superficies internas o de QA, o registro histórico. Detalle: `docs/AUDITORIA-CANON-DOCS-2026-10.md`.

Canon full: Obsidian `Viento Norte/Sessions/2026-07-28 handoff M1 · ver trabajo.md`  
iCloud GitHub rules: Obsidian `Resources/GitHub iCloud multi-dispositivo.md`

## On M1

```bash
export GH_ROOT="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Documents/GitHub"
cd "$GH_ROOT/mi-portafolio"
git fetch --prune

# Production path (main)
git checkout main && git pull --ff-only

# POC scroll tour + VN branding (PR #130)
git checkout feat/poc-apple-product-onboarding && git pull --ff-only
npm ci   # if needed
npm run dev -- --host 127.0.0.1 --port 3000
```

| What | URL |
|------|-----|
| POC Apple (prod) | https://vientonorte.io/#/consultoria/modulos/dashboard |
| POC Apple (local) | http://127.0.0.1:3000/#/consultoria/modulos/dashboard |
| Funnel SEM (prod) | https://vientonorte.io/#/consultoria |
| Funnel (local) | http://127.0.0.1:3000/#/consultoria |
| Legacy `/#/poc/product-onboarding` | redirige al embudo, no al tour |
| X\|CMS demo | https://pouch-growl-74881457.figma.site |
| Ops | https://vientonorte.io/ops/ |
| PR POC | https://github.com/vientonorte/mi-portafolio/pull/130 |

**Rule:** work only under iCloud `Documents/GitHub/` — not a second clone in `~/code`.  
**Git moves commits; iCloud moves files.** Always `git pull` on the other Mac after `git push`.
