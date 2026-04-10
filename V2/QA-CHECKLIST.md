# Checklist QA Automatizado – Portafolio UX

## Accesibilidad (AA)
- [ ] axe-core: Sin errores críticos
- [ ] Lighthouse: Accesibilidad ≥ 95
- [ ] Contraste mínimo 4.5:1 en textos y botones
- [ ] Navegación completa por teclado (Tab, Shift+Tab, Enter)
- [ ] Roles ARIA y etiquetas presentes
- [ ] Inputs y botones con foco visible

## Código y performance
- [ ] npm run build sin errores/warnings
- [ ] npm run preview: sitio funcional
- [ ] Imágenes optimizadas (WebP, lazy loading)
- [ ] Bundle < 250KB (Lighthouse)
- [ ] Sin dependencias no usadas

## Documentación
- [ ] README actualizado (deploy, estructura, métricas)
- [ ] HANDOFF.md con pasos QA y deploy
- [ ] Plantilla de caso de estudio presente

## Casos de estudio
- [ ] Incluyen contexto, proceso, métricas y evidencia visual
- [ ] Enlaces a prototipos/wireframes

## SEO y metadatos
- [ ] Título y descripción únicos
- [ ] Etiquetas OpenGraph y favicon

---

## Scripts recomendados

### Accesibilidad
- `npx axe http://localhost:5173 --save axe-report.html`
- `npx lighthouse http://localhost:5173 --view`

### QA y build
- `npm run build && npm run preview`

### Optimización imágenes
- Usar [squoosh.app](https://squoosh.app) para comprimir imágenes

---

> Marca cada ítem tras validarlo. Adjunta reportes axe/Lighthouse en cada release.
