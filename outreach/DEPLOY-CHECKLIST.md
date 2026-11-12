# Checklist de deploy — vn-outreach

Lo corre Rö, a mano, en este orden. Nada de esto lo hace el CI. `OUTREACH_MODE` se queda en `test`. Pasar a `live` es otra decisión, al final.

El worker manda correo por la API de Gmail con el scope `https://www.googleapis.com/auth/gmail.send` y nada más. La cuenta que envía es una cuenta Gmail dedicada de Viento Norte. La dirección y el nombre van en las vars `SENDER_EMAIL` y `SENDER_NAME`. No se hardcodean y no se usa una cuenta personal.

El worker no lee la casilla. Los rebotes y las bajas los ingiere un bot con un conector a esa misma cuenta dedicada (PR B) y los escribe con `POST /suppress` usando el service token de Access.

## 1. Cuenta Gmail dedicada

Crear o elegir la cuenta Gmail de Viento Norte que va a enviar. No es una cuenta personal. La dirección no se anota en este archivo: Rö la carga en la var `SENDER_EMAIL`. El nombre visible va en `SENDER_NAME`.

## 2. Cliente OAuth en GCP

En el proyecto de GCP de Viento Norte:

1. Pantalla de consentimiento en estado **En producción**. En estado Testing el refresh token vence a los 7 días.
2. Un solo consentimiento. El único scope es `https://www.googleapis.com/auth/gmail.send`.
3. Cliente OAuth con redirect de loopback `http://127.0.0.1:8765/`.

No pegar el client secret en el repo, en un issue, en el chat ni en la bandeja de prueba.

## 3. Refresh token

El script es local. No corre en CI. Pide el scope `gmail.send` y nada más, escucha solo en `127.0.0.1:8765` e imprime el refresh token en esa terminal. No lo escribe a un archivo.

```bash
cd outreach && npm ci
GMAIL_CLIENT_ID=... GMAIL_CLIENT_SECRET=... node scripts/gmail-refresh-token.mjs
```

Los dos valores van en el entorno del comando, no en la línea de argumentos. Si Google devuelve otro scope, el script no imprime el token. El refresh token se copia desde esa terminal al paso 4 y no se pega en otro lado.

## 4. Secretos

Rö los tipea. El comando no lleva el valor: wrangler lo pide en la terminal.

```bash
cd outreach && npm ci && npx --no-install wrangler secret put GMAIL_CLIENT_ID
cd outreach && npm ci && npx --no-install wrangler secret put GMAIL_CLIENT_SECRET
cd outreach && npm ci && npx --no-install wrangler secret put GMAIL_REFRESH_TOKEN
```

Sin esos tres, `/send` responde 503 y no reserva cupo.

## 5. Vars

En el dashboard, no en git:

- `SENDER_EMAIL` — la cuenta Gmail dedicada del paso 1
- `SENDER_NAME` — el nombre visible del From
- `TEST_ALLOWLIST` — una sola dirección: `gaete-gaona-44xjac@mail.grokbot.com`. **PENDIENTE OK Rö.**
- `DAILY_CAP` — ya está en `wrangler.jsonc` como `10`. Es el tope de live. El modo test no la lee.

`TEST_ALLOWLIST` solo recibe correos `[PRUEBA]` con datos ficticios. Nunca un prospecto real ni un secreto. La leen el bot de TL y Rö. La retiene la plataforma.

Vacía o ausente, `/send` en modo test responde 403.

## 6. Dry-run y deploy

El primer `wrangler deploy` crea el DNS de `outreach.vientonorte.io`. Ese deploy no se corre sin el OK de Rö.

```bash
cd outreach && npx --no-install wrangler deploy --dry-run
cd outreach && npm ci && npx --no-install wrangler deploy --keep-vars
```

`--keep-vars` no borra vars ni secretos que ya estén en el dashboard. `OUTREACH_MODE` queda en `test`. La migración `v1` del Durable Object (`new_sqlite_classes`: `OutreachCounter`) se aplica en el primer deploy. `workers_dev` y `preview_urls` siguen en false.

## 7. Access

La aplicación self-hosted de `outreach.vientonorte.io` y el service token ya existen. `TEAM_DOMAIN` y `POLICY_AUD` ya están en `vars`. El Client ID y el Client Secret del service token los tiene TL, fuera del repo. No son secretos del worker.

Borrar la app de Bypass `cf76fb24`. Ya no se usa. Borrarla requiere el OK de Rö. Después de eso, Access cubre todo el hostname.

## 8. Rebotes y bajas

No hay webhook en el worker y el worker no lee correo. La ingesta la hace el bot de PR B: un conector a la cuenta Gmail dedicada del paso 1. Cuando ve un DSN o una respuesta BAJA, hace `POST /suppress` con el service token de Access.

```json
{ "email": "<dirección>", "reason": "bounce" }
```

`reason` es `bounce` o `baja`. La llamada es idempotente. Access valida el service token e inyecta el JWT. El worker solo acepta ese JWT.

Live no se prende hasta que la rutina M5 de PR B (DSN/BAJA → `/suppress`) esté en PASS.

## 9. Prueba E2E

Con `OUTREACH_MODE=test` y la allowlist del paso 5:

1. `POST /send` sin JWT → 403.
2. `OPTIONS /send` → 405, sin header CORS.
3. Un solo `POST /send` a `gaete-gaona-44xjac@mail.grokbot.com`, asunto con prefijo `[PRUEBA] `, datos ficticios, `fuente` y `base` de prueba. Cualquier otro destinatario responde 403.

Evidencia para dar por buena la prueba: `spf=pass`, `dkim=pass` y `dmarc=pass` con dominio `gmail.com`, el render del HTML y la línea para responder «BAJA». No poner secretos en ese correo. No usar datos de un prospecto real.

```bash
curl -sS -D - -o /dev/null -X POST "https://outreach.vientonorte.io/send" \
  -H "Content-Type: application/json" \
  -d '{"to":"nadie@example.com","subject":"x","fuente":"https://ejemplo.cl/equipo","base":"fuente_publica","fields":{}}'

curl -sS -D - -o /dev/null -X OPTIONS "https://outreach.vientonorte.io/send"
```

El `[PRUEBA]` es el `curl` de `POST /send` del README, con `CF-Access-Client-Id` y `CF-Access-Client-Secret` que tiene TL, y `to` igual a la dirección de la allowlist.

## 10. Live

Solo después de las tres cosas:

1. La prueba E2E del paso 9, con la evidencia de SPF, DKIM, DMARC, render y BAJA.
2. PR B, rutina M5 DSN/BAJA → `POST /suppress`, en PASS.
3. El OK textual de Rö.

Hasta ese OK, `OUTREACH_MODE` sigue en `test`. En live, `/send` solo entra de lunes a viernes, 17:15–17:35 hora de `America/Santiago`, y el tope es `DAILY_CAP`.

## 11. Rollback

```bash
cd outreach && npx --no-install wrangler rollback
```

O quitar el bloque `routes` y volver a desplegar. `workers_dev` y `preview_urls` no se prenden. `OUTREACH_MODE` no pasa a `live` en un rollback.
