import { useMemo } from "react";
import type { Language } from "./i18n";

export type ProcessLabelVariant = "proceso" | "metodo";

const STORAGE_KEY = "rg-process-label-variant-v1";

function getSearchParamVariant(search: string): ProcessLabelVariant | null {
  const params = new URLSearchParams(search);
  const value = params.get("processLabel");
  if (value === "metodo" || value === "method") return "metodo";
  if (value === "proceso" || value === "process") return "proceso";
  return null;
}

function resolveVariant(): ProcessLabelVariant {
  if (typeof window === "undefined") return "proceso";

  const forced = getSearchParamVariant(window.location.search);
  if (forced) {
    window.localStorage.setItem(STORAGE_KEY, forced);
    return forced;
  }

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "proceso" || saved === "metodo") return saved;

  const assigned: ProcessLabelVariant = Math.random() < 0.5 ? "proceso" : "metodo";
  window.localStorage.setItem(STORAGE_KEY, assigned);
  return assigned;
}

export function useProcessNavLabel(language: Language) {
  const variant = useMemo(resolveVariant, []);
  const label = useMemo(() => {
    if (language === "es") return variant === "metodo" ? "Método" : "Proceso";
    return variant === "metodo" ? "Method" : "Process";
  }, [language, variant]);

  return { label, variant };
}
