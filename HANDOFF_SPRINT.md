# Sprint de Handoff — Estabilización post-caída

## Objetivo
Recuperar estabilidad en producción (GitHub Pages), cerrar deuda técnica mínima y dejar el proyecto listo para continuidad sin riesgo de pantalla en blanco.

## Estado actual
- ✅ Fix de compatibilidad React aplicado (`react-dom` alineado con `react`).
- ✅ `npm run build` pasa.
- ✅ Typecheck desbloqueado al corregir archivos de licencia mal tipados (`.tsx` -> `.txt`).
- ✅ CI ahora incluye smoke check de preview para validar artefacto de build y assets publicados.

## Backlog comprometido
### P1 (cerrado)
- [x] Merge + deploy del fix de compatibilidad React (listo para merge a `main`).
- [x] Corregir typecheck por archivos de licencia en `src/LICENSE`.
- [x] Verificación técnica local: build + typecheck.

### P2 (siguiente iteración)
- [ ] Verificación post-deploy en URL pública (`/`, `/proyectos`, `/sobre-mi`, `/contacto`) después del merge a `main`.
- [ ] Revisar ramas no mergeadas y consolidar solo mejoras seguras (evitar cambios de dependencias regresivos).

## Riesgos abiertos
- El deploy de Pages depende de merge a `main`; sin eso, la URL pública no se actualiza.
- Existen ramas históricas con cambios amplios y mezcla de dependencias; integrar sin curaduría puede reintroducir regresiones.

## Definición de Done
- Workflow **Deploy to GitHub Pages** en verde en `main`.
- Sitio navegable sin pantalla en blanco.
- CI de PR en verde (build smoke + typecheck).
- Handoff documentado con próximos pasos y riesgos.
