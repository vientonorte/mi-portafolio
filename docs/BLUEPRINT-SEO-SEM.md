# Blueprint SEO + SEM · Viento Norte

**Decide 15 ago:** `/#/consultoria` se **queda** y es el funnel de conversión (3 packs + OB).  
**Decide 14 sep:** `/s/` no es producto. Orgánico = `/servicios/*`. `/s/consultoria` = piloto Ads (200).  
No deprecar el hash. No pagar a `/`. No hoppear el piloto.

Vault (misma decisión): `Viento Norte/Resources/SEM/2026-08-15 BLUEPRINT SEO-SEM.md`

## Superficies

| Superficie | URL | Job |
|------------|-----|-----|
| **UI / producto** | `/#/consultoria` | Packs + `#consultoria-onboarding` + Calendar |
| **Orgánico** | `/servicios/*` | Keywords HTTP, sin `/s/` |
| Piloto Ads (no producto) | `/s/consultoria` | OG 1200×630 · final URL campañas · no IA |
| Tour módulos | `/#/consultoria/modulos/:id` | Craft / deep link |
| Home | `/` | Marca · mismo funnel · no final paid |
| Admin / ops | `#/admin` · `/ops/` | Nunca en ads |

## Checklist SEO

`bash ~/.grok/skills/seo-vn/scripts/local-onboarding-smoke.sh http://127.0.0.1:5173`

| # | Check |
|---|--------|
| S1 | Title/description SEM (`t.seo.pages.consultoria`) |
| S2 | Canonical `#/consultoria` |
| S3 | piloto `/s/consultoria` 200 + og 1200×630 (no hop) |
| S4 | Free CTA ≠ `/#/auditoria` |
| S5 | Crawler orgánico = `/servicios/*` (Helmet no cuenta). Piloto `/s/` leftover |

## Checklist SEM

`$0` hasta Decider *activar campañas*.

| # | Check |
|---|--------|
| D1 | SPA + `/s/consultoria`: GTM `GTM-PM5LBQRP` (sin gtag paralelo) · `page_view` |
| D2 | Tag evento `generate_lead` + `book_call` (GTM v3 · humano) |
| D3 | Evento clave GA4 |
| D4 | Filtro IP `casa-vn` Activo |
| D5 | Campo `pack` en Calendar Appointment |
| D6 | `?pack=radar\|marco\|ops` en SEM + Calendar URL |
| D7 | Final URL Ads = `/#/consultoria` (`/s/` deprecado) |
| D8 | Copy ad = Diagnóstico / a11y · no “Radar” |

## Receta GTM v3

Ver `docs/GTM-KICKOFF.md` §2. Activador Custom Event = nombre del `dataLayer.event`.
