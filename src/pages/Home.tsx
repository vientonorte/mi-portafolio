import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/organisms/Hero';
import { ImpactStats } from '../components/organisms/ImpactStats';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero
        onNavigateToCaseStudies={() => navigate('/proyectos')}
        onNavigateToDesignSystem={() => navigate('/proyectos')}
      />
      <ImpactStats />
    </>
  );
};

export default Home;
