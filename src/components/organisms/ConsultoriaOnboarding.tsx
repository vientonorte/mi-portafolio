import { Calendar, Mail } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CONSULTORIA_FUNNEL_KICKOFF_ID } from "../../lib/nav-config";
import {
  getConsultingPackage,
  type ConsultingPackageId,
} from "../../data/vientonorte-consulting";
import { openCalendarBooking, hasA11yFreeSchedule } from "../../lib/site-contact";
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
  const title = pkg
    ? copy.titlePack.replace("{name}", pkg.name[language])
    : copy.titleEmpty;

  const book = () => {
    // Solo se atribuye a google_calendar si hay agenda configurada;
    // si no, el CTA degrada a formulario de contacto (evita inflar conversiones).
    analytics.generateLead({
      lead_type: pkg ? "consulting_pack" : "kickoff",
      channel: hasA11yFreeSchedule() ? "google_calendar" : "contact_form",
      origin: "consultoria-onboarding",
      package_id: packageId,
    });
    if (!openCalendarBooking({ packageId, origin: "consultoria-onboarding" })) {
      scrollToSection("contacto");
    }
  };

  return (
    <section
      id={CONSULTORIA_FUNNEL_KICKOFF_ID}
      className="scroll-mt-[calc(var(--header-height)+0.75rem)] border-y border-border/60 bg-muted/25 px-4 py-8 md:py-10"
      aria-labelledby="consultoria-onboarding-heading"
    >
      <div className="container mx-auto max-w-xl rounded-2xl border-2 border-primary/25 bg-background p-5 shadow-sm md:p-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-foreground">
          02 · {copy.badge}
        </p>
        <h2
          id="consultoria-onboarding-heading"
          className="text-xl font-semibold tracking-tight md:text-2xl"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {pkg ? copy.bodyPack : copy.bodyEmpty}
        </p>
        {pkg ? (
          <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-muted-foreground">{copy.packLabel}</span>
            <Badge variant="outline">{pkg.name[language]}</Badge>
            <span>{pkg.youGet[language]}</span>
          </p>
        ) : null}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          {pkg ? null : (
            <Button
              className="min-h-[44px] bg-brand-gradient font-semibold"
              onClick={book}
            >
              <Calendar className="mr-2 h-4 w-4" aria-hidden />
              {copy.ctaCalendar}
            </Button>
          )}
          <Button
            variant="outline"
            className="min-h-[44px]"
            onClick={() => scrollToSection("contacto")}
          >
            <Mail className="mr-2 h-4 w-4" aria-hidden />
            {copy.ctaMail}
          </Button>
        </div>
      </div>
    </section>
  );
}
