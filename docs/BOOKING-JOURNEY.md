# Booking UX · journey map (kick-off)

Marca: **Viento Norte** · superficie: **vientonorte.io** (no “portafolio”).

```
Descubrir → Form (sitio+datos) → Informe WCAG → Calendar ≥48 h → Cita (walkthrough + HD)
```

Gratis = **solo WCAG 2.2 AA de un flujo**. Diagnóstico pago = heurístico a medida.  
Cita = recorrer el informe **y** vender **Herramientas Digitales** (proceso manual → dispositivo propio, 21.719 honesto, monitoreo).

| Paso | Actor | Superficie | Evento | Dato |
|------|-------|------------|--------|------|
| 1. Descubrir | Visitante | Hero / modalidades / `#contacto` | `page_view` | path HashRouter |
| 2. Form 1 min | Visitante | Contacto (nombre, email, tel, sitio) | `generate_lead` `channel=contact_form` | origin, package radar-free |
| 3. Informe | VN + agente | Drive `A11y-Gratis` | (ops) | URL + flujo |
| 4. Agendar ≥48 h | Visitante | Google Appointment (post-envío) | `book_call` | slot; humano: min lead time 48 h en Calendar |
| 5. Cita | VN | Meet | walkthrough + oferta HD | no discovery en blanco |

## Copy de confirmación (canon)

- **Sí:** «Recibimos tu consulta desde **vientonorte.io**. Viento Norte te responde…»
- **No:** «desde el portafolio» / «Te responderé» (voz personal)

## Degradación

Sin URL de Calendar → mismo mensaje freemium en el asistente.  
Sin identidad en sesión → Calendar abre igual; no se inventa un booking anónimo.

## Fuera de este mapa

Crear el evento en Google Calendar por API (Appointment Schedule ya lo hace). D1. MCP `book_call` es el mismo POST.
