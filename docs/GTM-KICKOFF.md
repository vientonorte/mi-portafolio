# GTM kick-off · wire de conversión

**Estado código:** dataLayer + `initGTM` listos.  
**Estado prod:** sin `VITE_GTM_ID` en GitHub Secrets → el HTML live **no** carga `gtm.js`.

No hay `GTM-XXXX` en el vault. El contenedor se crea una vez en tagmanager.google.com (cuenta Viento Norte).

## 1. Crear contenedor (humano, 2 min)

1. [Google Tag Manager](https://tagmanager.google.com/) → cuenta **Viento Norte** → contenedor **vientonorte.io** (Web).
2. Copiar el ID `GTM-XXXXXXX`.
3. En el repo:

```bash
gh secret set VITE_GTM_ID -R vientonorte/mi-portafolio -b 'GTM-XXXXXXX'
# opcional, mismo contenedor + GA4:
# gh secret set VITE_GA_MEASUREMENT_ID -R vientonorte/mi-portafolio -b 'G-XXXXXXXX'
```

4. Redeploy Pages (`workflow_dispatch` Deploy to GitHub Pages). El build ya pasa `VITE_GTM_ID` a Vite.

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
