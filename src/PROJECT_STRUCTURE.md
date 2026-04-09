# 📁 Estructura Completa del Proyecto

> Documentación de todos los archivos y carpetas del portfolio

---

## 🗂️ Estructura de Directorios

```
rodrigo-gaete-portfolio/
│
├── 📁 components/                  # Componentes React (Atomic Design)
│   ├── 📁 atoms/                   # Componentes básicos
│   │   ├── Logo.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── LanguageToggle.tsx
│   │
│   ├── 📁 molecules/               # Componentes intermedios
│   │   ├── Card.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── ProcessPhaseCard.tsx
│   │   └── ProjectCard.tsx
│   │
│   ├── 📁 organisms/               # Componentes complejos
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── About.tsx
│   │   ├── ImpactStats.tsx
│   │   ├── ProjectsHub.tsx
│   │   ├── Experience.tsx
│   │   ├── Contact.tsx
│   │   ├── FrameworkDetailPage.tsx
│   │   ├── NotFound.tsx
│   │   └── DesignTokens.tsx
│   │
│   ├── 📁 figma/                   # Componentes especiales Figma
│   │   └── ImageWithFallback.tsx
│   │
│   └── 📁 ui/                      # shadcn/ui components
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input-otp.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toggle-group.tsx
│       ├── toggle.tsx
│       └── tooltip.tsx
│
├── 📁 pages/                       # Páginas completas
│   ├── DesignSystem.tsx
│   ├── CaseStudies.tsx
│   ├── ProcessDetail.tsx
│   ├── CompanyDetail.tsx
│   └── ProjectDetail.tsx
│
├── 📁 data/                        # Datos centralizados
│   ├── projects-data.ts            # CompanyHubs y proyectos
│   └── karri-projects.ts           # Proyectos específicos Karri
│
├── 📁 lib/                         # Utilidades y contextos
│   ├── LanguageContext.tsx         # Context i18n
│   ├── i18n.ts                     # Traducciones ES/EN
│   └── utils.ts                    # Helper functions
│
├── 📁 styles/                      # Estilos globales
│   └── globals.css                 # Tokens Tailwind + CSS global
│
├── 📁 public/                      # Assets públicos (crear manualmente)
│   ├── vite.svg                    # Favicon por defecto
│   └── images/                     # Tus imágenes
│       ├── logo.svg
│       ├── projects/
│       └── companies/
│
├── 📄 App.tsx                      # Componente principal con routing
├── 📄 main.tsx                     # Entry point React
├── 📄 index.html                   # HTML base
│
├── ⚙️  package.json                # Dependencias
├── ⚙️  tsconfig.json               # Config TypeScript
├── ⚙️  tsconfig.node.json          # Config TS Node
├── ⚙️  vite.config.ts              # Config Vite
│
├── 📝 .gitignore                   # Archivos a ignorar en Git
├── 📝 .env.example                 # Template de variables
├── 📝 LICENSE                      # MIT License
│
└── 📚 Documentación/               # Guías y docs
    ├── README.md                   # Overview principal
    ├── START_HERE.md               # Guía de inicio rápido
    ├── MAINTENANCE_GUIDE.md        # Manual de mantenimiento
    ├── QUICK_WINS.md               # Roadmap de mejoras
    ├── DEPLOYMENT.md               # Guía de deployment
    ├── GITHUB_SETUP.md             # Setup de GitHub
    ├── FIX_ERRORS.md               # Solución de errores
    ├── GIT_FIX_COMMANDS.md         # Comandos Git
    ├── CHANGELOG.md                # Historial de cambios
    ├── PROJECT_STRUCTURE.md        # Este archivo
    ├── Attributions.md             # Atribuciones
    ├── BRAND_SYSTEM.md             # Brand guidelines
    ├── Guidelines.md               # Guías de desarrollo
    ├── HEURISTIC_EVALUATION.md     # Evaluación heurística
    └── PROJECT_ARCHITECTURE.md     # Arquitectura detallada
```

---

## 📦 Archivos por Categoría

### 🔧 Configuración (Root)

```
✅ package.json          - Dependencias y scripts
✅ tsconfig.json         - Config TypeScript
✅ tsconfig.node.json    - Config TS para Node
✅ vite.config.ts        - Config Vite build tool
✅ index.html            - HTML entry point
✅ main.tsx              - React entry point
✅ App.tsx               - Componente raíz con routing
✅ .gitignore            - Archivos ignorados por Git
✅ .env.example          - Template variables de entorno
✅ LICENSE               - MIT License
```

