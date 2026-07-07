import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ResponsiveImage } from "../atoms/ResponsiveImage";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
const KIND_STYLES = {
  prototype: "border-primary/20 bg-primary/5 text-primary",
  poc: "border-stat-tint-violet-fg/30 bg-stat-tint-violet text-stat-tint-violet-fg",
  audit: "border-stat-tint-blue-fg/30 bg-stat-tint-blue text-stat-tint-blue-fg",
  case: "border-stat-tint-amber-fg/30 bg-stat-tint-amber text-stat-tint-amber-fg",
} as const;

export interface ValueProofCardProps {
  kindLabel: string;
  kind: keyof typeof KIND_STYLES;
  title: string;
  outcome: string;
  metric?: string;
  image: string;
  bundleLabel: string;
  viewLabel: string;
  index?: number;
  onView: () => void;
  onBundle: () => void;
}

export function ValueProofCard({
  kindLabel,
  kind,
  title,
  outcome,
  metric,
  image,
  bundleLabel,
  viewLabel,
  index = 0,
  onView,
  onBundle,
}: ValueProofCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none transition-[border-color,box-shadow] duration-300 hover:border-primary/25 hover:shadow-md"
    >
      <button
        type="button"
        onClick={onView}
        className="relative block w-full overflow-hidden bg-[#0a0a0a] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      >
        <ResponsiveImage
          src={image}
          alt={title}
          fit="cover"
          aspectRatio="16 / 10"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full"
          imgClassName="transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
        />
        {metric && (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-border/80 bg-background/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-foreground shadow-sm">
            {metric}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <Badge
            variant="outline"
            className={cn("font-medium", KIND_STYLES[kind])}
          >
            {kindLabel}
          </Badge>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{outcome}</p>
        </div>

        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <Button
            size="sm"
            className="w-full bg-brand-gradient font-semibold hover:opacity-90 sm:flex-1"
            onClick={onView}
          >
            {viewLabel}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={onBundle}
          >
            {bundleLabel}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}