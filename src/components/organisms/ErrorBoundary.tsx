import { Component, ReactNode } from "react";
import { AlertCircle, RefreshCw, Home, ServerCrash } from "lucide-react";
import { Button } from "../ui/button";
import { isChunkLoadError } from "../../lib/lazy-with-retry";

const CHUNK_RELOAD_KEY = "rg-chunk-reload";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
  /** 503 = chunk/deploy stale; 500 = runtime */
  statusCode?: 500 | 503;
}

function classifyError(error: Error | undefined): 500 | 503 {
  if (error && isChunkLoadError(error)) return 503;
  return 500;
}

/**
 * Error Boundary — always shows a visible HTTP-style status (500 / 503)
 * so content-load failures are obvious in production and QA.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    const statusCode = classifyError(error);

    // One automatic reload for stale chunks after deploy (SW / renamed assets)
    if (statusCode === 503 && !sessionStorage.getItem(CHUNK_RELOAD_KEY)) {
      try {
        sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
      } catch {
        /* ignore */
      }
      window.location.reload();
    }

    return { hasError: true, error, statusCode };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
      statusCode: classifyError(error),
    });
  }

  handleReload = () => {
    try {
      sessionStorage.removeItem(CHUNK_RELOAD_KEY);
    } catch {
      /* ignore */
    }
    window.location.reload();
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      statusCode: undefined,
    });
  };

  handleHome = () => {
    try {
      sessionStorage.removeItem(CHUNK_RELOAD_KEY);
    } catch {
      /* ignore */
    }
    window.location.hash = "#/";
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const status = this.state.statusCode ?? 500;
      const isChunk = status === 503;
      const title = isChunk
        ? "Contenido no disponible"
        : "Error del servidor de la app";
      const description = isChunk
        ? "No se pudo cargar un módulo (chunk). Suele pasar tras un deploy o caché vieja. Recarga para obtener la versión actual."
        : this.state.error?.message ||
          "Ha ocurrido un error inesperado al renderizar esta vista.";

      return (
        <div
          className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted"
          role="alert"
          aria-live="assertive"
          data-error-status={status}
          data-testid="error-status-boundary"
        >
          <div className="max-w-md w-full text-center space-y-6 p-8 bg-card rounded-lg border shadow-lg">
            <div className="flex justify-center">
              <div className="p-3 bg-destructive/10 rounded-full">
                {isChunk ? (
                  <ServerCrash className="h-12 w-12 text-destructive" />
                ) : (
                  <AlertCircle className="h-12 w-12 text-destructive" />
                )}
              </div>
            </div>

            <p
              className="text-7xl font-bold tracking-tight text-destructive/90 tabular-nums"
              aria-label={`Error ${status}`}
            >
              {status}
            </p>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {description}
              </p>
              <p className="text-xs font-mono text-muted-foreground/80">
                HTTP {status}
                {isChunk ? " · chunk / deploy" : " · runtime"}
              </p>
            </div>

            {import.meta.env.DEV && this.state.errorInfo && (
              <details className="text-left mt-2 p-4 bg-muted rounded border">
                <summary className="cursor-pointer font-semibold text-sm mb-2">
                  Detalles técnicos
                </summary>
                <pre className="text-xs overflow-auto whitespace-pre-wrap max-h-40">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Button variant="outline" onClick={this.handleReset}>
                Intentar de nuevo
              </Button>
              <Button onClick={this.handleReload} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Recargar
              </Button>
              <Button variant="secondary" onClick={this.handleHome} className="gap-2">
                <Home className="h-4 w-4" />
                Inicio
              </Button>
            </div>

            <p className="text-xs text-muted-foreground pt-2">
              Si el problema persiste, prueba ventana privada o limpia caché del
              sitio.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
