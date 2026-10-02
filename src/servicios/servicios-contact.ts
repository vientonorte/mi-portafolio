import { attributionFields, type FirstTouch } from "../lib/utm";
import { SERVICIOS_INTENTS, SERVICIOS_SOURCE, type ServiciosIntentValue } from "./servicios-content";

export interface ServiciosContactValues {
  nombre: string;
  correo: string;
  empresa: string;
  intent: ServiciosIntentValue;
  detalle: string;
  consent: boolean;
  gotcha: string;
}

export type ServiciosFieldErrors = Partial<Record<"nombre" | "correo" | "intent" | "detalle" | "consent", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validación cliente = reglas del worker (worker/src/contact.js). */
export function validateServiciosContact(v: ServiciosContactValues): ServiciosFieldErrors {
  const errors: ServiciosFieldErrors = {};
  if (v.nombre.trim().length < 2) errors.nombre = "Escribe tu nombre (mínimo 2 caracteres).";
  if (!EMAIL_RE.test(v.correo.trim()) || v.correo.trim().length > 254) {
    errors.correo = "Escribe un correo válido, por ejemplo nombre@empresa.cl.";
  }
  if (!(SERVICIOS_INTENTS as readonly string[]).includes(v.intent)) {
    errors.intent = "Elige qué necesitas.";
  }
  if (v.detalle.trim().length < 10) {
    errors.detalle = "Cuéntanos un poco más (mínimo 10 caracteres).";
  }
  if (!v.consent) errors.consent = "Para enviar, acepta que te contactemos por esta solicitud.";
  return errors;
}

/**
 * Payload para POST https://contact.vientonorte.io/api/contact
 * - `source`: "servicios" en /servicios/; "web-<rubro>" en landings P4 (≤40 en el worker).
 * - Atribución de primer toque (utm_* + landing_path) vía sessionStorage / `touch`.
 *   Hoy el worker ignora esas claves (worker/src/contact.js desestructura solo las conocidas).
 */
export function buildServiciosPayload(
  v: ServiciosContactValues,
  source: string = SERVICIOS_SOURCE,
  touch?: FirstTouch | null,
  /** H2 · epoch ms del montaje del formulario (tiempo mínimo de llenado en el worker). */
  formStartedAt?: number,
) {
  const empresa = v.empresa.trim();
  const message = [empresa ? `Empresa: ${empresa}` : "Empresa: (no indicada)", "", v.detalle.trim()].join("\n");
  return {
    name: v.nombre.trim(),
    email: v.correo.trim(),
    message,
    consent: v.consent === true,
    source: source.slice(0, 40),
    intent: v.intent.slice(0, 80),
    language: "es" as const,
    _gotcha: v.gotcha,
    ...(formStartedAt ? { formStartedAt } : {}),
    ...attributionFields(touch),
  };
}
