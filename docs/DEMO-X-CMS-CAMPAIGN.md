# Demo X|CMS · gate de campaña (Ads / SEO / LinkedIn SEM)

**Ruta canónica:**  
`https://vientonorte.io/mi-portafolio/#/demo/x-cms`

**Local:**  
`http://127.0.0.1:5173/mi-portafolio/#/demo/x-cms`

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
Ad / LinkedIn / SEO
  → /#/demo/x-cms?utm_source=…&utm_campaign=…
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

## URLs de anuncio (ejemplos)

```text
# Google Ads
…/mi-portafolio/#/demo/x-cms?utm_source=google&utm_medium=cpc&utm_campaign=xcms_modulos&utm_content=demo_5m

# LinkedIn
…/mi-portafolio/#/demo/x-cms?utm_source=linkedin&utm_medium=paid_social&utm_campaign=xcms_modulos&utm_content=demo_5m
```

Final URL y landing = **misma ruta** (message match).

## POC

“Ver X|CMS en vivo” en `/#/poc/product-onboarding` navega a **esta** ruta (no `window.open` Sites).

## Config

`src/lib/demo-x-cms-campaign.ts` — `DEMO_X_CMS_DURATION_SEC` (default 300).
