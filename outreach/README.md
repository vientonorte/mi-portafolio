# vn-outreach

Worker de Cloudflare aparte de `worker/` (el de contacto). Manda correos de prospección de Viento Norte, uno a uno, por la API de Gmail.

- Scope único: `https://www.googleapis.com/auth/gmail.send`
- La cuenta que envía es una Gmail dedicada de Viento Norte. `SENDER_EMAIL` y `SENDER_NAME` son vars. No van en el repo y no se hardcodean
- Reply-To y `List-Unsubscribe` salen de `SENDER_EMAIL`, la cuenta dedicada donde el bot lee las BAJA
- Plantilla `prospeccion-v1`: HTML y texto, con el aviso de privacidad en el pie y sin precios
- `workers_dev = false` y `preview_urls = false`: no hay URL `*.workers.dev` ni preview
- La ruta `outreach.vientonorte.io` (`custom_domain`) ya está en `wrangler.jsonc`. El DNS de ese hostname lo crea el primer deploy, y ese deploy no se corre sin el OK de Rö

El worker no lee la casilla. Un access token se pide con `grant_type=refresh_token` a `https://oauth2.googleapis.com/token` y se guarda en memoria del isolate hasta que vence. El envío es `POST https://gmail.googleapis.com/gmail/v1/users/me/messages/send` con el MIME en `raw` (base64url).

Este directorio no despliega nada por sí solo. El deploy lo hace Rö, a mano. El orden está en [DEPLOY-CHECKLIST.md](./DEPLOY-CHECKLIST.md).

## Qué responde el worker

| Ruta | Auth | Efecto |
|---|---|---|
| `POST /send` | JWT de Access | Renderiza y manda un correo, o lo rechaza |
| `POST /suppress` | JWT de Access | Agrega una dirección a la lista de baja. `reason` es `bounce` o `baja` |
| `POST /halt` | JWT de Access | `{ "on": true }` corta todo `/send`. `{ "on": false }` lo levanta |
| `POST /resume` | JWT de Access | Apaga el corte en el Durable Object |

No hay CORS. `OPTIONS` responde 405. El worker no acepta el service token como credencial: Access lo valida y el worker verifica el JWT de `Cf-Access-Jwt-Assertion`.

`POST /suppress` lo llama el bot de PR B, con el service token de Access. Ese bot tiene un conector a la cuenta Gmail dedicada y es el que ve los DSN y las respuestas BAJA. El worker no abre la casilla. La llamada es idempotente: la misma dirección y la misma razón se pueden repetir.

Si `TEAM_DOMAIN` o `POLICY_AUD` faltan o no son válidos, `/send`, `/suppress` y `/resume` responden 403 y no llaman a Gmail. `TEAM_DOMAIN` tiene que ser `https://<equipo>.cloudflareaccess.com`. `POLICY_AUD` es el AUD de la aplicación de Access. El JWT tiene que ser de aplicación: `type` exactamente `app`.

## Modo test y modo live

Modo test es el default (`OUTREACH_MODE=test`, y también cualquier valor que no sea exactamente `live`). En test el destinatario tiene que estar en `TEST_ALLOWLIST` y el asunto sale con el prefijo `[PRUEBA] `. Si `TEST_ALLOWLIST` falta o está vacía, `/send` responde 403 y no llama a Gmail. El modo test no mira la ventana horaria y cuenta el tope en KV, aunque el Durable Object esté ligado.

La dirección de prueba es `gaete-gaona-44xjac@mail.grokbot.com`. **PENDIENTE OK Rö.** Solo correos `[PRUEBA]` con datos ficticios. Nunca un prospecto real y nunca un secreto. La leen el bot de TL y Rö, y la retiene la plataforma.

`isLiveMode` es live solo si `OUTREACH_MODE` es exactamente `live` y el binding `OUTREACH_COUNTER` está presente. Si la var es `live` y el binding no está, `POST /send` responde 503 `live_gate` y no llama a Gmail.

En live, `/send` solo entra de lunes a viernes, de 17:15 a 17:35 inclusive, hora de `America/Santiago`. El día y la hora salen de `Intl` con esa zona, así que el horario de verano entra solo. Fuera de la ventana la respuesta es 403 `outside_window`, sin reservar cupo y sin llamar a Gmail. El modo test no usa esta ventana.

## Cupo, secreto y resultado

