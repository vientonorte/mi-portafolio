import {
  Building2,
  Clapperboard,
  Layers,
  Link2,
  Lock,
  Search,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useLanguage } from "../../lib/LanguageContext";
import {
  CAMPAIGN_CHANNELS,
  HERO_ROLES,
  type CampaignChannelId,
  type HeroRoleId,
} from "../../data/consultoria-hero-roles";
import { cn } from "../../lib/utils";

const ROLE_ICONS: Record<HeroRoleId, LucideIcon> = {
  product: Building2,
  ops: Layers,
  compliance: Lock,
  founder: Workflow,
};

const CHANNEL_ICONS: Record<CampaignChannelId, LucideIcon> = {
  ig_reels: Clapperboard,
  seo_google: Search,
  sem_linkedin: Link2,
};

/**
 * Design System: 4 roles del hero de consultoría + hooks de campaña
 * (IG Reels · SEO Google · SEM LinkedIn).
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
        badge={es ? "Audiencias · campañas" : "Audiences · campaigns"}
        badgeIcon={Clapperboard}
        titleId="audience-roles-heading"
        title={
          es
            ? "4 roles del hero · sistema de mensaje"
            : "4 hero roles · messaging system"
        }
        description={
          es
            ? "Fuente única alineada al path de /consultoria. Piezas SEM Instagram (reels), SEO Google y SEM LinkedIn reutilizan el mismo rol, modalidad y tokens UI."
            : "Single source aligned to the /consultoria path. SEM Instagram (reels), SEO Google, and SEM LinkedIn reuse the same role, package, and UI tokens."
        }
        align="left"
      />

      {/* Canales de campaña */}
      <ul
        className="mb-10 grid list-none gap-3 p-0 sm:grid-cols-3"
        role="list"
      >
        {CAMPAIGN_CHANNELS.map((ch) => {
          const Icon = CHANNEL_ICONS[ch.id];
          return (
            <li key={ch.id}>
              <div className="flex h-full gap-3 rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {ch.label[language]}
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {ch.description[language]}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* 4 roles */}
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
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {es ? "Dolor" : "Pain"}
                    </p>
                    <p className="mt-1 text-foreground/90 leading-relaxed">
                      {role.pain[language]}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {es ? "Valor" : "Value"}
                    </p>
                    <p className="mt-1 text-foreground/90 leading-relaxed">
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
                  <div className="space-y-2 rounded-lg border border-border/70 bg-background/50 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {es ? "Hooks de campaña" : "Campaign hooks"}
                    </p>
                    <CampaignLine
                      label="IG Reels"
                      text={role.campaigns.igReels[language]}
                    />
                    <CampaignLine
                      label="SEO"
                      text={role.campaigns.seoGoogle[language]}
                    />
                    <CampaignLine
                      label="LinkedIn"
                      text={role.campaigns.semLinkedin[language]}
                    />
                  </div>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>

      <p
        className={cn(
          "mt-8 text-center text-xs text-muted-foreground",
          "max-w-2xl mx-auto leading-relaxed"
        )}
      >
        {es
          ? "Cierre landing consultoría: promesa clara, 4 paths, evidencia y onboarding. Las campañas reutilizan este sistema — no inventar un quinto rol sin actualizar data + hero + DS."
          : "Consulting landing close: clear promise, 4 paths, evidence, onboarding. Campaigns reuse this system — don’t invent a fifth role without updating data + hero + DS."}
      </p>
    </PageSection>
  );
}

function CampaignLine({ label, text }: { label: string; text: string }) {
  return (
    <p className="text-xs leading-relaxed text-muted-foreground">
      <span className="font-semibold text-foreground">{label}: </span>
      {text}
    </p>
  );
}
