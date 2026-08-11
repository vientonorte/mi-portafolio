#!/usr/bin/env bash
# Local / preview gate for visible error UI (404 / 500 / 503).
# Does NOT require production. Run against dev or preview:
#
#   npm run dev   # terminal A
#   npm run qa:error-ui
#
# Or: BASE=http://127.0.0.1:4173 npm run qa:error-ui
#
# Checks:
#   - unit tests for ResponsiveImage 404 + ErrorBoundary classification
#   - bundle / source markers for data-error-status
#   - curl fake asset → not 200 when BASE is a static server with real FS
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BASE="${BASE:-http://127.0.0.1:5173}"
BASE="${BASE%/}"
PASS=0
FAIL=0

ok()  { PASS=$((PASS + 1)); echo "✓ $1"; }
bad() { FAIL=$((FAIL + 1)); echo "✗ $1" >&2; }

echo "══════════════════════════════════════════"
echo " QA error UI · BASE=$BASE"
echo "══════════════════════════════════════════"

echo ""
echo "── unit: ResponsiveImage 404 + lazy chunk classifier ──"
if npx vitest run \
  src/__tests__/atoms/ResponsiveImage.test.tsx \
  src/__tests__/lib/lazy-with-retry.test.ts \
  src/__tests__/organisms/ErrorBoundary.test.tsx \
  --reporter=dot 2>&1; then
  ok "vitest error UI suite"
else
  bad "vitest error UI suite"
fi

echo ""
echo "── source markers ──"
if grep -q 'data-error-status' src/components/layout/NotFoundPage.tsx \
  && grep -q 'data-error-status' src/components/organisms/ErrorBoundary.tsx \
  && grep -q 'data-error-status' src/components/atoms/ResponsiveImage.tsx; then
  ok "data-error-status on NotFound / ErrorBoundary / ResponsiveImage"
else
  bad "missing data-error-status markers"
fi

if grep -q '503' src/components/organisms/ErrorBoundary.tsx \
  && grep -q '500' src/components/organisms/ErrorBoundary.tsx; then
  ok "ErrorBoundary exposes 500 and 503"
else
  bad "ErrorBoundary missing 500/503 codes"
fi

if grep -q '404' src/components/layout/NotFoundPage.tsx \
  && grep -q '404' src/components/atoms/ResponsiveImage.tsx; then
  ok "404 visible in NotFoundPage + ResponsiveImage"
else
  bad "404 labels missing"
fi

echo ""
echo "── optional live BASE ──"
if curl -sf --max-time 3 "$BASE/" >/dev/null 2>&1; then
  ok "BASE reachable $BASE/"
  code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 10 \
    "$BASE/assets/__vn_missing_probe__.js" || echo "000")
  if [ "$code" != "200" ]; then
    ok "missing asset probe HTTP $code (!= 200)"
  else
    bad "missing asset probe returned 200"
  fi
  echo ""
  echo "Humano (30 s):"
  echo "  1. Abre ${BASE}/#/ruta-inexistente-vn → debe verse 404 grande"
  echo "  2. Abre ${BASE}/#/sobre-mi y en DevTools bloquea una imagen → badge 404"
  echo "  3. En consola: sessionStorage.clear(); throw new Error('Importing a module script failed.')"
  echo "     (o fuerza chunk fail) → UI 503 tras reintentos"
else
  echo "· BASE no responde ($BASE) — salta probe live (arranque npm run dev)"
fi

echo ""
echo "Resultado: $PASS passed · $FAIL failed"
if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
echo "PASS qa:error-ui"
exit 0
