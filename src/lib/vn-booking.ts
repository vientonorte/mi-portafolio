import { ADMIN_API_BASE } from "./admin-config";
import { readContactSession } from "./contact-draft-storage";
import { trackEvent } from "./analytics";
import { fireAdsConversion } from "../vn-core/analytics/gtm";

export type BookingIntent = "kickoff" | "radar-free" | "consulting";

/**
 * Siempre registra el click de agenda en el Worker y dispara mail a VN.
 * Si hay sesión, adjunta nombre/email. Si no, queda status abierto.
 *
 * H2 · las conversiones (`book_call` GA4 + conversión Ads BOOK_APPOINTMENT +
 * `onConfirmed`, p. ej. `generate_lead`) se disparan SOLO si el Worker
 * respondió OK (2xx; /api/booking responde 201). Un 4xx/429/5xx o un error
 * de red no cuenta como conversión.
 */
export async function recordBookingIntent(params: {
  origin: string;
  intent?: BookingIntent;
  notes?: string;
  packageId?: string;
  /** Se llama una vez, después de la confirmación del Worker. */
  onConfirmed?: () => void;
}): Promise<void> {
  const session = readContactSession();
  const name = session?.name.trim() ?? "";
  const email = session?.email.trim() ?? "";

  try {
    const response = await fetch(`${ADMIN_API_BASE}/api/booking`, {
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

    if (!response.ok) return;

    trackEvent("book_call", {
      category: "conversion",
      origin: params.origin,
      intent: params.intent ?? "kickoff",
      has_identity: Boolean(name && email),
      package_id: params.packageId,
    });

    // Google Ads conversion — BOOK_APPOINTMENT (campaña a11y_gratis_pymes)
    // Solo tras la respuesta OK del Worker para no inflar métricas con
    // fallas de red, 429 del rate limit o rechazos.
    const adsConversionId = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID;
    if (adsConversionId) {
      fireAdsConversion(adsConversionId);
    }
    params.onConfirmed?.();
  } catch {
    /* Worker no desplegado o red — el Calendar igual abre */
  }
}
