/**
 * Adaptador de medición: track(event, props).
 *
 * Proveedor: Umami Cloud (sin cookies), activado solo si existe VITE_UMAMI_WEBSITE_ID
 * en el build. Sin ID: no se inyecta ningún script, no hay red y track() es no-op.
 * Seguro para SSR/prerender: no toca window/document fuera del navegador.
 *
 * Privacidad: cada evento pasa por un sanitizador con allowlist de claves por evento.
 * Nunca viajan email, nombre, mensaje ni teléfono.
 */
import { cleanPath, cleanUtmValue, parseUtm, recordFirstTouch } from "./utm";

export const UMAMI_SCRIPT_SRC = "https://cloud.umami.is/script.js";

export const CTA_ANCLAS = ["web-pymes", "revision-gratis", "consultoria-ux"] as const;
export type CtaAncla = (typeof CTA_ANCLAS)[number];

export interface TrackEvents {
  page_view: {
    path: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    referrer?: string;
  };
  cta_click: { ancla: CtaAncla; posicion: string };
  form_submit: { status: "success" | "error" };
}
export type TrackEventName = keyof TrackEvents;

type Props = Record<string, string>;

/** Allowlist: únicas claves que pueden salir por evento. */
export const EVENT_ALLOWLIST: Record<TrackEventName, readonly string[]> = {
  page_view: ["path", "utm_source", "utm_medium", "utm_campaign", "referrer"],
  cta_click: ["ancla", "posicion"],
  form_submit: ["status"],
};

const ENUMS: Partial<Record<string, readonly string[]>> = {
  ancla: CTA_ANCLAS,
  status: ["success", "error"],
};

/** Devuelve solo las claves permitidas, con valores cortos y sin aspecto de PII. Null si el evento no existe. */
export function sanitizeEventProps(event: string, props: unknown): Props | null {
  if (!Object.prototype.hasOwnProperty.call(EVENT_ALLOWLIST, event)) return null;
  const allowed = EVENT_ALLOWLIST[event as TrackEventName];
  const out: Props = {};
  if (!props || typeof props !== "object") return out;
  const src = props as Record<string, unknown>;
  for (const key of allowed) {
    const raw = src[key];
    if (typeof raw !== "string" && typeof raw !== "number") continue;
    let value: string;
    if (key === "path") value = cleanPath(String(raw));
    else value = cleanUtmValue(String(raw)); // corta a 100 y descarta emails/teléfonos
    if (!value) continue;
    const allowedValues = ENUMS[key];
    if (allowedValues && !allowedValues.includes(value)) continue;
    out[key] = value;
  }
  return out;
}

interface UmamiApi {
  track: (eventOrFn?: string, data?: Props) => unknown;
}
declare global {
  interface Window {
    umami?: UmamiApi;
  }
}

function websiteId(): string {
  const id = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  return typeof id === "string" ? id.trim() : "";
}

export function isTrackingEnabled(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined" && websiteId() !== "";
}

type Queued = { event?: string; data?: Props };
let queue: Queued[] = [];
let injected = false;

function send(item: Queued): void {
  const umami = typeof window !== "undefined" ? window.umami : undefined;
  if (!umami || typeof umami.track !== "function") {
    queue.push(item);
    return;
  }
  try {
    if (item.event) umami.track(item.event, item.data);
    else umami.track(); // pageview nativo de Umami (visitas/sesiones)
  } catch {
    /* nunca romper la página por medición */
  }
}

function flush(): void {
  const pending = queue;
  queue = [];
  pending.forEach(send);
}

/** Inyecta el script de Umami (defer) una sola vez. Sin ID no hace nada. */
export function loadUmami(): boolean {
  if (!isTrackingEnabled()) return false;
  if (injected) return true;
  injected = true;
  try {
    if (document.querySelector(`script[src="${UMAMI_SCRIPT_SRC}"]`)) return true;
    const s = document.createElement("script");
    s.src = UMAMI_SCRIPT_SRC;
    s.defer = true;
    s.setAttribute("data-website-id", websiteId());
    s.setAttribute("data-auto-track", "false"); // eventos propios: page_view lo enviamos nosotros
    s.setAttribute("data-exclude-search", "true"); // la query no sale tal cual (UTM van saneadas)
    s.setAttribute("data-exclude-hash", "true");
    s.setAttribute("data-do-not-track", "true");
    s.addEventListener("load", flush);
    document.head.appendChild(s);
  } catch {
    return false;
  }
  return true;
}

/** Envía un evento saneado. Sin ID o fuera del navegador: no-op. */
export function track<E extends TrackEventName>(event: E, props: TrackEvents[E]): void {
  if (!isTrackingEnabled()) return;
  const data = sanitizeEventProps(event, props);
  if (!data) return;
  loadUmami();
  send({ event, data });
}

/** Origen del referrer (sin path ni query) o "" si es interno / vacío. */
export function referrerOrigin(ref: string, currentHost: string): string {
  if (!ref) return "";
  try {
    const u = new URL(ref);
    if (u.host === currentHost) return "";
    return u.origin;
  } catch {
    return "";
  }
}

/** Props de page_view para la ubicación actual. */
export function buildPageViewProps(
  loc: { pathname: string; search: string; host: string },
  referrer: string
): TrackEvents["page_view"] {
  const utm = parseUtm(loc.search);
  const props: TrackEvents["page_view"] = { path: cleanPath(loc.pathname) };
  if (utm.utm_source) props.utm_source = utm.utm_source;
  if (utm.utm_medium) props.utm_medium = utm.utm_medium;
  if (utm.utm_campaign) props.utm_campaign = utm.utm_campaign;
  const ref = referrerOrigin(referrer, loc.host);
  if (ref) props.referrer = ref;
  return props;
}

/**
 * Arranque en el cliente: guarda el primer toque (siempre, aunque no haya ID: la
 * atribución del formulario no depende de Umami) y, si hay ID, carga Umami y envía page_view.
 */
export function initTracking(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  recordFirstTouch(window.location);
  if (!isTrackingEnabled()) return;
  loadUmami();
  send({}); // pageview nativo
  track("page_view", buildPageViewProps(window.location, document.referrer));
}

/** Solo tests. */
export function __resetTrackingForTests(): void {
  queue = [];
  injected = false;
}
