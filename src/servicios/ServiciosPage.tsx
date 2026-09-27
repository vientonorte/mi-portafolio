import { useCallback, useState, type MouseEvent } from "react";
import { Check } from "lucide-react";
import { Navigation } from "../components/organisms/Navigation";
import { homeHref, serviciosNavLinks } from "./servicios-nav";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { ServiciosContactForm } from "./ServiciosContactForm";
import { cn } from "../lib/utils";
import {
  CONTACT_EMAIL,
  PRIMARY_CTA_CLASS,
  SERVICIOS_CARDS,
  SERVICIOS_HERO,
  SERVICIOS_INTENTS,
  type ServiciosIntent,
} from "./servicios-content";

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function ServiciosPage() {
  const [intent, setIntent] = useState<ServiciosIntent>(SERVICIOS_INTENTS[0]);
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
      <main id="main" tabIndex={-1} className="pt-[var(--header-height)]" data-page="servicios">
        <section
          id="inicio"
          className="relative overflow-x-clip border-b border-border/40 bg-[#0A0A0A] text-[#E8E5DF]"
          aria-labelledby="servicios-hero-heading"
        >
          <div className="h-1.5 w-full bg-brand-gradient" aria-hidden />
          <div className="container mx-auto max-w-6xl px-4 py-10 md:py-16">
            <div className="max-w-3xl space-y-5">
              <p className="inline-flex min-h-8 items-center rounded-full border border-primary/40 bg-primary/10 px-3 text-xs font-medium text-[#E8E5DF]">
                {SERVICIOS_HERO.badge}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/70">
                {SERVICIOS_HERO.eyebrow}
              </p>
              <h1
                id="servicios-hero-heading"
                className="text-[1.75rem] font-bold leading-tight tracking-tight text-[#E8E5DF] sm:text-4xl lg:text-5xl"
              >
                {SERVICIOS_HERO.title}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                {SERVICIOS_HERO.audience}
              </p>
              <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className={cn(PRIMARY_CTA_CLASS, "px-8")}
                >
                  <a href="#opciones">{SERVICIOS_HERO.ctaPrimary}</a>
                </Button>
                <Button
                  asChild
                  variant="link"
                  className="min-h-[44px] px-0 text-white/75 hover:text-[#E8E5DF]"
                >
                  <a href="#contacto">{SERVICIOS_HERO.ctaSecondary}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="opciones"
          className="scroll-mt-[calc(var(--header-height)+0.75rem)] bg-background py-12 md:py-16"
          aria-labelledby="opciones-heading"
        >
          <div className="container mx-auto max-w-6xl px-4">
            <h2 id="opciones-heading" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Tres formas de partir
            </h2>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              Parte gratis con un flujo, estrena tu web o conversemos un proyecto a tu medida.
            </p>
            <ol className="mt-8 grid list-none gap-6 p-0 lg:grid-cols-3" data-testid="servicios-cards">
              {SERVICIOS_CARDS.map((card, index) => (
                <li
                  key={card.id}
                  id={card.id}
                  data-card={card.id}
                  className="scroll-mt-[calc(var(--header-height)+0.75rem)]"
                >
                  <article
                    className="flex h-full flex-col gap-5 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
                    aria-labelledby={`${card.id}-title`}
                  >
                    <div className="space-y-2">
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        {String(index + 1).padStart(2, "0")} · {card.eyebrow}
                      </p>
                      <h3 id={`${card.id}-title`} className="text-xl font-bold leading-snug text-foreground">
                        {card.title}
                      </h3>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Para quién</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{card.forWhom}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Qué incluye</h4>
                      <ul className="mt-2 space-y-2">
                        {card.includes.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-relaxed text-foreground">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto space-y-4 border-t border-border/60 pt-4">
                      <div>
                        <p className="text-sm font-semibold text-foreground">Precio</p>
                        <p className="text-2xl font-bold tracking-tight text-foreground" data-price>
                          {card.price}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">{card.priceNote}</p>
                      </div>
                      <Button
                        asChild
                        size="lg"
                        className={cn(PRIMARY_CTA_CLASS, "w-full")}
                      >
                        <a
                          href="#contacto"
                          data-intent={card.intent}
                          aria-describedby={`${card.id}-title`}
                          onClick={(e) => chooseIntent(e, card.intent)}
                        >
                          {card.cta}
                        </a>
                      </Button>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="contacto"
          className="scroll-mt-[calc(var(--header-height)+0.75rem)] border-t border-border/40 bg-muted/30 py-12 md:py-16"
          aria-labelledby="contacto-heading"
        >
          <div className="container mx-auto max-w-3xl px-4">
            <h2 id="contacto-heading" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
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
