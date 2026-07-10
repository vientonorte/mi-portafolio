import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export interface NavTabItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick: () => void;
}

export function NavTabItem({ icon: Icon, label, active = false, onClick }: NavTabItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-16 w-full min-h-[44px] flex-col items-center justify-center gap-1 px-1",
        "rounded-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.97] active:opacity-90"
      )}
      style={{
        color: active ? "var(--primary)" : "var(--bottom-nav-inactive, #404040)",
      }}
      aria-label={label}
      aria-current={active ? "page" : undefined}
    >
      <Icon
        className="h-5 w-5 shrink-0"
        aria-hidden="true"
        strokeWidth={active ? 2.5 : 1.5}
      />
      <span
        className={cn(
          "bottom-nav-mobile__label max-w-full truncate",
          active ? "font-semibold" : "font-normal"
        )}
      >
        {label}
      </span>
    </button>
  );
}