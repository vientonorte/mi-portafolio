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

/** Jump nav — átomos; el resto del detalle vive más abajo (progressive disclosure). */
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
  featured?: boolean;
}[] = [
  { id: "product", icon: Building2, packageId: "marco", featured: true },
  { id: "ops", icon: Layers, packageId: "ops" },
  { id: "compliance", icon: Lock, packageId: "marco", c1Goal: true },
  { id: "founder", icon: Workflow, packageId: "radar" },
];

/**
 * Hero consultoría — título protagonista + átomos (chips, métricas, path).
 * Menos párrafos y menos “paso 1 / paso 2” para bajar carga cognitiva.
 * Capas profundas (N2N, C1, patrones) viven en secciones posteriores.
 */
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

      <div className="container relative mx-auto max-w-5xl space-y-9 md:space-y-11">
        {/* ── Organismo: promesa ── */}
        <div className="mx-auto max-w-2xl space-y-5 text-center">
          <Badge
            variant="outline"
            className="border-primary/25 font-normal text-foreground"
          >
            {t.badge}
          </Badge>

          <h1
            id="consultoria-hero-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.65rem] md:leading-[1.12]"
          >
            {t.title}{" "}
            <span className="text-brand-gradient">{t.titleAccent}</span>
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.description}
          </p>

          {/* Molécula: 1 CTA primario + 1 acción terciaria (sin dos botones iguales) */}
          <div className="flex flex-col items-center justify-center gap-3 pt-1 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              className="min-h-[48px] bg-brand-gradient px-8 font-semibold hover:opacity-90 focus-visible:ring-offset-2"
              onClick={startPrimary}
            >
              {t.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <button
              type="button"
              onClick={evidence}
              className={cn(
                "inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-muted-foreground",
                "underline-offset-4 transition-colors hover:text-foreground hover:underline",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
              )}
            >
              {t.ctaSecondary}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>

          {/* Átomos: trust chips (en vez de párrafo largo) */}
          <ul
            className="flex flex-wrap items-center justify-center gap-2 pt-1"
            role="list"
            aria-label={es ? "Compromisos" : "Commitments"}
          >
            {t.trustChips.map((chip) => (
              <li key={chip}>
                <span className="inline-flex min-h-[32px] items-center rounded-full border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated/90 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {chip}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Moléculas: camino (4 path cards — solo icono + título + hint) ── */}
        <div role="group" aria-labelledby="hero-segments-heading">
          <p
            id="hero-segments-heading"
            className="mb-3 text-center text-sm text-muted-foreground"
          >
            {t.segmentsLabel}
          </p>

          <ul
            className="m-0 grid list-none grid-cols-1 gap-2.5 p-0 sm:grid-cols-2 lg:grid-cols-4"
            role="list"
          >
            {SEGMENT_META.map((seg) => {
              const copy = t.segments[seg.id];
              const Icon = seg.icon;
              const featured = Boolean(seg.featured);

              return (
                <li key={seg.id} className="min-w-0">
                  <motion.button
                    type="button"
                    onClick={() => selectSegment(seg)}
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -2 }
                    }
                    whileTap={
                      prefersReducedMotion ? undefined : { scale: 0.99 }
                    }
                    className={cn(
                      "group flex w-full min-h-[44px] items-center gap-3 rounded-xl border px-3.5 py-3 text-left",
                      "transition-[border-color,background-color,box-shadow] duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      featured
                        ? "border-primary/25 bg-featured-matte shadow-sm hover:border-primary/40"
                        : "border-[color:var(--logo-surface-border)] bg-surface-matte-elevated hover:border-primary/20"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                        featured
                          ? "bg-brand-gradient text-white"
                          : "bg-logo-surface text-primary group-hover:bg-primary/10"
                      )}
                      aria-hidden
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold tracking-tight text-foreground">
                        {copy.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {copy.hint}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Átomos: métricas de prueba ── */}
        <ul
          className="m-0 grid list-none grid-cols-2 gap-2 md:grid-cols-4 p-0"
          role="list"
        >
          {t.metrics.map((m) => (
            <li
              key={m.label}
              className="rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated px-3 py-3 text-center"
            >
              <p className="font-mono text-lg font-bold tracking-tight text-foreground md:text-xl">
                {m.value}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
                {m.label}
              </p>
            </li>
          ))}
        </ul>

        {/* ── Átomos: saltos a secciones (detalle fuera del hero) ── */}
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
                      "hover:border-primary/20 hover:bg-background hover:text-foreground",
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
