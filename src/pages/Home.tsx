import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/organisms/Hero';
import { ImpactStats } from '../components/organisms/ImpactStats';
import { About } from '../components/organisms/About';
import { Projects } from '../components/organisms/Projects';
import { Experience } from '../components/organisms/Experience';
import { Contact } from '../components/organisms/Contact';
import { SEOHead } from '../components/atoms/SEOHead';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead 
        title="Portfolio Lead UX"
        description="Rodrigo Gaete — UX Lead / Senior Product Designer especializado en experiencia de usuario, design systems y research. Casos: SURA, Transvip, Karri."
      />
      <Hero
        onNavigateToCaseStudies={() => navigate('/cases')}
        onNavigateToDesignSystem={() => navigate('/design-system')}
      />
      <ImpactStats />
      <Projects onNavigateToCaseStudies={() => navigate('/cases')} />
      <About />
      <Experience />
      <Contact />
    </>
  );
};

export default Home;
