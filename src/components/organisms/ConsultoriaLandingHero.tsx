import { ArrowRight } from "lucide-react";
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
import { scrollToSection } from "../../lib/scroll-to-section";

interface ConsultoriaLandingHeroProps {
  onStartOnboarding?: (
    packageId?: ConsultingPackageId,
    options?: { c1Goal?: boolean; appGoal?: boolean }
  ) => void;
  onExploreEvidence?: () => void;
}

/**
 * Hero consultoría — mínimo conversion:
 * Empezar · Ver opciones · link free sutil.
 * Sin grilla de 4 ofertas (duplicaba #modalidades).
 */
export function ConsultoriaLandingHero({
  onStartOnboarding,
  onExploreEvidence,
}: ConsultoriaLandingHeroProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.landing;
  const es = language === "es";

  const startPrimary = () => {
    trackEvent("consultoria_hero_cta", { action: "primary_onboarding" });
    onStartOnboarding?.();
  };

  const seeOptions = () => {
    trackEvent("consultoria_hero_cta", { action: "secondary_modalidades" });
    if (onExploreEvidence) {
      onExploreEvidence();
      return;
    }
    scrollToSection("modalidades");
  };

  const freeRadar = () => {
    trackEvent("consultoria_hero_cta", {
      action: "free_radar_entry",
      has_schedule: freeRadarHasSchedule(),
    });
    openFreeRadarEntry(navigate, language, "consultoria-hero", {
      mode: freeRadarHasSchedule() ? "schedule" : "auto",
    });
  };

  return (
    <section
      className="section-pad-default section-atmosphere section-atmosphere-matte relative overflow-hidden border-b border-border/40"
      aria-labelledby="consultoria-hero-heading"
    >
      <div className="container relative mx-auto max-w-2xl">
        <div className="mx-auto space-y-6 text-center">
          <Badge
            variant="outline"
            className="border-primary/25 font-normal text-foreground"
          >
            {t.badge}
          </Badge>

          <h1
            id="consultoria-hero-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.5rem] md:leading-[1.12]"
          >
            {t.title}{" "}
            <span className="text-brand-gradient">{t.titleAccent}</span>
          </h1>

          <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.description}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
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
              onClick={seeOptions}
            >
              {t.ctaSecondary}
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            <button
              type="button"
              onClick={freeRadar}
              className={cn(
                "underline-offset-4 transition-colors hover:text-foreground hover:underline",
                "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                freeRadarHasSchedule() &&
                  "font-medium text-primary underline decoration-primary/40"
              )}
            >
              {freeRadarHasSchedule()
                ? t.ctaFreeLinkSchedule ?? t.ctaFreeLink
                : t.ctaFreeLink}
            </button>
          </p>

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
      </div>
    </section>
  );
}
