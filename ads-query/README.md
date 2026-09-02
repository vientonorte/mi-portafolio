# vn-ads-query (Fase 1)

Subdirectorio **aislado** para consultar metricas de Google Ads y devolver JSON SSOT.
No reemplaza el frontend Vite/Pages en la raiz del repo (`mi-portafolio`). El FO Vite **no se toca**.

Fase 1 usa un cliente mock (fixture en disco). **No hay llamadas live a Google Ads.** No wrangler, no deploy, no mutaciones Ads.

## SSOT

Fuente de verdad de esta fase:

- `ads-query/ssot/fixture-2026-09-02.json`

Customer `811-405-3092`. Campana piloto `24184249593` (`VN · piloto a11y_gratis_pymes`).

## Alcance: piloto vs account

`POST /query` recibe JSON `{ "account": false }`.

| Body | Scope | GAQL (produccion, no Fase 1) |
|------|--------|------------------------------|
| `{}` o `{ "account": false }` | `campaign` (default) | Filtra campana piloto `24184249593` |
| `{ "account": true }` | `account` | Sin filtro de campana |

En Fase 1 ambos paths leen el mismo fixture mock. El flag `account` queda documentado para la fase live.

## Lock (no se inventan metricas extra)

Sobre cada keyword:

- `FAIL` si `finalUrl` contiene `/news` o `gtm_debug`, o no es `/s/consultoria`
- `FAIL` si `matchType` es `BROAD` y el lock dice **amplia desactivada**

Filas parseadas: `keyword`, `matchType`, `status`, `finalUrl`, `impressions`, `clicks`, `ctr`, `avgCpc`, `cost`, `conversions`, `conversionRate`, `cpa`.

## Tests

Desde este directorio:

```bash
cd ads-query
npm test
```

Equivale a `node --test src/query-processor.test.js` (sin dependencias).

## Docker

```bash
cd ads-query
docker build -t vn-ads-query .
docker run --rm -p 3000:3000 vn-ads-query
```

Compose opcional:

```bash
docker compose up --build
```

API: `POST http://localhost:3000/query` con body JSON `{ "account": false }`.

No dejar `docker run` attached de forma indefinida en CI; el contenedor es un servidor HTTP.

## Env

Copiar `.env.example` a `.env` (ignorado por git). Placeholders `GOOGLE_ADS_*` vacios en Fase 1.
