import { About } from '../components/organisms/About';
import { Skills } from '../components/organisms/Skills';
import { ProfileScope } from '../components/organisms/ProfileScope';
import { Experience } from '../components/organisms/Experience';
import { MetodoRoEvidence } from '../components/organisms/MetodoRoEvidence';
import { Micro1ToolEvidence } from '../components/organisms/Micro1ToolEvidence';
import { Testimonials } from '../components/organisms/Testimonials';
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
        L1 Perfil
        L2 Método + alcance
        L3 Timeline (VN / micro1 con CTA a evidencia)
        L4 Evidencias ancladas al cargo (no galería general)
           - #evidencia-vn  → UX Manager VN (Monitas, Edu21, funnels, FO)
           - #evidencia-micro1 → Anotación + QA grabación
        Enterprise employment SURA/Transvip → /proyectos
      */}
      <About />
      <Skills />
      <ProfileScope />
      <Experience />
      <MetodoRoEvidence />
      <Micro1ToolEvidence />
      <Testimonials />
      <Contact />
    </PageShell>
  );
};

export default SobreMi;
