## Definition of Done (DOD)

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

> Sustituye los datos de ejemplo y personaliza según tu experiencia.
