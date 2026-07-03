import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export type PageSectionPadding = "compact" | "default" | "spacious";
export type PageSectionWidth = "narrow" | "content" | "wide";
export type PageSectionTone = "default" | "muted" | "matte" | "section";

const paddingClass: Record<PageSectionPadding, string> = {
  compact: "py-10 sm:py-12 md:py-16",
  default: "py-12 sm:py-14 md:py-20",
  spacious: "py-16 sm:py-20 md:py-24",
};

const widthClass: Record<PageSectionWidth, string> = {
  narrow: "max-w-4xl",
  content: "max-w-6xl",
  wide: "max-w-7xl",
};

const toneClass: Record<PageSectionTone, string> = {
  default: "bg-background",
  muted: "bg-muted/30",
  matte: "bg-surface-matte",
  section: "bg-surface-section",
};

interface PageSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  padding?: PageSectionPadding;
  width?: PageSectionWidth;
  tone?: PageSectionTone;
  /** Ancla con offset para header + bottom nav móvil */
  anchored?: boolean;
  "aria-labelledby"?: string;
}

export function PageSection({
  id,
  children,
  className,
  containerClassName,
  padding = "default",
  width = "wide",
  tone = "default",
  anchored = Boolean(id),
  "aria-labelledby": ariaLabelledby,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "page-section px-4 sm:px-6",
        paddingClass[padding],
        toneClass[tone],
        anchored && "scroll-mt-[calc(var(--header-height)+0.75rem)]",
        className
      )}
      aria-labelledby={ariaLabelledby}
    >
      <div
        className={cn(
          "container mx-auto w-full",
          widthClass[width],
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}