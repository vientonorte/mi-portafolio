# Guía de Contribución

Gracias por tu interés en contribuir al proyecto! Este documento establece las convenciones y mejores prácticas para mantener la calidad del código.

## 📋 Tabla de Contenidos

- [Convenciones de Commits](#convenciones-de-commits)
- [Convenciones de Branches](#convenciones-de-branches)
- [Workflow de Desarrollo](#workflow-de-desarrollo)
- [Quality Assurance](#quality-assurance)
- [Pull Requests](#pull-requests)

## 🎯 Convenciones de Commits

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/) con validación automática vía commitlint.

### Formato

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- **feat**: Nueva funcionalidad para el usuario
- **fix**: Corrección de bug
- **docs**: Cambios en documentación
- **style**: Formato, espaciado, sin cambios de lógica
- **refactor**: Refactorización sin cambios funcionales
- **test**: Agregar o modificar tests
- **chore**: Tareas de mantenimiento, deps, config
- **perf**: Mejoras de performance
- **ci**: Cambios en CI/CD pipeline

### Scope (opcional)

Indica el área afectada: `hero`, `nav`, `mobile`, `a11y`, `deps`, etc.

### Ejemplos

```bash
feat(hero): add social proof metrics badges
fix(mobile): correct touch target sizes for WCAG AA
docs(readme): add CI/CD badges and metrics
style(navigation): format navigation component
refactor(cards): extract ProjectCard to reusable component
test(hero): add unit tests for Hero metrics display
chore(deps): bump react-router-dom from 7.15.0 to 7.15.1
```

### Reglas

- ✅ Subject max 100 caracteres
- ✅ Subject en minúsculas (sin mayúscula inicial)
- ✅ Sin punto final en subject
- ✅ Usar imperativo: "add" no "added" ni "adds"

## 🌿 Convenciones de Branches

### Nomenclatura

```
<type>/<descripción-corta>
```

### Types de Branches

- **feature/** — Nueva funcionalidad
- **bugfix/** — Corrección de bug
- **hotfix/** — Fix urgente en producción
- **refactor/** — Refactorización de código
- **docs/** — Cambios solo de documentación
- **test/** — Agregar o modificar tests
- **chore/** — Tareas de mantenimiento

### Ejemplos

```bash
feature/hero-redesign
feature/add-contact-form
bugfix/mobile-nav-overlap
bugfix/hero-metrics-alignment
hotfix/broken-routing
refactor/extract-card-component
docs/update-readme-badges
test/add-hero-unit-tests
chore/update-dependencies
```

### Reglas

- ✅ Todo en minúsculas
- ✅ Usar guiones `-` no underscores `_`
- ✅ Descriptivo pero conciso
- ✅ Sin prefijos de usuario (`copilot/`, `claude/`) excepto para branches de agentes
- ❌ Evitar nombres genéricos: `fix`, `update`, `changes`

## 🔄 Workflow de Desarrollo

### 1. Crear una branch desde main

```bash
git checkout main
git pull origin main
git checkout -b feature/mi-nueva-funcionalidad
```

### 2. Desarrollar con commits incrementales

```bash
git add .
git commit -m "feat(scope): descripción del cambio"
```

### 3. Mantener branch actualizada

```bash
git fetch origin main
git rebase origin/main
```

### 4. Push y crear PR

```bash
git push origin feature/mi-nueva-funcionalidad
```

Luego crear PR en GitHub con:
- Título descriptivo (siguiendo Conventional Commits)
- Descripción clara del cambio
- Screenshots si hay cambios visuales
- Checklist de testing realizado

### 5. Merge y limpieza

Después del merge exitoso:

```bash
git checkout main
git pull origin main
git branch -d feature/mi-nueva-funcionalidad
git push origin --delete feature/mi-nueva-funcionalidad
```

## ✅ Quality Assurance

### Pre-commit Hooks

Husky ejecuta automáticamente en cada commit:

- **lint-staged**: ESLint con auto-fix en archivos staged
- **vitest**: Tests relacionados a archivos modificados

### Antes de crear PR

```bash
# Lint completo
npm run lint

# Tests completos
npm run test

# Build exitoso
npm run build

# QA completo (lint + tests + coverage)
npm run qa
```

### CI Pipeline

El CI ejecuta automáticamente:

1. **TypeScript** strict type-check (`tsc --noEmit`)
2. **Build** smoke test + bundle size check
3. **Pa11y** WCAG 2.1 AA accessibility audit
4. **Lighthouse** CI (performance, a11y, SEO)

**Todos los checks deben pasar** antes de mergear.

## 🎯 Pull Requests

### Checklist

Antes de marcar PR como "Ready for review":

- [ ] Código pasa todos los tests locales
- [ ] Código pasa lint sin warnings
- [ ] Build exitoso sin errores
- [ ] CI pipeline completamente verde (incl. job `qa-routes` si aplica)
- [ ] `npm run qa:routes` OK tras cambios de rutas o hero
- [ ] Commits siguen Conventional Commits
- [ ] PR title sigue Conventional Commits
- [ ] Descripción clara del problema/solución
- [ ] Screenshots agregados si hay cambios UI
- [ ] Documentación actualizada si aplica
- [ ] CHANGELOG.md actualizado si aplica
- [ ] No hay TODOs o console.logs pendientes
- [ ] Accesibilidad verificada (keyboard, screen readers)
- [ ] Mobile responsive verificado (320px, 768px, 1024px+)

### Template de PR

```markdown
## 📝 Descripción

[Descripción clara del cambio]

## 🎯 Motivación

[Por qué este cambio es necesario]

## 🧪 Testing

- [ ] Tests unitarios
- [ ] Tests de accesibilidad
- [ ] Mobile responsive verificado
- [ ] Cross-browser testing

## 📸 Screenshots

[Si aplica, agregar screenshots]

## 📋 Checklist

- [ ] Código pasa lint
- [ ] Tests pasan
- [ ] Build exitoso
- [ ] CI green
```

## 🧪 Testing Guidelines

### Unit Tests

- Usar Vitest + Testing Library
- Cobertura mínima recomendada: 70%
- Test user interactions, no implementation details
- Seguir patrón AAA: Arrange, Act, Assert

### Accessibility Testing

- Touch targets min 48x48px (WCAG 2.1 Level AA)
- Color contrast min 4.5:1 para texto normal
- Semantic HTML (headings, landmarks, labels)
- Keyboard navigation completa
- Screen reader compatible

### Mobile Testing

Viewports obligatorios:

- 📱 320px (Mobile S)
- 📱 375px (Mobile M)
- 📱 414px (Mobile L)
- 📱 768px (Tablet)
- 💻 1024px+ (Desktop)

Ver [MOBILE_QA.md](./MOBILE_QA.md) para checklist completo.

## 🚫 Anti-patterns a Evitar

❌ Commits directos a `main`  
❌ Force push a branches compartidas  
❌ Merge de branches obsoletas sin rebase  
❌ PRs >500 líneas sin justificación  
❌ Commits con mensajes genéricos: "fix", "update", "wip"  
❌ Dejar branches mergeadas sin eliminar  
❌ Agregar `console.log` en código de producción  
❌ Commits sin pasar lint o tests  
❌ Hardcodear secrets o API keys  

## 📞 Contacto

Para preguntas o sugerencias:

- Abrir un Issue en GitHub
- Contactar a [@vientonorte](https://github.com/vientonorte)

---

**Gracias por contribuir y mantener la calidad del proyecto! 🚀**
