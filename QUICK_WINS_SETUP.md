# Configuración de Portfolio - Quick Wins

Este documento describe cómo configurar las funcionalidades implementadas en las mejoras rápidas (Quick Wins).

## 🔧 Configuración Requerida

### 1. FormSpree (Formulario de Contacto)

El formulario de contacto está configurado para enviar emails a través de FormSpree.

**Pasos:**
1. Visita [FormSpree.io](https://formspree.io/) y crea una cuenta gratuita
2. Crea un nuevo formulario y obtén tu Form ID
3. Crea un archivo `.env` en la raíz del proyecto:
   ```bash
   VITE_FORMSPREE_ID=tu_formspree_id_aqui
   ```
4. El formulario ahora enviará emails reales

**Modo Demo:** Si no configuras FormSpree, el formulario funcionará en modo demo (simula el envío).

---

### 2. Google Analytics (Opcional)

Para rastrear el comportamiento de los usuarios:

**Pasos:**
1. Crea una cuenta en [Google Analytics 4](https://analytics.google.com/)
2. Obtén tu Measurement ID (formato: `G-XXXXXXXXXX`)
3. Agrega el ID al archivo `.env`:
   ```bash
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Descomenta el script de GA4 en `index.html` (líneas 10-20 aproximadamente)

---

### 3. CV Download

El botón de descarga de CV requiere que agregues tu archivo PDF.

**Pasos:**
1. Prepara tu CV en formato PDF
2. Renómbralo a: `cv-rodrigo-gaete-ux.pdf`
3. Colócalo en la carpeta `public/`:
   ```
   public/
   └── cv-rodrigo-gaete-ux.pdf
   ```
4. El botón "Descargar CV" ahora funcionará

**Opcional:** Puedes cambiar el nombre del archivo editando `src/components/organisms/About.tsx` línea ~30

---

### 4. Foto de Perfil

Actualmente hay un placeholder para la foto de perfil en la sección "Sobre mí".

**Pasos:**
1. Prepara una foto profesional (recomendado: 400x400px, formato JPG o PNG)
2. Guárdala como `profile-photo.jpg` en la carpeta `public/`:
   ```
   public/
   └── profile-photo.jpg
   ```
3. Edita `src/components/organisms/About.tsx` línea ~50
4. Descomenta las líneas de la imagen y comenta el div del placeholder

---

### 5. Logos de Empresas (Experience)

Los logos de empresas en la sección de Experiencia actualmente usan imágenes de Unsplash.

**Para usar logos reales:**
1. Consigue los logos de las empresas (formato PNG o SVG, ~200x200px)
2. Guárdalos en `public/logos/`:
   ```
   public/logos/
   ├── sura.png
   ├── desafio-latam.png
   ├── transvip.png
   └── karri.png
   ```
3. Edita `src/components/organisms/Experience.tsx` y actualiza las URLs de los logos

---

## ✅ Funcionalidades Implementadas

### Sección Hero
- ✅ Micro-copy bajo los botones CTA
- ✅ Animación de scroll mejorada con pulse
- ✅ Analytics tracking en clicks

### Impact Stats
- ✅ Cards clickeables que llevan a casos de estudio
- ✅ Hover effects mejorados
- ✅ Indicador visual "Click para ver caso"
- ✅ Analytics tracking

### Projects
- ✅ Filtros por categoría (Todos/Destacados/Fintech/Mobility)
- ✅ Badge "Destacado" en top 3 proyectos
- ✅ Animaciones smooth al filtrar
- ✅ Contador de proyectos por categoría

### About
- ✅ Botón "Descargar CV" (requiere agregar archivo PDF)
- ✅ Placeholder para foto de perfil (requiere agregar imagen)
- ✅ Analytics tracking en descarga de CV

### Experience
- ✅ Logos de empresas
- ✅ Indicador "Actualidad" para rol actual (SURA)
- ✅ Línea de tiempo visual conectando experiencias
- ✅ Tags de herramientas/tecnologías usadas
- ✅ Ubicación (Remoto) en cada rol

### Contact
- ✅ Formulario funcional con FormSpree
- ✅ Validación de campos (nombre, email, mensaje)
- ✅ Honeypot anti-spam
- ✅ Badge "Respuesta típica: menos de 24h"
- ✅ Mensajes de error específicos
- ✅ Toast notifications (éxito/error)

### General
- ✅ Botón "Back to Top" flotante (aparece al hacer scroll)
- ✅ Mejoras de accesibilidad (ARIA labels, keyboard navigation)
- ✅ Touch targets de 48x48px mínimo (WCAG AA)

---

## 📝 Archivo .env Completo

Crea un archivo `.env` en la raíz con este contenido:

```bash
# Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# FormSpree (Contact Form)
VITE_FORMSPREE_ID=your_formspree_id_here

# API Endpoints (opcional)
VITE_API_URL=https://api.example.com
```

**Nota:** Nunca commitees el archivo `.env` al repositorio. Está incluido en `.gitignore`.

---

## 🚀 Deploy

Antes de hacer deploy a producción:

1. ✅ Configura todas las variables de entorno en tu servicio de hosting
2. ✅ Agrega los archivos requeridos (CV PDF, foto de perfil)
3. ✅ Verifica que FormSpree esté configurado
4. ✅ Prueba el formulario de contacto
5. ✅ Verifica que Google Analytics esté rastreando

---

## 📊 Testing

Para probar las funcionalidades:

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

---

## 🎯 Próximos Pasos (Opcional)

Mejoras adicionales que podrías considerar:

- [ ] Agregar contadores animados en Impact Stats (react-countup)
- [ ] Implementar scroll progress indicator en Navigation
- [ ] Agregar atajos de teclado
- [ ] Configurar PWA icons (manifest.json)
- [ ] Optimizar imágenes a formato WebP
- [ ] Implementar sistema de blog con MDX

---

¿Dudas? Revisa la documentación principal en `/src/README.md`
