import type { ContactTab } from "./contact-draft";

/** Solo sessionStorage — se borra al cerrar la pestaña (privacy by design, Ley 21.719). */
const STORAGE_KEY = "vn-contact-session-v1";

export interface ContactSessionSnapshot {
  name: string;
  email: string;
  message: string;
  activeTab: ContactTab;
  updatedAt: number;
}

function canUseSessionStorage(): boolean {
  try {
    return typeof sessionStorage !== "undefined";
  } catch {
    return false;
  }
}

/** No persistimos consentimiento: el usuario debe reconfirmar en cada envío. */
export function readContactSession(): ContactSessionSnapshot | null {
  if (!canUseSessionStorage()) return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ContactSessionSnapshot>;
    if (
      typeof parsed.name !== "string" ||
      typeof parsed.email !== "string" ||
      typeof parsed.message !== "string"
    ) {
      return null;
    }
    return {
      name: parsed.name,
      email: parsed.email,
      message: parsed.message,
      activeTab: parsed.activeTab === "form" ? "form" : "assistant",
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

export function writeContactSession(snapshot: Omit<ContactSessionSnapshot, "updatedAt">): void {
  if (!canUseSessionStorage()) return;
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...snapshot, updatedAt: Date.now() } satisfies ContactSessionSnapshot)
    );
  } catch {
    /* quota / private mode */
  }
}

export function clearContactSession(): void {
  if (!canUseSessionStorage()) return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}