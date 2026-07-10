import {
  Building2,
  CheckCircle2,
  Code2,
  Layers,
  Lock,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useLanguage } from "../../lib/LanguageContext";
import {
  CAMPAIGN_CODE_CHECKLIST,
  HERO_ROLES,
  type HeroRoleId,
} from "../../data/consultoria-hero-roles";

const ROLE_ICONS: Record<HeroRoleId, LucideIcon> = {
  product: Building2,
  ops: Layers,
  compliance: Lock,
  founder: Workflow,
};

/**
 * Design System: 4 roles del hero + checklist de **código** listo para campañas.
 * No expone planes SEM/SEO ni copy de ads — solo criterios de implementación.
 */
export function AudienceRolesSystem() {
  const { language } = useLanguage();
  const es = language === "es";

  return (
    <PageSection
      id="audience-roles"
      padding="default"
      width="wide"
      tone="default"
      aria-labelledby="audience-roles-heading"
    >
      <SectionHeader
        badge={es ? "Roles · código" : "Roles · code"}
        badgeIcon={Code2}
        titleId="audience-roles-heading"
        title={
          es
            ? "4 roles del hero · checklist de implementación"
            : "4 hero roles · implementation checklist"
        }
        description={
          es
            ? "Fuente única para el path de /consultoria. Checklist de código optimizado para campañas (deep links, SEO técnico, a11y, tokens) — sin plan de medios ni copy de ads en la UI."
            : "Single source for the /consultoria path. Code checklist optimized for campaigns (deep links, technical SEO, a11y, tokens) — no media plan or ad copy in the UI."
        }
        align="left"
      />

      {/* Checklist de código (no plan SEM/SEO expuesto) */}
      <div className="mb-10 rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated p-5 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
          <p className="text-sm font-semibold text-foreground">
            {es
              ? "Checklist de código para campañas"
              : "Campaign-ready code checklist"}
          </p>
        </div>
        <ul className="m-0 grid list-none gap-2.5 p-0 sm:grid-cols-2" role="list">
          {CAMPAIGN_CODE_CHECKLIST.map((item) => (
            <li
              key={item.id}
              className="flex gap-2.5 rounded-xl border border-border/70 bg-background/60 px-3 py-2.5"
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-primary/80"
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-sm leading-snug text-foreground">
                  {item.label[language]}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                  {item.codeHint}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 4 roles — datos de producto, no hooks de ads */}
      <ul
        className="m-0 grid list-none gap-4 p-0 md:grid-cols-2"
        role="list"
      >
        {HERO_ROLES.map((role) => {
          const Icon = ROLE_ICONS[role.id];
          return (
            <li key={role.id} className="min-w-0">
              <Card className="h-full border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-logo-surface text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      <Badge variant="outline" className="text-[11px] font-normal">
                        {role.packageId}
                        {role.c1Goal ? " · C1" : ""}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="font-mono text-[10px] uppercase tracking-wide"
                      >
                        {role.id}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg leading-snug">
                      {role.title[language]}
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {role.hint[language]}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {es ? "Problema" : "Problem"}
                    </p>
                    <p className="mt-1 leading-relaxed text-foreground/90">
                      {role.pain[language]}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {es ? "Entrega" : "Delivery"}
                    </p>
                    <p className="mt-1 leading-relaxed text-foreground/90">
                      {role.valueProp[language]}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {es ? "Tokens UI" : "UI tokens"}
                    </p>
                    <ul className="flex flex-wrap gap-1.5" role="list">
                      {role.uiTokens.map((tok) => (
                        <li key={tok}>
                          <span className="inline-flex rounded-md border border-border/80 bg-background/70 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {tok}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border/70 bg-background/50 px-3 py-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      deepLinkQuery
                    </p>
                    <code className="mt-1 block break-all font-mono text-[11px] text-foreground">
                      {role.deepLinkQuery}
                    </code>
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </PageSection>
  );
}
