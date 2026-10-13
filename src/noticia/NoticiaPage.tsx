import { StaticBreadcrumbs } from "../components/static/StaticBreadcrumbs";
import { ArrowRight } from "lucide-react";
import { Navigation } from "../components/organisms/Navigation";
import Footer from "../components/Footer";
import { newsTopicLabel } from "../components/news/NewsCard";
import { formatEditionMonth, readingMinutes } from "../components/news/news-format";
import { newsEditionBySlug, newsTopicLanding } from "../data/news-editions";
import { homeHref } from "../lib/site-nav";
import { serviciosHref } from "../lib/servicios-links";
import { cn } from "../lib/utils";
import { noticiasNavLinks } from "../noticias/NoticiasPage";

export function getEdition(slug: string) {
  const edition = newsEditionBySlug(slug);
  if (!edition) throw new Error(`[noticia] edición inexistente en news-editions.json: ${slug}`);
  return edition;
}

const CTA_CLASS =
  "inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground no-underline transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * /noticias/<slug>/ — página estática prerenderizada por edición (patrón de /servicios/<rubro>/).
 * Contenido SOLO de src/data/news-editions.json (título, bajada, mes, párrafos ES). Sin texto nuevo.
 * Migas: Inicio › Noticias › edición. CTA a servicios como botón aparte, al final del cuerpo.
 */
export function NoticiaPage({ slug }: { slug: string }) {
  const edition = getEdition(slug);
  const landing = newsTopicLanding(edition.topic);
  const ctaHref = landing?.path ?? serviciosHref();
  const ctaLabel = landing?.label.es ?? "Servicios";
  const paragraphs = edition.paragraphs.es;
  const minutes = readingMinutes(paragraphs);
  return (
    <>
      <a href="#main" className="skip-link">
        Ir al contenido principal
      </a>
      <Navigation staticLinks={noticiasNavLinks()} staticHomeHref={homeHref()} staticEnglishHref={homeHref()} />
      <main id="main" tabIndex={-1} className="pt-[var(--header-height)]" data-page="noticia" data-news-slug={slug}>
        <article aria-labelledby="noticia-heading" className="py-10 md:py-14">
          <div className="container mx-auto max-w-3xl px-4">
            <StaticBreadcrumbs
              className="text-sm text-muted-foreground"
              items={[
                { label: "Inicio", path: "/" },
                { label: "Noticias", path: "/noticias/" },
                { label: edition.title.es, path: `/noticias/${slug}/` },
              ]}
            />
            <header className="mt-6">
              <p className="m-0 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{newsTopicLabel(edition.topic, "es")}</span>
                <span aria-hidden="true">|</span>
                <time dateTime={edition.month}>{formatEditionMonth(edition.month, "es")}</time>
                <span aria-hidden="true">|</span>
                <span>{`${minutes} min de lectura`}</span>
              </p>
              <h1
                id="noticia-heading"
                className={cn(
                  "m-0 mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
                  "font-[family-name:var(--font-chillax)]",
                )}
              >
                {edition.title.es}
              </h1>
              <p className="m-0 mt-4 text-lg leading-relaxed text-muted-foreground">{edition.dek.es}</p>
            </header>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground" data-news-body>
              {paragraphs.map((p, i) => (
                <p key={i} className="m-0">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10 border-t border-border pt-8" data-news-cta>
              <a href={ctaHref} className={CTA_CLASS}>
                {ctaLabel}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      </main>
      <Footer variant="contact-only" />
    </>
  );
}
