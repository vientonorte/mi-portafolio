# Ambiente QA — Viento Norte FO

## URL lista (multi-dispositivo)

| URL | Uso |
|-----|-----|
| **https://vientonorte.io/qa/#/sobre-mi** | **VB principal** (ya en hub tras Deploy QA) |
| https://vientonorte.io/qa/#/ | Home embudo en QA |
| https://vientonorte.io/#/sobre-mi | Producción (solo post-VB) |

Banner ámbar **QA · no producción** + `noindex`.

## Cómo se publica

```text
push a preview/**  o  branch qa  o  workflow_dispatch
  → .github/workflows/deploy-qa.yml
  → vite build  base=/qa/  VITE_APP_ENV=qa
  → push dist → hub vientonorte.github.io/qa/
```

## Subdominio `qa.vientonorte.io` (opcional)

Hoy el apex es GitHub Pages. Para el subdominio:

1. DNS (Cloudflare o registrar):  
   `CNAME qa → vientonorte.github.io`  
   (o registro A/AAAA a IPs de GitHub Pages).
2. En Cloudflare (si aplica): proxy DNS o redirect  
   `qa.vientonorte.io/*` → `https://vientonorte.io/qa/$1`  
   **o** Worker que reescriba path.
3. Sin redirect, el subdominio solo funciona si Pages sirve ese host en un project site dedicado.

**Mientras no haya DNS:** usar siempre **https://vientonorte.io/qa/**.

## Checklist VB

Ver [docs/VB-SOBRE-MI.md](./VB-SOBRE-MI.md).

## Worker QA (`env.qa`, contador QR)

Worker `mi-portafolio-contact-qa`, solo en workers.dev: sin rutas, sin contact.vientonorte.io, KV propio, secrets propios, sin correo ni R2. No toca tráfico, KV ni secrets de prod.

Todo desde `worker/`, con `npm ci` antes (wrangler fijado en el lock). Cada paso con orden del TL.

1. **KV QA:** `npx --no-install wrangler kv namespace create ADMIN_KV_QA` → poner el id en `[[env.qa.kv_namespaces]]` (reemplaza `REPLACE_WITH_QA_KV_ID`) por PR.
2. **Secrets (los tipea Rö, nunca un bot; valores distintos a prod):** `npx --no-install wrangler secret put QR_VIEW_KEY --env qa` y, si hace falta, `QR_STATS_TOKEN --env qa`.
3. **Deploy QA:** `npx --no-install wrangler deploy --env qa` → `https://mi-portafolio-contact-qa.<subdominio>.workers.dev`.
4. **Datos ficticios (solo en el KV QA, nunca con el id de prod):**
   `npx --no-install wrangler kv key put --remote --namespace-id <ID_QA> "qr:<slug>:2026-10-30" "3"` y `"qr:<slug>:total" "3"`, o escanear `<url-qa>/q/<slug>`. Usar slugs/conteos obviamente ficticios.
5. **QA:** `<url-qa>/q/stats`.
6. **Limpieza (con OK de Rö):** `npx --no-install wrangler delete --env qa` y `npx --no-install wrangler kv namespace delete --namespace-id <ID_QA>`.

Prod (`wrangler deploy` sin `--env`) solo con OK escrito de Rö + orden del TL.
