import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export interface LiquidNavCtaProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
  /** aria-label ampliado (p. ej. «Consultoría Viento Norte»). */
  ariaLabel?: string;
}

/**
 * CTA central tipo liquid glass del bottom dock.
 * Destino actual: /consultoria. Plantillas premium emprendedores → sesión futura.
 */
export function LiquidNavCta({
  icon: Icon,
  label,
  active = false,
  onClick,
  ariaLabel,
}: LiquidNavCtaProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "liquid-nav-cta",
        "group flex h-16 w-full min-h-[44px] flex-col items-center justify-end gap-0.5 px-0.5 pb-1",
        "rounded-sm transition-transform",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.96]"
      )}
      aria-label={ariaLabel ?? label}
      aria-current={active ? "page" : undefined}
      data-liquid-cta="consultoria"
    >
      <span
        className={cn(
          "liquid-nav-cta__orb",
          "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
          "text-primary-foreground shadow-[0_6px_20px_rgba(255,29,37,0.35)]",
          "transition-[box-shadow,transform] duration-200",
          "group-hover:shadow-[0_8px_24px_rgba(255,29,37,0.45)] group-hover:-translate-y-0.5",
          active && "ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
        )}
        aria-hidden
      >
        <span className="liquid-nav-cta__sheen" aria-hidden />
        <Icon className="relative z-[1] h-5 w-5" strokeWidth={active ? 2.5 : 2} />
      </span>
      <span
        className={cn(
          "max-w-full truncate text-[10px] leading-none sm:text-[11px]",
          active ? "font-semibold text-primary" : "font-medium text-muted-foreground"
        )}
        style={{ letterSpacing: "0.01em" }}
      >
        {label}
      </span>
    </button>
  );
}
