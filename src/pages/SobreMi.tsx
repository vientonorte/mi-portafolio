import { About } from '../components/organisms/About';
import { Skills } from '../components/organisms/Skills';
import { MetodoRoEvidence } from '../components/organisms/MetodoRoEvidence';
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
      {/*
        Card-sort:
        L1 Perfil
        L2a Método en una mirada
        L2b Evidencia Método Ro · VN (NO galería general portafolio)
        L2c Alcance
        L3 Timeline · Contacto
        Enterprise SURA/Transvip/Karri → /proyectos
      */}
      <About />
      <Skills />
      <MetodoRoEvidence />
      <ProfileScope />
      <Experience />
      <Contact />
    </PageShell>
  );
};

export default SobreMi;
