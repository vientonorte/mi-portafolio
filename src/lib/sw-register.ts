/**
 * Registro del service worker (solo build de producción).
 *
 * P0 S42: en la primera visita el SW nuevo hace `clients.claim()` y dispara
 * `controllerchange`. Antes recargábamos siempre en ese evento, lo que producía
 * una segunda carga del documento (y un page_view GA4 con dr = el propio sitio).
 *
 * Regla: solo recargamos si ya había un SW controlando la página ANTES de
 * llamar a `register()` (es decir, una actualización real del SW para un
 * visitante que vuelve). En la primera instalación/claim nunca recargamos.
 */

export const SW_RELOAD_KEY = "vn-sw-controller-reload";

type SwContainer = Pick<ServiceWorkerContainer, "controller" | "register" | "addEventListener">;

export interface RegisterServiceWorkerOptions {
  container: SwContainer;
  swUrl: string;
  scope: string;
  /** Inyectable para tests; por defecto `window.location.reload()`. */
  reload?: () => void;
  /** Inyectable para tests; por defecto `window.sessionStorage`. */
  storage?: Pick<Storage, "getItem" | "setItem"> | null;
}

export interface RegisterServiceWorkerResult {
  /** true si había un controlador antes de `register()` (visitante que vuelve). */
  hadControllerAtStart: boolean;
  registration: Promise<ServiceWorkerRegistration | undefined>;
}

/** Decide si un `controllerchange` debe recargar la página. */
export function shouldReloadOnControllerChange(hadControllerAtStart: boolean): boolean {
  return hadControllerAtStart;
}

export function registerServiceWorker({
  container,
  swUrl,
  scope,
  reload = () => window.location.reload(),
  storage = typeof sessionStorage === "undefined" ? null : sessionStorage,
}: RegisterServiceWorkerOptions): RegisterServiceWorkerResult {
  // Capturar ANTES de register(): en la primera visita es null.
  const hadControllerAtStart = Boolean(container.controller);

  container.addEventListener("controllerchange", () => {
    if (!shouldReloadOnControllerChange(hadControllerAtStart)) return;
    // Guardia anti-bucle: como mucho una recarga por pestaña/sesión.
    try {
      if (!storage || storage.getItem(SW_RELOAD_KEY)) return;
      storage.setItem(SW_RELOAD_KEY, "1");
    } catch {
      return;
    }
    reload();
  });

  const registration = container
    .register(swUrl, { scope })
    .then((reg) => {
      reg.addEventListener("updatefound", () => {
        const worker = reg.installing;
        worker?.addEventListener("statechange", () => {
          if (worker.state === "activated") {
            worker.postMessage({ type: "SKIP_WAITING" });
          }
        });
      });
      return reg;
    })
    .catch(() => {
      /* SW opcional — el sitio funciona sin él */
      return undefined;
    });

  return { hadControllerAtStart, registration };
}
