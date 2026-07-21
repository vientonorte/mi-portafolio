import { ArrowRight, Clock, Package, Star } from "lucide-react";
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
import { scrollToSection } from "../../lib/scroll-to-section";

/**
 * Home strip: modalidades → form lead (FigJam S4).
 * Reuses package data; no public pricing.
 */
export function HomePackagesStrip() {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.packagesSection;
  const rec = useTranslation(language).consultoria.recommended;

  const select = (id: ConsultingPackageId, name: string) => {
    trackEvent("home_package_select", { package_id: id });
    const msg =
      language === "es"
        ? `Hola — me interesa la modalidad «${name}» (${id}). Contemos alcance en un call.`
        : `Hi — I'm interested in the «${name}» format (${id}). Let's scope on a call.`;
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
                    <Badge variant="outline">{pkg.name[language]}</Badge>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {pkg.duration[language]}
                  </span>
                </div>
                <CardTitle className="text-xl">{pkg.name[language]}</CardTitle>
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
              <CardFooter>
                <Button
                  className={cn(
                    "w-full min-h-[44px]",
                    pkg.featured && "bg-brand-gradient font-semibold hover:opacity-90"
                  )}
                  variant={pkg.featured ? "default" : "outline"}
                  onClick={() => select(pkg.id, pkg.name[language])}
                >
                  {t.cta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
