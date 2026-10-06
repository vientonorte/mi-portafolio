import { useCallback, useState, type MouseEvent } from "react";
import { Navigation } from "../components/organisms/Navigation";
import { homeHref, serviciosNavLinks } from "./servicios-nav";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { ServiciosContactForm } from "./ServiciosContactForm";
import { ServiciosCasos, ServiciosConceptos } from "./ServiciosCasos";
import { cn } from "../lib/utils";
import { track } from "../lib/track";
import { ctaClickFromTarget } from "./servicios-cta";
import { HeroWithMockup, ServiceCards, SECTION_TITLE_CLASS, assetUrl } from "../components/marketing";
import {
  CONTACT_EMAIL,
  PRIMARY_CTA_CLASS,
  SERVICIOS_CARDS,
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
      <Navigation staticLinks={serviciosNavLinks()} staticHomeHref={homeHref()} staticEnglishHref={homeHref()} />
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
          desktopImage={SERVICIOS_IMAGES.xcmsClean}
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
            <figure className="mt-12 max-w-3xl">
              <img
                src={assetUrl("images/seo/ley-21719-flujo.svg")}
                width={1200}
                height={630}
                alt="Ley 21.719 en el flujo: qué dato se pide, para qué, cuánto tiempo, y si la persona puede decir que no."
                className="h-auto w-full rounded-2xl border border-border"
              />
              <figcaption className="mt-3 text-sm text-muted-foreground">
                Ley 21.719 en el flujo. La revisión gratis mira un formulario: qué dato, para qué, cuánto tiempo, y si se puede decir que no.
              </figcaption>
            </figure>
          </div>
        </section>

        <ServiciosCasos />

        <ServiciosConceptos />

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
