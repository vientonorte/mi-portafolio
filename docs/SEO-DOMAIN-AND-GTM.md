# SEO dominio + GTM · mi-portafolio

**Live canon:** https://vientonorte.io/mi-portafolio/  
**Hub:** https://vientonorte.io/  
**Sitemap app:** `/mi-portafolio/sitemap.xml` (public/)  
**robots app:** `/mi-portafolio/robots.txt`  

## Jerarquía de oferta (baseline)

| Prioridad | URL | Rol |
|-----------|-----|-----|
| 1 | `/mi-portafolio/` | Casos + marca personal/profesional |
| 2 | `/#/consultoria` | Embudos packs + free a11y + onboarding |
| 3 | `/#/contacto` | Conversión |
| 4 | `https://vientonorte.io/` | Índice de productos live |

## Search Console

Ver guía hub: `vientonorte.github.io/docs/SEO-AND-SEARCH-CONSOLE.md`

1. Property dominio `vientonorte.io`  
2. Sitemap principal: `https://vientonorte.io/sitemap.xml`  
3. Opcional: también `https://vientonorte.io/mi-portafolio/sitemap.xml`  

## GTM unificado (plan-gtm)

1. Crear **un** contenedor GTM (no dos).  
2. Portafolio build: secret/env `VITE_GTM_ID=GTM-XXXX`.  
3. Hub: pegar el mismo ID en `<meta id="vn-gtm-meta" name="vn-gtm" content="GTM-XXXX">` o `window.__VN_GTM_ID`.  
4. En GTM: variable `Page Hostname` + triggers por path.  
5. dataLayer surface: hub script envía `vn_surface: 'hub'`; portafolio usa `analyticsConfig.surface = 'portafolio'`.

## HashRouter (diferido — no hacer en este ship)

Rutas `/#/...` limitan SEO de deep links.

**DoD futuro (P3):** BrowserRouter + fallback 404 en GH Pages o Cloudflare redirect rule, sin romper base `/mi-portafolio/`.

## Links viejos github.io

Canon de reemplazo:

```text
https://vientonorte.github.io/          → https://vientonorte.io/
https://vientonorte.github.io/mi-portafolio/ → https://vientonorte.io/mi-portafolio/
https://vientonorte.github.io/{app}/    → https://vientonorte.io/{app}/
```

Actualizar también: Google Ads final URL, Calendar descriptions, PDFs/Figma handoffs, LinkedIn featured.
