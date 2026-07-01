import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/atoms/SEOHead';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { canonicalFromPath } from '../lib/seo';

const AutosuggestFondos = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <PageShell
      crumbs={[
        { label: t.breadcrumbs.projects, onClick: () => navigate('/proyectos') },
        { label: t.breadcrumbs.autosuggest, current: true },
      ]}
    >
      <SEOHead
        {...t.seo.pages.autosuggest}
        url={canonicalFromPath('/proyectos/autosuggest-fondos')}
        noIndex
      />
      <section className="container max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-black mb-4">Autosuggest Fondos</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Caso flagship: próximamente detalle completo con decisiones, trade-offs y KPIs.
        </p>
      </section>
    </PageShell>
  );
};

export default AutosuggestFondos;