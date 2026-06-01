# Portafolio Lead UX

> Portfolio profesional de UX Lead / Senior Product Designer con enfoque en accesibilidad y mobile-first

[![CI Status](https://github.com/vientonorte/mi-portafolio/actions/workflows/ci.yml/badge.svg)](https://github.com/vientonorte/mi-portafolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/vientonorte/mi-portafolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/vientonorte/mi-portafolio/actions/workflows/deploy.yml)
[![Lighthouse](https://github.com/vientonorte/mi-portafolio/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/vientonorte/mi-portafolio/actions/workflows/lighthouse.yml)

**🚀 [Ver Demo en Vivo →](https://vientonorte.github.io/mi-portafolio/)**

## 🎯 Stack Técnico

**Frontend:** React 19 · TypeScript 6 · Radix UI · shadcn/ui · Tailwind CSS v4  
**Build:** Vite 6 · React 19.2.6  
**Testing:** Vitest · Testing Library · Pa11y (WCAG 2.1 AA)  
**CI/CD:** GitHub Actions · Lighthouse CI · TypeScript strict  
**Diseño:** Exportado desde Figma Code Bundle

**Figma source:** [Portafolio Lead UX](https://www.figma.com/design/BTIs734wMPGOqT2gMOQBzK/Portafolio-Lead-UX)

## ✨ Características

- ♿ **WCAG 2.1 AA/AAA Compliant** — Auditoría automática con Pa11y en CI
- 📱 **Mobile-First Responsive** — Optimizado para 5 breakpoints (320px-1024px+)
- ⚡ **Performance Optimizado** — Bundle <750KB, lazy loading, code splitting
- 🎨 **Sistema de Diseño Completo** — 117+ componentes reutilizables
- 🔍 **SEO Ready** — Meta tags, canonical URLs, sitemap
- 🌐 **HashRouter** — Compatible con GitHub Pages
- 🧪 **Testing Automatizado** — Unit tests + E2E + a11y audits
- 📊 **Métricas de UX** — Social proof, conversion tracking, analytics ready

## 📄 Secciones

- **Hero** — Intro con métricas de impacto (-40% abandono, NPS 72, +35% activación)
- **Sobre Mí** — Perfil profesional y filosofía UX
- **Proyectos** — 3 case studies detallados (SURA, Transvip, Karri)
- **Experiencia** — Timeline profesional
- **Diseño de Sistema** — Documentación de tokens y componentes
- **Contacto** — Formulario y enlaces sociales
- **Investigación** — Análisis etnográfico y citas ATTAC

## 📊 Métricas del Proyecto

- 📦 **117 componentes** reutilizables organizados
- 📄 **15 páginas** con routing y navegación completa  
- 🧪 **12 tests** automatizados (unit + integration)
- 📚 **33 archivos** de documentación técnica
- 🎯 **138+ commits** en desarrollo iterativo
- ✅ **58 PRs** mergeados exitosamente (100% merge rate)
- ⚡ **Bundle <750KB** sin comprimir (~196KB gzip)
- ♿ **WCAG 2.1 AA** compliance verificado en CI

## 🚀 Desarrollo local

```sh
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Environment Variables

Este proyecto usa variables de entorno para configuración. Para desarrollo local:

1. Copia el archivo de ejemplo:
```sh
cp .env.example .env.local
```

2. Edita `.env.local` con tus valores reales:
   - `VITE_GA_MEASUREMENT_ID`: ID de Google Analytics 4 (opcional)
   - `VITE_FORMSPREE_ENDPOINT`: Endpoint de FormSpree para formulario de contacto (opcional)

⚠️ **Nunca commitees archivos `.env` con valores reales.**

## Mobile Testing

## 🧪 QA y Testing

```sh
# Lint
npm run lint

# Tests unitarios
npm run test

# Coverage
npm run test:coverage

# QA completo (lint + tests)
npm run qa

# Build de producción
npm run build

# Mobile audit con Lighthouse
npx lighthouse http://localhost:5173 --preset=mobile --view
```

### CI/CD Pipeline

Cada PR ejecuta automáticamente:
- ✅ **TypeScript** type-check estricto
- ✅ **Build** smoke test + bundle size check (<750KB)
- ✅ **Accesibilidad** Pa11y WCAG 2.1 AA audit (threshold 0)
- ✅ **Lighthouse** performance, a11y, SEO scores

## 📱 Mobile Testing

Este proyecto está optimizado para dispositivos móviles. Ver [MOBILE_QA.md](./MOBILE_QA.md) para:
- Breakpoints y viewports de prueba (320px, 375px, 414px, 768px, 1024px)
- Estándares de touch targets (WCAG 2.1 Level AA: min 48x48px)
- Checklist de QA mobile completo
- Herramientas de testing automatizado

**Viewports clave:**
- 📱 **Mobile:** 320px - 767px (botones full-width, tipo responsive)
- 📱 **Tablet:** 768px - 1023px (layout híbrido)
- 💻 **Desktop:** 1024px+ (layout completo)

## 🚀 Deploy

Despliegue automático con GitHub Actions:

```
git push origin main → Build con Vite → Deploy a GitHub Pages
```

El sitio se despliega automáticamente en cada push a `main` en:
**https://vientonorte.github.io/mi-portafolio/**

### Build manual

```sh
npm run build
```

Los archivos optimizados se generan en `/dist`.

## 📚 Documentación

- **[MOBILE_QA.md](./MOBILE_QA.md)** — Checklist y guía de QA mobile completo
- **[HANDOFF_SPRINT.md](./HANDOFF_SPRINT.md)** — Sprint de estabilización y handoff
- **[CHANGELOG.md](./CHANGELOG.md)** — Historial de cambios (Keep a Changelog format)
- **[V2/QA-CHECKLIST.md](./V2/QA-CHECKLIST.md)** — Checklist QA general
- **[.github/workflows/](./. github/workflows/)** — CI/CD pipeline configs
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — Guía para contribuir al proyecto

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/
│   ├── atoms/         # Componentes básicos (Button, Input, Badge)
│   ├── molecules/     # Componentes compuestos (Card, Form, Nav)
│   └── organisms/     # Componentes complejos (Hero, Footer, Header)
├── pages/             # Páginas y rutas principales
├── lib/               # Utilidades y helpers
├── data/              # Datos estáticos y contenido
├── styles/            # Estilos globales y variables CSS
└── types/             # TypeScript type definitions
```

## 🤝 Contribuir

Este es un proyecto de portafolio personal, pero se agradecen sugerencias y feedback.


---

## 👨‍💻 Autor

**Rodrigo Gaete** · UX Lead / Senior Product Designer

- Portfolio: [vientonorte.github.io/mi-portafolio](https://vientonorte.github.io/mi-portafolio/)
- GitHub: [@vientonorte](https://github.com/vientonorte)
- LinkedIn: [rodrigo-gaete-ux](https://www.linkedin.com/in/rodrigo-gaete-ux)

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Diseño base exportado desde Figma
- UI Components: [Radix UI](https://radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- Build tooling: [Vite](https://vitejs.dev/)
- Accessibility testing: [Pa11y](https://pa11y.org/)
