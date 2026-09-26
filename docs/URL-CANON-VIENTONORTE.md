# URL canon Viento Norte

**Canon:** `https://vientonorte.io/` (sin `/mi-portafolio/`)  
**Producto:** front office de la **empresa** Viento Norte.  
**Decide 14-sep-2026:** `/s/` **no** es URL de producto (ni diseño ni DoD). UI = `/#/`. Orgánico = `/servicios/*`. Ads `/s/consultoria/` = piloto, se queda 200.  
**Decide 25-sep-2026 (Rö):** `/s/consultoria` **deprecado**. Final URL Ads/links = `https://vientonorte.io/#/consultoria` (UTMs tras el hash). `/s/consultoria/` = stub noindex + canonical/hop a `/#/consultoria` (preserva UTMs, GTM). Fuera del sitemap.

## Superficies (2026-09-14)

| Superficie | Path | Live | Rol |
|------------|------|------|-----|
| **UI / DoD / embudo SEM** | `/#/consultoria` | https://vientonorte.io/#/consultoria | 3 packs. `qa:hash-ui` nunca `/s/` |
| **POC Apple** | `/#/consultoria/modulos/dashboard` | https://vientonorte.io/#/consultoria/modulos/dashboard | Tour #130 · `PocProductOnboarding` |
| **Orgánico crawler** | `/servicios/<slug>/` | https://vientonorte.io/servicios/ | HTTP sin `/s/`. Google lee esto, no el hash |
| **Home = embudo FO** | `/` | https://vientonorte.io/ | Packs, kickoff, Calendar free, contacto |
| Módulo SEM | `/#/consultoria/modulos/:id` | … | Deep link tour |
| Proceso | `/#/proceso` | … | Macros método |
| Design system | `/#/design-system` | … | Tokens |
| Demo X\|CMS | `/#/demo/x-cms` | … | Gate campaña · alias de Prototipo |
| Ops | `/ops/` | https://vientonorte.io/ops/ | Interno · `noindex` + robots Disallow |
| ~~Piloto Ads~~ **deprecado 25-sep** | `/s/consultoria/` | — | Stub noindex · canonical + hop a `/#/consultoria` (UTMs) · GTM. No enlazar. |

**No existe** `https://vientonorte.io/consultoria/` HTTP (404 shell). No crearla.

## Ads / SEM

**Embudo:** `https://vientonorte.io/#/consultoria`  
**POC Apple:** `https://vientonorte.io/#/consultoria/modulos/dashboard`  
**`/s/consultoria/`** deprecado.

No pagar a `/`. `/s/consultoria/` hoppea a `/#/consultoria` (stub, decide 25-sep).

## Local

| Superficie | URL |
|------------|-----|
| Home embudo | http://127.0.0.1:5173/#/ |
| SEM oferta | http://127.0.0.1:3000/#/consultoria |

## Legacy redirects

| Antes | Ahora |
|-------|--------|
| `/#/consultoria/embudo` | `/` (home) |
| `/#/poc/product-onboarding` | `/#/consultoria` (SEM) |
| **`/poc` · `/poc#/auditoria`** | **`/#/consultoria`** (no freemium; `/s/consultoria/` deprecado 25-sep) |
| `/s/consultoria/` | `/#/consultoria` (stub noindex, preserva UTMs) |
| `/mi-portafolio/…` | root `.io` |

`/#/auditoria` sigue vivo como **muestra mentoría** (noIndex). **Nunca** Ads ni lead pyme. Freemium = nota a11y en `/#/consultoria` → Calendar Diagnóstico. `/s/consultoria` deprecado (25-sep) → `/#/consultoria`.

## Repo git

Sigue pudiendo llamarse `mi-portafolio` (alias producto: `vientonorte-fo`). Rename GH = Decide aparte.
