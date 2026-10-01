import { useCallback, useState, type MouseEvent } from "react";
import { Navigation } from "../components/organisms/Navigation";
import { homeHref, serviciosNavLinks } from "./servicios-nav";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { ServiciosContactForm } from "./ServiciosContactForm";
import { ExperienciaRo, ServiciosCasos } from "./ServiciosCasos";
import { cn } from "../lib/utils";
import { track } from "../lib/track";
import { ctaClickFromTarget } from "./servicios-cta";
import {
  CaseCards,
  HeroWithMockup,
  ServiceCards,
  SECTION_TITLE_CLASS,
  type CaseCard,
} from "../components/marketing";
import {
  BRAND_CASES,
  CONTACT_EMAIL,
  PRIMARY_CTA_CLASS,
  SERVICIOS_CARDS,
  SERVICIOS_CASES,
  SERVICIOS_FUNNEL,
  SERVICIOS_HERO,
  SERVICIOS_IMAGES,
  type ServiciosIntent,
  type ServiciosIntentValue,
} from "./servicios-content";

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function ServiciosPage() {
  const [intent, setIntent] = useState<ServiciosIntentValue>("");
  const [announcement, setAnnouncement] = useState("");

  const chooseIntent = useCallback((e: MouseEvent<HTMLAnchorElement>, next: ServiciosIntent) => {
    e.preventDefault();
    setIntent(next);
    setAnnouncement(`Opción seleccionada en el formulario: ${next}.`);
    const target = document.getElementById("contacto");
    target?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    try {
      history.replaceState(null, "", "#contacto");
    } catch {
      /* ignore */
    }
    const firstField = target?.querySelector<HTMLInputElement>("input[name='nombre']");
    firstField?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Ir al contenido principal
      </a>
      <Navigation staticLinks={serviciosNavLinks()} staticHomeHref={homeHref()} />
      <main
        id="main"
        tabIndex={-1}
        className="pt-[var(--header-height)]"
        data-page="servicios"
        onClickCapture={(e) => {
          const cta = ctaClickFromTarget(e.target);
          if (cta) track("cta_click", cta);
        }}
      >
        <HeroWithMockup
          id="inicio"
          headingId="servicios-hero-heading"
          badge={SERVICIOS_HERO.badge}
          eyebrow={SERVICIOS_HERO.eyebrow}
          title={SERVICIOS_HERO.title}
          subtitle={SERVICIOS_HERO.audience}
          desktopImage={SERVICIOS_IMAGES.xcms}
          actions={
            <>
              <Button asChild size="lg" className={cn(PRIMARY_CTA_CLASS, "px-8")}>
                <a href="#contacto">{SERVICIOS_HERO.ctaPrimary}</a>
              </Button>
              <Button asChild variant="link" className="min-h-[44px] px-0 text-white/75 hover:text-[#E8E5DF]">
                <a href="#opciones">{SERVICIOS_HERO.ctaSecondary}</a>
              </Button>
            </>
          }
        />

        <section
          id="opciones"
          className="scroll-mt-[calc(var(--header-height)+0.75rem)] bg-background py-12 md:py-16"
          aria-labelledby="opciones-heading"
        >
          <div className="container mx-auto max-w-6xl px-4">
            <h2 id="opciones-heading" className={SECTION_TITLE_CLASS}>
              Tres formas de partir
            </h2>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              Estrena tu web, parte gratis revisando un flujo o conversemos un proyecto a tu medida.
            </p>
            <ServiceCards
              cards={SERVICIOS_CARDS}
              ctaClassName={PRIMARY_CTA_CLASS}
              onChoose={(e, card) => chooseIntent(e, card.intent as ServiciosIntent)}
            />
          </div>
        </section>

        <CaseCards
          heading={SERVICIOS_CASES.heading}
          intro={SERVICIOS_CASES.intro}
          funnel={SERVICIOS_FUNNEL}
          cases={BRAND_CASES.map(
            (item): CaseCard => ({
              id: item.id,
              client: item.client,
              kicker: item.kicker,
              problem: item.problem,
              whatWeDid: item.whatWeDid,
              result: item.result,
              images: [...item.images],
              cta: { label: item.ctaLabel, href: `#${item.ctaAnchor}` },
            })
          )}
        />

        <ServiciosCasos />

        <ExperienciaRo />

        <section
          id="contacto"
          className="scroll-mt-[calc(var(--header-height)+0.75rem)] border-t border-border/40 bg-muted/30 py-12 md:py-16"
          aria-labelledby="contacto-heading"
        >
          <div className="container mx-auto max-w-3xl px-4">
            <h2 id="contacto-heading" className={SECTION_TITLE_CLASS}>
              Cuéntanos qué necesitas
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              Te respondemos en menos de 24 horas hábiles. Sin compromiso.
            </p>
            <div className="mt-8 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8">
              <ServiciosContactForm intent={intent} onIntentChange={setIntent} announcement={announcement} />
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              ¿Prefieres el correo? Escríbenos a{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-foreground underline underline-offset-2 hover:text-primary"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer variant="contact-only" />
    </>
  );
}
