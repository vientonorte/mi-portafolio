import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";

function Boom({ message }: { message: string }) {
  throw new Error(message);
}

describe("ErrorBoundary", () => {
  const originalError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
    sessionStorage.clear();
  });

  afterEach(() => {
    console.error = originalError;
  });

  it("shows 500 for runtime render errors", () => {
    render(
      <ErrorBoundary>
        <Boom message="unexpected render failure" />
      </ErrorBoundary>
    );

    const root = screen.getByTestId("error-status-boundary");
    expect(root).toHaveAttribute("data-error-status", "500");
    expect(screen.getByLabelText("Error 500")).toBeInTheDocument();
    expect(screen.getByText(/Error del servidor de la app/i)).toBeInTheDocument();
    expect(screen.getAllByText(/unexpected render failure/i).length).toBeGreaterThan(0);
  });

  it("shows 503 for chunk load errors after auto-reload flag is set", () => {
    sessionStorage.setItem("rg-chunk-reload", "1");

    render(
      <ErrorBoundary>
        <Boom message="Failed to fetch dynamically imported module: ./Page.js" />
      </ErrorBoundary>
    );

    const root = screen.getByTestId("error-status-boundary");
    expect(root).toHaveAttribute("data-error-status", "503");
    expect(screen.getByLabelText("Error 503")).toBeInTheDocument();
    expect(screen.getByText(/Contenido no disponible/i)).toBeInTheDocument();
  });
});
