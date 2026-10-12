import { describe, expect, it, vi } from "vitest";
import {
  SW_RELOAD_KEY,
  registerServiceWorker,
  shouldReloadOnControllerChange,
} from "../../lib/sw-register";

/** ServiceWorkerContainer mínimo: controller + register + controllerchange. */
function fakeContainer(controller: object | null) {
  const listeners: Record<string, Array<() => void>> = {};
  const registration = { addEventListener: vi.fn(), installing: null };
  const container = {
    controller: controller as ServiceWorker | null,
    register: vi.fn(() => Promise.resolve(registration as unknown as ServiceWorkerRegistration)),
    addEventListener: vi.fn((type: string, cb: () => void) => {
      (listeners[type] ??= []).push(cb);
    }),
  };
  const fire = (type: string) => listeners[type]?.forEach((cb) => cb());
  return { container, fire, registration };
}

function memoryStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
  };
}

describe("shouldReloadOnControllerChange", () => {
  it("reloads only when a controller existed before register()", () => {
    expect(shouldReloadOnControllerChange(false)).toBe(false);
    expect(shouldReloadOnControllerChange(true)).toBe(true);
  });
});

describe("registerServiceWorker — P0 S42 doble carga", () => {
  it("first visit (no controller before register): install + claim never reloads", async () => {
    const { container, fire } = fakeContainer(null);
    const reload = vi.fn();
    const storage = memoryStorage();
    const res = registerServiceWorker({ container, swUrl: "/sw.js", scope: "/", reload, storage });
    expect(res.hadControllerAtStart).toBe(false);
    await res.registration;
    // El SW nuevo hace clients.claim() → controllerchange
    container.controller = {} as ServiceWorker;
    fire("controllerchange");
    expect(reload).not.toHaveBeenCalled();
    expect(storage.getItem(SW_RELOAD_KEY)).toBeNull();
  });

  it("returning visitor (controller before register): SW update reloads once", async () => {
    const { container, fire } = fakeContainer({});
    const reload = vi.fn();
    const storage = memoryStorage();
    const res = registerServiceWorker({ container, swUrl: "/sw.js", scope: "/", reload, storage });
    expect(res.hadControllerAtStart).toBe(true);
    await res.registration;
    fire("controllerchange");
    expect(reload).toHaveBeenCalledTimes(1);
    // Guardia anti-bucle por sesión
    fire("controllerchange");
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("captures the controller BEFORE calling register()", () => {
    const { container } = fakeContainer(null);
    const order: string[] = [];
    let controller: object | null = null;
    Object.defineProperty(container, "controller", {
      get: () => {
        order.push("controller");
        return controller;
      },
    });
    container.register.mockImplementation(() => {
      order.push("register");
      controller = {}; // p. ej. claim inmediato
      return Promise.resolve({ addEventListener: vi.fn() } as unknown as ServiceWorkerRegistration);
    });
    const res = registerServiceWorker({ container, swUrl: "/sw.js", scope: "/", reload: vi.fn(), storage: memoryStorage() });
    expect(order[0]).toBe("controller");
    expect(order).toContain("register");
    expect(res.hadControllerAtStart).toBe(false);
  });

  it("registers sw.js with the Vite base scope", async () => {
    const { container } = fakeContainer(null);
    await registerServiceWorker({ container, swUrl: "/qa/sw.js", scope: "/qa/", reload: vi.fn(), storage: memoryStorage() }).registration;
    expect(container.register).toHaveBeenCalledWith("/qa/sw.js", { scope: "/qa/" });
  });

  it("no reload if sessionStorage is unavailable (blocked storage)", () => {
    const { container, fire } = fakeContainer({});
    const reload = vi.fn();
    const storage = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => undefined,
    };
    registerServiceWorker({ container, swUrl: "/sw.js", scope: "/", reload, storage });
    fire("controllerchange");
    expect(reload).not.toHaveBeenCalled();
  });

  it("register() rejection is swallowed (SW optional)", async () => {
    const { container } = fakeContainer(null);
    container.register.mockImplementation(() => Promise.reject(new Error("insecure")));
    const res = registerServiceWorker({ container, swUrl: "/sw.js", scope: "/", reload: vi.fn(), storage: memoryStorage() });
    await expect(res.registration).resolves.toBeUndefined();
  });
});
