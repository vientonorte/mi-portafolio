/**
 * Utilidades WCAG 2.x para el test de contraste de degradados.
 * Colores: "#rgb", "#rrggbb", "#rrggbbaa", "oklch(L% C H)" / "oklch(L% C H / a)".
 * Sin dependencias: oklch → sRGB con la matriz de Björn Ottosson (CSS Color 4),
 * con recorte a gamut sRGB (como hace el navegador al pintar).
 */
export type RGBA = { r: number; g: number; b: number; a: number }; // r,g,b 0..255, a 0..1

export function parseColor(input: string): RGBA {
  const s = input.trim().toLowerCase();
  if (s === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
  if (s.startsWith("#")) {
    let h = s.slice(1);
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = (i: number) => parseInt(h.slice(i, i + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
  }
  const m = s.match(/^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+%?))?\s*\)$/);
  if (m) {
    const L = m[1].endsWith("%") ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
    const C = parseFloat(m[2]);
    const H = (parseFloat(m[3]) * Math.PI) / 180;
    const a = m[4] ? (m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4])) : 1;
    const A = C * Math.cos(H);
    const B = C * Math.sin(H);
    const l_ = L + 0.3963377774 * A + 0.2158037573 * B;
    const m_ = L - 0.1055613458 * A - 0.0638541728 * B;
    const s_ = L - 0.0894841775 * A - 1.291485548 * B;
    const [l3, m3, s3] = [l_ ** 3, m_ ** 3, s_ ** 3];
    const lin = [
      4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
      -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
      -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
    ];
    const enc = (c: number) => {
      const v = Math.min(1, Math.max(0, c));
      return Math.round(255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055));
    };
    return { r: enc(lin[0]), g: enc(lin[1]), b: enc(lin[2]), a };
  }
  throw new Error(`Color no soportado: ${input}`);
}

/** Aplica un alfa extra (p. ej. clase `/10` de Tailwind u `opacity-15`). */
export function withAlpha(c: string | RGBA, alpha: number): RGBA {
  const x = typeof c === "string" ? parseColor(c) : c;
  return { ...x, a: x.a * alpha };
}

export function toRGBA(c: string | RGBA): RGBA {
  return typeof c === "string" ? parseColor(c) : c;
}

/** Composición "source-over" de `top` sobre `bottom` (resultado opaco si bottom lo es). */
export function over(top: RGBA, bottom: RGBA): RGBA {
  const a = top.a + bottom.a * (1 - top.a);
  if (a === 0) return { r: 0, g: 0, b: 0, a: 0 };
  const ch = (t: number, b: number) => (t * top.a + b * bottom.a * (1 - top.a)) / a;
  return { r: ch(top.r, bottom.r), g: ch(top.g, bottom.g), b: ch(top.b, bottom.b), a };
}

/** Interpolación en sRGB premultiplicado (como CSS para `transparent`). */
export function lerp(a: RGBA, b: RGBA, t: number): RGBA {
  const alpha = a.a + (b.a - a.a) * t;
  if (alpha === 0) return { r: 0, g: 0, b: 0, a: 0 };
  const ch = (x: number, y: number) => (x * a.a + (y * b.a - x * a.a) * t) / alpha;
  return { r: ch(a.r, b.r), g: ch(a.g, b.g), b: ch(a.b, b.b), a: alpha };
}

/** Color del degradado en t ∈ [0,1] con paradas equiespaciadas. */
export function sampleGradient(stops: RGBA[], t: number): RGBA {
  if (stops.length === 1) return stops[0];
  const seg = (stops.length - 1) * t;
  const i = Math.min(stops.length - 2, Math.floor(seg));
  return lerp(stops[i], stops[i + 1], seg - i);
}

/** Puntos cada 5 % (0, 0.05, …, 1). */
export const STEPS = Array.from({ length: 21 }, (_, i) => i / 20);

export function luminance(c: RGBA): number {
  const f = (v: number) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}

export function contrast(a: RGBA, b: RGBA): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function hex(c: RGBA): string {
  return "#" + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}
