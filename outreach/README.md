# vn-outreach

Worker de Cloudflare **aparte** de `worker/` (el de contacto). Manda correos de prospección de Viento Norte, uno a uno, por la API REST de Resend (`POST https://api.resend.com/emails`).

- From: `Viento Norte <contacto@vientonorte.io>`
- Reply-To: `contacto@vientonorte.io`
- Plantilla `prospeccion-v1`: HTML y texto, sin precios
- `workers_dev = false` y `preview_urls = false`: no hay URL `*.workers.dev` ni preview

Este directorio no despliega nada por sí solo. El deploy lo hace Rö, a mano, con el comando de más abajo. No hay que correr `wrangler secret put` ni cambiar DNS desde el repo.

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

Modo test es el default (`OUTREACH_MODE=test`, y también cualquier valor que no sea exactamente `live`, incluido vacío). En test el destinatario tiene que estar en `TEST_ALLOWLIST` y el asunto sale con el prefijo `[PRUEBA] `. Si `TEST_ALLOWLIST` falta o está vacía, `/send` responde 403 y no llama a Resend. `live` es un cambio explícito de esa var, y además exige el live gate del tope (Durable Object). El JWT de Access tiene que ser de aplicación: `type` exactamente `app`.

Tope: 10 envíos en el día de `America/Santiago`. El worker reserva el cupo en KV antes de llamar a Resend y lo devuelve si Resend no acepta el envío. Con el contador en 10, el siguiente responde 429.

Limitación conocida: KV no tiene incremento atómico. Dos `/send` a la vez pueden leer el mismo número y los dos pasar. La atomicidad de verdad es un Durable Object. **Live gate:** no pasar `OUTREACH_MODE` a `live` hasta que ese contador atómico exista. El modo test puede usar el contador de KV.

Lista de baja: `/send` no escribe a una dirección suprimida (409). Un rebote permanente (`email.bounced` con `bounce.type = Permanent`) o una queja (`email.complained`) suprime esas direcciones y deja un corte global: todo `/send` responde 409 `halted` hasta `POST /resume`. El resume no saca a nadie de la lista de baja. Un rebote transitorio solo queda en el log.

Cada intento de envío deja en KV `log:<id>` con `id`, `to` (tal como llegó, ya validado), `template`, `timestamp`, `resend_id`, `result` y `error`. El registro vence a los 90 días. No se guarda nombre, empresa ni hallazgo. El `console.log` tampoco lleva destinatario ni JWT.

Los traces están apagados (`observability.traces.enabled: false`) y los invocation logs también. Un trace o un invocation log puede guardar headers, incluido el JWT de Access y los de Svix. No se almacenan.

## Setup para Rö

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

El `id` commiteado es un placeholder. Hay que crear el namespace y pegar el id real en `wrangler.jsonc` antes de desplegar. Si no, el binding no apunta a nada.

```bash
cd outreach
npm ci
npx wrangler kv namespace create OUTREACH_KV
```

Copiar el id a `kv_namespaces[0].id`.

### 4. Access y hostname

Hoy el worker no tiene ruta. Con `workers_dev` y `preview_urls` en false, un deploy no abre una URL pública. La ruta se agrega cuando la aplicación de Access ya existe. Hostname sugerido, a confirmar por Rö: `outreach.vientonorte.io`.

```jsonc
"routes": [
  { "pattern": "outreach.vientonorte.io", "custom_domain": true }
]
```

En Zero Trust:

1. Access controls → Service credentials → Service tokens → crear uno. Guardar Client ID y Client Secret fuera del repo. No son secretos del worker.
2. Access controls → Applications → aplicación self-hosted para ese hostname.
3. Política con acción Service Auth que incluya ese service token.
4. Copiar el Application Audience (AUD) tag.
5. Poner las dos vars en `wrangler.jsonc` (no son secretos). `TEAM_DOMAIN` es el issuer, con `https://`:

```jsonc
"TEAM_DOMAIN": "https://<equipo>.cloudflareaccess.com",
"POLICY_AUD": "<aud de la aplicación>"
```

6. Resend no puede presentar el service token. El Bypass de Access tiene que ser el path exacto `/webhook/resend`: sin comodín, sin barra final y, si el panel deja elegir el método, solo POST. `/webhook/resend/` y `/webhook/resend/x` no son el webhook; el worker responde 404. Un `svix-id` ya visto dentro de los 300 s se rechaza. Sin `RESEND_WEBHOOK_SECRET`, o con una firma inválida, la ruta responde 403.

Hasta que `TEAM_DOMAIN` y `POLICY_AUD` sean válidos, el worker responde 403 sin llamar a Resend.

### 5. Secretos

Solo en el worker, nunca en git. No crear un `.env` con valores. `.dev.vars` y `.env*` están ignorados.

```bash
cd outreach
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put RESEND_WEBHOOK_SECRET
npx wrangler secret put TEST_ALLOWLIST
```

`TEST_ALLOWLIST` es la única dirección que puede recibir correo mientras `OUTREACH_MODE` no sea `live`. No va en git. También se puede cargar como var del dashboard; el código lee `env.TEST_ALLOWLIST` en los dos casos. Vacía o ausente, el modo test responde 403.

`RESEND_API_KEY` es la API key de Resend. `RESEND_WEBHOOK_SECRET` es el signing secret del webhook (`whsec_...`), en el detalle del webhook en Resend. Sin ese secreto, `POST /webhook/resend` responde 403.

El webhook, cuando el hostname y el Bypass ya existen, apunta a `https://<hostname>/webhook/resend` y escucha `email.bounced` y `email.complained`. La firma se calcula sobre el body crudo.

### 6. Deploy

Solo humano, después de los pasos de arriba. Comando:

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

El worker calcula `link`, `kicker`, `oferta`, `preheader` y `rubro_slug`. El link es `https://vientonorte.io/servicios/?utm_source=email&utm_medium=prospeccion&utm_campaign=<rubro>#<ancla>`. No acepta un precio (`$` y un dígito) ni «web gratis». «Revisión gratis» y «revisión gratuita» sí están en la copia del ancla `revision-gratis`.

`POST /suppress` acepta `{ "email": "a@b.cl", "reason": "baja" }` o `{ "emails": ["a@b.cl"] }`. `reason` puede ser `baja`, `bounce`, `complaint` o `manual`.

## Tests

```bash
cd outreach && npm ci && npm test
```

Cubren auth fail-closed, tope 10 → 429, supresión, modo test (destinatario y prefijo `[PRUEBA] `), la forma del payload de Resend (`from`, `reply_to`, `html`, `text`) y que un rechazo no llame a Resend.
