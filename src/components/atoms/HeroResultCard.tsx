import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

export interface HeroResultCardProps {
  metric: string;
  description: string;
  company: string;
  index?: number;
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function HeroResultCard({
  metric,
  description,
  company,
  index = 0,
}: HeroResultCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      role="listitem"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay: 0.25 + index * 0.1 }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { y: -2, transition: { duration: 0.2 } }
      }
      className={cn(
        "w-full rounded-xl border border-border/50 bg-card/60 p-5 backdrop-blur-sm",
        "shadow-sm transition-[border-color,box-shadow] duration-300",
        "hover:border-primary/30 hover:shadow-md"
      )}
    >
      <span className="block font-mono text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-none tracking-tight text-foreground tabular-nums">
        {metric}
      </span>
      <span className="mt-1.5 block text-sm text-muted-foreground">
        {description}
      </span>
      <span className="mt-1 block font-mono text-xs uppercase tracking-widest text-muted-foreground/80">
        {company}
      </span>
    </motion.div>
  );
}