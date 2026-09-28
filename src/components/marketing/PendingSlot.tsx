import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { PLACEHOLDER_MARKER, placeholdersEnabled } from "./marketing-env";

/**
 * Único punto de entrada para contenido pendiente de autorización (logos,
 * casos, mockups). Solo se renderiza en el build de QA (base "/qa/"); en
 * producción (base "/") devuelve null y las secciones que dependen de él
 * se omiten por completo.
 */

export type PendingSlotVariant = "logo" | "thumb" | "case";

export interface PendingSlotProps {
  /** Texto visible (y accesible) del placeholder. */
  label: string;
  variant?: PendingSlotVariant;
  className?: string;
  /** Contenido extra (p. ej. estructura del caso). */
  children?: ReactNode;
}

export function PendingSlot({ label, variant = "thumb", className, children }: PendingSlotProps) {
  if (!placeholdersEnabled()) return null;
  return (
    <div
      data-placeholder={PLACEHOLDER_MARKER}
      data-placeholder-variant={variant}
      className={cn(
        "flex flex-col justify-center rounded-lg border-2 border-dashed border-neutral-400 bg-neutral-100 text-neutral-700",
        variant === "logo" && "min-h-16 items-center px-3 py-2 text-center text-xs font-medium",
        variant === "thumb" && "aspect-[16/10] w-full items-center p-4 text-center text-sm font-medium",
        variant === "case" && "h-full gap-3 p-5 text-sm",
        className
      )}
    >
      <p className={cn(variant === "case" && "font-mono text-xs uppercase tracking-[0.14em]")}>{label}</p>
      {children}
    </div>
  );
}
