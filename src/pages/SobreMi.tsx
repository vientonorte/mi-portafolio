import { About } from '../components/organisms/About';
import { Skills } from '../components/organisms/Skills';
import { Experience } from '../components/organisms/Experience';
import { SEOHead } from '../components/atoms/SEOHead';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { canonicalFromPath } from '../lib/seo';

const SobreMi = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.about, current: true }]}>
      <SEOHead
        {...t.seo.pages.about}
        keywords={t.seo.keywords}
        url={canonicalFromPath('/sobre-mi')}
      />
      <About />
      <Skills />
      <Experience />
    </PageShell>
  );
};

export default SobreMi;