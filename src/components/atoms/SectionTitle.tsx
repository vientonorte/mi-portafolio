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
 *
 * Default **h3** for a11y (page h1 → sections as h3 when badge is non-heading).
 * Visual scale stays “section title” via `.section-title` (Chillax clamp), not Tailwind text-*.
 */
export function SectionTitle({
  children,
  id,
  as: Tag = "h3",
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
