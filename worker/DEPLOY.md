# Deploy — worker de contacto

**Worker:** `mi-portafolio-contact`  
**Host:** `https://contact.vientonorte.io`  
**Config:** `worker/wrangler.toml` (único; nunca `-c` / `--config`)

Este archivo no despliega nada. El deploy lo hace Rö, a mano, por orden del TL. Este cambio no corre `wrangler deploy` ni `wrangler secret put` / `secret delete`, y no borra secrets.

## Prerequisite: `CONTACT_INBOX`

`CONTACT_INBOX` es un **secret** del Worker. No va en git ni en `[vars]`. Sin ese secret, `POST /api/contact` guarda el lead en KV y omite el aviso por email.

El valor del secret tiene que ser **exactamente** una dirección de `[[send_email]].allowed_destination_addresses` en `worker/wrangler.toml`. Si no coincide, el binding `EMAIL` rechaza el aviso (`E_RECIPIENT_NOT_ALLOWED`). No copiar la dirección a este archivo, al chat ni a un PR. Doc del binding: <https://developers.cloudflare.com/email-service/configuration/send-bindings/>.

En prod, `CONTACT_INBOX` sigue como variable en texto plano del toml viejo. Un secret y una var comparten el nombre en `env` ([secrets](https://developers.cloudflare.com/workers/configuration/secrets/) son environment variables; el valor del secret no se vuelve a ver). `npx --no-install wrangler secret put` hace PUT de un binding `secret_text` y despliega en el acto ([`secret put`](https://developers.cloudflare.com/workers/wrangler/commands/workers/#secret-put)). Wrangler 4.86.0 no revisa antes si ese nombre ya es una var. Si el nombre ya está usado, la API puede rechazar el put con un error del estilo «binding name already in use». La doc pública no escribe esa frase; el CLI reenvía el error de la API.

Orden, lo ejecuta Rö:

1. `cd worker && npm ci && npx --no-install wrangler secret list` — lista nombres de secrets, no valores. Si `CONTACT_INBOX` no aparece, en prod sigue siendo var.
2. `cd worker && npx --no-install wrangler secret put CONTACT_INBOX` — Rö escribe el valor, igual a `allowed_destination_addresses`.
3. Si el put falla porque el nombre ya es una var: borrar esa var en el dashboard (Workers & Pages → el worker → Settings → Variables and Secrets) y repetir el put. No usar `secret delete` para eso: `secret delete` también despliega ([`secret delete`](https://developers.cloudflare.com/workers/wrangler/commands/workers/#secret-delete)). Cómo editar vars: [Environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/#add-environment-variables-via-the-dashboard).

## Comando canónico

```sh
cd worker && npm ci && npx --no-install wrangler deploy --keep-vars
```

Wrangler queda pinneado en `worker/package-lock.json` (4.86.0). No subir esa versión en el mismo cambio.

## QR FRUTA (retirado)

No hay pasos de QR en el deploy. No hay conteo ni lecturas/escrituras KV. La query no se reenvía.

- `/q` y `/q/*` (cualquier método): **301** `Location: https://vientonorte.io/contacto/`
- `GET /`: **301** `Location: https://vientonorte.io/`
- `/stats` y `/stats/`: **410 Gone** (no es un destino escaneable)

No crear ni rotar `QR_VIEW_KEY` ni `QR_STATS_TOKEN`. Este PR no los borra. Si siguen en Cloudflare, borrarlos es un paso aparte de Rö: `secret delete` publica una versión.

No borrar el namespace `ADMIN_KV`. Lo comparten leads, admin e imágenes. Las claves `qr:*` que ya existan se dejan.

Rutas, custom domain y bindings de `wrangler.toml` (`EMAIL`, `ADMIN_KV`, `IMAGES_BUCKET`) no cambian.
