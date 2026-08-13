# Booking UX · journey map (kick-off)

Marca: **Viento Norte** · superficie: **vientonorte.io** (no “portafolio”).

```
Descubrir → Decidir → Agendar → Confirmar → Follow-up
   web         pack      Calendar      Google + mail     Admin / call
```

| Paso | Actor | Superficie | Evento | Dato |
|------|-------|------------|--------|------|
| 1. Descubrir | Visitante | Hero / modalidades / `#contacto` | `page_view` | path HashRouter |
| 2. Decidir 30 min | Visitante | CTA «Abrir agenda» o form | `generate_lead` (`channel=google_calendar` o `contact_form`) | origin, package |
| 3. Agendar | Visitante | Google Appointment Schedule | `book_call` | origin; si hay nombre+email de sesión → `POST /api/booking` |
| 4a. Confirmar Calendar | Google | Mail de Calendar al visitante | (fuera de VN) | slot |
| 4b. Confirmar web | Worker | Mail VN si usó el form | `submit_contact_form` | lead en KV |
| 5. Follow-up | VN | `#/admin` Bookings / Leads | PATCH estado | nuevo → contactado |

## Copy de confirmación (canon)

- **Sí:** «Recibimos tu consulta desde **vientonorte.io**. Viento Norte te responde…»
- **No:** «desde el portafolio» / «Te responderé» (voz personal)

## Degradación

Sin URL de Calendar → mismo mensaje freemium en el asistente.  
Sin identidad en sesión → Calendar abre igual; no se inventa un booking anónimo.

## Fuera de este mapa

Crear el evento en Google Calendar por API (Appointment Schedule ya lo hace). D1. MCP `book_call` es el mismo POST.
