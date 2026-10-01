import { CTA_ANCLAS, type CtaAncla } from "../lib/track";
import { SERVICIOS_CARDS } from "./servicios-content";

/**
 * cta_click de los CTAs reales de /servicios/ (delegado en <main>):
 * - botones de las tarjetas de #opciones → posicion "opciones-<n>"
 * - CTAs de los casos (data-case-cta) → posicion "caso-<id>"
 */
export function ctaClickFromTarget(target: EventTarget | null): { ancla: CtaAncla; posicion: string } | null {
  if (!target || typeof (target as Element).closest !== "function") return null;
  const link = (target as Element).closest("a");
  if (!link) return null;
  const isAncla = (v: string | null | undefined): v is CtaAncla => !!v && (CTA_ANCLAS as readonly string[]).includes(v);
  const card = link.closest<HTMLElement>("[data-card]");
  if (card && isAncla(card.dataset.card)) {
    const n = SERVICIOS_CARDS.findIndex((c) => c.id === card.dataset.card) + 1;
    return { ancla: card.dataset.card, posicion: `opciones-${n}` };
  }
  const caseId = link.getAttribute("data-case-cta");
  if (caseId) {
    const anchor = (link.getAttribute("href") || "").split("#")[1];
    if (isAncla(anchor)) return { ancla: anchor, posicion: `caso-${caseId}`.slice(0, 60) };
  }
  return null;
}
