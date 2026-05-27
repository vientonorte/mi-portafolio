# Contributing to Portafolio Lead UX

¡Gracias por tu interés en contribuir! Este documento describe las pautas y mejores prácticas para trabajar en este proyecto.

## 🚀 Configuración Inicial

1. **Clonar el repositorio:**
```bash
git clone https://github.com/vientonorte/mi-portafolio.git
cd mi-portafolio
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
```bash
cp .env.example .env.local
# Editar .env.local con tus valores
```

4. **Iniciar desarrollo:**
```bash
npm run dev
```

## 📋 Git Workflow

### Branch Naming Convention

Usa prefijos descriptivos para tus ramas:

- `feature/` - Nuevas funcionalidades
- `fix/` - Corrección de bugs
- `chore/` - Tareas de mantenimiento
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código
- `test/` - Agregar o modificar tests
- `perf/` - Mejoras de rendimiento

**Ejemplos:**
```bash
feature/contact-form
fix/navigation-mobile
chore/update-dependencies
docs/readme-improvements
```

### Conventional Commits

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/) para mensajes de commit estructurados.

**Formato:**
```
type(scope): mensaje corto

[cuerpo opcional]

[footer opcional]
```

**Tipos permitidos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `chore`: Mantenimiento
- `docs`: Documentación
- `style`: Formato de código (sin cambios funcionales)
- `refactor`: Refactorización
- `test`: Tests
- `perf`: Mejoras de rendimiento
- `ci`: Cambios en CI/CD
- `build`: Cambios en build system
- `revert`: Revertir commit anterior

**Ejemplos:**
```bash
feat(hero): agregar animación de entrada
fix(nav): corregir link roto en mobile
chore(deps): actualizar Radix UI a v1.2
docs(readme): agregar sección de deployment
test(header): agregar tests para Logo component
```

### Pre-commit Hooks

El proyecto usa **Husky** y **lint-staged** para validar código antes de commits:

- ✅ ESLint automático en archivos modificados
- ✅ Tests relacionados ejecutados
- ✅ Validación de mensaje de commit con commitlint

Si un hook falla, tu commit será rechazado. Corrige los errores y vuelve a intentar.

## 🧪 Testing

### Ejecutar tests
```bash
npm run test          # Tests una vez
npm run test:watch    # Tests en modo watch
npm run test:coverage # Tests con coverage
```

### Escribir tests
- Coloca tests en `src/__tests__/`
- Usa estructura: `componente.test.tsx`
- Sigue patrón AAA: Arrange, Act, Assert

**Ejemplo:**
```tsx
import { render, screen } from '@testing-library/react'
import { MyComponent } from '../components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## 🎨 Code Style

### TypeScript
- Usa tipos explícitos cuando sea necesario
- Evita `any`
- Prefiere interfaces para objetos, types para unions

### React
- Componentes funcionales con hooks
- Props interfaces declaradas arriba del componente
- Atomic Design: atoms > molecules > organisms

### Tailwind CSS
- Usa clases utilitarias
- Evita CSS inline excepto para valores dinámicos
- Proyecto usa Tailwind v4

## ✅ Quality Checklist

Antes de crear un PR, verifica:

- [ ] El código compila sin errores: `npm run build`
- [ ] Todos los tests pasan: `npm run test`
- [ ] No hay errores de TypeScript: `npm run type-check`
- [ ] El linter está satisfecho: `npm run lint`
- [ ] Los commits siguen Conventional Commits
- [ ] La documentación está actualizada

**Script rápido:**
```bash
npm run ci  # Ejecuta lint + type-check + test + build
```

## 📝 Pull Request Process

1. **Crea una rama desde `main`**
```bash
git checkout -b feature/mi-nueva-feature
```

2. **Haz commits pequeños y atómicos**
```bash
git add .
git commit -m "feat(component): descripción"
```

3. **Push a tu rama**
```bash
git push origin feature/mi-nueva-feature
```

4. **Crea el Pull Request en GitHub**
   - Usa el template de PR
   - Describe qué cambios hiciste y por qué
   - Referencia issues relacionados

5. **Espera aprobación y CI verde**
   - Todos los checks de CI deben pasar
   - Resuelve comentarios de code review

6. **Merge con Squash**
   - Se usará squash merge para mantener historial limpio

## 🔒 Seguridad

- ❌ **NO** commitees secretos, tokens o API keys
- ❌ **NO** commitees archivos `.env` (solo `.env.example`)
- ✅ Usa variables de entorno para datos sensibles
- ✅ Ejecuta `npm audit` regularmente

## 📚 Recursos

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🤝 Código de Conducta

- Sé respetuoso y profesional
- Acepta críticas constructivas
- Enfócate en el código, no en la persona
- Ayuda a otros desarrolladores

## ❓ Preguntas

Si tienes dudas o problemas, abre un issue en GitHub o contacta al maintainer.

---

**¡Gracias por contribuir!** 🎉
