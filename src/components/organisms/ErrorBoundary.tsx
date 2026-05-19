import { Component, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

/**
 * Error Boundary component to catch and handle React errors gracefully
 * 
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * 
 * With custom fallback:
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
          <div className="max-w-md w-full text-center space-y-6 p-8 bg-card rounded-lg border shadow-lg">
            <div className="flex justify-center">
              <div className="p-3 bg-destructive/10 rounded-full">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Oops! Algo salió mal
              </h2>
              <p className="text-muted-foreground">
                {this.state.error?.message || "Ha ocurrido un error inesperado."}
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="text-left mt-4 p-4 bg-muted rounded border">
                <summary className="cursor-pointer font-semibold text-sm mb-2">
                  Detalles técnicos
                </summary>
                <pre className="text-xs overflow-auto whitespace-pre-wrap">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}

            <div className="flex gap-3 justify-center pt-4">
              <Button 
                variant="outline" 
                onClick={this.handleReset}
              >
                Intentar de nuevo
              </Button>
              <Button 
                onClick={this.handleReload}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Recargar página
              </Button>
            </div>

            <p className="text-xs text-muted-foreground pt-4">
              Si el problema persiste, por favor contacta al administrador.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
