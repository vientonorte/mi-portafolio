import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { SectionBadge } from "../atoms/SectionBadge";
import { SectionTitle } from "../atoms/SectionTitle";
import { cn } from "../../lib/utils";

/**
 * Molecule: section intro (badge + title + description).
 *
 * A11y hierarchy (landing):
 * - page h1 = hero / page name
 * - section titles via this molecule default to **h3** (badge is not a heading)
 * - badge = visual label only (SectionBadge atom), e.g. "Recursos"
 * - title = semantic heading, e.g. "Recursos que demuestran el método"
 *
 * Atomic stack: SectionBadge + SectionTitle; no ad-hoc type utilities.
 */
export interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  description: string;
  align?: "left" | "center";
  titleId?: string;
  /**
   * Semantic level of the title. Default **h3** for a11y under page h1 / major h2.
   * Badge is never a heading.
   */
  titleAs?: "h2" | "h3";
}

export function SectionHeader({
  badge,
  badgeIcon,
  title,
  description,
  align = "center",
  titleId,
  titleAs = "h3",
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const isCenter = align === "center";

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const },
      };

  return (
    <div
      className={cn(
        "section-header section-header-gap relative flex flex-col space-y-3 md:space-y-4",
        isCenter ? "items-center" : "items-start"
      )}
    >
      {badge ? (
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <SectionBadge icon={badgeIcon}>{badge}</SectionBadge>
        </motion.div>
      ) : null}

      <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
        <SectionTitle id={titleId} align={align} as={titleAs}>
          {title}
        </SectionTitle>
      </motion.div>

      {description ? (
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            "section-header__body relative max-w-2xl",
            isCenter ? "section-header__body--center" : "section-header__body--left"
          )}
        >
          <p className="section-header__description">{description}</p>
          <motion.div
            initial={prefersReducedMotion ? undefined : { scaleX: 0 }}
            whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={cn(
              "section-header__rule mt-4 h-1 w-20 rounded-full bg-brand-gradient",
              isCenter && "mx-auto"
            )}
            aria-hidden
          />
        </motion.div>
      ) : null}
    </div>
  );
}
