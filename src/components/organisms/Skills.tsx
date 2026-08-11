import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  BarChart3,
  Search,
  Palette,
  TestTube,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";
import { PageSection } from "../layout/PageSection";
import { useLanguage } from "../../lib/LanguageContext";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";
import { ROUTES } from "../../lib/routes";

const CHIPS = {
  es: [
    "Figma",
    "Design systems",
    "Research",
    "Design Thinking",
    "Sprints",
    "WCAG",
    "Handoff",
    "Analytics",
    "Product",
    "Brand UX",
  ],
  en: [
    "Figma",
    "Design systems",
    "Research",
    "Design Thinking",
    "Sprints",
    "WCAG",
    "Handoff",
    "Analytics",
    "Product",
    "Brand UX",
  ],
} as const;

/** 5 macroprocesos = Flujo de Mejora Continua */
const FLOW_PHASES = [
  {
    id: "ux-analytics",
    icon: BarChart3,
    title: { es: "UX Analytics", en: "UX Analytics" },
    blurb: {
      es: "Datos y fricción real antes de diseñar.",
      en: "Real data and friction before design.",
    },
  },
  {
    id: "ux-research",
    icon: Search,
    title: { es: "UX Research", en: "UX Research" },
    blurb: {
      es: "Entrevistas, patrones y contexto de uso.",
      en: "Interviews, patterns, and use context.",
    },
  },
  {
    id: "ux-ui-design",
    icon: Palette,
    title: { es: "UX/UI Design", en: "UX/UI Design" },
    blurb: {
      es: "Ideación, wireframes y prototipos.",
      en: "Ideation, wireframes, and prototypes.",
    },
  },
  {
    id: "ux-testing",
    icon: TestTube,
    title: { es: "UX Testing", en: "UX Testing" },
    blurb: {
      es: "Validación con usuarios antes de build.",
      en: "User validation before build.",
    },
  },
  {
    id: "refinamiento",
    icon: RefreshCw,
    title: { es: "Refinamiento", en: "Refinement" },
    blurb: {
      es: "Iteración post-lanzamiento con métricas.",
      en: "Post-launch iteration with metrics.",
    },
  },
] as const;

/**
 * Método Ro — solo Flujo de Mejora Continua (interactivo).
 * Sin panel secundario de artefactos (ruido / duplicado del proceso).
 */
export function Skills() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const es = language === "es";
  const chips = CHIPS[language];
  const [activePhase, setActivePhase] = useState<string>("ux-analytics");

  const activeBlurb =
    FLOW_PHASES.find((p) => p.id === activePhase)?.blurb[language] ?? "";

  return (
    <PageSection
      id="habilidades"
      padding="compact"
      width="wide"
      tone="default"
      aria-labelledby="skills-heading"
    >
      <SectionHeader
        badge={es ? "Método Ro" : "Método Ro"}
        badgeIcon={Sparkles}
        titleId="skills-heading"
        title={es ? "Método en una mirada" : "Method at a glance"}
        description={
          es
            ? "Flujo de mejora continua. Toca una fase para el detalle."
            : "Continuous improvement flow. Tap a phase for detail."
        }
      />

      <div
        id="flujo-mejora-continua"
        className="scroll-mt-24 rounded-2xl border border-border/40 bg-zinc-950 px-4 py-8 text-zinc-50 shadow-lg sm:px-8 sm:py-10"
      >
        <h3 className="text-center text-lg font-semibold tracking-tight text-white sm:text-xl">
          {es ? "Flujo de Mejora Continua" : "Continuous Improvement Flow"}
        </h3>

        <div className="mt-8 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            className="mx-auto flex min-w-min items-center justify-center gap-1 px-1 sm:gap-2 md:gap-3"
            role="list"
            aria-label={
              es
                ? "Fases del flujo de mejora continua"
                : "Continuous improvement phases"
            }
          >
            {FLOW_PHASES.map((phase, idx) => {
              const Icon = phase.icon;
              const isActive = activePhase === phase.id;
              return (
                <div
                  key={phase.id}
                  className="flex items-center gap-1 sm:gap-2 md:gap-3"
                  role="listitem"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActivePhase(phase.id);
                      navigate(ROUTES.processPhase(phase.id));
                    }}
                    onMouseEnter={() => setActivePhase(phase.id)}
                    onFocus={() => setActivePhase(phase.id)}
                    className={cn(
                      "flex w-[4.5rem] flex-col items-center gap-2 rounded-xl p-1 transition-transform sm:w-[5.5rem]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
                      "hover:scale-105 active:scale-95"
                    )}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={
                      es
                        ? `Abrir fase ${phase.title.es}`
                        : `Open ${phase.title.en} phase`
                    }
                  >
                    <span
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full border-2 transition-colors sm:h-16 sm:w-16",
                        isActive
                          ? "border-primary bg-primary/20 text-primary shadow-[0_0_24px_rgba(255,147,30,0.35)]"
                          : "border-primary/50 bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
                    </span>
                    <span className="text-center text-[10px] font-medium leading-tight text-zinc-200 sm:text-xs">
                      {phase.title[language]}
                    </span>
                  </button>
                  {idx < FLOW_PHASES.length - 1 && (
                    <ArrowRight
                      className="mb-6 h-4 w-4 shrink-0 text-primary/70 sm:mb-7 sm:h-5 sm:w-5"
                      aria-hidden
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p
          className="mt-5 min-h-[1.25rem] text-center text-sm text-zinc-400"
          aria-live="polite"
        >
          {activeBlurb}
        </p>
      </div>

      <div
        className="mt-5 flex flex-wrap justify-center gap-2"
        role="list"
        aria-label={es ? "Herramientas" : "Tools"}
      >
        {chips.map((chip) => (
          <Badge
            key={chip}
            variant="outline"
            className="border-border/80 px-3 py-1.5 text-sm font-medium"
          >
            {chip}
          </Badge>
        ))}
      </div>
    </PageSection>
  );
}
