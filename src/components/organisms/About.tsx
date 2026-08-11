import { motion, useReducedMotion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { User, Download } from "lucide-react";
import { ProfileAvatar } from "../atoms/ProfileAvatar";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import { analytics } from "../../lib/analytics";
import { getCvDownloadUrl } from "../../lib/site-contact";

/**
 * L1 identidad — layout reclutador: foto + ficha clara.
 * Sin rail, sin chips de alcance, sin wall (van en secciones propias).
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
  es: "Interfaces de producto en empresas reales. Hoy: Viento Norte (n2n) y micro1 (AI data, EE.UU.). Antes: UX Lead SURA (regional, hasta jun. 2026).",
  en: "Product interfaces for real companies. Now: Viento Norte (n2n) and micro1 (AI data, US). Before: UX Lead SURA (regional, through Jun 2026).",
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
      width="content"
      tone="muted"
      aria-labelledby="about-heading"
    >
      <SectionHeader
        badge={es ? "Sobre mí" : "About me"}
        badgeIcon={User}
        titleId="about-heading"
        title={es ? "Perfil" : "Profile"}
        description={
          es
            ? "Ficha clara para reclutamiento. Evidencia visual en la galería."
            : "Clear hiring profile. Visual evidence in the gallery."
        }
      />

      {/* Recruiter scan: 2 columnas fijas, sin widgets a la derecha */}
      <motion.div
        {...fadeUp}
        className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-[200px_1fr] sm:items-start sm:gap-10"
      >
        <div className="mx-auto w-full max-w-[200px] sm:mx-0">
          <div className="profile-avatar-frame relative aspect-[4/5] w-full overflow-hidden rounded-2xl ring-1 ring-border/60">
            <ProfileAvatar alt={`Rodrigo Gaete — ${TITLE_ROLE[language]}`} />
          </div>
        </div>

        <div className="min-w-0 text-center sm:text-left">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Rodrigo Gaete
          </h3>
          <p className="mt-1 text-base font-medium text-primary">
            {TITLE_ROLE[language]}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {es
              ? "+ AI Trainer · micro1 (EE.UU. · jornada parcial)"
              : "+ AI Trainer · micro1 (US · part-time)"}
          </p>
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
            {LINE[language]}
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start">
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                analytics.downloadCV();
                window.open(getCvDownloadUrl(), "_blank", "noopener,noreferrer");
              }}
              className="border-2 group min-h-11"
            >
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              CV PDF
            </Button>
          </div>

          <ul
            className="mt-5 flex flex-wrap justify-center gap-1.5 sm:justify-start"
            aria-label={es ? "Competencias" : "Skills"}
          >
            {roleList.map((role) => (
              <li key={role}>
                <Badge
                  variant="secondary"
                  className="px-2.5 py-1 text-[11px] font-medium"
                >
                  {role}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </PageSection>
  );
}
