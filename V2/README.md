
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
- Contraste AA
- Navegación por teclado
- Etiquetas y roles semánticos

---

> Sustituye los datos de ejemplo y personaliza según tu experiencia.
