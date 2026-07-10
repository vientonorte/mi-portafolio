import { LogoMarkSvg } from "./Logo";
import { cn } from "../../lib/utils";

export interface LiquidNavCtaProps {
  /** Texto visible bajo el isologo (sin iconos decorativos). */
  label: string;
  active?: boolean;
  onClick: () => void;
  /** Nombre accesible completo (logo solo no basta para SR). */
  ariaLabel?: string;
}

/**
 * CTA central del dock: isologo RG legible + label de texto.
 * Sin Lucide ni adornos en el label — el logo es el único glifo.
 * Contraste: plato mate del isologo (no se funde con el glass).
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
        "group flex h-16 w-full min-h-[44px] flex-col items-center justify-end gap-1 px-0.5 pb-1",
        "rounded-sm transition-transform duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.97]",
        active && "liquid-nav-cta--active"
      )}
      aria-label={ariaLabel ?? label}
      aria-current={active ? "page" : undefined}
      data-liquid-cta="consultoria"
    >
      <span className="liquid-nav-cta__orb" aria-hidden="true">
        {/* Halo liquid glass (alrededor, no sobre el logo) */}
        <span className="liquid-nav-cta__halo" />
        {/* Isologo completo con plato — contraste WCAG sobre el dock */}
        <LogoMarkSvg
          size={48}
          showPlate
          plate="floating"
          className="liquid-nav-cta__mark"
        />
      </span>
      {/* Solo texto: sin icono adicional al logo */}
      <span
        className={cn(
          "bottom-nav-mobile__label max-w-full truncate",
          active ? "font-semibold text-primary" : "font-medium"
        )}
      >
        {label}
      </span>
    </button>
  );
}
