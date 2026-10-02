# Demo X|CMS · gate de campaña (Ads / SEO / LinkedIn SEM)

> ⚠ **DEPRECADO como URL de campaña (canon de URLs 2026-10).** Ni `/#/demo/x-cms` ni `…/mi-portafolio/#/demo/x-cms` se mandan a clientes ni se usan como Final URL. `/#/` y `/mi-portafolio/` están en la denylist, y además la UTM quedaba después del hash. El gate sigue documentado abajo **solo como superficie interna o de QA**. Detalle: `docs/AUDITORIA-CANON-DOCS-2026-10.md`.

**Link final para clientes y campañas (canon):**  
`https://vientonorte.io/servicios/?utm_source=…&utm_medium=…&utm_campaign=…#consultoria-ux`  
(X|CMS se muestra en `/servicios/`, bajo el ancla `#consultoria-ux`. La UTM va **antes** del ancla.)

**Gate interno (QA, no enviar a clientes):**  
`https://vientonorte.io/#/demo/x-cms`

**Local:**  
`http://localhost:3000/#/demo/x-cms`

## Por qué no el link crudo a Figma Sites

| Abrir `pouch-growl-….figma.site` directo | Gate en nuestro dominio |
|------------------------------------------|-------------------------|
| Sin timer | 5 min de sesión |
| Sin UTMs en CRM | UTMs en `sessionStorage` + eventos |
| Bounce a Figma (Quality Score / LP) | Mensaje + CTA en `vientonorte.io` |
| Make/editor confunde | Solo iframe Sites; Make oculto |

**Límite técnico:** el iframe de Figma es cross-origin → no podemos bloquear *todos* los comandos internos de Sites. El **reloj, overlay, CTAs y MKT** se aplican en Viento Norte.

## Flujo

```text
(DEPRECADO para campañas: hoy el anuncio va a /servicios/?utm_…#consultoria-ux.
 Flujo interno del gate, solo para QA:)
Ad / LinkedIn / SEO
  → /#/demo/x-cms?utm_source=…&utm_campaign=…   (histórico, no usar como Final URL)
  → Gate (reglas)
  → Iniciar demo → iframe 5:00
  → aviso 1:00 → ended overlay
  → Agenda | Quiero este módulo | Otra sesión
```

## Eventos analytics

| Event | Cuándo |
|-------|--------|
| `demo_x_cms_view` | carga página |
| `demo_x_cms_start` | click iniciar |
| `demo_x_cms_ended` | timeout |
| `demo_x_cms_cta` | schedule / consulting_module |

+ UTMs capturados en `vn_demo_x_cms_utm`.

GTM: `CE · demo_funnel` + `GA4 · demo_funnel` (no evento clave). Receta: `docs/GTM-KICKOFF.md` v5. Import: `docs/gtm/demo-funnel-import.json`.

## URLs de anuncio (ejemplos, canon 2026-10)

```text
# Google Ads
https://vientonorte.io/servicios/?utm_source=google&utm_medium=cpc&utm_campaign=xcms_modulos&utm_content=demo_5m#consultoria-ux

# LinkedIn
https://vientonorte.io/servicios/?utm_source=linkedin&utm_medium=paid_social&utm_campaign=xcms_modulos&utm_content=demo_5m#consultoria-ux
```

Final URL y landing = **`/servicios/` con ancla `#consultoria-ux`** (message match con la tarjeta X|CMS).
Los ejemplos anteriores (`…/mi-portafolio/#/demo/x-cms?utm_…`) quedan **DEPRECADOS**: violan el canon (`/mi-portafolio/`, `/#/` y la UTM después del hash).

## POC

Histórico: “Ver X|CMS en vivo” en `/#/poc/product-onboarding` navegaba a **esta** ruta (no `window.open` Sites). Hoy `/#/poc/product-onboarding` redirige al embudo (ver `docs/URL-CANON-VIENTONORTE.md`). Es una ruta interna: no se enlaza a clientes.

## Config

`src/lib/demo-x-cms-campaign.ts` — `DEMO_X_CMS_DURATION_SEC` (default 300).
