# PROCESO QA AUTOMATIZADO — CREACIÓN DE ISSUES

## Flujo para documentar hallazgos de accesibilidad

1. Ejecutar QA automatizado (axe-core, Vitest, Lighthouse, lint, build).
2. Si axe-core detecta errores o advertencias relevantes:
   - Agrupar hallazgos por archivo y severidad.
   - Redactar issue con formato estándar QA Lead.
3. Crear issue en GitHub vía CLI:

```sh
gh issue create --repo "vientonorte/mi-portafolio" \
  --title "[QA] Accesibilidad: Falta <main> y <h1> único (axe-core)" \
  --body $'## Descripción\nEl reporte automatizado de accesibilidad (axe-core) detectó dos hallazgos moderados:\n\n1. Falta un landmark principal <main> en la estructura de la página.\n2. Falta un heading de nivel uno único <h1>.\n\n## Archivo(s) afectado(s)\n- src/App.jsx o layout principal\n\n## Reproducción / Evidencia\n- Log axe-core (axe-report.json):\n  - Document does not have a main landmark\n  - Page must have a level-one heading\n\n## Severidad\n🟡 — Degrada la experiencia de usuarios con lector de pantalla y afecta cumplimiento WCAG AA.\n\n## Fix sugerido\n- Agregar un elemento <main> que envuelva el contenido principal.\n- Incluir un <h1> único y descriptivo por página.\n\n---\n_Reporte generado automáticamente por QA Lead._' \
  --label "bug,enhancement"
```

4. Validar en GitHub que el issue fue creado correctamente y tiene los labels adecuados.
5. Asignar, priorizar y vincular a pull requests según el flujo scrum.

---

**Este proceso garantiza trazabilidad y mejora continua en accesibilidad.**

> Última ejecución: 2026-04-11 — Issue creado y validado automáticamente.
