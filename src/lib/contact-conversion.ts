import { analytics, trackEvent } from "../vn-core/analytics/fo-events";
import type { ContactSubmitResult } from "../vn-core/contact/submit-contact";

export type ContactLeadConversion = Parameters<typeof analytics.generateLead>[0];

/**
 * H2 · conversiones del formulario de contacto.
 *
 * `submit_contact_form` (success) y `generate_lead` (GA4 key events que GTM
 * importa a Google Ads) se disparan SOLO si el worker confirmó el envío con
 * HTTP 200 (`result.workerConfirmed`). Si el mensaje salió por otro canal
 * (Google Forms / FormSubmit) se registra `contact_delivered_unconfirmed`,
 * que no es conversión. Devuelve true si se disparó la conversión.
 */
export function trackContactSubmitted(
  result: Pick<ContactSubmitResult, "ok" | "channel" | "workerConfirmed">,
  lead?: ContactLeadConversion | null
): boolean {
  if (!result.ok) {
    analytics.submitContactForm(false);
    return false;
  }
  if (result.workerConfirmed !== true) {
    trackEvent("contact_delivered_unconfirmed", {
      category: "diagnostic",
      ...(result.channel ? { channel: result.channel } : {}),
    });
    return false;
  }
  analytics.submitContactForm(true, result.channel);
  if (lead) analytics.generateLead(lead);
  return true;
}
