import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/atoms/SEOHead';
import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/button';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { canonicalFromPath } from '../lib/seo';
import { withHomeCrumb } from '../lib/breadcrumb-helpers';

const AutosuggestFondos = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const page = t.autosuggestPage;

  return (
    <PageShell
      crumbs={withHomeCrumb(t.breadcrumbs.home, () => navigate('/'), [
        { label: t.breadcrumbs.projects, onClick: () => navigate('/proyectos') },
        { label: t.breadcrumbs.autosuggest, current: true },
      ])}
    >
      <SEOHead
        {...t.seo.pages.autosuggest}
        url={canonicalFromPath('/proyectos/autosuggest-fondos')}
        noIndex
      />
      <section className="container max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-black mb-4">{page.title}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-8">{page.body}</p>
        <Button
          className="bg-brand-gradient hover:opacity-90"
          onClick={() => navigate(`/proyecto/${page.relatedProjectId}`)}
        >
          {page.cta}
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
        </Button>
      </section>
    </PageShell>
  );
};

export default AutosuggestFondos;