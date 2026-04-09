# 🐙 GitHub Setup Guide

> Guía rápida para subir tu portfolio a GitHub y configurar todo correctamente

---

## 🚀 Quick Start (5 minutos)

### Paso 1: Preparar el Proyecto

```bash
# Asegúrate de estar en el directorio del proyecto
cd /ruta/a/tu/portfolio

# Verificar que todo funciona
npm install
npm run build

# Si todo está OK, continúa
```

### Paso 2: Inicializar Git

```bash
# Inicializar repositorio (si no está inicializado)
git init

# Verificar archivos a incluir
git status

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "🎉 Initial commit: Portfolio Lead UX v1.2.0

✨ Features:
- Hero optimizado con i18n y reduced motion
- Company Hubs (Transvip + SURA)
- Design System completo
- Framework de Diseño de Producto
- Accesibilidad WCAG 2.1 AA
- Modo oscuro funcional
- Navegación inteligente

📚 Docs:
- README completo
- Guías de mantenimiento y deployment
- Quick wins roadmap

🛠 Tech Stack:
- React 18 + TypeScript
- Tailwind CSS 4.0
- Motion/React
- Vite + shadcn/ui"
```

### Paso 3: Crear Repositorio en GitHub

**Opción A: Desde Web (más visual)**

1. Ve a [github.com/new](https://github.com/new)
2. Repository name: `rodrigo-gaete-portfolio`
3. Description: `Portfolio profesional de Lead UX especializado en experiencia usuaria y desarrollo evolutivo de productos digitales`
4. Public ✅
5. NO inicialices con README, .gitignore, o license (ya los tienes)
6. Click "Create repository"

**Opción B: Desde CLI (más rápido)**

```bash
# Instalar GitHub CLI (si no lo tienes)
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: ver https://github.com/cli/cli#installation

# Login
gh auth login

# Crear repo
gh repo create rodrigo-gaete-portfolio \
  --public \
  --source=. \
  --remote=origin \
  --description="Portfolio profesional de Lead UX - React, TypeScript, Tailwind CSS"
```

### Paso 4: Push a GitHub

```bash
# Conectar con tu repositorio (si usaste opción A)
git remote add origin https://github.com/TU-USUARIO/rodrigo-gaete-portfolio.git

# Verificar remote
git remote -v

# Renombrar branch a 'main' (si es necesario)
git branch -M main

# Push
git push -u origin main
```

🎉 **¡Listo!** Tu código ya está en GitHub.

---

## 📝 Configuración del Repositorio

### Topics y Tags

Agrega topics para mejor descubrimiento:

1. Ve a tu repo en GitHub
2. Click en ⚙️ (Settings icon) junto a "About"
3. Agrega topics:
   ```
   portfolio
   ux-design
   react
   typescript
   tailwind-css
   design-system
   framer-motion
   vite
   accessibility
   wcag
   lead-ux
   ```

### README Badges

Ya están incluidos en README.md:
- License badge
- React version
- TypeScript version
- Tailwind CSS version

### Social Preview Image

1. Crear imagen Open Graph (1280x640px) con tu branding
2. Repository Settings → Options → Social preview
3. Upload image

Sugerencia de contenido:
```
┌─────────────────────────────────────┐
│                                     │
│    [Logo con gradiente]             │
│                                     │
│    Rodrigo Gaete                    │
│    Lead UX Portfolio                │
│                                     │
│    React • TypeScript • Tailwind    │
│                                     │
└─────────────────────────────────────┘
```

---

## 🔧 GitHub Settings Recomendados

### General Settings

```
Repository Settings → General:

✅ Issues
✅ Projects (para kanban de mejoras)
❌ Wiki (no necesario, usas .md files)
❌ Sponsorships (a menos que quieras)
✅ Preserve this repository
✅ Discussions (opcional, para feedback)
```

### Branch Protection (Opcional pero recomendado)

```
Settings → Branches → Add rule

Branch name pattern: main

✅ Require pull request reviews before merging
✅ Require status checks to pass
   - npm run build
   - npm run type-check (si lo agregas)
```

### GitHub Actions (Opcional)

Crear `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Type check
        run: npx tsc --noEmit
        
      - name: Build
        run: npm run build
        
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist
```

---

## 📊 GitHub Project Board (Opcional)

Para organizar mejoras y quick wins:

1. Repository → Projects → New project
2. Template: "Board"
3. Crear columnas:
   - 📋 Backlog
   - 🔥 Quick Wins (from QUICK_WINS.md)
   - 🚧 In Progress
   - ✅ Done

4. Agregar issues desde QUICK_WINS.md:

```bash
# Crear issues desde CLI
gh issue create \
  --title "🎯 SEO: Meta tags dinámicos" \
  --body "Implementar SEO meta tags en todas las páginas según QUICK_WINS.md" \
  --label "enhancement,quick-win" \
  --assignee @me

gh issue create \
  --title "📊 Google Analytics 4 Integration" \
  --body "Configurar GA4 con event tracking según QUICK_WINS.md" \
  --label "enhancement,quick-win" \
  --assignee @me
```

---

## 🏷️ Versioning con Git Tags

Crear tags para cada release:

```bash
# Tag actual
git tag -a v1.2.0 -m "Release v1.2.0: Hero optimizado + Docs completos"

# Push tags
git push origin v1.2.0

# Ver todos los tags
git tag -l

# Crear release en GitHub
gh release create v1.2.0 \
  --title "v1.2.0 - Hero optimizado y documentación completa" \
  --notes "Ver CHANGELOG.md para detalles completos"
```

---

## 📄 Documentos Importantes

Verifica que estos archivos estén en tu repo:

```
✅ README.md          - Overview y guía principal
✅ LICENSE            - MIT License
✅ .gitignore         - Archivos a ignorar
✅ CHANGELOG.md       - Registro de cambios
✅ MAINTENANCE_GUIDE.md - Guía de mantenimiento
✅ QUICK_WINS.md      - Roadmap de mejoras
✅ DEPLOYMENT.md      - Guía de deployment
✅ GITHUB_SETUP.md    - Esta guía
```

---

## 🔒 Seguridad

### Secrets y Variables de Entorno

**⚠️ NUNCA commitear:**
- API keys
- Tokens
- Passwords
- Archivos .env

**Verificar .gitignore:**

```bash
# Ver qué archivos están siendo trackeados
git ls-files

# Si ves archivos sensibles, agrégalos a .gitignore
echo ".env.local" >> .gitignore
git rm --cached .env.local
git commit -m "🔒 Remove sensitive file"
```

### GitHub Secrets

Para CI/CD y deployments:

```
Settings → Secrets → Actions → New repository secret

Ejemplo:
Name: VERCEL_TOKEN
Value: [tu token de Vercel]
```

---

## 🤝 Workflow de Desarrollo

### Feature Branch

```bash
# Crear branch para nueva feature
git checkout -b feature/seo-meta-tags

# Hacer cambios...
git add .
git commit -m "✨ Add dynamic SEO meta tags"

# Push
git push origin feature/seo-meta-tags

# Crear PR desde CLI
gh pr create \
  --title "✨ Add dynamic SEO meta tags" \
  --body "Implementa meta tags dinámicos según QUICK_WINS.md #1" \
  --assignee @me
```

### Conventional Commits

Usa estos prefijos para commits claros:

```
✨ feat:     Nueva feature
🐛 fix:      Bug fix
📝 docs:     Documentación
🎨 style:    Cambios de estilos/formato
♻️  refactor: Refactorización
⚡️ perf:     Mejora de performance
✅ test:     Tests
🔧 chore:    Mantenimiento/config
🚀 deploy:   Deployment
```

Ejemplos:
```bash
git commit -m "✨ feat: Add blog section"
git commit -m "🐛 fix: Navigation mobile menu bug"
git commit -m "📝 docs: Update README with deployment steps"
git commit -m "⚡️ perf: Optimize images to WebP"
```

---

## 📈 GitHub Insights

### Ver estadísticas

```bash
# Contributors
gh api repos/{owner}/{repo}/contributors

# Traffic (views)
gh api repos/{owner}/{repo}/traffic/views

# Clones
gh api repos/{owner}/{repo}/traffic/clones
```

### GitHub Star History

Después de conseguir stars, usa:
- [star-history.com](https://star-history.com)

---

## 🌟 Promoción del Portfolio

### 1. LinkedIn Post

```
🎉 Emocionado de compartir mi nuevo portfolio!

Como Lead UX, diseñé esta experiencia para demostrar mi enfoque:
✅ Atomic Design para escalabilidad
✅ Framework de Diseño de Producto basado en data
✅ WCAG 2.1 AA - Accesibilidad primero
✅ Open source y bien documentado

Stack: React, TypeScript, Tailwind CSS, Framer Motion

🔗 GitHub: [tu link]
🌐 Live: [tu link]

#UXDesign #React #Portfolio #OpenSource
```

### 2. Twitter/X Thread

```
🧵 Thread: Cómo construí mi portfolio de Lead UX

1/8 Arranqué con Atomic Design - componentes reutilizables que escalan sin duplicación de código 🏗️

2/8 Implementé un Framework de Diseño de Producto con 5 macroprocesos que priorizan decisiones basadas en data 📊

[continúa...]

8/8 100% open source y documentado. Check it out!
🔗 [link]

#BuildInPublic #UXDesign
```

### 3. Dev.to Article

Título: "Building a Lead UX Portfolio with Atomic Design and React"

Outline:
1. Why atomic design matters
2. Tech stack decisions
3. Accessibility from day one
4. Performance optimizations
5. Lessons learned

---

## 🎯 Next Steps Checklist

Después de subir a GitHub:

- [ ] Repository configurado correctamente
- [ ] Topics agregados
- [ ] Social preview image
- [ ] README actualizado con links correctos
- [ ] Deploy a Vercel/Netlify (ver DEPLOYMENT.md)
- [ ] Actualizar README con URL del sitio live
- [ ] Crear issues desde QUICK_WINS.md
- [ ] Compartir en LinkedIn
- [ ] Compartir en Twitter/X
- [ ] Submit a directorios de portfolios:
  - [ ] [bestfolios.com](https://bestfolios.com)
  - [ ] [awwwards.com](https://awwwards.com)
  - [ ] [siteinspire.com](https://siteinspire.com)

---

## 🆘 Comandos Útiles

```bash
# Ver estado
git status

# Ver diferencias
git diff

# Ver historial
git log --oneline --graph

# Deshacer último commit (mantiene cambios)
git reset --soft HEAD~1

# Deshacer cambios no commiteados
git restore .

# Ver branches
git branch -a

# Limpiar branches viejos
git branch -d feature/old-branch

# Actualizar desde remote
git pull origin main

# Ver configuración
git config --list

# Ver remotes
git remote -v
```

---

<div align="center">

**🎉 ¡Tu portfolio ya está en GitHub!**

Ahora sí, a conseguir oportunidades 🚀

**[Ver Deployment Guide →](DEPLOYMENT.md)**

</div>
