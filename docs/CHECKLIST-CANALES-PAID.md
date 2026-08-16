# Checklist · habilitar canales (share → Ads / IG)

**Decider:** Rö · **Actualizado:** 2026-08-15  
**Loop D:** `page_view` live (T4 PASS). Faltan tags GTM `generate_lead` / `book_call` (v3 humano).  
**SEM landing:** `/#/consultoria` = funnel 3 packs + OB (`#184` `f022f2c`). No pagar a `/`.  
**Loop E→F: PARKED** hasta que Rö diga *activar campañas*. No Ads, no IG Ads, no spend.  
**Regla:** no gastar en Ads/IG hasta la sección **E** y **F** en verde **y** el Decider reactive ese loop.  
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
- [x] `/s/consultoria` view-source contiene `gtag/js?id=G-G7JXJKGCDV` (cobertura Etiqueta de Google; no GTM en esa hop)
- [ ] GTM Preview: click agenda o form → evento `generate_lead` o `book_call`
- [ ] Tag GA4 Event (o Ads conversion) escuchando esos custom events
- [ ] Receta: `docs/GTM-KICKOFF.md`

**Sin D en verde: Google Ads e IG Ads siguen No.**

---

## E · Google Ads (piloto)

Requiere **A + D** (+ C recomendado).

- [ ] A (share) PASS
- [ ] D (GTM + `generate_lead`) PASS
- [ ] Test path FO en `/ops` — H4 Empezar in-page, H5 Calendar &lt;30s, S2 SEM
- [ ] Local: `npm run dev` + `bash ~/.grok/skills/google-ads-vn/scripts/local-ads-scenarios.sh http://127.0.0.1:5173`
- [ ] Anuncio: “revisión gratis de un flujo / accesibilidad” **≠** mentoría /auditoria
- [ ] Final URL = `https://vientonorte.io/s/consultoria`
- [ ] UTM: `utm_source=google&utm_medium=cpc&utm_campaign=a11y_gratis_pymes`
- [ ] Conversión en Ads = el tag de `generate_lead` o Calendar (no “clic en página”)
- [ ] Techo de prueba bajo, Decider Rö; **no** inventar CPC

**Canal habilitado al cerrar E:** Google Ads piloto.

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
              →  E Google Ads
              →  F Instagram Ads
```

CMS: `#/admin/fotos` sube branding y **abre PR** a `public/images/` (Worker live). Merge de ese PR = parte de A.

---

## Estado rápido (13 ago)

| Canal | Checklist | ¿Habilitado? |
|-------|-----------|----------------|
| Share LinkedIn/WA | A | **código live** · scrape humano **parked** |
| IG orgánico | A+B | No · parked |
| Google Business | C | No · parked |
| GTM / medición | D | **PARKED** (bloquea E/F) |
| Google Ads | A+D+E | **PARKED** · $0 |
| Instagram Ads | A+B+D+F | **PARKED** · $0 |

Reactivar: frase Decider **«activar campañas»** → primero D (GTM), después E/F. Hasta entonces este archivo no es trabajo de FO.
