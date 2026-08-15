import { Calendar, Mail } from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  CONSULTORIA_FUNNEL_KICKOFF_ID,
} from "../../lib/nav-config";
import {
  getConsultingPackage,
  type ConsultingPackageId,
} from "../../data/vientonorte-consulting";
import { openCalendarBooking } from "../../lib/site-contact";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { analytics } from "../../lib/analytics";
import { scrollToSection } from "../../lib/scroll-to-section";

interface ConsultoriaOnboardingProps {
  packageId?: ConsultingPackageId;
}

export function ConsultoriaOnboarding({ packageId }: ConsultoriaOnboardingProps) {
  const { language } = useLanguage();
  const landing = useTranslation(language).consultoria.landing;
  const copy = landing.onboarding;
  const pkg = packageId ? getConsultingPackage(packageId) : undefined;

  const book = () => {
    analytics.generateLead({
      lead_type: pkg ? "consulting_pack" : "kickoff",
      channel: "google_calendar",
      origin: "consultoria-onboarding",
      package_id: packageId,
    });
    if (!openCalendarBooking({ packageId, origin: "consultoria-onboarding" })) {
      scrollToSection("contacto");
    }
  };

  return (
    <PageSection
      id={CONSULTORIA_FUNNEL_KICKOFF_ID}
      padding="default"
      width="narrow"
      tone="default"
      aria-labelledby="consultoria-onboarding-heading"
    >
      <SectionHeader
        badge={copy.badge}
        title={
          pkg
            ? copy.titlePack.replace("{name}", pkg.name[language])
            : copy.titleEmpty
        }
        description={pkg ? copy.bodyPack : copy.bodyEmpty}
        titleId="consultoria-onboarding-heading"
        align="left"
      />

      {pkg ? (
        <p className="mb-6 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">{copy.packLabel}</span>
          <Badge variant="outline">{pkg.packLabel[language]}</Badge>
          <span className="text-foreground">{pkg.youGet[language]}</span>
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          className="min-h-[44px] bg-brand-gradient font-semibold"
          onClick={book}
        >
          <Calendar className="mr-2 h-4 w-4" aria-hidden />
          {copy.ctaCalendar}
        </Button>
        <Button
          variant="outline"
          className="min-h-[44px]"
          onClick={() => scrollToSection("contacto")}
        >
          <Mail className="mr-2 h-4 w-4" aria-hidden />
          {copy.ctaMail}
        </Button>
      </div>
    </PageSection>
  );
}
