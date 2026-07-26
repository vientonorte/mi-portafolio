/**
 * Monedas del ajuste de alcance (consultoría UX pyme).
 * El motor de fit sigue en USD interno; la UI convierte display ↔ USD.
 * Default mental pyme: CLP. Tasas orientativas (no FX en vivo).
 */

export type QuoterCurrency = "CLP" | "UF" | "USD";

/** Default UI — pymes Chile (research 2026-07-26). */
export const DEFAULT_QUOTER_CURRENCY: QuoterCurrency = "CLP";

/** CLP por 1 USD — referencia orientativa Chile 2026 */
export const USD_TO_CLP = 950;

/** CLP por 1 UF — referencia orientativa (UF ~38k CLP) */
export const UF_TO_CLP = 38_000;

/** USD por 1 UF */
export const UF_TO_USD = UF_TO_CLP / USD_TO_CLP;

/** Orden de selector: CLP primero (default mental pyme). */
export const QUOTER_CURRENCIES: QuoterCurrency[] = ["CLP", "UF", "USD"];

export interface CurrencySliderConfig {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  presets: number[];
}

/** Rangos del slider en unidades de la moneda de display */
export const SLIDER_BY_CURRENCY: Record<QuoterCurrency, CurrencySliderConfig> = {
  USD: {
    min: 2_000,
    max: 100_000,
    step: 500,
    defaultValue: 12_000,
    presets: [5_000, 15_000, 30_000, 60_000],
  },
  UF: {
    min: 50,
    max: 2_500,
    step: 5,
    defaultValue: 300,
    presets: [125, 375, 750, 1_500],
  },
  CLP: {
    min: 2_000_000,
    max: 95_000_000,
    step: 500_000,
    defaultValue: 11_500_000,
    presets: [5_000_000, 15_000_000, 30_000_000, 55_000_000],
  },
};

export function toUsd(amount: number, currency: QuoterCurrency): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  switch (currency) {
    case "USD":
      return amount;
    case "UF":
      return amount * UF_TO_USD;
    case "CLP":
      return amount / USD_TO_CLP;
  }
}

export function fromUsd(amountUsd: number, currency: QuoterCurrency): number {
  if (!Number.isFinite(amountUsd) || amountUsd <= 0) return 0;
  switch (currency) {
    case "USD":
      return amountUsd;
    case "UF":
      return amountUsd / UF_TO_USD;
    case "CLP":
      return amountUsd * USD_TO_CLP;
  }
}

/** Al cambiar moneda, conserva el valor económico (USD) redondeado al step */
export function convertDisplayAmount(
  amount: number,
  from: QuoterCurrency,
  to: QuoterCurrency
): number {
  if (from === to) return amount;
  const usd = toUsd(amount, from);
  const raw = fromUsd(usd, to);
  const { min, max, step } = SLIDER_BY_CURRENCY[to];
  const snapped = Math.round(raw / step) * step;
  return Math.min(max, Math.max(min, snapped));
}

export function formatQuoterAmount(
  amount: number,
  currency: QuoterCurrency,
  language: "es" | "en"
): string {
  const locale = language === "es" ? "es-CL" : "en-US";

  if (currency === "UF") {
    const formatted = new Intl.NumberFormat(locale, {
      maximumFractionDigits: 0,
    }).format(amount);
    return language === "es" ? `${formatted} UF` : `${formatted} UF`;
  }

  if (currency === "CLP") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
