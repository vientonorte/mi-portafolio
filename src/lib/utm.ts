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
  loc: { pathname: string; search: string } | null = typeof window !== "undefined" ? window.location : null,
  storage: Storage | null = getSessionStorage()
): FirstTouch | null {
  if (!loc) return null;
  const existing = getFirstTouch(storage);
  if (existing) return existing;
  const touch: FirstTouch = { ...parseUtm(loc.search), landing_path: cleanPath(loc.pathname) };
  if (storage) {
    try {
      storage.setItem(FIRST_TOUCH_KEY, JSON.stringify(touch));
    } catch {
      /* cuota / bloqueado: seguimos sin persistir */
    }
  }
  return touch;
}

/** Campos de atribución para el payload del formulario (vacío si no hay primer toque). */
export function attributionFields(touch: FirstTouch | null = getFirstTouch()): Partial<FirstTouch> {
  if (!touch) return {};
  return {
    utm_source: touch.utm_source,
    utm_medium: touch.utm_medium,
    utm_campaign: touch.utm_campaign,
    landing_path: touch.landing_path,
  };
}
