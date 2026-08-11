import {
  Eye,
  Brain,
  Pencil,
  Rocket,
  BarChart3,
  TrendingUp,
  Compass,
  Sparkles,
  Plus,
  Equal,
} from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { ProfileAvatar } from "../atoms/ProfileAvatar";
import { Badge } from "../ui/badge";
import { useLanguage } from "../../lib/LanguageContext";
import { cn } from "../../lib/utils";
import {
  PERFIL_CYCLE,
  PERFIL_DOES,
  PERFIL_EQUATION,
  PERFIL_FIELDS,
  PERFIL_IDENTITY,
  PERFIL_NORTAMIENTO,
  PERFIL_PROJECTS,
  PERFIL_QUOTE,
  PERFIL_TAGLINE,
  PERFIL_TOOLS,
} from "../../data/perfil-estrategico";

const STEP_ICONS = [Eye, Brain, Pencil, Rocket, BarChart3, TrendingUp] as const;

/**
 * Réplica en código del mapa “Perfil estratégico · piso lógico de campo”.
 * No pega la infografía: HTML semántico, responsive, i18n, foto del sistema.
 */
export function PerfilEstrategico() {
  const { language } = useLanguage();
  const es = language === "es";
  const does = PERFIL_DOES[language];
  const fields = PERFIL_FIELDS[language];
  const projects = PERFIL_PROJECTS[language];
  const identity = PERFIL_IDENTITY[language];
  const equation = PERFIL_EQUATION[language];

  return (
    <PageSection
      id="perfil-estrategico"
      padding="default"
      width="wide"
      tone="matte"
      aria-labelledby="perfil-estrategico-heading"
    >
      <SectionHeader
        badge={es ? "Perfil estratégico" : "Strategic profile"}
        badgeIcon={Compass}
        titleId="perfil-estrategico-heading"
        title={es ? "Piso lógico de campo" : "Field logic floor"}
        description={
          es
            ? "Sociopolítica aplicada a sistemas, tecnología y personas — el ciclo con el que trabajo."
            : "Sociopolitics applied to systems, technology, and people — the cycle I work with."
        }
      />

      <div className="mx-auto max-w-6xl space-y-8">
        {/* Quote + identity strip */}
        <blockquote className="rounded-2xl border border-border/60 bg-card/80 px-5 py-4 text-center shadow-sm sm:px-8 sm:py-5">
          <p className="text-base font-medium leading-relaxed text-foreground sm:text-lg">
            “{PERFIL_QUOTE[language]}”
          </p>
          <footer className="mt-3 text-sm text-muted-foreground">
            Rodrigo Gaete Gaona ·{" "}
            {es
              ? "UX Leader & AI Product Designer · Estratega de sistemas de decisión"
              : "UX Leader & AI Product Designer · Decision-systems strategist"}
          </footer>
        </blockquote>

        {/* Main board: cycle + portrait + does */}
        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(200px,240px)_1fr] lg:items-center lg:gap-6">
          {/* Cycle 1–3 mobile/desktop left */}
          <ol className="order-2 space-y-3 lg:order-1">
            {PERFIL_CYCLE.slice(0, 3).map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <li
                  key={step.n}
                  className="flex gap-3 rounded-xl border border-border/50 bg-background/70 p-3 shadow-sm"
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1",
                      step.accent
                    )}
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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

          {/* Portrait center */}
          <div className="order-1 mx-auto w-full max-w-[220px] lg:order-2">
            <div className="relative mx-auto aspect-square max-w-[200px] overflow-hidden rounded-full ring-4 ring-primary/20 shadow-lg">
              <ProfileAvatar
                alt={
                  es
                    ? "Rodrigo Gaete — perfil estratégico"
                    : "Rodrigo Gaete — strategic profile"
                }
              />
            </div>
            <p className="mt-4 text-center text-xs font-semibold uppercase tracking-wider text-primary">
              {PERFIL_TAGLINE[language]}
            </p>
          </div>

          {/* Cycle 4–6 */}
          <ol className="order-3 space-y-3">
            {PERFIL_CYCLE.slice(3, 6).map((step, i) => {
              const Icon = STEP_ICONS[i + 3];
              return (
                <li
                  key={step.n}
                  className="flex gap-3 rounded-xl border border-border/50 bg-background/70 p-3 shadow-sm"
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1",
                      step.accent
                    )}
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
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
        </div>

        {/* What / projects / identity */}
        <div className="grid gap-6 md:grid-cols-3">
          <section
            className="rounded-2xl border border-border/50 bg-card p-5"
            aria-labelledby="perfil-que-hace"
          >
            <h3
              id="perfil-que-hace"
              className="text-sm font-semibold uppercase tracking-wide text-primary"
            >
              {es ? "¿Qué hace?" : "What I do"}
            </h3>
            <ul className="mt-3 space-y-2.5">
              {does.map((line) => (
                <li
                  key={line}
                  className="text-sm leading-snug text-muted-foreground before:mr-2 before:text-primary before:content-['·']"
                >
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section
            className="rounded-2xl border border-border/50 bg-card p-5"
            aria-labelledby="perfil-proyectos"
          >
            <h3
              id="perfil-proyectos"
              className="text-sm font-semibold uppercase tracking-wide text-primary"
            >
              {es ? "Proyectos clave" : "Key projects"}
            </h3>
            <ul className="mt-3 space-y-2">
              {projects.map((p) => (
                <li key={p} className="text-sm leading-snug text-muted-foreground">
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <section
            className="rounded-2xl border border-border/50 bg-card p-5"
            aria-labelledby="perfil-identidad"
          >
            <h3
              id="perfil-identidad"
              className="text-sm font-semibold uppercase tracking-wide text-primary"
            >
              {es ? "Identidad" : "Identity"}
            </h3>
            <ul className="mt-3 space-y-2.5">
              {identity.map((line) => (
                <li key={line} className="text-sm leading-snug text-muted-foreground">
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {PERFIL_TOOLS.map((t) => (
                <Badge key={t} variant="secondary" className="text-[10px] font-normal">
                  {t}
                </Badge>
              ))}
            </div>
          </section>
        </div>

        {/* Fields */}
        <section aria-labelledby="perfil-campos">
          <h3
            id="perfil-campos"
            className="mb-3 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {es ? "Campos que integra" : "Fields integrated"}
          </h3>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-9">
            {fields.map((f) => (
              <li
                key={f.label}
                className="rounded-lg border border-border/40 bg-background/80 px-2 py-2.5 text-center"
              >
                <p className="text-xs font-semibold text-foreground">{f.label}</p>
                <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                  {f.detail}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Equation + nortamiento */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {es ? "Ecuación personal" : "Personal equation"}
            </p>
            <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm font-medium sm:text-base">
              {equation.parts.map((part, i) => (
                <span key={part} className="inline-flex items-center gap-2">
                  {i > 0 && <Plus className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />}
                  <span className="rounded-md bg-background px-2.5 py-1 ring-1 ring-border/60">
                    {part}
                  </span>
                </span>
              ))}
              <Equal className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
              <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-primary-foreground">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                {equation.result}
              </span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{equation.tagline}</p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card px-5 py-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Nortamiento
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              {PERFIL_NORTAMIENTO[language]}
            </p>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
