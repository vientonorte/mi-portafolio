import { useMemo, useState } from "react";
import { Calculator, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import {
  calculateAppQuote,
  buildAppQuoterContactMessage,
  type QuoteResult,
} from "../../lib/app-quoter-engine";
import {
  DEFAULT_QUOTER_CURRENCY,
  QUOTER_CURRENCIES,
  SLIDER_BY_CURRENCY,
  convertDisplayAmount,
  formatQuoterAmount,
  toUsd,
  type QuoterCurrency,
} from "../../lib/app-quoter-currency";
import type { DeliverableTierId } from "../../lib/app-quoter-config";
import { navigateToContactAssistant } from "../../lib/navigate-to-contact";
import { cn } from "../../lib/utils";
import { trackEvent } from "../../lib/analytics";

const TIER_ORDER: DeliverableTierId[] = ["prototype", "web", "app", "enterprise"];

const FIT_STYLES = {
  comfortable: "bg-[color:var(--stat-tint-blue)] text-[color:var(--stat-tint-blue-fg)]",
  viable: "bg-primary/10 text-primary",
  tight: "bg-[color:var(--stat-tint-amber)] text-[color:var(--stat-tint-amber-fg)]",
  gap: "bg-destructive/10 text-destructive",
} as const;

interface AppQuoterProps {
  onRecommendPackage?: (packageId: QuoteResult["recommendedPackage"]) => void;
  /** Kickoff en la misma página (onboarding) — app incluye red */
  onStartKickoff?: (
    packageId: QuoteResult["recommendedPackage"],
    options?: { appGoal?: boolean }
  ) => void;
}

export function AppQuoter({
  onRecommendPackage,
  onStartKickoff,
}: AppQuoterProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.appQuoter;

  const [currency, setCurrency] = useState<QuoterCurrency>(DEFAULT_QUOTER_CURRENCY);
  const slider = SLIDER_BY_CURRENCY[currency];
  const [budgetDisplay, setBudgetDisplay] = useState(
    () => SLIDER_BY_CURRENCY[DEFAULT_QUOTER_CURRENCY].defaultValue
  );
  const [tierId, setTierId] = useState<DeliverableTierId>("web");

  const budgetUsd = useMemo(
    () => toUsd(budgetDisplay, currency),
    [budgetDisplay, currency]
  );

  const quote = useMemo(
    () =>
      calculateAppQuote(budgetUsd, tierId, {
        currency,
        budgetDisplay,
      }),
    [budgetUsd, budgetDisplay, currency, tierId]
  );

  const formatBudget = (value: number) =>
    formatQuoterAmount(value, currency, language);

  const handleCurrencyChange = (next: QuoterCurrency) => {
    if (next === currency) return;
    const converted = convertDisplayAmount(budgetDisplay, currency, next);
    setCurrency(next);
    setBudgetDisplay(converted);
    trackEvent("app_quoter_currency", { currency: next });
  };

  const handleContact = () => {
    if (!quote) return;
    const isApp = quote.selectedTierId === "app" || quote.requiresNetwork;
    trackEvent("app_quoter_contact", {
      tier: quote.selectedTierId,
      fit: quote.fit,
      alignment: quote.alignmentScore,
      currency: quote.currency,
      app: isApp,
    });
    onRecommendPackage?.(quote.recommendedPackage);

    if (onStartKickoff) {
      onStartKickoff(quote.recommendedPackage, {
        appGoal: isApp,
      });
      return;
    }

    const message = buildAppQuoterContactMessage(
      language,
      quote,
      t.tiers[quote.selectedTierId].label,
      t.fit[quote.fit],
      t.tiers[quote.affordableTierId].label
    );
    navigateToContactAssistant(navigate, {
      origin: "quoter",
      source: "quoter",
      intent: "consulting",
      packageId: quote.recommendedPackage,
      message,
    });
  };

  return (
    <section
      id="cotizador"
      className="section-pad-default scroll-mt-[calc(var(--header-height)+0.75rem)] border-y border-border/60 bg-surface-section"
      aria-labelledby="app-quoter-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 space-y-3 text-center md:text-left">
          <Badge variant="outline" className="border-primary/25 text-foreground">
            <Calculator className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden />
            {t.badge}
          </Badge>
          <h2
            id="app-quoter-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            {t.title}
          </h2>
          <p className="max-w-2xl text-muted-foreground">{t.description}</p>
          <p className="text-xs text-muted-foreground">{t.disclaimer}</p>
        </div>

        <Card className="border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-md">
          <CardContent className="space-y-8 p-6 md:p-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="space-y-2">
                  <Label
                    htmlFor="quoter-currency"
                    className="text-base font-semibold text-foreground"
                  >
                    {t.currencyLabel}
                  </Label>
                  <Select
                    value={currency}
                    onValueChange={(v) => handleCurrencyChange(v as QuoterCurrency)}
                  >
                    <SelectTrigger
                      id="quoter-currency"
                      className="w-[11rem] min-h-[44px] bg-background"
                      aria-label={t.currencyLabel}
                    >
                      <SelectValue placeholder={t.currencyLabel} />
                    </SelectTrigger>
                    <SelectContent>
                      {QUOTER_CURRENCIES.map((code) => (
                        <SelectItem key={code} value={code}>
                          {t.currencies[code]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p
                  id="quoter-budget-value"
                  className="font-mono text-xl font-semibold tabular-nums text-primary"
                  aria-live="polite"
                >
                  {formatBudget(budgetDisplay)}
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="quoter-budget"
                  className="text-sm font-medium text-foreground"
                >
                  {t.budgetLabel}
                </Label>
                <Slider
                  id="quoter-budget"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={[budgetDisplay]}
                  onValueChange={([value]) =>
                    setBudgetDisplay(value ?? slider.defaultValue)
                  }
                  aria-valuetext={formatBudget(budgetDisplay)}
                  className="py-2"
                />
              </div>

              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label={t.budgetPresetsLabel}
              >
                {slider.presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBudgetDisplay(preset)}
                    className={cn(
                      "min-h-[40px] rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      budgetDisplay === preset
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-background/80 text-muted-foreground hover:border-primary/20"
                    )}
                  >
                    {formatBudget(preset)}
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {t.fxNote}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                {t.expectationLabel}
              </p>
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
                    <p className="text-sm font-medium text-foreground">
                      {t.result.alignment}
                    </p>
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

                {quote.requiresNetwork && (
                  <p
                    className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm leading-relaxed text-foreground"
                    role="note"
                  >
                    {t.networkNote}
                  </p>
                )}

                {(quote.fit === "gap" || quote.fit === "tight") && (
                  <div className="rounded-lg border border-border/80 bg-background/60 p-4 text-sm text-foreground">
                    <p className="font-medium">{t.result.affordableTitle}</p>
                    <p className="mt-1 text-muted-foreground">
                      {t.tiers[quote.affordableTierId].label} —{" "}
                      {t.tiers[quote.affordableTierId].deliverable}
                    </p>
                    {quote.suggestedBudgetIncreasePercent && (
                      <p className="mt-2 text-muted-foreground">
                        {t.result.increaseHint
                          .replace(
                            "{low}",
                            String(quote.suggestedBudgetIncreasePercent.low)
                          )
                          .replace(
                            "{high}",
                            String(quote.suggestedBudgetIncreasePercent.high)
                          )}
                      </p>
                    )}
                  </div>
                )}

                {(quote.fit === "comfortable" || quote.fit === "viable") && (
                  <ul
                    className="space-y-2 text-sm text-muted-foreground"
                    role="list"
                  >
                    {t.tiers[quote.selectedTierId].includes.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Sparkles
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                          aria-hidden
                        />
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
