# Worker Viento Norte — contacto, APIs, MCP, admin

Relay de contacto **y** capa de negocio del kick-off: catálogo, leads, agenda, diagnósticos, MCP y panel.

Contrato: [`docs/API-KICKOFF.md`](../docs/API-KICKOFF.md).

# Contact relay — mi-portafolio

Reenvía el formulario de contacto a tu Gmail **sin publicar** `gaete.gaona@gmail.com` en el sitio.

## Arquitectura

| Capa | Qué ve el visitante | Qué recibes tú |
|------|---------------------|----------------|
| Sitio | `contacto@vientonorte.cl` | — |
| **Formulario → Worker** (único canal desde 13-oct-2026) | `fetch` a `/api/contact` | Lead en KV + aviso por Cloudflare Email (binding `EMAIL`) a `CONTACT_INBOX` con `Reply-To` del visitante |
| Email Routing (opcional) | mailto al alias | Reenvío directo a Gmail |

## Setup (una vez)

### 1. Email Routing — alias público → Gmail

En Cloudflare Dashboard → **Email** → **Email Routing** (zona `vientonorte.cl`):

1. Verificar destino: `gaete.gaona@gmail.com`
2. Crear dirección: `contacto@vientonorte.cl` → reenviar a Gmail

### 2. Email Sending — dominio para enviar desde el Worker

**Requisito:** la zona `vientonorte.cl` debe existir en tu cuenta Cloudflare.

```bash
npx wrangler email sending enable vientonorte.cl
```

Sin binding `EMAIL` (o si falla), el lead igual queda en KV y la respuesta lleva `emailed:false`.
FormSubmit salió del worker y del navegador (13-oct-2026).

### 3. Secretos del Worker

```bash
cd worker
npm install
# Opción A — var en wrangler.toml (ya configurado):
# CONTACT_INBOX = "gaete.gaona@gmail.com"
# Opción B — secret (override):
npx wrangler secret put CONTACT_INBOX
# Pegar: gaete.gaona@gmail.com

# Relay de contacto (sin bindings R2/KV admin):
npm run deploy:contact

# Worker completo (requiere R2 habilitado en la cuenta):
npx wrangler deploy
```

URL prod: `https://mi-portafolio-contact.vientonorte.workers.dev/api/contact`

### 4. CORS local (opcional)

En `wrangler.toml`, añadir a `ALLOWED_ORIGIN`:

```
ALLOWED_ORIGIN = "https://vientonorte.github.io,http://localhost:3000"
```

## Envío de correo

Solo Cloudflare Email (binding `EMAIL`). No hay FormSubmit ni otro relay de terceros.
Runbook completo del sitio: [`docs/CONTACT_AND_PRIVACY.md`](../docs/CONTACT_AND_PRIVACY.md)

## QA

```bash
curl -X POST https://mi-portafolio-contact.vientonorte.workers.dev/api/contact \
  -H "Origin: https://vientonorte.github.io" \
  -H "Content-Type: application/json" \
  -d '{"name":"QA Test","email":"tu@email.com","message":"Mensaje de prueba del relay."}'
```

Debe llegar a Gmail con asunto `Portfolio · mensaje de QA Test`.

---

## Admin de fotos (privado)

Ruta del sitio (interna, no enviar a clientes): `https://vientonorte.io/#/admin/fotos`

Solo el usuario GitHub **`vientonorte`** puede entrar. Flujo:

1. **GitHub OAuth** — primera vez o para registrar passkey
2. **Passkey (WebAuthn)** — entradas siguientes sin GitHub
3. Subir/reemplazar imágenes → **R2** + manifest en **KV**
4. El sitio público lee overrides en `GET /api/images/manifest`

### Recursos Cloudflare (una vez)

```bash
cd worker
npx wrangler kv namespace create ADMIN_KV
npx wrangler r2 bucket create mi-portafolio-images
# Copiar el id de KV a wrangler.toml → [[kv_namespaces]].id

# Habilitar acceso público al bucket R2 y pegar URL en wrangler.toml:
# R2_PUBLIC_BASE = "https://pub-xxxx.r2.dev"
```

### GitHub OAuth App

1. GitHub → Settings → Developer settings → OAuth App
2. Homepage: `https://vientonorte.io/`
3. Callback: `https://mi-portafolio-contact.vientonorte.workers.dev/api/admin/auth/github/callback`

```bash
npx wrangler secret put SESSION_SECRET      # openssl rand -base64 32
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
npx wrangler deploy
```

### Catálogo editable

Las fotos listadas coinciden con `public/images/**` y `profile-photo.jpg` (ver `src/data/image-registry.ts`).