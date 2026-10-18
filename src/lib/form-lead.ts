import { trackEvent } from "../vn-core/analytics/fo-events";
import { getFirstTouch, UTM_KEYS, type FirstTouch } from "./utm";

/**
 * generate_lead de los formularios (home #contacto, /servicios/ y rubros) — TL 13-oct.
 * Solo tras un envío confirmado por el worker con HTTP 200. Parámetros SIN PII: nunca nombre,
 * correo, teléfono ni mensaje; solo form_id, el tema (opción cerrada del formulario) y los UTM
 * de primer toque. El asistente (ContactAssistant) tiene su propio generate_lead: no se duplica.
 */
export interface FormLeadInput {
  /** Identificador estable del formulario: "home-contacto", "servicios", "web-<rubro>". */
  formId: string;
  /** Tema/intención elegida en una opción cerrada (no texto libre). */
  topic?: string;
}

/** Solo [a-z0-9 áéíóúñü/_-], ≤ 60. Corta cualquier cosa con @ o dígitos largos (correo/teléfono). */
export function safeLeadLabel(raw: string | undefined | null): string {
  const v = String(raw ?? "").trim().slice(0, 60);
  if (!v || /@|\d{6,}/.test(v)) return "";
  return /^[\p{L}\p{N} /_.-]+$/u.test(v) ? v : "";
}

export function formLeadParams(input: FormLeadInput, touch: FirstTouch | null = getFirstTouch()) {
  const params: Record<string, string> = {
    category: "conversion",
    lead_type: "contact_form",
    form_id: safeLeadLabel(input.formId) || "form",
  };
  const topic = safeLeadLabel(input.topic);
  if (topic) params.topic = topic;
  for (const k of UTM_KEYS) if (touch?.[k]) params[k] = touch[k];
  return params;
}

/** Dispara generate_lead solo si `httpStatus === 200`. Devuelve true si se disparó. */
export function trackFormLead(httpStatus: number | undefined, input: FormLeadInput): boolean {
  if (httpStatus !== 200) return false;
  trackEvent("generate_lead", formLeadParams(input));
  return true;
}
