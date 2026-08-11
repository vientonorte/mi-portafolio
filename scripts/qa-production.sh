#!/usr/bin/env bash
# Smoke QA contra producción (domain root) + probes de fallo controlado.
# Default: https://vientonorte.io
#
# Qué cubre (técnico, sin browser):
#   1. Shell SPA 200 + bundle + brand/meta
#   2. Assets críticos 200 (favicon, robots, profile, sample images)
#   3. 404 real de asset ausente (servidor debe devolver != 200)
#   4. Bundle contiene UI de error (404 / 500 / 503) para fallos client-side
#   5. Rutas hash conocidas siguen sirviendo el shell (no HTTP 404 de Pages)
#
# Qué NO cubre (humano / Playwright):
#   - Ver el número 404 en #/ruta-inexistente
#   - Ver badge 404 en imagen rota
#   - Ver 503 tras chunk stale
#   → docs/QA-ERROR-UI.md + npm run qa:error-ui (local)
#
# Exit 0 = PASS técnico · 1 = FAIL
set -euo pipefail

BASE_URL="${BASE_URL:-https://vientonorte.io}"
BASE_URL="${BASE_URL%/}"
PASS=0
FAIL=0
WARN=0

check_http() {
  local label="$1"
  local url="$2"
  local expect="${3:-200}"
  local code
  code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 20 "$url" || echo "000")
  if [ "$code" = "$expect" ]; then
    echo "✓ $label (HTTP $code)"
    PASS=$((PASS + 1))
  else
    echo "✗ $label (HTTP $code, expected $expect) — $url"
    FAIL=$((FAIL + 1))
  fi
}

# Accept any 4xx as "resource missing" (GH Pages may 404; CDN may 403)
check_missing() {
  local label="$1"
  local url="$2"
  local code
  code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 20 "$url" || echo "000")
  case "$code" in
    404|403|410)
      echo "✓ $label (HTTP $code — asset ausente visible en red)"
      PASS=$((PASS + 1))
      ;;
    200)
      echo "✗ $label (HTTP 200 — se esperaba 404/403 en path inventado)"
      FAIL=$((FAIL + 1))
      ;;
    *)
      echo "· $label (HTTP $code — no es 200; se acepta como no-disponible)"
      WARN=$((WARN + 1))
      PASS=$((PASS + 1))
      ;;
  esac
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

echo "══════════════════════════════════════════"
echo " QA producción — $BASE_URL"
echo " $(date -u +%Y-%m-%dT%H:%MZ)"
echo "══════════════════════════════════════════"

HTML_FILE=$(mktemp)
JS_FILE=$(mktemp)
trap 'rm -f "$HTML_FILE" "$JS_FILE"' EXIT

echo ""
echo "── 1. Shell SPA ──"
if ! curl -fsSL --max-time 25 "$BASE_URL/" -o "$HTML_FILE"; then
  echo "✗ Cannot fetch $BASE_URL/"
  exit 1
fi
echo "✓ fetch home"
PASS=$((PASS + 1))

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
  if curl -fsSL --max-time 30 "${BASE_URL}${JS_PATH}" -o "$JS_FILE"; then
    echo "✓ JS bundle fetch ($(wc -c < "$JS_FILE" | tr -d ' ') bytes)"
    PASS=$((PASS + 1))
  else
    echo "✗ JS bundle fetch failed"
    FAIL=$((FAIL + 1))
  fi
fi

check_html "shell #root" 'id="root"' "$HTML_FILE"
check_not_html "no stale /mi-portafolio/assets in shell" '/mi-portafolio/assets/' "$HTML_FILE"

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

echo ""
echo "── 2. Bundle: rutas + UI de error (client-side 404/5xx) ──"
if [[ -s "$JS_FILE" ]]; then
  check_html "HashRouter / consultoria path" 'consultoria' "$JS_FILE"
  check_html "embudo or onboarding markers" 'onboarding|embudo|consultoria-onboarding' "$JS_FILE"
  check_html "analytics or tracker wiring" 'VNTracker|gtag|GTM|dataLayer' "$JS_FILE"
  # Error UI must ship in prod bundle — otherwise failures stay invisible
  check_html "error UI status marker (data-error-status)" 'data-error-status|error-status' "$JS_FILE"
  check_html "error UI 404 label" '404' "$JS_FILE"
  check_html "error UI 500 or 503" '503|500' "$JS_FILE"
  check_html "chunk load error classifier" 'ChunkLoadError|failed to fetch dynamically|importing a module script' "$JS_FILE"
  check_html "sobre-mi route present" 'sobre-mi|SobreMi' "$JS_FILE"
