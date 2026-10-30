# QR FRUTA · conteos de prueba

El worker guarda conteos por día (`qr:<slug>:<fecha>`), no por hora. Por eso las pruebas se separan con una lista fija en `worker/src/api/qr-exclusions.js` (slug + fecha + motivo).

Rö, 30-oct 11:41: **la única prueba fue el primer escaneo del 27-oct. Todo lo demás es real.**

| Slug | Fecha | Unidades | Estado | Motivo |
|---|---|---|---|---|
| `*` (punto sin registrar) | 2026-10-27 | 1 | prueba | Primer escaneo de lanzamiento. |

- Se excluyen unidades (`count`), nunca un día ni un slug completo.
- `*` se resta solo del **Total real** general, no de una fila.
- **Total con pruebas** = todo lo contado.
- Grupos iguales al SSOT Figma 487:2: «Puntos de Rö», «Puntos de Jhordan», «Otros».
- Desde 2026-10-30 los códigos marcan el lugar donde se pegan: MAT — (lugar por confirmar) · CMO Pajaritos acceso/boletería · PZA Pajaritos andén · PBU Pajaritos salida a buses · BEA Plaza de Maipú acceso/boletería · SIS Plaza de Maipú andén · IRZ Plaza de Maipú salida a la plaza.
- Acceso: portada `contact.vientonorte.io/` enlaza a `/q/stats` (pide clave). Atajo `/stats` → `/q/stats` (no reenvía la clave).
