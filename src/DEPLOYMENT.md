# 🚀 Guía de Deployment

> Instrucciones paso a paso para desplegar tu portfolio en producción

---

## 📋 Opciones de Hosting

### 🟢 Vercel (Recomendado)
- ✅ Deploy automático desde GitHub
- ✅ SSL gratis
- ✅ CDN global
- ✅ Zero config para Vite
- ✅ Preview deployments en PRs
- ✅ Dominio custom gratis

### 🔵 Netlify
- ✅ Deploy automático
- ✅ SSL gratis
- ✅ CDN global
- ✅ Form handling
- ✅ Edge functions

### 🟣 GitHub Pages
- ✅ Hosting gratis
- ✅ Integrado con GitHub
- ⚠️ Solo sitios públicos
- ⚠️ Requiere configuración manual

---

## 🟢 Deploy en Vercel

### Opción 1: Deploy desde CLI (Más Rápido)

```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Seguir prompts interactivos
# - Select scope: tu cuenta
# - Link to existing project: No
# - Project name: rodrigo-gaete-portfolio
# - Directory: ./
# - Override settings: No

# 5. Deploy a producción
vercel --prod
```

Tu sitio estará en: `https://rodrigo-gaete-portfolio.vercel.app`

### Opción 2: Deploy desde GitHub (Recomendado para CI/CD)

1. **Push tu código a GitHub:**

```bash
# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit: Portfolio Lead UX"

# Crear repo en GitHub (desde web o CLI)
gh repo create rodrigo-gaete-portfolio --public --source=. --remote=origin

# Push
git push -u origin main
```

2. **Conectar con Vercel:**

