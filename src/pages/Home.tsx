import { lazy, Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/organisms/Hero';
import { ImpactStats } from '../components/organisms/ImpactStats';
import { ROUTES } from '../lib/routes';
import { SEOHead } from '../components/atoms/SEOHead';
import { StructuredData } from '../components/atoms/StructuredData';
import { BackToTop } from '../components/molecules/BackToTop';
import { useLanguage } from '../lib/LanguageContext';
import { buildPortfolioStructuredData } from '../lib/structured-data';
import { canonicalFromPath } from '../lib/seo';
import { useTranslation } from '../lib/i18n';

const ValueContentArsenal = lazy(() =>
  import('../components/organisms/ValueContentArsenal').then((m) => ({ default: m.ValueContentArsenal }))
);
const AboutTeaser = lazy(() =>
  import('../components/organisms/AboutTeaser').then((m) => ({ default: m.AboutTeaser }))
);
const Testimonials = lazy(() =>
  import('../components/organisms/Testimonials').then((m) => ({ default: m.Testimonials }))
);
const Contact = lazy(() =>
  import('../components/organisms/Contact').then((m) => ({ default: m.Contact }))
);

function BelowFoldFallback() {
  return <div className="min-h-48 animate-pulse bg-muted/20" aria-hidden />;
}

const Home = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const seo = t.seo;
  // language y diccionario se actualizan juntos en setLanguage (sin carrera EN↔ES)
  const structuredData = useMemo(
    () => buildPortfolioStructuredData(language),
    [language]
  );

  return (
    <>
      <SEOHead
        {...seo.pages.home}
        isHome
        keywords={seo.keywords}
        url={canonicalFromPath('/')}
      />
      <StructuredData data={structuredData} />
      <Hero
        onNavigateToCaseStudies={() => navigate(ROUTES.process)}
        onNavigateToDesignSystem={() => navigate(ROUTES.designSystem)}
      />
      <ImpactStats />
      {/* Negocios / Impacto por empresa: hub completo en /proyectos (nav). Evita duplicar SURA/Transvip/Karri en home. */}
      <Suspense fallback={<BelowFoldFallback />}>
        <ValueContentArsenal />
      </Suspense>
      <Suspense fallback={<BelowFoldFallback />}>
        <AboutTeaser />
        <Testimonials />
        <Contact />
      </Suspense>
      <BackToTop />
    </>
  );
};

export default Home;
