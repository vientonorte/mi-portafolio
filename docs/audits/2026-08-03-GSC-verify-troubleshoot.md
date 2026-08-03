# GSC verify troubleshoot · 2026-08-03

## Live check (agente)
```
curl -sL https://vientonorte.io/google5858e011b32ea566.html
# → google-site-verification: google5858e011b32ea566.html
# HTTP 200 · Googlebot UA también 200
```

## Si GSC dice “no se ha encontrado el archivo”

1. **Tipo de propiedad**
   - Debe ser **prefijo de URL**: `https://vientonorte.io/` (con https, sin www).
   - Si es **Dominio** (`sc-domain:vientonorte.io`) el método Archivo HTML **no aplica** → usar **DNS TXT**.
   - Si es `https://www.vientonorte.io/` → 301 a apex; mejor verificar **sin www**.

2. **Abrir en el navegador** (no solo confiar en GSC):
   https://vientonorte.io/google5858e011b32ea566.html  
   Debe verse **una línea** de texto, no la SPA.

3. **Reintentar Verificar** 2–5 min tras deploy (CDN).

4. **Alternativa: etiqueta HTML** (GSC → Otros métodos → copiar el `content="..."` real)  
   Pegar en `index.html` head — **no** inventar token.

5. **Alternativa DNS** (más robusta para dominio):
   GSC → Proveedor de nombres de dominio → copiar registro TXT  
   Añadir en el DNS de vientonorte.io (donde apunte el dominio).

## No borrar
El archivo debe permanecer en `public/` tras verificar.
