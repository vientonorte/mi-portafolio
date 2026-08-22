/**
 * Demo con reloj por path de servicio (Diagnóstico · Prototipo · Proceso · App).
 * Artefactos reales ya publicados — no inventar URLs ni métricas.
 */
import type { HeroRoleId } from "./consultoria-hero-roles";
import type { ConsultingPackageId } from "./vientonorte-consulting";
import { CONSULTORIA_DEMO_X_CMS } from "./consultoria-demos";
import { TRANSVIP_APP_PROTO_URL } from "./value-content-arsenal";
import type { Language } from "../lib/i18n";
import { portfolioImages } from "../lib/portfolio-image-urls";
import { DEMO_X_CMS_DURATION_SEC } from "../lib/demo-x-cms-campaign";

export type ServicePathId = HeroRoleId;

export type ServicePathDemo = {
  id: ServicePathId;
  packageId: ConsultingPackageId;
  appGoal?: boolean;
  durationSec: number;
  warnSec: number;
  iframeUrl?: string;
  poster: string;
  posterWebp?: string;
  caption: Record<Language, string>;
  kicker: Record<Language, string>;
  headline: Record<Language, string>;
  body: Record<Language, string>;
};

/** DEI Dashboard · POC de proceso / ops (Figma Sites). */
const DEI_OPS_SITE = "https://badge-sweet-21070688.figma.site";

export const SERVICE_PATH_DEMOS: readonly ServicePathDemo[] = [
  {
    id: "diagnostic",
    packageId: "radar",
    durationSec: 60,
    warnSec: 15,
    poster: portfolioImages.consultoria.geesDashboard,
    posterWebp: portfolioImages.consultoria.geesDashboardWebp,
    caption: {
      es: "GEES · propuesta de diagnóstico",
      en: "GEES · diagnostic proposal",
    },
    kicker: {
      es: "Path Diagnóstico · Radar · 1 min",
      en: "Diagnostic path · Radar · 1 min",
    },
    headline: {
      es: "Así se ve un diagnóstico.\nLuego el informe.",
      en: "This is what a diagnostic looks like.\nThen the report.",
    },
    body: {
      es: "Demo de 1 minuto: propuesta ejecutiva. Sin datos de tu empresa. Al terminar, agenda Radar o pide la revisión gratis de un flujo.",
      en: "1-minute demo: executive proposal. No data from your company. Then book Radar or request the free flow review.",
    },
  },
  {
    id: "prototype",
    packageId: "marco",
    durationSec: DEMO_X_CMS_DURATION_SEC,
    warnSec: 60,
    iframeUrl: CONSULTORIA_DEMO_X_CMS.figmaSitesUrl,
    poster: portfolioImages.consultoria.xCmsDashboard,
    posterWebp: portfolioImages.consultoria.xCmsDashboardWebp,
    caption: {
      es: "X|CMS · prototipo publicado",
      en: "X|CMS · published prototype",
    },
    kicker: {
      es: "Path Prototipo · Marco · 5 min",
      en: "Prototype path · Marco · 5 min",
    },
    headline: {
      es: "Mira el prototipo.\nLuego elige el módulo.",
      en: "See the prototype.\nThen pick the module.",
    },
    body: {
      es: "Demo de 5 minutos del dashboard X|CMS. Sin edición ni datos reales. Misma sesión que la campaña /demo/x-cms.",
      en: "5-minute X|CMS dashboard demo. No editing or real data. Same session as the /demo/x-cms campaign.",
    },
  },
  {
    id: "process",
    packageId: "ops",
    durationSec: 4 * 60,
    warnSec: 60,
    iframeUrl: DEI_OPS_SITE,
    poster: portfolioImages.sura.iaAutomationDashboard,
    posterWebp: portfolioImages.sura.iaAutomationDashboardWebp,
    caption: {
      es: "DEI Dashboard · proceso de equipo",
      en: "DEI Dashboard · team process",
    },
    kicker: {
      es: "Path Proceso · Ops · 4 min",
      en: "Process path · Ops · 4 min",
    },
    headline: {
      es: "Cómo trabaja el equipo.\nLuego la guía.",
      en: "How the team works.\nThen the guide.",
    },
    body: {
      es: "Demo de 4 minutos: POC de análisis en el perímetro del cliente. Muestra el tipo de tablero que un proceso Ops deja instalado.",
      en: "4-minute demo: analysis POC in the client perimeter. Shows the kind of board an Ops process leaves installed.",
    },
  },
  {
    id: "app",
    packageId: "marco",
    appGoal: true,
    durationSec: 5 * 60,
    warnSec: 60,
    iframeUrl: TRANSVIP_APP_PROTO_URL,
    poster: portfolioImages.transvip.appMobile,
    posterWebp: portfolioImages.transvip.appMobileWebp,
    caption: {
      es: "Transvip · app en uso",
      en: "Transvip · live app",
    },
    kicker: {
      es: "Path App · 5 min",
      en: "App path · 5 min",
    },
    headline: {
      es: "De la idea a la app.\nNo solo pantallas.",
      en: "From idea to the app.\nNot just screens.",
    },
    body: {
      es: "Demo de 5 minutos del prototipo App Cliente Transvip. Si el proto no carga en el recuadro, ábrelo en pestaña — el reloj sigue en Viento Norte.",
      en: "5-minute Transvip client-app prototype. If the proto will not load in the frame, open the tab — the clock still runs on Viento Norte.",
    },
  },
];

const ALIASES: Record<string, ServicePathId> = {
  diagnostic: "diagnostic",
  diagnostico: "diagnostic",
  radar: "diagnostic",
  prototype: "prototype",
  prototipo: "prototype",
  marco: "prototype",
  "x-cms": "prototype",
  xcms: "prototype",
  process: "process",
  proceso: "process",
  ops: "process",
  app: "app",
};

export function resolveServicePathId(
  raw?: string | null
): ServicePathId | undefined {
  if (!raw) return undefined;
  return ALIASES[raw.trim().toLowerCase()];
}

export function getServicePathDemo(
  id: ServicePathId
): ServicePathDemo | undefined {
  return SERVICE_PATH_DEMOS.find((d) => d.id === id);
}

export function demoMinutes(demo: Pick<ServicePathDemo, "durationSec">): number {
  return Math.max(1, Math.round(demo.durationSec / 60));
}

export function packToServicePath(
  packId: ConsultingPackageId
): ServicePathId {
  if (packId === "radar") return "diagnostic";
  if (packId === "ops") return "process";
  return "prototype";
}
