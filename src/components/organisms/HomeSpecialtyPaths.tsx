import { Link } from "react-router-dom";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { NEWS_CATALOG, newsTopicLanding } from "../../data/news-editions";
import { useLanguage } from "../../lib/LanguageContext";
import { ROUTES } from "../../lib/routes";

/** Home FO: ediciones. El embudo SEM no monta esto. */
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
        badge={es ? "Noticias" : "News"}
        title={es ? "Cada edición abre su especialidad" : "Each edition opens its specialty"}
        description={
          es
            ? "Privacidad, automatización o accesibilidad: la nota te lleva a la edición y la ficha sigue en servicios."
            : "Privacy, automation, or accessibility: the note opens the edition, and the landing stays on services."
        }
        titleId="home-news-heading"
        titleAs="h2"
        align="left"
      />
      <ul className="grid gap-4 list-none p-0 m-0">
        {NEWS_CATALOG.editions.map((edition) => {
          const landing = newsTopicLanding(edition.topic);
          return (
            <li key={edition.slug} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground m-0">
                {edition.topic} · {edition.company}
              </p>
              <p className="text-lg font-semibold tracking-tight mt-2 mb-2">
                <Link className="no-underline text-inherit hover:underline" to={ROUTES.newsEdition(edition.slug)}>
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
