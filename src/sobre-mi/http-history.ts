import { UNSAFE_createMemoryHistory, type To } from "react-router";

/** La ficha HTTP se queda en su path. El resto de la SPA sigue en el hash del apex. */
export function fichaHttpStays(fichaPath: string, to: To): boolean {
  const path = pathOf(to);
  if (path == null) return true;
  const norm = path.replace(/\/+$/, "") || "/";
  const ficha = fichaPath.replace(/\/+$/, "") || "/";
  return norm === ficha;
}

export function sobreMiHttpStays(to: To): boolean {
  return fichaHttpStays("/sobre-mi", to);
}

function pathOf(to: To): string | null {
  if (typeof to === "string") {
    if (to.startsWith("#")) return null;
    const path = to.split("?")[0].split("#")[0];
    return path || "/";
  }
  if (!to.pathname) return null;
  return to.pathname;
}

function spaHref(to: To): string {
  const base = import.meta.env.BASE_URL || "/";
  const root = base.endsWith("/") ? base : `${base}/`;
  if (typeof to === "string") {
    if (to === "/" || to === "") return root;
    const path = to.startsWith("/") ? to : `/${to}`;
    return `${root}#${path}`;
  }
  const path = to.pathname || "/";
  const search = to.search || "";
  const hash = to.hash || "";
  if ((path.replace(/\/+$/, "") || "/") === "/") return `${root}${search}${hash}`;
  return `${root}#${path}${search}${hash}`;
}

/** History de una ficha HTTP. El primer paint es esa ruta, sin reescribir la barra a /#/… */
export function createFichaHttpHistory(fichaPath: string) {
  const ficha = fichaPath.replace(/\/+$/, "") || "/";
  const memory = UNSAFE_createMemoryHistory({
    initialEntries: [ficha],
    v5Compat: true,
  });
  const leave = (to: To): boolean => {
    if (fichaHttpStays(ficha, to)) return false;
    if (typeof window === "undefined") return false;
    window.location.assign(spaHref(to));
    return true;
  };
  return {
    get action() {
      return memory.action;
    },
    get location() {
      return memory.location;
    },
    createHref: (to: To) => memory.createHref(to),
    createURL: (to: To) => memory.createURL(to),
    encodeLocation: (to: To) => memory.encodeLocation(to),
    listen: (fn: Parameters<typeof memory.listen>[0]) => memory.listen(fn),
    go: (delta: number) => memory.go(delta),
    push: (to: To, state?: unknown) => {
      if (leave(to)) return;
      memory.push(to, state);
    },
    replace: (to: To, state?: unknown) => {
      if (leave(to)) return;
      memory.replace(to, state);
    },
  };
}

export function createSobreMiHttpHistory() {
  return createFichaHttpHistory("/sobre-mi");
}
