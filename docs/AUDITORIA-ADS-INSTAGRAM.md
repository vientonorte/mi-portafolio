# Auditoría · ¿cuándo salir a Google Ads e Instagram?

**Fecha:** 2026-08-13  
**Decider:** Rö  
**Regla:** no inventar CPC/CTR/presupuesto. Gate SEM $0 hasta Test path + medición.

## Evidencia de plataforma (hoy)

| Pieza | Estado | Evidencia |
|-------|--------|-----------|
| Search Console | Sí (archivo de verificación en `public/`) | Workspace |
| Calendar Appointment | Sí | `VITE_A11Y_FREE_SCHEDULE_URL` en build |
| Google Forms contacto | Sí | secrets de form en GH |
| GTM / GA4 en HTML live | **No** | `vientonorte.io` no carga `gtm.js`; no hay `VITE_GTM_ID` en secrets |
| dataLayer en código | Sí | `generate_lead`, `book_call`, `submit_contact_form`, `page_view` |
| OG share 1200×630 | Código listo | `og-portfolio.png` + `og-consultoria-1200.png` · `/s/` · `/s/consultoria` |
| Hash `#/consultoria` como share | Insuficiente | Crawlers no leen Helmet |
| Google Business Profile | **No en repo** | Ficha Maps; se reclama en business.google.com con Workspace |
| Pixel Meta / IG Business API | **No** | — |
| Matrix local ≥100 checks ads | **Sin evidencia este turno** | Vite local no corrido aquí |
| DS Test path FO | Abierto en `/ops` | `now-hu-vn-test-path` |

## Google Business (qué hacer con Workspace)

No se “mete en el repo”. Con la **misma cuenta Google**:

1. [business.google.com](https://business.google.com/) → crear/reclamar **Viento Norte**.
2. Web: `https://vientonorte.io/` · categoría: consultoría de diseño / desarrollo de software.
3. NAP idéntico al JSON-LD de `index.html`.
4. Zona Chile. Verificar (mail/video/postcard).
5. Link de reserva = Calendar 30 min (el que ya usas).
6. No pegar `#/admin` ni URLs de ops.

Sirve para Maps y señal de marca. **No sustituye** GTM ni Ads.

## Google Ads — ¿salimos?

| Criterio | ¿Listo? |
|----------|---------|
| Landing SEM `/#/consultoria` o share `/s/consultoria` | Casi (tras deploy Pages del OG) |
| Message match “gratis a11y” ≠ `/auditoria` | Código sí |
| Conversión medible (GTM + `generate_lead`) | **No** |
| Test DS path firmado | **No** (ops) |
| GBP | **No** (humano) |
| Matrix local ads | **NO DATO este turno** |

**Salida Ads: aún no.** Mínimo para un piloto $ bajo:

1. Pages con OG + `/s/consultoria` live + debugger verde.  
2. `VITE_GTM_ID` + tag `generate_lead` / `book_call` visto en Preview.  
3. Test path H4/H5/S2 pass (humano en `/ops`).  
4. Final URL de anuncio = **`https://vientonorte.io/s/consultoria`** (no solo el hash).  
5. UTM: `utm_source=google&utm_medium=cpc&utm_campaign=a11y_gratis_pymes`.

Sin GTM estás ciego: no hay Quality Score fiable ni conversión.

## Instagram Business + Instagram Ads

| Criterio | ¿Listo? |
|----------|---------|
| Cuenta IG profesional / Meta Business Manager | **NO DATO** (fuera del repo) |
| Pixel Meta | **No** (entra por GTM cuando exista) |
| Creative 1080² / 1080×1920 | No hay set en CMS |
| Landing de share con OG | Código listo (`/s/consultoria`) |
| Política: no vender sin lead medible | Gate $0 |

**Salida IG Ads: no.** Orden:

1. IG → cuenta profesional → vincular Meta Business (acción humana).  
2. Mismo GTM + pixel Meta (un contenedor).  
3. Destino de anuncio = `/s/consultoria`.  
4. Bio / Business = `vientonorte.io` (home) + highlight a consultoría.  
5. No gastar hasta ver `generate_lead` o Calendar en el debugger de eventos.

Instagram orgánico (bio + stories con `/s/consultoria`) **sí** se puede en cuanto el OG esté en prod — no requiere pixel.

## Resumen Decider

| Canal | ¿Ahora? | Bloqueo |
|-------|---------|---------|
| Share orgánico LinkedIn/WhatsApp | Tras deploy Pages + debugger | Cache crawler |
| Google Business | Hoy (humano, Workspace) | No es código |
| IG orgánico | Tras OG live | Ficha + bio |
| Google Ads | **No** | GTM + Test path + debugger |
| Instagram Ads | **No** | Meta BM + pixel + GTM |

*Sin evidencia local de matrix 100 en este turno — no firmo spend.*
