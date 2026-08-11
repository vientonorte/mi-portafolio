# QA: errores 404 / 500 / 503 visibles

En **HashRouter + GitHub Pages**, casi todo devuelve HTTP 200 del shell. Los códigos **404 / 500 / 503 que ve el usuario son de la app**, no del servidor. Si solo corremos `curl` de happy-path, **nunca fallan las cargas rotas** y el UI de error parece “desaparecido”.

## Superficies

| Código | Cuándo | Dónde se pinta |
|--------|--------|----------------|
| **404** | Ruta hash desconocida / proyecto / proceso no existe | `NotFoundPage` — número grande + `data-error-status="404"` |
| **404** | Imagen `src` falla (`onError`) | `ResponsiveImage` — badge rojo **404** + “Imagen no encontrada” |
| **503** | Fallo de chunk lazy post-deploy / SW stale | `ErrorBoundary` — un reload auto, luego UI **503** |
| **500** | Error de render React no recuperable | `ErrorBoundary` — UI **500** |

## Por qué no los veías

1. **Rutas:** `NotFoundPage` solo decía un párrafo sin el número 404.
2. **Imágenes:** fallback era un SVG gris sin etiqueta.
3. **Chunks:** un reload silencioso; si fallaba de nuevo, “Oops” genérico sin 503.
4. **`qa:production`:** solo comprobaba HTTP 200 (home, robots, bundle). Nunca un asset 404 ni strings de error en el bundle.

## Proceso a producción (orden)

```text
1. Local
   npm run qa:error-ui          # unit + markers
   npm run dev
   # humano: #/ruta-inexistente → 404

2. Pre-merge
   npm run preprod:quick        # typecheck + unit + build
   npm run preprod              # + dist smoke

3. Post-merge Pages
   npm run qa:production        # domain + assets + probe 404 red + bundle error UI
   BASE_URL=https://vientonorte.io/qa npm run qa:production   # si QA env

4. Humano 2 min en prod
   https://vientonorte.io/#/esto-no-existe     → 404 grande
   Network → bloquear 1 imagen en #/sobre-mi  → badge 404
```

## Comandos

| Script | Rol |
|--------|-----|
| `npm run qa:error-ui` | Gate local de UI de error |
| `npm run qa:production` | Smoke prod + 404 de red + bundle markers |
| `npm run preprod` | Gate FO antes de merge |

## Reproducir en local

```bash
# 404 de ruta
open 'http://127.0.0.1:5173/#/pagina-que-no-existe'

# 404 de imagen (cualquier ResponsiveImage con src inventado en React DevTools,
# o temporalmente fuerza src="/__broken__.png")

# 503 chunk (simular)
# En consola, tras cargar:
sessionStorage.removeItem('rg-chunk-reload')
# Forzar error de tipo chunk (ErrorBoundary clasifica por mensaje):
# throw new Error('Failed to fetch dynamically imported module')
```

## DoD

- [ ] `#/ruta-falsa` muestra **404** legible en móvil
- [ ] Imagen rota muestra badge **404** (no solo icono gris)
- [ ] Fallo de chunk muestra **503** (no pantalla blanca)
- [ ] `qa:production` falla si falta el bundle o si un probe de asset inventado devuelve 200
- [ ] `qa:error-ui` verde en CI/local antes de merge de cambios de error UI
