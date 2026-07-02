# Contacto y privacidad

Runbook operativo del formulario de contacto, asistente guiado y cumplimiento Ley 21.719 (Chile).

**Última actualización:** julio 2026  
**Estado:** producción — FormSubmit activo en navegador

---

## Resumen

| Qué ve el visitante | Qué ocurre detrás |
|---------------------|-------------------|
| `contacto@vientonorte.cl` (mailto, footer, contacto) | Alias de marca; no expone Gmail |
| Formulario o asistente con checkbox de consentimiento | POST HTTPS → FormSubmit → Gmail |
| Enlace a `/privacy` | Política bilingüe ES/EN |
| Si todo falla | Toast con fallback `mailto:` |

---

## Arquitectura de envío

```
Navegador (canal principal)
  └─ FormSubmit iframe POST → gaete.gaona@gmail.com
       └─ Worker Cloudflare (respaldo silencioso, solo si FormSubmit falla)
            └─ mailto:contacto@vientonorte.cl (último recurso en UI)
```

**Opción A (actual):** no requiere migrar `vientonorte.cl` a Cloudflare. El Worker corre desplegado pero el envío real lo hace el navegador vía FormSubmit.

### Archivos clave

| Archivo | Responsabilidad |
|---------|-----------------|
| `src/lib/site-contact.ts` | Emails públicos, inbox FormSubmit, URL del Worker |
| `src/lib/submit-contact.ts` | Cadena FormSubmit → Worker → mailto |
| `src/components/organisms/Contact.tsx` | Tabs: asistente + formulario directo |
| `src/components/organisms/ContactAssistant.tsx` | Flujo guiado en 4 pasos |
| `src/components/molecules/ContactConsentField.tsx` | Checkbox + link a privacidad |
| `src/pages/Privacy.tsx` | Política de privacidad (i18n) |
| `src/pages/Contacto.tsx` | Toast `?sent=1` tras redirect FormSubmit |
| `worker/src/contact.js` | Relay server-side (backup) |
| `worker/wrangler.contact.toml` | Deploy del Worker sin R2/KV |

---

## Setup inicial (una vez)

### 1. Activar FormSubmit

1. Envía un mensaje de prueba desde [Contacto](https://vientonorte.github.io/mi-portafolio/#/contacto).
2. Revisa `gaete.gaona@gmail.com`.
3. Abre el enlace de **activación** que envía FormSubmit (solo la primera vez).
4. Repite el envío de prueba; debe llegar con `Reply-To` del visitante.

### 2. Email Routing (opcional, recomendado)

En Cloudflare → Email Routing (`vientonorte.cl`):

- Destino verificado: `gaete.gaona@gmail.com`
- Alias: `contacto@vientonorte.cl` → reenvío a Gmail

Permite que `mailto:contacto@vientonorte.cl` y el alias público funcionen sin mostrar Gmail en el sitio.

### 3. Worker de respaldo (opcional)

```bash
cd worker
npm install
npm run deploy:contact
```

URL: `https://mi-portafolio-contact.vientonorte.workers.dev/api/contact`

Email Sending desde `contacto@vientonorte.cl` **solo** funciona si la zona `vientonorte.cl` está en la cuenta Cloudflare. Sin eso, el Worker intenta FormSubmit server-side (puede recibir 429); no afecta al canal principal del navegador.

Ver detalle en [`worker/README.md`](../worker/README.md).

---

## Variables de entorno (Vite)

| Variable | Default | Uso |
|----------|---------|-----|
| `VITE_FORM_SUBMIT_INBOX` | `gaete.gaona@gmail.com` | Inbox FormSubmit (no se muestra en UI) |
| `VITE_CONTACT_API_URL` | Worker prod | Override del relay backup |
| `VITE_GA_MEASUREMENT_ID` | — | GA4 (opcional) |
| `VITE_GTM_ID` | — | GTM (opcional) |

Copia `.env.example` → `.env.local` para desarrollo. **No commitear** valores reales.

---

## Privacidad y consentimiento (Ley 21.719)

- Checkbox obligatorio antes de enviar (formulario y asistente).
- Texto i18n: `contact.form.consent` + enlace `consentPrivacyLink` → `/privacy`.
- Página `/privacy`: sin cookies de tracking; describe FormSubmit, retención, derechos ARCO y responsable del tratamiento.
- Traducciones en `src/lib/i18n.ts` → `privacyPage` (ES/EN).

### Cambiar copy legal

1. Editar `privacyPage` en `src/lib/i18n.ts` (ambos idiomas).
2. Actualizar fecha en `updated`.
3. Verificar enlaces en `ContactConsentField` y footer.

---

## QA manual

### Formulario directo

- [ ] Sin consentimiento → error de validación
- [ ] Campos inválidos → mensajes i18n
- [ ] Envío OK → toast de éxito; email en Gmail
- [ ] Redirect FormSubmit → `/#/contacto?sent=1` muestra toast

### Asistente guiado

- [ ] Flujo intent → detail → contact → review
- [ ] Mensaje generado editable en review
- [ ] Consentimiento requerido
- [ ] Envío OK → toast `assistant.success`

### Fallback

- [ ] Con FormSubmit bloqueado → toast mailto con acción

### Privacidad

- [ ] `/privacy` carga en ES y EN según idioma
- [ ] `noIndex` en SEOHead
- [ ] Link desde checkbox y footer

---

## Troubleshooting

| Síntoma | Causa probable | Acción |
|---------|----------------|--------|
| "No se pudo enviar…" + mailto | FormSubmit no activado | Activar enlace en Gmail |
| Email no llega | Inbox incorrecto | Revisar `FORM_SUBMIT_INBOX` / secret Worker |
| Worker 429 | FormSubmit rate-limit desde IP CF | Normal; el navegador es el canal real |
| `opts` TS error en carousel | Shim embla sin default export | `src/types/versioned-modules.d.ts` |
| Consent no valida | Checkbox no marcado | Esperado; cumplimiento Ley 21.719 |

---

## Deploy

**Sitio (GitHub Pages):** push a `main` → workflow `deploy.yml`.

**Worker contacto:**

```bash
cd worker && npm run deploy:contact
```

No usar `wrangler deploy` completo sin R2/KV configurados (ver `worker/README.md`).