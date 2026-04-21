import { motion, useReducedMotion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface SectionBadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function SectionBadge({ icon: Icon, children }: SectionBadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.9 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary/20 bg-card backdrop-blur-sm group cursor-default"
    >
      {Icon && (
        <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
      )}
      
      <span className="text-sm font-medium text-primary">
        {children}
      </span>
    </motion.div>
  );
}