- Ve a [vercel.com](https://vercel.com)
- Click en "New Project"
- Import tu repositorio de GitHub
- Vercel detectará automáticamente que es un proyecto Vite
- Click "Deploy"

3. **Configuración automática:**

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

4. **Deploy automático:**
   - Cada push a `main` → Deploy a producción
   - Cada PR → Preview deployment con URL única

### Configurar Dominio Custom

1. En Vercel Dashboard → Project → Settings → Domains
2. Agregar tu dominio: `rodrigogaete.com`
3. Configurar DNS (Vercel te dará los registros):

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Esperar propagación (5-30 minutos)
5. SSL automático ✅

---

## 🔵 Deploy en Netlify

### Opción 1: Deploy Drag & Drop (Más Simple)

```bash
# 1. Build del proyecto
npm run build

# 2. Ir a https://app.netlify.com/drop
# 3. Arrastrar carpeta 'dist' al drop zone
```

### Opción 2: Deploy desde GitHub (CI/CD)

1. **Push a GitHub** (mismo proceso que Vercel)

2. **Conectar con Netlify:**
   - Ve a [netlify.com](https://netlify.com)
   - New site from Git
   - Connect to GitHub
   - Select repository

3. **Build settings:**

```
Build command: npm run build
Publish directory: dist
```

4. **Deploy!**

### Configurar Redirects para SPA

Crear archivo `/public/_redirects`:

```
/* /index.html 200
```

Esto asegura que todas las rutas funcionen correctamente.

### Variables de Entorno

En Netlify Dashboard → Site Settings → Build & Deploy → Environment:

```
VITE_GA_ID=G-XXXXXXXXXX
VITE_API_URL=https://api.example.com
```

---

## 🟣 Deploy en GitHub Pages

### Setup

1. **Instalar gh-pages:**

```bash
npm install --save-dev gh-pages
```

2. **Actualizar package.json:**

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://tu-usuario.github.io/rodrigo-gaete-portfolio"
}
```

3. **Configurar base en vite.config.ts:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/rodrigo-gaete-portfolio/' // ⚠️ Nombre de tu repo
})
```

4. **Deploy:**

```bash
npm run deploy
```

Tu sitio estará en: `https://tu-usuario.github.io/rodrigo-gaete-portfolio`

### GitHub Actions (Automático)

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 🔧 Configuración Post-Deploy

### 1. Verificar que todo funciona

**Checklist:**
- [ ] Home page carga correctamente
- [ ] Navegación funciona (todas las páginas)
- [ ] Imágenes se cargan
- [ ] Modo oscuro funciona
- [ ] Toggle de idioma funciona
- [ ] Links externos funcionan
- [ ] Formulario de contacto (si está implementado)
- [ ] Responsive en mobile/tablet/desktop

### 2. Optimizar para Producción

**Run Lighthouse Audit:**

```bash
# Instalar Lighthouse CLI
npm install -g lighthouse

# Auditar
lighthouse https://tu-dominio.com --view
```

**Targets:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### 3. Configurar Analytics

Si implementaste Google Analytics:

```html
<!-- En index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 4. SEO Final Checks

- [ ] Google Search Console configurado
- [ ] Sitemap.xml submitted
- [ ] robots.txt correcto
- [ ] Meta tags en todas las páginas
- [ ] Open Graph images correctas
- [ ] Structured data (JSON-LD) - opcional

---

## 📊 Monitoring

### Vercel Analytics (Gratis en Vercel)

Automático al usar Vercel. Ver en Dashboard → Analytics.

### Google Analytics 4

```typescript
// En tu código (si implementaste)
import { analytics } from "./lib/analytics";

// Track pageviews
useEffect(() => {
  analytics.pageView(window.location.pathname);
}, [location]);
```

### Uptime Monitoring

Servicios recomendados:
- **UptimeRobot** (gratis, 50 monitores)
- **Pingdom** (gratis, 1 monitor)
- **BetterUptime** (gratis con GitHub Student)

---

## 🐛 Troubleshooting

### Error: "404 Not Found" en rutas

**Causa:** SPA routing no configurado

**Solución Vercel:**
Crear `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Solución Netlify:**
Crear `public/_redirects`:

```
/* /index.html 200
```

### Error: Imágenes no cargan

**Causa:** Rutas incorrectas o base path mal configurado

**Solución:**
- Usa rutas absolutas desde `/`: `/images/logo.svg`
- Verifica que las imágenes estén en `/public/`
- Si usas GitHub Pages, configura `base` en vite.config

### Error: Env variables undefined

**Causa:** Variables no están en el hosting

**Solución:**
- Vercel: Settings → Environment Variables
- Netlify: Site Settings → Environment
- Prefijo con `VITE_` para que Vite las exponga al client

### Build falla con "out of memory"

**Causa:** Build muy grande o memoria insuficiente

**Solución:**

```bash
# Aumentar memoria de Node
NODE_OPTIONS=--max_old_space_size=4096 npm run build

# O en package.json
"build": "NODE_OPTIONS=--max_old_space_size=4096 vite build"
```

---

## 🎯 Checklist Pre-Deploy

- [ ] Build local exitoso (`npm run build`)
- [ ] Preview del build funciona (`npm run preview`)
- [ ] No hay console.errors
- [ ] No hay TypeScript errors
- [ ] Todas las imágenes existen
- [ ] Links funcionan
- [ ] Responsive verificado
- [ ] Modo oscuro funciona
- [ ] i18n funciona (ES/EN)
- [ ] Performance optimizada
- [ ] Meta tags configurados
- [ ] Analytics configurado (si aplica)
- [ ] .env.example actualizado (sin secrets)
- [ ] README actualizado con URL del sitio
- [ ] LICENSE presente
- [ ] .gitignore correcto

---

## 📈 Post-Deploy Checklist

**Día 1:**
- [ ] Verificar sitio en 3 navegadores diferentes
- [ ] Verificar mobile + desktop
- [ ] Configurar Google Search Console
- [ ] Submit sitemap
- [ ] Compartir en LinkedIn/Twitter

**Semana 1:**
- [ ] Revisar analytics
- [ ] Revisar errores en console (Sentry si configurado)
- [ ] Lighthouse audit
- [ ] Obtener feedback de 3-5 personas

**Mes 1:**
- [ ] Analizar métricas de uso
- [ ] Identificar páginas más visitadas
- [ ] Optimizar conversion funnels
- [ ] Implementar quick wins de QUICK_WINS.md

---

## 🚨 Rollback (si algo sale mal)

### Vercel
- Dashboard → Deployments
- Find previous working deployment
- Click "..." → "Promote to Production"

### Netlify
- Deploys tab
- Select previous deploy
- "Publish deploy"

### GitHub Pages
```bash
# Revertir commit
git revert HEAD
git push

# O volver a una versión anterior
git reset --hard <commit-hash>
git push --force
```

---

## 📞 Recursos y Ayuda

- **Vercel Docs:** https://vercel.com/docs
- **Netlify Docs:** https://docs.netlify.com
- **Vite Docs:** https://vitejs.dev/guide/static-deploy.html
- **GitHub Pages:** https://pages.github.com

---

<div align="center">

**🎉 ¡Felicitaciones por tu deployment!**

Ahora comparte tu portfolio con el mundo 🌍

</div>
