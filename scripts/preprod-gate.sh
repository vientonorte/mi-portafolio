#!/usr/bin/env bash
# preprod-gate · single entry for FO (mi-portafolio) before merge / deploy
# Layers: unit → build → static smoke → optional local SEO/ads → optional playwright
#
# Usage:
#   bash scripts/preprod-gate.sh              # full local gate (needs nothing on :5173 for L1-L3)
#   bash scripts/preprod-gate.sh --quick      # typecheck + unit + build only
#   bash scripts/preprod-gate.sh --with-dev   # also cierre-smoke against BASE
#   bash scripts/preprod-gate.sh --with-routes # build + serve + qa-routes (needs playwright)
#   BASE=http://127.0.0.1:5173 bash scripts/preprod-gate.sh --with-dev
#
# Exit: 0 = GO technical · 1 = NO-GO · 2 = env / misconfig
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

QUICK=0
WITH_DEV=0
WITH_ROUTES=0
BASE="${BASE:-http://127.0.0.1:5173}"
BASE="${BASE%/}"

for arg in "$@"; do
  case "$arg" in
    --quick) QUICK=1 ;;
    --with-dev) WITH_DEV=1 ;;
    --with-routes) WITH_ROUTES=1 ;;
    --help|-h)
      sed -n '2,16p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown arg: $arg" >&2
      exit 2
      ;;
  esac
done

PASS=0
FAIL=0
SKIP=0
REPORT=()

ok()   { PASS=$((PASS + 1)); REPORT+=("PASS  $1"); echo "✓ $1"; }
bad()  { FAIL=$((FAIL + 1)); REPORT+=("FAIL  $1"); echo "✗ $1" >&2; }
skip() { SKIP=$((SKIP + 1)); REPORT+=("SKIP  $1"); echo "· $1 (skip)"; }

run_step() {
  local name="$1"
  shift
  echo ""
  echo "── $name ──"
  if "$@"; then
    ok "$name"
    return 0
  fi
  bad "$name"
  return 1
}

echo "══════════════════════════════════════════"
echo " VN preprod-gate · FO mi-portafolio"
echo " ROOT=$ROOT"
echo " BASE=$BASE  quick=$QUICK dev=$WITH_DEV routes=$WITH_ROUTES"
echo "══════════════════════════════════════════"

# ── L1: static quality ─────────────────────────────────────────
run_step "type-check" npm run type-check || true
run_step "unit tests" npm test || true
run_step "nav config" npm run qa:nav || true

if [[ "$QUICK" -eq 1 ]]; then
  echo ""
  echo "── quick mode: skip build/preview ──"
else
  run_step "build" npm run build || true

  # L2: static artifact smoke (no browser)
  if [[ -d dist && -f dist/index.html ]]; then
    if grep -q 'id="root"' dist/index.html; then
      ok "dist has #root"
    else
      bad "dist has #root"
    fi
    JS_COUNT=$(find dist/assets -name '*.js' 2>/dev/null | wc -l | tr -d ' ')
    if [[ "${JS_COUNT:-0}" -ge 1 ]]; then
      ok "dist has JS assets ($JS_COUNT)"
    else
      bad "dist has JS assets"
    fi
    # domain-root base: assets must be /assets/ not /mi-portafolio/assets/
    if grep -qE 'src="/assets/[^"]+\.js"' dist/index.html || grep -qE "src='/assets/[^']+\.js'" dist/index.html; then
      ok "index uses domain-root /assets/"
    else
      # vite may use relative assets
      if grep -qE 'assets/.*\.js' dist/index.html; then
        ok "index references assets (relative or absolute)"
      else
        bad "index missing assets script"
      fi
    fi
    if grep -qi 'mi-portafolio/assets' dist/index.html; then
      bad "index still points at /mi-portafolio/assets (stale base)"
    else
      ok "no stale /mi-portafolio/assets in index"
    fi
  else
    bad "dist/ missing after build"
  fi
fi

