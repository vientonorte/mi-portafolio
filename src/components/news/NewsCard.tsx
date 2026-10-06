import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import type { NewsEdition } from "../../data/news-editions";
import type { Language } from "../../lib/i18n/types";
import { ROUTES } from "../../lib/routes";
import { NewsCategoryPill } from "./NewsCategoryPill";
import { formatEditionMonth, readingMinutes } from "./news-format";

const TOPIC_LABEL = {
  accesibilidad: { es: "Accesibilidad", en: "Accessibility" },
  automatizacion: { es: "Automatización", en: "Automation" },
  privacidad: { es: "Privacidad", en: "Privacy" },
} as const;

type TopicKey = keyof typeof TOPIC_LABEL;

export function newsTopicLabel(topic: string, language: Language): string {
  const row = TOPIC_LABEL[topic as TopicKey];
  return row ? row[language] : topic;
}

/**
 * Card de noticia de SURA Investments (sala de prensa):
 * categoría, fecha, minutos, título, bajada, «Leer la noticia».
 * Sin foto: las portadas LinkedIn son del vault y no hay asset público.
 */
export function NewsCard({
  edition,
  language,
  heading = "h2",
}: {
  edition: NewsEdition;
  language: Language;
  heading?: "h2" | "h3";
}) {
  const es = language === "es";
  const Title = heading;
  const minutes = readingMinutes(edition.paragraphs[language]);
  const month = formatEditionMonth(edition.month, language);

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/30">
      <Link
        to={ROUTES.newsEdition(edition.slug)}
        className="flex flex-col text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex items-start bg-muted/60 px-5 pb-4 pt-5">
          <NewsCategoryPill>{newsTopicLabel(edition.topic, language)}</NewsCategoryPill>
        </div>
        <div className="h-0.5 bg-foreground" aria-hidden="true" />
        <div className="flex flex-col gap-3 p-5">
          <p className="m-0 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={edition.month}>{month}</time>
            <span aria-hidden="true">|</span>
            <Clock className="size-3.5" aria-hidden="true" />
            <span>
              {es ? `${minutes} min de lectura` : `${minutes} min read`}
            </span>
          </p>
          <Title className="m-0 text-xl font-semibold tracking-tight text-foreground">
            {edition.title[language]}
          </Title>
          <p className="m-0 text-sm leading-relaxed text-muted-foreground">
            {edition.dek[language]}
          </p>
          <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            {es ? "Leer la noticia" : "Read the article"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
