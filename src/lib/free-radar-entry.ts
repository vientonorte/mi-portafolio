/**
 * SEM lead magnet · Entrada gratis a Radar (Diagnóstico express).
 * WCAG 2.2 AA de un flujo crítico → upsell Radar completo 5–7 días.
 * NO redirige a /auditoria (esa página es muestra de mentoría portfolio).
 */

import type { NavigateFunction } from "react-router-dom";
import type { Language } from "./i18n";
import { analytics, trackEvent } from "./analytics";
import {
  navigateToContactAssistant,
  type ContactCtaOrigin,
} from "./navigate-to-contact";

export const FREE_RADAR_ENTRY_MESSAGE: Record<Language, string> = {
  es: `Hola Viento Norte — solicito la entrada gratis a Radar (Diagnóstico express).

Quiero la revisión WCAG 2.2 AA de un flujo crítico de mi producto/sitio.

URL o flujo a revisar: [pega link o describe el flujo]
Contexto (pyme / producto): [breve]

Si aplica, me interesa conversar el Radar completo (5–7 días).

Gracias.`,
  en: `Hi Viento Norte — I’d like the free Radar entry (Express diagnostic).

I want a WCAG 2.2 AA review of one critical flow on my product/site.

URL or flow to review: [paste link or describe]
Context (SMB / product): [brief]

If it fits, I’m open to talking about the full Radar (5–7 days).

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
