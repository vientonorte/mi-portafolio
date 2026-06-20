# 🌟 Rodrigo Gaete - Lead UX Portfolio

> Portfolio profesional de Lead UX especializado en implementación de experiencia usuaria y desarrollo evolutivo de productos digitales.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8.svg)](https://tailwindcss.com/)

---

## 🚀 Inicio Rápido

### ¿Primera vez aquí?
**→ [START_HERE.md](START_HERE.md)** - Guía de inicio (5 minutos)

### ¿Tienes errores después de clonar?
**→ [FIX_ERRORS.md](FIX_ERRORS.md)** - Solución rápida

### ¿Quieres todo en un solo documento?
**→ [RESUMEN_COMPLETO.md](RESUMEN_COMPLETO.md)** - Resumen ejecutivo

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tech Stack](#-tech-stack)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Design System](#-design-system)
- [Accesibilidad](#-accesibilidad)
- [Internacionalización](#-internacionalización)
- [Performance](#-performance)
- [Deployment](#-deployment)
- [Contribución](#-contribución)

---

## ✨ Características

### 🎨 Diseño y UX
- ✅ **Atomic Design** - Arquitectura de componentes escalable (Atoms → Molecules → Organisms)
- ✅ **Design System** completo con tokens, componentes y guías de uso
- ✅ **Mobile First** - Diseño responsive optimizado para todos los dispositivos
- ✅ **Micro-interacciones fluidas** con Motion/React (Framer Motion)
- ✅ **Modo Oscuro** funcional con persistencia de preferencias
- ✅ **Brandbook completo** - Tipografía Chillax, gradientes (#FF1D25 → #FF931E), logo animado

### 🚀 Funcionalidades
- ✅ **Company Hubs** - Arquitectura que agrupa proyectos por empresa
- ✅ **Framework de Diseño de Producto** - 5 macroprocesos estructurados
- ✅ **Casos de Estudio detallados** - Proyectos de Transvip y SURA Investments
- ✅ **Navegación inteligente** - Sticky header con auto-hide on scroll
- ✅ **Scroll Progress Indicator** - Visual feedback de navegación
- ✅ **i18n Completo** - Español/Inglés con toggle funcional

### ♿ Accesibilidad
- ✅ **WCAG 2.1 Nivel AA** - Cumplimiento de estándares de accesibilidad
- ✅ **Keyboard Navigation** - Navegación completa por teclado
- ✅ **ARIA Labels** - Etiquetas semánticas correctas
- ✅ **Focus Management** - Estados de foco visibles y correctos
- ✅ **Reduced Motion** - Respeto por preferencias de animación del usuario
- ✅ **Skip to Content** - Acceso rápido al contenido principal

### ⚡ Performance
- ✅ **Code Splitting** - Carga optimizada de componentes
- ✅ **Lazy Loading** - Imágenes y componentes bajo demanda
- ✅ **Optimized Animations** - Solo anima propiedades GPU-accelerated
- ✅ **Memoization** - React hooks optimizados (useMemo, useCallback)
- ✅ **Type Safety** - TypeScript en todo el proyecto

---

## 🛠 Tech Stack

### Core
- **React 18.x** - Library de UI con Hooks y Suspense
- **TypeScript 5.x** - Tipado estático para mayor robustez
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS 4.x** - Framework CSS utility-first

### Animaciones
- **Motion/React** (Framer Motion) - Animaciones declarativas fluidas
- **useReducedMotion** - Respeto a preferencias de accesibilidad

### UI Components
- **shadcn/ui** - Componentes accesibles y customizables
- **Lucide React** - Iconos modernos y consistentes
- **Recharts** - Gráficos interactivos para métricas

### Otros
- **React Hook Form** - Manejo de formularios optimizado
- **Sonner** - Toast notifications elegantes
- **date-fns** - Manipulación de fechas

---

## 🏗 Arquitectura

### Atomic Design

El proyecto sigue los principios de **Atomic Design** para máxima reutilización y escalabilidad:

```
components/
├── atoms/           # Elementos básicos (Button, Logo, Badge)
├── molecules/       # Combinaciones simples (Card, SectionHeader)
└── organisms/       # Componentes complejos (Hero, Navigation, ProjectsHub)
```

### Company Hubs Architecture

Sistema escalable para agregar empresas y proyectos sin perder estructura:

```typescript
// data/projects-data.ts
export const transvipHub: CompanyHub = {
  id: "transvip",
  name: "Transvip",
  industry: "Logistics Tech",
  period: "2021-2023",
  totalProjects: 4,
  projects: [...]
};
```

**Beneficios:**
- 📈 **Escalable** - Agrega empresas sin límites
- 🔄 **Mantenible** - Código limpio con separación de responsabilidades
- 🎯 **Consistente** - Mismo patrón para todos los proyectos

### Framework de Diseño de Producto

5 macroprocesos que priorizan decisiones basadas en data:

1. **UX Analytics** - Métricas y heatmaps
2. **UX Research** - Entrevistas y testing con usuarios
3. **UX/UI Design** - Wireframes, prototipos y design systems
4. **UX Testing** - Validación con usuarios reales
5. **Refinamiento** - Iteración continua

---

## 📦 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/rodrigo-gaete-portfolio.git

# Navegar al directorio
cd rodrigo-gaete-portfolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

### Build de Producción

```bash
# Crear build optimizado
npm run build

# Preview del build
npm run preview
```

---

## 📁 Estructura del Proyecto

```
rodrigo-gaete-portfolio/
├── components/
│   ├── atoms/              # Componentes básicos
│   │   ├── Logo.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── LanguageToggle.tsx
│   ├── molecules/          # Componentes intermedios
│   │   ├── Card.tsx
│   │   ├── SectionHeader.tsx
│   │   └── ProcessPhaseCard.tsx
│   ├── organisms/          # Componentes complejos
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProjectsHub.tsx
│   │   └── DesignTokens.tsx
│   └── ui/                 # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── pages/                  # Páginas completas
│   ├── DesignSystem.tsx
│   ├── CaseStudies.tsx
│   ├── CompanyDetail.tsx
│   └── ProcessDetail.tsx
├── data/                   # Datos centralizados
│   ├── projects-data.ts    # CompanyHubs y proyectos
│   └── karri-projects.ts   # Proyectos específicos Karri
├── lib/                    # Utilidades y contextos
│   ├── LanguageContext.tsx # Context i18n
│   ├── i18n.ts            # Traducciones
│   └── utils.ts           # Helpers
├── styles/
│   └── globals.css        # Tokens Tailwind y estilos globales
└── App.tsx                # Entry point con routing
```

---

## 🎨 Design System

### Tokens de Color

```css
/* Primary Brand Gradient */
--brand-gradient: linear-gradient(135deg, #FF1D25 0%, #FF931E 100%);

/* Semantic Colors */
--primary: #FF1D25;
--secondary: #FF931E;
```

### Tipografía

- **Headings:** Chillax (Variable Font)
- **Body:** System font stack optimizado

### Componentes UI

Librería completa de componentes enterprise-ready:
- ✅ Buttons (Primary, Secondary, Outline, Ghost)
- ✅ Cards con múltiples variantes
- ✅ Forms con validación
- ✅ Modals y Dialogs
- ✅ Tooltips accesibles
- ✅ Navigation components
- ✅ Data visualization (Charts)

**Ver más:** Navega a `/design-system` en el portfolio

---

## ♿ Accesibilidad

### Estándares WCAG 2.1 AA

- ✅ **Contraste de color:** Mínimo 4.5:1 para texto normal
- ✅ **Navegación por teclado:** Todos los elementos interactivos
- ✅ **ARIA Labels:** Etiquetas descriptivas en todos los componentes
- ✅ **Focus Visible:** Estados de foco claramente visibles
- ✅ **Heading Hierarchy:** Estructura semántica correcta (h1 → h6)
- ✅ **Alt Text:** Descripciones para todas las imágenes

### Reduced Motion

```typescript
import { useReducedMotion } from "motion/react";

const prefersReducedMotion = useReducedMotion();

// Solo anima si el usuario no prefiere reducir movimiento
{!prefersReducedMotion && <AnimatedComponent />}
```

---

## 🌐 Internacionalización

Sistema i18n completo para Español/Inglés:

```typescript
// lib/i18n.ts
export const translations = {
  es: {
    hero: {
      title: "Lead UX diseñando experiencias...",
      // ...
    }
  },
  en: {
    hero: {
      title: "Lead UX designing experiences...",
      // ...
    }
  }
};
```

**Toggle de idioma:** Disponible en todo momento en la navegación principal

---

## ⚡ Performance

### Optimizaciones Implementadas

1. **Code Splitting**
   - Lazy loading de páginas
   - Dynamic imports para componentes pesados

2. **Image Optimization**
   - Lazy loading con Intersection Observer
   - Placeholder mientras carga

3. **Animation Performance**
   - Solo anima propiedades GPU-accelerated (transform, opacity)
   - `willChange` para hint al navegador
   - Respeto a `prefers-reduced-motion`

4. **React Optimizations**
   - `useMemo` para cálculos costosos
   - `useCallback` para funciones estables
   - React.memo para componentes puros

### Métricas Target

- **First Contentful Paint (FCP):** < 1.8s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.8s
- **Cumulative Layout Shift (CLS):** < 0.1

---

## 🚀 Deployment

### Deploy en Vercel (Recomendado)

1. Conecta tu repositorio de GitHub
2. Configura el proyecto:
   ```
   Framework: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
3. Deploy automático en cada push

### Deploy en Netlify

1. Conecta tu repositorio
2. Configuración:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
3. Configura redirects para SPA:
   ```
   /* /index.html 200
   ```

### Deploy Manual

```bash
# Build
npm run build

# Subir carpeta 'dist' a tu hosting preferido
```

---

## 📈 Mejoras Quick Win (Próximas)

### 🎯 Alto Impacto - Bajo Esfuerzo

1. **SEO Optimization** (2h)
   - [ ] Meta tags dinámicos por página
   - [ ] Open Graph tags para social sharing
   - [ ] Sitemap.xml generado
   - [ ] robots.txt configurado

2. **Analytics Integration** (1h)
   - [ ] Google Analytics 4
   - [ ] Event tracking en CTAs
   - [ ] Scroll depth tracking
   - [ ] Time on page metrics

3. **Performance Enhancements** (3h)
   - [ ] Image WebP conversion
   - [ ] Critical CSS inline
   - [ ] Preload critical resources
   - [ ] Service Worker para caching

4. **Enhanced Interactions** (2h)
   - [ ] Toast notifications para acciones
   - [ ] Loading states en navegación
   - [ ] Error boundaries con UI amigable
   - [ ] Skeleton loaders para contenido

5. **Content Additions** (4h)
   - [ ] Blog section para artículos UX
   - [ ] Testimonials slider
   - [ ] Certificaciones y educación
   - [ ] Descarga de CV en PDF

6. **PWA Features** (3h)
   - [ ] Manifest.json
   - [ ] Offline capability
   - [ ] Install prompt
   - [ ] Push notifications (opcional)

### 🔧 Mejoras Técnicas

7. **Testing** (5h)
   - [ ] Unit tests con Vitest
   - [ ] Component tests con Testing Library
   - [ ] E2E tests con Playwright
   - [ ] Visual regression tests

8. **CI/CD Pipeline** (2h)
   - [ ] GitHub Actions para tests
   - [ ] Automated deployment
   - [ ] Lighthouse CI checks
   - [ ] Bundle size monitoring

9. **Monitoring** (2h)
   - [ ] Error tracking (Sentry)
   - [ ] Performance monitoring
   - [ ] User session recordings (Hotjar/PostHog)

---

## 🤝 Contribución

Este es un portfolio personal, pero las sugerencias son bienvenidas:

1. Fork el proyecto
2. Crea una branch (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la branch (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Rodrigo Gaete**  
Lead UX | UX/UI Designer | Design Systems Specialist

- 🌐 Portfolio: [rodrigogaete.com](#)
- 💼 LinkedIn: [linkedin.com/in/rodrigo-gaete-ux](https://www.linkedin.com/in/rodrigo-gaete-ux/)
- 📧 Email: contacto@rodrigogaete.com

---

## 🙏 Agradecimientos

- **shadcn/ui** - Por los componentes base accesibles
- **Lucide Icons** - Por los iconos hermosos
- **Tailwind Labs** - Por el framework CSS increíble
- **Figma Make** - Por la plataforma de desarrollo

---

<div align="center">

**⭐ Si te gustó este proyecto, considera darle una estrella ⭐**

Hecho con ❤️ y ☕ por Rodrigo Gaete

</div>