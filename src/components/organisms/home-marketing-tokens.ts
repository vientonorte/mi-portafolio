/**
 * CTA primario del hero home: mismo degradado de marca (rojo → azul evo), pero
 * con las variantes 700 AA de src/styles/vn-tokens.css.
 *
 * Contraste de texto blanco (WCAG 2.x), ver home-marketing.test.tsx:
 *  - Antes (--brand-gradient): #E8401C = 4.05:1, #1A8FDC = 3.50:1 → falla AA.
 *  - Después: #c2330f (rojo-700) = 5.56:1, #0f6aa8 (azul-evo-700) = 5.76:1,
 *    y todos los puntos intermedios del degradado ≥ 4.5:1.
 */
export const HERO_PRIMARY_CTA_STOPS = { from: "#c2330f", to: "#0f6aa8" } as const;

export const HERO_PRIMARY_CTA_BG =
  "bg-[linear-gradient(135deg,var(--vn-primitive-rojo-700,#c2330f)_0%,var(--vn-primitive-azul-evo-700,#0f6aa8)_100%)]";
