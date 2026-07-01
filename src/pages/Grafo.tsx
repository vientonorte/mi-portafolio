import GrafoMVP from '../components/GrafoMVP';
import { SEOHead } from '../components/atoms/SEOHead';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';

const Grafo = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.grafo, current: true }]}>
      <SEOHead
        title="Red de Fricción Institucional"
        description="Grafo de relaciones y fricción institucional — investigación territorial."
        noIndex
      />
      <section className="container max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black mb-8">Red de Fricción Institucional</h1>
        <GrafoMVP />
      </section>
    </PageShell>
  );
};

export default Grafo;