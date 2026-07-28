# Handoff multi-device (M1)

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
npm run dev -- --host 127.0.0.1 --port 5173
```

| What | URL |
|------|-----|
| POC tour (local) | http://127.0.0.1:5173/mi-portafolio/#/poc/product-onboarding |
| Funnel (local) | http://127.0.0.1:5173/mi-portafolio/#/consultoria |
| Funnel (prod) | https://vientonorte.io/mi-portafolio/#/consultoria |
| X\|CMS demo | https://pouch-growl-74881457.figma.site |
| Ops | https://vientonorte.io/ops/ |
| PR POC | https://github.com/vientonorte/mi-portafolio/pull/130 |

**Rule:** work only under iCloud `Documents/GitHub/` — not a second clone in `~/code`.  
**Git moves commits; iCloud moves files.** Always `git pull` on the other Mac after `git push`.
