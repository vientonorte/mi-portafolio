#!/usr/bin/env bash
# Smoke QA contra GitHub Pages en producción.
set -euo pipefail

BASE_URL="${BASE_URL:-https://vientonorte.github.io/mi-portafolio}"
PASS=0
FAIL=0

check_url() {
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

check_content() {
  local label="$1"
  local pattern="$2"
  local file="$3"

  if grep -q "$pattern" "$file"; then
    echo "✓ $label"
    PASS=$((PASS + 1))
  else
    echo "✗ $label (missing: $pattern)"
    FAIL=$((FAIL + 1))
  fi
}

check_http() {
  local label="$1"
  local url="$2"
  local code
  code=$(curl -fsSL -o /dev/null -w "%{http_code}" "$url" || echo "000")
  if [ "$code" = "200" ]; then
    echo "✓ $label (HTTP $code)"
    PASS=$((PASS + 1))
  else
    echo "✗ $label (HTTP $code)"
    FAIL=$((FAIL + 1))
  fi
}

echo "QA producción — $BASE_URL"
echo "---"

HTML=$(curl -fsSL "$BASE_URL/")
JS_PATH=$(echo "$HTML" | grep -oE '/mi-portafolio/assets/index-[^"]+\.js' | head -1)
test -n "$JS_PATH" || { echo "✗ No JS bundle in index.html"; exit 1; }
JS_URL="https://vientonorte.github.io${JS_PATH}"
JS_FILE=$(mktemp)
CASE_FILE=$(mktemp)
trap 'rm -f "$JS_FILE" "$CASE_FILE"' EXIT
curl -fsSL "$JS_URL" -o "$JS_FILE"

check_url "Hero meta description" "reduce el ruido" "$BASE_URL/"
check_content "8 proyectos en grid" "sura-ux-enterprise" "$JS_FILE"
check_content "Testimonios section" "testimonios" "$JS_FILE"
check_content "Karri flagship" "karri-calculadora" "$JS_FILE"
check_content "SEO keywords proyecto" "shopper UX" "$JS_FILE"
check_content "i18n featuredCaseStudies" "featuredCaseStudies" "$JS_FILE"
check_content "Analytics wiring" "VNTracker" "$JS_FILE"
check_content "Schema.org" "CreativeWork" "$JS_FILE"

CASE_CHUNK_FILE=$(grep -oE 'CaseStudies-[A-Za-z0-9_-]+\.js' "$JS_FILE" | head -1 || true)
if [ -n "$CASE_CHUNK_FILE" ]; then
  curl -fsSL "$BASE_URL/assets/$CASE_CHUNK_FILE" -o "$CASE_FILE"
  check_content "Flagship en /proceso chunk" "flagship" "$CASE_FILE"
  check_content "Ruta canónica /proceso" '"/proceso"' "$JS_FILE"
  check_content "Legacy redirect /cases" '"/cases"' "$JS_FILE"
else
  echo "✗ Flagship en /proceso chunk (CaseStudies chunk not in bundle)"
  FAIL=$((FAIL + 1))
fi

check_http "CV PDF" "$BASE_URL/cv-rodrigo-gaete-ux.pdf"
check_http "Foto perfil" "$BASE_URL/profile-photo.jpg"
check_http "PWA manifest" "$BASE_URL/manifest.json"

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