import type { ReactNode } from "react";
import { SubpageToolbar, type SubpageCrumb } from "../molecules/SubpageToolbar";
import { cn } from "../../lib/utils";

interface PageShellProps {
  crumbs: SubpageCrumb[];
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
}

/**
 * Shell de subpágina: toolbar sticky + contenido con ritmo de padding unificado.
 * No duplicar ThemeToggle en trailing (ya va en SubpageToolbar).
 */
export function PageShell({
  crumbs,
  children,
  trailing,
  className,
  contentClassName,
  showLogoText = true,
}: PageShellProps) {
  return (
    <div className={cn("page-shell min-h-screen bg-background", className)}>
      <SubpageToolbar
        crumbs={crumbs}
        trailing={trailing}
        showLogoText={showLogoText}
      />
      <div className={cn("page-shell__content", contentClassName)}>{children}</div>
    </div>
  );
}
