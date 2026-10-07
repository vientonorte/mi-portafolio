# URL canon Viento Norte

> ⚠ **Canon de URLs vigente (2026-10), prevalece sobre este doc.** El link final para clientes es `https://vientonorte.io/servicios/?<utm>`, con ancla opcional `#web-pymes`, `#revision-gratis` o `#consultoria-ux` (la UTM va antes del ancla). También valen las páginas de rubro publicadas. **No se envían a clientes:** `/s/` (salvo `/s/polijuego-privacy/`), `/#/`, `/news/`, `/qa/`, `/mi-portafolio/` ni los slugs viejos de `/servicios/`. El dev local es `http://localhost:3000/` (5173 está obsoleto). Prod se sirve con GitHub Pages en `vientonorte.io` (`vientonorte.github.io` ya no es la URL pública). Las rutas `/#/…` que quedan abajo son superficies internas o de QA, o registro histórico. Detalle: `docs/AUDITORIA-CANON-DOCS-2026-10.md`.

**Canon:** `https://vientonorte.io/` (sin `/mi-portafolio/`)  
**Producto:** front office de la **empresa** Viento Norte.  
**Decide 14-sep-2026:** `/s/` **no** es URL de producto (ni diseño ni DoD). UI = `/#/`. Orgánico = `/servicios/*`. Ads `/s/consultoria/` = piloto, se queda 200.

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
| **Piloto Ads (no producto)** | `/s/consultoria/` | https://vientonorte.io/s/consultoria/ | Final URL Ads legacy. 200. GTM. **No hop. No IA.** |

**No existe** `https://vientonorte.io/consultoria/` HTTP (404 shell). No crearla.

## Ads / SEM

**Embudo:** `https://vientonorte.io/#/consultoria`  
**POC Apple:** `https://vientonorte.io/#/consultoria/modulos/dashboard`  
**`/s/consultoria/`** deprecado.

No pagar a `/`. No hoppear el piloto mientras sea la única loc comercial en SERP.

## Local

| Superficie | URL |
|------------|-----|
| Home embudo | http://127.0.0.1:3000/#/ |
| SEM oferta | http://127.0.0.1:3000/#/consultoria |

## Legacy redirects

| Antes | Ahora |
|-------|--------|
| `/#/consultoria/embudo` | `/` (home) |
| `/#/poc/product-onboarding` | `/#/consultoria` (SEM) |
| **`/poc` · `/poc#/auditoria`** | **`/s/consultoria/`** (piloto Ads HTTP; deprecado · no freemium) |
| `/mi-portafolio/…` | root `.io` |

`/#/auditoria` sigue vivo como **muestra mentoría** (noIndex). **Nunca** Ads ni lead pyme. Freemium = nota a11y en `/#/consultoria` → Calendar Diagnóstico. `/s/consultoria` = piloto Ads, no producto.

## Repo git

Sigue pudiendo llamarse `mi-portafolio` (alias producto: `vientonorte-fo`). Rename GH = Decide aparte.
