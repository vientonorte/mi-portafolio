#!/usr/bin/env bash
# Captura screenshot GEES (Figma Sites) → public/images/consultoria/gees-dashboard.png
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images/consultoria/gees-dashboard.png"
GEES_URL="${GEES_URL:-https://duct-juice-51509104.figma.site}"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [[ ! -x "$CHROME" ]]; then
  echo "Chrome no encontrado en $CHROME" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUT")"
"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --hide-scrollbars \
  --window-size=1440,900 \
  --screenshot="$OUT" \
  "$GEES_URL"

echo "✓ Captura GEES → public/images/consultoria/gees-dashboard.png ($(wc -c < "$OUT") bytes)"
