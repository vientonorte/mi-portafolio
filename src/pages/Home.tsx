import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/organisms/Hero';
import { ImpactStats } from '../components/organisms/ImpactStats';
import { About } from '../components/organisms/About';
import { Skills } from '../components/organisms/Skills';
import { Projects } from '../components/organisms/Projects';
import { Experience } from '../components/organisms/Experience';
import { Contact } from '../components/organisms/Contact';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero
        onNavigateToCaseStudies={() => navigate('/cases')}
        onNavigateToDesignSystem={() => navigate('/design-system')}
      />
      <ImpactStats />
      <About />
      <Skills />
      <Projects onNavigateToCaseStudies={() => navigate('/cases')} />
      <Experience />
      <Contact />
    </>
  );
};

export default Home;
