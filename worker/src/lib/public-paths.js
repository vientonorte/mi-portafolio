/**
 * Pages owns /servicios/* (canonicals). Worker must not steal them.
 * Share HTML lives under /s/* except /s/servicios (hop to canon).
 */
export function isPagesServiciosPath(path) {
  return path === "/servicios" || path.startsWith("/servicios/");
}

export function isSharePath(path) {
  if (path === "/s" || path === "/s/") return true;
  if (!path.startsWith("/s/")) return false;
  if (path === "/s/servicios" || path.startsWith("/s/servicios/")) return false;
  return true;
}
