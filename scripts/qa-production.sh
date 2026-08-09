#!/usr/bin/env bash
# Smoke QA contra producción (domain root).
# Default: https://vientonorte.io  (legacy override: BASE_URL=https://vientonorte.github.io)
set -euo pipefail

BASE_URL="${BASE_URL:-https://vientonorte.io}"
BASE_URL="${BASE_URL%/}"
PASS=0
FAIL=0

check_http() {
  local label="$1"
  local url="$2"
  local code
  code=$(curl -fsSL -o /dev/null -w "%{http_code}" --max-time 20 "$url" || echo "000")
  if [ "$code" = "200" ]; then
    echo "✓ $label (HTTP $code)"
    PASS=$((PASS + 1))
  else
    echo "✗ $label (HTTP $code)"
    FAIL=$((FAIL + 1))
  fi
}

check_html() {
  local label="$1"
  local pattern="$2"
  local file="$3"
  if grep -qE "$pattern" "$file"; then
    echo "✓ $label"
    PASS=$((PASS + 1))
  else
    echo "✗ $label (missing: $pattern)"
    FAIL=$((FAIL + 1))
  fi
}

check_not_html() {
  local label="$1"
  local pattern="$2"
  local file="$3"
  if grep -qE "$pattern" "$file"; then
    echo "✗ $label (found forbidden: $pattern)"
    FAIL=$((FAIL + 1))
  else
    echo "✓ $label"
    PASS=$((PASS + 1))
  fi
}

echo "QA producción — $BASE_URL"
echo "---"

HTML_FILE=$(mktemp)
JS_FILE=$(mktemp)
trap 'rm -f "$HTML_FILE" "$JS_FILE"' EXIT

if ! curl -fsSL --max-time 25 "$BASE_URL/" -o "$HTML_FILE"; then
  echo "✗ Cannot fetch $BASE_URL/"
  exit 1
fi
echo "✓ fetch home"

# Domain-root SPA: /assets/… not /mi-portafolio/assets/
JS_PATH=$(grep -oE '/assets/[^"]+\.js' "$HTML_FILE" | head -1 || true)
if [[ -z "$JS_PATH" ]]; then
  JS_PATH=$(grep -oE 'assets/[^"]+\.js' "$HTML_FILE" | head -1 || true)
  if [[ -n "$JS_PATH" && "$JS_PATH" != /* ]]; then
    JS_PATH="/$JS_PATH"
  fi
fi

if [[ -z "$JS_PATH" ]]; then
  echo "✗ No JS bundle path in index.html"
  FAIL=$((FAIL + 1))
else
  echo "✓ JS path $JS_PATH"
  PASS=$((PASS + 1))
  curl -fsSL --max-time 30 "${BASE_URL}${JS_PATH}" -o "$JS_FILE" || {
    echo "✗ JS bundle fetch failed"
    FAIL=$((FAIL + 1))
  }
fi

check_html "shell #root" 'id="root"' "$HTML_FILE"
check_not_html "no stale /mi-portafolio/assets in shell" '/mi-portafolio/assets/' "$HTML_FILE"

# Title / meta (org brand — not only personal name as sole brand if VN title shipped)
if grep -qiE 'viento|norte|UX|consultor' "$HTML_FILE"; then
  echo "✓ brand/meta markers in shell"
  PASS=$((PASS + 1))
else
  echo "✗ brand/meta markers in shell"
  FAIL=$((FAIL + 1))
fi

if grep -q 'og:title\|og:description\|property="og:' "$HTML_FILE"; then
  echo "✓ Open Graph tags"
  PASS=$((PASS + 1))
else
  echo "✗ Open Graph tags"
  FAIL=$((FAIL + 1))
fi

# Bundle signals (if JS fetched)
if [[ -s "$JS_FILE" ]]; then
  check_html "HashRouter / consultoria path" 'consultoria' "$JS_FILE"
  check_html "embudo or onboarding markers" 'onboarding|embudo|consultoria-onboarding' "$JS_FILE"
  check_html "analytics or tracker wiring" 'VNTracker|gtag|GTM|dataLayer' "$JS_FILE"
fi

# Critical static URLs
check_http "home" "$BASE_URL/"
check_http "robots.txt" "$BASE_URL/robots.txt"
check_http "sitemap.xml" "$BASE_URL/sitemap.xml"
check_http "favicon" "$BASE_URL/favicon.svg"
check_http "ops noindex surface" "$BASE_URL/ops/"
check_http "ops canvas-state" "$BASE_URL/ops/canvas-state.json"
check_http "finanzas worker" "https://finanzas.vientonorte.io/"

# SEM path is client-side; we only assert shell loads for hash routes via home
check_http "github.io redirect host" "https://vientonorte.github.io/"

echo "---"
echo "Resultado: $PASS passed, $FAIL failed"
echo "Nota: H2/H4/H5/S2 browser smoke es HUMANO → /ops/AHORA-CLOSE-CHECKLIST.md"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
echo "PASS qa:production (technical)"
exit 0
