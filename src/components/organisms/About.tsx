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

/** Roles de craft — no empleo actual (eso va en el título). */
const roles = {
  es: [
    "Interfaces",
    "Product Design",
    "Design Systems",
    "Research",
    "Sprints",
    "Design Ops",
  ],
  en: [
    "Interfaces",
    "Product Design",
    "Design Systems",
    "Research",
    "Sprints",
    "Design Ops",
  ],
} as const;

/**
 * Chips de prueba — coherentes con timeline:
 * 7+ craft (VN 2019–) · 3+ lead (mobility→wealth) · impacto regional SURA (pasado).
 */
const PROOF = {
  es: [
    { icon: Timer, label: "7+ años", detail: "Craft UX/UI · Viento Norte 2019–" },
    { icon: Layers2, label: "3+ lead", detail: "Mobility → Wealth (Transvip · SURA)" },
    { icon: Globe2, label: "Regional", detail: "5+ países · −40% onboarding SURA" },
  ],
  en: [
    { icon: Timer, label: "7+ years", detail: "UX/UI craft · Viento Norte 2019–" },
    { icon: Layers2, label: "3+ lead", detail: "Mobility → Wealth (Transvip · SURA)" },
    { icon: Globe2, label: "Regional", detail: "5+ countries · −40% SURA onboarding" },
  ],
} as const;

const LINE = {
  es: "Interfaces de producto (wealth, mobility, e-comm). Ex UX Lead SURA (hasta jun. 2026).",
  en: "Product interfaces (wealth, mobility, e-comm). Former UX Lead SURA (through Jun 2026).",
} as const;

const TITLE_ROLE = {
  es: "UX Manager · Viento Norte",
  en: "UX Manager · Viento Norte",
} as const;

export function About() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const proof = PROOF[language];
  const es = language === "es";
  const roleList = roles[language];

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
            ? "Pantallas de producto. Poco texto."
            : "Product screens. Minimal text."
        }
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,220px)_1fr] lg:items-start lg:gap-10">
        <motion.div {...fadeUp(0)} className="mx-auto w-full max-w-[200px] lg:mx-0">
          <div className="profile-avatar-frame relative aspect-[4/5] w-full">
            <ProfileAvatar alt={`Rodrigo Gaete — ${TITLE_ROLE[language]}`} />
          </div>
          <h3 className="mt-4 text-center text-base font-semibold tracking-tight lg:text-left">
            Rodrigo Gaete
          </h3>
          <p className="mt-0.5 text-center text-sm font-medium text-primary lg:text-left">
            {TITLE_ROLE[language]}
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
            CV PDF
          </Button>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
            {roleList.map((role) => (
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

      <div className="mt-10 border-t border-border/50 pt-8">
        <InterfaceWall />
      </div>
    </PageSection>
  );
}
