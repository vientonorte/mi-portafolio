# Portafolio Lead UX

Portfolio profesional de UX Lead / Senior Product Designer. Exportado desde Figma Code Bundle.

**Stack:** React 19 · TypeScript · Radix UI · shadcn/ui · Tailwind CSS v4 · Vite 6

**Figma source:** [Portafolio Lead UX](https://www.figma.com/design/BTIs734wMPGOqT2gMOQBzK/Portafolio-Lead-UX)

## Secciones

Hero · About · ImpactStats · ProjectsHub (SURA, Transvip, Karri) · Experience · Contact · Design System · Case Studies

## Desarrollo local

```sh
npm install
npm run dev
```

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

Este proyecto está optimizado para dispositivos móviles. Ver [MOBILE_QA.md](./MOBILE_QA.md) para:
- Breakpoints y viewports de prueba (320px, 375px, 414px, 768px, 1024px)
- Estándares de touch targets (WCAG 2.1 Level AA)
- Checklist de QA mobile completo
- Herramientas de testing automatizado

**Viewports clave:**
- 📱 Mobile: 320px - 767px (botones full-width, tipo responsive)
- 📱 Tablet: 768px - 1023px (layout híbrido)
- 💻 Desktop: 1024px+ (layout completo)

## QA y Testing

```sh
# Lint
npm run lint

# Tests unitarios
npm run test

# Coverage
npm run test:coverage

# QA completo (lint + tests)
npm run qa

# Mobile audit con Lighthouse
npx lighthouse http://localhost:5173 --preset=mobile --view
```

## Deploy

GitHub Actions → Vite build → GitHub Pages.

```sh
npm run build
```

## Documentación

- [CONTRIBUTING.md](./CONTRIBUTING.md) — Guía para contribuir al proyecto
- [MOBILE_QA.md](./MOBILE_QA.md) — Checklist y guía de QA mobile
- [HANDOFF_SPRINT.md](./HANDOFF_SPRINT.md) — Sprint de estabilización
- [V2/QA-CHECKLIST.md](./V2/QA-CHECKLIST.md) — Checklist QA general

---

Rodrigo Gaete · [@vientonorte](https://github.com/vientonorte)
