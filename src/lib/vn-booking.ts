import { ADMIN_API_BASE } from "./admin-config";
import { readContactSession } from "./contact-draft-storage";
import { trackEvent } from "./analytics";

export type BookingIntent = "kickoff" | "radar-free" | "consulting";

/**
 * Registra la intención de agenda en el Worker (best-effort).
 * Si no hay nombre/email de sesión, no inventa identidad — solo analytics.
 */
export async function recordBookingIntent(params: {
  origin: string;
  intent?: BookingIntent;
  notes?: string;
}): Promise<void> {
  const session = readContactSession();
  const name = session?.name.trim() ?? "";
  const email = session?.email.trim() ?? "";

  trackEvent("book_call", {
    category: "conversion",
    origin: params.origin,
    intent: params.intent ?? "kickoff",
    has_identity: Boolean(name && email),
  });

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return;
  }

  try {
    await fetch(`${ADMIN_API_BASE}/api/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        email,
        notes: params.notes ?? "",
        intent: params.intent ?? "kickoff",
        origin: params.origin,
      }),
    });
  } catch {
    /* Worker no desplegado o red — el Calendar igual abre */
  }
}
