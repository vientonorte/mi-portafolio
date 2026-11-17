# Casos nivel 3

Flujo: home → `/casos/<slug>/` (nivel 2) → `/casos/<slug>/<pieza>/` (nivel 3).

Cada pieza muestra una selección de 3 a 5 láminas con pie, nunca el archivo completo. La URL vieja `/#/proyecto/<id>` sigue viva: si el id está en `src/data/casos.ts` (`hashId`), redirige a la URL limpia. El resto de proyectos del hash no cambia.

## Cómo agregar el siguiente caso

1. Permiso escrito en `docs/staging/<slug>-pack/PERMISO.md` antes de publicar copy o imágenes. Sin ese archivo, el caso no entra.
2. Datos en `src/data/casos.ts`: slug, ficha (cliente anónimo, año, rol, qué hice), contexto, proceso, 3–5 láminas (`src`, `alt`, `caption`) y hallazgos. `assertSlideCount` rechaza otra cantidad.
3. Imágenes en `public/images/cases/<slug>/<pieza>/`, registradas en `src/lib/portfolio-image-urls.ts` y `src/data/image-registry.ts`. WebP hermano del PNG, y un WebP de 800 px para el `srcset`. Sin metadatos de terceros.
4. `SOURCE_MAP.md` del pack: nodo → archivo. Esos id no van en el dato que se publica.
5. Enlace desde la tarjeta que ya existe (arsenal o grilla de experiencias). No copies el cuerpo de la pieza en la tarjeta.
6. El prerender (`scripts/prerender-servicios.mjs`, misma vía que `/servicios/<slug>/`) escribe `dist/casos/<slug>/` y `dist/casos/<slug>/<pieza>/` y el sitemap las toma solas. No reintroducir `/servicios/diagnostico-accesibilidad-wcag/` ni `/servicios/consultoria-ux-pymes/`.

## Orden de salida

1. Pyme de mobiliario educacional (`mobiliario-edu` / `pitch-ventas`) — este piloto.
2. SURA RIA
3. SURA Tutoría CO
4. Transvip
5. Karri
6. Claro
7. Monitas / Coworking
8. Pareti / Khuro

Cada uno necesita su `PERMISO.md`.
