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
};

export const SERVICE_ORIGIN = landingsFile.origin as string;
export const SERVICE_LASTMOD = landingsFile.lastmod as string;
export const SERVICE_LANDINGS = landingsFile.landings as ServiceLanding[];
export const SERVICE_SKIP_CLUSTERS = landingsFile.skipClusters;

export function serviceCanonical(path: string): string {
  return `${SERVICE_ORIGIN}${path}`;
}

export function sitemapServiceLocs(): string[] {
  return SERVICE_LANDINGS.filter((l) => l.inSitemap && l.index).map((l) =>
    serviceCanonical(l.path)
  );
}
