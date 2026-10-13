import { attributionFields } from "../../lib/utm";
import {
  CONTACT_API_URL,
  PUBLIC_CONTACT_EMAIL,
  SITE_CONTACT,
  buildContactMailtoUrl,
} from "../../lib/site-contact";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  _gotcha?: string;
  source?: "assistant" | "form";
  intent?: string;
  consent?: boolean;
  language?: "es" | "en";
  /** Asunto VN · Kickoff · … (selecciones embudo) */
  conversationTitle?: string;
  /** H2 · epoch ms del montaje del formulario (tiempo mínimo de llenado en el worker). */
  formStartedAt?: number;
}

/**
 * S42 · Solo el worker (contact.vientonorte.io). Google Forms y FormSubmit salieron del
 * cliente (orden TL/PO 13-oct): ningún dato del formulario va a terceros desde el navegador.
 */
export type ContactSubmitChannel = "worker" | "mailto";

export interface ContactSubmitResult {
  ok: boolean;
  channel?: ContactSubmitChannel;
  error?: string;
  mailtoUrl?: string;
  /**
   * H2 · true solo si el worker respondió HTTP 200 con `ok: true`. Las
   * conversiones GA4/Ads se disparan únicamente en ese caso (ver
   * lib/contact-conversion.ts).
   */
  workerConfirmed?: boolean;
}

function buildSubject(payload: ContactPayload): string {
  const title = payload.conversationTitle?.trim();
  if (title) return `${title} · ${payload.name.trim()}`;
  if (payload.intent?.trim()) {
    return `VN · ${payload.intent.trim()} · ${payload.name.trim()}`;
  }
  return `VN · mensaje · ${payload.name.trim()}`;
}

function buildMailtoUrl(payload: ContactPayload): string {
  const subject = encodeURIComponent(buildSubject(payload));
  const body = encodeURIComponent(
    [
      payload.conversationTitle
        ? `Conversación: ${payload.conversationTitle}`
        : null,
      `Nombre: ${payload.name.trim()}`,
      `Email: ${payload.email.trim()}`,
      "",
      formatOutboundMessage(payload),
    ]
      .filter(Boolean)
      .join("\n")
  );
  return `${buildContactMailtoUrl()}?subject=${subject}&body=${body}`;
}

function formatOutboundMessage(payload: ContactPayload): string {
  const lines: string[] = [];
  if (payload.conversationTitle?.trim()) {
    lines.push(`Título: ${payload.conversationTitle.trim()}`, "");
  }
  lines.push(payload.message.trim());
  if (payload.intent?.trim()) lines.push("", `Motivo: ${payload.intent.trim()}`);
  if (payload.source) lines.push(`Canal: ${payload.source}`);
  return lines.join("\n");
}

async function submitViaWorker(payload: ContactPayload): Promise<ContactSubmitResult> {
  const response = await fetch(CONTACT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: formatOutboundMessage(payload),
      _gotcha: payload._gotcha ?? "",
      source: payload.source ?? "form",
      intent: payload.intent ?? "",
      conversationTitle: payload.conversationTitle ?? "",
      consent: payload.consent === true,
      language: payload.language ?? "es",
      formStartedAt: payload.formStartedAt,
      // Atribución de primer toque: utm_* + landing_path (con ancla, p. ej. /servicios/#web-pymes).
      ...attributionFields(),
    }),
  });

  const result = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
  };

  if (response.ok && result.ok) {
    return { ok: true, channel: "worker", workerConfirmed: response.status === 200 };
  }

  return {
    ok: false,
    channel: "worker",
    error: result.error || `Relay HTTP ${response.status}`,
  };
}

export function pickBestResult(results: ContactSubmitResult[]): ContactSubmitResult | null {
  return results.find((result) => result.ok) ?? null;
}

/** Puerto DIP: la UI no elige el canal. */
export type ContactSubmitter = (
  payload: ContactPayload
) => Promise<ContactSubmitResult>;

/** Envía al worker; si falla, devuelve un mailto de respaldo (sin terceros). */
export async function submitContactMessage(
  payload: ContactPayload
): Promise<ContactSubmitResult> {
  if (payload._gotcha) {
    return { ok: true, channel: "worker", workerConfirmed: false };
  }

  let lastWorkerError: string | undefined;
  try {
    const workerResult = await submitViaWorker(payload);
    if (workerResult.ok) return workerResult;
    lastWorkerError = workerResult.error;
    console.warn("[contact] worker failed:", workerResult.error);
  } catch (error) {
    console.warn("[contact] worker unreachable:", error);
  }

  return {
    ok: false,
    error: lastWorkerError || "relay_unavailable",
    mailtoUrl: buildMailtoUrl(payload),
  };
}

export function openContactMailto(payload: ContactPayload) {
  window.location.href = buildMailtoUrl(payload);
}

export { SITE_CONTACT, PUBLIC_CONTACT_EMAIL };