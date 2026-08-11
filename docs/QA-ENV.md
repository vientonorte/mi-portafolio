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
