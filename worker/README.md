# Contact relay — mi-portafolio

Reenvía el formulario de contacto a tu Gmail **sin publicar** `gaete.gaona@gmail.com` en el sitio.

## Arquitectura

| Capa | Qué ve el visitante | Qué recibes tú |
|------|---------------------|----------------|
| Sitio | `contacto@vientonorte.cl` | — |
| Formulario → Worker | POST al relay | Email en Gmail con `Reply-To` del visitante |
| Email Routing (opcional) | mailto al alias | Reenvío directo a Gmail |

## Setup (una vez)

### 1. Email Routing — alias público → Gmail

En Cloudflare Dashboard → **Email** → **Email Routing** (zona `vientonorte.cl`):

1. Verificar destino: `gaete.gaona@gmail.com`
2. Crear dirección: `contacto@vientonorte.cl` → reenviar a Gmail

### 2. Email Sending — dominio para enviar desde el Worker

```bash
npx wrangler email sending enable vientonorte.cl
```

### 3. Secretos del Worker

```bash
cd worker
npm install
npx wrangler secret put CONTACT_INBOX
# Pegar: gaete.gaona@gmail.com

npx wrangler deploy
```

URL prod: `https://mi-portafolio-contact.vientonorte.workers.dev/api/contact`

### 4. CORS local (opcional)

En `wrangler.toml`, añadir a `ALLOWED_ORIGIN`:

```
ALLOWED_ORIGIN = "https://vientonorte.github.io,http://localhost:3000"
```

## Fallback automático

Si Email Sending del dominio no está activo, el Worker usa **FormSubmit** como relay
(server-side). La primera vez, FormSubmit envía un correo de **activación** a
`CONTACT_INBOX` — debes abrir el enlace para confirmar.

## QA

```bash
curl -X POST https://mi-portafolio-contact.vientonorte.workers.dev/api/contact \
  -H "Origin: https://vientonorte.github.io" \
  -H "Content-Type: application/json" \
  -d '{"name":"QA Test","email":"tu@email.com","message":"Mensaje de prueba del relay."}'
```

Debe llegar a Gmail con asunto `Portfolio · mensaje de QA Test`.