#!/usr/bin/env bash
# Guarda del build de PROD (base /): MASCOTAPP es un concepto sin imagen que solo puede
# aparecer en el build QA (/qa/). Falla si su nombre, su slug o el nodo Figma
# (CBguM4Y5rIvc9TV5pGhOxL 2844:427) llegan a cualquier archivo publicado en dist/.
# Uso: npm run build && npm run qa:no-mascotapp   (DIST=otro/dir para otra salida)
set -euo pipefail
DIST="${DIST:-dist}"
if [ ! -f "$DIST/index.html" ]; then
  echo "check-prod-no-mascotapp: falta $DIST/index.html (corre el build de prod antes)" >&2
  exit 2
fi
if grep -q -E '(src|href)="/qa/assets/' "$DIST/index.html"; then
  echo "check-prod-no-mascotapp: $DIST parece un build QA (base /qa/); esta guarda es solo para prod" >&2
  exit 2
fi
if hits=$(grep -R -I -l -i -E 'mascotapp|mascota app|2844:427' "$DIST"); then
  echo "MASCOTAPP en el build de prod (solo puede vivir en /qa/):" >&2
  echo "$hits" >&2
  grep -R -I -o -i -E '.{0,40}(mascotapp|mascota app|2844:427).{0,40}' "$DIST" | head -20 >&2 || true
  exit 1
fi
echo "OK: build de prod sin MASCOTAPP ($DIST)"
