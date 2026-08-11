import { About } from '../components/organisms/About';
import { Skills } from '../components/organisms/Skills';
import { ProfileScope } from '../components/organisms/ProfileScope';
import { Experience } from '../components/organisms/Experience';
import { Contact } from '../components/organisms/Contact';

import { SEOHead } from '../components/atoms/SEOHead';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { canonicalFromPath } from '../lib/seo';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { withHomeCrumb } from '../lib/breadcrumb-helpers';
import { runPendingSectionScroll, type SectionScrollState } from '../lib/navigate-to-section';

const SobreMi = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = useTranslation(language);

  useEffect(() => {
    const scrollTo = (location.state as SectionScrollState | null)?.scrollTo;
    if (!scrollTo) return;
    runPendingSectionScroll(scrollTo);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

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
      {/* Card-sort L1 → L2 → L3
          1 Identidad + wall de interfaces
          2 Método (craft)
          3 Alcance (mercado / Latam+US / micro1) — segundo nivel tras método
          4 Timeline · 5 Contacto */}
      <About />
      <Skills />
      <ProfileScope />
      <Experience />
      <Contact />
    </PageShell>
  );
};

export default SobreMi;