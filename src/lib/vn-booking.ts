import { ADMIN_API_BASE } from "./admin-config";
import { readContactSession } from "./contact-draft-storage";
import { trackEvent } from "./analytics";
import { fireAdsConversion } from "../vn-core/analytics/gtm";

export type BookingIntent = "kickoff" | "radar-free" | "consulting";

/**
 * Siempre registra el click de agenda en el Worker y dispara mail a VN.
 * Si hay sesión, adjunta nombre/email. Si no, queda status abierto.
 */
export async function recordBookingIntent(params: {
  origin: string;
  intent?: BookingIntent;
  notes?: string;
  packageId?: string;
}): Promise<void> {
  const session = readContactSession();
  const name = session?.name.trim() ?? "";
  const email = session?.email.trim() ?? "";

  trackEvent("book_call", {
    category: "conversion",
    origin: params.origin,
    intent: params.intent ?? "kickoff",
    has_identity: Boolean(name && email),
    package_id: params.packageId,
  });

  try {
    await fetch(`${ADMIN_API_BASE}/api/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: name.length >= 2 ? name : "Agenda abierta",
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "",
        notes: params.notes ?? "",
        intent: params.intent ?? "kickoff",
        origin: params.origin,
        packageId: params.packageId,
      }),
    });

    // Google Ads conversion — BOOK_APPOINTMENT (campaña a11y_gratis_pymes)
    // Se dispara después de registrar la intención en el Worker para evitar
    // inflar métricas cuando la red falla antes de confirmar la reserva.
    const adsConversionId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
    if (adsConversionId) {
      fireAdsConversion(adsConversionId);
    }
  } catch {
    /* Worker no desplegado o red — el Calendar igual abre */
  }
}
