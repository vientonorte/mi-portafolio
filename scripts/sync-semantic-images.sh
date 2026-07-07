#!/usr/bin/env bash
# Copia assets Figma (hash) → public/images con nombres semánticos.
# Los imports en src/imports/ siguen usando hashes; esto es la capa pública del portfolio.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/src/assets"
DST="$ROOT/public/images"

copy() {
  local hash="$1"
  local dest="$2"
  mkdir -p "$(dirname "$dest")"
  cp "$SRC/$hash" "$dest"
  echo "  ✓ $(basename "$dest")"
}

echo "→ Sincronizando imágenes semánticas a public/images/"

echo "SURA"
copy "4ba4d92eaa293e4c6c9e1d685912cc0f04035e80.png" "$DST/sura/ria-onboarding.png"
copy "4ba4d92eaa293e4c6c9e1d685912cc0f04035e80.png" "$DST/sura/web-prototype.png"
copy "84a772361fb8479f9e7f68a945694e700b7f7321.png" "$DST/sura/component-pipeline.png"
copy "8f110ae182ecb20cb32d266577a4411e4215f9a8.png" "$DST/sura/benchmark-navigation.png"
copy "70518d704593e324e05fed17928549e0e0e5fbd0.png" "$DST/sura/analytics-ga4.png"
# ia-automation-dashboard.png: captura del POC (scripts/capture-ia-poc-screenshot.sh)
copy "351998f57aeca5a0721f29366c3e661a468847b6.png" "$DST/sura/hotjar-dashboard.png"
copy "77b107e97d12e770619a89e345639f0bc08f5202.png" "$DST/sura/booking-flowchart.png"
copy "d7cad0e13be7a40071ccaec70eb93d0304f2b679.png" "$DST/sura/onboarding-flags.png"
copy "0ddc6d387f6fec8fd73c93778e82ff34a1b1e8cd.png" "$DST/sura/ux-process.png"

echo "Transvip"
copy "ca7a4a167c789c951e4e08b0ba00177a6fc58634.png" "$DST/transvip/app-desktop.png"
copy "0a0ed13a8f1836aed4325be4398240085ee9c5be.png" "$DST/transvip/app-mobile.png"
copy "d1ab9c8c94b2a7e89d137d276bf558f69f930bbc.png" "$DST/transvip/figma-prototype.png"
copy "a071203af6e3a2f88489671218e31f4f1b63c06a.png" "$DST/transvip/product-vision.png"

echo "Karri"
copy "a31e098be9118630dbd647bf5cfea93582c8f9af.png" "$DST/karri/logo.png"
copy "deca6bc1a3a2801577b021b134a72cf71a3c5753.png" "$DST/karri/boosmap-benchmark.png"
copy "8b2d0de2ad888eef0501080acb3db66b4d75ba53.png" "$DST/karri/delivery-brand.png"
copy "87f8a6e7a81d96e3e86411d762aae491d3952734.png" "$DST/karri/okrs-board.png"
copy "a633e31e4ce4652b6a54e3d62bc05ce3b6921232.png" "$DST/karri/sprint-brief-1.png"

echo "Framework"
copy "d875ff7cbc9428b37b29af656c4f765e8cb8b779.png" "$DST/framework/ux-value-chain.png"

echo "Branding"
mkdir -p "$DST/branding"
if [[ -f "$ROOT/public/icon-512x512.png" ]]; then
  cp "$ROOT/public/icon-512x512.png" "$DST/branding/og-portfolio.png"
  echo "  ✓ og-portfolio.png"
fi

echo "Done."