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

export const BRAND_GRADIENT_STOPS = [
  { offset: 0, color: "#FF1D25" },
  { offset: 1, color: "#FF931E" },
] as const;