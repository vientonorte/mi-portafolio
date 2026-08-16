# SEO dominio + GTM · Viento Norte FO

**Live canon:** https://vientonorte.io/  
**Hub / SPA root:** https://vientonorte.io/  
**Sitemap:** `https://vientonorte.io/sitemap.xml`  
**robots:** `https://vientonorte.io/robots.txt`  

## Jerarquía de oferta (baseline)

| Prioridad | URL | Rol |
|-----------|-----|-----|
| 1 | https://vientonorte.io/ | Home empresa FO |
| 2 | https://vientonorte.io/#/consultoria | Oferta (tour módulos) |
| 3 | https://vientonorte.io/#/consultoria/embudo | Embudo packs + free a11y + onboarding |
| 4 | https://vientonorte.io/#/contacto | Conversión / contacto |

## Search Console

**16 ago 2026 — vinculación GA4 creada (humano).**  
Tipo: **prefijo de URL** `https://vientonorte.io/` · property `vientonorte.io`.  
GA4 `G-G7JXJKGCDV` ↔ esa property. Datos orgánicos en GA4 pueden tardar 24–48 h.

1. Property **prefijo** `https://vientonorte.io/` (hecha). Property de **dominio** (DNS) = opcional, cubre http/www.
2. Sitemap: `https://vientonorte.io/sitemap.xml` — enviar en GSC si aún no está.
3. Verificación en repo: `public/google5858e011b32ea566.html`  

## GTM unificado (plan-gtm) — parked post-Test path

1. Crear **un** contenedor GTM (no dos).  
2. FO build: secret/env `VITE_GTM_ID=GTM-XXXX`.  
3. Hub: pegar el mismo ID en meta / `window.__VN_GTM_ID`.  
4. En GTM: variable `Page Hostname` + triggers por path.  
5. dataLayer surface: hub `vn_surface: 'hub'`; FO web `analyticsConfig.surface = 'fo'`.  

**Esta semana:** sin wire GTM live (DS path oferta / usabilidad first).

## HashRouter (diferido — no hacer en este ship)

Rutas `/#/...` limitan SEO de deep links.

**DoD futuro (P3):** BrowserRouter + fallback 404 en GH Pages o Cloudflare redirect rule, sin romper base `/`.

## Links viejos

Canon de reemplazo:

```text
https://vientonorte.github.io/mi-portafolio/     → https://vientonorte.io/
https://vientonorte.github.io/mi-portafolio/#/…  → https://vientonorte.io/#/…
https://vientonorte.io/mi-portafolio/            → https://vientonorte.io/
https://vientonorte.github.io/{app}/             → https://vientonorte.io/{app}/  (si aplica)
```

Actualizar también: Google Ads final URL, Calendar descriptions, PDFs/Figma handoffs, LinkedIn featured.
