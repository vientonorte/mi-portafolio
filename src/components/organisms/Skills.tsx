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
  ChevronRight,
} from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";
import { PageSection } from "../layout/PageSection";
import { METHOD_STRIP } from "../../data/about-visuals";
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

const ARTIFACT_BLURB = {
  es: {
    journey: "Mapas de journey reales del craft — fricción y oportunidades.",
    flow: "Flujos de tarea y decisiones de producto en alta fidelidad.",
    test: "Validación con usuarios: usabilidad, A/B y estados de error.",
    system: "Tokens, componentes y handoff listos para construir.",
  },
  en: {
    journey: "Real craft journey maps — friction and opportunities.",
    flow: "Task flows and product decisions in high fidelity.",
    test: "User validation: usability, A/B, and error states.",
    system: "Tokens, components, and handoff ready to build.",
  },
} as const;

/** 5 macroprocesos = Flujo de Mejora Continua (ya en /proceso). */
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

type ArtifactId = "journey" | "flow" | "test" | "system";

/**
 * Método en una mirada:
 * 1) Panel de artefactos con imágenes — interactivo
 * 2) Flujo de Mejora Continua (reemplaza Cadena estática) — interactivo → /proceso/fase/:id
 */
export function Skills() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const es = language === "es";
  const chips = CHIPS[language];
  const artifacts = METHOD_STRIP.filter(
    (item): item is (typeof METHOD_STRIP)[number] & { id: ArtifactId } =>
      item.id !== "value"
  );
  const [activeArtifact, setActiveArtifact] = useState<ArtifactId>("journey");
  const [activePhase, setActivePhase] = useState<string | null>(null);

  const selected = artifacts.find((a) => a.id === activeArtifact) ?? artifacts[0];
  const selectedBlurb = ARTIFACT_BLURB[language][activeArtifact];

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
            ? "Artefactos con imagen real. Flujo de mejora continua interactivo (no diagrama estático)."
            : "Real craft artifacts. Interactive continuous-improvement flow (not a static diagram)."
        }
      />

      {/* ── Panel interactivo: Journey / Flows / Test / System ── */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {es ? "Artefactos del craft" : "Craft artifacts"}
        </p>
        <ul
          className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3"
          role="listbox"
          aria-label={es ? "Artefactos de método" : "Method artifacts"}
          aria-activedescendant={`method-artifact-${activeArtifact}`}
        >
          {artifacts.map((item) => {
            const selectedCard = item.id === activeArtifact;
            return (
              <li key={item.id} role="option" aria-selected={selectedCard} id={`method-artifact-${item.id}`}>
                <button
                  type="button"
                  onClick={() => setActiveArtifact(item.id as ArtifactId)}
                  className={cn(
                    "group relative aspect-[4/3] w-full overflow-hidden rounded-xl border text-left transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    selectedCard
                      ? "border-primary ring-2 ring-primary/40"
                      : "border-[color:var(--logo-surface-border)] hover:border-primary/40"
                  )}
                >
                  <img
                    src={item.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent"
                    aria-hidden
                  />
                  <span className="absolute bottom-2 left-2 text-xs font-semibold text-foreground">
                    {item.label[language]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Detalle expandido del artefacto seleccionado */}
        <div
          className="overflow-hidden rounded-xl border border-border/60 bg-card"
          aria-live="polite"
        >
          <div className="grid gap-0 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="relative aspect-[16/10] bg-muted/30 md:aspect-auto md:min-h-[220px]">
              <img
                src={selected.src}
                alt={
                  es
                    ? `Artefacto ${selected.label.es}`
                    : `${selected.label.en} artifact`
                }
                className="absolute inset-0 h-full w-full object-contain object-center p-2 sm:object-cover sm:object-top sm:p-0"
              />
            </div>
            <div className="flex flex-col justify-center gap-3 p-4 sm:p-6">
              <h3 className="text-lg font-semibold tracking-tight">
                {selected.label[language]}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {selectedBlurb}
              </p>
              <button
                type="button"
                onClick={() => navigate(ROUTES.process)}
                className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {es ? "Ver método y fases" : "See method and phases"}
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Flujo de Mejora Continua (reemplaza Cadena estática) ── */}
      <div className="mt-8 rounded-2xl border border-border/50 bg-muted/20 p-5 sm:p-8">
        <h3 className="text-center text-base font-semibold tracking-tight sm:text-lg">
          {es ? "Flujo de Mejora Continua" : "Continuous Improvement Flow"}
        </h3>
        <p className="mx-auto mt-1 max-w-lg text-center text-xs text-muted-foreground sm:text-sm">
          {es
            ? "Toca una fase para abrir su detalle. Misma cadena de valor, interactiva."
            : "Tap a phase to open its detail. Same value chain, interactive."}
        </p>

        <div
          className="mt-6 flex flex-wrap items-start justify-center gap-2 sm:gap-1"
          role="list"
          aria-label={es ? "Fases del flujo" : "Flow phases"}
        >
          {FLOW_PHASES.map((phase, idx) => {
            const Icon = phase.icon;
            const isActive = activePhase === phase.id;
            return (
              <div key={phase.id} className="flex items-center gap-1 sm:gap-2" role="listitem">
                <button
                  type="button"
                  onClick={() => {
                    setActivePhase(phase.id);
                    navigate(ROUTES.processPhase(phase.id));
                  }}
                  onMouseEnter={() => setActivePhase(phase.id)}
                  onFocus={() => setActivePhase(phase.id)}
                  className={cn(
                    "flex w-[4.75rem] flex-col items-center gap-1.5 rounded-xl p-1.5 transition-colors sm:w-24",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive ? "bg-primary/10" : "hover:bg-muted/60"
                  )}
                  aria-label={
                    es
                      ? `Abrir fase ${phase.title.es}`
                      : `Open ${phase.title.en} phase`
                  }
                >
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border-2 sm:h-14 sm:w-14",
                      isActive
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-primary/30 bg-primary/10 text-primary"
                    )}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                  </span>
                  <span className="text-center text-[10px] font-medium leading-tight sm:text-xs">
                    {phase.title[language]}
                  </span>
                </button>
                {idx < FLOW_PHASES.length - 1 && (
                  <ArrowRight
                    className="mb-6 hidden h-4 w-4 shrink-0 text-muted-foreground sm:block"
                    aria-hidden
                  />
                )}
              </div>
            );
          })}
        </div>

        {activePhase && (
          <p className="mt-4 text-center text-sm text-muted-foreground" aria-live="polite">
            {
              FLOW_PHASES.find((p) => p.id === activePhase)?.blurb[language]
            }
          </p>
        )}
      </div>

      <div
        className="mt-6 flex flex-wrap gap-2"
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
