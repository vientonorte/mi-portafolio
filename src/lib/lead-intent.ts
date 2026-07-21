/**
 * Prefill contact form from landing CTAs (packages, demos, recursos).
 * sessionStorage only — cleared when consumed (Ley 21.719 minimización).
 */
const KEY = "vn-lead-intent-v1";

export function setLeadIntent(message: string): void {
  try {
    if (typeof sessionStorage === "undefined") return;
    sessionStorage.setItem(KEY, message.slice(0, 2000));
  } catch {
    /* private mode */
  }
}

export function consumeLeadIntent(): string | null {
  try {
    if (typeof sessionStorage === "undefined") return null;
    const value = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    return value;
  } catch {
    return null;
  }
}

export function goToContactWithIntent(
  scrollToSection: (id: string) => void,
  message: string
): void {
  setLeadIntent(message);
  scrollToSection("contacto");
}
