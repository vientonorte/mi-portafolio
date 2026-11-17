# SOURCE_MAP · Transvip nivel 3

Las láminas publicadas son una selección. No se publica el archivo completo.

Mapa de nodos en SSOT privado de TL.

## Pieza 1 · app de reserva → `public/images/cases/transvip/app-reserva/`

| Lámina | Archivo | Derivado | Notas de redacción |
|--------|---------|----------|--------------------|
| 01 | `01-reserva-desktop.png` + `.webp` | `01-reserva-desktop-800.webp` | Flujo de reserva en laptop. Las fechas son placeholders `dd/mm/aaaa`. |
| 02 | `02-reserva-mobile.png` + `.webp` | `02-reserva-mobile-800.webp` | Misma pantalla en el teléfono. El control de perfil es un icono genérico; se cubrió la foto original. |
| 03 | `03-prototipo-reserva.png` + `.webp` | `03-prototipo-reserva-800.webp` | Prototipo recortado al dispositivo. Sin cromo de Figma ni listado interno de trabajo. |

## Pieza 2 · System Design → `public/images/cases/transvip/system-design/`

| Lámina | Archivo | Derivado | Notas de redacción |
|--------|---------|----------|--------------------|
| 01 | `01-proposito.png` + `.webp` | `01-proposito-800.webp` | Propósito del sistema para el equipo interno de Tecnología y Producto. |
| 02 | `02-manual-uso.png` + `.webp` | `02-manual-uso-800.webp` | Manual de uso e índice. Deja visibles deudas de tipografía y homologación, sin tickets ACT. |
| 03 | `03-componentes.png` + `.webp` | `03-componentes-800.webp` | Atomic Design y la regla para documentar un componente nuevo. |
| 04 | `04-trabajo-colaborativo.png` + `.webp` | `04-trabajo-colaborativo-800.webp` | Acuerdo de trabajo con desarrollo y vista de especificaciones. |

PNG y WebP de 1600×900, sin chunks de metadatos de terceros. El WebP de 800 px se genera desde ese PNG.

## Evidencia de redacción

No va a `public/`. Vive en `docs/staging/transvip-pack/evidencia/`:

- `01-reserva-desktop-evidencia.png`
- `02-reserva-mobile-evidencia.png`
- `03-prototipo-reserva-evidencia.png`
- `01-proposito-evidencia.png`
- `02-manual-uso-evidencia.png`
- `03-componentes-evidencia.png`
- `04-trabajo-colaborativo-evidencia.png`

## Exclusiones (no publicadas)

- Portada del pack de informes.
- Benchmarks de competidores.
- Frames con nombres, firmas, tickets ACT, mapas, direcciones u horarios de ejemplo en primer plano, o capturas de Slack / Jira / Hotjar / GA4.
- Tipografía del System Design a página completa (no legible en formato apaisado).
- Pieza 3 opcional (antes/después): no hubo una selección de 3 a 5 láminas pública y segura. Queda fuera de este PR.
