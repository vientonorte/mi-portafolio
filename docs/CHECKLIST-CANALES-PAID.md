# Checklist · habilitar canales (share → Ads / IG)

**Decider:** Rö · **Actualizado:** 2026-08-26  
**Lock SEM (canon `/vn-agent`):** (1) Preview Chrome Gratis → `GA4 · generate_lead` en Etiquetas activadas (2) Decider *activar campañas* · un piloto · final `/s/consultoria` · conversión = eventos, no clic de página (3) UTM después del hash + Vite `npm run dev` (4) copy = Diagnóstico / accesibilidad de un flujo · no «Radar» en headline.  
**Loop D:** tags GTM v4 live. Preview **Gratis → `GA4 · generate_lead` Activado 1 vez** (26 ago) · `book_call` PASS 20 ago y 26 ago.  
**SEM landing:** `/#/consultoria` in-app · crawler/paid = `/s/consultoria`. No pagar a `/`.  
**Loop E:** Decider 26 ago *activar campañas*. RSA: vault `Resources/SEM/2026-08-26 RSA piloto a11y.md`. Techo = humano. No publicado en Ads UI hasta que Rö pegue. F sigue parked.  
**Final URL de paid y de bio:** `https://vientonorte.io/s/consultoria`  
**No usar** `/#/auditoria` ni `#/admin` en anuncios.

Evidencia 15 ago: `/s/consultoria` **200** · OG `og-home-1200.png` **1200×630** · secret `VITE_GTM_ID` · **no** `VITE_GA_MEASUREMENT_ID` · #181 merged `1602ed6`. Residual humano: GTM Preview + tags GA4 en el contenedor · LinkedIn/Meta scrape (A).

---

## A · Base (desbloquea share orgánico)

Sin esto, LinkedIn/WA/IG siguen mostrando el isologo 512 o nada.

