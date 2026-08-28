/** Roadmap interno · `/#/admin/roadmap`. SSOT corto; ops canvas = detalle. */

export type RoadmapStatus = "now" | "next" | "blocked" | "done";

export type RoadmapItem = {
  id: string;
  title: string;
  status: RoadmapStatus;
  notes: string;
  href?: string;
};

export const ADMIN_ROADMAP_UPDATED = "2026-08-28 16:40";

export const ADMIN_ROADMAP: RoadmapItem[] = [
  {
    id: "hero-xcms",
    title: "Hero v3 mockup X|CMS 16:10",
    status: "done",
    notes: "Merged #220 · 38478e3 · laptop 1440×900 contain. Live main.",
    href: "https://vientonorte.io/#/consultoria",
  },
  {
    id: "sem-ta",
    title: "Tag Assistant generate_lead + book_call",
    status: "done",
    notes:
      "14:31 Chrome sin extensiones. Activadas: generate_lead 2× + book_call 2×. Conectado vientonorte.io. GTM v6.",
    href: "https://vientonorte.io/#/consultoria",
  },
  {
    id: "sem-ads-ui",
    title: "Piloto Search 150k ENABLED",
    status: "done",
    notes:
      "Leads-Search-1 · 24184249593 · CID 811-405-3092 · CLP 5.000/día · Chile · generate_lead principal + book_call secundario · AG-A phrase ×12. Smart detenido.",
    href: "https://ads.google.com/aw/campaigns?ocid=8398019470",
  },
  {
    id: "sem-ads-polish",
    title: "Ads polish: rename + AG-D/B/C + negativos",
    status: "now",
    notes:
      "UI aún Leads-Search-1. Falta sitelinks, quitar objetivo llamadas, IA Max si reaparece. No subir techo.",
    href: "https://ads.google.com/aw/campaigns?ocid=8398019470",
  },
  {
    id: "posicionapp",
    title: "PosicionApp VN · 25 kws Chile",
    status: "now",
    notes:
      "vientonorte.io Chile. Clusters a11y / design / privacy. Tracking 28 ago. Pos 21 = fuera top 20. Ley 21.719 vol. 1,6k.",
    href: "https://panel.posicion.app/proyectos/q1NSHH1azZwuazuSwaZt",
  },
  {
    id: "poc-fintoc-bdp",
    title: "PoC Fintoc × X|CMS · /vn-bdp",
    status: "next",
    notes:
      "DS-2026-08-28 A→C. v1 Worker /api/pay. Hero no cobra. Keys Fintoc NO DATO. Wait apply=true.",
    href: "https://vientonorte.io/#/demo/x-cms",
  },
];
