// Afirmaciones retiradas de la trayectoria (SSOT TRAYECTORIA-INVESTIGACION-RO.md, 2026-10-17).
// Compartido por el gate de dist (check-dist-no-removed-claims.mjs) y el test de src.
// Cada regla devuelve los hallazgos de un texto. Transvip conserva su −40 % (tiempo de reserva).

const WINDOW = 120;

/** Reglas directas: si aparecen, fallan siempre. */
export const DIRECT_RULES = [
  { id: "5-paises", re: /\b5\s?\+\s?(pa[ií]ses|countries)/gi },
  { id: "mas-de-5-paises", re: /m[aá]s de 5 pa[ií]ses|more than 5 countries/gi },
  { id: "17-participantes", re: /\b17\s+participa(ntes|nts)\b/gi },
  // Karri «+58 % engagement» (no está en la SSOT; PO 17-10 15:11): cualquier +58 %.
  { id: "karri-58", re: /\+\s?58\s?%|(?<![\d.,])58\s?%\s*(de\s+|more\s+|más\s+)?engagement|engagement[^.\n]{0,40}\b58\s?%|aument[óo]\s+(un\s+)?58\s?%/gi },
  { id: "nps-72", re: /NPS\s*(de\s*|of\s*|:\s*)?72\b/gi },
  { id: "nps-72-split", re: /["'`]NPS["'`][^{}]{0,40}["'`]72["'`]/g },
  // Valor antes de la etiqueta (POC Apple, feat/servicios-ds): value: "72", label: { es: "NPS" … }.
  { id: "nps-72-split-rev", re: /["'`]72["'`][\s\S]{0,80}?["'`]NPS["'`]/g },
  {
    id: "etnografo-certificado",
    re: /etn[oó]graf[oa]s?\s+certificad|certificad[oa]\s+(como\s+)?etn[oó]graf|certified\s+ethnographer|ethnographer\s+certif/gi,
  },
  { id: "mediador-certificado", re: /mediador[a]?\s+cultural\s+certificad|certified\s+cultural\s+mediator/gi },
  { id: "sura-40-onboarding", re: /[−–-]\s?40\s?%\s*(de\s+)?(fricci[oó]n|friction|onboarding|abandono|drop-off|tiempo de discovery|discovery)/gi },
  { id: "onboarding-40", re: /onboarding\s*[−–-]\s?40\s?%/gi },
  { id: "40-friccion", re: /\b40\s?%\s*(de\s+|en\s+|less\s+|menos\s+)*(fricci[oó]n|friction|abandono|drop-off)/gi },
  { id: "reduccion-40-discovery", re: /40\s?%\s*(en\s+)?(tiempo de discovery|discovery time|fricci[oó]n en onboarding)/gi },
];

// Cualquier «40 %» (con o sin signo, reformulado) cerca de SURA / onboarding / fricción.
const MINUS40 = /(?<![\d.,])[−–-]?\s?40\s?%/g;
const SURA = /SURA|onboarding|fricci[oó]n|friction|abandono|drop-off|discovery/i;
const TRANSVIP_OK = /reserva|booking|transvip|pasajeros|passenger|shoppers/i;

/** 40 % junto a SURA/onboarding/fricción (sin contexto Transvip reservas / Karri shoppers) = SURA −40 %. */
export function findRemovedClaims(text) {
  const hits = [];
  for (const { id, re } of DIRECT_RULES) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text))) hits.push({ id, at: m.index, snippet: snip(text, m.index) });
  }
  MINUS40.lastIndex = 0;
  let m;
  while ((m = MINUS40.exec(text))) {
    const win = text.slice(Math.max(0, m.index - WINDOW), m.index + WINDOW);
    if (SURA.test(win) && !TRANSVIP_OK.test(win)) hits.push({ id: "sura-40", at: m.index, snippet: snip(text, m.index) });
  }
  return hits;
}

function snip(text, i) {
  return text.slice(Math.max(0, i - 50), i + 50).replace(/\s+/g, " ");
}

/** Redacción exacta exigida por la SSOT (se busca en la ficha /sobre-mi/). */
export const REQUIRED_WORDING = [
  /curso certificado de análisis de datos cualitativos \(Academia Etnográfica, 2022\)/i,
  /certificado de participación en mediación cultural \(CNCA, 2017\)/i,
];
