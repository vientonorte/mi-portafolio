#!/usr/bin/env bash
# Verifica (y opcionalmente rellena) public/images semánticos.
#
# Histórico: copiaba desde src/assets/<hash>.png — esos hashes se archivaron
# (archive/src-assets-hash-2026-07-21/, REGISTRO). La fuente de verdad en git
# es public/images/** ya versionado.
#
# Si existe SRC_ASSETS_DIR (o src/assets/<hash>) se puede re-exportar un archivo;
# si no, solo require_public.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${SRC_ASSETS_DIR:-$ROOT/src/assets}"
DST="$ROOT/public/images"
ARCHIVE="$ROOT/archive/src-assets-hash-2026-07-21"

require_public() {
  local dest="$1"
  if [[ ! -f "$dest" ]]; then
    echo "  ✗ falta $(basename "$dest") en $(dirname "$dest")" >&2
    exit 1
  fi
  echo "  ✓ $(basename "$dest")"
}

# copy hash → dest only if hash file exists (local staging or archive restore)
copy_if_hash() {
  local hash="$1"
  local dest="$2"
  local src_file=""
  if [[ -f "$SRC/$hash" ]]; then
    src_file="$SRC/$hash"
  elif [[ -f "$ARCHIVE/$hash" ]]; then
    src_file="$ARCHIVE/$hash"
  else
    require_public "$dest"
    return 0
  fi
  mkdir -p "$(dirname "$dest")"
  cp "$src_file" "$dest"
  echo "  ✓ $(basename "$dest") (from $(basename "$(dirname "$src_file")")/$hash)"
}

echo "→ Verificando imágenes semánticas en public/images/"

echo "SURA"
copy_if_hash "4ba4d92eaa293e4c6c9e1d685912cc0f04035e80.png" "$DST/sura/ria-onboarding.png"
require_public "$DST/sura/web-prototype.png"
require_public "$DST/sura/component-pipeline.png"
require_public "$DST/sura/benchmark-navigation.png"
require_public "$DST/sura/analytics-ga4.png"
require_public "$DST/sura/ia-automation-dashboard.png"
require_public "$DST/sura/hotjar-dashboard.png"
require_public "$DST/sura/booking-flowchart.png"
require_public "$DST/sura/onboarding-flags.png"
require_public "$DST/sura/ux-process.png"
require_public "$DST/sura/celula-evolutiva-flow.png"

echo "Transvip"
require_public "$DST/transvip/app-desktop.png"
require_public "$DST/transvip/app-mobile.png"
require_public "$DST/transvip/figma-prototype.png"
require_public "$DST/transvip/product-vision.png"

echo "Karri"
require_public "$DST/karri/logo.png"
require_public "$DST/karri/boosmap-benchmark.png"
require_public "$DST/karri/delivery-brand.png"
require_public "$DST/karri/okrs-board.png"
require_public "$DST/karri/sprint-brief-1.png"

echo "Consultoría"
require_public "$DST/consultoria/x-cms-dashboard.png"
require_public "$DST/consultoria/gees-dashboard.png"

echo "UX Tools"
require_public "$DST/ux-tools/journey-map.png"
require_public "$DST/ux-tools/user-flow.png"
require_public "$DST/ux-tools/usability-test.png"
require_public "$DST/ux-tools/design-system.png"

echo "Framework"
require_public "$DST/framework/ux-value-chain.png"

echo "Branding"
mkdir -p "$DST/branding"
if [[ -f "$ROOT/public/icon-512x512.png" ]]; then
  cp "$ROOT/public/icon-512x512.png" "$DST/branding/og-portfolio.png"
  echo "  ✓ og-portfolio.png"
else
  require_public "$DST/branding/og-portfolio.png"
fi

echo "Done. (Hashes opcionales en src/assets o archive/ — public/images es la SoT en git)"
