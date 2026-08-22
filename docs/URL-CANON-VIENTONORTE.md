# URL canon Viento Norte

**Canon:** `https://vientonorte.io/` (sin `/mi-portafolio/`)  
**Producto:** front office de la **empresa** Viento Norte.

## Superficies (2026-07-28)

| Superficie | Path | Live | Rol |
|------------|------|------|-----|
| **Home = embudo FO** | `/` | https://vientonorte.io/ | Conversión: packs, kickoff, Calendar free, contacto |
| **Oferta SEM** | `/#/consultoria` | https://vientonorte.io/#/consultoria | Landing paid · 3 packs + OB |
| Módulo SEM | `/#/consultoria/modulos/:id` | … | Deep link tour |
| Proceso | `/#/proceso` | … | Macros método |
| Demo X\|CMS | `/#/demo/x-cms` | … | Gate campaña · alias de Prototipo |
| Demo Diagnóstico | `/#/demo/diagnostic` | … | Reloj 1 min |
| Demo Prototipo | `/#/demo/prototype` | … | Reloj 5 min |
| Demo Proceso | `/#/demo/process` | … | Reloj 4 min |
| Demo App | `/#/demo/app` | … | Reloj 5 min |
| Ops | `/ops/` | https://vientonorte.io/ops/ | Interno |

## Ads / SEM

**Final URL recomendada (story):**  
`https://vientonorte.io/#/consultoria`

**Conversión (si ads a embudo directo):**  
`https://vientonorte.io/`  
(CTA “Empezar” en SEM también lleva a home embudo.)

## Local

| Superficie | URL |
|------------|-----|
| Home embudo | http://127.0.0.1:5173/#/ |
| SEM oferta | http://127.0.0.1:5173/#/consultoria |

## Legacy redirects

| Antes | Ahora |
|-------|--------|
| `/#/consultoria/embudo` | `/` (home) |
| `/#/poc/product-onboarding` | `/#/consultoria` (SEM) |
| **`/poc` · `/poc#/auditoria`** | **`/#/consultoria`** (deprecado · no freemium) |
| `/mi-portafolio/…` | root `.io` |

`/#/auditoria` sigue vivo como **muestra mentoría** (noIndex). **Nunca** Ads ni lead pyme. Freemium = nota a11y en `/#/consultoria` → Calendar Diagnóstico. Paid crawler = `/s/consultoria`.

## Repo git

Sigue pudiendo llamarse `mi-portafolio` (alias producto: `vientonorte-fo`). Rename GH = Decide aparte.
