import {
  ArrowRight,
  Building2,
  Compass,
  GitBranch,
  Layers,
  Lock,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";
import { cn } from "../../lib/utils";
import type { ConsultingPackageId } from "../../data/vientonorte-consulting";

interface ConsultoriaLandingHeroProps {
  onStartOnboarding?: (
    packageId?: ConsultingPackageId,
    options?: { c1Goal?: boolean }
  ) => void;
  onExploreEvidence?: () => void;
}

const ANCHORS = [
  { id: "metodo-n2n", icon: Workflow, labelKey: "n2n" as const },
  { id: "offline-private", icon: Lock, labelKey: "private" as const },
  { id: "parten-educacion", icon: Building2, labelKey: "education" as const },
  { id: "practicas", icon: ShieldCheck, labelKey: "practices" as const },
  { id: "modalidades", icon: Layers, labelKey: "packages" as const },
  { id: "valor", icon: Compass, labelKey: "evidence" as const },
  { id: "arbol", icon: GitBranch, labelKey: "fit" as const },
] as const;

type SegmentId = "product" | "ops" | "compliance" | "founder";

const SEGMENT_META: {
  id: SegmentId;
  icon: LucideIcon;
  packageId: ConsultingPackageId;
  c1Goal?: boolean;
  scrollTo?: string;
  featured?: boolean;
}[] = [
  { id: "product", icon: Building2, packageId: "marco", featured: true },
  { id: "ops", icon: Layers, packageId: "ops" },
  {
    id: "compliance",
    icon: Lock,
    packageId: "marco",
    c1Goal: true,
    scrollTo: "offline-private",
  },
  { id: "founder", icon: Workflow, packageId: "radar" },
];

export function ConsultoriaLandingHero({
  onStartOnboarding,
  onExploreEvidence,
}: ConsultoriaLandingHeroProps) {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.landing;
  const es = language === "es";
  const prefersReducedMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const startPrimary = () => {
    trackEvent("consultoria_hero_cta", { action: "primary_onboarding" });
    onStartOnboarding?.();
  };

  const evidence = () => {
    trackEvent("consultoria_hero_cta", { action: "secondary_evidence" });
    if (onExploreEvidence) onExploreEvidence();
    else scrollTo("valor");
  };

  const selectSegment = (seg: (typeof SEGMENT_META)[number]) => {
    trackEvent("consultoria_hero_segment", {
      segment: seg.id,
      package_id: seg.packageId,
    });
    if (seg.scrollTo) {
      scrollTo(seg.scrollTo);
      return;
    }
    onStartOnboarding?.(seg.packageId, { c1Goal: seg.c1Goal });
  };

  return (
    <section
      className="relative overflow-hidden border-b border-border/60 bg-surface-matte px-4 py-12 md:py-16"
      aria-labelledby="consultoria-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 45% at 50% -15%, color-mix(in oklab, var(--primary) 10%, transparent), transparent)",
        }}
      />

      <div className="container relative mx-auto max-w-6xl space-y-10 md:space-y-12">
        {/* Capa 0 — promesa + CTA */}
        <div className="mx-auto max-w-3xl text-center space-y-5">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="outline"
              className="border-primary/25 text-foreground font-normal"
            >
              {t.badge}
            </Badge>
            <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
              {t.principleBadge}
            </span>
          </div>

          <h1
            id="consultoria-hero-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.65rem] md:leading-[1.15]"
          >
            {t.title}{" "}
            <span className="text-brand-gradient">{t.titleAccent}</span>
          </h1>

          <p className="text-base text-muted-foreground md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t.description}
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto border-l-2 border-primary/25 pl-3 text-left sm:border-l-0 sm:pl-0 sm:text-center">
            {t.transparencyLine}
          </p>

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center pt-1">
            <Button
              size="lg"
              className="bg-brand-gradient font-semibold hover:opacity-90 min-h-[48px] px-8 focus-visible:ring-offset-2"
              onClick={startPrimary}
            >
              {t.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-[48px] border-[color:var(--logo-surface-border)] bg-surface-matte-elevated/80 font-medium hover:border-primary/25"
              onClick={evidence}
            >
              {t.ctaSecondary}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">{t.trustLine}</p>
        </div>

        {/* Capa 1 — leads segmentados (estilo HeroAudienceCta del sitio) */}
        <div role="group" aria-labelledby="hero-segments-heading">
          <p
            id="hero-segments-heading"
            className="mb-1 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            {t.segmentsLabel}
          </p>
          <p className="mb-4 text-center text-sm text-muted-foreground max-w-lg mx-auto">
            {t.segmentsHint}
          </p>

          <ul
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0"
            role="list"
          >
            {SEGMENT_META.map((seg) => {
              const copy = t.segments[seg.id];
              const Icon = seg.icon;
              const featured = Boolean(seg.featured);

              return (
                <li key={seg.id} className="h-full">
                  <motion.button
                    type="button"
                    onClick={() => selectSegment(seg)}
                    whileHover={
                      prefersReducedMotion ? undefined : { y: featured ? -3 : -2 }
                    }
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                    className={cn(
                      "group relative flex h-full w-full min-h-[7.75rem] flex-col items-start gap-3 rounded-2xl border p-4 text-left",
                      "transition-[border-color,box-shadow,background-color] duration-300",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      featured
                        ? "border-primary/25 bg-featured-matte shadow-md hover:border-primary/40 hover:shadow-lg"
                        : "border-[color:var(--logo-surface-border)] bg-surface-matte-elevated hover:border-primary/20 hover:bg-surface-matte hover:shadow-sm"
                    )}
                  >
                    {featured && (
                      <span
                        className="pointer-events-none absolute inset-y-3 left-0 w-1 rounded-r-full bg-brand-gradient"
                        aria-hidden
                      />
                    )}

                    <span className="flex w-full items-start gap-3">
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                          featured
                            ? "bg-brand-gradient text-white shadow-sm"
                            : "bg-logo-surface text-primary group-hover:bg-primary/10"
                        )}
                        aria-hidden
                      >
                        <Icon className="h-5 w-5" strokeWidth={featured ? 2.25 : 2} />
                      </span>
                      <span className="min-w-0 flex-1 pt-0.5">
                        <span className="block text-sm font-semibold tracking-tight text-foreground">
                          {copy.title}
                        </span>
                        <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                          {copy.hint}
                        </span>
                      </span>
                    </span>

                    <span className="mt-auto flex w-full items-center justify-between gap-2">
                      <span
                        className={cn(
                          "text-xs font-medium",
                          featured ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                        )}
                      >
                        {copy.cta}
                      </span>
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300",
                          "group-hover:translate-x-0.5 group-hover:text-primary"
                        )}
                        aria-hidden
                      />
                    </span>
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Capa 2 — transfer fintech (sutil, no ruidoso) */}
        <div
          className="rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated/90 p-5 md:p-6 shadow-none"
          aria-labelledby="hero-tech-heading"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
            <div className="max-w-xs shrink-0 space-y-1.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {t.techLayerLabel}
              </p>
              <h2
                id="hero-tech-heading"
                className="text-base md:text-lg font-semibold tracking-tight text-foreground"
              >
                {t.techLayerTitle}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.techLayerDescription}
              </p>
            </div>
            <ul
              className="grid flex-1 gap-3 sm:grid-cols-3 list-none p-0 m-0"
              role="list"
            >
              {t.techPatterns.map((item) => (
                <li
                  key={item.source}
                  className="rounded-xl border border-[color:var(--logo-surface-border)] bg-background/60 px-3.5 py-3.5 space-y-1.5 transition-colors hover:border-primary/15"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                    {item.source}
                  </p>
                  <p className="text-sm font-medium tracking-tight text-foreground leading-snug">
                    {item.pattern}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.forYou}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Métricas compactas */}
        <ul
          className="grid grid-cols-2 gap-2.5 md:grid-cols-4 list-none p-0 m-0"
          role="list"
        >
          {t.metrics.map((m) => (
            <li
              key={m.label}
              className="rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated px-3 py-3.5 text-center shadow-none"
            >
              <p className="font-mono text-lg font-bold tracking-tight text-foreground md:text-xl">
                {m.value}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">
                {m.label}
              </p>
            </li>
          ))}
        </ul>

        {/* Nav terciaria — touch ≥ 44px */}
        <nav
          aria-label={es ? "Ir a sección" : "Jump to section"}
          className="border-t border-border/40 pt-6"
        >
          <ul
            className="flex flex-wrap items-center justify-center gap-2"
            role="list"
          >
            {ANCHORS.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(a.id)}
                    className={cn(
                      "inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated/80 px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors",
                      "hover:border-primary/20 hover:text-foreground hover:bg-background",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 text-primary/80" aria-hidden />
                    {t.nav[a.labelKey]}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
