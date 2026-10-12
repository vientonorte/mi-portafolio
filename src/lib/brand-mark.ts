/** Geometría compartida del isologo RG — fuente única para componente y favicon. */
export const BRAND_MARK = {
  viewBox: "0 0 40 40",
  center: 20,
  plateRadius: 19,
  ringRadius: 13,
  trackStroke: 1.25,
  arcStroke: 4.5,
  arcDash: "56 26",
  arcRotation: -108,
  coreRadius: 5,
  shineRadius: 2.1,
  shineOffsetY: -1.2,
} as const;

/**
 * Isologo plano en naranja canon desde tokens (--vn-primitive-naranja en vn-tokens.css).
 * Dos paradas iguales para no cambiar el gradiente SVG del isologo; sin rojo ni azul.
 * favicon.svg, icon-192/512 e isologo-512 usan el mismo color (test: brand-orange-contrast).
 */
export const BRAND_ORANGE_TOKEN = "var(--vn-primitive-naranja)";
export const BRAND_ORANGE_HEX = "#FF931E";
export const BRAND_GRADIENT_STOPS = [
  { offset: 0, color: BRAND_ORANGE_TOKEN },
  { offset: 1, color: BRAND_ORANGE_TOKEN },
] as const;