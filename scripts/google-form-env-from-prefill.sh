#!/usr/bin/env bash
# Extrae VITE_GOOGLE_FORM_* desde un enlace de Google Forms (prellenado o compartido).
#
# Uso:
#   ./scripts/google-form-env-from-prefill.sh 'URL_DEL_FORMULARIO'
#
# Acepta:
#   - Enlace prellenado (entry.XXX en query)
#   - Enlace compartido viewform (extrae entry IDs del HTML)

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Uso: $0 'https://docs.google.com/forms/d/e/.../viewform?...'" >&2
  exit 1
fi

URL="$1"
FORM_ID="$(printf '%s' "$URL" | sed -n 's|.*forms/d/e/\([^/?]*\).*|\1|p')"

if [[ -z "$FORM_ID" ]]; then
  echo "No pude extraer FORM_ID. ¿Es un enlace de Google Forms?" >&2
  exit 1
fi

VIEW_URL="https://docs.google.com/forms/d/e/${FORM_ID}/viewform"

echo "# Pegar en .env.local o GitHub Secrets (Actions)"
echo "VITE_GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/${FORM_ID}/formResponse"
echo ""

python3 - <<'PY' "$URL" "$VIEW_URL"
import json
import re
import sys
import urllib.parse
import urllib.request

url, view_url = sys.argv[1:3]
query = urllib.parse.urlparse(url).query
params = urllib.parse.parse_qs(query)
prefill = sorted((k, v[0]) for k, v in params.items() if k.startswith("entry."))

FIELD_MAP = {
    "nombre": "VITE_GOOGLE_FORM_ENTRY_NAME",
    "name": "VITE_GOOGLE_FORM_ENTRY_NAME",
    "correo": "VITE_GOOGLE_FORM_ENTRY_EMAIL",
    "email": "VITE_GOOGLE_FORM_ENTRY_EMAIL",
    "e-mail": "VITE_GOOGLE_FORM_ENTRY_EMAIL",
    "mensaje": "VITE_GOOGLE_FORM_ENTRY_MESSAGE",
    "message": "VITE_GOOGLE_FORM_ENTRY_MESSAGE",
    "motivo": "VITE_GOOGLE_FORM_ENTRY_INTENT",
    "intent": "VITE_GOOGLE_FORM_ENTRY_INTENT",
    "canal": "VITE_GOOGLE_FORM_ENTRY_SOURCE",
    "source": "VITE_GOOGLE_FORM_ENTRY_SOURCE",
    "idioma": "VITE_GOOGLE_FORM_ENTRY_LANGUAGE",
    "language": "VITE_GOOGLE_FORM_ENTRY_LANGUAGE",
}

def normalize(label: str) -> str:
    return (
        label.lower()
        .replace("*", "")
        .strip()
    )

def map_field(label):
    return FIELD_MAP.get(normalize(label))

def scrape_viewform():
    req = urllib.request.Request(view_url, headers={"User-Agent": "mi-portafolio-setup/1.0"})
    html = urllib.request.urlopen(req, timeout=20).read().decode("utf-8", "replace")
    match = re.search(r"FB_PUBLIC_LOAD_DATA_\s*=\s*(\[.*?\]);", html, re.DOTALL)
    if not match:
        return []
    data = json.loads(match.group(1))
    questions = data[1][1] if len(data) > 1 and data[1] and len(data[1]) > 1 else []
    result = []
    for question in questions:
        if not question or len(question) < 5:
            continue
        title = str(question[1] or "").strip()
        entry_id = question[4][0][0] if question[4] and question[4][0] else None
        if title and entry_id:
            result.append((title, f"entry.{entry_id}"))
    return result

if prefill:
    print("# Mapea por el valor de prueba que pusiste en cada campo:")
    for key, value in prefill:
        print(f"# valor prellenado «{value}» →")
        print(f"# VITE_GOOGLE_FORM_ENTRY_???={key}")
        print()
else:
    scraped = scrape_viewform()
    if not scraped:
        print("# No encontré entry.XXX — prueba con «Obtener enlace prellenado»", file=sys.stderr)
        sys.exit(1)
    print("# Extraído del formulario (enlace compartido):")
    for title, entry in scraped:
        env_name = map_field(title)
        suffix = f"  # {title}" if env_name else f"  # ??? — {title}"
        key = env_name or "VITE_GOOGLE_FORM_ENTRY_???"
        print(f"{key}={entry}{suffix}")
    print()
PY

cat <<'EOF'
# GitHub: repo → Settings → Secrets and variables → Actions → New repository secret
# Luego push a main (el deploy de Pages embebe las variables en el build).
EOF