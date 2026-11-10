# Deploy — worker de contacto

**Worker:** `mi-portafolio-contact`  
**Host:** `https://contact.vientonorte.io`  
**Config:** `worker/wrangler.toml` (único; nunca `-c` / `--config`)

Este archivo no despliega nada. El deploy lo hace Rö, a mano, por orden del TL.

## Prerequisite

`CONTACT_INBOX` es un **secret** del Worker. No va en git ni en `[vars]`. Sin ese secret, `POST /api/contact` guarda el lead en KV y omite el aviso por email.

```sh
cd worker && npx wrangler secret put CONTACT_INBOX
```

Rö escribe el valor. No pegarlo en el repo, en el chat ni en un PR.

## Comando canónico

```sh
cd worker && npm ci && npx --no-install wrangler deploy --keep-vars
```

Wrangler queda pinneado en `worker/package-lock.json` (4.86.0). No subir esa versión en el mismo cambio.

## QR FRUTA (retirado)

No hay pasos de QR en el deploy. Estas rutas responden **410 Gone** y no escriben KV:

- `/q` y `/q/*` (incluye `/q/stats`, `/q/stats/` y `/q/<punto>`)
- `/stats` y `/stats/`

No crear ni rotar `QR_VIEW_KEY` ni `QR_STATS_TOKEN`. Si esos secrets siguen en Cloudflare, Rö puede borrarlos después. Borrar un secret con Wrangler publica una versión: no forma parte de este cambio.

No borrar el namespace `ADMIN_KV`. Lo comparten leads, admin e imágenes. Las claves `qr:*` que ya existan se dejan.

Rutas, custom domain y bindings de `wrangler.toml` (`EMAIL`, `ADMIN_KV`, `IMAGES_BUCKET`) no cambian.
