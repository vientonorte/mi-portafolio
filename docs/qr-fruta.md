# Contador QR FRUTA

Worker `mi-portafolio-contact` (host público: `https://contact.vientonorte.io`, custom domain en `worker/wrangler.toml`).
Código: `worker/src/api/qr-fruta.js` · tests: `worker/src/__tests__/qr-fruta.test.js`.

## URLs de los QR

Allowlist estática en `worker/src/qr-points.ts` (12 puntos; agregar uno = PR + deploy).

| Punto | URL |
|---|---|
| general | https://contact.vientonorte.io/q/general |
| los-leones | https://contact.vientonorte.io/q/los-leones |
| u-catolica | https://contact.vientonorte.io/q/u-catolica |
| u-de-chile | https://contact.vientonorte.io/q/u-de-chile |
| los-heroes | https://contact.vientonorte.io/q/los-heroes |
| estacion-central | https://contact.vientonorte.io/q/estacion-central |
| baquedano | https://contact.vientonorte.io/q/baquedano |
| union-latinoamericana | https://contact.vientonorte.io/q/union-latinoamericana |
| las-rejas | https://contact.vientonorte.io/q/las-rejas |
| pajaritos | https://contact.vientonorte.io/q/pajaritos |
| san-pablo | https://contact.vientonorte.io/q/san-pablo |
| plaza-de-maipu | https://contact.vientonorte.io/q/plaza-de-maipu |

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

Secret (lo carga Rö, nunca en el repo ni en el chat):

```sh
cd worker && npx wrangler secret put QR_STATS_TOKEN
```

```sh
# JSON
curl -s -H "Authorization: Bearer <TOKEN>" https://contact.vientonorte.io/q/stats
# Tabla HTML
curl -s -H "Authorization: Bearer <TOKEN>" "https://contact.vientonorte.io/q/stats?format=html"
```

Sin token o token incorrecto → `401` (también si el secret no está cargado).

## Privacidad

No se guarda IP, User-Agent ni cookies; las claves KV solo contienen punto y fecha y los valores son
números. El handler no hace `console.log` del request.

`worker/wrangler.toml` tiene `[observability] enabled = true` con
`[observability.logs] invocation_logs = false`: Workers Logs **no** registra la metadata de
invocación (URL, headers, IP de Cloudflare) de ningún request del worker, incluido `/q/*`.
Solo quedarían líneas `console.*` explícitas del código (ninguna con PII). Efecto real recién
con el próximo deploy (orden TL).
