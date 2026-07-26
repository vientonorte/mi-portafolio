/**
 * Lead magnet · Probar gratis (Diagnóstico de un flujo).
 * 1 flujo accesible → conversación por Diagnóstico completo 5–7 días.
 * NO redirige a /auditoria (mentoría portfolio).
 */

import type { NavigateFunction } from "react-router-dom";
import type { Language } from "./i18n";
import { analytics, trackEvent } from "./analytics";
import {
  navigateToContactAssistant,
  type ContactCtaOrigin,
} from "./navigate-to-contact";

export const FREE_RADAR_ENTRY_MESSAGE: Record<Language, string> = {
  es: `Hola Viento Norte — quiero la revisión gratis de accesibilidad de un flujo.

Qué revisar: [link o describe el flujo]
Empresa o producto: [breve]

Si sirve, hablamos del Diagnóstico completo (5–7 días).

Gracias.`,
  en: `Hi Viento Norte — I want a free accessibility review of one flow.

What to review: [link or describe the flow]
Company or product: [brief]

If it helps, we can talk about the full Diagnostic (5–7 days).

Thanks.`,
};

export function openFreeRadarEntry(
  navigate: NavigateFunction,
  language: Language,
  origin: ContactCtaOrigin = "free-radar"
): void {
  trackEvent("free_radar_entry_open", {
    origin,
    package_id: "radar",
    freemium: true,
  });
  analytics.clickHeroFreeAudit();

  navigateToContactAssistant(navigate, {
    origin,
    source: "cta",
    intent: "consulting",
    packageId: "radar",
    message: FREE_RADAR_ENTRY_MESSAGE[language],
    consultingQ1: "radar-free",
  });
}
