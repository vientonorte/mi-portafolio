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
  ServiceCards,
  SECTION_TITLE_CLASS,
  type CaseCard,
  type ServiceCardData,
} from "../marketing";
import {
  BRAND_CASES,
  PRIMARY_CTA_CLASS,
  SERVICIOS_CARDS,
  SERVICIOS_CASES,
  SERVICIOS_IMAGES,
} from "../../servicios/servicios-content";

/**
 * P3a — secciones de marketing reutilizables (src/components/marketing) en la
 * home FO. Solo home: la landing SEM (/consultoria) conserva su hero y embudo.
 *
 * Todos los CTA son `<a href>` reales hacia /servicios/ (con la base de Vite).
 * El recorrido es las tres formas de partir y los casos. Sin franja, bio ni segundo método.
 */

const COPY = {
  es: {
    ctaPrimary: "Quiero mi web en 72 h",
    ctaSecondary: "Revisión gratis de mi sitio",
    optionsHeading: "Tres formas de partir",
    allServices: "Ver todos los servicios",
  },
  en: {
    ctaPrimary: "I want my website in 72 h",
    ctaSecondary: "Free review of my site",
    optionsHeading: "Three ways to start",
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

/**
 * Tarjetas de /servicios/ (mismo orden y línea de audiencia que SERVICIOS_CARDS)
 * con destino HTTP a su ficha en /servicios/#<id>.
 */
function homeServiceCards(): ServiceCardData[] {
  return SERVICIOS_CARDS.map((card) => ({ ...card, href: serviciosHref(card.id) }));
}

function homeCases(): CaseCard[] {
  return BRAND_CASES.map((item) => ({
    id: item.id,
    client: item.client,
    kicker: item.kicker,
    problem: item.problem,
    whatWeDid: item.whatWeDid,
    result: item.result,
    images: [...item.images],
    cta: { label: item.ctaLabel, href: serviciosHref(item.ctaAnchor) },
  }));
}

export function HomeMarketingHero() {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.landing;
  const copy = COPY[language === "en" ? "en" : "es"];
  // Decisión PO: exactamente 2 botones en el hero (sin Calendar ni "Ver prototipo").
  const primaryHref = serviciosHref("web-pymes");
  const secondaryHref = serviciosHref("revision-gratis");

  return (
    <HeroWithMockup
      id="inicio"
      headingId="home-hero-heading"
      badge={t.badge}
      eyebrow={t.principleBadge}
      title={t.title}
      subtitle={t.description}
      desktopImage={SERVICIOS_IMAGES.xcms}
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
          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-h-[48px] border-white/70 bg-transparent px-6 dark:border-white/70 dark:bg-transparent dark:hover:bg-white/10 text-base font-semibold text-white hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
          >
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
      <section
        id="home-servicios"
        className="bg-background py-12 md:py-16"
        aria-labelledby="home-servicios-heading"
      >
        <div className="container mx-auto max-w-6xl px-4">
          <h2 id="home-servicios-heading" className={SECTION_TITLE_CLASS}>
            {copy.optionsHeading}
          </h2>
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
        cases={homeCases()}
      />

    </div>
  );
}
