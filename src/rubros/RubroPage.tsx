import { useState, type MouseEvent } from "react";
import { Navigation } from "../components/organisms/Navigation";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { HeroWithMockup, HowWeWork } from "../components/marketing";
import { cn } from "../lib/utils";
import { ServiciosContactForm } from "../servicios/ServiciosContactForm";
import { homeHref } from "../servicios/servicios-nav";
import { CONTACT_EMAIL, SERVICIOS_STEPS, type ServiciosIntentValue } from "../servicios/servicios-content";
import { RUBRO_CTA_CLASS, RUBRO_OFFER, getRubro } from "./rubros-content";
import { rubroNavLinks, serviciosHref } from "./rubros-nav";

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

const SECTION_SCROLL = "scroll-mt-[calc(var(--header-height)+0.75rem)]";
const H2_CLASS = "text-2xl font-bold tracking-tight text-foreground sm:text-3xl";

/**
 * Plantilla de landing por rubro (P4). Misma cáscara que /servicios/ (Navigation
 * estática, tokens de la home, componentes marketing, formulario del relay).
 * Oferta: Web pymes ($30.000 · 72 h · 50/50), preseleccionada en el formulario.
 */
export function RubroPage({ slug }: { slug: string }) {
  const rubro = getRubro(slug);
  // Preselección: el rubro viene por la oferta Web pymes.
  const [intent, setIntent] = useState<ServiciosIntentValue>(RUBRO_OFFER.intent);
  const [announcement, setAnnouncement] = useState("");

  const goToForm = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIntent(RUBRO_OFFER.intent);
    setAnnouncement(`Opción seleccionada en el formulario: ${RUBRO_OFFER.intent}.`);
    const target = document.getElementById("contacto");
    target?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    try {
      history.replaceState(null, "", "#contacto");
    } catch {
      /* ignore */
    }
    target?.querySelector<HTMLInputElement>("input[name='nombre']")?.focus({ preventScroll: true });
  };

  const primaryCta = (extra?: string) => (
    <Button asChild size="lg" className={cn(RUBRO_CTA_CLASS, "px-8", extra)}>
      <a href="#contacto" onClick={goToForm} data-intent={RUBRO_OFFER.intent} data-cta="primary">
        {rubro.cta.primary}
      </a>
    </Button>
  );

  return (
    <>
      <a href="#main" className="skip-link">
        Ir al contenido principal
      </a>
      <Navigation staticLinks={rubroNavLinks()} staticHomeHref={homeHref()} />
      <main
        id="main"
        tabIndex={-1}
        className="overflow-x-clip pt-[var(--header-height)]"
        data-page="rubro"
        data-rubro={slug}
      >
        <HeroWithMockup
          id="inicio"
          headingId="rubro-hero-heading"
          badge={rubro.badge}
          eyebrow={rubro.eyebrow}
          title={rubro.headline}
          subtitle={rubro.subhead}
          desktopImage={rubro.mockups.desktop}
          phoneImage={rubro.mockups.mobile}
          caption={rubro.mockups.caption}
          actions={
            <>
              {primaryCta()}
              <Button asChild variant="link" className="min-h-[44px] px-0 text-white/80 hover:text-[#E8E5DF]">
                <a href={serviciosHref()} data-cta="secondary">
                  {rubro.cta.secondary}
                </a>
              </Button>
            </>
          }
        />

        <section
          id="por-que"
          className={cn(SECTION_SCROLL, "bg-background py-12 md:py-16")}
          aria-labelledby="por-que-heading"
        >
          <div className="container mx-auto max-w-6xl px-4">
            <h2 id="por-que-heading" className={H2_CLASS}>
              {rubro.points.heading}
            </h2>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">{rubro.points.intro}</p>
            <ul className="mt-8 grid list-none gap-6 p-0 md:grid-cols-3">
              {rubro.points.items.map((item) => (
                <li key={item.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="ejemplo"
          className={cn(SECTION_SCROLL, "border-t border-border/40 bg-muted/30 py-12 md:py-16")}
          aria-labelledby="ejemplo-heading"
        >
          <div className="container mx-auto max-w-6xl px-4">
            <p
              className="inline-flex min-h-7 items-center rounded-full bg-[#F5B945] px-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-[#0A0A0A]"
              data-example-label
            >
              {rubro.example.label}
            </p>
            <h2 id="ejemplo-heading" className={cn(H2_CLASS, "mt-3")}>
              {rubro.example.heading}
            </h2>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">{rubro.example.body}</p>
            <ol className="mt-8 grid list-none gap-4 p-0">
              {rubro.example.steps.map((step, i) => (
                <li
                  key={step.after}
                  className="grid gap-3 rounded-xl border border-border bg-card p-5 shadow-sm md:grid-cols-2 md:gap-6"
                >
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="block font-mono text-xs uppercase tracking-[0.14em] text-foreground">
                      <span className="sr-only">Paso {i + 1}, </span>Antes
                    </span>
                    {step.before}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground">
                    <span className="block font-mono text-xs uppercase tracking-[0.14em] text-[#0f6aa8] dark:text-[#7cc4f2]">
                      Después
                    </span>
                    {step.after}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="oferta"
          className={cn(SECTION_SCROLL, "border-t border-border/40 bg-background py-12 md:py-16")}
          aria-labelledby="oferta-heading"
        >
          <div className="container mx-auto max-w-3xl px-4">
            <article className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8" data-offer>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">{rubro.rubro}</p>
              <h2 id="oferta-heading" className={cn(H2_CLASS, "mt-2")}>
                {RUBRO_OFFER.name}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">
                <span className="font-semibold text-foreground">Para quién: </span>
                {rubro.audience}
              </p>
              <h3 className="mt-6 text-base font-bold text-foreground">Qué incluye</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-muted-foreground marker:text-foreground">
                {rubro.includes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-6 text-3xl font-bold text-foreground" data-price>
                {RUBRO_OFFER.price}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {RUBRO_OFFER.delivery} {RUBRO_OFFER.payment} {rubro.priceNote}
              </p>
              <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                {primaryCta()}
                <a
                  href={serviciosHref()}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-foreground underline underline-offset-2 hover:text-primary"
                >
                  {rubro.cta.secondary}
                </a>
              </div>
            </article>
          </div>
        </section>

        <HowWeWork heading={SERVICIOS_STEPS.heading} intro={SERVICIOS_STEPS.intro} steps={[...SERVICIOS_STEPS.steps]} />

        <section
          id="contacto"
          className={cn(SECTION_SCROLL, "border-t border-border/40 bg-muted/30 py-12 md:py-16")}
          aria-labelledby="contacto-heading"
        >
          <div className="container mx-auto max-w-3xl px-4">
            <h2 id="contacto-heading" className={H2_CLASS}>
              {rubro.form.heading}
            </h2>
            <p className="mt-2 text-base text-muted-foreground">{rubro.form.intro}</p>
            <div className="mt-8 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8">
              <ServiciosContactForm
                intent={intent}
                onIntentChange={setIntent}
                announcement={announcement}
                source={rubro.form.source}
                ctaClassName={RUBRO_CTA_CLASS}
              />
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
