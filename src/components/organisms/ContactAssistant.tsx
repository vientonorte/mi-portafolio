import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowLeft, Bot, CheckCircle2, Send, Shield, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { ContactConsentField } from "../molecules/ContactConsentField";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import {
  buildAssistantContactMessage,
  type ContactIntent,
} from "../../lib/build-contact-message";
import {
  draftBannerKey,
  mergeContactMessage,
  resolveAssistantInitialStep,
  shouldSkipAssistantWizard,
  type ContactAssistantStep,
  type ContactDraft,
  type ContactSharedIdentity,
} from "../../lib/contact-draft";
import { submitContactMessage } from "../../lib/submit-contact";
import { analytics } from "../../lib/analytics";
import {
  A11Y_FREE_SCHEDULE_URL,
  SITE_CONTACT,
} from "../../lib/site-contact";
import type { ConsultingPackageId } from "../../data/vientonorte-consulting";
import { FreeA11yScheduleCta } from "../molecules/FreeA11yScheduleCta";
import { cn } from "../ui/utils";

interface ContactAssistantProps {
  contactDraft?: ContactDraft | null;
  /** Embudo consultoría: intent fijo consulting; sin paso reclutador/freelance. */
  surface?: "default" | "consulting";
  surfaceAssistantTitle?: string;
  surfaceAssistantDescription?: string;
  sharedIdentity: ContactSharedIdentity;
  onIdentityChange: (patch: Partial<ContactSharedIdentity>) => void;
  sharedMessage: string;
  onMessageChange: (message: string) => void;
  gotcha: string;
  onGotchaChange: (value: string) => void;
  onSuccess?: () => void;
}

