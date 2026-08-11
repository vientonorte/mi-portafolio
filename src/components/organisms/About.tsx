import { useState } from "react";
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
  ChevronDown,
  ChevronUp,
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
 * Perfil con prácticas de interacción del sitio:
 * - un detalle a la vez (ciclo por dots)
 * - revelación progresiva (campos / cita)
 * - menos dump visual en el primer viewport
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

/** Chips visibles sin expandir (ruido bajo). */
const ROLE_CHIPS_INITIAL = 4;

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

  const [activeStep, setActiveStep] = useState(0);
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showFields, setShowFields] = useState(false);

  const step = PERFIL_CYCLE[activeStep] ?? PERFIL_CYCLE[0];
  const StepIcon = STEP_ICONS[activeStep] ?? Eye;
  const visibleRoles = showAllRoles
    ? roleList
    : roleList.slice(0, ROLE_CHIPS_INITIAL);

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
            ? "UX Manager · Viento Norte. Un ciclo de decisión, un paso a la vez."
            : "UX Manager · Viento Norte. One decision cycle, one step at a time."
        }
      />

      {/* ── Ficha reclutador (denso bajo) ── */}
      <motion.div
        {...fadeUp}
        className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-8"
      >
        <div className="mx-auto w-full max-w-[160px] sm:mx-0">
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

          <div className="mt-4 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-start sm:gap-3">
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
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-muted-foreground"
              aria-expanded={showQuote}
              onClick={() => setShowQuote((v) => !v)}
            >
              {showQuote
                ? es
                  ? "Ocultar cita"
                  : "Hide quote"
                : es
                  ? "Cita de trabajo"
                  : "Working quote"}
              {showQuote ? (
                <ChevronUp className="ml-1 h-3.5 w-3.5" aria-hidden />
              ) : (
                <ChevronDown className="ml-1 h-3.5 w-3.5" aria-hidden />
              )}
            </Button>
          </div>

          {showQuote && (
            <p
              className="mt-3 max-w-prose text-sm italic leading-relaxed text-foreground/80"
              aria-live="polite"
            >
              “{PERFIL_QUOTE[language]}”
            </p>
          )}

          <ul
            className="mt-4 flex flex-wrap justify-center gap-1.5 sm:justify-start"
            aria-label={es ? "Competencias" : "Skills"}
          >
            {visibleRoles.map((role) => (
              <li key={role}>
                <Badge
                  variant="secondary"
                  className="px-2.5 py-1 text-[11px] font-medium"
                >
                  {role}
                </Badge>
              </li>
            ))}
            {roleList.length > ROLE_CHIPS_INITIAL && (
              <li>
                <button
                  type="button"
                  onClick={() => setShowAllRoles((v) => !v)}
                  className="rounded-full border border-border/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  {showAllRoles
                    ? es
                      ? "Menos"
                      : "Less"
                    : `+${roleList.length - ROLE_CHIPS_INITIAL}`}
                </button>
              </li>
            )}
          </ul>
        </div>
      </motion.div>

      {/* ── Ciclo: dots + un detalle (práctica: un paso a la vez) ── */}
      <div
        id="perfil-estrategico"
        className="mx-auto mt-10 max-w-3xl scroll-mt-24 border-t border-border/40 pt-8"
      >
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {PERFIL_TAGLINE[language]}
        </p>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          {es
            ? "Ciclo de decisión · toca un paso"
            : "Decision cycle · tap a step"}
        </p>

        {/* Dot rail — same pattern as timeline / Flujo Mejora Continua */}
        <div
          className="mt-5 flex flex-wrap items-center justify-center gap-1 sm:gap-2"
          role="tablist"
          aria-label={es ? "Pasos del ciclo" : "Cycle steps"}
        >
          {PERFIL_CYCLE.map((s, i) => {
            const Icon = STEP_ICONS[i];
            const selected = i === activeStep;
            return (
              <button
                key={s.n}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="perfil-step-panel"
                id={`perfil-step-tab-${s.n}`}
                onClick={() => setActiveStep(i)}
                className={cn(
                  "flex min-h-11 min-w-[3.25rem] flex-col items-center gap-1 rounded-xl px-1.5 py-1.5 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2",
                    selected
                      ? "border-primary bg-primary/15"
                      : "border-border/60 bg-background/80"
                  )}
                  aria-hidden
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-semibold tabular-nums">
                  {s.n}
                </span>
              </button>
            );
          })}
        </div>

        {/* Un solo panel de detalle */}
        <div
          id="perfil-step-panel"
          role="tabpanel"
          aria-labelledby={`perfil-step-tab-${step.n}`}
          className="mt-4 rounded-xl border border-border/50 bg-card/80 px-4 py-4 text-center sm:px-6"
          aria-live="polite"
        >
          <div className="mx-auto flex max-w-md flex-col items-center gap-2">
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full ring-1",
                step.accent
              )}
              aria-hidden
            >
              <StepIcon className="h-5 w-5" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {step.n}. {es ? step.titleEs : step.titleEn}
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">
              {es ? step.bodyEs : step.bodyEn}
            </p>
          </div>
        </div>

        {/* Campos: progressive disclosure (como prácticas “mostrar más”) */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            aria-expanded={showFields}
            onClick={() => setShowFields((v) => !v)}
          >
            {showFields
              ? es
                ? "Ocultar campos"
                : "Hide fields"
              : es
                ? `Campos que integra (${fields.length})`
                : `Fields integrated (${fields.length})`}
            {showFields ? (
              <ChevronUp className="ml-1 h-3.5 w-3.5" aria-hidden />
            ) : (
              <ChevronDown className="ml-1 h-3.5 w-3.5" aria-hidden />
            )}
          </Button>
          {showFields && (
            <ul
              className="flex flex-wrap justify-center gap-1.5"
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
          )}
        </div>

        {/* Ecuación: una línea quieta (siempre) */}
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
