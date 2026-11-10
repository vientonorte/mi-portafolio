# Contador QR FRUTA — retirado

El Product Owner deprecó QR. El worker de contacto ya no cuenta escaneos ni escribe KV.

- `/q` y `/q/*` (cualquier método, incluida la query): **301** a `https://vientonorte.io/contacto/`. No se reenvían claves.
- `GET /`: **301** a `https://vientonorte.io/`.
- `/stats` y `/stats/`: **410 Gone**.

No desplegar código QR. No crear, rotar ni borrar `QR_VIEW_KEY` ni `QR_STATS_TOKEN` en este cambio. `ADMIN_KV` se conserva. Las claves `qr:*` existentes no se borran.

El deploy del worker está en [`worker/DEPLOY.md`](../worker/DEPLOY.md). Prerequisite que sigue vigente: `CONTACT_INBOX` como secret, con el mismo valor que `allowed_destination_addresses`.