Sin `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `SENDER_EMAIL` o `SENDER_NAME` válidos, `/send` responde 503 `unconfigured` antes de reservar. Un CR o LF en el nombre del From también es `unconfigured`. Un CR o LF en `To` o en el asunto es 400.

Tope de live: la var `DAILY_CAP`. Si falta, el tope es 10. Si no es un entero entre 1 y 10, live responde 503 `cap` y no reserva. Un tope mayor que 10 pide un PR que cambie `DAILY_CAP_MAX`. El modo test no lee la var: su tope es 10. La clave es `cap:YYYY-MM-DD`, calculada una vez al reservar. La devolución usa esa misma clave y no recalcula el día.

Solo se devuelve el cupo cuando Gmail responde un status que no es 2xx, o cuando falla el canje del refresh token (esa llamada es anterior a `messages/send`, así que el correo no salió). Un error de red, un timeout o un abort de `messages/send` no se devuelve: el correo puede haber salido. Si la devolución lanza, el worker hace `console.log` de `{ event: "outreach_cap_rollback", result: "failed" }` con el almacén y la clave del día, sin destinatario ni JWT, y el caller recibe el error original. Con el contador en el tope, el siguiente responde 429.

En test la reserva sigue siendo read-modify-write de KV y no es atómica. En live la reserva y la devolución las hace el Durable Object `OutreachCounter`. El objeto no calcula el día: opera sobre la clave y el tope que le pasa el worker.

## Registro y baja

Cada intento que ya pasó la validación deja en KV `log:<id>` con `id`, `to`, `template`, `timestamp`, `gmail_id`, `result`, `error`, `fuente` y `base`. El registro vence a los 90 días. No se guarda nombre, empresa ni hallazgo. `to` es el único lugar donde queda la dirección. `fuente` y `base` no se copian al log de consola.

`fuente` es la fuente pública del contacto: una URL o un texto de hasta 200 caracteres. `base` es `interes_legitimo` o `fuente_publica`. Si falta cualquiera de las dos, `/send` responde 400 y no llama a Gmail.

Lista de baja: `/send` no escribe a una dirección suprimida (409). `POST /suppress` escribe en esa lista y no corta el envío global. El corte global vive en el Durable Object `OutreachCounter`. `POST /halt` lo escribe ahí. `reserve()` no cuenta un envío mientras el corte está prendido, y `/send` responde 409 `halted`. `POST /resume` con `{"confirm":true}`, y `{ "on": false }`, lo levantan. Sin el binding del objeto, `/halt` responde 503. `state:halt` en KV no se desplegó; el corte no tiene copia ahí.

Los traces están apagados (`observability.traces.enabled: false`) y los invocation logs también. Un trace puede guardar el JWT de Access y el header `Authorization` de la llamada a Gmail.

## Setup para Rö

El orden está en [DEPLOY-CHECKLIST.md](./DEPLOY-CHECKLIST.md). Resumen, sin valores:

1. Cuenta Gmail dedicada de Viento Norte. Vars `SENDER_EMAIL` y `SENDER_NAME`.
2. Cliente OAuth en GCP, consentimiento **En producción**, un solo scope `gmail.send`.
3. Refresh token con `npm run gmail:refresh-token` (local, loopback). No corre en CI.
4. `wrangler secret put` de `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET` y `GMAIL_REFRESH_TOKEN`.
5. Var o secreto `TEST_ALLOWLIST` con la bandeja de prueba. PENDIENTE OK Rö.
6. Deploy, con OK de Rö: el primero crea el DNS de `outreach.vientonorte.io`.
7. Borrar la app de Bypass `cf76fb24`, con OK de Rö.
8. Un `[PRUEBA]` a la bandeja de prueba. Live solo después de esa evidencia, de PR B en PASS y del OK textual de Rö.

```bash
cd outreach && npm ci && npx --no-install wrangler deploy --keep-vars
```

Wrangler está pinneado en `4.86.0`. El dry-run local (no despliega) es:

```bash
cd outreach && npx --no-install wrangler deploy --dry-run
```

El refresh token, en la máquina de Rö:

```bash
cd outreach
npm ci
read -rs GMAIL_CLIENT_ID
export GMAIL_CLIENT_ID
read -rs GMAIL_CLIENT_SECRET
export GMAIL_CLIENT_SECRET
npm run gmail:refresh-token
```

## Prueba de humo (un solo `[PRUEBA]`)

1. Confirmar que `OUTREACH_MODE` es `test` y que `TEST_ALLOWLIST` tiene una sola dirección: `gaete-gaona-44xjac@mail.grokbot.com`, cuando Rö lo confirme.
2. Mandar un solo `POST /send` a esa dirección, con datos ficticios. El asunto tiene que salir con el prefijo `[PRUEBA] `.
3. Cualquier otro destinatario responde 403 y Gmail no se llama.
4. En el mensaje recibido: `spf=pass`, `dkim=pass`, `dmarc=pass` (`gmail.com`), el HTML se ve, y está la línea para responder «BAJA».

```bash
curl -sS -X POST "https://outreach.vientonorte.io/send" \
  -H "Content-Type: application/json" \
  -H "CF-Access-Client-Id: $CF_ACCESS_CLIENT_ID" \
  -H "CF-Access-Client-Secret: $CF_ACCESS_CLIENT_SECRET" \
  -d '{
    "to": "gaete-gaona-44xjac@mail.grokbot.com",
    "subject": "Prueba de plantilla",
    "fuente": "https://ejemplo.cl/equipo",
    "base": "fuente_publica",
    "fields": {
      "empresa": "Estudio Ficticio",
      "hallazgo": "Prueba de contraste del botón de contacto.",
      "servicio_ancla": "revision-gratis",
      "rubro": "estudio"
    }
  }'
