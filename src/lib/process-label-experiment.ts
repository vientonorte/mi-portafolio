import { useMemo } from "react";
import type { Language } from "./i18n";

export type ProcessLabelVariant = "proceso";

/** Etiqueta unificada: Proceso (sin A/B Método). */
export function useProcessNavLabel(language: Language) {
  const label = useMemo(
    () => (language === "es" ? "Proceso" : "Process"),
    [language]
  );

  return { label, variant: "proceso" as const };
}