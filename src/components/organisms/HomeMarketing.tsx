import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../vn-core/analytics/fo-events";
import { serviciosHref } from "../../lib/servicios-links";
import {
  CaseCards,
  HeroWithMockup,
  HowWeWork,
  LogoStrip,
  ServiceCards,
  type ServiceCardData,
} from "../marketing";
import {
  PRIMARY_CTA_CLASS,
  SERVICIOS_CARDS,
  SERVICIOS_CASES,
  SERVICIOS_IMAGES,
  SERVICIOS_LOGOS,
  SERVICIOS_STEPS,
} from "../../servicios/servicios-content";

/**
 * P3a — secciones de marketing reutilizables (src/components/marketing) en la
 * home FO. Solo home: la landing SEM (/consultoria) conserva su hero y embudo.
 *
 * Todos los CTA son `<a href>` reales hacia /servicios/ (con la base de Vite).
 * Logos y casos solo se ven en QA (PendingSlot, base "/qa/"); en producción
 * esas secciones se omiten.
 */

const COPY = {
  es: {
    ctaPrimary: "Ver servicios",
    ctaSecondary: "Escríbenos",
    optionsHeading: "Tres formas de partir",
    optionsIntro:
      "Parte gratis con un flujo, estrena tu web o conversemos un proyecto a tu medida.",
    allServices: "Ver todos los servicios",
  },
  en: {
    ctaPrimary: "See services",
    ctaSecondary: "Contact us",
    optionsHeading: "Three ways to start",
    optionsIntro:
      "Start free with one flow, launch your website, or let’s talk about a tailored project.",
    allServices: "See all services",
  },
} as const;

function trackCta(ctaId: string, href: string) {
  trackEvent("home_servicios_cta", {
    category: "engagement",
    surface: "home-marketing",
    cta_id: ctaId,
    link_url: href,
  });
}

/** Tarjetas de /servicios/ con destino HTTP a su ficha en /servicios/#<id>. */
function homeServiceCards(): ServiceCardData[] {
  return SERVICIOS_CARDS.map((card) => ({ ...card, href: serviciosHref(card.id) }));
}

export function HomeMarketingHero() {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.landing;
  const copy = COPY[language === "en" ? "en" : "es"];
  const primaryHref = serviciosHref();
  const secondaryHref = serviciosHref("contacto");

  return (
    <HeroWithMockup
      id="inicio"
      headingId="home-hero-heading"
      badge={t.badge}
      eyebrow={t.principleBadge}
      title={t.title}
      subtitle={t.description}
      desktopImage={SERVICIOS_IMAGES.heroDesktop}
      phoneImage={SERVICIOS_IMAGES.heroPhone}
      actions={
        <>
          <Button asChild size="lg" className={cn(PRIMARY_CTA_CLASS, "px-8")}>
            <a
              href={primaryHref}
              data-marketing-cta="hero-primary"
              onClick={() => trackCta("hero-primary", primaryHref)}
            >
              {copy.ctaPrimary}
            </a>
          </Button>
          <Button asChild variant="link" className="min-h-[44px] px-0 text-white/75 hover:text-[#E8E5DF]">
            <a
              href={secondaryHref}
              data-marketing-cta="hero-secondary"
              onClick={() => trackCta("hero-secondary", secondaryHref)}
            >
              {copy.ctaSecondary}
            </a>
          </Button>
        </>
      }
    />
  );
}

export function HomeMarketingSections() {
  const { language } = useLanguage();
  const copy = COPY[language === "en" ? "en" : "es"];
  const cards = homeServiceCards();
  const allHref = serviciosHref();

  return (
    <div data-testid="home-marketing">
      <LogoStrip heading={SERVICIOS_LOGOS.heading} pendingSlots={SERVICIOS_LOGOS.pendingSlots} />

      <section
        id="home-servicios"
        className="bg-background py-12 md:py-16"
        aria-labelledby="home-servicios-heading"
      >
        <div className="container mx-auto max-w-6xl px-4">
          <h2 id="home-servicios-heading" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {copy.optionsHeading}
          </h2>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">{copy.optionsIntro}</p>
          <ServiceCards
            cards={cards}
            ctaClassName={PRIMARY_CTA_CLASS}
            testId="home-servicios-cards"
            onChoose={(_e, card) => trackCta(`card-${card.id}`, card.href ?? allHref)}
          />
          <p className="mt-8">
            <a
              href={allHref}
              data-marketing-cta="all-services"
              onClick={() => trackCta("all-services", allHref)}
              className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-foreground underline underline-offset-4 hover:text-primary"
            >
              {copy.allServices}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </p>
        </div>
      </section>

      <CaseCards
        id="home-casos"
        heading={SERVICIOS_CASES.heading}
        intro={SERVICIOS_CASES.intro}
        pendingCount={SERVICIOS_CASES.pendingCount}
      />

      <HowWeWork
        id="home-como-trabajamos"
        heading={SERVICIOS_STEPS.heading}
        intro={SERVICIOS_STEPS.intro}
        steps={[...SERVICIOS_STEPS.steps]}
      />
    </div>
  );
}
