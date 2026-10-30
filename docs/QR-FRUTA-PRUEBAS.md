# QR FRUTA · conteos de prueba

El worker guarda conteos por día (`qr:<slug>:<fecha>`), no por hora. Por eso las pruebas se separan con una lista fija en `worker/src/api/qr-exclusions.js` (slug + fecha + motivo).

Pruebas confirmadas (30-oct): **13**. 1 de Rö (27-oct), 3 de M5 en facebook (29-oct 17:55–18:00 CL) y 9 del TL (29-oct 17:58 CL, 1 por slug). Real = 50 − 13 = **37** (50 guardados en prod). El 59/46 era solo el fixture del test, nunca prod.

| Slug | Fecha | Unidades | Estado | Motivo |
|---|---|---|---|---|
| `*` (punto sin registrar) | 2026-10-27 | 1 | prueba | Primer escaneo de lanzamiento. |
| `facebook` | 2026-10-29 | 4 | prueba | 3 smoke M5 + 1 smoke TL. |
| `av-matta` | 2026-10-29 | 1 | prueba | Smoke TL 17:58 CL. |
| `compania-morande` | 2026-10-29 | 1 | prueba | Smoke TL 17:58 CL. |
| `plaza-de-armas` | 2026-10-29 | 1 | prueba | Smoke TL 17:58 CL. |
| `parque-bustamante` | 2026-10-29 | 1 | prueba | Smoke TL 17:58 CL. |
| `bellas-artes` | 2026-10-29 | 1 | prueba | Smoke TL 17:58 CL. |
| `santa-isabel` | 2026-10-29 | 1 | prueba | Smoke TL 17:58 CL. |
| `irarrazaval` | 2026-10-29 | 1 | prueba | Smoke TL 17:58 CL. |
| `los-leones` | 2026-10-29 | 1 | prueba | Smoke TL 17:58 CL. |

- Se excluyen unidades (`count`), nunca un día ni un slug completo.
- `*` se resta solo del **Total real** general, no de una fila.
- **Total con pruebas** = todo lo contado.
- Grupos iguales al SSOT Figma 487:2: «Puntos de Rö», «Puntos de Jhordan», «Otros».
- Desde 2026-10-30 los códigos marcan el lugar donde se pegan: MAT — (lugar por confirmar) · CMO Pajaritos acceso/boletería · PZA Pajaritos andén · PBU Pajaritos salida a buses · BEA Plaza de Maipú acceso/boletería · SIS Plaza de Maipú andén · IRZ Plaza de Maipú salida a la plaza.
- Acceso: portada `contact.vientonorte.io/` enlaza a `/q/stats` (pide clave). Atajo `/stats` → `/q/stats` (no reenvía la clave).
