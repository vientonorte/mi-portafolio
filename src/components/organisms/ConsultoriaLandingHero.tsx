import { Calendar, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { DeviceMockup } from "../molecules/DeviceMockup";
import { ROUTES } from "../../lib/routes";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { analytics, trackEvent } from "../../lib/analytics";
import { openFreeRadarEntry } from "../../lib/free-radar-entry";
import { openCalendarBooking } from "../../lib/site-contact";
import { scrollToSection } from "../../lib/scroll-to-section";
import { getPortfolioImages, resolveImageUrl } from "../../lib/image-overrides";
import { useImageManifestVersion } from "../../lib/image-manifest-context";

const HERO_SLOT = "branding.heroConsultoria";

/**
 * Hero FO/SEM v3 — mockup X|CMS (producto estrella).
 * Demo: /#/demo/x-cms · eventos dataLayer demo_x_cms_* (GTM CE: no).
 */
export function ConsultoriaLandingHero() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.landing;
  useImageManifestVersion();
  const images = getPortfolioImages();
  const mediaSrc = resolveImageUrl(HERO_SLOT, images.consultoria.heroOps);
  const mediaAlt =
    t.storyTiles.find((tile) => tile.id === "stack")?.alt ??
    "X|CMS — dashboard de operaciones en el CMS del cliente";
  const descId = "consultoria-hero-desc";

  const bookKickoff = () => {
    analytics.generateLead({
      lead_type: "kickoff",
      channel: "google_calendar",
      origin: "consultoria-hero",
      package_id: "marco",
    });
    if (!openCalendarBooking({ origin: "consultoria-hero" })) {
      scrollToSection("contacto");
    }
  };

  const bookFree = () => {
    openFreeRadarEntry(navigate, language, "consultoria-hero");
  };

  const openXcmsDemo = () => {
    trackEvent("hero_x_cms_open", {
      category: "engagement",
      surface: "consultoria-hero",
      product: "x-cms",
      path_id: "prototype",
    });
    navigate(ROUTES.demoXcms);
  };

  return (
    <section
      id="inicio"
      data-hero-version="3"
      data-hero-ui="vn-design-ops"
      data-product="x-cms"
      className="funnel-section-enter relative overflow-hidden border-b border-border/40 scroll-mt-[calc(var(--header-height)+0.75rem)] bg-[#0A0A0A] text-[#E8E5DF]"
      aria-labelledby="consultoria-hero-heading"
    >
      <div className="h-1.5 w-full bg-brand-gradient" aria-hidden />
      <div className="container relative mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="order-1 lg:order-2 lg:col-span-7" data-testid="hero-ops-media">
            <button
              type="button"
              onClick={openXcmsDemo}
              className="hero-xcms-hit"
              aria-label={t.ctaDemo}
            >
              <span className="hero-xcms-play" aria-hidden>
                <Play className="h-3.5 w-3.5" />
                {t.ctaDemo}
              </span>
              <DeviceMockup
                variant="laptop"
                src={mediaSrc}
                alt={mediaAlt}
                caption={t.xcmsCaption}
                addressBar="x-cms · operaciones"
                loading="eager"
              />
            </button>
          </div>

          <div className="order-2 space-y-5 lg:order-1 lg:col-span-5">
            <p className="inline-flex min-h-8 items-center rounded-full border border-[#FF931E]/40 bg-[#FF931E]/10 px-3 text-xs font-medium text-[#FF931E]">
              {t.xcmsLabel}
            </p>

            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">
              {t.principleBadge}
            </p>

            <h1
              id="consultoria-hero-heading"
              className="text-[1.75rem] font-bold leading-tight tracking-tight text-[#E8E5DF] sm:text-4xl"
            >
              {t.title}
            </h1>

            <p
              id={descId}
              className="max-w-xl text-sm leading-relaxed text-white/60 md:text-base"
            >
              {t.description}
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                type="button"
                size="lg"
                data-testid="hero-demo-xcms"
                aria-describedby={descId}
                className="funnel-cta-primary min-h-[48px] bg-brand-gradient px-8 font-semibold text-white hover:opacity-90"
                onClick={openXcmsDemo}
              >
                <Play className="h-4 w-4" aria-hidden />
                {t.ctaDemo}
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                data-testid="hero-agendar"
                aria-describedby={descId}
                className="funnel-cta-ghost min-h-[48px] border-white/20 bg-transparent text-[#E8E5DF] hover:bg-white/5"
                onClick={bookKickoff}
              >
                <Calendar className="h-4 w-4" aria-hidden />
                {t.ctaPrimary}
              </Button>
              <Button
                type="button"
                variant="link"
                data-testid="hero-gratis-a11y"
                className="funnel-link min-h-[44px] px-0 text-white/55 hover:text-[#E8E5DF]"
                onClick={bookFree}
              >
                {t.ctaFreeA11y}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
