# ⚠️ ARCHIVED: Portafolio V2

> **Nota:** Este directorio contiene una versión anterior del portafolio y se mantiene como referencia histórica. **No está activo ni mantenido.**

## ¿Por qué existe este directorio?

Esta carpeta (`V2/`) es una versión previa del portafolio que incluía:
- Setup básico de React + Vite
- QA workflow con axe-core y Lighthouse
- Documentación de proceso Scrum
- Checklists de QA y accesibilidad

## Estado Actual

- ❌ **NO se usa en producción**
- ❌ **NO se mantiene actualizado**
- ℹ️ Ignorado por ESLint (ver `eslint.config.js`)
- ℹ️ Incluido en `.gitignore` de root (opcional)

## ¿Debo usarlo?

**No.** Para desarrollo activo, usa el proyecto principal en la raíz del repositorio (`/`).

## ¿Puedo eliminarlo?

Sí, puedes eliminar `/V2` completamente si no necesitas la referencia histórica. No afecta al proyecto principal.

```bash
# Para eliminar completamente
rm -rf V2/
```

---

## Definition of Done (DOD) - Referencia Histórica

Para considerar cualquier entrega como "Done" en este portafolio, debe cumplir:

- [ ] Accesibilidad AAA (WCAG 2.1): contraste, navegación, roles, foco, validación automatizada y manual
- [ ] Código limpio y modular: sin warnings/lint, imports claros, componentes reutilizables, sin dead code
- [ ] Tests y QA: scripts automatizados (axe, Lighthouse), revisión manual y artefactos adjuntos en CI
- [ ] Documentación actualizada: README, handoff, QA checklist y comentarios relevantes en el código
- [ ] Performance: bundle optimizado, imágenes comprimidas, carga rápida en dispositivos reales
- [ ] Seguridad y privacidad: sin datos sensibles hardcodeados, dependencias auditadas
- [ ] Storytelling validado: narrativa clara, impacto y aprendizaje documentados

Solo se acepta un release si cumple todos los puntos anteriores.

![QA y Accesibilidad](https://github.com/vientonorte/mi-portafolio/actions/workflows/qa.yml/badge.svg)

# Portafolio Staff/Principal UX – Sector Financiero
## CI/CD

Este repositorio ejecuta QA automatizado (axe-core y Lighthouse) en cada push y PR a main. Los reportes se suben como artefactos en GitHub Actions.

Si alguna verificación falla, recibirás notificación en la pestaña Actions y en el PR.

Este proyecto es un portafolio profesional minimalista y accesible, diseñado para mostrar experiencia en UX en el sector financiero.

## Características
- React + Vite
- Estructura modular: componentes, páginas, estilos, imágenes optimizadas
- Design system básico (colores, tipografía, espaciado, componentes)
- Accesibilidad AA
- Plantilla de caso de estudio
- Preparado para despliegue en GitHub Pages
- Idioma español

## Scripts
- `npm run dev` – Desarrollo local
- `npm run build` – Build de producción
- `npm run preview` – Previsualización

## Deploy en GitHub Pages
1. Instala `gh-pages`: `npm install --save-dev gh-pages`
2. Agrega en `package.json`:
	```json
	"homepage": "https://<tuusuario>.github.io/<repo>"
	```
3. Agrega scripts:
	```json
	"predeploy": "npm run build",
	"deploy": "gh-pages -d dist"
	```
4. Ejecuta: `npm run deploy`

## Estructura
- `/src/componentes` – Componentes reutilizables
- `/src/paginas` – Páginas y plantilla de caso de estudio
- `/src/estilos` – Estilos globales y utilidades
- `/src/design-system` – Sistema de diseño básico
- `/src/imagenes` – Imágenes optimizadas


## Accesibilidad
- Contraste AAA (WCAG 2.1)
- Navegación por teclado y lector de pantalla
- Etiquetas, roles semánticos y foco visible
- Validación automatizada (axe, Lighthouse) y QA manual
- Compromiso: solo se considera "Done" (DOD) si cumple AAA

## Propuesta de Scrum para releases
- Sprints de 1 semana: backlog, daily, review y retrospectiva
- QA y fixes de accesibilidad en cada release
- Storytelling validado y deploy automático (CI/CD)
- Roles claros: Product Owner, UX Lead, Dev/QA
- Cada release documenta aprendizajes y mejoras

---

## Proceso QA automatizado y gestión de issues

El flujo de QA automatizado incluye:

1. Ejecución de lint, tests, build, axe-core y Lighthouse.
2. Documentación de hallazgos en CHANGELOG.md y QA-CHECKLIST.md.
3. Creación de issues automáticos en GitHub para bugs y mejoras de accesibilidad:

```sh
# Ejemplo de comando para crear issue desde CLI

gh issue create --repo "vientonorte/mi-portafolio" \
  --title "[QA] Accesibilidad: Falta <main> y <h1> único (axe-core)" \
  --body $'## Descripción\nEl reporte automatizado de accesibilidad (axe-core) detectó dos hallazgos moderados:\n\n1. Falta un landmark principal <main> en la estructura de la página.\n2. Falta un heading de nivel uno único <h1>.\n\n## Archivo(s) afectado(s)\n- src/App.jsx o layout principal\n\n## Reproducción / Evidencia\n- Log axe-core (axe-report.json):\n  - Document does not have a main landmark\n  - Page must have a level-one heading\n\n## Severidad\n🟡 — Degrada la experiencia de usuarios con lector de pantalla y afecta cumplimiento WCAG AA.\n\n## Fix sugerido\n- Agregar un elemento <main> que envuelva el contenido principal.\n- Incluir un <h1> único y descriptivo por página.\n\n---\n_Reporte generado automáticamente por QA Lead._' \
  --label "bug,enhancement"
```

4. Validación y seguimiento en la pestaña Issues de GitHub.

Para más detalles, consulta PROCESO-QA.md.
