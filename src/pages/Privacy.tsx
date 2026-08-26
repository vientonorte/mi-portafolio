import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { SectionBadge } from "../components/atoms/SectionBadge";
import { SectionTitle } from "../components/atoms/SectionTitle";
import { SITE_CONTACT, getContactMailtoUrl } from "../lib/site-contact";
import { PageShell } from "../components/layout/PageShell";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { canonicalFromPath } from "../lib/seo";
import { ROUTES } from "../lib/routes";

const APP_PRIVACY = "https://vientonorte.io/s/polijuego-privacy/";

const Privacy = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const p = t.privacyPage;
  const rightsMailto = `mailto:${SITE_CONTACT.email}?subject=${encodeURIComponent(
    language === "es" ? "Derechos ARSOPL · privacidad" : "ARSOPL rights · privacy"
  )}`;

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.privacy, current: true }]}>
      <SEOHead
        {...t.seo.pages.privacy}
        url={canonicalFromPath(ROUTES.privacy)}
        noIndex
      />
      <section className="container max-w-3xl mx-auto px-6 py-16">
        <div className="section-header section-header-gap flex flex-col items-start space-y-3 md:space-y-4">
          <SectionBadge icon={Shield}>{p.badge}</SectionBadge>
          <SectionTitle as="h1" align="left">
            {p.title}
          </SectionTitle>
          <p className="section-header__description max-w-2xl">{p.lead}</p>
          <p className="text-sm text-muted-foreground">{p.updated}</p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 mb-12 list-none p-0 m-0">
          {p.principles.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-border bg-card p-5 min-h-[7rem]"
            >
              <h2 className="text-lg font-semibold tracking-tight m-0">
                {item.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-2 mb-0 leading-normal">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mb-2">
          {p.inventoryTitle}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">{p.inventoryHint}</p>
        <div className="overflow-x-auto mb-10 rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                {p.inventoryHead.map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.inventoryRows.map((row) => (
                <tr key={row.data} className="border-t border-border">
                  <td className="px-4 py-3 align-top font-medium">{row.data}</td>
                  <td className="px-4 py-3 align-top text-muted-foreground">
                    {row.purpose}
                  </td>
                  <td className="px-4 py-3 align-top text-muted-foreground">
                    {row.basis}
                  </td>
                  <td className="px-4 py-3 align-top text-muted-foreground">
                    {row.keep}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-semibold tracking-tight mb-3">{p.notTitle}</h2>
        <ul className="mb-12 space-y-2 text-sm text-muted-foreground">
          {p.notItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold tracking-tight mb-2">
          {p.rightsTitle}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">{p.rightsLead}</p>
        <div className="flex flex-wrap gap-2 mb-12">
          {p.rights.map((r) => (
            <a
              key={r.label}
              href={rightsMailto}
              className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 text-sm font-medium hover:border-primary/40"
            >
              {r.label}
            </a>
          ))}
        </div>

        <article className="rounded-2xl border border-border bg-card p-6 mb-10">
          <h2 className="text-lg font-semibold tracking-tight m-0">
            {p.appTitle}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 mb-4">{p.appBody}</p>
          <a
            href={APP_PRIVACY}
            className="text-primary underline underline-offset-2 text-sm font-medium"
          >
            {p.appCta}
          </a>
        </article>

        <h2 className="text-xl font-semibold tracking-tight mb-2">
          {p.controllerTitle}
        </h2>
        <p className="text-sm text-muted-foreground mb-8">{p.controllerBody}</p>

        <p className="text-sm">
          <Link to={ROUTES.contact} className="text-primary underline underline-offset-2">
            {t.footer.contact}
          </Link>
          {" · "}
          <a href={getContactMailtoUrl()} className="text-primary underline underline-offset-2">
            {SITE_CONTACT.email}
          </a>
        </p>
      </section>
    </PageShell>
  );
};

export default Privacy;
