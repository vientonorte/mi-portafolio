import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { GitBranch, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  CONSULTORIA_DECISION_TREE,
  DECISION_TREE_START,
  getDecisionPathLabels,
  type DecisionTreeNodeId,
} from "../../data/consultoria-decision-tree";
import { CONSULTING_PACKAGES, type ConsultingPackageId } from "../../data/vientonorte-consulting";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { cn } from "../../lib/utils";

interface ConsultoriaTreePreviewProps {
  onRecommendPackage?: (packageId: ConsultingPackageId) => void;
  onStartOnboarding?: () => void;
}

export function ConsultoriaTreePreview({
  onRecommendPackage,
  onStartOnboarding,
}: ConsultoriaTreePreviewProps) {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.treePreview;
  const prefersReducedMotion = useReducedMotion();

  const [path, setPath] = useState<DecisionTreeNodeId[]>([DECISION_TREE_START]);
  const currentId = path[path.length - 1];
  const currentNode = CONSULTORIA_DECISION_TREE[currentId];
  const pathLabels = useMemo(() => getDecisionPathLabels(language, path), [language, path]);

  const outcome = currentNode.outcome;
  const outcomePackage = outcome
    ? CONSULTING_PACKAGES.find((p) => p.id === outcome.packageId)
    : undefined;

  const selectOption = (nextId: DecisionTreeNodeId) => {
    setPath((prev) => [...prev, nextId]);
    const nextNode = CONSULTORIA_DECISION_TREE[nextId];
    if (nextNode.outcome?.packageId) {
      onRecommendPackage?.(nextNode.outcome.packageId);
    }
  };

  const reset = () => {
    setPath([DECISION_TREE_START]);
  };

  const startWithRecommendation = () => {
    if (outcome?.packageId) onRecommendPackage?.(outcome.packageId);
    onStartOnboarding?.();
  };

  return (
    <section
      id="arbol"
      className="border-y border-border/60 bg-muted/20 px-4 py-12 md:py-16 scroll-mt-24"
      aria-labelledby="consultoria-tree-heading"
    >
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8 space-y-2">
          <Badge variant="outline" className="border-primary/25 text-foreground">
            <GitBranch className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden />
            {t.badge}
          </Badge>
          <h2 id="consultoria-tree-heading" className="text-2xl font-semibold tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm text-muted-foreground">{t.description}</p>
        </div>

        {pathLabels.length > 0 && (
          <nav aria-label={t.pathLabel} className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground" role="list">
              {pathLabels.map((label, index) => (
                <li key={`${label}-${index}`} className="inline-flex items-center gap-2">
                  {index > 0 && <span aria-hidden className="text-border">→</span>}
                  <span className="rounded-full border border-border bg-background px-2.5 py-1 font-medium text-foreground">
                    {label}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Card className="border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div>
              <CardTitle className="text-lg">
                {outcome ? outcome.title[language] : currentNode.question?.[language]}
              </CardTitle>
              {outcome && (
                <CardDescription className="mt-2">{outcome.summary[language]}</CardDescription>
              )}
            </div>
            {path.length > 1 && (
              <Button type="button" variant="ghost" size="sm" onClick={reset} className="shrink-0">
                <RotateCcw className="mr-1.5 h-4 w-4" aria-hidden />
                {t.reset}
              </Button>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {!outcome && currentNode.options && (
              <ul className="space-y-2 border-l-2 border-primary/20 pl-4" role="list">
                {currentNode.options.map((option, index) => (
                  <motion.li
                    key={option.id}
                    initial={prefersReducedMotion ? undefined : { opacity: 0, x: -8 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      type="button"
                      onClick={() => selectOption(option.nextId)}
                      className={cn(
                        "w-full rounded-lg border border-[color:var(--logo-surface-border)] bg-surface-matte px-4 py-3 text-left text-sm font-medium text-foreground transition-colors",
                        "hover:border-primary/30 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      )}
                    >
                      {option.label[language]}
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}

            {outcome && outcomePackage && (
              <div className="space-y-4 rounded-xl border border-dashed border-border bg-muted/30 p-4">
                <p className="text-sm font-semibold text-foreground">{outcomePackage.name[language]}</p>
                <p className="text-sm text-muted-foreground">{outcomePackage.tagline[language]}</p>
                <ul className="space-y-1" role="list">
                  {outcomePackage.deliverables[language].map((item) => (
                    <li key={item} className="text-xs text-muted-foreground">
                      · {item}
                    </li>
                  ))}
                </ul>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
                  {t.previewOnly}
                </Badge>
                <Button
                  type="button"
                  className="w-full bg-brand-gradient font-semibold hover:opacity-90 sm:w-auto"
                  onClick={startWithRecommendation}
                >
                  {t.cta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}