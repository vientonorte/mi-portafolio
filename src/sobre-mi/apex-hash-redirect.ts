/**
 * En ro.vientonorte.io la ficha HTTP no monta el HashRouter.
 * Un hash #/empresa/… o #/proyecto/… tiene que ir al apex, no quedarse en ro.
 * Localhost, /qa/ y vientonorte.io no se reescriben a producción.
 */

export const APEX_ORIGIN = "https://vientonorte.io";
export const RO_SOBRE_MI_HOST = "ro.vientonorte.io";

function hashPathAndRest(hash: string): { path: string; rest: string } | null {
  let raw = hash.trim();
  if (!raw) return null;
  if (raw.startsWith("#")) raw = raw.slice(1);
  if (!raw.startsWith("/")) raw = `/${raw}`;
  const q = raw.search(/[?#]/);
  const path = (q === -1 ? raw : raw.slice(0, q)).replace(/\/+$/, "") || "/";
  const rest = q === -1 ? "" : raw.slice(q);
  return { path, rest };
}

function isEmpresaOrProyectoPath(path: string): boolean {
  return (
    path === "/empresa" ||
    path === "/proyecto" ||
    path.startsWith("/empresa/") ||
    path.startsWith("/proyecto/")
  );
}

/** Hash o path de /empresa o /proyecto (con o sin #, con o sin trailing slash). */
export function isEmpresaOrProyectoHash(hash: string): boolean {
  const parsed = hashPathAndRest(hash);
  return parsed != null && isEmpresaOrProyectoPath(parsed.path);
}

/** URL del apex, o null si no corresponde redirigir (otro host u otro hash). */
export function apexHashRedirectUrl(hash: string, hostname: string): string | null {
  if (hostname !== RO_SOBRE_MI_HOST) return null;
  const parsed = hashPathAndRest(hash);
  if (!parsed || !isEmpresaOrProyectoPath(parsed.path)) return null;
  return `${APEX_ORIGIN}/#${parsed.path}${parsed.rest}`;
}
