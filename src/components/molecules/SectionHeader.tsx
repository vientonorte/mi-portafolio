import { motion, useReducedMotion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { SectionBadge } from "../atoms/SectionBadge";

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  description: string;
  align?: "left" | "center";
  titleId?: string;
}

export function SectionHeader({ 
  badge, 
  badgeIcon,
  title, 
  description,
  align = "center",
  titleId,
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const alignClass = align === "center" ? "text-center" : "text-left";
  const containerClass = align === "center" ? "items-center" : "items-start";

  const fadeUp = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <div
      className={`section-header-gap relative flex flex-col ${containerClass} space-y-3 md:space-y-4`}
    >
      {badge && (
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
        >
          <SectionBadge icon={badgeIcon}>
            {badge}
          </SectionBadge>
        </motion.div>
      )}
      
      <motion.h2
        id={titleId}
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`${alignClass} relative text-3xl md:text-4xl font-semibold tracking-tight text-foreground`}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-muted-foreground text-base md:text-lg max-w-2xl ${alignClass} relative`}
        >
          <p>{description}</p>
          
          {/* Decorative underline */}
          <motion.div
            initial={prefersReducedMotion ? undefined : { scaleX: 0 }}
            whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`mt-4 h-1 bg-brand-gradient rounded-full ${
              align === "center" ? "mx-auto" : ""
            } w-20`}
          />
        </motion.div>
      )}
    </div>
  );
}
