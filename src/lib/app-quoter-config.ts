import type { ConsultingPackageId } from "../data/vientonorte-consulting";

/** Solo uso interno del motor — nunca exponer en UI, copy ni analytics. */
const INTERNAL_HOURLY_RATE_USD = 120;

export type DeliverableTierId = "prototype" | "web" | "app" | "enterprise";

export type QuoteFitLevel = "comfortable" | "viable" | "tight" | "gap";

export interface DeliverableTier {
  id: DeliverableTierId;
  /** Horas mínimas viables (interno). */
  minHours: number;
  /** Horas típicas de entrega completa (interno). */
  typicalHours: number;
  consultingPackage: ConsultingPackageId;
  /**
   * Si true: el alcance de *implementación* (backend/app/infra) no es core solo de VN.
   * El motor y la UI muestran honesty “requiere red bajo dirección”.
   */
  requiresNetwork?: boolean;
}

/** Bandas de esfuerzo UX — calibradas a discovery + diseño + handoff (pyme). */
export const DELIVERABLE_TIERS: DeliverableTier[] = [
  { id: "prototype", minHours: 32, typicalHours: 56, consultingPackage: "radar" },
  { id: "web", minHours: 96, typicalHours: 160, consultingPackage: "marco" },
  {
    id: "app",
    minHours: 200,
    typicalHours: 320,
    consultingPackage: "marco",
    requiresNetwork: true,
  },
  { id: "enterprise", minHours: 400, typicalHours: 600, consultingPackage: "ops" },
];

export function getTier(id: DeliverableTierId): DeliverableTier {
  const tier = DELIVERABLE_TIERS.find((t) => t.id === id);
  if (!tier) throw new Error(`Unknown tier: ${id}`);
  return tier;
}

/** Capacidad de inversión en unidades internas — no exportar el rate. */
export function internalCapacityUnits(budgetUsd: number): number {
  if (!Number.isFinite(budgetUsd) || budgetUsd <= 0) return 0;
  return budgetUsd / INTERNAL_HOURLY_RATE_USD;
}

export function tierReferenceBudgetUsd(tier: DeliverableTier): number {
  return tier.typicalHours * INTERNAL_HOURLY_RATE_USD;
}

export function tierMinimumBudgetUsd(tier: DeliverableTier): number {
  return tier.minHours * INTERNAL_HOURLY_RATE_USD;
}