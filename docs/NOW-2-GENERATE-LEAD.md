# now-2 · Lead path v0 + `generate_lead`

**Sprint:** `sprint-2026-07-27-ops-loops`  
**Canvas:** `now-2` · roadmap `p2-generate-lead`  
**Live:** https://vientonorte.io/

## Qué es

Evento de conversión freemium a11y (y submit de contacto free):

| Campo | Valor típico |
|-------|----------------|
| `event` | `generate_lead` |
| `lead_type` | `free_a11y` |
| `channel` | `google_calendar` \| `contact_form` \| form channel |
| `origin` | hero-path, consultoria-hero, packages, contact_assistant… |
| `package_id` | `radar` |
| `freemium` | `true` |

## Dónde se dispara

1. **`openFreeRadarEntry`** (`src/lib/free-radar-entry.ts`)  
   - CTAs gratis a11y (hero, consultoría, packages, featured path, auditoría banner)  
   - Canales: Calendar schedule **o** form prearmado  
2. **`ContactAssistant` submit OK** si el mensaje/pack es free a11y  

## Transporte analytics

`trackEvent` → **dataLayer.push** (+ `gtag` si existe).  
Sin GTM/GA configurado, en DEV se loguea; en prod el dataLayer queda listo para el contenedor único.

## DoD now-2 (v0)

- [x] Evento `generate_lead` en código  
- [x] Unit tests (free-radar + dataLayer)  
- [x] dataLayer dual-write (GTM-ready)  
- [ ] Smoke manual: abrir free CTA en `/#/consultoria/embudo` → DevTools → `dataLayer` contiene `generate_lead`  
- [ ] GTM/GA4 tag que escuche `event = generate_lead` (plan-gtm; requiere `VITE_GTM_ID`)  
- [ ] Lead e2e Google (Calendar/Task) ya en `p2-lead-e2e` done — no rehacer  

## Smoke manual (ops)

```text
1. https://vientonorte.io/#/consultoria/embudo
2. Clic "Gratis · accesibilidad" / free CTA
3. Console: window.dataLayer.filter(e => e.event === 'generate_lead')
4. O form contacto free → submit → mismo evento
```

## Fuera de alcance v0

- R2 / admin fotos  
- HashRouter migration  
- Workspace envío SMTP  
