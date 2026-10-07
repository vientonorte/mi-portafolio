# SOLID · Viento Norte (FO)

> ⚠ **Canon de URLs vigente (2026-10), prevalece sobre este doc.** El link final para clientes es `https://vientonorte.io/servicios/?<utm>`, con ancla opcional `#web-pymes`, `#revision-gratis` o `#consultoria-ux` (la UTM va antes del ancla). También valen las páginas de rubro publicadas. **No se envían a clientes:** `/s/` (salvo `/s/polijuego-privacy/`), `/#/`, `/news/`, `/qa/`, `/mi-portafolio/` ni los slugs viejos de `/servicios/`. El dev local es `http://localhost:3000/` (5173 está obsoleto). Prod se sirve con GitHub Pages en `vientonorte.io` (`vientonorte.github.io` ya no es la URL pública). Las rutas `/#/…` que quedan abajo son superficies internas o de QA, o registro histórico. Detalle: `docs/AUDITORIA-CANON-DOCS-2026-10.md`.

Programa, no un refactor de un PR. **Decider:** Rö.  
**Superficie:** este repo (FO + worker contact).  
**Fuera:** `src/imports/*`, Contra-Archivo, Ads/GTM spend, wrangler auto-deploy, rewrite de skills `*-vn`.

## Lectura VN

| | Motivo de cambio | Dónde duele |
|-|------------------|-------------|
| **S** | Un módulo, un motivo | `locales/es.ts` ~1655 · `ContactAssistant.tsx` · `PocProductOnboarding` · `projects-data.ts` |
| **O** | Nueva ficha de servicio sin tocar `App.tsx` | HTML `public/servicios/<slug>/` · worker no lista cada landing |
| **L** | `default` / `consulting` / `freeA11y` sustituibles | Free a11y **nunca** `/auditoria` |
| **I** | UI no importa el Worker entero | Contacto = puerto `submit-contact` |
| **D** | UI → puertos (`submitContact`, `analytics`, `seo`) | `vn-core/analytics` es el patrón; no duplicar `lib/analytics.ts` |

**URLs:** producto Hash `#/consultoria` · orgánico `/servicios/*` (sin `/s/`) · piloto Ads `/s/consultoria` (200, no hop, no IA).

## PRs

0. Este doc. Cero copy live.  
1. Contact ports + test free ≠ mentoría.  
2. Split i18n por superficie (`seo`, `consultoria`, `servicios`, `a11y-free`, `nav`) + barrel.  
3. Registry landings + sitemap desde datos.  
4. Onboarding split (P1).  
5. DIP `vn-core` (P2).

Cada PR: tests del archivo + `seo-p0-crawler` + smoke local ≥100. **No wrangler.** Branch desde `main`, no mezclar `fix/qa-hash-ui`.

## DoD del programa

- Un puerto de submit; free ≠ mentoría.  
- Ningún locale > ~400 líneas.  
- Nueva ficha = 1 registry + 1 HTML, sin `App.tsx`.  
- Tesis/CA/15 figs intocados.
