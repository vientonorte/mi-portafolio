import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  ClipboardCheck,
  Mail,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { trackEvent } from "../../lib/analytics";

export type HeroBannerCategory = "negocios" | "contacto" | "auditorias";

export interface HeroBannerMetric {
  value: string;
  label: string;
}

export interface HeroBannerPanelCopy {
  badge: string;
  composerHint: string;
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
  const ActiveIcon = CATEGORY_ICONS[active];

  const selectCategory = (category: HeroBannerCategory) => {
    setActive(category);
    trackEvent("hero_banner_category", { category });
  };

  return (
    <div
      className="w-full overflow-hidden rounded-3xl border border-border/80 bg-card/80 shadow-lg backdrop-blur-sm"
      role="region"
      aria-label={groupLabel}
    >
      <div className="border-b border-border/60 px-4 py-3 sm:px-5">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          id="hero-unified-label"
        >
          {groupLabel}
        </p>
        <div
          className="mt-3 flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/30 px-3.5 py-3 sm:px-4"
          aria-live="polite"
        >
          <ActiveIcon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <p className="min-w-0 flex-1 text-sm text-muted-foreground sm:text-base">
            <span className="font-medium text-foreground">{tabs[active]}</span>
            <span aria-hidden="true"> · </span>
            <span>{panel.composerHint}</span>
          </p>
        </div>
      </div>

      <div className="px-4 py-3 sm:px-5">
        <div
          className="flex flex-wrap gap-2"
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
                  "inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "border-primary/35 bg-primary/10 text-foreground shadow-sm"
                    : "border-border/80 bg-background/70 text-muted-foreground hover:border-primary/25 hover:bg-surface-matte hover:text-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {tabs[category]}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id={`hero-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`hero-tab-${active}`}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 border-t border-border/60 px-4 py-4 sm:px-5 sm:py-5"
        >
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <div className="min-w-0 space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {panel.badge}
              </p>
              <p className="text-sm leading-relaxed text-foreground sm:text-[15px]">
                {panel.description}
              </p>
              {panel.lead && (
                <p className="text-sm leading-relaxed text-muted-foreground">{panel.lead}</p>
              )}
            </div>
          </div>

          {panel.highlights.length > 0 && (
            <ul className="flex flex-wrap gap-2 pl-9 sm:pl-9" role="list">
              {panel.highlights.map((item) => (
                <li key={item}>
                  <span className="inline-flex rounded-full border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {panel.privacyNote && (
            <p className="rounded-xl border border-border/70 bg-muted/30 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
              {panel.privacyNote}
            </p>
          )}

          <div className="flex flex-wrap gap-2.5 pt-1">
            <Button
              size="default"
              className="rounded-full bg-brand-gradient font-semibold hover:opacity-90"
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
              className="rounded-full"
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
  );
}