import type { Language } from "../../lib/i18n/types";

/** ~200 palabras por minuto. Mínimo 1. No es un KPI de negocio. */
export function readingMinutes(paragraphs: readonly string[]): number {
  const words = paragraphs
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** `YYYY-MM` del catálogo. No inventa un día. */
export function formatEditionMonth(month: string, language: Language): string {
  const match = /^(\d{4})-(\d{2})$/.exec(month);
  if (!match) return month;
  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const date = new Date(Date.UTC(year, monthIndex, 1));
  return new Intl.DateTimeFormat(language === "es" ? "es-CL" : "en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