# ── L3: preview server + curl gates (build artifact) ───────────
if [[ "$QUICK" -eq 0 && -d dist ]]; then
  echo ""
  echo "── preview curl smoke ──"
  PREVIEW_PORT="${PREVIEW_PORT:-4179}"
  python3 -m http.server "$PREVIEW_PORT" --directory dist >/tmp/vn-preprod-http.log 2>&1 &
  HTTP_PID=$!
  cleanup_http() { kill "$HTTP_PID" 2>/dev/null || true; }
  trap cleanup_http EXIT

  READY=0
  for _ in $(seq 1 25); do
    if curl -fsS "http://127.0.0.1:${PREVIEW_PORT}/" -o /tmp/vn-preprod-index.html; then
      READY=1
      break
    fi
    sleep 0.3
  done

  if [[ "$READY" -ne 1 ]]; then
    bad "preview server :$PREVIEW_PORT"
  else
    ok "preview server :$PREVIEW_PORT"
    if grep -q 'id="root"' /tmp/vn-preprod-index.html; then
      ok "preview HTML #root"
    else
      bad "preview HTML #root"
    fi
    # title / brand markers (static shell)
    if grep -qiE 'viento|norte|UX|consultor' /tmp/vn-preprod-index.html; then
      ok "preview brand markers in shell"
    else
      skip "preview brand markers (SPA shell may be minimal)"
    fi
  fi

  cleanup_http
  trap - EXIT
fi

# ── L4: Playwright routes (optional) ───────────────────────────
if [[ "$WITH_ROUTES" -eq 1 ]]; then
  if [[ ! -d dist ]]; then
    bad "routes need dist (run without --quick)"
  else
    echo ""
    echo "── playwright routes ──"
    PREVIEW_PORT="${PREVIEW_PORT:-4179}"
    npx --yes serve dist -l "$PREVIEW_PORT" >/tmp/vn-preprod-serve.log 2>&1 &
    SERVE_PID=$!
    cleanup_serve() { kill "$SERVE_PID" 2>/dev/null || true; }
    trap cleanup_serve EXIT
    READY=0
    for _ in $(seq 1 40); do
      if curl -fsS "http://127.0.0.1:${PREVIEW_PORT}/" >/dev/null; then
        READY=1
        break
      fi
      sleep 0.5
    done
    if [[ "$READY" -ne 1 ]]; then
      bad "serve for routes"
    else
      if node scripts/qa-routes.mjs "http://127.0.0.1:${PREVIEW_PORT}"; then
        ok "qa-routes"
      else
        bad "qa-routes"
      fi
    fi
    cleanup_serve
    trap - EXIT
  fi
fi

# ── L5: local SEO/Ads cierre-smoke (optional, needs dev server) ─
if [[ "$WITH_DEV" -eq 1 ]]; then
  echo ""
  echo "── cierre-smoke (SEO+Ads local) ──"
  if curl -sf -o /dev/null --max-time 3 "$BASE/" || curl -sf -o /dev/null --max-time 3 "$BASE"; then
    SMOKE="$HOME/.grok/skills/seo-vn/scripts/cierre-smoke.sh"
    if [[ -f "$SMOKE" ]]; then
      if bash "$SMOKE" "$BASE"; then
        ok "cierre-smoke $BASE"
      else
        bad "cierre-smoke $BASE"
      fi
    else
      bad "cierre-smoke script missing"
    fi
  else
    bad "dev server not up at $BASE (npm run dev)"
  fi
fi

# ── summary ────────────────────────────────────────────────────
echo ""
echo "══════════════════════════════════════════"
echo " preprod-gate summary"
echo " PASS=$PASS  FAIL=$FAIL  SKIP=$SKIP"
for line in "${REPORT[@]}"; do
  echo "  $line"
done
echo "══════════════════════════════════════════"

if [[ "$FAIL" -gt 0 ]]; then
  echo "NO-GO technical · fix before PR/merge/deploy"
  echo "Human Test path (H2/H4/H5/S2) still required after this: /ops/AHORA-CLOSE-CHECKLIST.md"
  exit 1
fi

echo "GO technical · CI-equivalent local gate green"
echo "Next: human people-QA + Test path → then ship"
echo "  /ops/AHORA-CLOSE-CHECKLIST.md · vn-qa · canvas-sprint release"
exit 0
