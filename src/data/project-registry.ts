import {
  companyHubs,
  individualProjects,
  type CompanyHub,
  type EnhancedProject,
} from "./projects-data";
import {
  karriCalculadoraProject,
  karriNotificacionesProject,
  karriDesignSprintProject,
} from "./karri-projects";

export type PortfolioProject = EnhancedProject | typeof karriCalculadoraProject;

export interface ProjectLookupResult {
  project: PortfolioProject;
  companyId?: string;
  companyName?: string;
}

const KARRI_PROJECTS = [
  karriCalculadoraProject,
  karriNotificacionesProject,
  karriDesignSprintProject,
] as const;

function isKarriProject(
  project: PortfolioProject
): project is (typeof KARRI_PROJECTS)[number] {
  return "challenge" in project && "processesApplied" in project;
}

export function getCompanyById(companyId: string): CompanyHub | undefined {
  return companyHubs.find((hub) => hub.id === companyId);
}

export function getProjectById(projectId: string): ProjectLookupResult | undefined {
  for (const hub of companyHubs) {
    const match = hub.projects.find((p) => p.id === projectId);
    if (match) {
      return { project: match, companyId: hub.id, companyName: hub.name };
    }
  }

  const karri = KARRI_PROJECTS.find((p) => p.id === projectId);
  if (karri) {
    return { project: karri, companyId: "transvip", companyName: "Transvip / Karri" };
  }

  const individual = individualProjects.find((p) => p.id === projectId);
  if (individual) {
    return { project: individual };
  }

  return undefined;
}

export function getCompanyIdForProject(projectId: string): string | undefined {
  return getProjectById(projectId)?.companyId;
}

export { isKarriProject };