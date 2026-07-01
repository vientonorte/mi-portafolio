import { motion } from "motion/react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { FLAGSHIP_CASE_STUDY_ID } from "../../data/flagship-case-study";
import { getProjectHeadlineMetrics } from "../../lib/project-metrics";

interface FlagshipCaseStudyProps {
  onReadCase: (projectId: string) => void;
}

export function FlagshipCaseStudy({ onReadCase }: FlagshipCaseStudyProps) {
  const { language } = useLanguage();
  const t = useTranslation(language).flagshipCaseStudy;
  const metrics = getProjectHeadlineMetrics(FLAGSHIP_CASE_STUDY_ID, language);

  return (
    <section
      id="flagship"
      className="scroll-mt-20 border-y border-primary/15 bg-gradient-to-b from-primary/5 to-transparent py-16 md:py-24 px-4"
      aria-labelledby="flagship-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10">
            <BookOpen className="mr-2 h-4 w-4" aria-hidden />
            {t.badge}
          </Badge>
          <h2 id="flagship-heading" className="text-3xl md:text-5xl font-black mb-4">
            {t.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="border-2 border-primary/20">
            <CardContent className="space-y-6 p-8">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-2">
                  {t.contextLabel}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{t.context}</p>
              </div>
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-2">
                  {t.challengeLabel}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{t.challenge}</p>
              </div>
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-2">
                  {t.processLabel}
                </h3>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {t.processSteps.map((step) => (
                    <li key={step} className="flex gap-2">
                      <span className="text-primary shrink-0">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border/60">
            <CardContent className="space-y-6 p-8">
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-2">
                  {t.solutionLabel}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{t.solution}</p>
              </div>
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-3">
                  {t.impactLabel}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center"
                    >
                      <div className="text-2xl font-black tabular-nums text-primary">
                        {metric.value}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                  <div className="col-span-2 rounded-lg border border-border/50 bg-muted/30 p-4 text-center">
                    <div className="text-2xl font-black tabular-nums text-primary">78%</div>
                    <div className="mt-1 text-xs text-muted-foreground">{t.adoptionLabel}</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-mono uppercase tracking-widest text-primary mb-2">
                  {t.learningsLabel}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {t.learnings.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                size="lg"
                className="w-full bg-brand-gradient hover:opacity-90"
                onClick={() => onReadCase(FLAGSHIP_CASE_STUDY_ID)}
              >
                {t.cta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}