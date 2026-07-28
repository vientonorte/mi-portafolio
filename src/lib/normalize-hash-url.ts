const PENDING_SCROLL_KEY = "rg-pending-section-scroll";

interface PendingSectionScroll {
  route: string;
  sectionId: string;
}

function normalizePath(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

/**
 * HashRouter solo admite un `#` en la URL. Enlaces como
 * `#/consultoria/embudo#consultoria-demo` rompen el router y pueden fallar lazy chunks.
 * Reescribe a un solo hash y guarda el scroll pendiente en sessionStorage.
 *
 * Secciones del embudo (modalidades, onboarding, contacto, demos) viven en
 * `/consultoria/embudo` — si alguien enlaza `/consultoria#…` se reescribe al embudo.
 */
const EMBUDO_SECTION_IDS = new Set([
  "modalidades",
  "consultoria-onboarding",
  "metodo-n2n",
  "partner-educacion",
  "consultoria-demo",
  "contacto",
  "arbol",
  "valor",
]);

export function normalizeDoubleHashUrl(): void {
  const { hash, pathname, search } = window.location;
  const match = hash.match(/^#(\/[^#]+)#([a-z0-9-]+)$/i);
  if (!match) return;

  const [, rawRoute, sectionId] = match;
  // Oferta tour no tiene anclas de embudo — redirigir path
  let route = rawRoute;
  if (
    (route === "/consultoria" || route === "/consultoria/") &&
    EMBUDO_SECTION_IDS.has(sectionId)
  ) {
    route = "/consultoria/embudo";
  }
  try {
    sessionStorage.setItem(
      PENDING_SCROLL_KEY,
      JSON.stringify({ route, sectionId } satisfies PendingSectionScroll)
    );
  } catch {
    /* sessionStorage bloqueado */
  }

  window.history.replaceState(null, "", `${pathname}${search}#${route}`);
}

/** Lee y limpia scroll pendiente cuando la ruta actual coincide. */
export function consumePendingSectionScroll(currentPathname: string): string | undefined {
  try {
    const raw = sessionStorage.getItem(PENDING_SCROLL_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw) as PendingSectionScroll;
    if (normalizePath(currentPathname) !== normalizePath(parsed.route)) {
      return undefined;
    }

    sessionStorage.removeItem(PENDING_SCROLL_KEY);
    return parsed.sectionId;
  } catch {
    return undefined;
  }
}