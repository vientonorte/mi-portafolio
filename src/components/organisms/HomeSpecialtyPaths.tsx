import { Link } from "react-router-dom";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { NEWS_CATALOG, newsTopicLanding } from "../../data/news-editions";
import { useLanguage } from "../../lib/LanguageContext";
import { ROUTES } from "../../lib/routes";

const SPECIALTIES = [
  {
    path: "/servicios/seguridad-privacidad-digital/",
    kicker: { es: "Especialidad", en: "Specialty" },
    title: { es: "Privacidad de datos · Ley 21.719", en: "Data privacy · Law 21.719" },
    dek: {
      es: "Privacy by Design en el flujo: consentimiento, finalidad, minimización. No es un banner.",
      en: "Privacy by Design in the flow: consent, purpose, minimization. Not a banner.",
    },
  },
  {
    path: "/servicios/diagnostico-accesibilidad-wcag/",
    kicker: { es: "Especialidad", en: "Specialty" },
    title: { es: "Diagnóstico WCAG 2.2 AA", en: "WCAG 2.2 AA diagnostic" },
    dek: {
      es: "Un flujo. Gratis la revisión de accesibilidad. No es mentoría.",
      en: "One flow. Free accessibility review. Not mentorship.",
    },
  },
  {
    path: "/servicios/inteligencia-artificial-negocios/",
    kicker: { es: "Especialidad", en: "Specialty" },
    title: { es: "IA en tu CMS o CRM", en: "AI in your CMS or CRM" },
    dek: {
      es: "El dato queda en tu perímetro. No un chatbot genérico sobre tu base.",
      en: "Data stays in your perimeter. Not a generic chatbot on your database.",
    },
  },
  {
    path: "/servicios/consultoria-ux-pymes/",
    kicker: { es: "Oferta", en: "Offer" },
    title: { es: "Consultoría UX para pymes", en: "UX consulting for SMBs" },
    dek: {
      es: "Diagnóstico, prototipo y proceso de equipo. Kickoff 30 min.",
      en: "Diagnostic, prototype, and team process. 30 min kickoff.",
    },
  },
] as const;

/**
 * Home FO only: how you reach HTTP landings + news → especialidad.
 * SEM /#/consultoria no monta esto (embudo 01–03).
 */
export function HomeSpecialtyPaths() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <>
      <PageSection
        id="especialidades"
        padding="default"
        width="wide"
        tone="default"
        aria-labelledby="home-specialties-heading"
      >
        <SectionHeader
          badge={es ? "Cómo llegar" : "How you get there"}
          title={es ? "De la home a la ficha" : "From home to the landing"}
          description={
            es
              ? "El embudo cierra el lead. Las fichas HTTP son lo que Google lee: privacidad de datos, WCAG, IA. Agendar sigue en /#/consultoria."
              : "The funnel closes the lead. HTTP pages are what Google reads: data privacy, WCAG, AI. Booking stays at /#/consultoria."
          }
          titleId="home-specialties-heading"
          titleAs="h2"
          align="left"
        />
        <ul className="grid gap-4 sm:grid-cols-2 list-none p-0 m-0">
          {SPECIALTIES.map((item) => (
            <li key={item.path}>
              <a
                href={item.path}
                className="block h-full rounded-2xl border border-border bg-card p-5 no-underline text-inherit hover:border-foreground/30"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground m-0">
                  {item.kicker[language]}
                </p>
                <p className="text-lg font-semibold tracking-tight mt-2 mb-1">
                  {item.title[language]}
                </p>
                <p className="text-sm text-muted-foreground m-0 leading-normal">
                  {item.dek[language]}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  );
}

export function HomeNewsStrip() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <PageSection
      id="news"
      padding="default"
      width="wide"
      tone="default"
      aria-labelledby="home-news-heading"
    >
      <SectionHeader
        badge="News"
        title={es ? "Cada edición abre su especialidad" : "Each edition opens its specialty"}
        description={
          es
            ? "Privacidad, automatización o accesibilidad: la nota te lleva a la ficha."
            : "Privacy, automation, or accessibility: the note takes you to the landing."
        }
        titleId="home-news-heading"
        titleAs="h2"
        align="left"
      />
      <ul className="grid gap-4 list-none p-0 m-0">
        {NEWS_CATALOG.editions.map((edition) => {
          const landing = newsTopicLanding(edition.topic);
          return (
            <li
              key={edition.slug}
              className="rounded-2xl border border-border bg-card p-5"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground m-0">
                {edition.topic} · {edition.company}
              </p>
              <p className="text-lg font-semibold tracking-tight mt-2 mb-2">
                <Link
                  className="no-underline text-inherit hover:underline"
                  to={ROUTES.newsEdition(edition.slug)}
                >
                  {edition.title[language]}
                </Link>
              </p>
              {landing ? (
                <a className="text-sm underline" href={landing.path}>
                  {es ? "Ir a la ficha · " : "Open landing · "}
                  {landing.label[language]}
                </a>
              ) : null}
            </li>
          );
        })}
      </ul>
    </PageSection>
  );
}
