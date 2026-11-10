# Contador QR FRUTA — retirado

El Product Owner deprecó QR. El worker de contacto ya no sirve esas rutas.

Responden **410 Gone**, sin redirección al formulario y sin escrituras en KV:

- `/q` y `/q/*` (`/q/stats`, `/q/stats/`, `/q/<punto>`)
- `/stats` y `/stats/`

`GET /` del worker ya no muestra la portada que enlazaba a `/q/stats`.

No desplegar código QR. No crear ni rotar `QR_VIEW_KEY` ni `QR_STATS_TOKEN`. Si siguen cargados en Cloudflare, Rö puede borrarlos más adelante; este cambio no toca secrets. `ADMIN_KV` se conserva (lo usa el resto del worker). Las claves `qr:*` existentes no se borran.

El deploy del worker está en [`worker/DEPLOY.md`](../worker/DEPLOY.md). Prerequisite que sigue vigente: `CONTACT_INBOX` como secret.
