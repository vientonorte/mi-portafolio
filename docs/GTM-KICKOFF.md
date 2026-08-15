# GTM kick-off · wire de conversión

**Estado código:** dataLayer + `initGTM` listos.  
**Contenedor:** `GTM-PM5LBQRP` (Web · Viento Norte / vientonorte.io).  
**Secret:** `VITE_GTM_ID` seteado 2026-08-15. **No** `VITE_GA_MEASUREMENT_ID` (apuesta A: GA4 = tag dentro de GTM).  
**Anti-patrón:** no pegar el snippet oficial en `index.html`. El build inyecta vía `AnalyticsProvider` → `initGTM`.

El ID es público (sale en el bundle). El valor vive en GitHub Secrets para no hardcodear.

## 1. Contenedor (hecho)

1. [Google Tag Manager](https://tagmanager.google.com/) → cuenta **Viento Norte** → contenedor **vientonorte.io** (Web) → `GTM-PM5LBQRP`.
2. Repo:

```bash
gh secret set VITE_GTM_ID -R vientonorte/mi-portafolio -b 'GTM-PM5LBQRP'
# no setear VITE_GA_MEASUREMENT_ID salvo apuesta B (doble snippet)
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

## 3. QA

```text
vientonorte.io → DevTools → window.dataLayer
Clic agenda o envío de form
Filtrar event === 'generate_lead' | 'book_call' | 'submit_contact_form'
GTM Preview: el tag de conversión se dispara
```

## Anti-patrón

No pegar el snippet GTM a mano en `index.html`. El ID entra por env de build y `AnalyticsProvider` llama `initGTM`.
