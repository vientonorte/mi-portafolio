import type { ReactNode } from "react";
import { SubpageToolbar, type SubpageCrumb } from "../molecules/SubpageToolbar";
import { cn } from "../../lib/utils";

interface PageShellProps {
  /** Vacío = sin SubpageToolbar (p. ej. home FO embudo: evita Inicio›Inicio + doble chrome). */
  crumbs?: SubpageCrumb[];
  children: ReactNode;
  trailing?: ReactNode;
  className?: string;
  /** Clase extra del área de contenido (padding, etc.) */
  contentClassName?: string;
  /**
   * Wordmark del logo en toolbar. false = solo isologo
   * (p. ej. landing consultoría Viento Norte sin nombre personal).
   */
  showLogoText?: boolean;
  /** false = no toolbar aunque haya crumbs */
  showToolbar?: boolean;
}

/**
 * Shell de subpágina: toolbar sticky + contenido con ritmo de padding unificado.
 * No duplicar ThemeToggle en trailing (ya va en SubpageToolbar).
 * Home FO: `crumbs={[]}` o `showToolbar={false}` — solo header global + dock.
 */
export function PageShell({
  crumbs = [],
  children,
  trailing,
  className,
  contentClassName,
  showLogoText = true,
  showToolbar = true,
}: PageShellProps) {
  const toolbar = showToolbar && crumbs.length > 0;

  return (
    <div className={cn("page-shell min-h-screen bg-background", className)}>
      {toolbar ? (
        <SubpageToolbar
          crumbs={crumbs}
          trailing={trailing}
          showLogoText={showLogoText}
        />
      ) : null}
      <div className={cn("page-shell__content", contentClassName)}>{children}</div>
    </div>
  );
}
