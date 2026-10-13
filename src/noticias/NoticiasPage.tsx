import { StaticBreadcrumbs } from "../components/static/StaticBreadcrumbs";
import { Navigation } from "../components/organisms/Navigation";
import Footer from "../components/Footer";
import { NewsCard } from "../components/news/NewsCard";
import { SECTION_TITLE_CLASS } from "../components/marketing";
import { NEWS_CATALOG } from "../data/news-editions";
import { homeHref, minimalNavLinks, siteServiciosHref } from "../lib/site-nav";
import { cn } from "../lib/utils";

/** Nav único (src/lib/site-nav.ts): Servicios · Noticias · Contacto (→ /servicios/#contacto). */
export function noticiasNavLinks() {
  return minimalNavLinks({ contactHref: siteServiciosHref("contacto") });
}

/**
 * /noticias/ — página estática prerenderizada (mismo patrón que /servicios/).
 * Lista las ediciones EXISTENTES de src/data/news-editions.json (sin contenido nuevo).
 * Reemplaza la vista hash #/news (fuera de canon): /news/ y #/news redirigen aquí.
 */
export function NoticiasPage() {
  const editions = NEWS_CATALOG.editions;
  return (
    <>
      <a href="#main" className="skip-link">
        Ir al contenido principal
      </a>
      <Navigation staticLinks={noticiasNavLinks()} staticHomeHref={homeHref()} staticEnglishHref={homeHref()} />
      <main id="main" tabIndex={-1} className="pt-[var(--header-height)]" data-page="noticias">
        <section aria-labelledby="noticias-heading" className="border-b border-border/40 py-12 md:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <StaticBreadcrumbs
              items={[
                { label: "Inicio", path: "/" },
                { label: "Noticias", path: "/noticias/" },
              ]}
            />
            <h1
              id="noticias-heading"
              className={cn(SECTION_TITLE_CLASS, "font-[family-name:var(--font-chillax)]")}
            >
              Noticias
            </h1>
            <ul className="m-0 mt-8 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3" data-news-list>
              {editions.map((edition) => (
                <li key={edition.slug} data-news-edition={edition.slug}>
                  <NewsCard edition={edition} language="es" heading="h2" variant="press" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer variant="contact-only" />
    </>
  );
}
