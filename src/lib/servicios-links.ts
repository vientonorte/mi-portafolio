/**
 * Enlaces desde la home (HashRouter) hacia la página orgánica /servicios/.
 *
 * Siempre URLs HTTP reales construidas desde la base de Vite ("/" en prod,
 * "/qa/" en QA). Nunca rutas hash (`/#/…`) ni `/s/…`, y nunca `<Link>` de
 * react-router: un `#ancla` suelto en la home lo leería HashRouter como ruta.
 */
export function serviciosHref(fragment?: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const root = `${base.endsWith("/") ? base : `${base}/`}servicios/`;
  if (!fragment) return root;
  return `${root}#${fragment.replace(/^#/, "")}`;
}
