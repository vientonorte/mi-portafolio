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
 * CTA central liquid glass del bottom dock + isologo RG.
 * Capas: blur / tint / specular / rim — legible en mobile y desktop.
 * Destino: /consultoria.
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
        "rounded-sm transition-transform duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.97]",
        active && "liquid-nav-cta--active"
      )}
      aria-label={ariaLabel ?? label}
      aria-current={active ? "page" : undefined}
      data-liquid-cta="consultoria"
    >
      <span className="liquid-nav-cta__orb" aria-hidden>
        {/* Capas liquid glass (orden: fondo → tint → blur shell → specular → logo) */}
        <span className="liquid-nav-cta__glass" />
        <span className="liquid-nav-cta__tint" />
        <span className="liquid-nav-cta__specular" />
        <span className="liquid-nav-cta__rim" />
        <LogoMarkSvg
          size={28}
          showPlate={false}
          interactive
          className="liquid-nav-cta__mark"
        />
      </span>
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
