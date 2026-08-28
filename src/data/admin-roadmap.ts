/** Roadmap interno · `/#/admin/roadmap`. SSOT corto; ops canvas = detalle. */

export type RoadmapStatus = "now" | "next" | "blocked" | "done";

export type RoadmapItem = {
  id: string;
  title: string;
  status: RoadmapStatus;
  notes: string;
  href?: string;
};

export const ADMIN_ROADMAP_UPDATED = "2026-08-28";

export const ADMIN_ROADMAP: RoadmapItem[] = [
  {
    id: "sem-ta",
    title: "SEM piloto Search 150k · Tag Assistant generate_lead",
    status: "blocked",
    notes:
      "GTM v6 live. TA 12:53/14:00: Activadas = solo Google tag. ENABLED $0 hasta generate_lead + book_call en Activadas.",
    href: "https://vientonorte.io/#/consultoria",
  },
  {
    id: "sem-ads-ui",
    title: "Ads: import GA4 generate_lead/book_call + keywords phrase",
    status: "next",
    notes:
      "Conversiones actuales: lead form Inactiva + Reservar cita. RSA en clipboard. Campañas detenidas.",
    href: "https://ads.google.com/aw/conversions?ocid=8398019470",
  },
  {
    id: "poc-fintoc-bdp",
    title: "PoC Fintoc × X|CMS · /vn-bdp",
    status: "next",
    notes:
      "DS-2026-08-28 A→C. v1 Payment Link post-kickoff (Worker /api/pay). v2 botón en flujo CMS del cliente. Hero no cobra. Keys Fintoc NO DATO.",
    href: "https://vientonorte.io/#/demo/x-cms",
  },
  {
    id: "hero-xcms",
    title: "Hero v3 mockup X|CMS 16:10",
    status: "now",
    notes: "PR #220 · dashboard 1440×900 contain. Live main aún recorta hasta merge.",
    href: "https://github.com/vientonorte/mi-portafolio/pull/220",
  },
];
