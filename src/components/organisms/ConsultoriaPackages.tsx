import { ArrowRight, Clock, Package, Play, Smartphone, Star } from "lucide-react";
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
import {
  demoMinutes,
  getServicePathDemo,
  packToServicePath,
} from "../../data/service-path-demos";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";
import { ROUTES } from "../../lib/routes";
import { cn } from "../../lib/utils";

export type PackageSelectOptions = { appGoal?: boolean };

interface ConsultoriaPackagesProps {
  onSelectPackage?: (
    packageId: ConsultingPackageId,
    options?: PackageSelectOptions
  ) => void;
  showAppStrip?: boolean;
}

export function ConsultoriaPackages({
  onSelectPackage,
  showAppStrip = true,
}: ConsultoriaPackagesProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.packagesSection;
  const rec = useTranslation(language).consultoria.recommended;

  const select = (id: ConsultingPackageId, options?: PackageSelectOptions) => {
    trackEvent("consultoria_package_select", {
      package_id: id,
      app: Boolean(options?.appGoal),
    });
    onSelectPackage?.(id, options);
  };

  const openDemo = (
    pathId: ReturnType<typeof packToServicePath> | "app",
    origin: string,
    packId?: ConsultingPackageId
  ) => {
    const demo = getServicePathDemo(pathId);
    if (!demo) return;
    trackEvent("service_path_demo_open", {
      path_id: demo.id,
      package_id: packId ?? demo.packageId,
      origin,
    });
    navigate(ROUTES.serviceDemo(demo.id));
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
        badgeIcon={Package}
        title={t.title}
        description={t.description}
        titleId="consultoria-packages-heading"
        align="left"
      />

      <ul className="grid gap-5 md:grid-cols-3" role="list">
        {CONSULTING_PACKAGES.map((pkg) => (
          <li key={pkg.id} className="h-full">
            <Card
              className={cn(
                "funnel-pack-card flex h-full flex-col border-2 border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-sm",
                pkg.featured && "border-primary/40 ring-1 ring-primary/30 shadow-md"
              )}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                    {/* packLabel técnico (Radar · Marco · Ops); nombre humano abajo */}
                    <Badge
                      variant="outline"
                      className="border-border text-foreground"
                    >
                      {pkg.packLabel[language]}
                    </Badge>
                    {pkg.featured ? (
                      <Badge className="gap-1 bg-foreground text-background hover:bg-foreground/90">
                        <Star className="h-3 w-3" aria-hidden />
                        {rec}
                      </Badge>
                    ) : null}
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
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
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground">
                  {t.deliverablesLabel}
                </p>
                <ul className="space-y-2" role="list">
                  {pkg.deliverables[language].map((d) => (
                    <li
                      key={d}
                      className="flex gap-2 text-sm text-muted-foreground"
                    >
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
                    pkg.featured
                      ? "funnel-cta-primary bg-brand-gradient font-semibold hover:opacity-90"
                      : "funnel-cta-ghost"
                  )}
                  variant={pkg.featured ? "default" : "outline"}
                  onClick={() => select(pkg.id)}
                >
                  {t.cta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Button>
                {(() => {
                  const demo = getServicePathDemo(packToServicePath(pkg.id));
                  if (!demo) return null;
                  return (
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full min-h-[44px] text-muted-foreground"
                      onClick={() => openDemo(demo.id, "pack-card", pkg.id)}
                    >
                      <Play className="mr-2 h-4 w-4" aria-hidden />
                      {t.ctaDemo.replace("{min}", String(demoMinutes(demo)))}
                    </Button>
                  );
                })()}
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>

      {showAppStrip ? (
      <Card className="mt-3 border border-primary/20 bg-surface-matte-elevated shadow-none">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3 min-w-0">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-logo-surface text-primary"
              aria-hidden
            >
              <Smartphone className="h-5 w-5" />
            </span>
            <div className="min-w-0 space-y-1">
              <p className="text-base font-semibold tracking-tight">
                {t.appStripTitle}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.appStripBody}
              </p>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto">
            <Button
              className="w-full min-h-[44px] sm:w-auto"
              variant="outline"
              onClick={() => select("marco", { appGoal: true })}
            >
              {t.appStripCta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full min-h-[44px] text-muted-foreground sm:w-auto"
              onClick={() => openDemo("app", "app-strip", "marco")}
            >
              <Play className="mr-2 h-4 w-4" aria-hidden />
              {t.ctaDemo.replace("{min}", "5")}
            </Button>
          </div>
        </CardContent>
      </Card>
      ) : null}

      <p className="mt-6 text-center text-xs text-muted-foreground">{t.note}</p>
    </PageSection>
  );
}
