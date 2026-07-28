# Consultoría MVP · alcance POC → landing real

**Fecha:** 2026-07-28  
**Objetivo:** el tour de oferta (antes `/poc/product-onboarding`) es la **landing real** de consultoría Viento Norte. Sin deuda de rutas ni analytics nuevos esta semana.

## Alineación roadmap MVP

| Capa | Rol en el MVP | Medible sin GA live |
|------|----------------|---------------------|
| **Oferta (story)** | Claim + módulos-producto + devices X\|CMS | Path `/consultoria` · CTAs |
| **Embudo (conversión)** | Hero → modalidades → onboarding → #contacto + Calendar a11y | Path `/consultoria/embudo` · form / schedule |
| **Demo campaña** | Ads/SEO gate X\|CMS | Path `/demo/x-cms` |
| **Park** | GA / GTM live / core API | Explicitamente fuera de semana ship |

Flujo canónico (empresa FO):

```
Ads SEM → /#/consultoria     (story tour · módulos)
              ↓ Empezar
Home embudo → /              (packs → kickoff → Calendar / contacto)
Dock / orgánico → /          (home = embudo)
Demo campaña → /#/demo/x-cms
```

## URLs canónicas (HashRouter · root `.io`)

| Path | Superficie | Live |
|------|------------|------|
| `/` | **Home = embudo FO** | https://vientonorte.io/ |
| `/consultoria` | **Landing SEM** (tour) | https://vientonorte.io/#/consultoria |
| `/consultoria/modulos/:moduleId` | Deep link módulo SEM | … |
| `/consultoria/embudo` | **Legacy** → `/` | redirect |
| `/demo/x-cms` | Demo campaña | https://vientonorte.io/#/demo/x-cms |
| `/poc/product-onboarding` | Legacy → SEM | redirect |
| `/proceso` | Macros de método | https://vientonorte.io/#/proceso |

**Local:** home `http://127.0.0.1:5173/#/` · SEM `…/#/consultoria`

Helpers: `ROUTES.consulting`, `ROUTES.consultingFunnel`, `ROUTES.consultingModule(id)`, `isConsultingOfferPath`, `isConsultingFunnelPath`.

## Dentro de alcance (ship)

1. Rutas + redirects legacy  
2. Tour como landing: SEO indexable, CTAs → embudo / Calendar / demo  
3. Nav: dock “Consultoría” → oferta; embudo conserva kickoff  
4. Deep link módulos sin duplicar página  
5. Tests nav + smoke paths  

## Fuera de alcance (esta semana)

- Analytics / GTM live  
- Reescribir copy del embudo largo  
- Merge forzado de #130 sin Decide Rö  
- Nuevas SaaS / core financing API  

## DoD Test (usabilidad)

- [ ] Dock → `/consultoria` muestra tour + devices reales  
- [ ] CTA “Empezar” → `/consultoria/embudo`  
- [ ] `/poc/product-onboarding` redirige a `/consultoria`  
- [ ] Calendar free a11y sigue en embudo  
- [ ] `/demo/x-cms` no rompe  

## Criterio de deuda cero

- Una fuente de rutas: `src/lib/routes.ts`  
- Sin segunda “landing consultoría” huérfana  
- Legacy solo vía `<Navigate replace>`  
- Superficies separadas (oferta vs embudo) para medir después sin re-arquitectura  
