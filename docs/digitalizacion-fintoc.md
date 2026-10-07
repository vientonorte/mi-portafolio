# Digitalización de tu negocio · integración con Fintoc (MVP)

Estado: **MVP de prueba, noindex**. Rutas SPA (HashRouter):

| Ruta | Qué es |
| --- | --- |
| `/#/digitalizacion` | Landing de la oferta (Web → Cobros → Dashboard). |
| `/#/digitalizacion/demo` | Dashboard de caja con **datos de ejemplo** (pyme ficticia). |

Fuera de sitemap, nav y footer: el shell del sitio se oculta con `shouldHideSiteChrome` (`src/vn-core/routes.ts`).
`SEOHead noIndex` inyecta `<meta name="robots" content="noindex, nofollow">` al montar la ruta. Ojo: al ser
ruta hash, el HTML estático (`index.html`) sigue con `index, follow`; los crawlers no indexan fragmentos `#/…`
por separado, así que el efecto práctico es el mismo mientras no se agregue al sitemap.

Viento Norte **no tiene alianza oficial con Fintoc**: en el copy decimos "integración con Fintoc" / "usa la API de Fintoc".

## Archivos

- `src/pages/Digitalizacion.tsx`, `src/pages/DigitalizacionDemo.tsx` — páginas.
- `src/lib/digitalizacion/offer.ts` — WhatsApp (`56942637408`), URL de consultoría con UTM antes del hash, eventos GTM.
- `src/lib/digitalizacion/cashflow.ts` — categorización por reglas + agregación mensual (puro, testeado).
- `src/lib/digitalizacion/sample.ts` + `src/data/digitalizacion-sample-movements.json` — datos de ejemplo (forma `account`/`movement` de Fintoc). Generados de forma determinista, sin datos reales.
- `src/lib/digitalizacion/fintoc-movements-adapter.ts` — adaptador **solo servidor** (no importar desde el cliente).

Eventos `dataLayer`: `digitalizacion_cta_click` (`location`, `destination`), `digitalizacion_whatsapp_click`, `digitalizacion_demo_view` (`sample`).

## Adaptador Fintoc Movements

Sin `FINTOC_SECRET_KEY` + `FINTOC_LINK_TOKEN` devuelve los datos de ejemplo con `"sample": true`. Con ambas:

1. `GET https://api.fintoc.com/v1/accounts?link_token=<link_token>` con header `Authorization: <secret_key>`.
2. Elige `FINTOC_ACCOUNT_ID` o la primera `checking_account`.
3. `GET https://api.fintoc.com/v1/accounts/{id}/movements?link_token=<link_token>&per_page=300[&since&until]`, siguiendo el header `Link` (`rel="next"`) hasta 10 páginas.

El secreto y el `link_token` nunca se devuelven al cliente ni se loguean (los errores solo exponen el status HTTP).

### Dónde montarlo (pendiente)

La SPA se publica estática en GitHub Pages (`deploy.yml`) y el repo **no tiene funciones serverless `/api`** para
la SPA (el proyecto de Vercel conectado es `ads-query`, un servidor Node aparte). Por eso no se agregó
infraestructura. Cuando exista un runtime de servidor, basta con:

```ts
// api/fintoc/movements.ts (Vercel Functions, runtime Node/Edge)
import { createMovementsHandler } from "../../src/lib/digitalizacion/fintoc-movements-adapter";
export const GET = (req: Request) => createMovementsHandler(process.env)(req);
```

…o el equivalente en el Worker de Cloudflare (`worker/`), sin exponer el secreto al bundle del cliente.
Además hace falta autenticar al cliente final (cada pyme ve solo su Link) antes de exponerlo.

## Sandbox de Fintoc (TODO: claves)

1. Crear cuenta en el Dashboard de Fintoc y activar **modo test**.
2. Copiar la **secret key de test** (`sk_test_…`) y la **public key** (`pk_test_…`). La secret va solo a variables de entorno del servidor (`FINTOC_SECRET_KEY`), nunca al repo ni a `VITE_*`.
3. Crear un Link con el **widget de Fintoc** (producto `movements`, país `cl`, `holder_type: business`) usando la public key; en test se usan las credenciales de prueba que indica la documentación de Fintoc.
4. El widget entrega un `exchange_token`; el servidor lo canjea por el `link_token` (`GET /v1/links/exchange?exchange_token=…` con la secret) y lo guarda del lado del servidor (`FINTOC_LINK_TOKEN` para el piloto; base de datos cifrada después).
5. Probar: `curl -H "Authorization: $FINTOC_SECRET_KEY" "https://api.fintoc.com/v1/accounts?link_token=$FINTOC_LINK_TOKEN"`.

Para **Cobros** (Iniciación de Pagos) se usa otro producto de Fintoc (payment intents / checkout sessions); no está implementado en este MVP.

## Pricing de Fintoc (referencia, no es nuestro precio)

El pricing de Fintoc va **por contrato y por tramos de volumen**. Ejemplo publicado en su centro de ayuda para
Iniciación de Pagos: **0,004 UF + IVA por pago exitoso en el tramo 0–3.000 pagos**; puede existir un **mínimo mensual**.
Confirmar con Fintoc antes de cotizar. Los precios de VN para Cobros y Dashboard siguen en `TODO_PRECIO`.

## Pendientes para salir de MVP

- `TODO_PRECIO`: precio de Cobros y de Dashboard (Decider).
- Claves sandbox de Fintoc y runtime de servidor para el adaptador.
- OK del Decider para quitar `noIndex`, agregar al sitemap y/o a la navegación.
