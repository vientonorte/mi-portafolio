import { ArrowRight, Clock, MessageSquare, Package, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import {
  CONSULTING_PACKAGES,
  type ConsultingPackageId,
} from "../../data/vientonorte-consulting";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";
import { cn } from "../../lib/utils";
import { goToContactWithIntent } from "../../lib/lead-intent";
import { ROUTES } from "../../lib/routes";
import { scrollToSection } from "../../lib/scroll-to-section";

/**
 * Home strip: 3 modalidades → embudo onboarding (preselect) + form lead.
 * Same package data as consultoría; no public pricing.
 */
export function HomePackagesStrip() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.packagesSection;
  const rec = useTranslation(language).consultoria.recommended;

  /** Primary: embudo with modality preselected + scroll to onboarding. */
  const goConsultoria = (id: ConsultingPackageId) => {
    trackEvent("home_package_select", {
      package_id: id,
      target: "consultoria_onboarding",
    });
    navigate(ROUTES.consultingFunnel, {
      state: {
        recommendedPackage: id,
        scrollTo: "consultoria-onboarding",
      },
    });
  };

  /** Secondary: intelligent form with package message (same page). */
  const goForm = (id: ConsultingPackageId, name: string) => {
    trackEvent("home_package_form", { package_id: id });
    const msg =
      language === "es"
        ? `Hola Viento Norte — me interesa la modalidad «${name}» (${id}). Contemos alcance en un call.`
        : `Hi Viento Norte — I'm interested in the «${name}» format (${id}). Let's scope on a call.`;
    goToContactWithIntent(scrollToSection, msg);
  };

  return (
    <PageSection
      id="modalidades"
      padding="default"
      width="wide"
      tone="section"
      aria-labelledby="home-packages-heading"
    >
      <SectionHeader
        badge={t.badge}
        badgeIcon={Package}
        title={t.title}
        description={t.description}
        titleId="home-packages-heading"
      />

      <ul className="grid gap-5 md:grid-cols-3" role="list">
        {CONSULTING_PACKAGES.map((pkg) => (
          <li key={pkg.id} className="h-full">
            <Card
              className={cn(
                "flex h-full flex-col border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none",
                pkg.featured && "ring-1 ring-primary/30"
              )}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  {pkg.featured ? (
                    <Badge className="gap-1">
                      <Star className="h-3 w-3" aria-hidden />
                      {rec}
                    </Badge>
                  ) : (
                    <Badge variant="outline">{pkg.packLabel[language]}</Badge>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {pkg.duration[language]}
                  </span>
                </div>
                <CardTitle className="text-xl">{pkg.name[language]}</CardTitle>
                <p className="text-xs font-medium text-primary/90">
                  {pkg.youGet[language]}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pkg.tagline[language]}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2" role="list">
                  {pkg.deliverables[language].slice(0, 3).map((d) => (
                    <li key={d} className="flex gap-2 text-sm text-muted-foreground">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  className={cn(
                    "w-full min-h-[44px]",
                    pkg.featured && "bg-brand-gradient font-semibold hover:opacity-90"
                  )}
                  variant={pkg.featured ? "default" : "outline"}
                  onClick={() => goConsultoria(pkg.id)}
                >
                  {t.cta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full min-h-[44px] text-muted-foreground"
                  onClick={() => goForm(pkg.id, pkg.name[language])}
                >
                  <MessageSquare className="mr-2 h-4 w-4" aria-hidden />
                  {t.ctaForm}
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
