import { useNavigate } from 'react-router-dom';
import { Projects } from '../components/organisms/Projects';

const Proyectos = () => {
  const navigate = useNavigate();
  return <Projects onNavigateToCaseStudies={() => navigate('/cases')} />;
};

export default Proyectos;
