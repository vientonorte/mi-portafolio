import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/organisms/Hero';
import { ImpactStats } from '../components/organisms/ImpactStats';
import { About } from '../components/organisms/About';
import { Projects } from '../components/organisms/Projects';
import { Experience } from '../components/organisms/Experience';
import { Contact } from '../components/organisms/Contact';
import { SEOHead } from '../components/atoms/SEOHead';
import { BackToTop } from '../components/molecules/BackToTop';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead 
        title="Rodrigo Gaete — UX Lead Fintech & Mobility"
        description="UX Lead especializado en fintech y movilidad enterprise: onboarding digital, design systems y research en entornos regulados. Casos verificables en SURA, Transvip y Karri."
      />
      <Hero
        onNavigateToCaseStudies={() => navigate('/cases')}
        onNavigateToDesignSystem={() => navigate('/design-system')}
      />
      <ImpactStats />
      <Projects
        onNavigateToCaseStudies={() => navigate('/cases')}
        onNavigateToProject={(id) => navigate(`/proyecto/${id}`)}
      />
      <About />
      <Experience />
      <Contact />
      <BackToTop />
    </>
  );
};

export default Home;
