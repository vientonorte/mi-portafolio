# POC modules · mockups X|CMS

Capturas live del producto **X|CMS** (Figma Sites) para la landing oferta (histórico: `/#/consultoria`; hoy X|CMS se muestra en `https://vientonorte.io/servicios/#consultoria-ux`).

| Archivo | Nav X\|CMS |
|---------|------------|
| `dashboard.png` | Dashboard |
| `riesgo.png` | Dashboard Financiero |
| `inventario.png` | Productos |
| `pedidos.png` | POS |
| `clientes.png` | Clientes |
| `reportes.png` | Reportes |

**Regenerar:**

```bash
XCMS_DEMO_USER=… XCMS_DEMO_PASS=… bash scripts/capture-poc-modules.sh
```

Demo login (solo captura): usuario admin de la pantalla de login de la demo, vía `XCMS_DEMO_USER` / `XCMS_DEMO_PASS` (no se versiona la contraseña)  
Fuente: https://pouch-growl-74881457.figma.site

`pos-mobile.(png|webp)` — recorte vertical 500×820 de `pedidos.png` (módulo POS) para el marco de teléfono del hero de `/servicios/`.
