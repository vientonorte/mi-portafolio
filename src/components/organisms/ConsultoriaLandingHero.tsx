import {
  ArrowRight,
  ClipboardList,
  LayoutTemplate,
  Smartphone,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";
import {
  freeRadarHasSchedule,
  openFreeRadarEntry,
} from "../../lib/free-radar-entry";
import { cn } from "../../lib/utils";
import type { ConsultingPackageId } from "../../data/vientonorte-consulting";
import {
  HERO_ROLES,
  type HeroRoleId,
} from "../../data/consultoria-hero-roles";
import { scrollToSection } from "../../lib/scroll-to-section";

interface ConsultoriaLandingHeroProps {
  onStartOnboarding?: (
    packageId?: ConsultingPackageId,
    options?: { c1Goal?: boolean; appGoal?: boolean }
  ) => void;
  onExploreEvidence?: () => void;
}

const OFFER_ICONS: Record<HeroRoleId, LucideIcon> = {
  diagnostic: ClipboardList,
  prototype: LayoutTemplate,
  process: Users,
  app: Smartphone,
};

/**
 * Hero consultoría — oferta explícita (servicio + qué te llevas):
 * 1 promesa + 4 CTAs de producto/servicio (no “quién eres”)
 * App funcional = diseño VN + build con red (externalizado).
 */
export function ConsultoriaLandingHero({
  onStartOnboarding,
  onExploreEvidence,
}: ConsultoriaLandingHeroProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.landing;
  const es = language === "es";
  const prefersReducedMotion = useReducedMotion();

  const startPrimary = () => {
    trackEvent("consultoria_hero_cta", { action: "primary_onboarding" });
    onStartOnboarding?.();
  };

  const secondary = () => {
    trackEvent("consultoria_hero_cta", { action: "secondary_modalidades" });
    if (onExploreEvidence) {
      onExploreEvidence();
      return;
    }
    scrollToSection("modalidades");
  };

  /** SEM lead magnet: free Radar a11y → Google Calendar o contacto (NO /auditoria mentoría) */
  const freeRadar = () => {
    trackEvent("consultoria_hero_cta", {
      action: "free_radar_entry",
      has_schedule: freeRadarHasSchedule(),
    });
    openFreeRadarEntry(navigate, language, "consultoria-hero", {
      mode: freeRadarHasSchedule() ? "schedule" : "auto",
    });
  };

  const selectOffer = (roleId: HeroRoleId) => {
    const role = HERO_ROLES.find((r) => r.id === roleId);
    if (!role) return;
    trackEvent("consultoria_hero_offer", {
      offer: role.id,
      package_id: role.packageId,
      app: Boolean(role.appGoal),
    });
    onStartOnboarding?.(role.packageId, {
      c1Goal: role.c1Goal,
      appGoal: role.appGoal,
    });
  };

  return (
    <section
      className="section-pad-default section-atmosphere section-atmosphere-matte relative overflow-hidden border-b border-border/40"
      aria-labelledby="consultoria-hero-heading"
    >

      <div className="container relative mx-auto max-w-3xl">
        <div className="mx-auto space-y-6 text-center">
          <Badge
            variant="outline"
            className="border-primary/25 font-normal text-foreground"
          >
            {t.badge}
          </Badge>

          <h1
            id="consultoria-hero-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
          >
            {t.title}{" "}
            <span className="text-brand-gradient">{t.titleAccent}</span>
          </h1>

          <p className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.description}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button
              size="lg"
              className="min-h-[48px] bg-brand-gradient px-8 font-semibold hover:opacity-90 focus-visible:ring-offset-2"
              onClick={startPrimary}
            >
              {t.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-[48px] border-primary/30 bg-background/80 font-semibold hover:border-primary/50"
              onClick={freeRadar}
            >
              {t.ctaFree}
            </Button>
            <button
              type="button"
              onClick={secondary}
              className={cn(
                "inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-muted-foreground",
                "underline-offset-4 transition-colors hover:text-foreground hover:underline",
                "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              )}
            >
              {t.ctaSecondary}
            </button>
          </div>

          <ul
            className="flex flex-wrap items-center justify-center gap-2"
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

        {/* Oferta: servicio/producto — no roles de persona */}
        <div
          className="mt-12 border-t border-border/40 pt-10 md:mt-14 md:pt-12"
          role="group"
          aria-labelledby="hero-offers-heading"
        >
          <p
            id="hero-offers-heading"
            className="mb-2 text-center text-sm font-medium text-foreground"
          >
            {t.segmentsLabel}
          </p>
          {t.segmentsHint ? (
            <p className="mb-5 text-center text-xs text-muted-foreground">
              {t.segmentsHint}
            </p>
          ) : null}

          <ul
            className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2"
            role="list"
          >
            {HERO_ROLES.map((role) => {
              const Icon = OFFER_ICONS[role.id];
              const copy = t.segments[role.id as keyof typeof t.segments];
              const title = copy?.title ?? role.title[language];
              const hint = copy?.hint ?? role.hint[language];

              return (
                <li key={role.id} className="min-w-0">
                  <motion.button
                    type="button"
                    onClick={() => selectOffer(role.id)}
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -1 }
                    }
                    whileTap={
                      prefersReducedMotion ? undefined : { scale: 0.99 }
                    }
                    className={cn(
                      "group flex w-full min-h-[48px] items-center gap-3 rounded-xl border border-[color:var(--logo-surface-border)]",
                      "bg-surface-matte-elevated px-4 py-3.5 text-left",
                      /* DS motion: --duration-fast / --ease-out */
                      "transition-[border-color,background-color,transform] duration-[var(--duration-fast)] ease-[var(--ease-out)] motion-reduce:transition-none",
                      "hover:border-primary/25 hover:bg-background/40",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      role.appGoal && "border-primary/20"
                    )}
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-logo-surface text-primary group-hover:bg-primary/10"
                      aria-hidden
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold tracking-tight text-foreground">
                        {title}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {hint}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-[transform,color] duration-[var(--duration-fast)] ease-[var(--ease-out)] motion-reduce:transition-none group-hover:translate-x-0.5 group-hover:text-primary motion-reduce:group-hover:translate-x-0"
                      aria-hidden
                    />
                  </motion.button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