### 🎨 Componentes UI

#### Atoms (Básicos)
```
components/atoms/
├── Logo.tsx               - Logo animado con gradiente
├── ScrollProgress.tsx     - Barra de progreso de scroll
├── ThemeToggle.tsx        - Toggle modo oscuro/claro
└── LanguageToggle.tsx     - Toggle ES/EN
```

#### Molecules (Intermedios)
```
components/molecules/
├── Card.tsx               - Card reutilizable
├── SectionHeader.tsx      - Header de secciones
├── ProcessPhaseCard.tsx   - Card de proceso UX
└── ProjectCard.tsx        - Card de proyecto
```

#### Organisms (Complejos)
```
components/organisms/
├── Hero.tsx               - Hero section optimizado
├── Navigation.tsx         - Navegación sticky inteligente
├── About.tsx              - Sección sobre mí
├── ImpactStats.tsx        - Métricas de impacto
├── ProjectsHub.tsx        - Hub de proyectos por empresa
├── Experience.tsx         - Experiencia laboral
├── Contact.tsx            - Formulario de contacto
├── FrameworkDetailPage.tsx - Detalle del framework
├── NotFound.tsx           - Página 404
└── DesignTokens.tsx       - Visualización de tokens
```

#### shadcn/ui (Librería)
```
components/ui/
├── button.tsx             - Botones con variantes
├── card.tsx               - Cards
├── dialog.tsx             - Modales
├── tabs.tsx               - Tabs
├── tooltip.tsx            - Tooltips
├── badge.tsx              - Badges
├── accordion.tsx          - Acordeones
├── carousel.tsx           - Carruseles
└── ... (43 componentes más)
```

### 📄 Páginas

```
pages/
├── DesignSystem.tsx       - Página de Design System completo
├── CaseStudies.tsx        - Casos de estudio y framework
├── ProcessDetail.tsx      - Detalle de cada proceso UX
├── CompanyDetail.tsx      - Detalle de empresa (hub)
└── ProjectDetail.tsx      - Detalle de proyecto individual
```

### 📊 Datos

```
data/
├── projects-data.ts       - CompanyHubs (Transvip, SURA)
│                           - Estructura de proyectos
│                           - Metadata de empresas
│
└── karri-projects.ts      - Proyectos específicos de Karri
                            - Calculadora, Notificaciones, Design Sprint
```

### 🛠 Utilidades

```
lib/
├── LanguageContext.tsx    - Context para i18n
├── i18n.ts                - Traducciones ES/EN completas
└── utils.ts               - Helper functions (cn, etc)
```

### 🎨 Estilos

```
styles/
└── globals.css            - CSS global con:
                            - Tokens de color (brand gradient)
                            - Tokens de tipografía (Chillax)
                            - Tailwind base styles
                            - Custom utilities
```

### 📚 Documentación

```
📝 README.md               - Overview completo
📝 START_HERE.md           - Guía de inicio (EMPIEZA AQUÍ)
📝 MAINTENANCE_GUIDE.md    - Cómo agregar empresas/proyectos
📝 QUICK_WINS.md           - 13 mejoras priorizadas
📝 DEPLOYMENT.md           - Deploy a Vercel/Netlify/GitHub
📝 GITHUB_SETUP.md         - Setup de GitHub paso a paso
📝 FIX_ERRORS.md           - Solución de errores comunes
📝 GIT_FIX_COMMANDS.md     - Comandos Git útiles
📝 CHANGELOG.md            - Historial de versiones
📝 PROJECT_STRUCTURE.md    - Este archivo
📝 Attributions.md         - Créditos y atribuciones
📝 BRAND_SYSTEM.md         - Brandbook y guías de marca
📝 Guidelines.md           - Guías de desarrollo
📝 HEURISTIC_EVALUATION.md - Evaluación UX heurística
📝 PROJECT_ARCHITECTURE.md - Arquitectura detallada
```

---

## 📋 Checklist de Archivos Esenciales

### ✅ Archivos que DEBEN existir