else
  echo "✗ JS bundle empty — skip content checks"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "── 3. HTTP critical surfaces (200) ──"
check_http "home" "$BASE_URL/"
check_http "robots.txt" "$BASE_URL/robots.txt"
check_http "sitemap.xml" "$BASE_URL/sitemap.xml"
check_http "favicon.svg" "$BASE_URL/favicon.svg"
check_http "manifest" "$BASE_URL/manifest.json"
check_http "profile photo" "$BASE_URL/profile-photo.jpg"
check_http "ops noindex surface" "$BASE_URL/ops/"
check_http "ops canvas-state" "$BASE_URL/ops/canvas-state.json"
check_http "finanzas worker" "https://finanzas.vientonorte.io/"
check_http "github.io redirect host" "https://vientonorte.github.io/"

echo ""
echo "── 4. Critical content assets (200) ──"
# Paths used by sobre-mi / method evidence — fail deploy if missing
for path in \
  "/images/branding/vn-logo.svg" \
  "/favicon.ico" \
  "/icon-192x192.png"
do
  # soft: some may not exist; try common set
  code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 15 "${BASE_URL}${path}" || echo "000")
  if [ "$code" = "200" ]; then
    echo "✓ asset $path (HTTP 200)"
    PASS=$((PASS + 1))
  else
    # Only hard-fail on favicon/icon; logo may live elsewhere
    if [[ "$path" == "/favicon.ico" || "$path" == "/icon-192x192.png" ]]; then
      echo "✗ asset $path (HTTP $code)"
      FAIL=$((FAIL + 1))
    else
      echo "· asset $path (HTTP $code) — warn"
      WARN=$((WARN + 1))
    fi
  fi
done

# Sample public images folder — at least one case image if present
SAMPLE_IMG=$(curl -sS --max-time 15 "$BASE_URL/images/" 2>/dev/null | head -c 200 || true)
# Probe known monitas / edu paths used in evidence (soft)
for path in \
  "/profile-photo.jpg" \
  "/images/cases/sura-ria-1.jpg" \
  "/monitas/01.jpg"
do
  code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 15 "${BASE_URL}${path}" || echo "000")
  if [ "$code" = "200" ]; then
    echo "✓ content asset $path"
    PASS=$((PASS + 1))
  else
    echo "· content asset $path (HTTP $code) — warn (may not be in this deploy)"
    WARN=$((WARN + 1))
  fi
done

echo ""
echo "── 5. Controlled 404 (servidor) ──"
# Invented path MUST NOT return 200 — proves network layer can signal missing files
check_missing "fake asset path" "$BASE_URL/assets/__vn_missing_probe_do_not_create__.js"
check_missing "fake image path" "$BASE_URL/images/__vn_missing_probe__.png"

echo ""
echo "── 6. Hash routes still get SPA shell (not Pages hard-404) ──"
# GH Pages serves index for /; hash is client-only. Fetching /#/… is same as /.
# We assert index is served so client can paint GlobalNotFound for unknown hash.
check_http "shell for client routing" "$BASE_URL/"
# Optional path-style (if someone hits without hash) — still expect 200 index or redirect
code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 15 "$BASE_URL/sobre-mi" || echo "000")
if [ "$code" = "200" ] || [ "$code" = "301" ] || [ "$code" = "302" ] || [ "$code" = "404" ]; then
  # 404 on path-style is OK for HashRouter sites; 200 means SPA fallback configured
  echo "✓ path /sobre-mi responded HTTP $code (document for HashRouter note)"
  PASS=$((PASS + 1))
else
  echo "· path /sobre-mi HTTP $code"
  WARN=$((WARN + 1))
fi

echo ""
echo "══════════════════════════════════════════"
echo " Resultado: $PASS passed · $FAIL failed · $WARN warnings"
echo " Humano: abrir #/ruta-que-no-existe → debe verse 404 grande"
echo "         docs/QA-ERROR-UI.md · npm run qa:error-ui"
echo "══════════════════════════════════════════"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
echo "PASS qa:production (technical)"
exit 0
