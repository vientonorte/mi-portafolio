#!/usr/bin/env bash
# Verifica que el build incluya utilidades Tailwind (regresión v1.6.0)
set -euo pipefail
cd "$(dirname "$0")/.."

npm run build >/dev/null

CSS_FILE=$(ls dist/assets/*.css | head -1)
CSS_SIZE=$(wc -c < "$CSS_FILE" | tr -d ' ')

echo "CSS: $CSS_FILE ($CSS_SIZE bytes)"

if [ "$CSS_SIZE" -lt 50000 ]; then
  echo "FAIL: CSS < 50KB — faltan utilidades Tailwind (@import tailwindcss)" >&2
  exit 1
fi

if ! grep -q '\.flex' "$CSS_FILE"; then
  echo "FAIL: no se encontró .flex en el bundle CSS" >&2
  exit 1
fi

if ! grep -q 'bg-background' "$CSS_FILE"; then
  echo "FAIL: no se encontró bg-background en el bundle CSS" >&2
  exit 1
fi

echo "OK: Tailwind CSS smoke passed"