#!/usr/bin/env bash
# Smoke QA contra GitHub Pages en producción.
set -euo pipefail

BASE_URL="${BASE_URL:-https://vientonorte.github.io/mi-portafolio}"
PASS=0
FAIL=0

check() {
  local label="$1"
  local pattern="$2"
  local url="$3"

  if curl -fsSL "$url" | grep -q "$pattern"; then
    echo "✓ $label"
    PASS=$((PASS + 1))
  else
    echo "✗ $label (missing: $pattern)"
    FAIL=$((FAIL + 1))
  fi
}

echo "QA producción — $BASE_URL"
echo "---"

HTML=$(curl -fsSL "$BASE_URL/")
JS_PATH=$(echo "$HTML" | grep -oE '/mi-portafolio/assets/index-[^"]+\.js' | head -1)
test -n "$JS_PATH" || { echo "✗ No JS bundle in index.html"; exit 1; }
JS_URL="https://vientonorte.github.io${JS_PATH}"
JS=$(curl -fsSL "$JS_URL")

check "Hero meta description" "reduce el ruido" "$BASE_URL/"
check "8 proyectos en grid" "sura-ux-enterprise" "$JS_URL"
check "Testimonios section" "testimonios" "$JS_URL"
check "Karri flagship" "karri-calculadora" "$JS_URL"
check "SEO keywords proyecto" "shopper UX" "$JS_URL"

if echo "$HTML" | grep -q 'og:title'; then
  echo "✓ Open Graph tags"
  PASS=$((PASS + 1))
else
  echo "✗ Open Graph tags"
  FAIL=$((FAIL + 1))
fi

echo "---"
echo "Resultado: $PASS passed, $FAIL failed"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi

if [ -z "${VITE_GA_MEASUREMENT_ID:-}" ]; then
  echo ""
  echo "ℹ GA4 inactivo: configura el secret en GitHub Actions:"
  echo "  gh secret set VITE_GA_MEASUREMENT_ID --body 'G-XXXXXXXXXX'"
fi