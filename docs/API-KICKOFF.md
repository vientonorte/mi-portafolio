# APIs + MCP + Admin · Kick-off Viento Norte

**Fecha:** 2026-08-13  
**Host:** `https://contact.vientonorte.io` (alias `mi-portafolio-contact.vientonorte.workers.dev`)

## SSOT · contratos live (GET)

Verificado 2026-08-13 contra prod. `time` en health cambia en cada request.

`GET https://contact.vientonorte.io/api/health`

```json
{"ok":true,"service":"vientonorte-api","time":"2026-08-13T19:51:54.961Z","kv":true}
```

`GET https://contact.vientonorte.io/mcp`

```json
{"ok":true,"name":"vientonorte","version":"1.1.0","protocol":"2024-11-05","transport":"json-rpc","tools":["list_services","get_cases","get_company_info","list_skills","get_skill","submit_lead","book_call","request_diagnostico"]}
```

- **GET `/mcp`** = discovery (este JSON).  
- **POST `/mcp`** = JSON-RPC (initialize / tools/list / tools/call).  
- Escritura MCP (`submit_lead`, `book_call`, `request_diagnostico`) exige `VN_API_KEY` (aún no está en secrets).

Arquitectura: **Landing → APIs → MCP → Admin UI** sobre las mismas colecciones KV.

## Decisiones (cerradas con evidencia del repo)

| Pregunta | Decisión |
|----------|----------|
| Backend | Worker Cloudflare existente (no el proxy Vertex de `backend/`) |
| Persistencia | `ADMIN_KV` (listas JSON). D1 queda para un sprint posterior |
| APIs de este sprint | health, services, cases, company, leads, booking, diagnostico + admin |
| MCP | JSON-RPC en `POST /mcp`. Lectura pública. Escritura con `VN_API_KEY` |
| Admin UI | Mismo repo, `#/admin`, auth GitHub/passkey ya existente |
| Edición | Cambio de estado (leads / bookings / diagnósticos). Catálogo solo lectura |

## Públicos

| Método | Ruta | Auth |
|--------|------|------|
| GET | `/api/health` | no |
| GET | `/api/services` | no |
| GET | `/api/cases` | no |
| GET | `/api/company` | no |
| GET | `/api/skills` · `/api/skills/:id` | no |
| POST | `/api/contact` | consentimiento + persist lead |
| POST | `/api/leads` | consentimiento |
| POST | `/api/booking` | no (registra + devuelve Calendar); si trae `eventId`, exige `X-VN-BOOKING-KEY` cuando `VN_BOOKING_WEBHOOK_KEY` está configurado — ver [`CALENDAR-BOOKING-BRIDGE.md`](./CALENDAR-BOOKING-BRIDGE.md) |
| POST | `/api/diagnostico` | no |

## Admin (cookie de sesión)

| Método | Ruta |
|--------|------|
| GET | `/api/admin/overview` |
| GET | `/api/admin/leads?q=&status=` |
| PATCH | `/api/admin/leads/:id` `{ status, notes }` |
| GET/PATCH | `/api/admin/bookings` · `/api/admin/diagnosticos` |
| GET | `/api/admin/services` · `/api/admin/cases` |

UI: `https://vientonorte.io/#/admin` — **no está en la nav**. noIndex + robots. Sin sesión solo se ve un gate de **passkey**. GitHub queda en «Primera vez» (bootstrap). Los datos viven en el Worker (cookie HttpOnly); el HTML no lista leads si no hay sesión.

## MCP

```
POST /mcp
Content-Type: application/json
X-VN-API-KEY: <secret>   # solo tools de escritura
```

Tools:

- `list_services` · `get_cases` · `get_company_info` · `list_skills` · `get_skill` (públicas)
- Catálogo skills: `GET /api/skills` · package `@vientonorte/skills` · hosted `/ops/skills/` · KV `vn:skills`
- `submit_lead` · `book_call` · `request_diagnostico` (API key)

Secret:

```bash
cd worker
npx wrangler secret put VN_API_KEY
npx wrangler deploy
```

Cliente de ejemplo (Claude / Cursor / Grok): URL `https://contact.vientonorte.io/mcp`.

## Deploy

El worker completo (`wrangler.toml`) necesita KV. El deploy `wrangler.contact.toml` es solo relay de mail y **no** persiste tablas.

```bash
cd worker
npx wrangler deploy
```

Capacidades del CMS y backlog (OG, Meta, LinkedIn, Google, agentes): [`CMS-ADMIN-CAPABILIDADES.md`](./CMS-ADMIN-CAPABILIDADES.md).

## QA local

```bash
cd worker && npx wrangler dev
curl -s http://127.0.0.1:8787/api/health
curl -s http://127.0.0.1:8787/api/services
curl -s http://127.0.0.1:8787/mcp
```
