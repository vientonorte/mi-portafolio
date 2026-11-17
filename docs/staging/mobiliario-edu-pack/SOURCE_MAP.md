# SOURCE_MAP · pieza pitch de ventas

Archivo de origen (no se publica el archivo completo): `f6LRq93s1CzxvslAHOj5bN`.

Las cinco láminas publicadas son una selección. Los id de frame no van en datos públicos (`src/data/casos.ts`).

## Láminas → `public/images/cases/mobiliario-edu/pitch-ventas/`

| Nodo | Archivo | Derivado |
|------|---------|----------|
| 1:22757 | `01-portada-guion-acting.png` + `.webp` | `01-portada-guion-acting-800.webp` |
| 1:24862 | `02-flujo-simulacion.png` + `.webp` | `02-flujo-simulacion-800.webp` |
| 1:24890 | `03-bio-persona-con-tiempo.png` + `.webp` | `03-bio-persona-con-tiempo-800.webp` |
| 1:22654 | `04-flujo-pitch-de-entrada.png` + `.webp` | `04-flujo-pitch-de-entrada-800.webp` |
| 1:22672 | `05-exploracion-de-dolores.png` + `.webp` | `05-exploracion-de-dolores-800.webp` |

PNG y WebP de 1600×900 los entregó Tech Lead ya redactados, sin chunks de metadatos. El WebP de 800 px se genera desde ese PNG (`ffmpeg`, `scale=800:-1`, libwebp).

## Nodos usados solo como fuente del copy (no son láminas publicadas)

| Nodo | Para qué se leyó |
|------|------------------|
| 1:22763 | Año |
| 1:22659 | Pitch |
| 1:22675, 1:22676, 1:22677 | Preguntas |
| 1:24868, 1:24895 | Objetivo de negocios |
| 1:24869 | Flujo, fechas, personas |
| 1:24896 | Reunión y criterio de feedback |
| 1:22764, 1:22766 | Portada |

## Evidencia de redacción

No va a `public/`. Vive en `docs/staging/mobiliario-edu-pack/evidencia/`:

- `01-portada-guion-acting-evidencia.png`
- `02-flujo-simulacion-evidencia.png`
- `03-bio-persona-con-tiempo-evidencia.png`
- `04-flujo-pitch-de-entrada-evidencia.png`
- `05-exploracion-de-dolores-evidencia.png`

El mapa histórico de los seis PDF del pack anterior sigue en `SOURCE_MAP.txt`.
