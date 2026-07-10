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
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";
import { cn } from "../../lib/utils";
import type { ConsultingPackageId } from "../../data/vientonorte-consulting";

interface ConsultoriaLandingHeroProps {
  onStartOnboarding?: (packageId?: ConsultingPackageId, options?: { c1Goal?: boolean }) => void;
  onExploreEvidence?: () => void;
}

/** Capas de navegación — secundarias, no compiten con CTA primario */
const ANCHORS = [
  { id: "metodo-n2n", icon: Workflow, labelKey: "n2n" as const },
  { id: "offline-private", icon: Lock, labelKey: "private" as const },
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
}[] = [
  { id: "product", icon: Building2, packageId: "marco" },
  { id: "ops", icon: Layers, packageId: "ops" },
  { id: "compliance", icon: Lock, packageId: "marco", c1Goal: true, scrollTo: "offline-private" },
  { id: "founder", icon: Workflow, packageId: "radar" },
];

export function ConsultoriaLandingHero({
  onStartOnboarding,
  onExploreEvidence,
}: ConsultoriaLandingHeroProps) {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.landing;
  const es = language === "es";

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
    trackEvent("consultoria_hero_segment", { segment: seg.id, package_id: seg.packageId });
    if (seg.scrollTo) {
      // Capa 2 path: mostrar valor offline antes del onboarding
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
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklab, var(--primary) 12%, transparent), transparent)",
        }}
      />

      <div className="container relative mx-auto max-w-6xl space-y-10 md:space-y-12">
        {/* ── Capa 0: promesa + CTA (benchmark: 1 primario dominante) ── */}
        <div className="mx-auto max-w-3xl text-center space-y-5">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="outline" className="border-primary/25 text-foreground">
              {t.badge}
            </Badge>
            <Badge
              variant="secondary"
              className="font-normal text-muted-foreground bg-surface-matte-elevated border border-[color:var(--logo-surface-border)]"
            >
              {t.principleBadge}
            </Badge>
          </div>

          <h1
            id="consultoria-hero-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.15]"
          >
            {t.title}{" "}
            <span className="text-brand-gradient">{t.titleAccent}</span>
          </h1>

          <p className="text-base text-muted-foreground md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t.description}
          </p>

          <p className="text-sm text-foreground/80 leading-snug max-w-xl mx-auto border-l-2 border-primary/30 pl-3 text-left sm:text-center sm:border-l-0 sm:pl-0">
            {t.transparencyLine}
          </p>

          {/* CTA: primary solid + secondary outline only — no third button */}
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center pt-1">
            <Button
              size="lg"
              className="bg-brand-gradient font-semibold hover:opacity-90 min-h-[48px] px-8 text-base shadow-md"
              onClick={startPrimary}
            >
              {t.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-[48px] border-border/80 font-medium"
              onClick={evidence}
            >
              {t.ctaSecondary}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">{t.trustLine}</p>
        </div>

        {/* ── Capa 1: leads segmentados (UX writing / baja fricción) ── */}
        <div className="space-y-3" aria-labelledby="hero-segments-heading">
          <div className="text-center space-y-1">
            <p
              id="hero-segments-heading"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
            >
              {t.segmentsLabel}
            </p>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              {t.segmentsHint}
            </p>
          </div>
          <ul
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0"
            role="list"
          >
            {SEGMENT_META.map((seg) => {
              const copy = t.segments[seg.id];
              const Icon = seg.icon;
              return (
                <li key={seg.id}>
                  <button
                    type="button"
                    onClick={() => selectSegment(seg)}
                    className={cn(
                      "group flex h-full w-full flex-col gap-2 rounded-xl border p-4 text-left transition-colors min-h-[7.5rem]",
                      "border-[color:var(--logo-surface-border)] bg-surface-matte-elevated",
                      "hover:border-primary/30 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="text-sm font-semibold text-foreground leading-snug">
                        {copy.title}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground leading-relaxed flex-1">
                      {copy.hint}
                    </span>
                    <span className="text-[11px] font-medium text-primary inline-flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      {copy.cta}
                      <ArrowRight className="h-3 w-3" aria-hidden />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Capa 2: carga cognitiva controlada — tech transfer fintech ── */}
        <div
          className="rounded-2xl border border-[color:var(--logo-surface-border)] bg-background/70 p-5 md:p-6"
          aria-labelledby="hero-tech-heading"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
            <div className="max-w-sm space-y-1.5 shrink-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {t.techLayerLabel}
              </p>
              <h2
                id="hero-tech-heading"
                className="text-base md:text-lg font-semibold tracking-tight text-foreground"
              >
                {t.techLayerTitle}
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
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
                  className="rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated px-3.5 py-3 space-y-1.5"
                >
                  <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
                    {item.source}
                  </p>
                  <p className="text-sm font-medium text-foreground leading-snug">
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

        {/* Trust metrics — compact strip (4 → proof, not noise) */}
        <ul
          className="grid grid-cols-2 gap-2 md:grid-cols-4 list-none p-0 m-0"
          role="list"
        >
          {t.metrics.map((m) => (
            <li
              key={m.label}
              className="rounded-lg border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated/80 px-3 py-3 text-center"
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

        {/* Nav de secciones — terciaria, chips pequeños */}
        <nav
          aria-label={es ? "Ir a sección" : "Jump to section"}
          className="border-t border-border/50 pt-6"
        >
          <ul
            className="flex flex-wrap items-center justify-center gap-1.5"
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
                      "inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors",
                      "hover:border-border hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    )}
                  >
                    <Icon className="h-3 w-3 text-primary/80" aria-hidden />
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
