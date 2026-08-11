import { motion, useReducedMotion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { User, Download, Globe2, Cpu, LayoutPanelLeft } from "lucide-react";
import { ProfileAvatar } from "../atoms/ProfileAvatar";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { InterfaceWall } from "./InterfaceWall";
import { TrajectoryRail } from "./TrajectoryRail";
import { useLanguage } from "../../lib/LanguageContext";
import { analytics } from "../../lib/analytics";
import { getCvDownloadUrl } from "../../lib/site-contact";
import { cn } from "../../lib/utils";

/** Craft tags — no sustituyen el cargo actual. */
const roles = {
  es: [
    "Interfaces",
    "Product Design",
    "Design Systems",
    "AI data",
    "Research",
    "Design Ops",
  ],
  en: [
    "Interfaces",
    "Product Design",
    "Design Systems",
    "AI data",
    "Research",
    "Design Ops",
  ],
} as const;

/**
 * Tres claims que suman (no se pisan):
 * 1) Interfaces de empresas (lo que se ve en el wall)
 * 2) Alcance regional + internacional (SURA Latam + micro1 US)
 * 3) Práctica actual (VN n2n + micro1 AI)
 */
const PROOF = {
  es: [
    {
      icon: LayoutPanelLeft,
      label: "Interfaces",
      detail: "Empresas CL + wealth regional · wall abajo",
    },
    {
      icon: Globe2,
      label: "Latam + EE.UU.",
      detail: "SURA multi-país · micro1 remoto US",
    },
    {
      icon: Cpu,
      label: "Hoy",
      detail: "UX Manager VN · AI Trainer micro1",
    },
  ],
  en: [
    {
      icon: LayoutPanelLeft,
      label: "Interfaces",
      detail: "CL product + regional wealth · wall below",
    },
    {
      icon: Globe2,
      label: "Latam + US",
      detail: "SURA multi-country · micro1 US remote",
    },
    {
      icon: Cpu,
      label: "Now",
      detail: "UX Manager VN · AI Trainer micro1",
    },
  ],
} as const;

const LINE = {
  es: "Interfaces de producto en empresas reales. Hoy: Viento Norte (n2n) + micro1 (AI data, EE.UU.). Antes: Lead UX SURA (regional, hasta jun. 2026).",
  en: "Product interfaces for real companies. Now: Viento Norte (n2n) + micro1 (AI data, US). Before: UX Lead SURA (regional, through Jun 2026).",
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
            ? "Interfaces de empresas · alcance Latam y EE.UU. · poco texto."
            : "Company interfaces · Latam and US scope · minimal text."
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
          <p className="mt-1 text-center text-xs font-medium text-muted-foreground lg:text-left">
            {es
              ? "+ AI Trainer · micro1 (EE.UU. · parcial)"
              : "+ AI Trainer · micro1 (US · part-time)"}
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
            aria-label={es ? "Qué suma el perfil" : "What the profile adds up to"}
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
