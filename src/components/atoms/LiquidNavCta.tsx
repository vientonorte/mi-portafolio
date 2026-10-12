import { LogoMarkSvg } from "./Logo";
import { cn } from "../../lib/utils";

export interface LiquidNavCtaProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  /** Si hay destino HTTP (p. ej. /servicios/#web-pymes) se renderiza como <a href> real. */
  href?: string;
}

/**
 * CTA central del dock.
 * Idle = isologo + label neutro; hover solo al interactuar (pointer fino).
 */
export function LiquidNavCta({
  label,
  active = false,
  onClick,
  ariaLabel,
  href,
}: LiquidNavCtaProps) {
  const className = cn(
    "liquid-nav-cta relative flex h-16 w-full min-h-[44px] flex-col items-center justify-end gap-1 px-0.5 pb-1",
    "rounded-md outline-none transition-[opacity] duration-150 ease-out",
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:opacity-90",
    active ? "liquid-nav-cta--active is-active" : "is-idle"
  );
  const shared = {
    className,
    onClick,
    "aria-label": ariaLabel ?? label,
    "aria-current": active ? ("page" as const) : undefined,
    "data-liquid-cta": "consultoria",
    "data-active": active ? "true" : "false",
  };
  const content = (
    <>
      <span className="liquid-nav-cta__orb" aria-hidden="true">
        <span className="liquid-nav-cta__halo" />
        <LogoMarkSvg
          size={48}
          showPlate
          plate="floating"
          interactive
          className="liquid-nav-cta__mark"
        />
      </span>
      <span
        className={cn(
          "bottom-nav-mobile__label liquid-nav-cta__label max-w-full truncate",
          active ? "font-semibold" : "font-medium"
        )}
      >
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} {...shared}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" {...shared}>
      {content}
    </button>
  );
}
