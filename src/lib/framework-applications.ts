import {
  individualProjects,
  suraHub,
  transvipHub,
  type CompanyHub,
  type EnhancedProject,
} from "../data/projects-data";
import type { Language } from "./i18n";
import { getProjectHeadlineMetrics } from "./project-metrics";

export interface FrameworkApplicationProject {
  id: string;
  name: string;
  description: string;
  period: string;
  tags: string[];
  processCount: number;
  metrics: { label: string; value: string }[];
}

export interface FrameworkCompanyContext {
  id: string;
  name: string;
  period: string;
  challenge: {
    title: string;
    problem: string;
    solution: string;
  };
  projects: FrameworkApplicationProject[];
}

function mapProject(
  project: EnhancedProject,
  language: Language
): FrameworkApplicationProject | null {
  if (!project.id) return null;
  return {
    id: project.id,
    name: project.projectName,
    description:
      language === "en" && project.descriptionEN
        ? project.descriptionEN
        : project.description,
    period: project.period,
    tags: project.tags,
    processCount: project.processes?.length ?? 5,
    metrics: getProjectHeadlineMetrics(project.id, language),
  };
}

function mapHub(
  hub: CompanyHub,
  tabId: string,
  language: Language
): FrameworkCompanyContext {
  const lang = language;
  return {
    id: tabId,
    name: hub.name,
    period: hub.period,
    challenge: {
      title: hub.challenge.title[lang],
      problem: hub.challenge.problem[lang],
      solution: hub.challenge.solution[lang],
    },
    projects: hub.projects
      .map((project) => mapProject(project, language))
      .filter((project): project is FrameworkApplicationProject => project !== null),
  };
}

const otrosChallengeCopy = {
  es: {
    title: "Versatilidad del framework en diversos contextos",
    problem:
      "Cada proyecto presenta desafíos únicos que requieren adaptar la metodología sin perder su esencia.",
    solution:
      "El framework se adapta escalando procesos según complejidad: proyectos pequeños priorizan fases críticas, mientras proyectos enterprise implementan todos los macroprocesos.",
  },
  en: {
    title: "Framework versatility across diverse contexts",
    problem:
      "Each project presents unique challenges requiring methodology adaptation without losing its essence.",
    solution:
      "The framework adapts by scaling processes based on complexity: small projects prioritize critical phases, while enterprise projects implement all macro-processes.",
  },
} as const;

export function getFrameworkCompanyContexts(
  language: Language
): FrameworkCompanyContext[] {
  const lang = language;
  const otrosProjects = individualProjects
    .map((project) => mapProject(project, language))
    .filter((project): project is FrameworkApplicationProject => project !== null);

  return [
    mapHub(transvipHub, "transvip", language),
    mapHub(suraHub, "sura", language),
    {
      id: "otros",
      name: lang === "es" ? "Otros Proyectos" : "Other Projects",
      period: "2019 - 2024",
      challenge: otrosChallengeCopy[lang],
      projects: otrosProjects,
    },
  ];
}