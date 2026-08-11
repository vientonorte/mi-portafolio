import {
  Eye,
  Brain,
  Pencil,
  Rocket,
  BarChart3,
  TrendingUp,
  Compass,
  Plus,
  Equal,
} from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import { cn } from "../../lib/utils";
import {
  PERFIL_CYCLE,
  PERFIL_EQUATION,
  PERFIL_FIELDS,
  PERFIL_QUOTE,
  PERFIL_TAGLINE,
} from "../../data/perfil-estrategico";

const STEP_ICONS = [Eye, Brain, Pencil, Rocket, BarChart3, TrendingUp] as const;

/**
 * Piso lógico de campo — versión minimal.
 * Sin foto (ya en About), sin tools/proyectos/identidad (Skills, Experience, evidencia).
 * Solo: ciclo 1–6 + campos + ecuación.
 */
export function PerfilEstrategico() {
  const { language } = useLanguage();
  const es = language === "es";
  const equation = PERFIL_EQUATION[language];
  const fields = PERFIL_FIELDS[language];

  return (
    <PageSection
      id="perfil-estrategico"
      padding="compact"
      width="content"
      tone="matte"
      aria-labelledby="perfil-estrategico-heading"
    >
      <SectionHeader
        badge={es ? "Piso lógico" : "Field logic"}
        badgeIcon={Compass}
        titleId="perfil-estrategico-heading"
        title={es ? "Ciclo de decisión" : "Decision cycle"}
        description={
          es
            ? "Sociopolítica aplicada a sistemas, tecnología y personas."
            : "Sociopolitics applied to systems, technology, and people."
        }
      />

      <div className="mx-auto max-w-3xl space-y-6">
        <p className="text-center text-sm italic leading-relaxed text-muted-foreground">
          “{PERFIL_QUOTE[language]}”
        </p>

        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {PERFIL_TAGLINE[language]}
        </p>

        {/* 6 pasos — grilla, sin foto al centro */}
        <ol
          className="grid gap-2 sm:grid-cols-2 sm:gap-3"
          aria-label={es ? "Ciclo de trabajo" : "Work cycle"}
        >
          {PERFIL_CYCLE.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li
                key={step.n}
                className="flex gap-3 rounded-xl border border-border/40 bg-background/60 px-3 py-2.5"
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

        {/* Campos — solo labels, una línea */}
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

        {/* Ecuación en una línea */}
        <p className="flex flex-wrap items-center justify-center gap-1.5 text-center text-sm">
          <span className="sr-only">
            {es ? "Ecuación personal: " : "Personal equation: "}
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
