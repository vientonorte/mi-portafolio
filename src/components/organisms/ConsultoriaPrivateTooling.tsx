import {
  ArrowRight,
  FolderGit2,
  Lock,
  Scale,
  ShieldCheck,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";
import type { ConsultingPackageId } from "../../data/vientonorte-consulting";

interface ConsultoriaPrivateToolingProps {
  onStartOnboarding?: (packageId?: ConsultingPackageId) => void;
}

const LAYER_ICONS = [WifiOff, FolderGit2, Sparkles, Scale] as const;

export function ConsultoriaPrivateTooling({
  onStartOnboarding,
}: ConsultoriaPrivateToolingProps) {
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.privateTooling;

  const startC1 = (packageId: ConsultingPackageId = "marco") => {
    trackEvent("consultoria_c1_cta", { package_id: packageId });
    onStartOnboarding?.(packageId);
  };

  return (
    <PageSection
      id="offline-private"
      padding="default"
      width="wide"
      tone="matte"
      aria-labelledby="offline-private-heading"
    >
      <SectionHeader
        badge={t.badge}
        badgeIcon={Lock}
        title={t.title}
        description={t.description}
        titleId="offline-private-heading"
        align="left"
      />

      <p className="mb-8 max-w-3xl text-sm text-muted-foreground leading-relaxed -mt-4">
        {t.antiPromise}
      </p>

      <ul className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
        {t.layers.map((layer, i) => {
          const Icon = LAYER_ICONS[i] ?? Lock;
          return (
            <li key={layer.title}>
              <Card className="h-full border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none transition-colors hover:border-primary/15">
                <CardHeader className="pb-2 space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-logo-surface text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <CardTitle className="text-base tracking-tight">
                    {layer.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {layer.body}
                  </p>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>

      <div className="mb-10 grid gap-4 md:grid-cols-2">
        <Card className="border-[color:var(--logo-surface-border)] bg-background shadow-none">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden />
              {t.dodTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2" role="list">
              {t.dod.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-[color:var(--logo-surface-border)] bg-background shadow-none">
          <CardHeader>
            <CardTitle className="text-base">{t.faqTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {t.faq.map((item) => (
              <div key={item.q}>
                <p className="text-sm font-medium text-foreground">{item.q}</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated p-6 md:p-8 shadow-none">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
              {t.skuBadge}
            </span>
            <h3 className="text-lg font-semibold tracking-tight">{t.skuTitle}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.skuDescription}
            </p>
            <p className="text-xs text-muted-foreground pt-1">{t.legalNote}</p>
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <Button
              size="lg"
              className="bg-brand-gradient font-semibold hover:opacity-90 min-h-[48px] focus-visible:ring-offset-2"
              onClick={() => startC1("marco")}
            >
              {t.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-h-[48px] border-[color:var(--logo-surface-border)] bg-background/70 hover:border-primary/25"
              onClick={() => startC1("radar")}
            >
              {t.ctaSecondary}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="min-h-[44px] text-muted-foreground hover:text-foreground"
              onClick={() =>
                document
                  .getElementById("metodo-n2n")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {t.ctaN2N}
            </Button>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
