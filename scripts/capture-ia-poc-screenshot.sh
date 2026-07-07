#!/usr/bin/env bash
# Captura screenshot del POC IA (Figma Sites) → public/images/sura/ia-automation-dashboard.png
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images/sura/ia-automation-dashboard.png"
POC_URL="https://badge-sweet-21070688.figma.site"

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
  --window-size=1440,900 \
  --screenshot="$OUT" \
  "$POC_URL"

echo "✓ Captura guardada en public/images/sura/ia-automation-dashboard.png"