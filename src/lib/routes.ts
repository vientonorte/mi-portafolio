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
  /** Newsletter SEO (crawler `/s/news/`, SPA `/#/news`). */
  news: "/news",
  newsEdition: (slug: string) => `/news/${encodeURIComponent(slug)}`,
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
  /** Roadmap interno (misma sesión admin). */
  adminRoadmap: "/admin/roadmap",

  /** Deep link a un módulo del tour SEM. */
  consultingModule: (moduleId: string) =>
    `/consultoria/modulos/${encodeURIComponent(moduleId)}`,

  /**
   * Demo X|CMS con gate de campaña (Ads / SEO / LinkedIn).
   * No abrir Figma Sites en crudo desde ads.
   * Alias de `/demo/prototype`.
   */
  demoXcms: "/demo/x-cms",

  /**
   * Demo con reloj por path de servicio.
   * `diagnostic` | `prototype` | `process` | `app` (+ alias radar/marco/ops).
   */
  serviceDemo: (pathId: string) =>
    `/demo/${encodeURIComponent(pathId)}`,

  /**
   * @deprecated Legacy POC prefix — HTTP `/poc` y hash `/#/poc/*`.
   * `/poc#/auditoria` NO es freemium. Redirect a ROUTES.consulting.
   */
  pocRoot: "/poc",

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
  /** HTTP /poc y /poc#/auditoria → SEM (no mentoría) */
  pocRoot: "/poc",
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

/** Tour fullscreen de módulos — sin dock/header. `/consultoria` landing SÍ lleva dock. */
export function isConsultingModuleTourPath(pathname: string): boolean {
  return normalizePathname(pathname).startsWith(`${ROUTES.consulting}/modulos`);
}

/** Demo con reloj: chrome propio, sin dock ni toolbar del sitio. */
export function isTimedDemoPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  return path === ROUTES.demoXcms || path.startsWith("/demo/");
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

/** Prefijo POC deprecado (`/poc`, `/poc/product-onboarding`, `/poc#/auditoria`). */
export function isDeprecatedPocPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  return path === "/poc" || path.startsWith("/poc/");
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