```

Respuesta esperada: 200, con `template` `prospeccion-v1` y `gmail_id`. El cuerpo trae el aviso de privacidad `https://vientonorte.io/privacidad/` y la línea para responder «BAJA» a `SENDER_EMAIL`. Desde la bandeja de prueba, esa respuesta la toma el bot de PR B y la escribe con `POST /suppress`. No pasar a `live` en esta prueba.

## Cuerpo de `POST /send`

```json
{
  "to": "una-sola-direccion@ejemplo.cl",
  "subject": "Asunto",
  "fuente": "https://ejemplo.cl/pagina-publica",
  "base": "fuente_publica",
  "fields": {
    "empresa": "obligatorio",
    "hallazgo": "obligatorio, sin precio",
    "servicio_ancla": "revision-gratis | consultoria-ux | web-pymes",
    "rubro": "opcional",
    "contacto_nombre": "opcional",
    "contacto_cargo": "opcional",
    "cta_texto": "opcional; si falta, sale del ancla"
  }
}
```

`base` también puede ser `interes_legitimo`. `fuente` es la fuente pública del contacto, URL o texto, hasta 200 caracteres.

El worker calcula `link`, `kicker`, `oferta`, `preheader` y `rubro_slug`. El preheader es el hallazgo, medido en code points: si pasa de 110, se corta en el último espacio en o antes de 109 y se le agrega `…`, sin partir un par subrogado. El link es `https://vientonorte.io/servicios/?utm_source=email&utm_medium=prospeccion&utm_campaign=<rubro>#<ancla>`. No acepta un precio (`$` y un dígito) ni «web gratis». «Revisión gratis» y «revisión gratuita» sí están en la copia del ancla `revision-gratis`.

El MIME lleva `Reply-To` y `List-Unsubscribe` con `mailto:` de `SENDER_EMAIL`. El `From` sale de `SENDER_NAME` y `SENDER_EMAIL`. El `Subject` y el nombre van codificados en UTF-8 (RFC 2047), partido por code points, con cada línea de hasta 78 caracteres. No lleva `List-Unsubscribe-Post`: el one-click de RFC 8058 exige una URI HTTPS y este worker no tiene endpoint de baja. El HTML no carga imágenes remotas. El pie, en HTML y en texto, enlaza `https://vientonorte.io/privacidad/`.

`POST /suppress` acepta `{ "email": "a@b.cl", "reason": "baja" }`. `reason` es `bounce` o `baja`. Otra razón, un email inválido o una lista `emails` responden 400 y no escriben.

## Tests

```bash
cd outreach && npm ci && npm test
```

Cubren auth fail-closed, el live gate, el tope (10 en test, `DAILY_CAP` en live), la ventana de Santiago con horario de invierno y de verano, rollback del cupo en un 4xx o 5xx aunque cambie el día, cupo retenido si `messages/send` hace timeout o falla la red, devolución si falla el canje del token, caché del access token, supresión idempotente, modo test, el MIME (`From`, `Reply-To`, `List-Unsubscribe`, asunto RFC 2047), `fuente` y `base` en el registro, el preheader con un emoji en el corte, el aviso de privacidad y que un rechazo no llame a Gmail.
