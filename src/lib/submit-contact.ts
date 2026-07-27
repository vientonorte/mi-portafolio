import {
  buildGoogleFormsFields,
  fetchGoogleFormsFbzx,
  getGoogleFormsConfig,
} from "./google-forms-contact";
import {
  CONTACT_API_URL,
  FORM_SUBMIT_INBOX,
  PUBLIC_CONTACT_EMAIL,
  SITE_CONTACT,
  buildContactMailtoUrl,
} from "./site-contact";

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
}

export type ContactSubmitChannel = "google_forms" | "formsubmit" | "worker" | "mailto";

export interface ContactSubmitResult {
  ok: boolean;
  channel?: ContactSubmitChannel;
  error?: string;
  mailtoUrl?: string;
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

/** Google Forms (POST vía iframe) — copia al respondente + notificación al dueño del form. */
async function submitViaGoogleForms(payload: ContactPayload): Promise<ContactSubmitResult> {
  const config = getGoogleFormsConfig();
  if (!config) {
    return { ok: false, error: "google_forms_not_configured" };
  }

  const fbzx = await fetchGoogleFormsFbzx(config.actionUrl);

  return new Promise((resolve) => {
    const frameName = "contact-google-forms-frame";
    let frame = document.querySelector<HTMLIFrameElement>(`iframe[name="${frameName}"]`);

    if (!frame) {
      frame = document.createElement("iframe");
      frame.name = frameName;
      frame.title = "Contact Google Forms relay";
      frame.setAttribute("aria-hidden", "true");
      frame.style.cssText = "display:none;width:0;height:0;border:0";
      document.body.appendChild(frame);
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = config.actionUrl;
    form.target = frameName;
    form.style.display = "none";

    const fields = buildGoogleFormsFields(payload, config.entries);
    const hiddenFields: Record<string, string> = {
      ...fields,
      fvv: "1",
      pageHistory: "0",
    };
    if (fbzx) hiddenFields.fbzx = fbzx;

    for (const [key, value] of Object.entries(hiddenFields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    const cleanup = () => {
      form.remove();
      clearTimeout(timer);
    };

    const timer = window.setTimeout(() => {
      cleanup();
      resolve({ ok: true, channel: "google_forms" });
    }, 1800);

    frame.addEventListener(
      "load",
      () => {
        cleanup();
        resolve({ ok: true, channel: "google_forms" });
      },
      { once: true }
    );

    document.body.appendChild(form);
    form.submit();
  });
}

/** FormSubmit clásico (POST vía iframe) — respaldo, sin CORS ni Worker. */
function submitViaFormPost(payload: ContactPayload): Promise<ContactSubmitResult> {
  return new Promise((resolve) => {
    const frameName = "contact-formsubmit-frame";
    let frame = document.querySelector<HTMLIFrameElement>(`iframe[name="${frameName}"]`);

    if (!frame) {
      frame = document.createElement("iframe");
      frame.name = frameName;
      frame.title = "Contact form relay";
      frame.setAttribute("aria-hidden", "true");
      frame.style.cssText = "display:none;width:0;height:0;border:0";
      document.body.appendChild(frame);
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = `https://formsubmit.co/${encodeURIComponent(FORM_SUBMIT_INBOX)}`;
    form.target = frameName;
    form.style.display = "none";

    const fields: Record<string, string> = {
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: formatOutboundMessage(payload),
      _subject: buildSubject(payload),
      _replyto: payload.email.trim(),
      _captcha: "false",
      _template: "table",
      _next: `${window.location.origin}${import.meta.env.BASE_URL}#/contacto?sent=1`,
    };

    for (const [key, value] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    const cleanup = () => {
      form.remove();
      clearTimeout(timer);
    };

    const timer = window.setTimeout(() => {
      cleanup();
      resolve({ ok: true, channel: "formsubmit" });
    }, 1800);

    frame.addEventListener(
      "load",
      () => {
        cleanup();
        resolve({ ok: true, channel: "formsubmit" });
      },
      { once: true }
    );

    document.body.appendChild(form);
    form.submit();
  });
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
    }),
  });

  const result = (await response.json().catch(() => ({}))) as {
    ok?: boolean;
    error?: string;
  };

  if (response.ok && result.ok) {
    return { ok: true, channel: "worker" };
  }

  return {
    ok: false,
    error: result.error || `Relay HTTP ${response.status}`,
  };
}

const CHANNEL_PRIORITY: ContactSubmitChannel[] = [
  "google_forms",
  "worker",
  "formsubmit",
];

export function pickBestResult(results: ContactSubmitResult[]): ContactSubmitResult | null {
  const okResults = results.filter((result) => result.ok);
  if (okResults.length === 0) return null;

  for (const channel of CHANNEL_PRIORITY) {
    const match = okResults.find((result) => result.channel === channel);
    if (match) return match;
  }

  return okResults[0] ?? null;
}

function collectParallelResults(
  parallelResults: PromiseSettledResult<ContactSubmitResult>[]
): ContactSubmitResult[] {
  for (const result of parallelResults) {
    if (result.status === "rejected") {
      console.warn("[contact] parallel submit failed:", result.reason);
    }
  }

  return parallelResults
    .map((result) => (result.status === "fulfilled" ? result.value : null))
    .filter((result): result is ContactSubmitResult => Boolean(result));
}

/**
 * Envía contacto en paralelo: Google Forms + Worker (si hay DOM).
 * FormSubmit solo como último respaldo (emails con sponsor en plan free).
 */
export async function submitContactMessage(
  payload: ContactPayload
): Promise<ContactSubmitResult> {
  if (payload._gotcha) {
    return { ok: true, channel: getGoogleFormsConfig() ? "google_forms" : "formsubmit" };
  }

  let lastWorkerError: string | undefined;

  if (typeof document !== "undefined") {
    const parallelTasks: Promise<ContactSubmitResult>[] = [submitViaWorker(payload)];

    if (getGoogleFormsConfig()) {
      parallelTasks.push(submitViaGoogleForms(payload));
    }

    const parallelResults = await Promise.allSettled(parallelTasks);
    const settled = collectParallelResults(parallelResults);
    const workerResult = settled.find((result) => result.channel === "worker");
    if (workerResult && !workerResult.ok) {
      lastWorkerError = workerResult.error;
    }

    const best = pickBestResult(settled);
    if (best) return best;

    try {
      const formsubmitResult = await submitViaFormPost(payload);
      if (formsubmitResult.ok) return formsubmitResult;
    } catch (error) {
      console.warn("[contact] formsubmit fallback failed:", error);
    }
  } else {
    try {
      const workerResult = await submitViaWorker(payload);
      if (workerResult.ok) return workerResult;
      lastWorkerError = workerResult.error;
      console.warn("[contact] worker failed:", workerResult.error);
    } catch (error) {
      console.warn("[contact] worker unreachable:", error);
    }
  }

  const mailtoUrl = buildMailtoUrl(payload);
  return {
    ok: false,
    error: lastWorkerError || "relay_unavailable",
    mailtoUrl,
  };
}

export function openContactMailto(payload: ContactPayload) {
  window.location.href = buildMailtoUrl(payload);
}

export { SITE_CONTACT, PUBLIC_CONTACT_EMAIL };