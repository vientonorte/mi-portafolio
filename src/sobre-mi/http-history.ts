import { UNSAFE_createMemoryHistory, type To } from "react-router";

/** La ficha HTTP se queda en /sobre-mi. El resto de la SPA sigue en el hash del apex. */
export function sobreMiHttpStays(to: To): boolean {
  const path = pathOf(to);
  if (path == null) return true;
  const norm = path.replace(/\/+$/, "") || "/";
  return norm === "/sobre-mi";
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

function leave(to: To): boolean {
  if (sobreMiHttpStays(to)) return false;
  if (typeof window === "undefined") return false;
  window.location.assign(spaHref(to));
  return true;
}

/** History de la ficha. El primer paint es /sobre-mi, sin reescribir la barra a /#/sobre-mi. */
export function createSobreMiHttpHistory() {
  const memory = UNSAFE_createMemoryHistory({
    initialEntries: ["/sobre-mi"],
    v5Compat: true,
  });
  return {
    get action() {
      return memory.action;
    },
    get location() {
      return memory.location;
    },
    createHref: (to) => memory.createHref(to),
    createURL: (to) => memory.createURL(to),
    encodeLocation: (to) => memory.encodeLocation(to),
    listen: (fn) => memory.listen(fn),
    go: (delta) => memory.go(delta),
    push: (to, state) => {
      if (leave(to)) return;
      memory.push(to, state);
    },
    replace: (to, state) => {
      if (leave(to)) return;
      memory.replace(to, state);
    },
  };
}
