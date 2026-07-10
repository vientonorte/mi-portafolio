import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { User, Download, Globe2, Layers2, Timer } from "lucide-react";
import { ProfileAvatar } from "../atoms/ProfileAvatar";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import { analytics } from "../../lib/analytics";
import { getCvDownloadUrl } from "../../lib/site-contact";
import { cn } from "../../lib/utils";

const roles = [
  "Head UX",
  "Lead UX",
  "Product Designer",
  "UI Designer",
  "User Research",
  "Design Thinking Facilitator",
];

/** Prueba del título: 3+ años · 2 verticales · impacto regional (datos del portafolio). */
const PROOF_POINTS = {
  es: [
    {
      icon: Timer,
      label: "3+ años",
      detail: "Transvip → SURA · Lead / Senior Product",
    },
    {
      icon: Layers2,
      label: "2 verticales",
      detail: "Fintech (Wealth) + Mobility",
    },
    {
      icon: Globe2,
      label: "Impacto regional",
      detail: "SURA · 5+ países · −40% onboarding",
    },
  ],
  en: [
    {
      icon: Timer,
      label: "3+ years",
      detail: "Transvip → SURA · Lead / Senior Product",
    },
    {
      icon: Layers2,
      label: "2 verticals",
      detail: "Fintech (Wealth) + Mobility",
    },
    {
      icon: Globe2,
      label: "Regional impact",
      detail: "SURA · 5+ countries · −40% onboarding",
    },
  ],
} as const;

const BIO = {
  es: [
    "Rodrigo Gaete — Lead UX Designer. Más de 3 años implementando UX/UI de punta a punta: de Senior Product Designer en mobility (Transvip / Karri) a UX Lead en Wealth Management en SURA Investments.",
    "Dos verticales, un mismo estándar de método: research, Design Thinking, Design Sprints, design system y arquitectura de información. En fintech, onboarding regulado, auth multi-perfil y plataformas de inversión con alcance regional (5+ países). En mobility, design system web + app, discovery activo y handoff a desarrollo.",
    "El impacto se mide: −40% en onboarding SURA, design system y handoff navegable en Transvip/Karri, y entrega alineada a WCAG y cumplimiento cuando el producto lo exige — no solo pantallas, criterios de aceptación y evidencia.",
  ],
  en: [
    "Rodrigo Gaete — Lead UX Designer. 3+ years shipping end-to-end UX/UI: from Senior Product Designer in mobility (Transvip / Karri) to UX Lead in Wealth Management at SURA Investments.",
    "Two verticals, one method standard: research, Design Thinking, Design Sprints, design systems, and information architecture. In fintech — regulated onboarding, multi-profile auth, and investment platforms with regional reach (5+ countries). In mobility — web + app design system, active discovery, and dev handoff.",
    "Impact is measured: −40% SURA onboarding, navigable design system and handoff at Transvip/Karri, and delivery aligned to WCAG and compliance when the product requires it — not just screens, but acceptance criteria and evidence.",
  ],
} as const;

export function About() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const proof = PROOF_POINTS[language];
  const bio = BIO[language];

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true as const },
          transition: { duration: 0.6, delay },
        };

  const handleDownloadCV = () => {
    analytics.downloadCV();
    window.open(getCvDownloadUrl(), "_blank", "noopener,noreferrer");
  };

  return (
    <PageSection
      id="sobre-mi"
      padding="compact"
      width="narrow"
      tone="muted"
      aria-labelledby="about-heading"
    >
      <SectionHeader
        badge={language === "es" ? "Sobre mí" : "About me"}
        badgeIcon={User}
        titleId="about-heading"
        title={
          language === "es"
            ? "3+ años. 2 verticales. Impacto regional."
            : "3+ years. 2 verticals. Regional impact."
        }
        description={
          language === "es"
            ? "Trayectoria con evidencia de producto — no un párrafo genérico de LinkedIn."
            : "Product evidence in the track record — not a generic LinkedIn blurb."
        }
      />

      {/* Tres claims del título, con dato del portafolio */}
      <ul
        className="mb-8 grid gap-3 sm:grid-cols-3"
        role="list"
        aria-label={
          language === "es"
            ? "Resumen de trayectoria"
            : "Career summary"
        }
      >
        {proof.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.li
              key={item.label}
              {...fadeUp(0.05 * index)}
              className={cn(
                "rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated p-4",
                "flex flex-col gap-1.5 text-left"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                </span>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
              </div>
              <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
                {item.detail}
              </p>
            </motion.li>
          );
        })}
      </ul>

      <div className="space-y-6">
        <motion.div
          {...fadeUp(0.1)}
          className="flex flex-col items-start gap-6 md:flex-row md:gap-8"
        >
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
            className="group mx-auto flex-shrink-0 md:mx-0"
          >
            <div className="profile-avatar-frame relative aspect-[4/5] w-36 md:w-44">
              <div
                className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-brand-gradient opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-20"
                aria-hidden="true"
              />
              <ProfileAvatar alt="Rodrigo Gaete — Lead UX Designer" />
            </div>
          </motion.div>

          <div className="min-w-0 flex-1 text-center md:text-left">
            <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              Rodrigo Gaete — Lead UX Designer
            </h3>
            <p className="mt-1 text-sm font-medium text-primary">
              {language === "es"
                ? "UX Lead · SURA Investments · Wealth Management regional"
                : "UX Lead · SURA Investments · Regional Wealth Management"}
            </p>

            <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
              {bio.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>

            <Button
              size="lg"
              variant="outline"
              onClick={handleDownloadCV}
              className="mt-6 group border-2 transition-all hover:border-primary hover:bg-primary/5"
            >
              <Download className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              {language === "es" ? "Descargar CV" : "Download CV"}
            </Button>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <Card className="border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated shadow-none">
            <CardContent className="p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {language === "es" ? "Roles que desempeño" : "Roles I perform"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {roles.map((role, index) => (
                  <motion.div
                    key={role}
                    {...(prefersReducedMotion
                      ? {}
                      : {
                          initial: { opacity: 0, scale: 0.9 },
                          whileInView: { opacity: 1, scale: 1 },
                          viewport: { once: true },
                          transition: { delay: 0.15 + index * 0.04 },
                        })}
                    whileHover={
                      prefersReducedMotion ? undefined : { scale: 1.04, y: -1 }
                    }
                  >
                    <Badge
                      variant="secondary"
                      className="cursor-default px-3 py-1.5 text-sm transition-colors hover:bg-primary/10"
                    >
                      {role}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageSection>
  );
}