function detailQuestionForIntent(
  steps: {
    recruiter: string;
    consulting: string;
    consultingDepth: string;
    freelance: string;
    other: string;
  },
  intent: ContactIntent,
  consultingQ1?: string
): string {
  if (intent === "recruiter") return steps.recruiter;
  if (intent === "consulting") {
    return consultingQ1 ? steps.consultingDepth : steps.consulting;
  }
  if (intent === "freelance") return steps.freelance;
  return steps.other;
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
        "h-auto min-h-11 w-full justify-start whitespace-normal px-4 py-3 text-left text-sm sm:w-auto",
        selected && "bg-brand-gradient border-transparent"
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function ContactAssistant({
  contactDraft = null,
  surface = "default",
  surfaceAssistantTitle,
  surfaceAssistantDescription,
  sharedIdentity,
  onIdentityChange,
  sharedMessage,
  onMessageChange,
  gotcha,
  onGotchaChange,
  onSuccess,
}: ContactAssistantProps) {
  const { language } = useLanguage();
  const translations = useTranslation(language);
  const t = translations.contact;
  const a = t.assistant;
  const ctx = translations.consultoria.context;
  const prefersReducedMotion = useReducedMotion();

  const skipWizard = shouldSkipAssistantWizard(contactDraft);
  const bannerKey = draftBannerKey(contactDraft);
  /** Intent pre-seleccionado (embudo / CTA): no reabrir reclutador · freelance. */
  const intentLocked = Boolean(contactDraft?.intent) || surface === "consulting";
  const conversationTitle = contactDraft?.conversationTitle?.trim() || "";

  const [step, setStep] = useState<ContactAssistantStep>(() =>
    resolveAssistantInitialStep(contactDraft)
  );
  const [intent, setIntent] = useState<ContactIntent | null>(
    contactDraft?.intent ?? (surface === "consulting" ? "consulting" : null)
  );
  const [recruiterMode, setRecruiterMode] = useState(contactDraft?.recruiterMode ?? "");
  const [consultingQ1, setConsultingQ1] = useState(contactDraft?.consultingQ1 ?? "");
  const [packageId, setPackageId] = useState<ConsultingPackageId | undefined>(
    contactDraft?.packageId
  );
  const [industry, setIndustry] = useState(
    contactDraft?.industry ?? a.industries[0]
  );
  const [timeline, setTimeline] = useState(
    contactDraft?.timeline ?? a.timelines[1]
  );
  const [goal, setGoal] = useState("");
  const [history, setHistory] = useState<Array<{ role: "assistant" | "user"; text: string }>>(
    () => {
      if (skipWizard && bannerKey) {
        return [{ role: "assistant", text: a.draftBanner[bannerKey] }];
      }
      const lockedIntent =
        contactDraft?.intent ?? (surface === "consulting" ? "consulting" : null);
      // Intent fijo (embudo / CTA): salta menú laboral·freelance; arranca en el foco
      if (lockedIntent && !skipWizard) {
        if (intentLocked) {
          return [
            {
              role: "assistant",
              text: detailQuestionForIntent(
                a.steps,
                lockedIntent,
                contactDraft?.consultingQ1
              ),
            },
          ];
        }
        return [
          { role: "assistant", text: a.steps.intent },
          { role: "user", text: a.intents[lockedIntent] },
          {
            role: "assistant",
            text: detailQuestionForIntent(
              a.steps,
              lockedIntent,
              contactDraft?.consultingQ1
            ),
          },
        ];
      }
      return [];
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const stepQuestion = (targetStep: ContactAssistantStep, currentIntent?: ContactIntent | null): string => {
    const i = currentIntent ?? intent;
    if (targetStep === "intent") return a.steps.intent;
    if (targetStep === "detail") {
      if (i === "recruiter") return a.steps.recruiter;
      if (i === "consulting") return consultingQ1 ? a.steps.consultingDepth : a.steps.consulting;
      if (i === "freelance") return a.steps.freelance;
      return a.steps.other;
    }
    return a.steps.compose;
  };

  const resolveConsultingPackage = (q1: string, q2: string): ConsultingPackageId => {
    if (q1 === "team") return "ops";
    if (q1 === "portfolio") return q2 === "auditOnly" ? "radar" : "marco";
    return q2 === "iterate" ? "radar" : "marco";
  };

  const enterCompose = (options?: { generatedMessage?: string }) => {
    const generated =
      options?.generatedMessage ??
      (intent ? buildAssistantContactMessage(language, draft) : "");

    if (generated) {
      onMessageChange(mergeContactMessage(sharedMessage, generated, { preferCurrent: true }));
    }

    pushHistory("assistant", a.steps.compose);
    setStep("compose");
  };

  const selectIntent = (value: ContactIntent) => {
    setIntent(value);
    pushHistory("user", a.intents[value]);
    pushHistory("assistant", stepQuestion("detail", value));
    setStep("detail");
  };

  const validateCompose = () => {
    const next: Record<string, string> = {};
    if (!sharedIdentity.name.trim() || sharedIdentity.name.trim().length < 2) {
      next.name = t.form.errors.nameMin;
    }
    if (!sharedIdentity.email.trim()) next.email = t.form.errors.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sharedIdentity.email)) {
      next.email = t.form.errors.emailInvalid;
    }
    if (!sharedMessage.trim() || sharedMessage.trim().length < 10) {
      next.message = t.form.errors.messageMin;
    }
    if (!sharedIdentity.consent) next.consent = t.form.consentRequired;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (gotcha) return;
    if (!validateCompose()) {
      toast.error(t.form.validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const intentLabel = intent ? a.intents[intent] : "";
      const result = await submitContactMessage({
        name: sharedIdentity.name.trim(),
        email: sharedIdentity.email.trim(),
        message: sharedMessage.trim(),
        _gotcha: gotcha,
        source: "assistant",
        intent: intentLabel,
        conversationTitle: conversationTitle || undefined,
        consent: true,
        language,
      });

      if (result.ok) {
        analytics.submitContactForm(true, result.channel);
        const isFreeA11y =
          packageId === "radar" ||
          consultingQ1 === "radar-free" ||
          /accesibilidad|accessibility|radar-free|revisión gratis|free accessibility/i.test(
            sharedMessage
          );
        if (isFreeA11y) {
          analytics.generateLead({
            lead_type: "free_a11y",
            channel: result.channel ?? "contact_form",
            origin: "contact_assistant",
            package_id: "radar",
          });
        }
        if (isFreeA11y && A11Y_FREE_SCHEDULE_URL) {
          toast.success(a.success, {
            description:
              language === "es"
                ? "¿Prefieres un slot ahora? Agenda 30 min en Google Calendar."
                : "Prefer a slot now? Book 30 min on Google Calendar.",
            action: {
              label: language === "es" ? "Agendar" : "Book",
              onClick: () => {
                window.open(
                  A11Y_FREE_SCHEDULE_URL,
                  "_blank",
                  "noopener,noreferrer"
                );
              },
            },
          });
        } else {
          toast.success(a.success);
        }
        onSuccess?.();
        return;
      }

      if (result.mailtoUrl) {
        analytics.submitContactForm(false);
        toast.error(t.form.mailtoFallback, {
          description: t.form.mailtoFallbackDesc,
          action: {
            label: t.form.mailtoAction,
            onClick: () => {
              window.location.href = result.mailtoUrl!;
            },
          },
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
    if (step === "compose") {
      if (skipWizard) return;
      setStep("detail");
      return;
    }
    if (step === "detail") {
      // Embudo / CTA: no volver al menú laboral · freelance · otro
      if (intentLocked) return;
      setStep("intent");
      setIntent(null);
      setConsultingQ1("");
      setPackageId(contactDraft?.packageId);
      setHistory([]);
    }
  };

  const showBack =
    step !== "intent" &&
    !(step === "compose" && skipWizard) &&
    !(step === "detail" && intentLocked);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {surfaceAssistantTitle ?? a.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {skipWizard
              ? a.descriptionReady
              : (surfaceAssistantDescription ?? a.description)}
          </p>
        </div>
        {showBack && (
          <Button type="button" variant="ghost" size="sm" className="min-h-11 self-start" onClick={goBack}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            {a.back}
          </Button>
        )}
      </div>

      {/* Agenda Google visible en embudo (no solo toast post-submit) */}
      {A11Y_FREE_SCHEDULE_URL ? (
        <FreeA11yScheduleCta
          origin={
            surface === "consulting" ? "consultoria-contact" : "contact-assistant"
          }
          layout="compact"
        />
      ) : null}

      {!skipWizard && (
        <div
          className="max-h-[240px] space-y-4 overflow-y-auto rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte/50 p-4 sm:max-h-[280px]"
          aria-live="polite"
        >
          {/* Con intent fijo no mostramos la pregunta multi-intención */}
          {!intentLocked && (
            <ChatBubble role="assistant">{a.steps.intent}</ChatBubble>
          )}
          {history.map((line, i) => (
            <ChatBubble key={`${line.role}-${i}`} role={line.role}>
              {line.text}
            </ChatBubble>
          ))}
        </div>
      )}

      {skipWizard && bannerKey && (
        <div
          className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"
          role="status"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
          <p className="text-sm leading-relaxed">{a.draftBanner[bannerKey]}</p>
        </div>
      )}

      {(conversationTitle || packageId || contactDraft?.industry) && (
        <div
          className="flex flex-wrap items-center gap-2 rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated px-3 py-2.5"
          role="status"
          aria-label={conversationTitle || "Selección"}
        >
          {conversationTitle ? (
            <Badge
              variant="outline"
              className="font-mono text-[10px] uppercase tracking-wide"
            >
              {conversationTitle}
            </Badge>
          ) : null}
          {packageId ? (
            <span className="text-xs text-muted-foreground">
              {packageId}
              {contactDraft?.industry ? ` · ${contactDraft.industry}` : ""}
              {contactDraft?.timeline ? ` · ${contactDraft.timeline}` : ""}
            </span>
          ) : null}
        </div>
      )}

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
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {(Object.keys(a.intents) as ContactIntent[]).map((key) => (
                <OptionButton key={key} onClick={() => selectIntent(key)}>
                  {a.intents[key]}
                </OptionButton>
              ))}
            </div>
          )}

          {step === "detail" && intent === "recruiter" && (
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(a.recruiterModes).map(([key, label]) => (
                <OptionButton
                  key={key}
                  selected={recruiterMode === label}
                  onClick={() => {
                    setRecruiterMode(label);
                    pushHistory("user", label);
                    enterCompose({
                      generatedMessage: buildAssistantContactMessage(language, {
                        intent: "recruiter",
                        recruiterMode: label,
                      }),
                    });
                  }}
                >
                  {label}
                </OptionButton>
              ))}
            </div>
          )}

          {step === "detail" && intent === "consulting" && !consultingQ1 && (
            <div className="grid grid-cols-1 gap-2">
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
            <div className="grid grid-cols-1 gap-2">
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
                enterCompose();
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
                enterCompose();
              }}
              continueLabel={a.continue}
            />
          )}

          {step === "compose" && (
            <div className="space-y-5" aria-busy={isSubmitting}>
              <div>
                <h4 className="text-base font-semibold">{a.composeTitle}</h4>
                <p className="text-sm text-muted-foreground">{a.composeDescription}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assistant-message">
                  {t.form.message}{" "}
                  <span className="text-destructive" aria-hidden>*</span>
                </Label>
                <Textarea
                  id="assistant-message"
                  value={sharedMessage}
                  onChange={(e) => {
                    onMessageChange(e.target.value);
                    setErrors((prev) => ({ ...prev, message: "" }));
                  }}
                  rows={7}
                  className={`min-h-[160px] resize-y font-mono text-sm ${errors.message ? "border-destructive" : ""}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "assistant-message-error" : "assistant-message-hint"}
                />
                <p id="assistant-message-hint" className="text-xs text-muted-foreground">
                  {a.editMessage}
                </p>
                {errors.message && (
                  <p id="assistant-message-error" className="text-sm text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="assistant-name">{t.form.name}</Label>
                  <Input
                    id="assistant-name"
                    value={sharedIdentity.name}
                    onChange={(e) => {
                      onIdentityChange({ name: e.target.value });
                      setErrors((prev) => ({ ...prev, name: "" }));
                    }}
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
                    value={sharedIdentity.email}
                    onChange={(e) => {
                      onIdentityChange({ email: e.target.value });
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder={t.form.emailPlaceholder}
                    autoComplete="email"
                    inputMode="email"
                    aria-invalid={!!errors.email}
                    aria-describedby="assistant-email-hint"
                  />
                  <p id="assistant-email-hint" className="text-xs text-muted-foreground">
                    {t.form.emailHint}
                  </p>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
              </div>

              <ContactConsentField
                id="assistant-consent"
                checked={sharedIdentity.consent}
                onCheckedChange={(checked) => {
                  onIdentityChange({ consent: checked });
                  setErrors((prev) => ({ ...prev, consent: "" }));
                }}
                consentText={t.form.consent}
                privacyLinkLabel={t.form.consentPrivacyLink}
                error={errors.consent}
              />

              <p className="flex items-start gap-2 text-xs text-muted-foreground">
                <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                {a.privacyNote}
              </p>

              <input
                type="text"
                name="_gotcha"
                value={gotcha}
                onChange={(e) => onGotchaChange(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />

              <Button
                size="lg"
                className="w-full min-h-12 bg-brand-gradient hover:opacity-90"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
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
              className="cursor-pointer px-3 py-2 min-h-9"
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
              className="cursor-pointer px-3 py-2 min-h-9"
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
          className="min-h-[120px] resize-y"
        />
        <p className="text-xs text-muted-foreground">{goalHint}</p>
      </div>
      <Button size="lg" className="w-full min-h-12" onClick={onContinue}>
        {continueLabel}
      </Button>
    </div>
  );
}