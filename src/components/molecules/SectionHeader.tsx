import { motion, useReducedMotion } from "motion/react";
import { LucideIcon } from "lucide-react";
import { SectionBadge } from "../atoms/SectionBadge";

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  description: string;
  align?: "left" | "center";
}

export function SectionHeader({ 
  badge, 
  badgeIcon,
  title, 
  description,
  align = "center"
}: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const alignClass = align === "center" ? "text-center" : "text-left";
  const containerClass = align === "center" ? "items-center" : "items-start";

  const fadeUp = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <div className={`flex flex-col ${containerClass} space-y-4 mb-10 md:mb-14 relative`}>
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
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`${alignClass} relative`}
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
