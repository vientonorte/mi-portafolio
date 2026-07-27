/** Rutas canónicas — única fuente de verdad (Sprint 2 IA). */
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
  consulting: '/consultoria',
  /** POC onboarding producto estilo Apple — no embudo prod */
  pocProductOnboarding: '/poc/product-onboarding',
  audit: '/auditoria',
  adminPhotos: '/admin/fotos',
  /** Grafo de fricción institucional — mantenido con noIndex hasta nueva decisión de visibilidad. */
  grafo: '/grafo',
} as const;

/** Alias legacy — solo redirects 301-equivalent (HashRouter replace). */
export const LEGACY_ROUTES = {
  cases: '/cases',
  casesProcess: (processId: string) => `/cases/process/${processId}`,
} as const;

export function isProcessPath(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, '') || '/';
  return (
    path === ROUTES.process ||
    path.startsWith(`${ROUTES.process}/`) ||
    path === LEGACY_ROUTES.cases ||
    path.startsWith(`${LEGACY_ROUTES.cases}/`)
  );
}