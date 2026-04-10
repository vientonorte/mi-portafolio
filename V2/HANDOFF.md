# Plan de Acción para Portafolio Staff/Principal UX

## 1. Accesibilidad AA (WCAG 2.1)
- [ ] Revisar y corregir contraste de color en todos los textos y botones (ratio mínimo 4.5:1)
- [ ] Añadir roles ARIA apropiados en navegación, main, botones y formularios
- [ ] Asegurar foco visible en todos los elementos interactivos (teclado)
- [ ] Etiquetar correctamente todos los inputs y botones (aria-label, htmlFor)
- [ ] Validación accesible y feedback claro en formularios
- [ ] Testear con lector de pantalla y navegación solo teclado

## 2. Documentación y QA
- [ ] Completar README con instrucciones de deploy, estructura y métricas de accesibilidad/performance
- [ ] Crear archivo HANDOFF.md con checklist QA, dependencias, pasos de build y deploy
- [ ] Añadir sección de ayuda rápida para visitantes (cómo navegar, contacto, propósito)

## 3. Código y optimización
- [ ] Eliminar código y assets no usados
- [ ] Revisar imports y modularidad de componentes
- [ ] Optimizar imágenes (WebP, compresión, lazy loading)
- [ ] Revisar bundle final (`npm run build` + `npm run preview`)
- [ ] Añadir metadatos SEO y OpenGraph

## 4. Casos de estudio y evidencia visual
- [ ] Enriquecer casos con wireframes, capturas, enlaces a prototipos interactivos
- [ ] Añadir métricas y resultados visuales (gráficos, tablas)

## 5. Scrum para salida a producción
- [ ] Crear board Kanban (To Do, In Progress, QA, Done)
- [ ] Definir sprint de 1 semana para fixes críticos AA y documentación
- [ ] QA funcional y de accesibilidad antes de deploy
- [ ] Deploy a GitHub Pages y validación post-lanzamiento

---

> Prioriza accesibilidad y documentación antes de optimizaciones visuales. Usa herramientas como axe, Lighthouse y WAVE para validar AA. Documenta todo cambio relevante en el repo.