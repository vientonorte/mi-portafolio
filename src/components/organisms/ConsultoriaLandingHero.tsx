import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";
import { openCalendarBooking } from "../../lib/site-contact";
import { scrollToSection } from "../../lib/scroll-to-section";

interface ConsultoriaLandingHeroProps {
  onExploreEvidence?: () => void;
}

/**
 * Hero FO: un solo CTA = Google Calendar.
 * Alcance y mail viven más abajo; método/casos en páginas interiores.
 */
export function ConsultoriaLandingHero({
  onExploreEvidence,
}: ConsultoriaLandingHeroProps) {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.landing;
  const es = language === "es";

  const bookCalendar = () => {
    trackEvent("consultoria_hero_cta", { action: "calendar_booking" });
    if (!openCalendarBooking()) {
      scrollToSection("contacto");
    }
  };

  const seeOptions = () => {
    trackEvent("consultoria_hero_cta", { action: "secondary_modalidades" });
    if (onExploreEvidence) {
      onExploreEvidence();
      return;
    }
    scrollToSection("modalidades");
  };

  return (
    <section
      id="inicio"
      className="funnel-section-enter section-pad-default section-atmosphere section-atmosphere-matte relative overflow-hidden border-b border-border/40 scroll-mt-[calc(var(--header-height)+0.75rem)]"
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

          <div className="flex flex-col items-center justify-center gap-3">
            <Button
              size="lg"
              className="funnel-cta-primary min-h-[48px] bg-brand-gradient px-8 font-semibold hover:opacity-90 focus-visible:ring-offset-2"
              onClick={bookCalendar}
            >
              {t.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <button
              type="button"
              onClick={seeOptions}
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
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
      </div>
    </section>
  );
}
