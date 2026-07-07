import type { ContactPayload } from "./submit-contact";

export interface GoogleFormsEntryIds {
  name: string;
  email: string;
  message: string;
  intent?: string;
  source?: string;
  language?: string;
}

export interface GoogleFormsContactConfig {
  actionUrl: string;
  entries: GoogleFormsEntryIds;
}

function readEntry(key: keyof GoogleFormsEntryIds): string | undefined {
  const envKey = `VITE_GOOGLE_FORM_ENTRY_${key.toUpperCase()}` as keyof ImportMetaEnv;
  const value = import.meta.env[envKey];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

/** Activo cuando hay action URL + campos mínimos (nombre, email, mensaje). */
export function getGoogleFormsConfig(): GoogleFormsContactConfig | null {
  const actionUrl = import.meta.env.VITE_GOOGLE_FORM_ACTION_URL?.trim();
  const name = readEntry("name");
  const email = readEntry("email");
  const message = readEntry("message");

  if (!actionUrl || !name || !email || !message) return null;

  return {
    actionUrl,
    entries: {
      name,
      email,
      message,
      intent: readEntry("intent"),
      source: readEntry("source"),
      language: readEntry("language"),
    },
  };
}

export function getGoogleFormsViewUrl(actionUrl: string): string {
  return actionUrl.replace(/\/formResponse$/, "/viewform");
}

/** Token anti-spam requerido por Google Forms en muchos envíos programáticos. */
export function parseFbzxFromHtml(html: string): string | null {
  const patterns = [
    /"fbzx"\s*:\s*"(-?\d+)"/,
    /name="fbzx"\s+value="(-?\d+)"/,
    /FB_PUBLIC_LOAD_DATA_\s*=\s*\[null,null,"(-?\d+)"\]/,
    /FB_PUBLIC_LOAD_DATA_\s*=\s*\[[\s\S]*?\[null,null,"(-?\d+)"\]/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export async function fetchGoogleFormsFbzx(actionUrl: string): Promise<string | null> {
  try {
    const viewUrl = getGoogleFormsViewUrl(actionUrl);
    const response = await fetch(viewUrl, { mode: "cors", credentials: "omit" });
    if (!response.ok) return null;
    const html = await response.text();
    return parseFbzxFromHtml(html);
  } catch {
    return null;
  }
}

export function buildGoogleFormsFields(
  payload: ContactPayload,
  entries: GoogleFormsEntryIds
): Record<string, string> {
  const fields: Record<string, string> = {
    [entries.name]: payload.name.trim(),
    [entries.email]: payload.email.trim(),
    [entries.message]: formatGoogleFormsMessage(payload),
  };

  if (entries.intent && payload.intent?.trim()) {
    fields[entries.intent] = payload.intent.trim();
  }
  if (entries.source && payload.source) {
    fields[entries.source] = payload.source;
  }
  if (entries.language && payload.language) {
    fields[entries.language] = payload.language;
  }

  return fields;
}

function formatGoogleFormsMessage(payload: ContactPayload): string {
  const lines = [payload.message.trim()];
  if (payload.intent?.trim()) lines.push("", `Motivo: ${payload.intent.trim()}`);
  if (payload.source) lines.push(`Canal: ${payload.source}`);
  if (payload.language) lines.push(`Idioma: ${payload.language}`);
  return lines.join("\n");
}