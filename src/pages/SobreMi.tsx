import { About } from '../components/organisms/About';
import { Skills } from '../components/organisms/Skills';
import { Experience } from '../components/organisms/Experience';
import { SEOHead } from '../components/atoms/SEOHead';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { canonicalFromPath } from '../lib/seo';
import { useNavigate } from 'react-router-dom';
import { withHomeCrumb } from '../lib/breadcrumb-helpers';

const SobreMi = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <PageShell
      crumbs={withHomeCrumb(t.breadcrumbs.home, () => navigate('/'), [
        { label: t.breadcrumbs.about, current: true },
      ])}
    >
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