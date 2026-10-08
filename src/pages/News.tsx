import { ArrowLeft, Newspaper, Share2 } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { Logo } from "../components/atoms/Logo";
import { SectionBadge } from "../components/atoms/SectionBadge";
import { SectionTitle } from "../components/atoms/SectionTitle";
import { NewsCard, newsTopicLabel } from "../components/news/NewsCard";
import { NewsCategoryPill } from "../components/news/NewsCategoryPill";
import { formatEditionMonth, readingMinutes } from "../components/news/news-format";
import { PageShell } from "../components/layout/PageShell";
import { assetUrl } from "../components/marketing";
import {
  NEWS_CATALOG,
  newsCanonical,
  newsEditionBySlug,
  newsPublicExit,
  newsShareUrl,
} from "../data/news-editions";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { ROUTES } from "../lib/routes";

function NewsIndex() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const es = language === "es";

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.news, current: true }]}>
      <SEOHead
        {...t.seo.pages.news}
        url={newsCanonical()}
        keywords="newsletter UX, accesibilidad WCAG, privacidad Ley 21.719, automatización CMS, Viento Norte"
      />
      <section className="container mx-auto max-w-3xl px-6 py-16">
        <div className="section-header section-header-gap flex flex-col items-start space-y-3 md:space-y-4">
          <SectionBadge icon={Newspaper}>News</SectionBadge>
          <SectionTitle as="h1" align="left">
            {es
              ? "Privacidad, automatización y accesibilidad para empresas"
              : "Privacy, automation, and accessibility for business"}
          </SectionTitle>
          <p className="section-header__description max-w-2xl">
            {es
              ? "Ediciones mensuales: privacidad, automatización y accesibilidad. Casos públicos, sin KPI inventados."
              : "Monthly editions: privacy, automation, and accessibility. Public cases only — no invented KPIs."}
          </p>
        </div>

        <ul className="m-0 mb-12 grid list-none gap-4 p-0">
          {NEWS_CATALOG.editions.map((edition) => (
            <li key={edition.slug}>
              <NewsCard edition={edition} language={language} />
            </li>
          ))}
        </ul>

        <h2 className="mb-2 text-xl font-semibold tracking-tight">
          {es ? "En preparación" : "Upcoming"}
        </h2>
        <ul className="m-0 list-none space-y-3 p-0">
          {NEWS_CATALOG.upcoming.map((item) => (
            <li key={item.id} className="rounded-2xl border border-dashed border-border p-5">
              <p className="m-0 font-medium">
                {item.company} · {item.period}
              </p>
              <p className="mb-0 mt-2 text-sm text-muted-foreground">{item.note_es}</p>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}

function shareEdition(title: string, slug: string) {
  const url = newsShareUrl(slug);
  const nav = navigator as Navigator & {
    share?: (data: ShareData) => Promise<void>;
  };
  if (typeof nav.share === "function") {
    void nav.share({ title, url }).catch(() => undefined);
    return;
  }
  void navigator.clipboard?.writeText(url);
}

function NewsEditionView({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const navigate = useNavigate();
  const edition = newsEditionBySlug(slug);
  const es = language === "es";

  if (!edition) {
    return <Navigate to={ROUTES.news} replace />;
  }

  const title = edition.title[language];
  const paragraphs = edition.paragraphs[language];
  const minutes = readingMinutes(paragraphs);
  const month = formatEditionMonth(edition.month, language);
  const exit = newsPublicExit(edition.topic);
  const related = NEWS_CATALOG.editions.filter((item) => item.slug !== edition.slug);

  return (
    <PageShell
      crumbs={[
        { label: t.breadcrumbs.news, onClick: () => navigate(ROUTES.news) },
        { label: title, current: true },
      ]}
    >
      <SEOHead
        title={title}
        description={edition.dek[language]}
        url={newsCanonical(edition.slug)}
        type="article"
      />
      <article className="container mx-auto max-w-3xl px-6 py-16">
        <Link
          to={ROUTES.news}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground no-underline"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {es ? "Volver a las noticias" : "Back to news"}
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Logo size="sm" showRole={false} />
          <NewsCategoryPill>{newsTopicLabel(edition.topic, language)}</NewsCategoryPill>
        </div>

        <SectionTitle as="h1" align="left" className="mt-6">
          {title}
        </SectionTitle>

        <p className="m-0 mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <time dateTime={edition.month}>{month}</time>
            <span aria-hidden="true">|</span>
            <span>{es ? `${minutes} min de lectura` : `${minutes} min read`}</span>
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-2 font-medium text-foreground"
            onClick={() => shareEdition(title, edition.slug)}
          >
            <Share2 className="size-4" aria-hidden="true" />
            {es ? "Compartir" : "Share"}
          </button>
        </p>

        {edition.topic === "privacidad" ? (
          <figure className="mb-8 mt-6">
            <img
              src={assetUrl("images/seo/ley-21719-flujo.svg")}
              width={1200}
              height={630}
              alt="Ley 21.719 en el flujo: qué dato se pide, para qué, cuánto tiempo, y si la persona puede decir que no."
              className="h-auto w-full rounded-2xl border border-border"
            />
          </figure>
        ) : null}

        <p className="mb-8 text-lg leading-relaxed text-foreground">{edition.dek[language]}</p>

        {paragraphs.map((paragraph, index) => (
          <p key={`${edition.slug}-${index}`} className="mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}

        <p className="mt-8 text-sm text-muted-foreground">
          {es ? "Fuente (no inventada): " : "Source (not invented): "}
          {edition.source}
          {edition.hubPath ? (
            <>
              {" · "}
              <Link to={edition.hubPath}>{edition.hubPath}</Link>
            </>
          ) : null}
        </p>

        {exit ? (
          <p className="mt-8">
            <a className="font-medium text-foreground underline" href={exit}>
              {exit.includes("#revision-gratis")
                ? es
                  ? "Revisión gratis de un flujo"
                  : "Free review of one flow"
                : es
                  ? "Ver servicios"
                  : "View services"}
            </a>
          </p>
        ) : null}

        <h2 className="mb-4 mt-12 text-xl font-semibold tracking-tight">
          {es ? "Otras noticias" : "Other articles"}
        </h2>
        <ul className="m-0 grid list-none gap-4 p-0">
          {related.map((item) => (
            <li key={item.slug}>
              <NewsCard edition={item} language={language} heading="h3" />
            </li>
          ))}
        </ul>
      </article>
    </PageShell>
  );
}

const News = () => {
  const { slug } = useParams<{ slug?: string }>();
  if (slug) return <NewsEditionView slug={slug} />;
  return <NewsIndex />;
};

export default News;
