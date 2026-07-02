import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/organisms/Hero';
import { ImpactStats } from '../components/organisms/ImpactStats';
import { AboutTeaser } from '../components/organisms/AboutTeaser';
import { ProjectsTeaser } from '../components/organisms/ProjectsTeaser';
import { Testimonials } from '../components/organisms/Testimonials';
import { Contact } from '../components/organisms/Contact';
import { ValueCarouselBanner } from '../components/organisms/ValueCarouselBanner';
import { ROUTES } from '../lib/routes';
import { SEOHead } from '../components/atoms/SEOHead';
import { StructuredData } from '../components/atoms/StructuredData';
import { BackToTop } from '../components/molecules/BackToTop';
import { useLanguage } from '../lib/LanguageContext';
import { buildPortfolioStructuredData } from '../lib/structured-data';
import { canonicalFromPath } from '../lib/seo';
import { useTranslation } from '../lib/i18n';

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
      <ProjectsTeaser onNavigateToCaseStudies={() => navigate(ROUTES.process)} />
      <ValueCarouselBanner
        onStartConsulting={() => navigate(ROUTES.consulting)}
        onViewSampleAudit={() => navigate(ROUTES.audit)}
      />
      <AboutTeaser />
      <Testimonials />
      <Contact />
      <BackToTop />
    </>
  );
};

export default Home;
