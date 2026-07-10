import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export interface NavTabItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
}

/**
 * Tab del bottom dock — hover sutil (solo color) + activo limpio.
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
        "rounded-md transition-colors duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:opacity-80",
        active
          ? "bottom-nav-tab--active text-primary"
          : "text-[color:var(--bottom-nav-inactive,#525252)]"
      )}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      data-active={active ? "true" : "false"}
    >
      <Icon
        className="h-5 w-5 shrink-0"
        aria-hidden="true"
        strokeWidth={active ? 2.25 : 1.75}
      />
      <span
        className={cn(
          "bottom-nav-mobile__label max-w-full truncate",
          active ? "font-semibold" : "font-normal"
        )}
      >
        {label}
      </span>
      {/* Activo: punto discreto abajo (no raya ruidosa arriba) */}
      {active && (
        <span
          className="pointer-events-none absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
          aria-hidden
        />
      )}
    </button>
  );
}
