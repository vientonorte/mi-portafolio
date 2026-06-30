import { useNavigate } from 'react-router-dom';
import { Projects } from '../components/organisms/Projects';

const Proyectos = () => {
  const navigate = useNavigate();
  return (
    <Projects
      onNavigateToCaseStudies={() => navigate('/cases')}
      onNavigateToProject={(id) => navigate(`/proyecto/${id}`)}
    />
  );
};

export default Proyectos;
