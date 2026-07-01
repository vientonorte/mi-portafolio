import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/atoms/SEOHead';
import { Projects } from '../components/organisms/Projects';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';

const Proyectos = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.projects, current: true }]}>
      <SEOHead
        title="Proyectos y Casos"
        description="Casos de estudio SURA, Transvip y Karri con evidencia visual, métricas y profundidad de proceso UX."
      />
      <Projects
        onNavigateToCaseStudies={() => navigate('/cases')}
        onNavigateToProject={(id) => navigate(`/proyecto/${id}`)}
      />
    </PageShell>
  );
};

export default Proyectos;