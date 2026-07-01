import { getPortfolioImages } from "./image-overrides";

export type CompanyBrand = "sura" | "karri" | "transvip";

export interface CompanyLogoConfig {
  src: string;
  wordmark?: boolean;
}

/** Normaliza nombres de empresa del copy i18n a una marca reconocible. */
export function resolveCompanyBrand(company: string): CompanyBrand | null {
  const normalized = company.toLowerCase();

  if (normalized.includes("karri")) return "karri";
  if (normalized.includes("transvip")) return "transvip";
  if (normalized.includes("sura")) return "sura";

  return null;
}

/** URL del logo según nombre de empresa (SURA, Karri, Transvip y variantes). */
export function getCompanyLogo(company: string): CompanyLogoConfig | null {
  const brand = resolveCompanyBrand(company);
  if (!brand) return null;

  const images = getPortfolioImages();

  switch (brand) {
    case "karri":
      return { src: images.karri.logo, wordmark: true };
    case "sura":
      return { src: images.sura.logo, wordmark: true };
    case "transvip":
      return { src: images.transvip.logo, wordmark: true };
  }
}