import { LogoMarkSvg } from "./Logo";
import { cn } from "../../lib/utils";

export interface LiquidNavCtaProps {
  label: string;
  active?: boolean;
  onClick: () => void;
  /** aria-label ampliado (p. ej. «Consultoría Viento Norte»). */
  ariaLabel?: string;
}

/**
 * CTA central liquid del bottom dock con isologo RG.
 * Destino: /consultoria. Plantillas premium emprendedores → sesión futura.
 */
export function LiquidNavCta({
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
          "transition-[box-shadow,transform] duration-200",
          "group-hover:-translate-y-0.5",
          active && "ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
        )}
        aria-hidden
      >
        <span className="liquid-nav-cta__sheen" aria-hidden />
        <LogoMarkSvg
          size={44}
          showPlate
          plate="floating"
          interactive
          className="liquid-nav-cta__mark relative z-[1]"
        />
      </span>
      <span
        className={cn(
          "bottom-nav-mobile__label max-w-full truncate",
          active ? "font-semibold text-primary" : "font-medium text-muted-foreground"
        )}
      >
        {label}
      </span>
    </button>
  );
}
