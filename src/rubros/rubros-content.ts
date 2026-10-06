/**
 * P4 — landings por rubro (/servicios/<slug>/), datos en src/data/rubros.json.
 * La plantilla (RubroPage) es la misma para todos los rubros; agregar uno = una
 * entrada en el JSON + sus assets en public/images/rubros/.
 */
import type { MarketingImage } from "../components/marketing";
import type { ServiciosIntent } from "../servicios/servicios-content";
import rubrosFile from "../data/rubros.json";

export interface RubroData {
  rubro: string;
  badge: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  audience: string;
  points: { heading: string; intro: string; items: { title: string; body: string }[] };
  example: { label: string; heading: string; body: string; steps: { before: string; after: string }[] };
  includes: string[];
  priceNote: string;
  mockups: { caption: string; desktop: MarketingImage; mobile: MarketingImage; card: MarketingImage };
  cta: { primary: string; secondary: string };
  seo: { title: string; description: string };
  form: { source: string; heading: string; intro: string };
}

export interface RubroOffer {
  name: string;
  price: string;
  priceValue: number;
  currency: string;
  delivery: string;
  payment: string;
  intent: ServiciosIntent;
}

export const RUBROS_ORIGIN: string = rubrosFile.origin;
export const RUBROS_LASTMOD: string = rubrosFile.lastmod;
export const RUBRO_OFFER = rubrosFile.offer as RubroOffer;
export const RUBROS = rubrosFile.rubros as Record<string, RubroData>;
export const RUBRO_SLUGS: string[] = Object.keys(RUBROS);

/** Ruta pública (sin base de Vite): /servicios/<slug>/ */
export function rubroPath(slug: string): string {
  return `/servicios/${slug}/`;
}

export function rubroCanonical(slug: string): string {
  return `${RUBROS_ORIGIN}${rubroPath(slug)}`;
}

export function getRubro(slug: string): RubroData {
  const data = RUBROS[slug];
  if (!data) throw new Error(`rubro desconocido: ${slug}`);
  return data;
}

/**
 * CTA con el degradado naranja canon (--brand-gradient-canon, PO 5-oct-2026) y texto
 * azul-noche del DS: 18px bold = texto grande; ≥ 4.39:1 en todo el degradado.
 * Sin hover:opacity (bajaría el contraste).
 */
export const RUBRO_CTA_CLASS =
  "min-h-[48px] bg-brand-gradient-canon px-6 text-lg font-bold text-[color:var(--brand-gradient-canon-foreground)] shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary";
