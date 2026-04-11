# CHANGELOG.md — Portafolio Lead UX

## 2026-04-11
- fix(ci): workflow QA corregido y validado
- Storytelling: todos los casos y secciones reescritos con lógica scrum, MVP y enfoque estratégico
- QA: fixes de accesibilidad, scripts automatizados y CI/CD
- fix: enable @tailwindcss/vite plugin + import index.css with all utilities
- fix: add .npmrc legacy-peer-deps for CI compatibility
- ci: trigger GitHub Actions deploy
- feat: portafolio Lead UX — React 19 + Radix/shadcn + Vite 6

---

# LOGS QA — Accesibilidad axe-core

- Última ejecución: 2026-04-11
- Archivo: axe-report.json (50 KB)

## Resumen de hallazgos recientes

- [ ] Document does not have a main landmark
  - Fix all of the following: Document does not have a main landmark
- [ ] Page must have a level-one heading
  - Fix all of the following: Page must have a level-one heading

**Nota:** El resto de reglas WCAG AA/AAA pasan correctamente. Estos dos hallazgos son de severidad moderada y pueden corregirse agregando un `<main>` y un `<h1>` único por página.

---

> Para detalles completos, consulta axe-report.json y el historial de commits.
