import { motion, useReducedMotion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  User,
  Download,
  Eye,
  Brain,
  Pencil,
  Rocket,
  BarChart3,
  TrendingUp,
  Plus,
  Equal,
} from "lucide-react";
import { ProfileAvatar } from "../atoms/ProfileAvatar";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import { analytics } from "../../lib/analytics";
import { getCvDownloadUrl } from "../../lib/site-contact";
import { cn } from "../../lib/utils";
import {
  PERFIL_CYCLE,
  PERFIL_EQUATION,
  PERFIL_FIELDS,
  PERFIL_QUOTE,
  PERFIL_TAGLINE,
} from "../../data/perfil-estrategico";

/**
 * L1 unificado: ficha reclutador + ciclo de decisión (un solo bloque).
 * Sin segunda sección / sin foto duplicada.
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

const STEP_ICONS = [Eye, Brain, Pencil, Rocket, BarChart3, TrendingUp] as const;

export function About() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const es = language === "es";
  const roleList = roles[language];
  const equation = PERFIL_EQUATION[language];
  const fields = PERFIL_FIELDS[language];

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
            ? "UX Manager en Viento Norte. Ciclo de decisión sobre sistemas, tecnología y personas."
            : "UX Manager at Viento Norte. Decision cycle across systems, technology, and people."
        }
      />

      {/* Ficha + foto */}
      <motion.div
        {...fadeUp}
        className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-[180px_1fr] sm:items-start sm:gap-8"
      >
        <div className="mx-auto w-full max-w-[180px] sm:mx-0">
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
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
            {LINE[language]}
          </p>
          <p className="mt-3 max-w-prose text-sm italic leading-relaxed text-foreground/80">
            “{PERFIL_QUOTE[language]}”
          </p>

          <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start">
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
            className="mt-4 flex flex-wrap justify-center gap-1.5 sm:justify-start"
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

      {/* Ciclo unificado — mismo section, sin segundo header/foto */}
      <div
        id="perfil-estrategico"
        className="mx-auto mt-10 max-w-3xl scroll-mt-24 border-t border-border/50 pt-8"
      >
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {PERFIL_TAGLINE[language]}
        </p>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          {es
            ? "Ciclo de decisión · Observa → Escala"
            : "Decision cycle · Observe → Scale"}
        </p>

        <ol
          className="mt-5 grid gap-2 sm:grid-cols-2 sm:gap-2.5"
          aria-label={es ? "Ciclo de trabajo" : "Work cycle"}
        >
          {PERFIL_CYCLE.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li
                key={step.n}
                className="flex gap-2.5 rounded-xl border border-border/40 bg-background/50 px-3 py-2.5"
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1",
                    step.accent
                  )}
                  aria-hidden
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {step.n}. {es ? step.titleEs : step.titleEn}
                  </p>
                  <p className="mt-0.5 text-sm leading-snug text-foreground/90">
                    {es ? step.bodyEs : step.bodyEn}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <ul
          className="mt-5 flex flex-wrap justify-center gap-1.5"
          aria-label={es ? "Campos que integra" : "Fields integrated"}
        >
          {fields.map((f) => (
            <li
              key={f.label}
              className="rounded-full border border-border/50 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
              title={f.detail}
            >
              {f.label}
            </li>
          ))}
        </ul>

        <p className="mt-5 flex flex-wrap items-center justify-center gap-1.5 text-center text-sm">
          <span className="sr-only">
            {es ? "Ecuación: " : "Equation: "}
            {equation.parts.join(" + ")} = {equation.result}
          </span>
          {equation.parts.map((part, i) => (
            <span key={part} className="inline-flex items-center gap-1.5" aria-hidden>
              {i > 0 && <Plus className="h-3 w-3 text-muted-foreground" />}
              <span className="rounded-md bg-background px-2 py-0.5 text-xs font-medium ring-1 ring-border/50">
                {part}
              </span>
            </span>
          ))}
          <Equal className="h-3 w-3 text-muted-foreground" aria-hidden />
          <span
            className="rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground"
            aria-hidden
          >
            {equation.result}
          </span>
        </p>
      </div>
    </PageSection>
  );
}
