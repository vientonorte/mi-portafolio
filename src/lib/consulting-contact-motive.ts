import type { ConsultingPackageId } from "../data/vientonorte-consulting";

export type ContactMotive = ConsultingPackageId | "help" | "simple";

const MOTIVE_COPY: Record<ContactMotive, { es: string; en: string }> = {
  radar: {
    es: "Motivo: Diagnóstico (heurístico a medida).\n\n",
    en: "Reason: Diagnostic (custom heuristic).\n\n",
  },
  marco: {
    es: "Motivo: Prototipo / pantallas listas para construir.\n\n",
    en: "Reason: Prototype / screens ready to build.\n\n",
  },
  ops: {
    es: "Motivo: Proceso de equipo.\n\n",
    en: "Reason: Team process.\n\n",
  },
  help: {
    es: "Motivo: necesito ayuda para elegir alcance.\n\n",
    en: "Reason: I need help choosing scope.\n\n",
  },
  simple: {
    es: "Motivo: contacto simple.\n\n",
    en: "Reason: simple contact.\n\n",
  },
};

export function consultingMotiveMessage(
  motive: ContactMotive,
  language: "es" | "en"
): string {
  return MOTIVE_COPY[motive][language];
}
