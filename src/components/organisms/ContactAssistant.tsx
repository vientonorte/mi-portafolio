import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowLeft, Bot, Send, Shield, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import {
  buildAssistantContactMessage,
  type ContactIntent,
} from "../../lib/build-contact-message";
import { submitContactMessage } from "../../lib/submit-contact";
import { analytics } from "../../lib/analytics";
import { SITE_CONTACT } from "../../lib/site-contact";
import type { ConsultingPackageId } from "../../data/vientonorte-consulting";
import { cn } from "../ui/utils";

type StepId = "intent" | "detail" | "contact" | "review";

interface ContactAssistantProps {
  initialMessage?: string;
  onSuccess?: () => void;
}

function ChatBubble({
  role,
  children,
}: {
  role: "assistant" | "user";
  children: React.ReactNode;
}) {
  const isAssistant = role === "assistant";
  return (
    <div className={cn("flex gap-3", isAssistant ? "justify-start" : "justify-end")}>
      {isAssistant && (
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10"
          aria-hidden
        >
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:max-w-[85%]",
          isAssistant
            ? "rounded-tl-md border border-[color:var(--logo-surface-border)] bg-surface-matte text-foreground"
            : "rounded-tr-md bg-primary/15 text-foreground"
        )}
      >
        {children}
      </div>
      {!isAssistant && (
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted"
          aria-hidden
        >
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}

function OptionButton({
  children,
  onClick,
  selected,
}: {
  children: React.ReactNode;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <Button
      type="button"
      variant={selected ? "default" : "outline"}
      className={cn(
        "h-auto min-h-11 justify-start whitespace-normal px-4 py-3 text-left text-sm",
        selected && "bg-brand-gradient border-transparent"
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function ContactAssistant({ initialMessage = "", onSuccess }: ContactAssistantProps) {
  const { language } = useLanguage();
  const translations = useTranslation(language);
  const t = translations.contact;
  const a = t.assistant;
  const ctx = translations.consultoria.context;
  const prefersReducedMotion = useReducedMotion();

  const [step, setStep] = useState<StepId>("intent");
  const [intent, setIntent] = useState<ContactIntent | null>(null);
  const [recruiterMode, setRecruiterMode] = useState("");
  const [consultingQ1, setConsultingQ1] = useState("");
  const [packageId, setPackageId] = useState<ConsultingPackageId | undefined>();
  const [industry, setIndustry] = useState(a.industries[0]);
  const [timeline, setTimeline] = useState(a.timelines[1]);
  const [goal, setGoal] = useState(initialMessage);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [history, setHistory] = useState<Array<{ role: "assistant" | "user"; text: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [gotcha, setGotcha] = useState("");

  useEffect(() => {
    if (initialMessage) setGoal(initialMessage);
  }, [initialMessage]);

  const pushHistory = (role: "assistant" | "user", text: string) => {
    setHistory((prev) => [...prev, { role, text }]);
  };

  const draft = useMemo(
    () => ({
      intent: intent!,
      recruiterMode: recruiterMode || undefined,
      packageId,
      industry,
      timeline,
      goal,
    }),
    [intent, recruiterMode, packageId, industry, timeline, goal]
  );

  useEffect(() => {
    if (step === "review" && intent) {
      setMessage(buildAssistantContactMessage(language, draft));
    }
  }, [step, intent, language, draft]);

  const selectIntent = (value: ContactIntent) => {
    setIntent(value);
    pushHistory("user", a.intents[value]);
    pushHistory("assistant", stepQuestion("detail", value));
    setStep("detail");
  };

  const stepQuestion = (targetStep: StepId, currentIntent?: ContactIntent | null): string => {
    const i = currentIntent ?? intent;
    if (targetStep === "intent") return a.steps.intent;
    if (targetStep === "detail") {
      if (i === "recruiter") return a.steps.recruiter;
      if (i === "consulting") return consultingQ1 ? a.steps.consultingDepth : a.steps.consulting;
      if (i === "freelance") return a.steps.freelance;
      return a.steps.other;
    }
    if (targetStep === "contact") return a.steps.contact;
    return a.steps.review;
  };

  const resolveConsultingPackage = (q1: string, q2: string): ConsultingPackageId => {
    if (q1 === "team") return "ops";
    if (q1 === "portfolio") return q2 === "auditOnly" ? "radar" : "marco";
    return q2 === "iterate" ? "radar" : "marco";
  };

  const finishDetail = () => {
    pushHistory("assistant", a.steps.contact);
    setStep("contact");
  };

  const validateContact = () => {
    const next: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) next.name = t.form.errors.nameMin;
    if (!email.trim()) next.email = t.form.errors.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t.form.errors.emailInvalid;
    if (!consent) next.consent = t.form.consentRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goToReview = () => {
    if (!validateContact()) {
      toast.error(t.form.validationError);
      return;
    }
    pushHistory("user", `${name.trim()} · ${email.trim()}`);
    pushHistory("assistant", a.steps.review);
    setStep("review");
  };

  const handleSubmit = async () => {
    if (gotcha) return;
    if (!message.trim() || message.trim().length < 10) {
      toast.error(t.form.errors.messageMin);
      return;
    }
    if (!consent) {
      toast.error(t.form.consentRequired);
      return;
    }

    setIsSubmitting(true);
    try {
      const intentLabel = intent ? a.intents[intent] : "";
      const result = await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _gotcha: gotcha,
        source: "assistant",
        intent: intentLabel,
        consent: true,
        language,
      });

      if (result.ok) {
        analytics.submitContactForm(true);
        toast.success(a.success);
        onSuccess?.();
        return;
      }

      if (result.mailtoUrl) {
        analytics.submitContactForm(false);
        toast.error(t.form.mailtoFallback, {
          description: t.form.mailtoFallbackDesc,
          action: { label: t.form.mailtoAction, onClick: () => { window.location.href = result.mailtoUrl!; } },
        });
        return;
      }

      analytics.submitContactForm(false);
      toast.error(t.form.mailtoFallback, { description: SITE_CONTACT.email });
    } catch {
      analytics.submitContactForm(false);
      toast.error(t.form.mailtoFallback);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (step === "review") {
      setStep("contact");
      return;
    }
    if (step === "contact") {
      setStep("detail");
      return;
    }
    if (step === "detail") {
      setStep("intent");
      setIntent(null);
      setConsultingQ1("");
      setPackageId(undefined);
      setHistory([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{a.title}</h3>
          <p className="text-sm text-muted-foreground">{a.description}</p>
        </div>
        {step !== "intent" && (
          <Button type="button" variant="ghost" size="sm" onClick={goBack}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            {a.back}
          </Button>
        )}
      </div>

      <div
        className="max-h-[280px] space-y-4 overflow-y-auto rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte/50 p-4"
        aria-live="polite"
      >
        <ChatBubble role="assistant">{a.steps.intent}</ChatBubble>
        {history.map((line, i) => (
          <ChatBubble key={`${line.role}-${i}`} role={line.role}>
            {line.text}
          </ChatBubble>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {step === "intent" && (
            <div className="grid gap-2 sm:grid-cols-2">
              {(Object.keys(a.intents) as ContactIntent[]).map((key) => (
                <OptionButton key={key} onClick={() => selectIntent(key)}>
                  {a.intents[key]}
                </OptionButton>
              ))}
            </div>
          )}

          {step === "detail" && intent === "recruiter" && (
            <div className="space-y-3">
              <div className="grid gap-2">
                {Object.entries(a.recruiterModes).map(([key, label]) => (
                  <OptionButton
                    key={key}
                    selected={recruiterMode === label}
                    onClick={() => {
                      setRecruiterMode(label);
                      pushHistory("user", label);
                      finishDetail();
                    }}
                  >
                    {label}
                  </OptionButton>
                ))}
              </div>
            </div>
          )}

          {step === "detail" && intent === "consulting" && !consultingQ1 && (
            <div className="grid gap-2">
              {[
                { id: "portfolio", label: a.consultingPaths.portfolio },
                { id: "product", label: a.consultingPaths.product },
                { id: "team", label: a.consultingPaths.team },
              ].map((opt) => (
                <OptionButton
                  key={opt.id}
                  onClick={() => {
                    setConsultingQ1(opt.id);
                    pushHistory("user", opt.label);
                    if (opt.id === "team") {
                      setPackageId("ops");
                      pushHistory("assistant", a.steps.freelance);
                    } else {
                      pushHistory("assistant", a.steps.consultingDepth);
                    }
                  }}
                >
                  {opt.label}
                </OptionButton>
              ))}
            </div>
          )}

          {step === "detail" && intent === "consulting" && consultingQ1 && consultingQ1 !== "team" && !packageId && (
            <div className="grid gap-2">
              {(consultingQ1 === "portfolio"
                ? [
                    { id: "auditOnly", label: a.consultingPaths.auditOnly },
                    { id: "full", label: a.consultingPaths.full },
                  ]
                : [
                    { id: "launch", label: a.consultingPaths.early },
                    { id: "iterate", label: a.consultingPaths.growth },
                  ]
              ).map((opt) => (
                <OptionButton
                  key={opt.id}
                  onClick={() => {
                    const pkg = resolveConsultingPackage(consultingQ1, opt.id);
                    setPackageId(pkg);
                    pushHistory("user", opt.label);
                    pushHistory("assistant", a.steps.freelance);
                  }}
                >
                  {opt.label}
                </OptionButton>
              ))}
            </div>
          )}

          {step === "detail" && intent === "consulting" && (packageId || consultingQ1 === "team") && (
            <DetailFields
              industry={industry}
              timeline={timeline}
              goal={goal}
              industries={a.industries}
              timelines={a.timelines}
              industryLabel={ctx.industry}
              timelineLabel={ctx.timeline}
              goalLabel={ctx.goal}
              goalPlaceholder={a.goalPlaceholder}
              goalHint={a.goalHint}
              onIndustry={setIndustry}
              onTimeline={setTimeline}
              onGoal={setGoal}
              onContinue={() => {
                if (goal.trim().length < 20) {
                  toast.error(a.goalHint);
                  return;
                }
                pushHistory("user", goal.trim().slice(0, 120) + (goal.length > 120 ? "…" : ""));
                finishDetail();
              }}
              continueLabel={a.continue}
            />
          )}

          {step === "detail" && (intent === "freelance" || intent === "other") && (
            <DetailFields
              industry={industry}
              timeline={timeline}
              goal={goal}
              industries={a.industries}
              timelines={a.timelines}
              industryLabel={ctx.industry}
              timelineLabel={ctx.timeline}
              goalLabel={ctx.goal}
              goalPlaceholder={a.goalPlaceholder}
              goalHint={a.goalHint}
              onIndustry={setIndustry}
              onTimeline={setTimeline}
              onGoal={setGoal}
              onContinue={() => {
                if (goal.trim().length < 20) {
                  toast.error(a.goalHint);
                  return;
                }
                pushHistory("user", goal.trim().slice(0, 120) + (goal.length > 120 ? "…" : ""));
                finishDetail();
              }}
              continueLabel={a.continue}
            />
          )}

          {step === "contact" && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="assistant-name">{t.form.name}</Label>
                  <Input
                    id="assistant-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.form.namePlaceholder}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assistant-email">{t.form.email}</Label>
                  <Input
                    id="assistant-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.form.emailPlaceholder}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby="assistant-email-hint"
                  />
                  <p id="assistant-email-hint" className="text-xs text-muted-foreground">
                    {t.form.emailHint}
                  </p>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 p-3">
                <Checkbox
                  id="assistant-consent"
                  checked={consent}
                  onCheckedChange={(v) => setConsent(v === true)}
                  aria-invalid={!!errors.consent}
                />
                <Label htmlFor="assistant-consent" className="text-sm font-normal leading-snug cursor-pointer">
                  {t.form.consent}
                </Label>
              </div>
              {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}

              <p className="flex items-start gap-2 text-xs text-muted-foreground">
                <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                {a.privacyNote}
              </p>

              <input
                type="text"
                name="_gotcha"
                value={gotcha}
                onChange={(e) => setGotcha(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />

              <Button size="lg" className="w-full bg-brand-gradient hover:opacity-90" onClick={goToReview}>
                {a.continue}
              </Button>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{a.editMessage}</p>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                className="resize-none font-mono text-sm"
                aria-label={t.form.message}
              />
              <Button
                size="lg"
                className="w-full bg-brand-gradient hover:opacity-90"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? a.sending : a.send}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DetailFields({
  industry,
  timeline,
  goal,
  industries,
  timelines,
  industryLabel,
  timelineLabel,
  goalLabel,
  goalPlaceholder,
  goalHint,
  onIndustry,
  onTimeline,
  onGoal,
  onContinue,
  continueLabel,
}: {
  industry: string;
  timeline: string;
  goal: string;
  industries: readonly string[];
  timelines: readonly string[];
  industryLabel: string;
  timelineLabel: string;
  goalLabel: string;
  goalPlaceholder: string;
  goalHint: string;
  onIndustry: (v: string) => void;
  onTimeline: (v: string) => void;
  onGoal: (v: string) => void;
  onContinue: () => void;
  continueLabel: string;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>{industryLabel}</Label>
        <div className="flex flex-wrap gap-2">
          {industries.map((item) => (
            <Badge
              key={item}
              variant={industry === item ? "default" : "outline"}
              className="cursor-pointer px-3 py-1.5"
              onClick={() => onIndustry(item)}
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label>{timelineLabel}</Label>
        <div className="flex flex-wrap gap-2">
          {timelines.map((item) => (
            <Badge
              key={item}
              variant={timeline === item ? "default" : "outline"}
              className="cursor-pointer px-3 py-1.5"
              onClick={() => onTimeline(item)}
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="assistant-goal">{goalLabel}</Label>
        <Textarea
          id="assistant-goal"
          value={goal}
          onChange={(e) => onGoal(e.target.value)}
          placeholder={goalPlaceholder}
          rows={4}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">{goalHint}</p>
      </div>
      <Button size="lg" className="w-full" onClick={onContinue}>
        {continueLabel}
      </Button>
    </div>
  );
}