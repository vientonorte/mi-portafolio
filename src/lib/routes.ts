/** Rutas canónicas — única fuente de verdad (Sprint 2 IA + FO consultoría MVP). */
export const ROUTES = {
  home: '/',
  projects: '/proyectos',
  process: '/proceso',
  processPhase: (processId: string) => `/proceso/fase/${processId}`,
  project: (projectId: string) => `/proyecto/${projectId}`,
  company: (companyId: string) => `/empresa/${companyId}`,
  contact: '/contacto',
  privacy: '/privacy',
  designSystem: '/design-system',

  /**
   * Landing real de consultoría = tour de oferta módulos-producto
   * (ex-POC Apple onboarding).
   */
  consulting: '/consultoria',
  /** Embudo de conversión (Hero → onboarding → #contacto + Calendar). */
  consultingFunnel: '/consultoria/embudo',
  /** Deep link a un módulo del tour (escalable, misma página). */
  consultingModule: (moduleId: string) =>
    `/consultoria/modulos/${encodeURIComponent(moduleId)}`,

  /**
   * Demo X|CMS con gate de campaña (Ads / SEO / LinkedIn).
   * No abrir Figma Sites en crudo desde ads.
   */
  demoXcms: '/demo/x-cms',

  /**
   * @deprecated Legacy POC path — siempre redirect a ROUTES.consulting.
   * Mantener en LEGACY_ROUTES + <Navigate replace>.
   */
  pocProductOnboarding: '/poc/product-onboarding',

  audit: '/auditoria',
  adminPhotos: '/admin/fotos',
  /** Grafo de fricción institucional — noIndex hasta decisión de visibilidad. */
  grafo: '/grafo',
} as const;

/** Alias legacy — solo redirects 301-equivalent (HashRouter replace). */
export const LEGACY_ROUTES = {
  cases: '/cases',
  casesProcess: (processId: string) => `/cases/process/${processId}`,
  /** POC tour → landing consultoría */
  pocProductOnboarding: '/poc/product-onboarding',
} as const;

export function normalizePathname(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

/** Cualquier superficie bajo /consultoria (oferta, embudo, módulos). */
export function isConsultingPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  return path === ROUTES.consulting || path.startsWith(`${ROUTES.consulting}/`);
}

/** Landing oferta (tour) — no embudo. */
export function isConsultingOfferPath(pathname: string): boolean {
  const path = normalizePathname(pathname);
  if (path === ROUTES.consulting) return true;
  if (path.startsWith(`${ROUTES.consulting}/modulos`)) return true;
  return false;
}

/** Embudo de conversión. */
export function isConsultingFunnelPath(pathname: string): boolean {
  return normalizePathname(pathname) === ROUTES.consultingFunnel;
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
