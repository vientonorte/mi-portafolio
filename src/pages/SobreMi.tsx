import { About } from '../components/organisms/About';
import { Skills } from '../components/organisms/Skills';
import { ProfileScope } from '../components/organisms/ProfileScope';
import { Experience } from '../components/organisms/Experience';
import { Volunteer } from '../components/organisms/Volunteer';
import { MetodoRoEvidence } from '../components/organisms/MetodoRoEvidence';
import { Testimonials } from '../components/organisms/Testimonials';
import { Contact } from '../components/organisms/Contact';
import { NavigablePrototypes } from '../components/organisms/NavigablePrototypes';
import { ProcessNavigation } from '../components/molecules/ProcessNavigation';
import { Breadcrumbs } from '../components/molecules/Breadcrumbs';

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
  const es = language === 'es';
  const aboutSections = [
    { id: 'sobre-mi', number: '01', label: es ? 'Perfil' : 'Profile' },
    { id: 'habilidades', number: '02', label: es ? 'Método' : 'Method' },
    { id: 'alcance', number: '03', label: es ? 'Alcance' : 'Scope' },
    { id: 'experiencia', number: '04', label: es ? 'Trayecto' : 'Timeline' },
    { id: 'voluntariado', number: '05', label: es ? 'Voluntariado' : 'Volunteer' },
    { id: 'evidencia-vn', number: '06', label: es ? 'Casos' : 'Cases' },
    { id: 'prototipos', number: '07', label: es ? 'Prototipos' : 'Prototypes' },
    { id: 'testimonios', number: '08', label: es ? 'Voces' : 'Voices' },
    { id: 'contacto', number: '09', label: es ? 'Contacto' : 'Contact' },
  ];

  useEffect(() => {
    const scrollTo = (location.state as SectionScrollState | null)?.scrollTo;
    if (!scrollTo) return;
    runPendingSectionScroll(scrollTo);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  return (
    <PageShell
      // Rail de secciones solo desde xl; entre 1280 y 1679px toda la ficha reserva su ancho (≈156px + right-6); desde 1680 el contenido ya lo libra.
      contentClassName="xl:pr-48 min-[1680px]:pr-0"
      crumbs={withHomeCrumb(t.breadcrumbs.home, () => navigate('/'), [
        { label: t.breadcrumbs.about, current: true },
      ])}
    >
      <SEOHead
        {...t.seo.pages.about}
        keywords={t.seo.keywords}
        url={canonicalFromPath('/sobre-mi')}
      />
      <ProcessNavigation
        sections={aboutSections}
        mobileAriaLabel={es ? 'Secciones de Sobre mí' : 'About sections'}
        desktopRailFrom="xl"
      />
      {/* Migas visibles de la ficha (BreadcrumbList JSON-LD en sobre-mi/index.html). Enlace HTTP a la home, nunca /#/. */}
      <div className="sobre-mi-breadcrumbs container mx-auto max-w-5xl px-4 pt-4 sm:pt-6">
        <Breadcrumbs
          className="mb-0"
          links={[
            { label: t.breadcrumbs.home, href: import.meta.env.BASE_URL || '/' },
            { label: t.breadcrumbs.about, current: true },
          ]}
        />
      </div>
      {/*
        L1 Perfil unificado (ficha + ciclo de decisión en un bloque)
        L2 Método + alcance
        L3 Timeline (VN con CTA a casos; micro1 queda en el trayecto) + voluntariado
        L4 Evidencia VN anclada al cargo
        Enterprise employment SURA/Transvip → /proyectos
      */}
      <About />
      <Skills />
      <ProfileScope />
      <Experience />
      <Volunteer />
      <MetodoRoEvidence />
      <NavigablePrototypes />
      <Testimonials />
      <Contact />
    </PageShell>
  );
};

export default SobreMi;
