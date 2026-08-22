import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { analytics } from "../../lib/analytics";
import { openFreeRadarEntry } from "../../lib/free-radar-entry";
import { openCalendarBooking } from "../../lib/site-contact";
import { scrollToSection } from "../../lib/scroll-to-section";

/**
 * Hero SEM/FO · Radio de tres nombres.
 * CTA de agenda vive otra vez en el hero (Decider: restaurar capacidad de agendar).
 * Alcance sigue en #modalidades.
 */
export function ConsultoriaLandingHero() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.landing;
  const es = language === "es";

  const bookKickoff = () => {
    analytics.generateLead({
      lead_type: "kickoff",
      channel: "google_calendar",
      origin: "hero",
    });
    if (!openCalendarBooking({ origin: "hero" })) {
      scrollToSection("contacto");
    }
  };

  const bookFree = () => {
    openFreeRadarEntry(navigate, language, "hero");
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
            {t.title}
            {t.titleAccent ? (
              <>
                {" "}
                <span className="text-brand-gradient">{t.titleAccent}</span>
              </>
            ) : null}
          </h1>

          <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {t.description}
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

          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              data-testid="hero-agendar"
              className="min-h-[48px] bg-brand-gradient px-8 font-semibold hover:opacity-90"
              onClick={bookKickoff}
            >
              <Calendar className="h-4 w-4" aria-hidden />
              {t.ctaPrimary}
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-testid="hero-gratis-a11y"
              className="min-h-[48px]"
              onClick={bookFree}
            >
              {t.ctaFreeA11y}
            </Button>
          </div>
          <Button
            variant="link"
            className="min-h-[44px] text-muted-foreground"
            onClick={() => scrollToSection("modalidades")}
          >
            {t.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