```bash
# Root
✅ package.json
✅ tsconfig.json
✅ tsconfig.node.json
✅ vite.config.ts
✅ index.html
✅ main.tsx
✅ App.tsx
✅ .gitignore
✅ LICENSE

# Components (mínimo necesario)
✅ components/atoms/Logo.tsx
✅ components/atoms/ThemeToggle.tsx
✅ components/organisms/Hero.tsx
✅ components/organisms/Navigation.tsx

# Pages
✅ pages/DesignSystem.tsx
✅ pages/CaseStudies.tsx

# Data
✅ data/projects-data.ts

# Lib
✅ lib/LanguageContext.tsx
✅ lib/i18n.ts
✅ lib/utils.ts

# Styles
✅ styles/globals.css

# Docs
✅ README.md
✅ START_HERE.md
```

### ⚠️ Archivos que NO deben existir

```bash
❌ /LICENSE/cualquier-archivo.tsx   # LICENSE debe ser ARCHIVO, no carpeta
❌ node_modules/ en GitHub          # Debe estar en .gitignore
❌ .env con secrets                  # Solo .env.example
❌ dist/ en GitHub                   # Build output, ignorar
❌ package-lock.json en GitHub       # Opcional pero mejor ignorar
```

---

## 🔍 Verificar Estructura

### Comando para listar archivos

```bash
# En tu terminal, desde la raíz del proyecto:

# Listar estructura de carpetas
tree -L 3 -I 'node_modules|dist'

# O en Windows (PowerShell):
Get-ChildItem -Recurse -Directory | Select-Object FullName

# Verificar que LICENSE es un archivo (no carpeta)
file LICENSE
# Debe decir: "LICENSE: ASCII text"
```

### Script de validación

Crea un archivo `validate-structure.sh`:

```bash
#!/bin/bash

echo "🔍 Validando estructura del proyecto..."

# Archivos críticos
FILES=(
  "package.json"
  "tsconfig.json"
  "App.tsx"
  "main.tsx"
  "index.html"
  "LICENSE"
  "README.md"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ Falta: $file"
  fi
done

# Verificar que LICENSE no es una carpeta
if [ -d "LICENSE" ]; then
  echo "❌ ERROR: LICENSE es una carpeta (debe ser archivo)"
else
  echo "✅ LICENSE es un archivo"
fi

# Carpetas críticas
DIRS=(
  "components"
  "pages"
  "data"
  "lib"
  "styles"
)

for dir in "${DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo "✅ /$dir"
  else
    echo "❌ Falta carpeta: /$dir"
  fi
done

echo ""
echo "✨ Validación completa!"
```

Ejecutar:
```bash
chmod +x validate-structure.sh
./validate-structure.sh
```

---

## 📦 Tamaño del Proyecto

```
Archivos TypeScript/TSX:    ~80 archivos
Archivos de documentación:  ~15 archivos .md
Componentes UI (shadcn):    ~50 componentes
Total líneas de código:     ~15,000 líneas
Tamaño en disco (sin deps): ~5 MB
Con node_modules:           ~300 MB
```

---

## 🎯 Navegación Rápida

### Para Desarrolladores

```
📝 Empezar aquí:           START_HERE.md
🔧 Agregar proyectos:      MAINTENANCE_GUIDE.md
🚀 Deploy:                 DEPLOYMENT.md
⚡ Mejoras rápidas:        QUICK_WINS.md
```

### Para Revisión de Código

```
📐 Arquitectura:           PROJECT_ARCHITECTURE.md
🏗️  Estructura:            PROJECT_STRUCTURE.md (este)
🎨 Design System:          /pages/DesignSystem.tsx
📊 Datos:                  /data/projects-data.ts
```

### Para UX Review

```
🎯 Evaluación Heurística:  HEURISTIC_EVALUATION.md
🎨 Brand System:           BRAND_SYSTEM.md
♿ Accesibilidad:          README.md (sección Accesibilidad)
```

---

## 🔄 Mantener Actualizado

Cuando agregues archivos nuevos:

1. Actualiza este documento
2. Actualiza .gitignore si es necesario
3. Actualiza README.md con nueva info
4. Haz commit descriptivo:
   ```bash
   git add .
   git commit -m "📁 Add: [descripción del archivo/carpeta]"
   ```

---

## 📞 Ayuda

Si faltan archivos o tienes dudas sobre la estructura:

- Ver: [FIX_ERRORS.md](FIX_ERRORS.md)
- Ver: [MAINTENANCE_GUIDE.md](MAINTENANCE_GUIDE.md)
- Ejecutar: `npm run dev` y verificar errores

---

<div align="center">

**📁 Estructura documentada v1.2.0**

Última actualización: 12 de Noviembre, 2025

</div>
