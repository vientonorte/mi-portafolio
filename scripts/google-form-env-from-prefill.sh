#!/usr/bin/env bash
# Extrae VITE_GOOGLE_FORM_* desde un enlace prellenado de Google Forms.
#
# Uso:
#   1. Crea el form con campos: Nombre, Email, Mensaje (+ Motivo, Canal, Idioma opc.)
#   2. ⋮ → Obtener enlace prellenado → rellena UN valor distinto por campo
#   3. ./scripts/google-form-env-from-prefill.sh 'URL_COMPLETA'
#
# Luego asigna cada entry.XXX al campo correcto en .env.local / GitHub Secrets.

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Uso: $0 'https://docs.google.com/forms/d/e/.../viewform?...'" >&2
  exit 1
fi

URL="$1"
FORM_ID="$(printf '%s' "$URL" | sed -n 's|.*forms/d/e/\([^/?]*\).*|\1|p')"

if [[ -z "$FORM_ID" ]]; then
  echo "No pude extraer FORM_ID. ¿Es un enlace prellenado de Google Forms?" >&2
  exit 1
fi

echo "# Pegar en .env.local o GitHub Secrets (Actions)"
echo "VITE_GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/${FORM_ID}/formResponse"
echo ""

# Decodifica query y lista entry.*=valor para mapear manualmente
python3 - <<'PY' "$URL"
import sys, urllib.parse
url = sys.argv[1]
query = urllib.parse.urlparse(url).query
params = urllib.parse.parse_qs(query)
entries = sorted((k, v[0]) for k, v in params.items() if k.startswith("entry."))
if not entries:
    print("# No encontré entry.XXX en la URL — usa «Obtener enlace prellenado»", file=sys.stderr)
    sys.exit(1)
print("# Mapea por el valor de prueba que pusiste en cada campo:")
for key, value in entries:
    print(f"# valor prellenado «{value}» →")
    print(f"# VITE_GOOGLE_FORM_ENTRY_???={key}")
    print()
PY

cat <<'EOF'
# Referencia de nombres (asigna según tu valor de prueba):
#   test-nombre  → VITE_GOOGLE_FORM_ENTRY_NAME
#   test-email   → VITE_GOOGLE_FORM_ENTRY_EMAIL
#   test-mensaje → VITE_GOOGLE_FORM_ENTRY_MESSAGE
#   test-motivo  → VITE_GOOGLE_FORM_ENTRY_INTENT   (opcional)
#   test-canal   → VITE_GOOGLE_FORM_ENTRY_SOURCE   (opcional)
#   test-idioma  → VITE_GOOGLE_FORM_ENTRY_LANGUAGE (opcional)
#
# GitHub: repo → Settings → Secrets and variables → Actions → New repository secret
# Luego push a main (el deploy de Pages embebe las variables en el build).
EOF