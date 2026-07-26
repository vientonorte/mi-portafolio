import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export type PageSectionPadding = "compact" | "default" | "spacious";
export type PageSectionWidth = "narrow" | "content" | "wide";
export type PageSectionTone = "default" | "muted" | "matte" | "section";

/**
 * Escala de padding vertical — clases en global.css (tokens CSS).
 * compact: teaser / stats / contacto
 * default: bloques de contenido (ritmo principal del landing)
 * spacious: solo hitos (hero-like, DS showcase)
 */
export const PAGE_SECTION_PADDING_CLASS: Record<PageSectionPadding, string> = {
  compact: "section-pad-compact",
  default: "section-pad-default",
  spacious: "section-pad-spacious",
};

const widthClass: Record<PageSectionWidth, string> = {
  narrow: "max-w-4xl",
  content: "max-w-6xl",
  wide: "max-w-7xl",
};

/** Solid tones (legacy). Prefer atmosphere* for long landings. */
const toneClass: Record<PageSectionTone, string> = {
  default: "bg-background",
  muted: "bg-muted/30",
  matte: "bg-surface-matte",
  section: "bg-surface-section",
};

/**
 * Soft radial wash on top of surface tokens — breaks solid “brick” sections.
 * When set, replaces the flat toneClass background.
 */
const atmosphereClass: Record<PageSectionTone, string> = {
  default: "section-atmosphere section-atmosphere-base",
  muted: "section-atmosphere section-atmosphere-muted",
  matte: "section-atmosphere section-atmosphere-matte",
  section: "section-atmosphere section-atmosphere-section",
};

interface PageSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  padding?: PageSectionPadding;
  width?: PageSectionWidth;
  tone?: PageSectionTone;
  /**
   * Soft atmospheric wash instead of flat solid bg.
   * Use on consultoría / long landings for visual rhythm.
   */
  atmosphere?: boolean;
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
  atmosphere = false,
  anchored = Boolean(id),
  "aria-labelledby": ariaLabelledby,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "page-section",
        PAGE_SECTION_PADDING_CLASS[padding],
        atmosphere ? atmosphereClass[tone] : toneClass[tone],
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
