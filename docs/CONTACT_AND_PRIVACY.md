# Contacto y privacidad

Runbook operativo del formulario de contacto, asistente guiado y cumplimiento Ley 21.719 (Chile).

**Última actualización:** julio 2026  
**Estado:** producción — Google Forms (si configurado) → FormSubmit respaldo

---

## Resumen

| Qué ve el visitante | Qué ocurre detrás |
|---------------------|-------------------|
| `contacto@vientonorte.cl` (mailto, footer, contacto) | Alias de marca; no expone Gmail |
| Formulario o asistente con checkbox de consentimiento | POST HTTPS → Google Forms → copia al remitente + notificación al inbox |
| **Gratis · accesibilidad** (Radar freemium) | Si hay `VITE_A11Y_FREE_SCHEDULE_URL` → Google Calendar Appointment Schedule; si no → form prearmado |
| Enlace a `/privacy` | Política bilingüe ES/EN |
| Si todo falla | Toast con fallback `mailto:` |

### Agenda Google · auditoría a11y gratis

1. En [Google Calendar](https://calendar.google.com/calendar/u/0/r/appointment) → **Create** → **Appointment schedule**.
2. Título: `VN · revisión a11y gratis (30 min)` · timezone `America/Santiago` · duración 30 min.
3. Descripción: «Revisión WCAG 2.2 AA de un flujo. Trae URL o captura del flujo.»
4. Copia el **link de reserva** (`calendar.app.google/…`).
5. Secrets de deploy (GitHub → mi-portafolio → Settings → Secrets):

```bash
gh secret set VITE_A11Y_FREE_SCHEDULE_URL -R vientonorte/mi-portafolio -b 'https://calendar.app.google/XXXX'
# opcional partner edu:
# gh secret set VITE_VIDEO_CALL_URL -R vientonorte/mi-portafolio -b 'https://calendar.app.google/YYYY'
```

6. Push a `main` o `workflow_dispatch` del Deploy Pages para bakear la URL en el build.

CTAs cableados: hero consultoría, strip modalidades, path `route/radar-gratis`, banner free en home/auditoría, analytics `generate_lead` + `free_radar_entry_open`.

---

## Arquitectura de envío

```
Navegador (canal principal, si hay secrets de Google Forms)
  └─ Google Forms iframe POST
       ├─ Copia al email del visitante (config en el form)
       └─ Notificación al dueño → gaete.gaona@gmail.com
            (alias público contacto@vientonorte.cl vía Email Routing)
       └─ FormSubmit iframe POST (respaldo si Google Forms falla o no está configurado)
            └─ Worker Cloudflare (respaldo silencioso)
                 └─ mailto:contacto@vientonorte.cl (último recurso en UI)
```

El **front** (formulario + asistente) no cambia; solo el destino del POST.

### Archivos clave

| Archivo | Responsabilidad |
|---------|-----------------|
| `src/lib/site-contact.ts` | Emails públicos, inbox FormSubmit, URL del Worker |
| `src/lib/google-forms-contact.ts` | Config y mapeo de campos → entry IDs |
| `src/lib/submit-contact.ts` | Cadena Google Forms → FormSubmit → Worker → mailto |
| `src/lib/navigate-to-contact.ts` | **API transversal P1** — CTAs abren el asistente (`navigateToContactAssistant`) |
| `src/lib/contact-draft.ts` | Draft en router state (intent-only o mensaje prearmado) |
| `src/components/organisms/Contact.tsx` | Asistente por defecto; formulario clásico como escape hatch |
| `src/components/organisms/ContactAssistant.tsx` | Flujo guiado (intent → detail → compose) |
| `src/lib/contact-draft-storage.ts` | Borrador en `sessionStorage` (nombre, email, mensaje, tab); sin consent |
| `src/components/molecules/ContactConsentField.tsx` | Checkbox + link a privacidad |
| `src/pages/Privacy.tsx` | Política de privacidad (i18n) |
| `src/pages/Contacto.tsx` | Parse `state` + `?intent=`; toast `?sent=1` |
| `worker/src/contact.js` | Relay server-side (backup) |
| `worker/wrangler.contact.toml` | Deploy del Worker sin R2/KV |

### Abrir el asistente desde cualquier CTA

```ts
import { navigateToContactAssistant } from "../lib/navigate-to-contact";

navigateToContactAssistant(navigate, {
  origin: "audit-page",       // analytics
  source: "cta",              // o onboarding | quoter | partner-edu
  intent: "consulting",       // recruiter | consulting | freelance | other
  packageId: "radar",         // opcional
  message: "…",               // si hay mensaje → salta a compose
});
```

- Solo `intent` → `/contacto?intent=…` y wizard en paso **detail**
- `message` + `source: cta` → wizard en **compose** con banner de confirmación

---

## Setup inicial (una vez)

### 1. Google Forms (canal principal recomendado)

Crear el formulario en la cuenta **gaete.gaona@gmail.com** (dueño del form).

#### Campos del formulario

| Campo en Google Forms | Tipo | Mapeo en el sitio |
|----------------------|------|-------------------|
| Nombre | Respuesta corta | `name` |
| Email | Respuesta corta | `email` |
| Mensaje | Párrafo | `message` (+ motivo/canal/idioma concatenados) |
| Motivo (opcional) | Respuesta corta | `intent` |
| Canal (opcional) | Respuesta corta | `assistant` / `form` |
| Idioma (opcional) | Respuesta corta | `es` / `en` |

#### Configuración para copias por email

En **Configuración** del formulario → pestaña **Respuestas**:

1. Activar **Recopilar direcciones de correo electrónico** → **Permitir que los encuestados introduzcan su dirección de correo**.
2. Activar **Enviar a los encuestados una copia de sus respuestas**.
3. Activar **Recibir notificaciones por correo de envíos nuevos** (llega a `gaete.gaona@gmail.com`).

El alias público **contacto@vientonorte.cl** sigue siendo el que muestra el sitio; las notificaciones las recibe Gmail del dueño del form (sección 2 Email Routing).

#### Obtener `entry.XXXXX` y action URL

1. En el formulario: **⋮** → **Obtener enlace prellenado**.
2. Rellena cada campo con un valor **único** (recomendado):
   - Nombre → `test-nombre`
   - Email → `test-email`
   - Mensaje → `test-mensaje`
   - Motivo → `test-motivo` (si existe)
   - Canal → `test-canal` (si existe)
   - Idioma → `test-idioma` (si existe)
3. **Obtener enlace** y ejecuta en el repo:

```bash
./scripts/google-form-env-from-prefill.sh 'PEGAR_URL_PRELLENADA'
```

4. Copia la salida a `.env.local` (dev) o GitHub Secrets (prod), asignando cada `entry.XXX` al nombre correcto.
5. La action URL es: `https://docs.google.com/forms/d/e/FORM_ID/formResponse`.

#### Respuestas en hoja (backup automático)

En el formulario → pestaña **Respuestas** → icono **Google Sheets** → **Crear hoja de cálculo**.  
Cada envío del portfolio queda en la hoja sin código extra.

#### Variables (local + GitHub Secrets)

```bash
VITE_GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/…/formResponse
VITE_GOOGLE_FORM_ENTRY_NAME=entry.…
VITE_GOOGLE_FORM_ENTRY_EMAIL=entry.…
VITE_GOOGLE_FORM_ENTRY_MESSAGE=entry.…
VITE_GOOGLE_FORM_ENTRY_INTENT=entry.…      # opcional
VITE_GOOGLE_FORM_ENTRY_SOURCE=entry.…      # opcional
VITE_GOOGLE_FORM_ENTRY_LANGUAGE=entry.…    # opcional
```

En GitHub: **Settings → Secrets → Actions** → mismos nombres. Tras el push a `main`, el deploy de Pages embebe los IDs en el build.

#### Prueba

1. Envío desde `/#/contacto` (formulario o asistente).
2. Fila nueva en la hoja de respuestas de Google Forms.
3. Email de notificación en `gaete.gaona@gmail.com`.
4. Copia en el inbox del visitante (si activaste el paso 2).

---

### 2. Activar FormSubmit (respaldo)

1. Envía un mensaje de prueba desde [Contacto](https://vientonorte.io/#/contacto).
2. Revisa `gaete.gaona@gmail.com`.
3. Abre el enlace de **activación** que envía FormSubmit (solo la primera vez).
4. Repite el envío de prueba; debe llegar con `Reply-To` del visitante.

### 3. Email Routing (opcional, recomendado)

En Cloudflare → Email Routing (`vientonorte.cl`):

- Destino verificado: `gaete.gaona@gmail.com`
- Alias: `contacto@vientonorte.cl` → reenvío a Gmail

Permite que `mailto:contacto@vientonorte.cl` y el alias público funcionen sin mostrar Gmail en el sitio.

### 4. Worker de respaldo (opcional)

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
| `VITE_GOOGLE_FORM_ACTION_URL` | — | Action URL del Google Form (`…/formResponse`) |
| `VITE_GOOGLE_FORM_ENTRY_*` | — | IDs `entry.XXXXX` por campo |
| `VITE_FORM_SUBMIT_INBOX` | `gaete.gaona@gmail.com` | Inbox FormSubmit (respaldo) |
| `VITE_CONTACT_API_URL` | Worker prod | Override del relay backup |
| `VITE_GA_MEASUREMENT_ID` | — | GA4 (opcional) |
| `VITE_GTM_ID` | — | GTM (opcional) |

Copia `.env.example` → `.env.local` para desarrollo. **No commitear** valores reales.

---

## Privacidad y consentimiento (Ley 21.719)

- Checkbox obligatorio antes de enviar (formulario y asistente). **No** se persiste en `sessionStorage` — el usuario debe reconfirmar en cada envío.
- Borrador de contacto solo en `sessionStorage` (`vn-contact-session-v1`): se borra al cerrar la pestaña; se limpia tras envío exitoso.
- Texto i18n: `contact.form.consent` + enlace `consentPrivacyLink` → `/privacy`.
- Página `/privacy`: sin cookies de tracking; describe Google Forms + respaldo FormSubmit, retención, derechos ARCO y responsable del tratamiento.
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

- [ ] Flujo intent → detail → compose
- [ ] Mensaje generado editable en compose
- [ ] Recargar pestaña restaura borrador; consent sigue desmarcado
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