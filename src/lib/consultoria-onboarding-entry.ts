/**
 * Resuelve el paso inicial del onboarding para evitar pasos redundantes
 * cuando el usuario ya eligió modalidad / goal desde el hero, packs, árbol, etc.
 */

export const ONBOARDING_STEPS = ["welcome", "package", "context", "summary"] as const;
export type OnboardingStepId = (typeof ONBOARDING_STEPS)[number];

export interface OnboardingEntryOptions {
  /** Paquete ya elegido en hero, packs, árbol o C1 */
  packagePreselected?: boolean;
  /** Goal template prearmado (C1, educación, etc.) */
  goalPrefill?: string;
  /** Industria preseleccionada */
  industryPrefill?: string;
}

/**
 * Índices: welcome=0 · package=1 · context=2 · summary=3
 * - Sin preselección → welcome (0)
 * - Con paquete → context (2): salta bienvenida y re-elección de modalidad
 */
export function resolveOnboardingStartIndex(
  options: OnboardingEntryOptions
): number {
  if (options.packagePreselected) return 2;
  return 0;
}

export function onboardingStepId(index: number): OnboardingStepId {
  const clamped = Math.max(0, Math.min(index, ONBOARDING_STEPS.length - 1));
  return ONBOARDING_STEPS[clamped];
}
