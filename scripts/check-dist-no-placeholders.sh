#!/usr/bin/env bash
# Guarda del dist publicado (prod base / y QA base /qa/). TL 9-oct (QA de Rö 12:52 falló).
# Falla si el build trae:
#   1. Placeholders de contenido pendiente: el texto «Imagen pendiente de exportar» o los
#      el marcador de PendingSlot ("pendiente-ro", valor de data-placeholder), en cualquier
#      archivo. El atributo data-placeholder a secas no se busca: Radix lo usa en Select.
#   2. Enlaces a News, fuera de canon: href (HTML) o href:/to: (JS) que apunten a /#/news,
#      #/news o /news/ (relativos, con base /qa/ o absolutos a vientonorte.io).
# Solo mira esos patrones: otras vistas hash internas (#/sobre-mi, #/proyectos, …) no se tocan.
# Los source maps (*.map) se ignoran. Uso: npm run build && npm run qa:no-placeholders
# (DIST=otro/dir para otra salida).
set -euo pipefail
DIST="${DIST:-dist}"
if [ ! -f "$DIST/index.html" ]; then
  echo "check-dist-no-placeholders: falta $DIST/index.html (corre el build antes)" >&2
  exit 2
fi
fail=0

PLACEHOLDER_RE='Imagen pendiente de exportar|pendiente-ro'
if hits=$(grep -R -I -l -E --exclude='*.map' "$PLACEHOLDER_RE" "$DIST"); then
  echo "Placeholders en el dist (no pueden publicarse ni en /qa/):" >&2
  echo "$hits" >&2
  grep -R -I -o -h -E --exclude='*.map' ".{0,40}($PLACEHOLDER_RE).{0,40}" "$DIST" | head -20 >&2 || true
  fail=1
fi

# Destino News: (https://[www.]vientonorte.io)?(/qa)?  +  /#/news | #/news | /news/ | /news"
HOST='(https?://(www\.)?vientonorte\.io)?(/qa)?'
NEWS="(/?#/news|/news(/|[\"'\`?#]))"
HTML_RE="href=[\"']${HOST}${NEWS}"
JS_RE="(href|to)[\"']?[[:space:]]*:[[:space:]]*[\"'\`]${HOST}${NEWS}"
if hits=$(grep -R -I -l -E --include='*.html' "$HTML_RE" "$DIST"); then
  echo "href a News (fuera de canon) en HTML del dist:" >&2
  echo "$hits" >&2
  grep -R -I -o -h -E --include='*.html' ".{0,30}${HTML_RE}.{0,30}" "$DIST" | head -20 >&2 || true
  fail=1
fi
if hits=$(grep -R -I -l -E --include='*.js' --include='*.mjs' "$JS_RE" "$DIST"); then
  echo "href/to a News (fuera de canon) en JS del dist:" >&2
  echo "$hits" >&2
  grep -R -I -o -h -E --include='*.js' --include='*.mjs' ".{0,30}${JS_RE}.{0,30}" "$DIST" | head -20 >&2 || true
  fail=1
fi

if [ "$fail" -ne 0 ]; then exit 1; fi
echo "OK: dist sin placeholders ni enlaces a /#/news o /news/ ($DIST)"
