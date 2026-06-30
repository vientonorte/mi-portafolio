import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/atoms/SEOHead';
import { CaseStudiesGrid } from '../components/organisms/CaseStudiesGrid';
import { Projects } from '../components/organisms/Projects';

const Proyectos = () => {
  const navigate = useNavigate();
  return (
    <>
      <SEOHead
        title="Proyectos y Casos"
        description="Casos de estudio SURA, Transvip y Karri con evidencia visual, métricas y profundidad de proceso UX."
      />
      <CaseStudiesGrid />
      <Projects
        onNavigateToCaseStudies={() => navigate('/cases')}
        onNavigateToProject={(id) => navigate(`/proyecto/${id}`)}
      />
    </>
  );
};

export default Proyectos;