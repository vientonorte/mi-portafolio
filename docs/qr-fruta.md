# Contador QR FRUTA

Worker `mi-portafolio-contact` (host público: `https://contact.vientonorte.io`, custom domain en `worker/wrangler.toml`).
Código: `worker/src/api/qr-fruta.js` · tests: `worker/src/__tests__/qr-fruta.test.js`.

## URLs de los QR

Allowlist estática en `worker/src/qr-points.ts` (12 puntos `{slug, label, comuna}`; agregar uno = PR + deploy). Comunas según la ficha de cada estación en es.wikipedia.org (27-oct-2026).

| Punto | Comuna | URL |
|---|---|---|
| General | — | https://contact.vientonorte.io/q/general |
| Los Leones | Providencia | https://contact.vientonorte.io/q/los-leones |
| Universidad Católica | Santiago | https://contact.vientonorte.io/q/u-catolica |
| Universidad de Chile | Santiago | https://contact.vientonorte.io/q/u-de-chile |
| Los Héroes | Santiago | https://contact.vientonorte.io/q/los-heroes |
| Estación Central | Estación Central | https://contact.vientonorte.io/q/estacion-central |
| Baquedano | Providencia | https://contact.vientonorte.io/q/baquedano |
| Unión Latinoamericana | Santiago | https://contact.vientonorte.io/q/union-latinoamericana |
| Las Rejas | Estación Central / Lo Prado | https://contact.vientonorte.io/q/las-rejas |
| Pajaritos | Lo Prado | https://contact.vientonorte.io/q/pajaritos |
| San Pablo | Lo Prado | https://contact.vientonorte.io/q/san-pablo |
| Plaza de Maipú | Maipú | https://contact.vientonorte.io/q/plaza-de-maipu |

Cada una responde `302` al Google Form
`https://docs.google.com/forms/d/e/1FAIpQLSfRpG5wLwm2jJp2AjCGsyFGFxyJEPWB4c0UBvwUSOerrEtjXg/viewform`
con `Cache-Control: no-store` y `Referrer-Policy: no-referrer`. Cualquier otro punto → `404`.

`?p=` queda reservado para prellenado futuro: solo se reenvían claves `entry.<dígitos>` presentes en
`QR_PREFILL_ALLOWLIST` (hoy vacía → no se reenvía nada).

## Conteo

KV `ADMIN_KV` (binding existente), claves:

- `qr:<punto>:<YYYY-MM-DD>` — día en horario America/Santiago
- `qr:<punto>:total`

Si el incremento falla, igual se redirige (`ctx.waitUntil` + catch).

**El conteo es aproximado:** KV no tiene incrementos atómicos (read-modify-write) y es eventualmente
consistente; escaneos simultáneos pueden perder incrementos. Sirve para tendencias, no para auditoría.

## Ver el conteo

Dos secrets (los carga Rö; nunca en el repo ni en el chat):

- `QR_VIEW_KEY` — llave de **vista** (≥32 bytes, base64url). Ej. para generarla localmente:
  `openssl rand -base64 32 | tr '+/' '-_' | tr -d '='`, luego `cd worker && npx wrangler secret put QR_VIEW_KEY`.
- `QR_STATS_TOKEN` — token **admin** (Bearer). `cd worker && npx wrangler secret put QR_STATS_TOKEN`.

Vista móvil (HTML, totales por punto con comuna + tabla por día en fecha Chile, «actualizado a las HH:MM CL»):

```
https://contact.vientonorte.io/q/stats?k=<QR_VIEW_KEY>
https://contact.vientonorte.io/q/stats?k=<QR_VIEW_KEY>&format=json
```

Admin:

```sh
curl -s -H "Authorization: Bearer <TOKEN>" https://contact.vientonorte.io/q/stats            # JSON
curl -s -H "Authorization: Bearer <TOKEN>" "https://contact.vientonorte.io/q/stats?format=html"
```

Sin key/token, incorrectos o secret sin cargar → `401` (página mínima). Solo lectura: no hay POST ni reset.
Comparación constant-time. Headers en `/q/stats`: `Cache-Control: no-store`, `Referrer-Policy: no-referrer`,
`X-Robots-Tag: noindex`, `Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'`
(sin JS de terceros ni analytics; CSS inline, fuente del sistema).

Nota: la `?k=` va en la URL; con `no-referrer` no se filtra a otros sitios, pero queda en el historial
del navegador de quien la abra. Rotar con `wrangler secret put QR_VIEW_KEY` si se comparte de más.

## Privacidad

No se guarda IP, User-Agent ni cookies; las claves KV solo contienen punto y fecha y los valores son
números. El handler no hace `console.log` del request.

`worker/wrangler.toml` tiene `[observability] enabled = true` con
`[observability.logs] invocation_logs = false`: Workers Logs **no** registra la metadata de
invocación (URL, headers, IP de Cloudflare) de ningún request del worker, incluido `/q/*`.
Solo quedarían líneas `console.*` explícitas del código (ninguna con PII). Efecto real recién
con el próximo deploy (orden TL).
