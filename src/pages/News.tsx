import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Newspaper } from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { SectionBadge } from "../components/atoms/SectionBadge";
import { SectionTitle } from "../components/atoms/SectionTitle";
import { PageShell } from "../components/layout/PageShell";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { ROUTES } from "../lib/routes";
import {
  NEWS_CATALOG,
  newsCanonical,
  newsEditionBySlug,
} from "../data/news-editions";

const TOPIC_LABEL = {
  accesibilidad: { es: "Accesibilidad", en: "Accessibility" },
  automatizacion: { es: "Automatización", en: "Automation" },
  privacidad: { es: "Privacidad", en: "Privacy" },
} as const;

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
      <section className="container max-w-3xl mx-auto px-6 py-16">
        <div className="section-header section-header-gap flex flex-col items-start space-y-3 md:space-y-4">
          <SectionBadge icon={Newspaper}>News</SectionBadge>
          <SectionTitle as="h1" align="left">
            {es
              ? "Privacidad, automatización y accesibilidad para empresas"
              : "Privacy, automation, and accessibility for business"}
          </SectionTitle>
          <p className="section-header__description max-w-2xl">
            {es
              ? "Ediciones mensuales. SSOT en este sitio; LinkedIn importa el cuerpo. Sin KPI que no esté en un hub público. Paid LinkedIn PAUSED."
              : "Monthly editions. SSOT on this site; LinkedIn imports the body. No KPI that is not on a public hub. LinkedIn ads PAUSED."}
          </p>
        </div>

        <ul className="grid gap-4 list-none p-0 m-0 mb-12">
          {NEWS_CATALOG.editions.map((edition) => (
            <li key={edition.slug}>
              <Link
                to={ROUTES.newsEdition(edition.slug)}
                className="block rounded-2xl border border-border bg-card p-5 no-underline text-inherit hover:border-foreground/30"
              >
                <p className="text-xs uppercase tracking-wide text-muted-foreground m-0">
                  {TOPIC_LABEL[edition.topic as keyof typeof TOPIC_LABEL][language]} · {edition.month} ·{" "}
                  {edition.company}
                </p>
                <h2 className="text-lg font-semibold tracking-tight mt-2 mb-1">
                  {edition.title[language]}
                </h2>
                <p className="text-sm text-muted-foreground m-0 leading-normal">
                  {edition.dek[language]}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mb-2">
          {es ? "En preparación" : "Upcoming"}
        </h2>
        <ul className="list-none p-0 m-0 space-y-3">
          {NEWS_CATALOG.upcoming.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-dashed border-border p-5"
            >
              <p className="font-medium m-0">
                {item.company} · {item.period}
              </p>
              <p className="text-sm text-muted-foreground mt-2 mb-0">
                {item.note_es}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
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
      <article className="container max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-wide text-muted-foreground m-0">
          {TOPIC_LABEL[edition.topic as keyof typeof TOPIC_LABEL][language]} · {edition.company} ·{" "}
          {edition.month}
        </p>
        <SectionTitle as="h1" align="left" className="mt-3">
          {title}
        </SectionTitle>
        <p className="text-muted-foreground mt-3 mb-8">{edition.dek[language]}</p>
        {paragraphs.map((p) => (
          <p key={p.slice(0, 40)} className="leading-relaxed mb-4">
            {p}
          </p>
        ))}
        <p className="text-sm text-muted-foreground mt-8">
          {es ? "Fuente (no inventada): " : "Source (not invented): "}
          {edition.source}
          {edition.hubPath ? (
            <>
              {" · "}
              <Link to={edition.hubPath}>{edition.hubPath}</Link>
            </>
          ) : null}
        </p>
        <p className="mt-8">
          <Link to={ROUTES.consulting}>
            {es
              ? "Gratis · un flujo WCAG · Agendar 30 min"
              : "Free · one WCAG flow · Book 30 min"}
          </Link>
        </p>
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
