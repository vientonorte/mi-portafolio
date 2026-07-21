import { getPortfolioImages } from "./image-overrides";

export type CompanyBrand =
  | "sura"
  | "karri"
  | "transvip"
  | "desafio"
  | "walmart"
  | "havas"
  | "valuesite"
  | "marana"
  | "pareti"
  | "freelance";

export interface CompanyLogoConfig {
  src: string;
  wordmark?: boolean;
}

/** Normaliza nombres de empresa del copy i18n a una marca reconocible. */
export function resolveCompanyBrand(company: string): CompanyBrand | null {
  const normalized = company.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");

  if (normalized.includes("karri")) return "karri";
  if (normalized.includes("transvip")) return "transvip";
  if (normalized.includes("sura")) return "sura";
  if (normalized.includes("desafio") || normalized.includes("desafío")) return "desafio";
  if (normalized.includes("walmart")) return "walmart";
  if (normalized.includes("havas") || normalized.includes("claro")) return "havas";
  if (normalized.includes("valuesite") || normalized.includes("aquivoy")) return "valuesite";
  if (normalized.includes("marana") || normalized.includes("maraña")) return "marana";
  if (normalized.includes("pareti")) return "pareti";
  if (normalized.includes("freelance") || normalized.includes("independiente")) return "freelance";

  return null;
}

/** URL del logo según nombre de empresa (wordmarks + monogramas). */
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
    case "desafio":
      return { src: images.brands.desafioLatam };
    case "walmart":
      return { src: images.brands.walmart };
    case "havas":
      return { src: images.brands.havas };
    case "valuesite":
      return { src: images.brands.valuesite };
    case "marana":
      return { src: images.brands.marana };
    case "pareti":
      return { src: images.brands.pareti };
    case "freelance":
      return { src: images.brands.freelance };
  }
}