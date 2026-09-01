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
X-VN-BOOKING-KEY: <VN_BOOKING_WEBHOOK_KEY>   # si el secreto está aprovisionado

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
front, que no lo envía). Si `env.VN_BOOKING_WEBHOOK_KEY` está configurado como
secret del Worker, todo request con `eventId` **debe** incluir el header
`X-VN-BOOKING-KEY` con ese valor o el Worker responde `401`.

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

Mientras el secreto no esté configurado, el Worker acepta cualquier request
con `eventId` (comportamiento actual, sin romper nada) — ver
`isTrustedBookingWebhook` en `worker/src/api/public.js`.

## Qué no cambia

- El mail nativo de Google Calendar al confirmar la cita se sigue enviando
  igual (fuera del control de VN) — este puente **complementa**, no reemplaza.
- El registro de *click* del front (`recordBookingIntent`, sin `eventId`)
  sigue funcionando exactamente igual y no requiere el header.
