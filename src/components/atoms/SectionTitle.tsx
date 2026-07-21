import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type HeadingLevel = "h1" | "h2" | "h3";

export interface SectionTitleProps {
  children: ReactNode;
  id?: string;
  /** Semantic heading — default h2 (section title). */
  as?: HeadingLevel;
  align?: "left" | "center";
  className?: string;
}

/**
 * Atom: section heading.
 * Uses design-system type scale (Chillax via base `h*`).
 * Do NOT pass Tailwind `text-*` size utilities — they opt out of DS typography.
 */
export function SectionTitle({
  children,
  id,
  as: Tag = "h2",
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "section-title",
        align === "center" ? "section-title--center" : "section-title--left",
        className
      )}
    >
      {children}
    </Tag>
  );
}
