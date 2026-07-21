import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ContactConsentField } from "../molecules/ContactConsentField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Mail, Link, MapPin, Send, Clock, Bot, PenLine, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { ContactAssistant } from "./ContactAssistant";
import { SITE_CONTACT, getContactMailtoUrl } from "../../lib/site-contact";
import { submitContactMessage } from "../../lib/submit-contact";
import { analytics } from "../../lib/analytics";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import {
  emptyContactIdentity,
  type ContactDraft,
  type ContactSharedIdentity,
  type ContactTab,
} from "../../lib/contact-draft";
import {
  clearContactSession,
  readContactSession,
  writeContactSession,
} from "../../lib/contact-draft-storage";
import { consumeLeadIntent } from "../../lib/lead-intent";

const socialLinks = [
  {
    icon: Link,
    label: "LinkedIn",
    href: SITE_CONTACT.linkedin,
  },
];

export function Contact({ contactDraft = null }: { contactDraft?: ContactDraft | null }) {
  const { language } = useLanguage();
  const t = useTranslation(language).contact;

  const sessionSnapshot = readContactSession();
  /** Landing reduce ruido: default to form (not assistant) */
  const [activeTab, setActiveTab] = useState<ContactTab>(() =>
    contactDraft ? "assistant" : (sessionSnapshot?.activeTab ?? "form")
  );
  const [sharedIdentity, setSharedIdentity] = useState<ContactSharedIdentity>(() => ({
    name: sessionSnapshot?.name ?? "",
    email: sessionSnapshot?.email ?? "",
    consent: false,
  }));
  const [sharedMessage, setSharedMessage] = useState(
    contactDraft?.message ?? sessionSnapshot?.message ?? ""
  );
  const [gotcha, setGotcha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Prefill from package/demo CTAs (once per mount)
  useEffect(() => {
    const intent = consumeLeadIntent();
    if (intent) {
      setSharedMessage((prev) => (prev.trim() ? prev : intent));
      setActiveTab("form");
    }
  }, []);

  useEffect(() => {
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => {
      if (!sharedIdentity.name && !sharedIdentity.email && !sharedMessage.trim()) {
        clearContactSession();
        return;
      }
      writeContactSession({
        name: sharedIdentity.name,
        email: sharedIdentity.email,
        message: sharedMessage,
        activeTab,
      });
    }, 280);

    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [activeTab, sharedIdentity.email, sharedIdentity.name, sharedMessage]);

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateDirectForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!sharedIdentity.name.trim()) newErrors.name = t.form.errors.nameRequired;
    else if (sharedIdentity.name.trim().length < 2) newErrors.name = t.form.errors.nameMin;

    if (!sharedIdentity.email.trim()) newErrors.email = t.form.errors.emailRequired;
    else if (!validateEmail(sharedIdentity.email)) newErrors.email = t.form.errors.emailInvalid;

    if (!sharedMessage.trim()) newErrors.message = t.form.errors.messageRequired;
    else if (sharedMessage.trim().length < 10) newErrors.message = t.form.errors.messageMin;

    if (!sharedIdentity.consent) newErrors.consent = t.form.consentRequired;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (gotcha) return;

    if (!validateDirectForm()) {
      toast.error(t.form.validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitContactMessage({
        name: sharedIdentity.name,
        email: sharedIdentity.email,
        message: sharedMessage,
        _gotcha: gotcha,
        source: "form",
        consent: sharedIdentity.consent,
        language,
      });

      if (result.ok) {
        analytics.submitContactForm(true, result.channel);
        toast.success(t.form.success);
        setSharedIdentity(emptyContactIdentity());
        setSharedMessage("");
        setGotcha("");
        setErrors({});
        clearContactSession();
        return;
      }

      if (result.mailtoUrl) {
        analytics.submitContactForm(false);
        toast.error(t.form.mailtoFallback, {
          description: t.form.mailtoFallbackDesc,
          duration: 12000,
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
      toast.error(t.form.mailtoFallback, {
        description: `${SITE_CONTACT.email} · LinkedIn`,
      });
    } catch {
      analytics.submitContactForm(false);
      toast.error(t.form.mailtoFallback, {
        description: t.form.mailtoFallbackDesc,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateIdentity = (patch: Partial<ContactSharedIdentity>) => {
    setSharedIdentity((prev) => ({ ...prev, ...patch }));
    if (patch.name !== undefined) setErrors((e) => ({ ...e, name: "" }));
    if (patch.email !== undefined) setErrors((e) => ({ ...e, email: "" }));
    if (patch.consent !== undefined) setErrors((e) => ({ ...e, consent: "" }));
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name" || name === "email") {
      updateIdentity({ [name]: value });
      return;
    }
    if (name === "message") {
      setSharedMessage(value);
      setErrors((prev) => ({ ...prev, message: "" }));
      return;
    }
    if (name === "_gotcha") setGotcha(value);
  };

  return (
    <PageSection id="contacto" padding="compact" width="wide" aria-labelledby="contact-heading">
        <div className="text-center mb-8">
          <SectionHeader
            badge={t.badge}
            badgeIcon={Send}
            title={t.title}
            description={t.description}
            titleId="contact-heading"
          />
          <Badge variant="secondary" className="mt-4">
            <Clock className="mr-2 h-3 w-3" />
            {t.responseBadge}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">{t.info.title}</CardTitle>
                  <CardDescription>{t.info.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">{t.info.email}</p>
                      <a
                        href={getContactMailtoUrl()}
                        className="hover:text-primary transition-colors break-all"
                      >
                        {SITE_CONTACT.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t.info.modality}</p>
                      <p>{t.info.modalityValue}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">{t.info.follow}</p>
                    <div className="flex gap-2">
                      {socialLinks.map((social) => (
                        <Button
                          key={social.label}
                          variant="outline"
                          size="icon"
                          asChild
                          className="hover:border-primary hover:text-primary transition-all"
                        >
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`LinkedIn`}
                          >
                            <social.icon className="h-4 w-4" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardContent className="pt-6">
                <Tabs
                  value={activeTab}
                  onValueChange={(value) => setActiveTab(value as ContactTab)}
                  className="w-full"
                >
                  <TabsList className="mb-6 grid w-full grid-cols-2 sm:w-auto sm:inline-flex">
                    <TabsTrigger value="assistant" className="gap-2 min-h-11">
                      <Bot className="h-4 w-4" />
                      {t.tabs.assistant}
                    </TabsTrigger>
                    <TabsTrigger value="form" className="gap-2 min-h-11">
                      <PenLine className="h-4 w-4" />
                      {t.tabs.form}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="assistant"
                    className="mt-0 data-[state=inactive]:hidden"
                    forceMount
                  >
                    <ContactAssistant
                      contactDraft={contactDraft}
                      sharedIdentity={sharedIdentity}
                      onIdentityChange={updateIdentity}
                      sharedMessage={sharedMessage}
                      onMessageChange={setSharedMessage}
                      gotcha={gotcha}
                      onGotchaChange={setGotcha}
                      onSuccess={clearContactSession}
                    />
                  </TabsContent>

                  <TabsContent
                    value="form"
                    className="mt-0 space-y-6 data-[state=inactive]:hidden"
                    forceMount
                  >
                    <div>
                      <h3 className="text-lg font-semibold md:text-xl">{t.form.title}</h3>
                      <p className="text-sm text-muted-foreground">{t.form.description}</p>
                    </div>

                    <form
                      onSubmit={handleDirectSubmit}
                      className="space-y-6"
                      noValidate
                      aria-busy={isSubmitting}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            {t.form.name}{" "}
                            <span className="text-destructive" aria-hidden>*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder={t.form.namePlaceholder}
                            value={sharedIdentity.name}
                            onChange={handleFieldChange}
                            autoComplete="name"
                            aria-required
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            className={errors.name ? "border-destructive" : ""}
                          />
                          {errors.name && (
                            <p id="name-error" className="text-sm text-destructive">
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            {t.form.email}{" "}
                            <span className="text-destructive" aria-hidden>*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t.form.emailPlaceholder}
                            value={sharedIdentity.email}
                            onChange={handleFieldChange}
                            autoComplete="email"
                            inputMode="email"
                            aria-required
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : "email-hint"}
                            className={errors.email ? "border-destructive" : ""}
                          />
                          <p id="email-hint" className="text-xs text-muted-foreground">
                            {t.form.emailHint}
                          </p>
                          {errors.email && (
                            <p id="email-error" className="text-sm text-destructive">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          {t.form.message}{" "}
                          <span className="text-destructive" aria-hidden>*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder={t.form.messagePlaceholder}
                          rows={6}
                          value={sharedMessage}
                          onChange={handleFieldChange}
                          aria-required
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          className={`resize-none min-h-[140px] ${errors.message ? "border-destructive" : ""}`}
                        />
                        {errors.message && (
                          <p id="message-error" className="text-sm text-destructive">
                            {errors.message}
                          </p>
                        )}
                      </div>

                      <ContactConsentField
                        id="consent"
                        checked={sharedIdentity.consent}
                        onCheckedChange={(checked) => updateIdentity({ consent: checked })}
                        consentText={t.form.consent}
                        privacyLinkLabel={t.form.consentPrivacyLink}
                        error={errors.consent}
                      />

                      <p className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                        {t.assistant.privacyNote}
                      </p>

                      <input
                        type="text"
                        name="_gotcha"
                        value={gotcha}
                        onChange={handleFieldChange}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden
                      />

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        aria-disabled={isSubmitting}
                        className="w-full min-h-12 bg-brand-gradient hover:opacity-90 transition-opacity"
                      >
                        {isSubmitting ? t.form.sending : t.form.submit}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
    </PageSection>
  );
}