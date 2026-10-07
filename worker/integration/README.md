# Tests de integración del worker (Miniflare)

Corren el `fetch` handler real (`../src/index.js`) dentro de `workerd` con
[`@cloudflare/vitest-pool-workers`](https://developers.cloudflare.com/workers/testing/vitest-integration/):

- KV `ADMIN_KV` y R2 `IMAGES_BUCKET` reales en memoria (Miniflare);
- binding `EMAIL` (send_email) mockeado: los tests verifican qué se enviaría;
- fetch saliente (FormSubmit, GA4 MP) mockeado; `outboundService` bloquea cualquier request que se escape;
- el webhook Apps Script → `/api/booking` se simula como request con `X-VN-BOOKING-KEY`.

```bash
cd worker/integration
npm ci --legacy-peer-deps
npm test
```

Paquete aparte para no modificar `worker/package-lock.json` (el wrangler con el que se despliega).
Los bindings se definen inline en `vitest.config.js` y deben seguir alineados con `worker/wrangler.toml`.
Nada aquí hace deploy ni habla con Cloudflare.
