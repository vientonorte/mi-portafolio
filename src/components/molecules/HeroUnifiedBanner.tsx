import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  ClipboardCheck,
  Mail,
  Shield,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import { trackEvent } from "../../lib/analytics";

export type HeroBannerCategory = "negocios" | "contacto" | "auditorias";

export interface HeroBannerMetric {
  value: string;
  label: string;
}

export interface HeroBannerPanelCopy {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  lead?: string;
  highlights: string[];
  privacyNote?: string;
  metrics: HeroBannerMetric[];
  ctaPrimary: string;
  ctaSecondary: string;
}

interface HeroUnifiedBannerProps {
  groupLabel: string;
  tabs: Record<HeroBannerCategory, string>;
  panels: Record<HeroBannerCategory, HeroBannerPanelCopy>;
  onPrimaryAction: (category: HeroBannerCategory) => void;
  onSecondaryAction: (category: HeroBannerCategory) => void;
}

const CATEGORY_ORDER: HeroBannerCategory[] = ["negocios", "contacto", "auditorias"];

const CATEGORY_ICONS: Record<HeroBannerCategory, LucideIcon> = {
  negocios: Briefcase,
  contacto: Mail,
  auditorias: ClipboardCheck,
};

export function HeroUnifiedBanner({
  groupLabel,
  tabs,
  panels,
  onPrimaryAction,
  onSecondaryAction,
}: HeroUnifiedBannerProps) {
  const [active, setActive] = useState<HeroBannerCategory>("negocios");
  const prefersReducedMotion = useReducedMotion();
  const panel = panels[active];

  const selectCategory = (category: HeroBannerCategory) => {
    setActive(category);
    trackEvent("hero_banner_category", { category });
  };

  return (
    <div
      className="w-full rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-md"
      role="region"
      aria-label={groupLabel}
    >
      <div className="h-1 bg-brand-gradient rounded-t-2xl" aria-hidden="true" />

      <div className="p-4 sm:p-5 md:p-6">
        <p
          className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          id="hero-unified-label"
        >
          {groupLabel}
        </p>

        <div
          className="mb-5 flex flex-wrap gap-2"
          role="tablist"
          aria-labelledby="hero-unified-label"
        >
          {CATEGORY_ORDER.map((category) => {
            const Icon = CATEGORY_ICONS[category];
            const isActive = active === category;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                id={`hero-tab-${category}`}
                aria-selected={isActive}
                aria-controls={`hero-panel-${category}`}
                onClick={() => selectCategory(category)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-primary/30 bg-primary/10 text-foreground shadow-sm"
                    : "border-border bg-background/60 text-muted-foreground hover:border-primary/20 hover:bg-surface-matte hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {tabs[category]}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`hero-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`hero-tab-${active}`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <Badge
              variant="outline"
              className="border-primary/25 bg-background/80 text-foreground"
            >
              <Sparkles className="mr-1.5 h-3 w-3 text-primary" aria-hidden="true" />
              {panel.badge}
            </Badge>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {panel.title}{" "}
                <span className="text-brand-gradient">{panel.titleAccent}</span>
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {panel.description}
              </p>
              {panel.lead && (
                <p className="text-sm leading-relaxed text-muted-foreground/90">{panel.lead}</p>
              )}
            </div>

            <ul className="flex flex-wrap gap-2" role="list">
              {panel.highlights.map((item) => (
                <li key={item}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground">
                    <Shield className="h-3 w-3 text-primary" aria-hidden="true" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {panel.metrics.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {panel.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-border bg-background/70 px-3 py-2.5 text-center"
                  >
                    <p className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                      {metric.value}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground sm:text-xs">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {panel.privacyNote && (
              <p className="rounded-lg border border-border/80 bg-muted/40 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                {panel.privacyNote}
              </p>
            )}

            <div className="flex flex-wrap gap-2.5 pt-1">
              <Button
                size="default"
                className="bg-brand-gradient font-semibold hover:opacity-90"
                onClick={() => {
                  trackEvent("hero_banner_cta", { category: active, action: "primary" });
                  onPrimaryAction(active);
                }}
              >
                {panel.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                size="default"
                variant="outline"
                onClick={() => {
                  trackEvent("hero_banner_cta", { category: active, action: "secondary" });
                  onSecondaryAction(active);
                }}
              >
                {panel.ctaSecondary}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}