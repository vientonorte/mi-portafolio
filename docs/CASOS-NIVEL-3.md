# Casos nivel 3

Flujo: home → `/casos/<slug>/` (nivel 2) → `/casos/<slug>/<pieza>/` (nivel 3).

Cada pieza muestra una selección de 3 a 5 láminas con pie, nunca el archivo completo. La URL vieja `/#/proyecto/<id>` sigue viva: si el id está en `src/data/casos.ts` (`hashId`), redirige a la URL limpia. El resto de proyectos del hash no cambia.

## Cómo agregar el siguiente caso

1. Permiso escrito en `docs/staging/<slug>-pack/PERMISO.md` antes de publicar copy o imágenes. Sin ese archivo, el caso no entra.
2. Datos en `src/data/casos.ts`: slug, ficha (etiqueta según PERMISO.md (anónimo o con nombre), año, rol, qué hice), contexto, proceso, 3–5 láminas (`src`, `alt`, `caption`) y hallazgos. `assertSlideCount` rechaza otra cantidad.
3. Imágenes en `public/images/cases/<slug>/<pieza>/`, registradas en `src/lib/portfolio-image-urls.ts` y `src/data/image-registry.ts`. WebP hermano del PNG, y un WebP de 800 px para el `srcset`. Sin metadatos de terceros.
4. `SOURCE_MAP.md` del pack: número de lámina → archivo. El mapa de nodos queda en el SSOT privado de TL.
5. Enlace desde la tarjeta que ya existe (arsenal o grilla de experiencias). No copies el cuerpo de la pieza en la tarjeta.
6. El prerender (`scripts/prerender-servicios.mjs`, misma vía que `/servicios/<slug>/`) escribe `dist/casos/<slug>/` y `dist/casos/<slug>/<pieza>/`. Una página con marcador TODO sale `noindex` y no entra al sitemap. No reintroducir `/servicios/diagnostico-accesibilidad-wcag/` ni `/servicios/consultoria-ux-pymes/`.

## Orden de salida

Rö decidió que estos casos van con nombre: SURA, Transvip, Karri, Claro y Monitas/Coworking. El resto usa la etiqueta según PERMISO.md (anónimo o con nombre).

1. Pyme de mobiliario educacional (`mobiliario-edu` / `pitch-ventas`) — este piloto, anónimo.
2. SURA RIA
3. SURA Tutoría CO
4. Transvip
5. Karri
6. Claro
7. Monitas / Coworking

Cada uno necesita su `PERMISO.md`.
