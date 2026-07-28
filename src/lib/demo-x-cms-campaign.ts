/**
 * Demo X|CMS con gate de campaña (Ads / SEO / LinkedIn SEM).
 * La restricción real de Figma Sites es limitada (cross-origin);
 * el control de tiempo, CTAs y MKT vive en nuestro dominio.
 */

import { CONSULTORIA_DEMO_X_CMS } from "../data/consultoria-demos";

/** Duración de la sesión de demo (segundos). Default 5 min. */
export const DEMO_X_CMS_DURATION_SEC = 5 * 60;

/** Aviso cuando quedan N segundos */
export const DEMO_X_CMS_WARN_SEC = 60;

export const DEMO_X_CMS_URL = CONSULTORIA_DEMO_X_CMS.figmaSitesUrl!;

/** No exponer Make editor a tráfico de campaña */
export const DEMO_X_CMS_MAKE_HIDDEN = true;

export const DEMO_UTM_STORAGE_KEY = "vn_demo_x_cms_utm";

export type DemoUtmPayload = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  li_fat_id?: string;
  gclid?: string;
  capturedAt: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "li_fat_id",
  "gclid",
] as const;

/** Captura UTMs de la query (HashRouter: location.search o hash query). */
export function captureDemoUtmsFromSearch(search: string): DemoUtmPayload {
  const raw = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(raw);
  const payload: DemoUtmPayload = { capturedAt: new Date().toISOString() };
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) payload[k] = v;
  }
  try {
    sessionStorage.setItem(DEMO_UTM_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
  return payload;
}

export function readDemoUtms(): DemoUtmPayload | null {
  try {
    const raw = sessionStorage.getItem(DEMO_UTM_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoUtmPayload;
  } catch {
    return null;
  }
}

/** Restricciones mostradas al visitante (copy ES/EN en la page). */
export const DEMO_RESTRICTIONS = {
  es: [
    "Sesión limitada a 5 minutos por visita (campaña).",
    "Solo exploración del dashboard demo — sin editar, exportar ni comandos de Make.",
    "Sin acceso a datos reales de clientes ni entorno productivo.",
    "Al terminar, el panel se bloquea y te ofrecemos el siguiente paso (agenda o consultoría).",
  ],
  en: [
    "Session limited to 5 minutes per visit (campaign).",
    "Dashboard demo only — no edit, export, or Make commands.",
    "No real client data or production environment.",
    "When time ends the panel locks and we offer the next step (book or consulting).",
  ],
} as const;

export function formatMmSs(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
