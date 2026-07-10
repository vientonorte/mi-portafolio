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

/** stack = vertical (grid); horizontal = media + copy en fila en md+ (llena ancho). */
export type ValueProofCardLayout = "stack" | "horizontal";

export interface ValueProofCardProps {
  kindLabel: string;
  kind: keyof typeof KIND_STYLES;
  title: string;
  outcome: string;
  metric?: string;
  image: string;
  viewLabel: string;
  index?: number;
  onView: () => void;
  /**
   * horizontal: móvil apilado; md+ fila completa (buena práctica de relleno de viewport).
   * stack: tarjeta de grid vertical.
   */
  layout?: ValueProofCardLayout;
}

export function ValueProofCard({
  kindLabel,
  kind,
  title,
  outcome,
  metric,
  image,
  viewLabel,
  index = 0,
  onView,
  layout = "stack",
}: ValueProofCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isHorizontal = layout === "horizontal";

  return (
    <motion.article
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      data-layout={layout}
      className={cn(
        "group flex h-full overflow-hidden rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none transition-[border-color,box-shadow] duration-300 hover:border-primary/25 hover:shadow-md",
        isHorizontal ? "flex-col md:flex-row md:items-stretch" : "flex-col"
      )}
    >
      <button
        type="button"
        onClick={onView}
        className={cn(
          "relative block overflow-hidden bg-[#0a0a0a] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
          isHorizontal
            ? "w-full md:w-[min(52%,36rem)] md:min-h-[14rem] md:shrink-0 md:self-stretch"
            : "w-full"
        )}
      >
        <ResponsiveImage
          src={image}
          alt={title}
          fit="cover"
          aspectRatio={isHorizontal ? undefined : "16 / 10"}
          sizes={
            isHorizontal
              ? "(max-width: 767px) 100vw, (max-width: 1280px) 50vw, 36rem"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className={cn(
            "w-full",
            isHorizontal && "aspect-[16/10] md:absolute md:inset-0 md:aspect-auto md:h-full"
          )}
          imgClassName="transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none h-full w-full"
        />
        {metric && (
          <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-border/80 bg-background/90 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-foreground shadow-sm">
            {metric}
          </span>
        )}
      </button>

      <div
        className={cn(
          "flex flex-1 flex-col gap-4",
          isHorizontal ? "p-5 md:justify-center md:p-6 lg:p-8" : "p-5"
        )}
      >
        <div className={cn("space-y-2", isHorizontal && "md:max-w-xl")}>
          <Badge
            variant="outline"
            className={cn("font-medium", KIND_STYLES[kind])}
          >
            {kindLabel}
          </Badge>
          <h3
            className={cn(
              "font-semibold leading-snug tracking-tight text-foreground",
              isHorizontal ? "text-lg md:text-xl lg:text-2xl" : "text-lg"
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "leading-relaxed text-muted-foreground",
              isHorizontal ? "text-sm md:text-base" : "text-sm"
            )}
          >
            {outcome}
          </p>
        </div>

        <div className={cn("mt-auto", isHorizontal && "md:mt-4")}>
          <Button
            size={isHorizontal ? "lg" : "sm"}
            className={cn(
              "bg-brand-gradient font-semibold hover:opacity-90",
              isHorizontal ? "w-full sm:w-auto min-h-[44px] px-6" : "w-full"
            )}
            onClick={onView}
          >
            {viewLabel}
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}