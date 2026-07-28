import { Workflow } from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { Card, CardContent } from "../ui/card";
import { N2N_PHASES } from "../../data/n2n-method";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

interface ConsultoriaN2NMethodProps {
  onStartOnboarding?: () => void;
}

/**
 * Método N2N — solo fases (sin teaser X|CMS; demos viven en #consultoria-demo).
 */
export function ConsultoriaN2NMethod(_props: ConsultoriaN2NMethodProps) {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.n2n;

  return (
    <PageSection
      id="metodo-n2n"
      padding="default"
      width="wide"
      tone="section"
      atmosphere
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

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 list-none p-0 m-0">
        {N2N_PHASES.map((phase, index) => (
          <li key={phase.id} className="relative">
            <Card className="h-full border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
              <CardContent className="pt-5 space-y-2">
                <span className="font-mono text-xs tracking-widest text-foreground/80">
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
    </PageSection>
  );
}
