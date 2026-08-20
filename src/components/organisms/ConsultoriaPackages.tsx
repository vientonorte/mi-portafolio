import { Calendar, Clock } from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { Button } from "../ui/button";
import {
  CONSULTING_PACKAGES,
  type ConsultingPackageId,
} from "../../data/vientonorte-consulting";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";
import { openCalendarBooking } from "../../lib/site-contact";
import { openFreeRadarEntry } from "../../lib/free-radar-entry";
import { scrollToSection } from "../../lib/scroll-to-section";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export type PackageSelectOptions = { appGoal?: boolean };

interface ConsultoriaPackagesProps {
  selectedPackageId?: ConsultingPackageId;
  onSelectPackage?: (
    packageId: ConsultingPackageId,
    options?: PackageSelectOptions
  ) => void;
  /** Home FO only. SEM Radio = tres nombres, sin 4ª card. */
  showAppStrip?: boolean;
}

export function ConsultoriaPackages({
  selectedPackageId,
  onSelectPackage,
  showAppStrip = false,
}: ConsultoriaPackagesProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.packagesSection;
  const landing = useTranslation(language).consultoria.landing;
  void showAppStrip;

  const select = (id: ConsultingPackageId) => {
    trackEvent("consultoria_package_select", {
      package_id: id,
      radio: true,
    });
    onSelectPackage?.(id);
  };

  const book = () => {
    trackEvent("consultoria_hero_cta", {
      action: "calendar_booking",
      package_id: selectedPackageId ?? "none",
    });
    if (
      !openCalendarBooking({
        packageId: selectedPackageId,
        origin: "scope-radio",
      })
    ) {
      scrollToSection("contacto");
    }
  };

  return (
    <PageSection
      id="modalidades"
      padding="default"
      width="wide"
      tone="default"
      atmosphere
      aria-labelledby="consultoria-packages-heading"
    >
      <SectionHeader
        badge={t.badge}
        title={t.title}
        description={t.description}
        titleId="consultoria-packages-heading"
        titleAs="h2"
        align="left"
      />

      <div
        role="radiogroup"
        aria-labelledby="consultoria-packages-heading"
        className="grid gap-4 md:grid-cols-3"
      >
        {CONSULTING_PACKAGES.map((pkg) => {
          const checked = selectedPackageId === pkg.id;
          return (
            <label
              key={pkg.id}
              data-selected={checked ? "true" : "false"}
              className={cn(
                "funnel-pack-card flex min-h-[44px] cursor-pointer flex-col rounded-2xl border-2 bg-surface-matte-elevated p-5 shadow-sm transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2",
                checked
                  ? "border-[color:var(--vn-color-brand)]"
                  : "border-[color:var(--logo-surface-border)] hover:border-primary/40"
              )}
            >
              <input
                type="radio"
                name="consultoria-alcance"
                value={pkg.id}
                checked={checked}
                onChange={() => select(pkg.id)}
                className="sr-only"
              />
              <span className="flex items-start justify-between gap-3">
                <span className="text-lg font-semibold tracking-tight">
                  {pkg.name[language]}
                </span>
                <span
                  className={cn(
                    "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                    checked
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/40"
                  )}
                  aria-hidden
                >
                  {checked ? (
                    <span className="h-2 w-2 rounded-full bg-primary-foreground" />
                  ) : null}
                </span>
              </span>
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {pkg.duration[language]}
              </span>
              <span className="mt-2 text-sm font-medium text-primary/90">
                {pkg.youGet[language]}
              </span>
              <span className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {pkg.tagline[language]}
              </span>
            </label>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:items-start">
        <Button
          size="lg"
          className="funnel-cta-primary min-h-[48px] bg-brand-gradient px-8 font-semibold hover:opacity-90"
          disabled={!selectedPackageId}
          onClick={book}
        >
          <Calendar className="mr-2 h-4 w-4" aria-hidden />
          {landing.onboarding.ctaCalendar}
        </Button>
        <p className="max-w-xl text-sm text-muted-foreground">
          <button
            type="button"
            className="min-h-11 text-left font-normal text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            onClick={() => {
              trackEvent("consultoria_hero_cta", { action: "free_a11y_note" });
              openFreeRadarEntry(navigate, language, "consultoria-packages", {
                mode: "auto",
              });
            }}
          >
            {t.freeNote}
          </button>
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">{t.note}</p>
    </PageSection>
  );
}
