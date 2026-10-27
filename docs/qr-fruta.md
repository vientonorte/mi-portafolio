# Contador QR FRUTA

Worker `mi-portafolio-contact` (host público: `https://contact.vientonorte.io`, custom domain en `worker/wrangler.toml`).
Código: `worker/src/api/qr-fruta.js` · tests: `worker/src/__tests__/qr-fruta.test.js`.

## URLs de los QR

| Punto | URL |
|---|---|
| general | https://contact.vientonorte.io/q/general |
| Unión Latinoamericana | https://contact.vientonorte.io/q/union-latinoamericana |
| Pajaritos | https://contact.vientonorte.io/q/pajaritos |
| Las Rejas | https://contact.vientonorte.io/q/las-rejas |
| U. Católica | https://contact.vientonorte.io/q/u-catolica |
| Estación Central | https://contact.vientonorte.io/q/estacion-central |

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
números. El handler no hace `console.log` del request. Nota: `[observability]` está activo en
`wrangler.toml` (Workers Logs registra metadata de invocación de Cloudflare); si se quiere cero
metadata para `/q/*`, evaluar `head_sampling_rate` o desactivarlo — decisión aparte.
