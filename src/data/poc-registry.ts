/**
 * Registro de POCs adicionales (issue #97).
 * Flujo: añadir entrada aquí → validar URL → promover a projects-data.ts + métricas + screenshot.
 * Ver MAINTENANCE_GUIDE § Backlog para nuevos POCs.
 */

export interface PocRegistryEntry {
  id: string;
  externalLink: string;
  /** Clave semántica en portfolio-image-urls (ej. sura.iaAutomationDashboard) */
  imageKey: string;
  featuredInGrid?: boolean;
  status: "draft" | "ready" | "published";
}

/** POCs publicados viven en projects-data.ts; este array es la cola de integración. */
export const POC_REGISTRY: PocRegistryEntry[] = [
  {
    id: "sura-ia-automation-dashboard",
    externalLink: "https://badge-sweet-21070688.figma.site",
    imageKey: "sura.iaAutomationDashboard",
    featuredInGrid: true,
    status: "published",
  },
];

export function getPendingPocs(): PocRegistryEntry[] {
  return POC_REGISTRY.filter((entry) => entry.status !== "published");
}