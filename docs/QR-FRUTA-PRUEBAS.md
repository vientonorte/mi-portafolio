# QR FRUTA · conteos de prueba

El worker guarda conteos por día (`qr:<slug>:<fecha>`), no por hora. Por eso las pruebas se separan con una lista fija en `worker/src/api/qr-exclusions.js` (slug + fecha + motivo).

| Slug | Fecha | Estado | Motivo |
|---|---|---|---|
| todos | 2026-10-27 | prueba | Lanzamiento. |
| av-matta, compania-morande, plaza-de-armas, parque-bustamante, bellas-artes, santa-isabel, irarrazaval | 2026-10-29 | por confirmar | Smoke del TL 17:58 + aperturas de Rö al pegar afiches (vista previa del link). Rö: solo el primer QR llegó a la encuesta; no se sabe cuál. |
| facebook | 2026-10-29 | por confirmar | Pruebas en Facebook: sin registro de cuántas ni del slug exacto. |
| san-pablo, general | 2026-10-28, 2026-10-29 | prueba | Fuente: Rö vía I15, 30-oct 00:10. Chequeos al pegar afiches: la cámara leyó el link sin tocarlo (Figma 487:179, 7 escaneos). |
| los-leones | 2026-10-29 | por confirmar | Punto de Jhordan: los chequeos de Rö al pegar afiches quizá no lo explican (Figma 487:39). |

- **Total real** = total − prueba − por confirmar.
- **Total con pruebas** = todo lo contado.
- Nada se adivina. Si Rö confirma un dato, se cambia la fila (PR).
- Grupos iguales al SSOT Figma 487:2: «Puntos de Rö», «Puntos de Jhordan», «Otros».
- Desde 2026-10-30 los códigos marcan el lugar donde se pegan: MAT — (lugar por confirmar) · CMO Pajaritos acceso/boletería · PZA Pajaritos andén · PBU Pajaritos salida a buses · BEA Plaza de Maipú acceso/boletería · SIS Plaza de Maipú andén · IRZ Plaza de Maipú salida a la plaza.
- Acceso: portada `contact.vientonorte.io/` enlaza a `/q/stats` (pide clave). Atajo `/stats` → `/q/stats` (no reenvía la clave).
