import { Contact } from '../components/organisms/Contact';
import { SEOHead } from '../components/atoms/SEOHead';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { canonicalFromPath } from '../lib/seo';

const Contacto = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.contact, current: true }]}>
      <SEOHead
        {...t.seo.pages.contact}
        keywords={t.seo.keywords}
        url={canonicalFromPath('/contacto')}
      />
      <Contact />
    </PageShell>
  );
};

export default Contacto;