/**
 * Atribución de primer toque (UTM + landing) por sesión.
 * Sin dependencias de React. Protege window/sessionStorage para SSR/prerender.
 */

export const FIRST_TOUCH_KEY = "vn_first_touch";

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Record<UtmKey, string>;

export interface FirstTouch extends UtmParams {
  landing_path: string;
}

const MAX_VALUE = 100;
const EMAIL_LIKE = /@/;
const PHONE_LIKE = /\+?\d[\d\s().-]{6,}\d/;

/** Normaliza un valor UTM: texto corto, sin emails ni teléfonos. */
export function cleanUtmValue(raw: string | null | undefined): string {
  if (typeof raw !== "string") return "";
  const v = raw.trim().slice(0, MAX_VALUE);
  if (!v || EMAIL_LIKE.test(v) || PHONE_LIKE.test(v)) return "";
  return v;
}

/** Path sin query ni hash, acotado. */
export function cleanPath(raw: string | null | undefined): string {
  if (typeof raw !== "string" || !raw) return "/";
  const p = raw.split(/[?#]/)[0] || "/";
  return p.slice(0, 200);
}

export const ENTRY_ANCHOR_KEY = "vn_entry_anchor";
/** Anclas que no describen la intención de entrada (destino del form, skip-link). */
const NEUTRAL_ANCHORS = new Set(["contacto", "main"]);
const ANCHOR_RE = /^#([A-Za-z0-9._~-]{1,60})$/;

/**
 * Ancla de sección válida ("#web-pymes"), o "" si es una ruta hash (#/…), está vacía,
 * es neutra (#contacto, #main) o trae caracteres fuera de la allowlist del worker.
 */
export function cleanAnchor(raw: string | null | undefined): string {
  if (typeof raw !== "string") return "";
  const m = ANCHOR_RE.exec(raw.trim());
  if (!m || NEUTRAL_ANCHORS.has(m[1])) return "";
  return `#${m[1]}`;
}

/** landing_path con ancla: "/servicios/" + "#web-pymes" → "/servicios/#web-pymes" (≤200). */
export function landingPathWithAnchor(path: string, anchor: string | null | undefined): string {
  const base = cleanPath(path);
  const a = cleanAnchor(anchor);
  return a ? `${base}${a}`.slice(0, 200) : base;
}

/** Lee utm_source/medium/campaign de un query string ("?a=b" o "a=b"). */
export function parseUtm(search: string | null | undefined): UtmParams {
  const out: UtmParams = { utm_source: "", utm_medium: "", utm_campaign: "" };
  if (!search) return out;
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  } catch {
    return out;
  }
  for (const key of UTM_KEYS) out[key] = cleanUtmValue(params.get(key));
  return out;
}

function getSessionStorage(): Storage | null {
  try {
    if (typeof window === "undefined" || !window.sessionStorage) return null;
    return window.sessionStorage;
  } catch {
    return null; // bloqueado (modo privado / política del navegador)
  }
}

function isFirstTouch(v: unknown): v is FirstTouch {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return [...UTM_KEYS, "landing_path"].every((k) => typeof o[k] === "string");
}

/** Primer toque guardado en la sesión (o null). */
export function getFirstTouch(storage: Storage | null = getSessionStorage()): FirstTouch | null {
  if (!storage) return null;
  try {
    const raw = storage.getItem(FIRST_TOUCH_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isFirstTouch(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Guarda el primer toque de la sesión. Nunca sobrescribe uno existente.
 * Devuelve el primer toque vigente (el guardado o el nuevo).
 */
export function recordFirstTouch(
  loc: { pathname: string; search: string; hash?: string } | null = typeof window !== "undefined" ? window.location : null,
  storage: Storage | null = getSessionStorage()
): FirstTouch | null {
  if (!loc) return null;
  const existing = getFirstTouch(storage);
  if (existing) return existing;
  const touch: FirstTouch = {
    ...parseUtm(loc.search),
    landing_path: landingPathWithAnchor(loc.pathname, loc.hash),
  };
  if (storage) {
    try {
      storage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
    } catch {
      /* cuota / bloqueado: seguimos sin persistir */
    }
  }
  return touch;
}

/** Guarda la última ancla de sección visitada (p. ej. clic en «Quiero mi web» → #web-pymes). */
export function recordEntryAnchor(
  hash: string | null | undefined,
  storage: Storage | null = getSessionStorage()
): string {
  const a = cleanAnchor(hash);
  if (a && storage) {
    try {
      storage.setItem(ENTRY_ANCHOR_KEY, a);
    } catch {
      /* bloqueado */
    }
  }
  return a;
}

export function getEntryAnchor(storage: Storage | null = getSessionStorage()): string {
  if (!storage) return "";
  try {
    return cleanAnchor(storage.getItem(ENTRY_ANCHOR_KEY));
  } catch {
    return "";
  }
}

/**
 * Campos de atribución para el payload del formulario (vacío si no hay primer toque).
 * landing_path lleva el ancla de entrada si el primer toque no traía una
 * (p. ej. /servicios/ → clic a #web-pymes → "/servicios/#web-pymes").
 */
export function attributionFields(
  touch: FirstTouch | null = getFirstTouch(),
  anchor: string = getEntryAnchor()
): Partial<FirstTouch> {
  if (!touch) return {};
  const landing_path = touch.landing_path.includes("#")
    ? touch.landing_path
    : landingPathWithAnchor(touch.landing_path, anchor);
  return {
    utm_source: touch.utm_source,
    utm_medium: touch.utm_medium,
    utm_campaign: touch.utm_campaign,
    landing_path,
  };
}
