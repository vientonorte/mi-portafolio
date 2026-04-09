# 📋 Guía de Copiar y Pegar - Setup Completo

> Comandos para copiar toda la estructura desde Figma Make a tu local

---

## 🎯 Objetivo

Tienes todos los archivos en Figma Make. Ahora necesitas:
1. ✅ Copiarlos a tu computadora local
2. ✅ Mantener la estructura correcta
3. ✅ Instalar dependencias
4. ✅ Subir a GitHub

---

## 📥 OPCIÓN 1: Download y Descomprimir (Más Rápido)

### Paso 1: Download del proyecto

En Figma Make:
1. Click en el botón **Export** o **Download** (si está disponible)
2. Descarga el archivo ZIP
3. Descomprimir en tu carpeta de proyectos

### Paso 2: Setup básico

```bash
# Navegar a la carpeta
cd rodrigo-gaete-portfolio

# Verificar estructura
ls -la

# Instalar dependencias
npm install

# Iniciar
npm run dev
```

---

## 📋 OPCIÓN 2: Copiar Archivos Manualmente (Si no hay export)

### Estructura de Carpetas a Crear

```bash
# Crear todas las carpetas de una vez
mkdir -p components/{atoms,molecules,organisms,figma,ui}
mkdir -p pages
mkdir -p data
mkdir -p lib
mkdir -p styles
mkdir -p public/images
```

### Archivos Root (Copiar en orden)

```bash
# 1. Configuración base
📄 package.json          → Copiar contenido completo
📄 tsconfig.json         → Copiar contenido completo
📄 tsconfig.node.json    → Copiar contenido completo
📄 vite.config.ts        → Copiar contenido completo

# 2. Entry points
📄 index.html            → Copiar contenido completo
📄 main.tsx              → Copiar contenido completo
📄 App.tsx               → Copiar contenido completo

# 3. Configuración Git
📄 .gitignore            → Copiar contenido completo
📄 .env.example          → Copiar contenido completo
📄 LICENSE               → ⚠️ IMPORTANTE: Es un ARCHIVO, no carpeta

# 4. Documentación
📄 README.md             → Copiar contenido completo
📄 START_HERE.md         → Copiar contenido completo
📄 MAINTENANCE_GUIDE.md  → Copiar contenido completo
📄 QUICK_WINS.md         → Copiar contenido completo
📄 DEPLOYMENT.md         → Copiar contenido completo
📄 GITHUB_SETUP.md       → Copiar contenido completo
📄 FIX_ERRORS.md         → Copiar contenido completo
📄 GIT_FIX_COMMANDS.md   → Copiar contenido completo
📄 CHANGELOG.md          → Copiar contenido completo
📄 PROJECT_STRUCTURE.md  → Copiar contenido completo
```

### Carpetas Completas (Copiar todas)

```bash
# Copiar carpetas completas con todos sus archivos

📁 components/
   ├── 📁 atoms/         → Todos los .tsx
   ├── 📁 molecules/     → Todos los .tsx
   ├── 📁 organisms/     → Todos los .tsx
   ├── 📁 figma/         → ImageWithFallback.tsx
   └── 📁 ui/            → Todos los componentes shadcn

📁 pages/
   ├── DesignSystem.tsx
   ├── CaseStudies.tsx
   ├── ProcessDetail.tsx
   ├── CompanyDetail.tsx
   └── ProjectDetail.tsx

📁 data/
   ├── projects-data.ts
   └── karri-projects.ts

📁 lib/
   ├── LanguageContext.tsx
   ├── i18n.ts
   └── utils.ts

📁 styles/
   └── globals.css
```

---

## ⚠️ PROBLEMA COMÚN: Carpeta LICENSE incorrecta

Si ves que LICENSE es una carpeta (🗂️) en lugar de archivo (📄):

### Solución en Terminal:

```bash
# 1. Eliminar carpeta LICENSE completa
rm -rf LICENSE

# 2. Crear archivo LICENSE correcto
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 Rodrigo Gaete

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF

# 3. Verificar que es un archivo
file LICENSE
# Debe decir: "LICENSE: ASCII text"
```

### Solución en VS Code:

1. Elimina la carpeta LICENSE completa
2. Crea nuevo archivo (no carpeta): `LICENSE` (sin extensión)
3. Copia el contenido del MIT License de arriba

---

## ✅ Verificación Post-Setup

### Checklist de Archivos

```bash
# Ejecutar para verificar
ls -la

# Debes ver:
✅ package.json          (archivo)
✅ App.tsx               (archivo)
✅ main.tsx              (archivo)
✅ index.html            (archivo)
✅ LICENSE               (archivo - NO carpeta)
✅ .gitignore            (archivo)
✅ components/           (carpeta)
✅ pages/                (carpeta)
✅ data/                 (carpeta)
✅ lib/                  (carpeta)
✅ styles/               (carpeta)
```

### Checklist de Carpetas

```bash
# Verificar carpetas importantes
ls components/
# Debe mostrar: atoms  molecules  organisms  figma  ui

ls pages/
# Debe mostrar: DesignSystem.tsx  CaseStudies.tsx  etc.

ls data/
# Debe mostrar: projects-data.ts  karri-projects.ts

ls lib/
# Debe mostrar: LanguageContext.tsx  i18n.ts  utils.ts
```

