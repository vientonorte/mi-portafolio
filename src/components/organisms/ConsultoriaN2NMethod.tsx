import { ArrowRight, Workflow } from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { N2N_PHASES } from "../../data/n2n-method";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";

interface ConsultoriaN2NMethodProps {
  onStartOnboarding?: () => void;
}

/**
 * Método N2N (fases) + teaser compacto al demo.
 * Embed y links externos viven solo en ConsultoriaDemoShowcase (#consultoria-demo).
 */
export function ConsultoriaN2NMethod({ onStartOnboarding }: ConsultoriaN2NMethodProps) {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.n2n;

  const scrollToDemo = () => {
    trackEvent("consultoria_n2n_demo", { target: "section_anchor" });
    document.getElementById("consultoria-demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageSection
      id="metodo-n2n"
      padding="default"
      width="wide"
      tone="section"
      aria-labelledby="metodo-n2n-heading"
    >
      <SectionHeader
        badge={t.badge}
        badgeIcon={Workflow}
        title={t.title}
        description={t.description}
        titleId="metodo-n2n-heading"
        align="left"
      />

      <ol className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 list-none p-0 m-0">
        {N2N_PHASES.map((phase, index) => (
          <li key={phase.id} className="relative">
            <Card className="h-full border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
              <CardContent className="pt-5 space-y-2">
                <span className="font-mono text-xs tracking-widest text-primary">
                  {phase.step}
                </span>
                <p className="text-sm font-semibold leading-snug">
                  {phase.title[language]}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {phase.outcome[language]}
                </p>
              </CardContent>
            </Card>
            {index < N2N_PHASES.length - 1 && (
              <span
                className="pointer-events-none absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-primary/40 lg:block"
                aria-hidden
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <div className="overflow-hidden rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5 max-w-xl">
            <Badge variant="outline" className="border-primary/25">
              {t.caseBadge}
            </Badge>
            <h3 className="text-base font-semibold tracking-tight md:text-lg">
              {t.caseTitle}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.caseDescription}
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap shrink-0">
            <Button
              size="lg"
              className="bg-brand-gradient font-semibold hover:opacity-90 min-h-[48px] focus-visible:ring-offset-2"
              onClick={scrollToDemo}
            >
              {t.ctaSection}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-[48px] border-[color:var(--logo-surface-border)] bg-background/70 hover:border-primary/25"
              onClick={() => {
                trackEvent("consultoria_n2n_cta", { action: "onboarding" });
                onStartOnboarding?.();
              }}
            >
              {t.ctaOnboarding}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
