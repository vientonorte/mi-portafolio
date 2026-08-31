#!/usr/bin/env bash
# scripts/start-local.sh
#
# One-command local dev environment using Ollama (no cloud tokens needed).
# Usage: bash scripts/start-local.sh
#        npm run dev:local

set -euo pipefail

OLLAMA_MODEL="${OLLAMA_MODEL:-llama3.2}"
OLLAMA_BACKEND_PORT="${OLLAMA_BACKEND_PORT:-5001}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"

# ─── Colores ────────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

log()   { echo -e "${CYAN}[start-local]${NC} $*"; }
ok()    { echo -e "${GREEN}[start-local]${NC} ✅ $*"; }
warn()  { echo -e "${YELLOW}[start-local]${NC} ⚠️  $*"; }
error() { echo -e "${RED}[start-local]${NC} ❌ $*"; }

echo ""
echo -e "${BOLD}🦙 Viento Norte — modo local (Ollama, sin tokens de nube)${NC}"
echo "──────────────────────────────────────────────────────"
echo ""

# ─── 1. Verificar Ollama instalado ──────────────────────────────────────────
log "Verificando Ollama..."
if ! command -v ollama &>/dev/null; then
  error "Ollama no está instalado."
  echo ""
  echo "  macOS:   brew install ollama"
  echo "  Linux:   curl -fsSL https://ollama.com/install.sh | sh"
  echo ""
  exit 1
fi
ok "Ollama encontrado: $(ollama --version 2>/dev/null | head -1)"

# ─── 2. Verificar / iniciar servidor Ollama ─────────────────────────────────
log "Verificando servidor Ollama..."
if ! curl -sf http://localhost:11434/api/tags > /dev/null 2>&1; then
  warn "Servidor Ollama no está corriendo. Iniciando..."
  ollama serve &>/tmp/ollama-serve.log &
  OLLAMA_PID=$!
  echo "$OLLAMA_PID" > /tmp/ollama.pid

  # Esperar hasta 10 segundos a que levante
  for i in $(seq 1 20); do
    sleep 0.5
    if curl -sf http://localhost:11434/api/tags > /dev/null 2>&1; then
      ok "Servidor Ollama iniciado (PID: $OLLAMA_PID)"
      break
    fi
    if [ "$i" -eq 20 ]; then
      error "Ollama no respondió después de 10 segundos."
      cat /tmp/ollama-serve.log
      exit 1
    fi
  done
else
  ok "Servidor Ollama ya está corriendo."
fi

# ─── 3. Verificar / descargar modelo ────────────────────────────────────────
log "Verificando modelo '$OLLAMA_MODEL'..."
if ! ollama list 2>/dev/null | grep -q "^${OLLAMA_MODEL}"; then
  warn "Modelo '$OLLAMA_MODEL' no encontrado. Descargando..."
  echo "(Esto puede tardar varios minutos dependiendo del tamaño del modelo)"
  if ! ollama pull "$OLLAMA_MODEL"; then
    error "No se pudo descargar el modelo '$OLLAMA_MODEL'."
    echo ""
    echo "  Modelos recomendados:"
    echo "    llama3.2     (~2GB)  — rápido, bueno para Q&A"
    echo "    mistral      (~4GB)  — mejor razonamiento"
    echo "    llama3.1:8b  (~5GB)  — mayor contexto"
    echo ""
    echo "  Cambia el modelo con: export OLLAMA_MODEL=<nombre>"
    exit 1
  fi
  ok "Modelo '$OLLAMA_MODEL' listo."
else
  ok "Modelo '$OLLAMA_MODEL' disponible."
fi

# ─── 4. Exportar contexto del portfolio ─────────────────────────────────────
log "Exportando contexto del portfolio (skills, experiencia, proyectos)..."
if ! node "$SCRIPT_DIR/export-skills.mjs"; then
  error "Falló la exportación del contexto."
  exit 1
fi

# ─── 5. Verificar .env.local del backend ────────────────────────────────────
BACKEND_ENV="$BACKEND_DIR/.env.local"
if [ ! -f "$BACKEND_ENV" ]; then
  warn ".env.local no encontrado en backend/. Creando desde plantilla..."
  cat > "$BACKEND_ENV" << ENVEOF
# Generado automáticamente por start-local.sh
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=${OLLAMA_MODEL}
OLLAMA_BACKEND_PORT=${OLLAMA_BACKEND_PORT}
# Variables requeridas por server.js (Vertex) — no usadas en modo local
GOOGLE_CLOUD_PROJECT=local
GOOGLE_CLOUD_LOCATION=local
PROXY_HEADER=local-dev
ENVEOF
  ok "Creado $BACKEND_ENV"
fi

# ─── 6. Iniciar servidor Ollama local en background ─────────────────────────
log "Iniciando ollama-server en puerto $OLLAMA_BACKEND_PORT..."

# Matar instancia previa si existe
if [ -f /tmp/ollama-backend.pid ]; then
  OLD_PID=$(cat /tmp/ollama-backend.pid)
  kill "$OLD_PID" 2>/dev/null || true
  rm -f /tmp/ollama-backend.pid
fi

cd "$BACKEND_DIR"
node --env-file=.env.local ollama-server.js > /tmp/ollama-backend.log 2>&1 &
BACKEND_PID=$!
echo "$BACKEND_PID" > /tmp/ollama-backend.pid

# Esperar que levante
sleep 1
if ! kill -0 "$BACKEND_PID" 2>/dev/null; then
  error "ollama-server no pudo iniciarse."
  cat /tmp/ollama-backend.log
  exit 1
fi

ok "ollama-server corriendo (PID: $BACKEND_PID) → http://localhost:$OLLAMA_BACKEND_PORT"

# ─── 7. Iniciar frontend ─────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}🚀 Iniciando frontend (Vite dev server)...${NC}"
echo ""
echo -e "  API local:  ${CYAN}http://localhost:$OLLAMA_BACKEND_PORT${NC}"
echo -e "  Health:     ${CYAN}http://localhost:$OLLAMA_BACKEND_PORT/health${NC}"
echo -e "  Frontend:   ${CYAN}http://localhost:5173${NC}"
echo ""
echo "  Logs del backend: /tmp/ollama-backend.log"
echo "  Para detener:     Ctrl+C (o kill $BACKEND_PID)"
echo ""

# Capturar SIGINT/SIGTERM para limpiar procesos hijos
cleanup() {
  echo ""
  log "Deteniendo servicios..."
  [ -n "${BACKEND_PID:-}" ] && kill "$BACKEND_PID" 2>/dev/null && ok "ollama-server detenido."
  [ -n "${OLLAMA_PID:-}" ] && kill "$OLLAMA_PID" 2>/dev/null && ok "Servidor Ollama detenido."
  exit 0
}
trap cleanup SIGINT SIGTERM

cd "$ROOT_DIR"
VITE_USE_OLLAMA=true npm run dev
