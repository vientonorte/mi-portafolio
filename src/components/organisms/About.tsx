import { motion, useReducedMotion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { User, Download } from "lucide-react";
// Badge used for craft tags
import { ProfileAvatar } from "../atoms/ProfileAvatar";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { InterfaceWall } from "./InterfaceWall";
import { useLanguage } from "../../lib/LanguageContext";
import { analytics } from "../../lib/analytics";
import { getCvDownloadUrl } from "../../lib/site-contact";

/**
 * L1 card-sort: identidad + evidencia visual.
 * Método (Skills) y Alcance (ProfileScope) van después en SobreMi.
 */
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
  const es = language === "es";
  const roleList = roles[language];

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const },
        transition: { duration: 0.45 },
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
            ? "Identidad + pantallas. Método y alcance vienen después."
            : "Identity + screens. Method and scope come next."
        }
      />

      <motion.div
        {...fadeUp}
        className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left"
      >
        <div className="w-full max-w-[200px] shrink-0">
          <div className="profile-avatar-frame relative aspect-[4/5] w-full">
            <ProfileAvatar alt={`Rodrigo Gaete — ${TITLE_ROLE[language]}`} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold tracking-tight md:text-lg">
            Rodrigo Gaete
          </h3>
          <p className="mt-0.5 text-sm font-medium text-primary">
            {TITLE_ROLE[language]}
          </p>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            {es
              ? "+ AI Trainer · micro1 (EE.UU. · parcial)"
              : "+ AI Trainer · micro1 (US · part-time)"}
          </p>
          <p className="mt-3 text-sm leading-snug text-muted-foreground">
            {LINE[language]}
          </p>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              analytics.downloadCV();
              window.open(getCvDownloadUrl(), "_blank", "noopener,noreferrer");
            }}
            className="mt-4 border-2 group"
          >
            <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            CV PDF
          </Button>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:justify-start">
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
        </div>
      </motion.div>

      <div className="mt-10 border-t border-border/50 pt-8">
        <InterfaceWall />
      </div>
    </PageSection>
  );
}
