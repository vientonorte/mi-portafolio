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
 * `#/consultoria#consultoria-demo` rompen el router y pueden fallar lazy chunks.
 * Reescribe a `#/consultoria` y guarda el scroll pendiente en sessionStorage.
 */
export function normalizeDoubleHashUrl(): void {
  const { hash, pathname, search } = window.location;
  const match = hash.match(/^#(\/[^#]+)#([a-z0-9-]+)$/i);
  if (!match) return;

  const [, route, sectionId] = match;
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