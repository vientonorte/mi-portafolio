import {
  CONTACT_API_URL,
  PUBLIC_CONTACT_EMAIL,
  SITE_CONTACT,
  buildContactMailtoUrl,
} from "./site-contact";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  _gotcha?: string;
}

export type ContactSubmitChannel = "worker" | "formsubmit" | "mailto";

export interface ContactSubmitResult {
  ok: boolean;
  channel?: ContactSubmitChannel;
  error?: string;
  mailtoUrl?: string;
}

const FORM_SUBMIT_ACTION = `https://formsubmit.co/${encodeURIComponent(PUBLIC_CONTACT_EMAIL)}`;

function buildMailtoUrl(payload: ContactPayload): string {
  const subject = encodeURIComponent(`Portfolio · mensaje de ${payload.name.trim()}`);
  const body = encodeURIComponent(
    [
      `Nombre: ${payload.name.trim()}`,
      `Email: ${payload.email.trim()}`,
      "",
      payload.message.trim(),
    ].join("\n")
  );
  return `${buildContactMailtoUrl()}?subject=${subject}&body=${body}`;
}

/** FormSubmit clásico (POST) — evita CORS del endpoint AJAX. */
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
    form.action = FORM_SUBMIT_ACTION;
    form.target = frameName;
    form.style.display = "none";

    const fields: Record<string, string> = {
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: payload.message.trim(),
      _subject: `Portfolio · mensaje de ${payload.name.trim()}`,
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
      message: payload.message.trim(),
      _gotcha: payload._gotcha ?? "",
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

/**
 * Envía contacto: Worker → FormSubmit (POST) → mailto preparado.
 * El formulario nunca debe terminar en error sin alternativa accionable.
 */
export async function submitContactMessage(
  payload: ContactPayload
): Promise<ContactSubmitResult> {
  if (payload._gotcha) {
    return { ok: true, channel: "worker" };
  }

  try {
    const workerResult = await submitViaWorker(payload);
    if (workerResult.ok) return workerResult;
  } catch (error) {
    console.warn("[contact] worker unreachable:", error);
  }

  if (typeof document !== "undefined") {
    try {
      const formResult = await submitViaFormPost(payload);
      if (formResult.ok) return formResult;
    } catch (error) {
      console.warn("[contact] formsubmit fallback failed:", error);
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

export { SITE_CONTACT };