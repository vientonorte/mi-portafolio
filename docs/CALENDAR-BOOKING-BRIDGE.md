# Puente Calendar → Worker (kickoff /ads/auditoria-accesibilidad)

**Contexto:** el CTA de `LandingAuditoria.tsx` registra el *click* de agenda
en `POST /api/booking` (`recordBookingIntent`, ver `src/lib/free-radar-entry.ts`)
antes de abrir Google Calendar. En ese momento normalmente no hay `email` real
(no hay formulario previo en este funnel aislado), así que el Worker no envía
el mail de confirmación (`handleCreateBooking` solo llama `notifyVisitor`
cuando `email` es válido).

Para que el prospecto reciba **el mail de kickoff con el guion de los 30 min**
(no solo el mail genérico de Google Calendar), un Google Apps Script atado al
Calendar de agenda (Appointment Schedule) debe reenviar el evento confirmado —
con el email real del asistente — al mismo endpoint.

## Payload esperado

```
POST https://contact.vientonorte.io/api/booking
Content-Type: application/json
X-VN-BOOKING-KEY: <VN_BOOKING_WEBHOOK_KEY>   # obligatorio (H1, falla cerrado)

{
  "name": "Nombre del asistente",
  "email": "asistente@empresa.cl",
  "startAt": "2026-09-08T15:00:00-04:00",
  "eventId": "abc123@google.com",
  "htmlLink": "https://calendar.google.com/event?eid=...",
  "origin": "ads-a11y-landing",
  "intent": "kickoff"
}
```

`origin: "ads-a11y-landing"` es lo que hace que `handleCreateBooking` use la
plantilla `buildKickoffBookingConfirmation` (worker/src/lib/email-templates.js)
en vez del mail genérico de agenda.

`eventId` es la señal de que el request viene del puente (no de un click en el
front, que no lo envía). Desde H1 (seguridad 2026-10-02):

- `eventId` debe tener formato de id de Google Calendar (`[a-v0-9]{5,200}`,
  opcional `_YYYYMMDD[THHMMSSZ]` de instancia recurrente y/o `@google.com`);
  si no, `400` sin correo.
- Todo request con `eventId` **debe** incluir `X-VN-BOOKING-KEY` igual a
  `env.VN_BOOKING_WEBHOOK_KEY`. Si el secreto no está configurado, el Worker
  responde `401` (falla cerrado) y no manda confirmación.
- `htmlLink` solo se usa si es `https://` de `calendar.google.com`,
  `www.google.com/calendar/…`, `calendar.app.google` o el host de
  `CALENDAR_BOOKING_URL`; si no, se usa `CALENDAR_BOOKING_URL`.
- La confirmación al lead solo sale en este caso (booking verificado). Un click
  del front sin `eventId` nunca manda correo a la dirección del request.

## Apps Script (pegar en script.google.com, atado al Calendar de agenda)

```js
// Trigger: onCalendarEventUpdated / instalar disparador "Al crearse un evento"
// sobre el calendario del Appointment Schedule usado por
// VITE_A11Y_FREE_SCHEDULE_URL.
const WORKER_URL = 'https://contact.vientonorte.io/api/booking';
const BOOKING_KEY = PropertiesService.getScriptProperties().getProperty('VN_BOOKING_WEBHOOK_KEY');

function onCalendarEventCreated(e) {
  const calendarId = e.calendarId;
  const event = Calendar.Events.get(calendarId, e.calendarEventId);
  const guest = (event.attendees || []).find((a) => !a.organizer);
  if (!guest || !guest.email) return; // sin invitado real, no dispara mail propio

  const payload = {
    name: guest.displayName || guest.email,
    email: guest.email,
    startAt: event.start.dateTime || event.start.date,
    eventId: event.id,
    htmlLink: event.htmlLink,
    origin: 'ads-a11y-landing',
    intent: 'kickoff',
  };

  UrlFetchApp.fetch(WORKER_URL, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    headers: BOOKING_KEY ? { 'X-VN-BOOKING-KEY': BOOKING_KEY } : {},
    muteHttpExceptions: true,
  });
}
```

Guardar el secreto en Apps Script: **Project Settings → Script properties**
→ `VN_BOOKING_WEBHOOK_KEY` (mismo valor que el secret del Worker).

## Aprovisionar el secreto del Worker

```bash
cd worker
npx wrangler secret put VN_BOOKING_WEBHOOK_KEY
npx wrangler deploy
```

Sin el secreto configurado, el Worker rechaza (`401`) todo request con
`eventId` — ver `isTrustedBookingWebhook` en `worker/src/api/public.js`.

## Qué no cambia

- El mail nativo de Google Calendar al confirmar la cita se sigue enviando
  igual (fuera del control de VN) — este puente **complementa**, no reemplaza.
- El registro de *click* del front (`recordBookingIntent`, sin `eventId`)
  sigue registrando el booking y avisando al inbox de VN; no requiere el
  header, pero ya no envía correo al visitante.
