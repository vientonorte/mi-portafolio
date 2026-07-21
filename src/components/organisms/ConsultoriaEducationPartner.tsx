import { GraduationCap, Video, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { PageSection } from "../layout/PageSection";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PARTNER_EDU_CONTACT_GOAL } from "../../data/vientonorte-consulting";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { navigateToContactAssistant } from "../../lib/navigate-to-contact";
import { openVideoCallOrFallback, VIDEO_CALL_URL } from "../../lib/site-contact";
import { trackEvent } from "../../lib/analytics";

interface ConsultoriaEducationPartnerProps {
  onStartOnboarding?: () => void;
}

export function ConsultoriaEducationPartner({
  onStartOnboarding,
}: ConsultoriaEducationPartnerProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.educationPartner;
  const prefersReducedMotion = useReducedMotion();

  const goToContactWithDraft = () => {
    trackEvent("consultoria_partner_edu_videocall", {
      channel: VIDEO_CALL_URL ? "calendar_url" : "contact_draft",
    });
    navigateToContactAssistant(navigate, {
      origin: "partner-edu",
      source: "partner-edu",
      intent: "consulting",
      packageId: "marco",
      industry: language === "es" ? "Educación" : "Education",
      message: PARTNER_EDU_CONTACT_GOAL[language],
    });
  };

  const scheduleVideoCall = () => {
    openVideoCallOrFallback(goToContactWithDraft);
  };

  return (
    <PageSection
      id="partner-educacion"
      padding="default"
      width="wide"
      tone="matte"
      aria-labelledby="partner-edu-heading"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
          <CardContent className="p-0">
            <div className="grid gap-0 lg:grid-cols-5">
              <div className="lg:col-span-3 flex flex-col justify-between gap-6 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[color:var(--logo-surface-border)]">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--logo-surface-border)] bg-[var(--featured-matte-accent)] px-3 py-1.5">
                    <GraduationCap className="h-4 w-4 text-primary" aria-hidden />
                    <span className="text-sm font-semibold text-primary">
                      {t.partnerLabel}
                    </span>
                  </div>

                  <Badge
                    variant="outline"
                    className="w-fit border-primary/20 text-muted-foreground font-normal"
                  >
                    {t.badge}
                  </Badge>

                  <h2
                    id="partner-edu-heading"
                    className="text-xl md:text-2xl font-semibold tracking-tight text-foreground"
                  >
                    {t.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-xl">
                    {t.description}
                  </p>

                  <ul className="flex flex-wrap gap-2 list-none p-0 m-0" role="list">
                    {t.highlights.map((item) => (
                      <li key={item}>
                        <span className="inline-flex rounded-full border border-border/80 bg-muted/40 px-2.5 py-1 text-xs font-medium text-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col justify-center gap-4 p-6 md:p-8 bg-surface-matte/40">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {t.ctaLead}
                </p>

                <div className="flex flex-col gap-2.5">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full min-h-[48px] bg-brand-gradient font-semibold hover:opacity-90 focus-visible:ring-offset-2"
                    onClick={scheduleVideoCall}
                  >
                    <Video className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                    {t.ctaPrimary}
                  </Button>

                  {onStartOnboarding && (
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      className="w-full min-h-[44px] border-[color:var(--logo-surface-border)] bg-background/60 hover:border-primary/25"
                      onClick={() => {
                        trackEvent("consultoria_partner_edu_onboarding", {});
                        onStartOnboarding();
                      }}
                    >
                      {t.ctaSecondary}
                      <ArrowRight className="ml-2 h-4 w-4 shrink-0 opacity-70" aria-hidden />
                    </Button>
                  )}
                </div>

                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {t.note}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </PageSection>
  );
}
