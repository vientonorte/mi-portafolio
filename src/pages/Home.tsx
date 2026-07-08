import { lazy, Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/organisms/Hero';
import { ImpactStats } from '../components/organisms/ImpactStats';
import { ProjectsTeaser } from '../components/organisms/ProjectsTeaser';
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
  const seo = useTranslation(language).seo;
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
      <Suspense fallback={<BelowFoldFallback />}>
        <ValueContentArsenal />
      </Suspense>
      <ProjectsTeaser onNavigateToCaseStudies={() => navigate(ROUTES.process)} />
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
