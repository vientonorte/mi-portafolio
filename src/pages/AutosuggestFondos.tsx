import { ArrowRight, Search, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/atoms/SEOHead';
import { PageSection } from '../components/layout/PageSection';
import { PageShell } from '../components/layout/PageShell';
import { SectionHeader } from '../components/molecules/SectionHeader';
import { StatCard } from '../components/molecules/StatCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { getPortfolioImages } from '../lib/image-overrides';
import { canonicalFromPath } from '../lib/seo';
import { withHomeCrumb } from '../lib/breadcrumb-helpers';

const AutosuggestFondos = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const page = t.autosuggestPage;
  const images = getPortfolioImages();

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
      />

      <PageSection padding="spacious" width="narrow" tone="matte">
        <SectionHeader
          badge={page.badge}
          badgeIcon={Search}
          title={page.title}
          description={page.subtitle}
          align="left"
          titleId="autosuggest-heading"
        />
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">{page.intro}</p>
      </PageSection>

      <PageSection padding="compact" width="content" tone="default">
        <div className="metric-card-grid">
          {page.metrics.map((metric, index) => (
            <StatCard key={metric.label} value={metric.value} label={metric.label} index={index} />
          ))}
        </div>
      </PageSection>

      <PageSection padding="default" width="content" tone="section">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-8">
            <article aria-labelledby="autosuggest-challenge">
              <h2 id="autosuggest-challenge" className="text-2xl font-semibold mb-3">
                {page.sections.challenge.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{page.sections.challenge.body}</p>
            </article>

            <article aria-labelledby="autosuggest-approach">
              <h2 id="autosuggest-approach" className="text-2xl font-semibold mb-3">
                {page.sections.approach.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{page.sections.approach.body}</p>
              <ul className="space-y-3">
                {page.sections.approach.items.map((item) => (
                  <li key={item} className="flex gap-3 text-foreground/90">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <Card className="overflow-hidden border-border/60 shadow-lg">
            <img
              src={images.sura.webPrototype}
              alt={page.title}
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {['Fintech', 'Autosuggest', 'A11y', 'Progressive disclosure'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <article aria-labelledby="autosuggest-outcomes">
                <h2 id="autosuggest-outcomes" className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" aria-hidden />
                  {page.sections.outcomes.title}
                </h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {page.sections.outcomes.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </CardContent>
          </Card>
        </div>
      </PageSection>

      <PageSection padding="compact" width="narrow" tone="muted">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-brand-gradient hover:opacity-90"
            onClick={() => navigate(`/proyecto/${page.relatedProjectId}`)}
          >
            {page.cta}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate(`/proceso/fase/${page.processId}`)}
          >
            {page.ctaSecondary}
          </Button>
        </div>
      </PageSection>
    </PageShell>
  );
};

export default AutosuggestFondos;