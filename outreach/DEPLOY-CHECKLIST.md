# Checklist de deploy — vn-outreach

Lo corre Rö, a mano, en este orden. Nada de esto lo hace el CI. `OUTREACH_MODE` se queda en `test`. Pasar a `live` es otra decisión.

El primer `wrangler deploy` crea el registro DNS de `outreach.vientonorte.io`. Ese deploy no se corre sin el OK de Rö.

## 1. Cuenta y API key del proveedor — PAUSADO: proveedor en evaluación

No crear la cuenta ni generar una API key hasta que el proveedor esté elegido. El código sigue llamando a la API actual; no se cambia el camino de envío en este paso.

## 2. Dominio `vientonorte.io` — PAUSADO: proveedor en evaluación

Cuando haya proveedor, copiar tipo, nombre y valor desde la pestaña Records. Solo DNS (en Cloudflare, nube gris). No cambiar los MX del ápice de `vientonorte.io`. No cambiar el TXT `_dmarc`.

## 3. Open tracking y click tracking — PAUSADO: proveedor en evaluación

Confirmar que el tracking de aperturas y el de clics están apagados para `vientonorte.io`. No activarlos.

## 4. KV — hecho

El namespace ya existe. `kv_namespaces[0].id` en `wrangler.jsonc` es `b9c225a287124b36a953ad8747664c30`. No volver a crear el namespace ni pegar otro id.

El comando que se usó, por si hay que reconocerlo, fue:

```bash
npx --no-install wrangler kv namespace create OUTREACH_KV
```

## 5. Access — hecho

Ya están la aplicación self-hosted de `outreach.vientonorte.io`, el service token y el Bypass del path exacto `POST /webhook/resend` (sin comodín, sin barra final, solo POST).

`TEAM_DOMAIN` y `POLICY_AUD` ya están en `vars` de `wrangler.jsonc`. La ruta está activa:

```jsonc
"routes": [
  { "pattern": "outreach.vientonorte.io", "custom_domain": true }
]
```

El Client ID y el Client Secret del service token los tiene TL, fuera del repo. No van en git ni en secretos del worker. `workers_dev` y `preview_urls` siguen en false.

## 6. Secretos

`RESEND_API_KEY` y `RESEND_WEBHOOK_SECRET` — PAUSADO: proveedor en evaluación. No cargarlos y no crear el webhook del proveedor hasta que se elija.

`TEST_ALLOWLIST` sí: una sola dirección, la tipea Rö. No va en git.

```bash
cd outreach
npx --no-install wrangler secret put TEST_ALLOWLIST
```

Vacía o ausente, `/send` en modo test responde 403.

## 7. Dry-run y deploy

El deploy crea el DNS de `outreach.vientonorte.io`. Esperar el OK de Rö.

```bash
cd outreach && npx --no-install wrangler deploy --dry-run
cd outreach && npm ci && npx --no-install wrangler deploy --keep-vars
```

`--keep-vars` no borra vars ni secretos que ya estén en el dashboard. `OUTREACH_MODE` queda en `test`. La migración `v1` del Durable Object (`new_sqlite_classes`: `OutreachCounter`) se aplica en el primer deploy.

## 8. Humo

Con el worker desplegado y `OUTREACH_MODE=test`:

1. `POST /send` sin JWT → 403.
2. `OPTIONS /send` → 405, sin header CORS.
3. `POST /webhook/resend` sin firma → 403.
4. Un solo `POST /send` a la dirección de `TEST_ALLOWLIST`. El asunto tiene que salir con el prefijo `[PRUEBA] `. Cualquier otro destinatario responde 403.

El envío del punto 4 usa la API key del proveedor. Mientras el paso 1 siga en pausa, no hay key y ese envío no se hace. Los puntos 1 a 3 no la necesitan.

```bash
curl -sS -D - -o /dev/null -X POST "https://outreach.vientonorte.io/send" \
  -H "Content-Type: application/json" \
  -d '{"to":"nadie@example.com","subject":"x","fields":{}}'

curl -sS -D - -o /dev/null -X OPTIONS "https://outreach.vientonorte.io/send"

curl -sS -D - -o /dev/null -X POST "https://outreach.vientonorte.io/webhook/resend" \
  -H "Content-Type: application/json" \
  -d '{"type":"email.bounced"}'
```

El `[PRUEBA]`, cuando la key exista, es el `curl` de `POST /send` del README, con `CF-Access-Client-Id` y `CF-Access-Client-Secret` que tiene TL, y `to` igual a la única dirección del allowlist.

## 9. Rollback

```bash
cd outreach && npx --no-install wrangler rollback
```

O quitar el bloque `routes` y volver a desplegar. `workers_dev` y `preview_urls` no se prenden. `OUTREACH_MODE` no pasa a `live` en este checklist.