- [ ] Rebase/merge [PR #172](https://github.com/vientonorte/mi-portafolio/pull/172) (o cherry-pick `feat(share)` + `feat(admin)` a `main`)
- [ ] Pages deploy verde (Actions · Deploy to GitHub Pages)
- [ ] `https://vientonorte.io/s/consultoria` → **200** (HTML con `og:image` 1200×630)
- [ ] `https://vientonorte.io/images/branding/og-consultoria-1200.png` → **200**
- [ ] `https://vientonorte.io/images/branding/og-portfolio.png` → **200** y **1200×630** (no 512)
- [ ] [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) scrapea `/s/consultoria` → card VN (título Consultoría UX + imagen 1200)
- [ ] [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/) scrapea la misma URL → **Scrape Again** hasta ver la card nueva
- [ ] WhatsApp: pega `/s/consultoria` en un chat tuyo → preview correcto

**Canal habilitado al cerrar A:** Share orgánico LinkedIn / WhatsApp.

---

## B · Instagram orgánico (bio → consultoría)

- [ ] A completo
- [ ] Cuenta Instagram **profesional** (Creador o Empresa), no personal
- [ ] Nombre / bio: **Viento Norte** · link **`vientonorte.io/s/consultoria`** (o link in bio a esa URL)
- [ ] Avatar = isologo VN (no foto random)
- [ ] Highlight o story fija con el mismo destino
- [ ] Smoke: abrir el link de la bio en incógnito → llega a consultoría (pack / gratis a11y visible)

**Canal habilitado al cerrar B:** IG orgánico. Todavía **no** Ads.

---

## C · Google Business Profile (Workspace, no es repo)

Misma cuenta Google que GSC / Calendar / Forms.

- [ ] [business.google.com](https://business.google.com/) → crear o reclamar **Viento Norte**
- [ ] Web: `https://vientonorte.io/`
- [ ] Categoría: consultoría de diseño **o** desarrollo de software
- [ ] País/zona Chile · NAP = JSON-LD de `index.html`
- [ ] Teléfono / mail: `contacto@vientonorte.io` (no Gmail público)
- [ ] Reserva: Appointment Schedule 30 min (el de a11y / kickoff)
- [ ] Verificar ficha (mail / video / postcard)
- [ ] No publicar `#/admin` ni `/ops`

**Canal habilitado:** Maps / conocimiento local. No es Ads.

---

## D · Medición (bloquea todo paid)

Código ya emite `generate_lead`, `book_call`, `submit_contact_form`, `page_view`. Falta el contenedor.

- [x] Crear contenedor GTM Web **Viento Norte / vientonorte.io** → `GTM-PM5LBQRP`
- [x] `gh secret set VITE_GTM_ID` (15 ago)
- [ ] `VITE_GA_MEASUREMENT_ID` — **no** (apuesta A: GA4 = tag en GTM)
- [x] Redeploy Pages con el secret ([run 31908951330](https://github.com/vientonorte/mi-portafolio/actions/runs/31908951330) success)
- [x] Bundle live contiene `GTM-PM5LBQRP` (`initGTM` en el SPA)
- [x] `/s/consultoria` view-source contiene `GTM-PM5LBQRP` (sin gtag.js paralelo) · hop #205 merged 22 ago
- [x] Tag GA4 Event `generate_lead` **y** `book_call` en contenedor (v4 · 20 ago)
- [x] GTM Preview Chrome · Agendar → `GA4 · book_call` Activado 1 vez (20 ago)
- [x] GTM Preview · **Gratis · accesibilidad** → `GA4 · generate_lead` Activado 1 vez (26 ago Safari)
- [ ] Receta: `docs/GTM-KICKOFF.md`

**Sin D en verde: Google Ads e IG Ads siguen No.**

---

## E · Google Ads (piloto)

Requiere **A + D** (+ C recomendado).

- [ ] A (share) PASS · scrape LinkedIn/Meta parked
- [x] D (GTM + `generate_lead`) PASS · Preview 26 ago
- [x] Test path FO H4/H5/S2 · firmado 18 ago
- [x] Local: `local-ads-scenarios.sh` 133/133 PASS 26 ago
- [x] Anuncio RSA Diagnóstico / a11y ≠ `/auditoria` · vault `SEM/2026-08-26 RSA piloto a11y.md`
- [x] Final URL = `https://vientonorte.io/s/consultoria/` + UTM `a11y_gratis_pymes`
- [x] UTM: `utm_source=google&utm_medium=cpc&utm_campaign=a11y_gratis_pymes`
- [x] Conversión = `generate_lead` + `book_call` (no clic de página) · importar en Ads UI
- [x] Techo **150.000 CLP / 30 d** (~5.000/día) · mix 100% Search · research 26 ago
- [ ] RSA pegado y piloto **publicado** en Google Ads UI

**Canal habilitado al cerrar E:** Google Ads piloto.

---

## G · LinkedIn Ads (**configurar**, no gastar)

Requiere **A** (scrape). D (GTM) ya PASS. **No** come el techo 150k.

- [ ] A scrape: [Post Inspector](https://www.linkedin.com/post-inspector/) `/s/consultoria` → card 1200
- [ ] Página empresa **Viento Norte** (vault hoy solo perfil personal)
- [ ] Campaign Manager · editor Classic · objective **Website visits**
- [ ] Campaign group + campaign + ad = **PAUSED** (mín. UI ~USD 10/día **sin** ACTIVE)
- [ ] Final URL `https://vientonorte.io/s/consultoria/?utm_source=linkedin&utm_medium=cpc&utm_campaign=a11y_gratis_pymes`
- [ ] Creative `campaigns/2026-08-26-piloto-a11y/assets/ad-1200x628.png` · copy Diagnóstico/a11y · no Radar
- [ ] Insight Tag Partner ID → GTM **LinkedIn Insight 2.0** · trigger All Pages + History Change · **unpublished**
- [ ] Spend CM = **0**

SSOT: vault `Resources/SEM/2026-08-26 LinkedIn config PAUSED.md`.  
**Canal habilitado al cerrar G:** cuenta lista. Pauta LI = mes futuro (≥300k). Este mes **No**.

---

## F · Instagram Ads (Meta)

Requiere **A + B + D**.

- [ ] A + B PASS
- [ ] Meta Business Manager creado (misma marca Viento Norte)
- [ ] IG profesional vinculado al BM
- [ ] Pixel Meta instalado **en el mismo GTM** (no un segundo snippet)
- [ ] Test Events: visita `/s/consultoria` + CTA visible en el pixel
- [ ] Destino del anuncio = `https://vientonorte.io/s/consultoria`
- [ ] Creativo 1080×1080 y/o 1080×1920 (subir por CMS → PR si es OG; stories aparte)
- [ ] No gastar hasta ver evento de lead o Calendar en Events Manager

**Canal habilitado al cerrar F:** Instagram Ads piloto.

---

## Orden (no saltar)

```
A share  →  B IG orgánico
         →  C Google Business
         →  D GTM/GA
              →  E Google Ads (spend 150k)
              →  G LinkedIn Ads (config PAUSED, $0)
              →  F Instagram Ads (parked)
```

CMS: `#/admin/fotos` sube branding y **abre PR** a `public/images/` (Worker live). Merge de ese PR = parte de A.

---

## Estado rápido (26 ago)

| Canal | Checklist | ¿Habilitado? |
|-------|-----------|----------------|
| Share LinkedIn/WA | A | **código live** · scrape humano **parked** |
| IG orgánico | A+B | No · parked |
| Google Business | C | No · parked |
| GTM / medición | D | Preview Gratis **PASS** 26 ago |
| Google Ads | A+D+E | RSA **armado** · *activar campañas* dicha · **no** publicado en UI · techo humano |
| LinkedIn Ads | A+G | **config 27 ago** · PAUSED · $0 · no mix 150k |
| Instagram Ads | A+B+D+F | **PARKED** · $0 |
| Google SEO / GSC | — | verify+sitemap 03 ago · **inspección `/s/consultoria` 27 ago** |

Pegar RSA: vault `Resources/SEM/2026-08-26 RSA piloto a11y.md`. Copy: Diagnóstico / a11y, no Radar.
