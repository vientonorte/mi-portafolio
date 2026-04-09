#!/bin/bash

# Script para crear estructura completa del proyecto
# Uso: ./download-all.sh /ruta/donde/crear/proyecto

TARGET_DIR=${1:-"$HOME/rodrigo-gaete-portfolio"}

echo "📦 Creando proyecto en: $TARGET_DIR"

# Crear directorio principal
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

# Crear estructura de carpetas
echo "📁 Creando estructura de carpetas..."
mkdir -p components/{atoms,molecules,organisms,figma,ui}
mkdir -p pages
mkdir -p data
mkdir -p lib
mkdir -p styles
mkdir -p public/images

echo "✅ Estructura creada"
echo ""
echo "📝 Siguiente paso:"
echo "   1. Copia todos los archivos .tsx desde Figma Make a las carpetas correspondientes"
echo "   2. Copia todos los archivos .md de documentación"
echo "   3. Ejecuta: npm install"
echo "   4. Ejecuta: npm run dev"
echo ""
echo "Ver guía completa en: COPY_PASTE_SETUP.md"
