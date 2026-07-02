import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  CONSULTING_INDUSTRIES,
  CONSULTING_PACKAGES,
  CONSULTING_TIMELINES,
  buildConsultingContactMessage,
  type ConsultingPackageId,
} from "../../data/vientonorte-consulting";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { ROUTES } from "../../lib/routes";
import { cn } from "../../lib/utils";

const STEPS = ["welcome", "package", "context", "summary"] as const;
type StepId = (typeof STEPS)[number];

export function ConsultoriaOnboarding() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria;
  const prefersReducedMotion = useReducedMotion();

  const [stepIndex, setStepIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<ConsultingPackageId>("marco");
  const [industry, setIndustry] = useState(CONSULTING_INDUSTRIES[language][0]);
  const [timeline, setTimeline] = useState(CONSULTING_TIMELINES[language][1]);
  const [goal, setGoal] = useState("");

  const step = STEPS[stepIndex];
  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  const pkg = useMemo(
    () => CONSULTING_PACKAGES.find((p) => p.id === selectedPackage)!,
    [selectedPackage]
  );

  const canContinue =
    step === "welcome" ||
    step === "package" ||
    (step === "context" && goal.trim().length >= 20);

  const goNext = () => {
    if (stepIndex < STEPS.length - 1) setStepIndex((i) => i + 1);
  };

  const goBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const finish = () => {
    const message = buildConsultingContactMessage(language, pkg, industry, goal, timeline);
    navigate(ROUTES.contact, { state: { contactDraft: { message } } });
  };

  const stepTitle = t.steps[step];

  return (
    <section className="px-4 py-12 md:py-16" aria-labelledby="consultoria-onboarding-heading">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8 space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t.progressLabel} · {stepIndex + 1}/{STEPS.length}
          </p>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t.progressLabel}
          >
            <div
              className="h-full rounded-full bg-brand-gradient transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <h2 id="consultoria-onboarding-heading" className="text-2xl font-semibold tracking-tight">
            {stepTitle}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: 12 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
          >
            {step === "welcome" && (
              <Card className="border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
                <CardHeader>
                  <CardTitle>{t.welcome.title}</CardTitle>
                  <CardDescription>{t.welcome.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="rounded-lg border border-dashed border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                    {t.previewNote}
                  </p>
                  <ul className="space-y-3" role="list">
                    {t.welcome.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {step === "package" && (
              <div className="grid gap-4">
                {CONSULTING_PACKAGES.map((item) => {
                  const active = item.id === selectedPackage;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedPackage(item.id)}
                      className={cn(
                        "rounded-xl border-2 p-5 text-left transition-all",
                        active
                          ? "border-primary/50 bg-primary/5"
                          : "border-[color:var(--logo-surface-border)] bg-surface-matte-elevated hover:border-primary/25"
                      )}
                      aria-pressed={active}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-primary" aria-hidden />
                          <span className="text-lg font-semibold">{item.name[language]}</span>
                        </div>
                        {item.featured && (
                          <Badge className="bg-brand-gradient text-white hover:opacity-90">
                            {t.recommended}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{item.tagline[language]}</p>
                      <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-xs text-foreground/80">
                        <span>{item.duration[language]}</span>
                        <Badge variant="outline" className="font-sans text-[10px] uppercase tracking-wide">
                          {t.previewOnly}
                        </Badge>
                      </p>
                      <ul className="mt-4 space-y-1.5" role="list">
                        {item.deliverables[language].map((d) => (
                          <li key={d} className="text-sm text-muted-foreground">
                            · {d}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            )}

            {step === "context" && (
              <Card className="border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="consultoria-industry">{t.context.industry}</Label>
                    <div className="flex flex-wrap gap-2">
                      {CONSULTING_INDUSTRIES[language].map((opt) => (
                        <Button
                          key={opt}
                          type="button"
                          size="sm"
                          variant={industry === opt ? "default" : "outline"}
                          className={industry === opt ? "bg-brand-gradient hover:opacity-90" : ""}
                          onClick={() => setIndustry(opt)}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consultoria-timeline">{t.context.timeline}</Label>
                    <div className="flex flex-wrap gap-2">
                      {CONSULTING_TIMELINES[language].map((opt) => (
                        <Button
                          key={opt}
                          type="button"
                          size="sm"
                          variant={timeline === opt ? "default" : "outline"}
                          className={timeline === opt ? "bg-brand-gradient hover:opacity-90" : ""}
                          onClick={() => setTimeline(opt)}
                        >
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consultoria-goal">{t.context.goal}</Label>
                    <Textarea
                      id="consultoria-goal"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder={t.context.goalPlaceholder}
                      rows={5}
                      className="resize-y"
                    />
                    <p className="text-xs text-muted-foreground">{t.context.goalHint}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === "summary" && (
              <Card className="border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
                <CardHeader>
                  <CardTitle>{pkg.name[language]}</CardTitle>
                  <CardDescription>{pkg.tagline[language]}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p>
                    <span className="font-medium text-foreground">{t.context.industry}: </span>
                    {industry}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">{t.context.timeline}: </span>
                    {timeline}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">{t.context.goal}: </span>
                    {goal}
                  </p>
                  <p className="text-muted-foreground">{t.summary.note}</p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <Button type="button" variant="ghost" onClick={goBack} disabled={stepIndex === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden />
            {t.back}
          </Button>
          {step !== "summary" ? (
            <Button
              type="button"
              onClick={goNext}
              disabled={!canContinue}
              className="bg-brand-gradient font-semibold hover:opacity-90"
            >
              {t.next}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={finish}
              className="bg-brand-gradient font-semibold hover:opacity-90"
            >
              {t.summary.cta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}