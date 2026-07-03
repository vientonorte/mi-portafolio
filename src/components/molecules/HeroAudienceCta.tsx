import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export interface HeroAudienceOption {
  id: string;
  icon: LucideIcon;
  title: string;
  hint: string;
  badge?: string;
  featured?: boolean;
  onClick: () => void;
}

interface HeroAudienceCtaProps {
  label: string;
  options: HeroAudienceOption[];
}

function AudienceCard({
  icon: Icon,
  title,
  hint,
  badge,
  featured = false,
  onClick,
}: Omit<HeroAudienceOption, "id">) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={prefersReducedMotion ? undefined : { y: featured ? -3 : -2 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
      className={cn(
        "group relative flex w-full min-h-[4.75rem] items-center gap-4 rounded-2xl border p-4 text-left transition-[border-color,box-shadow,background-color] duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        featured
          ? "border-primary/25 bg-featured-matte shadow-md hover:border-primary/40 hover:shadow-lg"
          : "border-[color:var(--logo-surface-border)] bg-surface-matte-elevated hover:border-primary/20 hover:bg-surface-matte hover:shadow-sm"
      )}
    >
      {featured && (
        <span
          className="pointer-events-none absolute inset-y-3 left-0 w-1 rounded-r-full bg-brand-gradient"
          aria-hidden="true"
        />
      )}

      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
          featured
            ? "bg-brand-gradient text-white shadow-sm"
            : "bg-logo-surface text-primary group-hover:bg-primary/10"
        )}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={featured ? 2.25 : 2} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "font-semibold tracking-tight text-foreground",
              featured ? "text-base" : "text-sm"
            )}
          >
            {title}
          </span>
          {badge && (
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{hint}</span>
      </span>

      <ArrowRight
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300",
          "group-hover:translate-x-0.5 group-hover:text-primary",
          featured && "group-hover:text-primary"
        )}
        aria-hidden="true"
      />
    </motion.button>
  );
}

export function HeroAudienceCta({ label, options }: HeroAudienceCtaProps) {
  const featured = options.find((option) => option.featured);
  const secondary = options.filter((option) => !option.featured);

  return (
    <div role="group" aria-label={label}>
      <p
        className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        id="hero-audience-label"
      >
        {label}
      </p>

      <div className="flex flex-col gap-2.5" aria-labelledby="hero-audience-label">
        {featured && (
          <AudienceCard
            icon={featured.icon}
            title={featured.title}
            hint={featured.hint}
            badge={featured.badge}
            featured
            onClick={featured.onClick}
          />
        )}

        {secondary.length > 0 && (
          <ul className="grid gap-2.5 sm:grid-cols-2" role="list">
            {secondary.map((option) => (
              <li key={option.id}>
                <AudienceCard
                  icon={option.icon}
                  title={option.title}
                  hint={option.hint}
                  badge={option.badge}
                  onClick={option.onClick}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}