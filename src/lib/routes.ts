/** Rutas canónicas — única fuente de verdad (FO empresa Viento Norte). */
export const ROUTES = {
  /**
   * Home FO = embudo de conversión
   * (Hero → modalidades → onboarding → método → demo → #contacto + Calendar).
   */
  home: "/",

  projects: "/proyectos",
  process: "/proceso",
  processPhase: (processId: string) => `/proceso/fase/${processId}`,
  project: (projectId: string) => `/proyecto/${projectId}`,
  company: (companyId: string) => `/empresa/${companyId}`,
  contact: "/contacto",
  privacy: "/privacy",
  designSystem: "/design-system",

  /**
   * Landing SEM / paid · funnel 3 packs + OB (mismo craft que home).
   * Ads crawler: https://vientonorte.io/s/consultoria
   * Tour módulos: /consultoria/modulos/:id
   */
  consulting: "/consultoria",

  /**
   * Embudo = home. Alias canónico para CTAs internos.
   * Path legacy `/consultoria/embudo` redirige a `/`.
   */
  consultingFunnel: "/",

  /** Panel interno. No está en nav. Gate passkey. */
  admin: "/admin",

  /** Deep link a un módulo del tour SEM. */
  consultingModule: (moduleId: string) =>
    `/consultoria/modulos/${encodeURIComponent(moduleId)}`,

  /**
   * Demo X|CMS con gate de campaña (Ads / SEO / LinkedIn).
   * No abrir Figma Sites en crudo desde ads.
   */
  demoXcms: "/demo/x-cms",

  /**
   * @deprecated Legacy POC path — redirect a ROUTES.consulting (SEM).
   */
  pocProductOnboarding: "/poc/product-onboarding",

  audit: "/auditoria",
  adminPhotos: "/admin/fotos",
  /** Grafo de fricción institucional — noIndex hasta decisión de visibilidad. */
  grafo: "/grafo",
} as const;

/** Alias legacy — solo redirects 301-equivalent (HashRouter replace). */
export const LEGACY_ROUTES = {
  cases: "/cases",
  casesProcess: (processId: string) => `/cases/process/${processId}`,
  /** POC tour → SEM oferta */
  pocProductOnboarding: "/poc/product-onboarding",
  /** Embudo viejo → home */
  consultingFunnelLegacy: "/consultoria/embudo",
} as const;

export function normalizePathname(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

/** SEM offer tour (+ módulos). No incluye home embudo. */
export function isConsultingOfferPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  if (path === ROUTES.consulting) return true;
  if (path.startsWith(`${ROUTES.consulting}/modulos`)) return true;
  return false;
}

/**
 * Embudo FO: home `/` o legacy `/consultoria/embudo` (antes del redirect).
 */
export function isConsultingFunnelPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  return (
    path === ROUTES.home || path === LEGACY_ROUTES.consultingFunnelLegacy
  );
}

/**
 * Superficies de conversión FO: embudo home + SEM offer + módulos.
 * (Para nav activo / chrome.)
 */
export function isConsultingPath(pathname: string): boolean {
  return (
    isConsultingFunnelPath(pathname) || isConsultingOfferPath(pathname)
  );
}

export function isAdminPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  return path === ROUTES.admin || path.startsWith(`${ROUTES.admin}/`);
}

export function isProcessPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  return (
    path === ROUTES.process ||
    path.startsWith(`${ROUTES.process}/`) ||
    path === LEGACY_ROUTES.cases ||
    path.startsWith(`${LEGACY_ROUTES.cases}/`)
  );
}
