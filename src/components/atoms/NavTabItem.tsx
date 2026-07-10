import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export interface NavTabItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
}

/**
 * Tab del bottom dock — hover + estado activo (página / sección).
 * Colores por clase (no style inline) para que :hover funcione.
 */
export function NavTabItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: NavTabItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "bottom-nav-tab group relative flex h-16 w-full min-h-[44px] flex-col items-center justify-center gap-1 px-1",
        "rounded-lg transition-[color,background-color,transform] duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.97]",
        // idle
        "text-[color:var(--bottom-nav-inactive,#404040)]",
        // hover (desktop / pointer fino)
        "hover:bg-primary/10 hover:text-primary",
        // active route / section
        active &&
          "bottom-nav-tab--active bg-primary/10 text-primary font-semibold hover:bg-primary/15"
      )}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      data-active={active ? "true" : "false"}
    >
      <Icon
        className={cn(
          "h-5 w-5 shrink-0 transition-[stroke-width,transform] duration-150",
          "group-hover:scale-105",
          active ? "stroke-[2.5]" : "stroke-[1.5] group-hover:stroke-[2]"
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "bottom-nav-mobile__label max-w-full truncate",
          active ? "font-semibold" : "font-normal group-hover:font-medium"
        )}
      >
        {label}
      </span>
      {/* Indicador activo — alinea con header (raya primary) */}
      {active && (
        <span
          className="pointer-events-none absolute inset-x-3 top-1 h-0.5 rounded-full bg-primary"
          aria-hidden
        />
      )}
    </button>
  );
}
