# 🔧 Guía de Mantenimiento del Portfolio

> Documentación completa para agregar, modificar y mantener el portfolio escalable

---

## 📋 Tabla de Contenidos

- [Agregar Nueva Empresa](#agregar-nueva-empresa)
- [Agregar Nuevo Proyecto](#agregar-nuevo-proyecto)
- [Agregar Nuevo Proceso UX](#agregar-nuevo-proceso-ux)
- [Pipeline de imágenes y POCs](#pipeline-de-imágenes-y-pocs)
- [Hero y rutas interactivas](#hero-y-rutas-interactivas)
- [Assets Figma (FigJam / Slides)](#assets-figma-figjam--slides)
- [Modificar Design System](#modificar-design-system)
- [Actualizar Traducciones](#actualizar-traducciones)
- [Contacto y privacidad](#contacto-y-privacidad)
- [Logs de sesión y QA](#logs-de-sesión-y-qa)
- [Troubleshooting](#troubleshooting)

---

## 🏢 Agregar Nueva Empresa

### Paso 1: Crear CompanyHub en `/data/projects-data.ts`

```typescript
export const nuevaEmpresaHub: CompanyHub = {
  id: "nueva-empresa",                    // ⚠️ ID único, kebab-case
  name: "Nueva Empresa S.A.",
  industry: "FinTech",                    // Industria de la empresa
  period: "2024-2025",                    // Período de trabajo
  totalProjects: 3,                       // Número total de proyectos
  logo: "/path/to/logo.svg",              // Logo de la empresa
  heroImage: "/path/to/hero.jpg",         // Imagen de hero
  description: "Breve descripción de la empresa y rol...",
  
  // Métricas de impacto (opcional)
  metrics: {
    users: 50000,
    nps: 85,
    conversionRate: 12.5,
    // ... otras métricas relevantes
  },

  // Array de proyectos
  projects: [
    {
      id: "proyecto-1",                   // ⚠️ ID único global
      projectName: "Nombre del Proyecto",
      description: "Descripción corta para cards",
      fullDescription: "Descripción detallada completa...",
      
      // Detalles completos del proyecto
      details: {
        challenge: "El problema que se resolvió...",
        solution: "La solución implementada...",
        results: [
          "Resultado medible 1",
          "Resultado medible 2"
        ],
        learnings: [
          "Aprendizaje clave 1",
          "Aprendizaje clave 2"
        ]
      },

      // Metadata
      period: "Q3-Q4 2024",
      tags: ["React", "UX Research", "Design System"],
      images: ["/path/to/image1.jpg", "/path/to/image2.jpg"],
      
      // Procesos UX aplicados (1-5)
      processCount: 4,
      processes: ["ux-analytics", "ux-research", "ux-ui-design", "ux-testing"]
    },
    // ... más proyectos
  ]
};
```

### Paso 2: Actualizar `/App.tsx`

Agregar la empresa al `companyMap`:

```typescript
// Importar el hub
import { nuevaEmpresaHub } from "./data/projects-data";

// En el companyMap (línea ~85)
const companyMap: Record<string, any> = {
  "transvip": transvipHub,
  "sura": suraHub,
  "nueva-empresa": nuevaEmpresaHub,  // ✅ Agregar aquí
};
```

### Paso 3: Actualizar `/components/organisms/ProjectsHub.tsx`

Agregar la empresa al array de companies:

```typescript
const companies = [
  { hub: transvipHub, id: "transvip" },
  { hub: suraHub, id: "sura-investments" },
  { hub: nuevaEmpresaHub, id: "nueva-empresa" },  // ✅ Agregar aquí
];
```

### Paso 4: Agregar traducciones (opcional)

Si necesitas textos específicos de la empresa en `/lib/i18n.ts`:

```typescript
export const translations = {
  es: {
    companies: {
      nuevaEmpresa: {
        name: "Nueva Empresa",
        tagline: "Innovación FinTech"
      }
    }
  },
  en: {
    companies: {
      nuevaEmpresa: {
        name: "New Company",
        tagline: "FinTech Innovation"
      }
    }
  }
};
```

---

## 📁 Agregar Nuevo Proyecto

### Opción A: Proyecto dentro de CompanyHub existente

Simplemente agrega un nuevo objeto al array `projects` del CompanyHub:

```typescript
// En /data/projects-data.ts
export const transvipHub: CompanyHub = {
  // ... metadata de la empresa
  projects: [
    // ... proyectos existentes
    {
      id: "nuevo-proyecto-transvip",  // ⚠️ ID único
      projectName: "Nuevo Feature X",
      description: "Implementación de nueva funcionalidad...",
      // ... resto de campos
    }
  ]
};
```

### Opción B: Proyecto standalone (como Framework)

1. **Crear archivo separado** (ej: `/data/mi-proyecto.ts`):

```typescript
import { EnhancedProject } from "./projects-data";

export const miProyectoData: EnhancedProject = {
  id: "mi-proyecto-standalone",
  projectName: "Mi Proyecto Especial",
  description: "Descripción del proyecto...",
  // ... campos completos
};
```

2. **Actualizar `/App.tsx`** en el `projectMap`:

```typescript
import { miProyectoData } from "./data/mi-proyecto";

const projectMap: Record<string, { data: any; parentCompany: string }> = {
  // ... otros proyectos
  "mi-proyecto-standalone": {
    data: miProyectoData,
    parentCompany: "standalone"  // o la empresa padre
  }
};
```

### Actualizar `projectMap` en App.tsx

Para **todos** los proyectos nuevos, actualiza el mapping de navegación:

```typescript
// En /App.tsx, línea ~136
const projectMap: Record<string, { data: any; parentCompany: string }> = {
  // Proyectos Transvip
  "karri-calculadora": { 
    data: karriCalculadoraProject, 
    parentCompany: "transvip" 
  },
  // ... otros proyectos
  
  // ✅ TU NUEVO PROYECTO
  "nuevo-proyecto-id": {
    data: nuevoProyectoData,
    parentCompany: "empresa-id"  // debe coincidir con ID en companyMap
  }
};
```

---

## 🔄 Agregar Nuevo Proceso UX

Si quieres agregar un 6to proceso al framework (ej: "UX Writing"):

### Paso 1: Crear página en `/pages/`

```typescript
// /pages/ProcessDetail.tsx - agregar nuevo case

if (processId === "ux-writing") {
  return (
    <ProcessDetailContent
      processData={{
        icon: PenTool,
        title: t.process.uxWriting.title,
        description: t.process.uxWriting.description,
        // ... más configuración
      }}
      // ... props
    />
  );
}
```

### Paso 2: Actualizar traducciones

```typescript
// /lib/i18n.ts
export const translations = {
  es: {
    processes: {
      uxWriting: {
        title: "UX Writing",
        description: "Creación de microcopy efectivo...",
        // ... más textos
      }
    }
  }
};
```

### Paso 3: Agregar a las listas de procesos

```typescript
// En /pages/CaseStudies.tsx, array de processes
const processes = [
  // ... procesos existentes
  {
    id: "ux-writing",
    icon: PenTool,
    title: t.caseStudies.process.phases.writing.title,
    description: t.caseStudies.process.phases.writing.description,
  }
];
```

---

## 🖼 Pipeline de imágenes y POCs

### Imágenes semánticas (`public/images/`)

1. Export Figma → `src/assets/<hash>.png` (Vite empaqueta).
2. Sincronizar nombres legibles: `npm run sync:images` → `scripts/sync-semantic-images.sh`.
3. Registrar URL en `src/lib/portfolio-image-urls.ts`.
4. Opcional: entrada en `src/data/image-registry.ts` (admin fotos).
5. Grid destacado: `FEATURED_CASE_STUDY_IDS` + `featuredCaseStudies` en `src/lib/i18n.ts` + `imageForProject()` en `src/data/case-study-cards.ts`.

### POC con URL externa (Figma Sites)

En `src/data/projects-data.ts` dentro del hub SURA:

```typescript
{
  id: "sura-ia-automation-dashboard",
  externalLink: "https://badge-sweet-21070688.figma.site",
  image: portfolioImages.sura.iaAutomationDashboard,
  // ...
}
```

Captura reproducible del POC:

```bash
bash scripts/capture-ia-poc-screenshot.sh
```

### Backlog para nuevos POCs (#97)

Cuando Rö entregue nuevos links de POC, seguir este patrón mínimo:

1. `src/data/projects-data.ts` → crear/actualizar proyecto con `id` semántico + `externalLink`.
2. `src/lib/project-metrics.ts` → agregar KPIs headline (`PROJECT_HEADLINE_METRICS`) y keywords SEO (`PROJECT_SEO_KEYWORDS`).
3. Opcional para grid destacado: `src/data/case-study-cards.ts` + `featuredCaseStudies` ES/EN en `src/lib/i18n.ts`.
4. Guardar screenshot semántico en `public/images/` y mapearlo en `src/lib/portfolio-image-urls.ts` (si corresponde).

Checklist por POC:

- [ ] ID semántico
- [ ] `externalLink`
- [ ] Screenshot en `public/images/`
- [ ] Copy ES/EN

### Binarios pesados

- `*.fig`, `*.deck` están en `.gitignore` — no versionar.
- Exportar PNG/WebP a `public/images/` con nombre semántico.

---

## 🧭 Hero y rutas interactivas

### Buscador inteligente (home)

| Archivo | Rol |
|---------|-----|
| `src/components/organisms/Hero.tsx` | Layout hero, scroll parallax, delega al buscador |
| `src/components/molecules/HeroIntelligentSearch.tsx` | Combobox + sugerencias + panel CTA |
| `src/lib/hero-search.ts` | Filtro de sugerencias por query/keywords |
| `src/lib/featured-path-routes.ts` | Navegación `route/`, `section/`, `path/` |
| `src/lib/i18n/locales/*.ts` → `hero.unifiedBanner` | Copy, tabs, panels y `suggestions[]` |

**Comportamiento responsive**

| Viewport | Sugerencias |
|----------|-------------|
| &lt;640px (`useIsSmDown`) | Lista **inline** bajo el input, siempre visible hasta elegir una |
| ≥640px | Dropdown absoluto al focus / escribir |

Añadir sugerencia: objeto en `hero.unifiedBanner.suggestions` (ES + EN) con `id`, `category`, `title`, `hint`, `href`, `keywords`.

**Regla:** métricas de casos (NPS, −40%, etc.) viven en `#impacto` y `/proyectos`, no en el hero.

### Banner unificado (legacy)

`HeroUnifiedBanner.tsx` queda como referencia de copy/panels; el home usa `HeroIntelligentSearch`.

### Proyecto destacado RIA (`#impacto`)

| Archivo | Rol |
|---------|-----|
| `src/components/organisms/ImpactStats.tsx` | Card + métricas clicables |
| `src/components/molecules/FeaturedCaseNavigator.tsx` | Paths reutilizando `HeroAudienceCta` |
| `src/lib/featured-path-routes.ts` | `project/`, `process/`, `company/` |
| `src/lib/i18n.ts` → `impactStats.featured.paths` | Rutas y copy |

Añadir un path:

```typescript
// i18n impactStats.featured.paths[]
{
  id: 'mi-path',
  title: 'Título',
  hint: 'Descripción breve',
  href: 'project/sura-ria-us', // o process/ux-research, company/sura-investments
  featured: false,
}
```

Icono: mapear `id` en `PATH_ICONS` de `FeaturedCaseNavigator.tsx`.

---

## 📎 Assets Figma (FigJam / Slides)

**No embeder sin validar permisos públicos.** Slides a menudo exigen login.

| Asset | Uso recomendado | Dónde |
|-------|-----------------|-------|
| FigJam crítica de diseño | Playbook de taller | `/proceso/fase/ux-testing` |
| FigJam PORTAFOLIO | Auditoría ejemplo | `/auditoria` (ya integrado) |
| Slides tutoría asesor CO | Enablement regional | `/proyecto/sura-ux-enterprise` |

Patrón futuro: campo opcional `playbook` en `processes-data.ts` + componente `FigJamEmbed` (ver `AuditoriaPortfolio.tsx`).

### Demos consultoría (Figma Make)

| Archivo | Rol |
|---------|-----|
| `src/data/consultoria-demos.ts` | URL pública + embed |
| `src/components/organisms/ConsultoriaDemoShowcase.tsx` | Sección en `/consultoria` |
| `src/lib/i18n.ts` → `consultoria.demo` | Copy ES/EN |

Añadir demo: extender `consultoria-demos.ts` y copy en i18n; montar en `ConsultoriaVientoNorte.tsx`.

---

## 🎨 Modificar Design System

### Cambiar Colores del Brand

En `/styles/globals.css`:

```css
@theme {
  /* Primary Brand Colors */
  --color-primary-start: #FF1D25;  /* Modifica estos valores */
  --color-primary-end: #FF931E;
  
  --brand-gradient: linear-gradient(
    135deg,
    var(--color-primary-start) 0%,
    var(--color-primary-end) 100%
  );
}
```

### Cambiar Tipografía

1. **Agregar fuente** en `/index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nueva+Font:wght@400;700&display=swap" rel="stylesheet">
```

2. **Actualizar tokens** en `/styles/globals.css`:

```css
@theme {
  --font-heading: "Nueva Font", sans-serif;
  --font-body: system-ui, sans-serif;
}
```

### Agregar Nuevo Componente UI

Usa shadcn/ui CLI:

```bash
# Instalar componente de shadcn
npx shadcn@latest add [component-name]

# Ejemplo: agregar Tooltip
npx shadcn@latest add tooltip
```

El componente se creará automáticamente en `/components/ui/`

---

## 🌐 Actualizar Traducciones

### Agregar Nuevo Idioma (ej: Portugués)

1. **Extender type** en `/lib/i18n.ts`:

```typescript
export type Language = "es" | "en" | "pt";  // ✅ Agregar 'pt'
```

2. **Agregar traducciones**:

```typescript
export const translations = {
  es: { /* ... */ },
  en: { /* ... */ },
  pt: {  // ✅ Nuevas traducciones
    hero: {
      title: "Lead UX projetando experiências...",
      // ... todas las traducciones
    }
  }
};
```

3. **Actualizar LanguageToggle**:

```typescript
// /components/atoms/LanguageToggle.tsx
const languages = [
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "pt", label: "PT", flag: "🇧🇷" },  // ✅ Agregar
];
```

### Modificar Textos Existentes

Simplemente edita el objeto correspondiente en `/lib/i18n.ts`:

```typescript
export const translations = {
  es: {
    hero: {
      title: "Tu nuevo título aquí",  // ✅ Modifica directamente
      // ...
    }
  }
};
```

---

## 🐛 Troubleshooting

### Error: "Project not found" en navegación

**Causa:** El ID del proyecto no está en `projectMap` de `/App.tsx`

**Solución:**
```typescript
// Verificar que existe en projectMap
const projectMap: Record<string, { data: any; parentCompany: string }> = {
  "tu-proyecto-id": {  // ✅ Debe coincidir exactamente
    data: tuProyectoData,
    parentCompany: "empresa-id"
  }
};
```

### Error: TypeScript en `projects-data.ts`

**Causa:** Faltan campos requeridos en la interfaz `EnhancedProject`

**Solución:** Asegúrate de incluir todos los campos requeridos:
```typescript
{
  id: "required",
  projectName: "required",
  description: "required",
  period: "required",
  tags: ["required"],
  processCount: 1,  // required
  // ... resto de campos opcionales
}
```

## 📋 Logs de sesión y QA

### Buenas prácticas

1. **Un log por sesión de deploy relevante:** `docs/SESSION-YYYY-MM-DD.md`
2. **CHANGELOG raíz** (`/CHANGELOG.md`): entrada datada con Added/Changed/Fixed
3. **QA manual:** checklist en el log de sesión; marcar bloqueantes antes de cerrar
4. **Issues:** backlog trazable (#97 POCs, #98 Grafo, #99 assets `.fig`)
5. **Producción:** verificar con incógnito tras push a `main` (SW v4)

Plantilla: `docs/SESSION-2026-07-07.md`

### Comandos QA

```bash
npm run ci             # lint + types + test + build
npm run qa:routes      # Playwright: rutas HashRouter + secciones ancla
npm run qa:production  # smoke producción (curl + grep)
```

`qa:routes` corre en CI tras el build. Local: `node scripts/qa-routes.mjs [baseUrl]` (default: GitHub Pages).

### Manifest de imágenes (Worker)

El override remoto (`/api/images/manifest`) solo se consulta en `/admin/fotos` para evitar errores CORS en GitHub Pages. Para habilitarlo en todo el sitio (cuando el Worker exponga `Access-Control-Allow-Origin: https://vientonorte.github.io`), define `VITE_IMAGE_MANIFEST_PUBLIC=true` en el build.

---

## 📬 Contacto y privacidad

Runbook completo: [`docs/CONTACT_AND_PRIVACY.md`](../docs/CONTACT_AND_PRIVACY.md)

### Cambiar email público

Editar `src/lib/site-contact.ts`:

- `PUBLIC_CONTACT_EMAIL` — lo que ve el visitante (`contacto@vientonorte.cl`)
- `FORM_SUBMIT_INBOX` — inbox real de FormSubmit (o `VITE_FORM_SUBMIT_INBOX`)

### Cambiar textos del formulario / asistente

Traducciones en `src/lib/i18n.ts` → `contact.form`, `contact.assistant`, `privacyPage`.

Componentes:

- `src/components/organisms/Contact.tsx`
- `src/components/organisms/ContactAssistant.tsx`
- `src/components/molecules/ContactConsentField.tsx`

### Cadena de envío

Lógica en `src/lib/submit-contact.ts`: **FormSubmit (navegador) → Worker → mailto**. No invertir el orden sin actualizar el runbook.

### Activar FormSubmit (producción)

Tras el primer envío, abrir el enlace de activación en `gaete.gaona@gmail.com`. Sin esto el formulario falla aunque el deploy esté OK.

---

### Cambios no visibles en GitHub Pages

**Causa:** Service worker cache o deploy cancelado por push seguido

**Solución:**
1. Incógnito o DevTools → Application → Unregister service worker
2. Hard refresh (`Cmd+Shift+R`)
3. Confirmar workflow **Deploy to GitHub Pages** success en Actions

### Imágenes no se muestran

**Causa:** Ruta incorrecta o imagen no existe en `/public/`

**Solución:**
1. Verifica que la imagen existe en `/public/`
2. Usa rutas absolutas: `/images/nombre.jpg`
3. No uses `./` o rutas relativas

### Navegación no funciona

**Causa:** Callbacks `onNavigateTo*` no conectados o rutas HashRouter mal formadas

**Solución:** Verifica que los callbacks usan `useNavigate()` de React Router:
```typescript
// En App.tsx o página contenedora
const navigate = useNavigate();

<Projects
  onNavigateToProject={(id) => navigate(`/proyecto/${id}`)}
  onNavigateToCaseStudies={() => navigate('/proceso')}
/>

// En componente hijo
<CaseStudyCard onRead={() => openProject(study.id)} />
```

Rutas públicas en GitHub Pages: `https://vientonorte.github.io/mi-portafolio/#/proyecto/:id`

---

## 📊 Checklist de Validación

Antes de hacer commit, verifica:

- [ ] **IDs únicos** - Cada proyecto/empresa tiene ID único
- [ ] **TypeScript compila** - `npm run build` sin errores
- [ ] **Traducciones completas** - ES y EN tienen las mismas keys
- [ ] **Rutas de imágenes** - Todas las imágenes existen
- [ ] **Navigation mapping** - Todos los IDs en `projectMap` y `companyMap`
- [ ] **Links funcionan** - Prueba navegación completa
- [ ] **Responsive** - Prueba mobile, tablet y desktop
- [ ] **Accesibilidad** - Navegación por teclado funciona

---

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Servidor local

# Build
npm run build           # Compilar para producción
npm run preview         # Preview del build

# Validación
npm run type-check      # Verificar TypeScript
npm run lint            # Linter

# Limpieza
rm -rf node_modules     # Limpiar node_modules
npm install             # Reinstalar dependencias
```

---

## 📞 Soporte

Si tienes dudas o encuentras bugs:

1. Revisa esta guía primero
2. Busca en issues existentes de GitHub
3. Crea un nuevo issue con:
   - Descripción del problema
   - Steps to reproduce
   - Screenshots si aplica
   - Versión de Node.js

---

<div align="center">

**🎯 Mantener el código limpio es mantener la cordura**

Documentación actualizada: 2026-07-07 — ver `docs/SESSION-2026-07-07.md`

</div>
