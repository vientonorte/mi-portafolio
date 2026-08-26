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

/** Figma 07 · contexto valor (personas + stack). Archivo campañas C2ZgaajABQa3NiFJTnFF45. */
const STORY_IMAGES: Record<string, string> = {
  flujo: "/images/ads/01-1200x627-revision-flujo.png",
  reserva: "/images/ads/02-1200x627-tecnologia-empresas.png",
  stack: "/images/ads/03-1080x1080-cms-crm.png",
  diagnostico: "/images/ads/04-1080x1080-diagnostico.png",
};

/**
 * Hero SEM/FO · Radio de tres nombres.
 * H1 = message-match Ads (“Tecnología para empresas.”).
 * Relato = universo marca Figma 07/08: un flujo · personas · CMS/CRM · diagnóstico.
 * CTA de agenda vive en el hero. Alcance sigue en #modalidades.
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
      origin: "consultoria-hero",
    });
    if (!openCalendarBooking({ origin: "consultoria-hero" })) {
      scrollToSection("contacto");
    }
  };

  const bookFree = () => {
    openFreeRadarEntry(navigate, language, "consultoria-hero");
  };

  return (
    <section
      id="inicio"
      className="funnel-section-enter section-pad-default section-atmosphere section-atmosphere-matte relative overflow-hidden border-b border-border/40 scroll-mt-[calc(var(--header-height)+0.75rem)]"
      aria-labelledby="consultoria-hero-heading"
    >
      <div className="container relative mx-auto max-w-5xl">
        <div className="mx-auto space-y-6 text-center">
          <div className="mx-auto max-w-2xl space-y-6">
            <Badge
              variant="outline"
              className="border-primary/25 font-normal text-foreground"
            >
              {t.badge}
            </Badge>

            <p
              className="font-mono text-xs uppercase text-muted-foreground"
              style={{ letterSpacing: "0.18em" }}
            >
              {t.principleBadge}
            </p>

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

            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t.description}
            </p>
          </div>

          <ul
            className="grid gap-3 text-left sm:grid-cols-2"
            role="list"
            aria-label={t.storyLabel}
            data-testid="hero-story-tiles"
          >
            {t.storyTiles.map((tile) => (
              <li
                key={tile.id}
                className="overflow-hidden rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated/90"
              >
                <img
                  src={STORY_IMAGES[tile.id]}
                  alt={tile.alt}
                  width={1200}
                  height={630}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover object-center"
                  data-testid={`hero-story-img-${tile.id}`}
                />
                <div className="p-4">
                  <p
                    className="font-mono text-[11px] uppercase text-muted-foreground"
                    style={{ letterSpacing: "0.16em" }}
                  >
                    {tile.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold tracking-tight text-foreground">
                    {tile.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {tile.hint}
                  </p>
                </div>
              </li>
            ))}
          </ul>

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
