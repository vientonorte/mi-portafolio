import { Link } from 'react-router-dom';
import { SEOHead } from '../components/atoms/SEOHead';
import { SITE_CONTACT, getContactMailtoUrl } from '../lib/site-contact';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { canonicalFromPath } from '../lib/seo';
import { ROUTES } from '../lib/routes';

const Privacy = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const p = t.privacyPage;

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.privacy, current: true }]}>
      <SEOHead
        {...t.seo.pages.privacy}
        url={canonicalFromPath(ROUTES.privacy)}
        noIndex
      />
      <section className="container max-w-3xl mx-auto px-6 py-16 prose prose-neutral dark:prose-invert">
        <h1 className="text-3xl font-black tracking-tight mb-2">{p.title}</h1>
        <p className="text-muted-foreground text-sm mb-8 not-prose">{p.updated}</p>

        <h2>{p.analytics.title}</h2>
        <p>{p.analytics.body}</p>

        <h2>{p.contact.title}</h2>
        <p>{p.contact.body}</p>

        <h2>{p.retention.title}</h2>
        <p>{p.retention.body}</p>

        <h2>{p.rights.title}</h2>
        <p>
          {p.rights.body}{' '}
          <a href={getContactMailtoUrl()}>{SITE_CONTACT.email}</a>.
        </p>

        <h2>{p.controller.title}</h2>
        <p>{p.controller.body}</p>

        <p className="not-prose text-sm text-muted-foreground">
          <Link to={ROUTES.contact} className="text-primary hover:underline">
            {t.footer.contact}
          </Link>
        </p>
      </section>
    </PageShell>
  );
};

export default Privacy;