---

## 🚀 Instalación y Ejecución

### Una vez que todos los archivos estén copiados:

```bash
# 1. Instalar dependencias (2 minutos)
npm install

# Si da error, intenta:
npm install --legacy-peer-deps

# 2. Verificar que se creó node_modules/
ls node_modules/
# Debe mostrar muchas carpetas

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir navegador
# http://localhost:5173
```

### Verificar en VS Code:

1. Abre el proyecto en VS Code
2. Presiona `Ctrl+Shift+P` (o `Cmd+Shift+P`)
3. Escribe "Reload Window"
4. Enter

**Los errores rojos deben desaparecer** ✨

---

## 📊 Estructura Visual Correcta

```
rodrigo-gaete-portfolio/
│
├── 📄 package.json              ← ARCHIVO
├── 📄 App.tsx                   ← ARCHIVO
├── 📄 main.tsx                  ← ARCHIVO
├── 📄 index.html                ← ARCHIVO
├── 📄 LICENSE                   ← ARCHIVO (⚠️ NO carpeta)
├── 📄 .gitignore                ← ARCHIVO
│
├── 📁 components/               ← CARPETA
│   ├── 📁 atoms/
│   ├── 📁 molecules/
│   ├── 📁 organisms/
│   ├── 📁 figma/
│   └── 📁 ui/
│
├── 📁 pages/                    ← CARPETA
├── 📁 data/                     ← CARPETA
├── 📁 lib/                      ← CARPETA
├── 📁 styles/                   ← CARPETA
│
├── 📁 node_modules/             ← Se crea con npm install
│
└── 📚 Todos los .md files       ← ARCHIVOS
```

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module 'react'"

**Causa:** Falta npm install

**Solución:**
```bash
npm install
```

### Error: "JSX element implicitly has type 'any'"

**Causa:** Falta tsconfig.json o no se cargó

**Solución:**
```bash
# Verificar que existe
cat tsconfig.json

# Reload VS Code
# Ctrl+Shift+P → "Reload Window"
```

### Error: "Vite: command not found"

**Causa:** Dependencias no instaladas

**Solución:**
```bash
npm install
npm run dev
```

### Archivos con errores rojos en VS Code

**Causa:** TypeScript no encuentra tipos

**Solución:**
```bash
# 1. Asegurar instalación completa
npm install

# 2. Reiniciar TS Server
# Ctrl+Shift+P → "TypeScript: Restart TS Server"

# 3. Reload Window
# Ctrl+Shift+P → "Reload Window"
```

### LICENSE es una carpeta (el más común)

**Ver solución arriba:** [Problema LICENSE](#problema-común-carpeta-license-incorrecta)

---

## 📦 Después del Setup

### Git Init y Primera Subida

```bash
# 1. Inicializar Git
git init

# 2. Agregar todo
git add .

# 3. Primer commit
git commit -m "🎉 Initial commit: Portfolio Lead UX v1.2.0"

# 4. Crear repo en GitHub (con GitHub CLI)
gh repo create rodrigo-gaete-portfolio --public --source=. --remote=origin

# 5. Push
git push -u origin main
```

### Deploy a Vercel

```bash
# Instalar CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 📋 Checklist Final

Antes de continuar, verifica:

### Local
- [ ] Todos los archivos copiados
- [ ] LICENSE es un archivo (no carpeta)
- [ ] npm install ejecutado sin errores
- [ ] npm run dev funciona
- [ ] Portfolio carga en localhost:5173
- [ ] VS Code sin errores rojos

### Funcionalidad
- [ ] Navegación funciona
- [ ] Modo oscuro funciona
- [ ] Toggle idioma funciona
- [ ] Proyectos se muestran
- [ ] Design System accesible

### Git (opcional pero recomendado)
- [ ] Git inicializado
- [ ] Primer commit hecho
- [ ] Repo creado en GitHub
- [ ] Código pusheado

---

## 🎯 Próximos Pasos

Una vez que todo esté ✅:

1. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy a producción
2. **[QUICK_WINS.md](QUICK_WINS.md)** - Mejoras rápidas
3. **[MAINTENANCE_GUIDE.md](MAINTENANCE_GUIDE.md)** - Agregar contenido

---

## 🆘 ¿Necesitas Ayuda?

### Documentos de Ayuda

- **Errores comunes:** [FIX_ERRORS.md](FIX_ERRORS.md)
- **Comandos Git:** [GIT_FIX_COMMANDS.md](GIT_FIX_COMMANDS.md)
- **Estructura:** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- **Inicio rápido:** [START_HERE.md](START_HERE.md)

### Verificar Node.js

```bash
# Verificar versión (debe ser 18+)
node --version

# Si es menor, actualizar:
# macOS: brew install node@18
# Windows: descarga desde nodejs.org
# Linux: nvm install 18
```

---

<div align="center">

## ✅ ¡Setup Completo!

**Ahora tienes todo listo para desarrollar y deployar**

### ¿Todo funcionando? 
**→ [DEPLOYMENT.md](DEPLOYMENT.md)** para ir a producción

### ¿Tienes errores?
**→ [FIX_ERRORS.md](FIX_ERRORS.md)** para soluciones

---

**🚀 Happy coding!**

</div>
