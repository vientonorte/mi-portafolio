/** API del Worker de admin (mismo host que contacto, rutas /api/admin/*) */
export const ADMIN_API_BASE =
  import.meta.env.VITE_ADMIN_API_URL ??
  "https://contact.vientonorte.io";

export const ADMIN_GITHUB_USER = "vientonorte";

export const ADMIN_ROUTES = {
  githubStart: `${ADMIN_API_BASE}/api/admin/auth/github`,
  bootstrap: `${ADMIN_API_BASE}/api/admin/auth/bootstrap`,
  passkeyRegisterBegin: `${ADMIN_API_BASE}/api/admin/auth/passkey/register/begin`,
  passkeyRegisterFinish: `${ADMIN_API_BASE}/api/admin/auth/passkey/register/finish`,
  passkeyLoginBegin: `${ADMIN_API_BASE}/api/admin/auth/passkey/login/begin`,
  passkeyLoginFinish: `${ADMIN_API_BASE}/api/admin/auth/passkey/login/finish`,
  session: `${ADMIN_API_BASE}/api/admin/auth/session`,
  logout: `${ADMIN_API_BASE}/api/admin/auth/logout`,
  images: `${ADMIN_API_BASE}/api/admin/images`,
  manifest: `${ADMIN_API_BASE}/api/images/manifest`,
  overview: `${ADMIN_API_BASE}/api/admin/overview`,
  leads: `${ADMIN_API_BASE}/api/admin/leads`,
  bookings: `${ADMIN_API_BASE}/api/admin/bookings`,
  diagnosticos: `${ADMIN_API_BASE}/api/admin/diagnosticos`,
  services: `${ADMIN_API_BASE}/api/admin/services`,
  cases: `${ADMIN_API_BASE}/api/admin/cases`,
  demoHeat: `${ADMIN_API_BASE}/api/admin/demo/heat`,
  health: `${ADMIN_API_BASE}/api/health`,
} as const;