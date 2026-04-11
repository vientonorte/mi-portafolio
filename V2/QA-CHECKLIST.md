# QA Checklist Post-Deploy — Portafolio Lead UX

| Item | Validación | Resultado Esperado |
|------|------------|--------------------|
| 1 | Deploy en GitHub Pages | Sitio accesible en URL pública, sin errores 404 |
| 2 | Workflow QA en Actions | Todos los jobs pasan en verde, sin fallos |
| 3 | Accesibilidad AA | Navegación por teclado, contraste mínimo 4.5:1, sin errores axe-core |
| 4 | Tests unitarios | Todos los tests pasan (Vitest/Testing Library) |
| 5 | Lint y auditoría | Sin errores de lint ni vulnerabilidades críticas |
| 6 | Documentación visible | README, HANDOFF y QA-CHECKLIST accesibles y completos |
| 7 | Reportes QA | Artifacts de axe y Lighthouse disponibles en Actions |
| 8 | Peso inicial | Bundle JS < 250 KB, imágenes optimizadas |
| 9 | Responsive | Layout funcional en mobile, tablet y desktop |
| 10 | Storytelling | Todos los casos siguen estructura narrativa y scrum |

## Verificación

- [ ] Deploy accesible y funcional
- [ ] Actions en verde
- [ ] Accesibilidad AA validada
- [ ] Tests y lint OK
- [ ] Documentación completa
- [ ] Artifacts QA generados
- [ ] Peso y performance aceptables
- [ ] Responsive validado
- [ ] Storytelling consistente

---

**Notas:**
- Si algún punto falla, documentar hallazgo y crear issue en GitHub.
- Adjuntar capturas o logs si aplica.
- QA-CHECKLIST.md debe mantenerse actualizado tras cada release.

---

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
