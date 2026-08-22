# GTM kick-off · wire de conversión

**Estado código:** dataLayer + `initGTM` listos.  
**Contenedor:** `GTM-PM5LBQRP` (Web · Viento Norte / vientonorte.io).  
**GA4:** `G-G7JXJKGCDV` — solo como **Etiqueta de Google** dentro de GTM.  
**Secret:** `VITE_GTM_ID` seteado 2026-08-15. **No** `VITE_GA_MEASUREMENT_ID` (apuesta A: no segundo snippet gtag).  
**Measurement Protocol (Worker):** secreto `GA4_MP_API_SECRET` (apodo GA4 `ia`) vía `wrangler secret put`.  
`GA4_MEASUREMENT_ID=G-G7JXJKGCDV` en `worker/wrangler.toml`.  
El Worker manda `generate_lead` / `book_call` al persistir lead o agenda. **Nunca** commitear el valor del secreto.

**Anti-patrón:** no pegar el snippet GTM ni el de `gtag.js` en el `index.html` del SPA (ahí entra por `VITE_GTM_ID` + `initGTM`).  
**Share `/s/consultoria`:** snippet **GTM-PM5LBQRP** (mismo contenedor que el SPA). **No** gtag.js paralelo (duplica `page_view`). GA4 entra como Etiqueta de Google en el contenedor.

El ID es público (sale en el bundle). El valor vive en GitHub Secrets para no hardcodear.

## 1. Contenedor (hecho)

1. [Google Tag Manager](https://tagmanager.google.com/) → cuenta **Viento Norte** → contenedor **vientonorte.io** (Web) → `GTM-PM5LBQRP`.
2. Repo:

```bash
gh secret set VITE_GTM_ID -R vientonorte/mi-portafolio -b 'GTM-PM5LBQRP'
# no setear VITE_GA_MEASUREMENT_ID (= G-G7JXJKGCDV). Eso carga gtag.js
# en paralelo a GTM y duplica page_view.
```

3. Redeploy Pages (`workflow_dispatch` Deploy to GitHub Pages). Vite recibe `VITE_GTM_ID`.

## 2. Tags de conversión (mismo contenedor)

Trigger tipo **Custom Event** · `Event name` = nombre de `dataLayer.event`:

| Evento | Uso | Conversión |
|--------|-----|------------|
| `generate_lead` | Free a11y / Calendar o form | **Sí** (lead) |
| `submit_contact_form` | Form / asistente OK | **Sí** si `success=true` |
| `book_call` | Click agenda 30 min | **Sí** (micro) |
| `page_view` | HashRouter path | No (métrica) |
| `hero_path_card` | Camino hero | No |
| `home_package_select` | Pack home | No |

Variables de capa de datos: `lead_type`, `channel`, `origin`, `package_id`, `page_path`.

GA4: un tag **GA4 Event** por conversión, event name igual al custom event (o `generate_lead` → GA4 `generate_lead`).

### v3 · receta UI (humano · no hay MCP GTM)

1. Etiquetas → Nueva → **Google Analytics: evento de GA4**.
2. ID de medición: `G-G7JXJKGCDV` (o “Etiqueta de Google” existente).
3. Nombre del evento: `generate_lead`.
4. Activador: **Evento personalizado** · nombre `generate_lead`.
5. Repetir para `book_call`.
6. Enviar → Publicar versión `v3 eventos lead`.
7. GA4 → Admin → Eventos clave → marcar esos dos.

`package_id` via dataLayer (`radar` | `marco` | `ops`).

## 3. QA

```text
vientonorte.io → DevTools → window.dataLayer
Clic agenda o envío de form
Filtrar event === 'generate_lead' | 'book_call' | 'submit_contact_form'
GTM Preview: el tag de conversión se dispara
```

## Anti-patrón

No pegar el snippet GTM a mano en `index.html`. El ID entra por env de build y `AnalyticsProvider` llama `initGTM`.
