import { PageSection } from "../layout/PageSection";
import { NewsCard } from "../news/NewsCard";
import { SectionHeader } from "../molecules/SectionHeader";
import { NEWS_CATALOG } from "../../data/news-editions";
import { useLanguage } from "../../lib/LanguageContext";

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
        {NEWS_CATALOG.editions.map((edition) => (
          <li key={edition.slug}>
            <NewsCard edition={edition} language={language} heading="h3" />
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
