import { GraduationCap, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageSection } from "../layout/PageSection";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { PARTEN_EDU_CONTACT_GOAL } from "../../data/vientonorte-consulting";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { ROUTES } from "../../lib/routes";
import { openVideoCallOrFallback, VIDEO_CALL_URL } from "../../lib/site-contact";
import { trackEvent } from "../../lib/analytics";

interface ConsultoriaEducationPartnerProps {
  /** Si se prefiere onboarding en página en vez de contacto directo */
  onStartOnboarding?: () => void;
}

export function ConsultoriaEducationPartner({
  onStartOnboarding,
}: ConsultoriaEducationPartnerProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.educationPartner;

  const goToContactWithDraft = () => {
    trackEvent("consultoria_parten_videocall", {
      channel: VIDEO_CALL_URL ? "calendar_url" : "contact_draft",
    });
    navigate(ROUTES.contact, {
      state: {
        contactDraft: {
          message: PARTEN_EDU_CONTACT_GOAL[language],
          source: "parten-edu",
          intent: "consulting",
          packageId: "marco",
          industry: language === "es" ? "Educación" : "Education",
        },
      },
    });
  };

  const scheduleVideoCall = () => {
    openVideoCallOrFallback(goToContactWithDraft);
  };

  return (
    <PageSection
      id="parten-educacion"
      padding="default"
      width="wide"
      tone="default"
      aria-labelledby="parten-edu-heading"
    >
      <Card className="overflow-hidden border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
        <CardContent className="p-0">
          <div className="grid gap-0 md:grid-cols-5">
            <div className="md:col-span-3 space-y-4 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-primary/25">
                  <GraduationCap className="mr-1.5 h-3.5 w-3.5 text-primary" aria-hidden />
                  {t.badge}
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  {t.partnerLabel}
                </Badge>
              </div>
              <h2
                id="parten-edu-heading"
                className="text-xl md:text-2xl font-semibold tracking-tight"
              >
                {t.title}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                {t.description}
              </p>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0" role="list">
                {t.highlights.map((item) => (
                  <li key={item}>
                    <span className="inline-flex rounded-full border border-border/80 bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-[color:var(--logo-surface-border)] bg-surface-matte/50 p-6 md:p-8">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.ctaLead}
              </p>
              <Button
                size="lg"
                className="w-full min-h-[48px] bg-brand-gradient font-semibold hover:opacity-90"
                onClick={scheduleVideoCall}
              >
                <Video className="mr-2 h-4 w-4" aria-hidden />
                {t.ctaPrimary}
              </Button>
              {onStartOnboarding && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-h-[44px]"
                  onClick={() => {
                    trackEvent("consultoria_parten_onboarding", {});
                    onStartOnboarding();
                  }}
                >
                  {t.ctaSecondary}
                </Button>
              )}
              <p className="text-[11px] text-muted-foreground">{t.note}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageSection>
  );
}
