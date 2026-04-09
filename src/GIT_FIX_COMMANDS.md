# 🔧 Comandos para Corregir Git y GitHub

> Ejecuta estos comandos en orden para arreglar tu repositorio

---

## 📋 Situación Actual

Tienes el código en GitHub pero con errores. Vamos a:
1. ✅ Corregir archivos localmente (ya hecho en Figma Make)
2. ⏳ Actualizar GitHub con los archivos correctos
3. ⏳ Verificar que todo funciona

---

## 🚀 Comandos a Ejecutar (Copia y pega)

### Paso 1: Guardar Cambios Locales

```bash
# Ver qué archivos cambiaron
git status

# Agregar TODOS los archivos nuevos/modificados
git add .

# Commit con mensaje descriptivo
git commit -m "🔧 Fix: Corregir estructura de archivos y agregar configuración

- Corregir LICENSE (era carpeta, ahora es archivo)
- Agregar package.json con dependencias
- Agregar tsconfig.json para TypeScript
- Agregar vite.config.ts
- Agregar index.html y main.tsx
- Actualizar .gitignore
- Agregar documentación FIX_ERRORS.md"
```

### Paso 2: Push a GitHub

```bash
# Subir cambios a GitHub
git push origin main
```

**Si obtienes error "Permission denied":**
```bash
# Configurar tu usuario (reemplaza con tus datos)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Intentar push de nuevo
git push origin main
```

**Si obtienes error de conflicto:**
```bash
# Traer cambios remotos primero
git pull origin main --rebase

# Resolver conflictos si hay (VS Code te ayudará)
# Luego:
git push origin main
```

---

## 🔍 Verificar en GitHub

1. Ve a tu repositorio en GitHub
2. Verifica que estos archivos **existan**:
   ```
   ✅ package.json
   ✅ tsconfig.json
   ✅ vite.config.ts
   ✅ index.html
   ✅ main.tsx
   ✅ LICENSE (archivo, no carpeta)
   ✅ .gitignore
   ✅ README.md
   ```

3. Verifica que **NO existan** estos archivos/carpetas:
   ```
   ❌ /LICENSE/Code-component-xxxx.tsx
   ❌ node_modules/ (debe estar en .gitignore)
   ❌ dist/ (debe estar en .gitignore)
   ```

---

## 💻 Instalar Dependencias Localmente

Después de hacer push, instala las dependencias:

```bash
# Instalar todas las dependencias
npm install

# Esto creará:
# - node_modules/ (carpeta con todas las librerías)
# - package-lock.json (archivo de lock)
```

**⏱ Tiempo:** 1-2 minutos

---

## ✅ Verificar que Todo Funciona

```bash
# Iniciar servidor de desarrollo
npm run dev
```

**Debes ver:**
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Abre http://localhost:5173** y verifica:
- [ ] Portfolio carga sin errores
- [ ] Navegación funciona
- [ ] Proyectos se muestran
- [ ] Modo oscuro funciona
- [ ] Toggle de idioma funciona

---

## 🔄 Si Quieres Empezar Desde Cero (Opción Nuclear)

Si tienes muchos problemas con Git:

```bash
# 1. Eliminar repo remoto (desde GitHub web o CLI)
gh repo delete tu-usuario/rodrigo-gaete-portfolio

# 2. Eliminar .git local
rm -rf .git

# 3. Inicializar de nuevo
git init
git add .
git commit -m "🎉 Initial commit: Portfolio Lead UX v1.2.0 (clean)"

# 4. Crear repo nuevo y push
gh repo create rodrigo-gaete-portfolio --public --source=. --remote=origin
git push -u origin main
```

---

## 📦 Estructura Correcta del Proyecto

Así debe verse tu proyecto:

```
rodrigo-gaete-portfolio/
├── .git/                    # Git (oculto)
├── .gitignore              # ✅ Archivo
├── node_modules/           # ⚠️ Local only (no subir a Git)
├── public/                 # Assets públicos
├── components/             # Componentes React
├── pages/                  # Páginas
├── data/                   # Datos de proyectos
├── lib/                    # Utilidades
├── styles/                 # CSS global
├── App.tsx                 # ✅ Componente principal
├── main.tsx                # ✅ Entry point
├── index.html              # ✅ HTML base
├── package.json            # ✅ Dependencias
├── package-lock.json       # ⚠️ Se genera con npm install
├── tsconfig.json           # ✅ Config TypeScript
├── tsconfig.node.json      # ✅ Config TS Node
├── vite.config.ts          # ✅ Config Vite
├── LICENSE                 # ✅ ARCHIVO (no carpeta)
├── README.md               # ✅ Documentación
├── MAINTENANCE_GUIDE.md    # ✅ Guías
├── QUICK_WINS.md           # ✅ Roadmap
├── DEPLOYMENT.md           # ✅ Deploy guide
├── FIX_ERRORS.md           # ✅ Esta guía
└── ...otros .md files
```

---

## 🐛 Errores Comunes y Soluciones

### Error: "fatal: not a git repository"

**Causa:** No estás en la carpeta correcta

**Solución:**
```bash
# Navegar a la carpeta del proyecto
cd /ruta/a/tu/portfolio

# Verificar que existe .git
ls -la | grep git
```

### Error: "npm: command not found"

**Causa:** Node.js no está instalado

**Solución:**
1. Instala Node.js 18+ desde [nodejs.org](https://nodejs.org)
2. Verifica: `node --version`

### Error: "Permission denied (publickey)"

**Causa:** No tienes SSH key configurada para GitHub

**Solución:**
```bash
# Opción A: Usar HTTPS en lugar de SSH
git remote set-url origin https://github.com/tu-usuario/rodrigo-gaete-portfolio.git

# Opción B: Configurar SSH key
# Ver: https://docs.github.com/es/authentication/connecting-to-github-with-ssh
```

### VS Code sigue mostrando errores rojos

**Solución:**
```bash
# 1. Instalar dependencias
npm install

# 2. Reload VS Code
# Cmd/Ctrl + Shift + P → "Reload Window"

# 3. Reiniciar TypeScript Server
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

---

## ✅ Checklist de Validación Final

Antes de continuar, verifica:

**Local:**
- [ ] `git status` muestra "working tree clean"
- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` funciona
- [ ] Portfolio carga en http://localhost:5173
- [ ] VS Code sin errores rojos

**GitHub:**
- [ ] Todos los archivos subidos correctamente
- [ ] LICENSE es un archivo (no carpeta)
- [ ] README.md se ve bien en GitHub
- [ ] No hay carpetas innecesarias

**Funcionalidad:**
- [ ] Navegación completa funciona
- [ ] Imágenes cargan
- [ ] Modo oscuro funciona
- [ ] Toggle idioma funciona

---

## 🎯 Siguiente Paso

Una vez que todo esté ✅:

**→ [DEPLOYMENT.md](DEPLOYMENT.md)** - Para deployar a Vercel/Netlify

O si prefieres implementar mejoras primero:

**→ [QUICK_WINS.md](QUICK_WINS.md)** - Roadmap de mejoras

---

<div align="center">

**🎉 ¡Problemas resueltos!**

Ahora tu código está limpio y listo para desarrollo

**¿Dudas? Revisa [FIX_ERRORS.md](FIX_ERRORS.md)**

</div>
