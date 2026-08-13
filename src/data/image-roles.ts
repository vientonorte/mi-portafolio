/** Aplicaciones web que una foto puede alimentar. Una casa por rol. */

export type ImageWebRole =
  | "share_home"
  | "share_consultoria"
  | "schema"
  | "favicon"
  | "logo"
  | "apple"
  | "faq"
  | "gallery";

export interface ImageRoleDef {
  id: ImageWebRole;
  label: string;
  hint: string;
  /** Slot de catálogo; vacío = subida libre (R2, sin Pages). */
  slotId?: string;
}

export const IMAGE_WEB_ROLES: ImageRoleDef[] = [
  {
    id: "share_home",
    label: "Share redes · home",
    hint: "LinkedIn / Meta / WhatsApp al pegar vientonorte.io. PNG 1200×630.",
    slotId: "branding.ogHome",
  },
  {
    id: "share_consultoria",
    label: "Share redes · consultoría",
    hint: "Card al pegar /s/consultoria. PNG 1200×630.",
    slotId: "branding.ogConsultoria",
  },
  {
    id: "schema",
    label: "Schema.org (logo)",
    hint: "JSON-LD Organization.logo. Cuadrado ≥512.",
    slotId: "branding.schemaLogo",
  },
  {
    id: "favicon",
    label: "Favicon",
    hint: "Pestaña del navegador. ICO o PNG 32–48.",
    slotId: "branding.favicon",
  },
  {
    id: "logo",
    label: "Logo / isologo",
    hint: "Marca en toolbar. PNG cuadrado, fondo limpio.",
    slotId: "branding.isologo",
  },
  {
    id: "apple",
    label: "Apple / PWA",
    hint: "icon-192. Cuadrado.",
    slotId: "branding.appleTouch",
  },
  {
    id: "faq",
    label: "FAQ / ayuda",
    hint: "Ilustración de ayuda. No reescribe HTML solo.",
  },
  {
    id: "gallery",
    label: "Galería (sin cable)",
    hint: "Queda en R2 + CMS. No cambia favicon ni share.",
  },
];

export function roleDef(id: string | undefined): ImageRoleDef | undefined {
  return IMAGE_WEB_ROLES.find((r) => r.id === id);
}
