import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";
import { CompanyLogoFromName } from "./CompanyLogoFromName";
import { resolveCompanyBrand } from "../../lib/company-logos";

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
  const hasLogo = resolveCompanyBrand(company) !== null;

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
        "w-full rounded-xl border p-5 bg-surface-matte-elevated",
        "border-[color:var(--logo-surface-border)]",
        "shadow-none transition-[border-color] duration-300",
        "hover:border-primary/25"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-none tracking-tight text-foreground tabular-nums">
          {metric}
        </span>
        {hasLogo && (
          <CompanyLogoFromName
            company={company}
            size="wordmark-sm"
            flat
          />
        )}
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground leading-snug">
        {description}
      </p>
      <span className="sr-only">{company}</span>
    </motion.div>
  );
}