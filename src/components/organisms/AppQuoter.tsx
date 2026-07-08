import { useMemo, useState } from "react";
import { Calculator, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import {
  calculateAppQuote,
  buildAppQuoterContactMessage,
  type QuoteResult,
} from "../../lib/app-quoter-engine";
import type { DeliverableTierId } from "../../lib/app-quoter-config";
import { ROUTES } from "../../lib/routes";
import { cn } from "../../lib/utils";
import { trackEvent } from "../../lib/analytics";

const BUDGET_MIN = 2_000;
const BUDGET_MAX = 100_000;
const BUDGET_STEP = 500;
const DEFAULT_BUDGET = 12_000;

const TIER_ORDER: DeliverableTierId[] = ["prototype", "web", "app", "enterprise"];

const FIT_STYLES = {
  comfortable: "bg-[color:var(--stat-tint-blue)] text-[color:var(--stat-tint-blue-fg)]",
  viable: "bg-primary/10 text-primary",
  tight: "bg-[color:var(--stat-tint-amber)] text-[color:var(--stat-tint-amber-fg)]",
  gap: "bg-destructive/10 text-destructive",
} as const;

interface AppQuoterProps {
  onRecommendPackage?: (packageId: QuoteResult["recommendedPackage"]) => void;
}

export function AppQuoter({ onRecommendPackage }: AppQuoterProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.appQuoter;

  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [tierId, setTierId] = useState<DeliverableTierId>("web");

  const quote = useMemo(() => calculateAppQuote(budget, tierId), [budget, tierId]);

  const formatBudget = (value: number) =>
    new Intl.NumberFormat(language === "es" ? "es-CL" : "en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const handleContact = () => {
    if (!quote) return;
    trackEvent("app_quoter_contact", {
      tier: quote.selectedTierId,
      fit: quote.fit,
      alignment: quote.alignmentScore,
    });
    onRecommendPackage?.(quote.recommendedPackage);
    const message = buildAppQuoterContactMessage(
      language,
      quote,
      t.tiers[quote.selectedTierId].label,
      t.fit[quote.fit],
      t.tiers[quote.affordableTierId].label
    );
    navigate(ROUTES.contact, {
      state: {
        contactDraft: {
          message,
          source: "quoter",
          intent: "consulting",
          packageId: quote.recommendedPackage,
        },
      },
    });
  };

  return (
    <section
      id="cotizador-app"
      className="border-y border-border/60 bg-surface-section px-4 py-12 md:py-16 scroll-mt-24"
      aria-labelledby="app-quoter-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 space-y-3 text-center md:text-left">
          <Badge variant="outline" className="border-primary/25 text-foreground">
            <Calculator className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden />
            {t.badge}
          </Badge>
          <h2 id="app-quoter-heading" className="text-2xl md:text-3xl font-semibold tracking-tight">
            {t.title}
          </h2>
          <p className="max-w-2xl text-muted-foreground">{t.description}</p>
          <p className="text-xs text-muted-foreground">{t.disclaimer}</p>
        </div>

        <Card className="border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-md">
          <CardContent className="space-y-8 p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <Label htmlFor="quoter-budget" className="text-base font-semibold text-foreground">
                  {t.budgetLabel}
                </Label>
                <p
                  id="quoter-budget-value"
                  className="font-mono text-xl font-semibold tabular-nums text-primary"
                  aria-live="polite"
                >
                  {formatBudget(budget)}
                </p>
              </div>
              <Slider
                id="quoter-budget"
                min={BUDGET_MIN}
                max={BUDGET_MAX}
                step={BUDGET_STEP}
                value={[budget]}
                onValueChange={([value]) => setBudget(value ?? DEFAULT_BUDGET)}
                aria-valuetext={formatBudget(budget)}
                className="py-2"
              />
              <div className="flex flex-wrap gap-2" role="group" aria-label={t.budgetPresetsLabel}>
                {[5_000, 15_000, 30_000, 60_000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBudget(preset)}
                    className={cn(
                      "min-h-[40px] rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      budget === preset
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-background/80 text-muted-foreground hover:border-primary/20"
                    )}
                  >
                    {formatBudget(preset)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">{t.expectationLabel}</p>
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label={t.expectationLabel}
              >
                {TIER_ORDER.map((id) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={tierId === id}
                    onClick={() => setTierId(id)}
                    className={cn(
                      "min-h-[44px] rounded-full border px-4 py-2 text-left text-sm font-medium transition-colors",
                      tierId === id
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-background/80 text-muted-foreground hover:border-primary/20 hover:text-foreground"
                    )}
                  >
                    <span className="block">{t.tiers[id].label}</span>
                    <span className="block text-[11px] font-normal opacity-80">
                      {t.tiers[id].hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {quote && (
              <div
                className="space-y-4 rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte p-5"
                aria-live="polite"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{t.result.alignment}</p>
                    <p className="text-2xl font-semibold tabular-nums text-foreground">
                      {quote.alignmentScore}%
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                      FIT_STYLES[quote.fit]
                    )}
                  >
                    {t.fit[quote.fit]}
                  </span>
                </div>

                <div
                  className="h-2 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                  aria-valuenow={quote.alignmentScore}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={t.result.alignment}
                >
                  <div
                    className="h-full rounded-full bg-brand-gradient transition-[width] duration-500"
                    style={{ width: `${quote.alignmentScore}%` }}
                  />
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t.result.summary[quote.fit]}
                </p>

                {(quote.fit === "gap" || quote.fit === "tight") && (
                  <div className="rounded-lg border border-border/80 bg-background/60 p-4 text-sm text-foreground">
                    <p className="font-medium">{t.result.affordableTitle}</p>
                    <p className="mt-1 text-muted-foreground">
                      {t.tiers[quote.affordableTierId].label} — {t.tiers[quote.affordableTierId].deliverable}
                    </p>
                    {quote.suggestedBudgetIncreasePercent && (
                      <p className="mt-2 text-muted-foreground">
                        {t.result.increaseHint
                          .replace("{low}", String(quote.suggestedBudgetIncreasePercent.low))
                          .replace("{high}", String(quote.suggestedBudgetIncreasePercent.high))}
                      </p>
                    )}
                  </div>
                )}

                {(quote.fit === "comfortable" || quote.fit === "viable") && (
                  <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                    {t.tiers[quote.selectedTierId].includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <Button
                  type="button"
                  size="lg"
                  className="w-full bg-brand-gradient font-semibold hover:opacity-90 sm:w-auto"
                  onClick={handleContact}
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