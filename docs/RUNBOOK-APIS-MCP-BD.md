# Runbook · APIs + MCP + BD · visibilidad y mantenimiento

**SSOT contratos GET:** [`API-KICKOFF.md`](./API-KICKOFF.md) (health + discovery MCP).  
**Host:** `https://contact.vientonorte.io`  
**CMS:** `https://vientonorte.io/#/admin` (passkey) · fotos `#/admin/fotos`  
**Sí: hay APIs, MCP y BD.** La BD no es Postgres: es **Cloudflare KV** (`ADMIN_KV`) + **R2** (imágenes).

```
vientonorte.io  ──POST──►  Worker (APIs + MCP)
       ▲                        │
       │                   ADMIN_KV  (leads, bookings, diagnósticos, sesiones, manifest)
       │                   R2        (fotos override)
       └── #/admin  ──cookie──┘
```

---

## 1. Visibilidad diaria (tú, sin CLI)

| Qué ver | Dónde | Cada cuánto |
|---------|--------|-------------|
| ¿El backend vive? | `GET https://contact.vientonorte.io/api/health` → `ok` + `kv: true` | Si algo falla |
| Leads / agenda / diagnósticos | `#/admin` → Overview + tabs | Diario / al llegar un mail |
| Fotos y PRs de OG | `#/admin/fotos` · link PR # | Al cambiar branding |
| Catálogo servicios/casos | `#/admin` tabs (solo lectura) | Al cambiar oferta |
| Mail de contacto | Gmail (`VN · …` / `Recibimos tu mensaje`) | En tiempo real |
| MCP tools | `GET https://contact.vientonorte.io/mcp` | Tras deploy |
| Ops canvas | https://vientonorte.io/ops/ | Semana |

Cambio de estado de un lead (nuevo → contactado → cerrado) **es la mantenimiento** de la BD de negocio. No hace falta entrar a KV a mano.

---

## 2. Qué hay en cada capa

### APIs públicas

| Método | Ruta | Dato |
|--------|------|------|
| GET | `/api/health` | status + KV |
| GET | `/api/services` | packs + módulos |
| GET | `/api/cases` | casos publicados |
| GET | `/api/company` | propuesta de valor |
| POST | `/api/contact` `/api/leads` | escribe **leads** + mail |
| POST | `/api/booking` | escribe **bookings** |
| POST | `/api/diagnostico` | escribe **diagnosticos** |
| POST | `/api/demo/heat` | clics demo (sin PII) → KV `vn:demo-heat:{path}` |
| GET | `/api/admin/demo/heat` | heatmap admin (sesión) |
| GET | `/s` `/s/consultoria` | HTML OG para crawlers |

### MCP

`POST /mcp` · tools: `list_services` `get_cases` `get_company_info` (lectura) · `submit_lead` `book_call` `request_diagnostico` (escritura, falta `VN_API_KEY`).

Cliente: URL `https://contact.vientonorte.io/mcp`.

### BD (KV keys)

| Key | Contenido |
|-----|-----------|
| `vn:leads` | array de leads (máx. 2000) |
| `vn:bookings` | reservas |
| `vn:diagnosticos` | intakes |
| `vn:demo-heat:{path}` | grid + counts heatmap demo |
| `image:manifest` | overrides R2 |
| `passkey:credentials` | passkeys admin |
| `vn_admin_session` cookie | no está en KV; HMAC `SESSION_SECRET` |

No hay consola SQL. El visor es **`#/admin`**. Backup: `wrangler kv key get`.

---

## 3. Mantenimiento (rutina)

### Semanal (humano + CMS)

1. `#/admin` → Overview: ¿llegaron leads?  
2. Tab Leads: contactar / cerrar.  
3. Agenda: cruzar con Calendar.  
4. Gmail: mismos asuntos `VN ·`.  
5. Si cambiaste OG: merge del PR `cms/images-*` que abrió el admin.

### Tras un deploy Worker

```bash
cd worker
npx wrangler deploy --keep-vars
curl -sS https://contact.vientonorte.io/api/health
curl -sS https://contact.vientonorte.io/mcp
npx wrangler tail          # logs en vivo
```

`--keep-vars` para no pisar Calendar / CORS.

### Secretos (no se listan valores)

```bash
npx wrangler secret list
# hoy: SESSION_SECRET, ADMIN_BOOTSTRAP_CODE, GITHUB_CONTENTS_TOKEN
# falta para MCP write: VN_API_KEY
# falta para GitHub OAuth: GITHUB_CLIENT_ID / SECRET
```

### Backup KV (mensual)

```bash
npx wrangler kv key get vn:leads --binding ADMIN_KV --preview false > backup-leads.json
npx wrangler kv key get vn:bookings --binding ADMIN_KV --preview false > backup-bookings.json
npx wrangler kv key get vn:diagnosticos --binding ADMIN_KV --preview false > backup-diagnosticos.json
```

Guardar fuera del repo (Drive / vault). KV no es historial infinito (tope 2000 por lista).

### Fotos

- R2 = preview inmediato en el sitio logueado.  
- Pages = lo que ven LinkedIn/Meta → solo tras **merge del PR** que dispara el CMS.

---

## 4. Alertas mínimas (sin GTM)

| Señal | Cómo |
|-------|------|
| Worker caído | `health` ≠ 200 o `kv: false` |
| Mail no llega | health OK pero no hay fila en Leads → canal FormSubmit/Email |
| Admin no entra | passkey / bootstrap; `SESSION_SECRET` presente |
| MCP mudo | GET `/mcp` |
| Pages viejo | `/s/consultoria` 404 o OG 512px |

No hay uptime robot todavía. Un Calendar semanal “smoke VN” + curl health basta.

---

## 5. Agentes

Cualquier cliente MCP (Grok, Claude, Cursor) puede:

- leer servicios/casos/empresa  
- (cuando exista `VN_API_KEY`) crear lead o booking  

La **visibilidad humana** sigue siendo `#/admin`, no el agente.

---

## 6. Qué no es

| No | Sí |
|----|----|
| Postgres / D1 en prod | KV listas JSON |
| Panel en `/ops` de datos de leads | `/ops` = canvas; leads = `#/admin` |
| GTM como “BD de eventos” | dataLayer listo; contenedor no live |

Contrato de endpoints: [`API-KICKOFF.md`](./API-KICKOFF.md).
