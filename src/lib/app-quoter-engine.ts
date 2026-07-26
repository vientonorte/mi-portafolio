import type { ConsultingPackageId } from "../data/vientonorte-consulting";
import {
  DELIVERABLE_TIERS,
  type DeliverableTier,
  type DeliverableTierId,
  type QuoteFitLevel,
  getTier,
  internalCapacityUnits,
  tierMinimumBudgetUsd,
  tierReferenceBudgetUsd,
} from "./app-quoter-config";
import {
  formatQuoterAmount,
  type QuoterCurrency,
} from "./app-quoter-currency";

export interface QuoteResult {
  budgetUsd: number;
  /** Monto en la moneda elegida por el usuario (display). */
  budgetDisplay: number;
  currency: QuoterCurrency;
  selectedTierId: DeliverableTierId;
  fit: QuoteFitLevel;
  /** 0–100 — alineación presupuesto vs expectativa (sin revelar tarifa). */
  alignmentScore: number;
  affordableTierId: DeliverableTierId;
  recommendedPackage: ConsultingPackageId;
  /**
   * Implementación de app/backend no es core solo VN — requiere red bajo dirección.
   * El diseño/alcance UX sí es consultoría VN.
   */
  requiresNetwork: boolean;
  /** Incremento sugerido en % (solo si fit === gap o tight). */
  suggestedBudgetIncreasePercent?: { low: number; high: number };
}

function computeFit(capacity: number, tier: DeliverableTier): QuoteFitLevel {
  if (capacity >= tier.typicalHours) return "comfortable";
  if (capacity >= tier.minHours) return "viable";
  if (capacity >= tier.minHours * 0.65) return "tight";
  return "gap";
}

function computeAlignmentScore(budgetUsd: number, tier: DeliverableTier): number {
  const reference = tierReferenceBudgetUsd(tier);
  if (reference <= 0) return 0;
  return Math.min(100, Math.round((budgetUsd / reference) * 100));
}

function bestAffordableTier(capacity: number): DeliverableTier {
  const ordered = [...DELIVERABLE_TIERS].reverse();
  return ordered.find((t) => capacity >= t.minHours) ?? DELIVERABLE_TIERS[0];
}

function suggestIncreasePercent(budgetUsd: number, tier: DeliverableTier): { low: number; high: number } {
  const minBudget = tierMinimumBudgetUsd(tier);
  const gap = Math.max(0, minBudget - budgetUsd);
  if (gap <= 0 || budgetUsd <= 0) return { low: 15, high: 25 };

  const raw = (gap / budgetUsd) * 100;
  const low = Math.max(10, Math.round(raw / 5) * 5);
  const high = Math.min(120, low + 15);
  return { low, high };
}

export function calculateAppQuote(
  budgetUsd: number,
  selectedTierId: DeliverableTierId,
  options?: {
    currency?: QuoterCurrency;
    budgetDisplay?: number;
  }
): QuoteResult | null {
  if (!Number.isFinite(budgetUsd) || budgetUsd < 500) return null;

  const currency = options?.currency ?? "USD";
  const budgetDisplay = options?.budgetDisplay ?? budgetUsd;

  const tier = getTier(selectedTierId);
  const capacity = internalCapacityUnits(budgetUsd);
  const fit = computeFit(capacity, tier);
  const affordable = bestAffordableTier(capacity);
  const alignmentScore = computeAlignmentScore(budgetUsd, tier);

  const needsIncrease = fit === "gap" || fit === "tight";

  return {
    budgetUsd,
    budgetDisplay,
    currency,
    selectedTierId,
    fit,
    alignmentScore,
    affordableTierId: affordable.id,
    recommendedPackage:
      fit === "comfortable" || fit === "viable" ? tier.consultingPackage : affordable.consultingPackage,
    requiresNetwork: Boolean(tier.requiresNetwork),
    suggestedBudgetIncreasePercent: needsIncrease
      ? suggestIncreasePercent(budgetUsd, tier)
      : undefined,
  };
}

export function buildAppQuoterContactMessage(
  language: "es" | "en",
  result: QuoteResult,
  tierLabel: string,
  fitLabel: string,
  affordableLabel: string
): string {
  const budget = formatQuoterAmount(
    result.budgetDisplay,
    result.currency,
    language
  );

  if (language === "es") {
    return [
      "Hola Viento Norte — solicitud vía ajuste de alcance.",
      "",
      `Presupuesto de referencia: ${budget} (${result.currency})`,
      `Expectativa: ${tierLabel}`,
      `Alineación estimada: ${result.alignmentScore}% · ${fitLabel}`,
      result.fit === "gap" || result.fit === "tight"
        ? `Alcance alcanzable hoy: ${affordableLabel}`
        : `Alcance coherente con la expectativa seleccionada.`,
      result.requiresNetwork
        ? "Nota: journeys de producto (diseño UX) con Viento Norte; implementación app/backend requiere red bajo dirección de VN."
        : "",
      "",
      "Quedo atento/a a coordinar kickoff y afinar alcance en la primera sesión.",
    ]
      .filter((line) => line !== undefined)
      .join("\n")
      .replace(/\n{3,}/g, "\n\n");
  }

  return [
    "Hi Viento Norte — request via scope fit tool.",
    "",
    `Reference budget: ${budget} (${result.currency})`,
    `Expected deliverable: ${tierLabel}`,
    `Estimated alignment: ${result.alignmentScore}% · ${fitLabel}`,
    result.fit === "gap" || result.fit === "tight"
      ? `Achievable scope today: ${affordableLabel}`
      : `Scope aligned with the selected expectation.`,
    result.requiresNetwork
      ? "Note: product journeys (UX design) with Viento Norte; app/backend implementation needs a directed delivery network."
      : "",
    "",
    "Looking forward to scheduling a kickoff and refining scope in the first session.",
  ]
    .filter((line) => line !== undefined)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}
