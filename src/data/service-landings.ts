import landingsFile from "./service-landings.json";

export type ServiceLanding = {
  id: string;
  slug: string;
  path: string;
  cluster: string | null;
  title: string;
  h1: string;
  description: string;
  priority: number;
  inSitemap: boolean;
  index: boolean;
  serviceType: string[];
  hopTo?: string;
  /**
   * Destino de los links hacia esta landing cuando `path` ya es solo una página de redirección
   * (#279): /servicios/diagnostico-accesibilidad-wcag/ → /servicios/#revision-gratis y
   * /servicios/consultoria-ux-pymes/ → /servicios/#consultoria-ux. `path` sigue siendo la URL de
   * la página (la usan generate-service-landings.py y legacy-redirects para el stub).
   */
  linkTo?: string;
  kicker?: string;
  packs?: boolean;
  checklist?: boolean;
  poc?: boolean;
  pains?: { h: string; p: string }[];
};

export const SERVICE_ORIGIN = landingsFile.origin as string;
export const SERVICE_LASTMOD = landingsFile.lastmod as string;
export const SERVICE_LANDINGS = landingsFile.landings as ServiceLanding[];
export const SERVICE_SKIP_CLUSTERS = landingsFile.skipClusters;

/** href para enlazar una landing: nunca el slug viejo de redirección. */
export function serviceLandingHref(landing: Pick<ServiceLanding, "path" | "linkTo">): string {
  return landing.linkTo ?? landing.path;
}

export function serviceCanonical(path: string): string {
  return `${SERVICE_ORIGIN}${path}`;
}

export function sitemapServiceLocs(): string[] {
  return SERVICE_LANDINGS.filter((l) => l.inSitemap && l.index).map((l) =>
    serviceCanonical(l.path)
  );
}
