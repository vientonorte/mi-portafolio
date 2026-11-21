# vn-outreach

Worker de Cloudflare **aparte** de `worker/` (el de contacto). Manda correos de prospección de Viento Norte, uno a uno, por la API REST de Resend (`POST https://api.resend.com/emails`).

- From: `Viento Norte <contacto@vientonorte.io>`
- Reply-To: `contacto@vientonorte.io`
- Plantilla `prospeccion-v1`: HTML y texto, sin precios
- `workers_dev = false` y `preview_urls = false`: no hay URL `*.workers.dev` ni preview
- La ruta `outreach.vientonorte.io` (`custom_domain`) ya está en `wrangler.jsonc`. El DNS de ese hostname lo crea el primer deploy, y ese deploy no se corre sin el OK de Rö

Este directorio no despliega nada por sí solo. El deploy lo hace Rö, a mano, con el comando de más abajo. No hay que correr `npx --no-install wrangler secret put` ni cambiar DNS desde el repo.

## Plan gratis de Resend y uso aceptable

Fuentes, leídas para este worker: [límites de envío](https://resend.com/docs/knowledge-base/resend-sending-limits), [precios](https://resend.com/pricing) y [acceptable use](https://resend.com/legal/acceptable-use).

Plan Free ($0):

- 3.000 correos al mes y **100 al día**. El día es el calendario UTC (00:00–24:00 UTC), no una ventana móvil de 24 horas.
- Cuentan los enviados y los recibidos (inbound). Varios destinatarios en To, Cc o Bcc cuentan cada uno.
- Hasta 3 dominios verificados y 3 inboxes. Retención de datos de 30 días. Sin pago por exceso: al llegar al cupo, Resend deja de enviar hasta el ciclo siguiente.
- El tope de este worker es 10 envíos aceptados por día `America/Santiago`. Cabe dentro de los 100/día UTC, pero no los reemplaza: un día de Santiago puede cruzar dos días UTC.

Uso aceptable, tal como lo publica Resend:

- Prohíbe mensajes no solicitados de cualquier tipo, **incluida la prospección en frío**, listas compradas y contactos scrapeados.
- El correo tiene que ir a quien dio opt-in explícito.
- Tasa de quejas bajo 0,08 % y tasa de rebotes bajo 4 %. Si se pasan, la cuenta se puede cerrar sin aviso.
- En envío masivo piden dirección y nombre de la empresa, decir por qué se escribe, un opt-out fácil y honrar la baja en 7 días.

La línea de baja, la lista de supresión y el corte al primer rebote duro no convierten la prospección en frío en un uso permitido. Antes de crear la cuenta o de pasar `OUTREACH_MODE` a `live`, hay que decidir si este envío entra en esa política. Ni los tests ni el CI llaman a Resend.

## Qué responde el worker

| Ruta | Auth | Efecto |
|---|---|---|
| `POST /send` | JWT de Access | Renderiza y manda un correo, o lo rechaza |
| `POST /suppress` | JWT de Access | Agrega una o varias direcciones a la lista de baja |
| `POST /resume` | JWT de Access | Levanta el corte global después de un rebote duro o una queja |
| `POST /webhook/resend` | Firma Svix | Rebote permanente o queja: suprime y corta. Si el secreto no está, 403 |

No hay CORS. `OPTIONS` responde 405. El worker no acepta el service token como credencial: solo el JWT que Access inyecta en `Cf-Access-Jwt-Assertion`.

Si `TEAM_DOMAIN` o `POLICY_AUD` faltan o no son válidos, `/send`, `/suppress` y `/resume` responden 403 y no llaman a Resend. `TEAM_DOMAIN` tiene que ser `https://<equipo>.cloudflareaccess.com`. `POLICY_AUD` es el AUD de la aplicación de Access.

Modo test es el default (`OUTREACH_MODE=test`, y también cualquier valor que no sea exactamente `live`, incluido vacío). En test el destinatario tiene que estar en `TEST_ALLOWLIST` y el asunto sale con el prefijo `[PRUEBA] `. Si `TEST_ALLOWLIST` falta o está vacía, `/send` responde 403 y no llama a Resend. El modo test cuenta el tope en KV aunque el Durable Object esté ligado. El JWT de Access tiene que ser de aplicación: `type` exactamente `app`.

`isLiveMode` es live solo si `OUTREACH_MODE` es exactamente `live` y el binding `OUTREACH_COUNTER` está presente. Si la var es `live` y el binding no está, `POST /send` responde 503 `live_gate` y no llama a Resend: no cae al allowlist ni manda el correo.

Tope: 10 envíos en el día de `America/Santiago`. La clave es `cap:YYYY-MM-DD`, calculada una vez al reservar. La devolución usa esa misma clave y no recalcula el día: un fallo que cruza la medianoche de Santiago devuelve el cupo del día que se reservó. Solo se devuelve el cupo cuando Resend responde con un status que no es 2xx. Un error de red, un timeout o un abort no se devuelve: el correo puede haber salido. Si la devolución (KV o Durable Object) lanza, el worker hace `console.log` de `{ event: "outreach_cap_rollback", result: "failed" }` con el almacén y la clave del día, sin destinatario ni JWT, y el caller recibe el error original. Con el contador en 10, el siguiente responde 429.

En test la reserva sigue siendo read-modify-write de KV y no es atómica: dos `/send` a la vez pueden leer el mismo número. En live la reserva y la devolución las hace el Durable Object `OutreachCounter` (una sola instancia, porque el tope es global). El objeto no calcula el día: opera sobre la clave que le pasa el worker.

Lista de baja: `/send` no escribe a una dirección suprimida (409). Un rebote permanente (`email.bounced` con `bounce.type = Permanent`) o una queja (`email.complained`) suprime esas direcciones y deja un corte global: todo `/send` responde 409 `halted` hasta `POST /resume`. El resume no saca a nadie de la lista de baja. Un rebote transitorio solo queda en el log.

Cada intento de envío deja en KV `log:<id>` con `id`, `to` (tal como llegó, ya validado), `template`, `timestamp`, `resend_id`, `result` y `error`. El registro vence a los 90 días. No se guarda nombre, empresa ni hallazgo. El `console.log` tampoco lleva destinatario ni JWT.

Los traces están apagados (`observability.traces.enabled: false`) y los invocation logs también. Un trace o un invocation log puede guardar headers, incluido el JWT de Access y los de Svix. No se almacenan.

## Setup para Rö

El orden y lo que está hecho o en pausa está en [DEPLOY-CHECKLIST.md](./DEPLOY-CHECKLIST.md). La cuenta, el DNS del dominio, el tracking y los secretos del proveedor están en pausa (`PAUSADO: proveedor en evaluación`). KV y Access ya están.

### 1. Cuenta y clave de Resend

Crear la cuenta en [resend.com](https://resend.com) en el plan Free y una API key. La clave no se commitea y no va en un `.env`.

### 2. Dominio `vientonorte.io` en Resend

En el dashboard: Domains → Add Domain → `vientonorte.io`. El From de este worker es `contacto@vientonorte.io`, así que el dominio verificado tiene que ser la raíz, no solo un subdominio. Resend recomienda un subdominio para separar reputación; este worker no lo usa porque el From pedido es el de la raíz.

Los registros DNS salen de la pestaña **Records** de ese dominio. Hay que copiar tipo, nombre y valor tal cual. No se inventan.

Según la doc de Resend ([agregar un dominio](https://resend.com/docs/add-a-domain), [no chocar con los MX](https://resend.com/docs/knowledge-base/how-do-i-avoid-conflicting-with-my-mx-records)):

- El dashboard muestra DKIM y SPF como TXT y MX, o como CNAME. Para dominios creados después de agosto de 2026 Resend puede entregar CNAME en vez del par MX+TXT. Manda lo que diga la pestaña Records.
- El MX o CNAME de envío va en el host de return-path que muestre Resend (en las guías suele ser `send`), no en el MX del ápice.
- No tocar los MX del ápice de `vientonorte.io`. El correo que llega a `contacto@` tiene que seguir yendo adonde va hoy.
- No tocar el TXT `_dmarc` que ya existe. Si Resend ofrece un DMARC opcional, se deja el registro actual.
- Si el registro es un CNAME, en Cloudflare va en DNS only (nube gris). El proxy naranja impide la verificación. Un CNAME no puede convivir con otros registros en el mismo nombre: si `send.vientonorte.io` ya tiene algo, hay que elegir otro return-path en Resend o no pisarlo.
- La verificación suele cerrar en unos 15 minutos y a veces tarda hasta 72 horas. El estado lo dice el dashboard.

### 3. KV

El namespace ya está creado y el id está en `wrangler.jsonc`. No volver a correr `kv namespace create` ni cambiar ese id. El detalle, y lo que sigue pausado, está en [DEPLOY-CHECKLIST.md](./DEPLOY-CHECKLIST.md).

### 4. Durable Object

`wrangler.jsonc` declara el binding `OUTREACH_COUNTER` y la migración `v1` (`new_sqlite_classes`: `OutreachCounter`, SQLite). El namespace se crea en el próximo deploy manual. Los tests y el dry-run de CI no lo crean ni despliegan el worker.

Sin ese binding en runtime, `OUTREACH_MODE=live` responde 503 `live_gate` y no llama a Resend. Con el binding, live usa el objeto para el tope y el dedupe del webhook. El modo test sigue en KV para el tope.

### 5. Access y hostname

Hecho: la aplicación self-hosted de `outreach.vientonorte.io`, el service token y el Bypass del path exacto `POST /webhook/resend`. `TEAM_DOMAIN`, `POLICY_AUD` y la ruta ya están en `wrangler.jsonc`. El Client ID y el Client Secret los tiene TL, fuera del repo. No son secretos del worker. Con `workers_dev` y `preview_urls` en false no hay URL `*.workers.dev`. El primer deploy crea el DNS del custom domain y espera el OK de Rö.

```jsonc
"routes": [
  { "pattern": "outreach.vientonorte.io", "custom_domain": true }
]
```

Así quedó armado en Zero Trust:

1. Access controls → Service credentials → Service tokens. Client ID y Client Secret fuera del repo, en manos de TL.
2. Access controls → Applications → aplicación self-hosted para ese hostname.
3. Política con acción Service Auth que incluya ese service token.
4. `TEAM_DOMAIN` es el issuer, con `https://`. `POLICY_AUD` es el AUD de la aplicación. Los dos están en `vars`.
5. El proveedor no puede presentar el service token. El Bypass de Access es el path exacto `/webhook/resend`: sin comodín, sin barra final y solo POST. `/webhook/resend/` y `/webhook/resend/x` no son el webhook; el worker responde 404. Un `svix-id` ya visto se rechaza. La firma sigue valiendo 300 s. La marca de deduplicación dura 600 s (el doble, nunca menos), así que un replay que todavía entra en esa tolerancia no encuentra la marca vencida. Con `OUTREACH_COUNTER` ligado, la marca es un claim atómico en el Durable Object. Sin ese binding el camino es KV y no es atómico: dos entregas a la vez pueden pasar las dos. `wrangler.jsonc` liga el objeto. Sin `RESEND_WEBHOOK_SECRET`, o con una firma inválida, la ruta responde 403.

### 6. Secretos

Solo en el worker, nunca en git. No crear un `.env` con valores. `.dev.vars` y `.env*` están ignorados.

`RESEND_API_KEY` y `RESEND_WEBHOOK_SECRET` están en pausa mientras se elige el proveedor. No cargarlos todavía. Ver [DEPLOY-CHECKLIST.md](./DEPLOY-CHECKLIST.md).

```bash
cd outreach
npx --no-install wrangler secret put TEST_ALLOWLIST
```

`TEST_ALLOWLIST` es la única dirección que puede recibir correo mientras `OUTREACH_MODE` no sea `live`. La tipea Rö. No va en git. También se puede cargar como var del dashboard; el código lee `env.TEST_ALLOWLIST` en los dos casos. Vacía o ausente, el modo test responde 403.

`RESEND_API_KEY` será la API key del proveedor. `RESEND_WEBHOOK_SECRET` será el signing secret del webhook (`whsec_...`). Sin ese secreto, `POST /webhook/resend` responde 403.

El webhook, cuando el hostname y el Bypass ya existen, apunta a `https://<hostname>/webhook/resend` y escucha `email.bounced` y `email.complained`. La firma se calcula sobre el body crudo.

### 7. Deploy

Solo humano, después del OK de Rö: el primer deploy crea el DNS de `outreach.vientonorte.io`. Comando:

```bash
cd outreach && npm ci && npx --no-install wrangler deploy --keep-vars
```

`--keep-vars` no borra vars ni secretos que ya estén en el dashboard. `OUTREACH_MODE` queda en `test` mientras nadie lo cambie a `live`.

Wrangler está pinneado en `4.86.0`. El dry-run local (no despliega) es:

```bash
cd outreach && npx --no-install wrangler deploy --dry-run
```

## Prueba de humo (un solo `[PRUEBA]`)

1. Confirmar que `OUTREACH_MODE` es `test` y que `TEST_ALLOWLIST` (secreto o var del dashboard, no el archivo de config) tiene una sola dirección: la que debe recibir la prueba.
2. Mandar un solo `POST /send` a esa dirección. El asunto tiene que salir con el prefijo `[PRUEBA] `.
3. Cualquier otro destinatario responde 403 y Resend no se llama.

```bash
curl -sS -X POST "https://outreach.vientonorte.io/send" \
  -H "Content-Type: application/json" \
  -H "CF-Access-Client-Id: $CF_ACCESS_CLIENT_ID" \
  -H "CF-Access-Client-Secret: $CF_ACCESS_CLIENT_SECRET" \
  -d '{
    "to": "<la dirección de TEST_ALLOWLIST>",
    "subject": "Prueba de plantilla",
    "fields": {
      "empresa": "Viento Norte",
      "hallazgo": "Prueba de contraste del botón de contacto.",
      "servicio_ancla": "revision-gratis",
      "rubro": "estudio"
    }
  }'
```

Respuesta esperada: 200, con `template` `prospeccion-v1`. En la bandeja de la dirección del allowlist, el asunto empieza por `[PRUEBA] `. El cuerpo trae la línea para responder «BAJA» a `contacto@vientonorte.io`. No pasar a `live` en esta prueba.

## Cuerpo de `POST /send`

```json
{
  "to": "una-sola-direccion@ejemplo.cl",
  "subject": "Asunto",
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

El worker calcula `link`, `kicker`, `oferta`, `preheader` y `rubro_slug`. El preheader es el hallazgo: si pasa de 110 caracteres, se corta en el último espacio en o antes de 110, se recorta el final y se le agrega `…`. El link es `https://vientonorte.io/servicios/?utm_source=email&utm_medium=prospeccion&utm_campaign=<rubro>#<ancla>`. No acepta un precio (`$` y un dígito) ni «web gratis». «Revisión gratis» y «revisión gratuita» sí están en la copia del ancla `revision-gratis`.

El JSON hacia Resend lleva `headers["List-Unsubscribe"]` = `<mailto:contacto@vientonorte.io?subject=baja>`. No lleva `List-Unsubscribe-Post`: el one-click de RFC 8058 exige una URI HTTPS y este worker no tiene endpoint de baja. El HTML no carga imágenes remotas.

`POST /suppress` acepta `{ "email": "a@b.cl", "reason": "baja" }` o `{ "emails": ["a@b.cl"] }`. `reason` puede ser `baja`, `bounce`, `complaint` o `manual`.

## Tests

```bash
cd outreach && npm ci && npm test
```

Cubren auth fail-closed, el live gate (503 sin el Durable Object, envío con un mock del objeto, y un humo en workerd donde `OUTREACH_COUNTER` es un objeto), tope 10 → 429, rollback del cupo con la clave reservada en un 4xx o 5xx de Resend aunque cambie el día de Santiago, cupo retenido si la llamada hace timeout, abort o falla de red, log sin crash si la devolución lanza, supresión, modo test (destinatario y prefijo `[PRUEBA] `), la forma del payload (`from`, `reply_to`, `html`, `text`, `List-Unsubscribe`), el preheader y el header sin `<img>`, replay de `svix-id` dentro de la ventana, TTL de dedupe mayor que la tolerancia de la firma, y que un rechazo no llame a Resend.
