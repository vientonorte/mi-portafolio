import { motion, useReducedMotion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { User, Download, Globe2, Layers2, Timer } from "lucide-react";
import { ProfileAvatar } from "../atoms/ProfileAvatar";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { InterfaceWall } from "./InterfaceWall";
import { TrajectoryRail } from "./TrajectoryRail";
import { useLanguage } from "../../lib/LanguageContext";
import { analytics } from "../../lib/analytics";
import { getCvDownloadUrl } from "../../lib/site-contact";
import { cn } from "../../lib/utils";

const roles = [
  "Lead UX",
  "UX Manager · VN",
  "Product Design",
  "Design Systems",
  "Interfaces",
  "Sprints",
];

const PROOF = {
  es: [
    { icon: Timer, label: "3+ años", detail: "Lead / Senior Product" },
    { icon: Layers2, label: "2 verticales", detail: "Wealth + Mobility" },
    { icon: Globe2, label: "Regional", detail: "5+ países · −40% onboarding" },
  ],
  en: [
    { icon: Timer, label: "3+ years", detail: "Lead / Senior Product" },
    { icon: Layers2, label: "2 verticals", detail: "Wealth + Mobility" },
    { icon: Globe2, label: "Regional", detail: "5+ countries · −40% onboarding" },
  ],
} as const;

const LINE = {
  es: "UX Manager Viento Norte + UX Lead SURA. Interfaces de producto — no solo método.",
  en: "UX Manager Viento Norte + UX Lead SURA. Product interfaces — not method alone.",
} as const;

export function About() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const proof = PROOF[language];
  const es = language === "es";

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true as const },
          transition: { duration: 0.45, delay },
        };

  return (
    <PageSection
      id="sobre-mi"
      padding="compact"
      width="wide"
      tone="muted"
      aria-labelledby="about-heading"
    >
      <SectionHeader
        badge={es ? "Sobre mí" : "About me"}
        badgeIcon={User}
        titleId="about-heading"
        title={es ? "Evidencia primero." : "Evidence first."}
        description={
          es
            ? "Dashboards, mockups y diagramas. Poco texto."
            : "Dashboards, mockups, diagrams. Minimal text."
        }
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,220px)_1fr] lg:items-start lg:gap-10">
        <motion.div {...fadeUp(0)} className="mx-auto w-full max-w-[200px] lg:mx-0">
          <div className="profile-avatar-frame relative aspect-[4/5] w-full">
            <ProfileAvatar alt="Rodrigo Gaete — Lead UX Designer" />
          </div>
          <h3 className="mt-4 text-center text-base font-semibold tracking-tight lg:text-left">
            Rodrigo Gaete
          </h3>
          <p className="mt-0.5 text-center text-sm font-medium text-primary lg:text-left">
            Lead UX · SURA
          </p>
          <p className="mt-3 text-center text-sm leading-snug text-muted-foreground lg:text-left">
            {LINE[language]}
          </p>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              analytics.downloadCV();
              window.open(getCvDownloadUrl(), "_blank", "noopener,noreferrer");
            }}
            className="mt-4 w-full border-2 group"
          >
            <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            {es ? "CV PDF" : "CV PDF"}
          </Button>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {roles.map((role) => (
              <Badge
                key={role}
                variant="secondary"
                className="px-2 py-0.5 text-[11px] font-medium"
              >
                {role}
              </Badge>
            ))}
          </div>
        </motion.div>

        <div className="min-w-0 space-y-6">
          <ul
            className="grid gap-2 sm:grid-cols-3"
            role="list"
            aria-label={es ? "Resumen" : "Summary"}
          >
            {proof.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.label}
                  {...fadeUp(0.04 * index)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated px-3 py-3"
                  )}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="block text-xs text-muted-foreground">
                      {item.detail}
                    </span>
                  </span>
                </motion.li>
              );
            })}
          </ul>

          <TrajectoryRail />
        </div>
      </div>

      {/* S1: muro de interfaces — full width bajo el grid */}
      <div className="mt-10 border-t border-border/50 pt-8">
        <InterfaceWall />
      </div>
    </PageSection>
  );
}
