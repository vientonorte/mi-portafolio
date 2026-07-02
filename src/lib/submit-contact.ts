import {
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
}

export type ContactSubmitChannel = "formsubmit" | "mailto";

export interface ContactSubmitResult {
  ok: boolean;
  channel?: ContactSubmitChannel;
  error?: string;
  mailtoUrl?: string;
}

function buildMailtoUrl(payload: ContactPayload): string {
  const subject = encodeURIComponent(`Portfolio · mensaje de ${payload.name.trim()}`);
  const body = encodeURIComponent(
    [
      `Nombre: ${payload.name.trim()}`,
      `Email: ${payload.email.trim()}`,
      "",
      formatOutboundMessage(payload),
    ].join("\n")
  );
  return `${buildContactMailtoUrl()}?subject=${subject}&body=${body}`;
}

function formatOutboundMessage(payload: ContactPayload): string {
  const lines = [payload.message.trim()];
  if (payload.intent?.trim()) lines.push("", `Motivo: ${payload.intent.trim()}`);
  if (payload.source) lines.push(`Canal: ${payload.source}`);
  return lines.join("\n");
}

/** FormSubmit clásico (POST vía iframe) — canal principal, sin CORS ni Worker. */
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
      _subject: payload.intent
        ? `Portfolio · ${payload.intent} · ${payload.name.trim()}`
        : `Portfolio · mensaje de ${payload.name.trim()}`,
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

/**
 * Envía contacto: FormSubmit (navegador) → mailto preparado.
 * GitHub Pages no envía email; el Worker es opcional y no bloquea este flujo.
 */
export async function submitContactMessage(
  payload: ContactPayload
): Promise<ContactSubmitResult> {
  if (payload._gotcha) {
    return { ok: true, channel: "formsubmit" };
  }

  if (typeof document !== "undefined") {
    try {
      const formResult = await submitViaFormPost(payload);
      if (formResult.ok) return formResult;
    } catch (error) {
      console.warn("[contact] formsubmit failed:", error);
    }
  }

  const mailtoUrl = buildMailtoUrl(payload);
  return {
    ok: false,
    error: "relay_unavailable",
    mailtoUrl,
  };
}

export function openContactMailto(payload: ContactPayload) {
  window.location.href = buildMailtoUrl(payload);
}

export { SITE_CONTACT, PUBLIC_CONTACT_EMAIL };