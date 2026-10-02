import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  DOCK_CENTER_ID,
  NAV_SURFACE,
  executeNavAction,
  getDockNavAction,
  getDockNavItems,
  getHeaderMoreNavItems,
  getHeaderPrimaryNavItems,
  getMobileDrawerNavItems,
  getMobileMoreDividerIndex,
  matchNavItemActive,
} from "@/lib/nav-config";
import { SITE_NAV_PRIMARY_IDS } from "@/lib/site-nav";

const labels = {
  home: "Inicio",
  projects: "Negocios",
  experience: "Experiencia",
  consulting: "Consultoría ✦",
  services: "Servicios",
  news: "News",
  contact: "Contacto",
  about: "Sobre mí",
  designSystem: "Design System",
  uxtools: "UX Tools",
  more: "Más",
};

/** Todo destino visible del nav: action.target + menuHref. */
function allNavTargets(): string[] {
  const items = [
    ...getHeaderPrimaryNavItems(labels, "Proceso"),
    ...getHeaderMoreNavItems(labels, "Proceso"),
    ...getMobileDrawerNavItems(labels, "Proceso", "/"),
    ...getMobileDrawerNavItems(labels, "Proceso", "/proceso"),
    ...(["home", "deep", "funnel"] as const).flatMap((v) => getDockNavItems(v, labels, "Proceso")),
  ];
  return items.flatMap((item) => [item.action.target, item.menuHref]);
}

describe("NAV_SURFACE · nav minimal canónico (audit 2-oct P1-3)", () => {
  it("P0: dock has 3 slots with liquid consultoria in the center", () => {
    expect([...NAV_SURFACE.dock]).toEqual(["inicio", "consultoria", "contacto"]);
    expect(NAV_SURFACE.dock[1]).toBe(DOCK_CENTER_ID);
    expect(NAV_SURFACE.dock).toHaveLength(3);
  });

  it("desktop primary = Servicios · Contacto, leído de src/lib/site-nav.ts", () => {
    expect([...NAV_SURFACE.headerPrimary]).toEqual([...SITE_NAV_PRIMARY_IDS]);
    expect([...NAV_SURFACE.headerPrimary]).toEqual(["servicios", "contacto"]);
  });

  it("sin «Más» ni destinos hash: proceso, news, consultoria, sobre-mi, negocios… fuera del nav visible", () => {
    expect(NAV_SURFACE.headerMore).toEqual([]);
    expect([...NAV_SURFACE.mobileDrawer]).toEqual(["inicio", "servicios", "contacto"]);
    for (const id of ["proceso", "news", "consultoria", "sobre-mi", "negocios", "experiencia", "design-system", "auditoria"]) {
      expect(NAV_SURFACE.headerPrimary as readonly string[]).not.toContain(id);
      expect(NAV_SURFACE.headerMore as readonly string[]).not.toContain(id);
      expect(NAV_SURFACE.mobileDrawer as readonly string[]).not.toContain(id);
    }
    expect(getMobileMoreDividerIndex()).toBe(-1);
  });

  it("ningún destino del nav (header, drawer, dock) es una ruta hash /#/ ni un slug viejo", () => {
    const targets = allNavTargets();
    expect(targets.length).toBeGreaterThan(0);
    for (const t of targets) {
      expect(t, t).not.toMatch(/\/#\//);
      expect(t, t).not.toMatch(/^#\//);
      expect(t, t).not.toMatch(/diagnostico-accesibilidad-wcag|consultoria-ux-pymes/);
      expect(t, t).not.toMatch(/^\/(proceso|news|consultoria|sobre-mi|privacy|contacto)\b/);
    }
  });
});

describe("getHeaderPrimaryNavItems", () => {
  it("exposes servicios (HTTP) and contacto (#contacto) on desktop primary", () => {
    const items = getHeaderPrimaryNavItems(labels, "Proceso");
    expect(items.map((item) => item.id)).toEqual(["servicios", "contacto"]);
    expect(items.find((item) => item.id === "servicios")?.action).toEqual({
      kind: "http",
      target: "/servicios/",
    });
    expect(items.find((item) => item.id === "contacto")?.action).toEqual({
      kind: "anchor",
      target: "#contacto",
      homeRoute: "/",
    });
  });
});

describe("getHeaderMoreNavItems", () => {
  it("is empty (no «Más» menu)", () => {
    expect(getHeaderMoreNavItems(labels, "Proceso")).toEqual([]);
  });
});

describe("getMobileDrawerNavItems", () => {
  it("drawer = Inicio · Servicios · Contacto, anclas de la home también fuera de la home", () => {
    for (const pathname of ["/", "/proceso"]) {
      const items = getMobileDrawerNavItems(labels, "Proceso", pathname);
      expect(items.map((item) => item.id)).toEqual(["inicio", "servicios", "contacto"]);
      expect(items[0]!.action).toEqual({ kind: "anchor", target: "#inicio", homeRoute: "/" });
      expect(items[2]!.action).toEqual({ kind: "anchor", target: "#contacto", homeRoute: "/" });
    }
  });
});

describe("getDockNavAction", () => {
  it("uses home anchors for inicio/contacto on every variant (no /#/contacto)", () => {
    for (const v of ["home", "deep", "funnel"] as const) {
      expect(getDockNavAction("contacto", v)).toEqual({ kind: "anchor", target: "#contacto", homeRoute: "/" });
      expect(getDockNavAction("inicio", v)).toEqual({ kind: "anchor", target: "#inicio", homeRoute: "/" });
    }
  });

  it("deep: consultoria goes to canonical /servicios/#consultoria-ux, not /#/consultoria", () => {
    expect(DOCK_CENTER_ID).toBe("consultoria");
    expect(getDockNavAction("consultoria", "deep")).toEqual({
      kind: "http",
      target: "/servicios/#consultoria-ux",
    });
  });

  it("funnel (home): liquid center is Calendar or #contacto", () => {
    const center = getDockNavAction("consultoria", "funnel");
    expect(center.kind === "external" || center.target === "#contacto").toBe(true);
  });
});

describe("getDockNavItems", () => {
  it("places consultoria as center CTA between inicio and contacto", () => {
    const ids = getDockNavItems("home", labels, "Proceso").map((item) => item.id);
    expect(ids).toEqual(["inicio", "consultoria", "contacto"]);
    expect(ids[1]).toBe(DOCK_CENTER_ID);
  });

  it("funnel dock keeps 3 slots with Calendar or contact on center", () => {
    const items = getDockNavItems("funnel", labels, "Proceso");
    expect(items.map((i) => i.id)).toEqual(["inicio", "consultoria", "contacto"]);
    const center = items[1]!.action;
    expect(center.kind === "external" || center.target === "#contacto").toBe(true);
  });
});

describe("matchNavItemActive", () => {
  it("marks servicios active on /servicios paths only", () => {
    const servicios = getHeaderPrimaryNavItems(labels, "Proceso")[0]!;
    expect(servicios.id).toBe("servicios");
    expect(matchNavItemActive(servicios, "/servicios")).toBe(true);
    expect(matchNavItemActive(servicios, "/")).toBe(false);
  });

  it("detects home Inicio vs Contacto by section spy", () => {
    const dockHome = getDockNavItems("home", labels, "Proceso");
    const inicio = dockHome.find((i) => i.id === "inicio")!;
    const contacto = dockHome.find((i) => i.id === "contacto")!;

    expect(
      matchNavItemActive(inicio, "/", { isOnHome: true, homeSection: "inicio" })
    ).toBe(true);
    expect(
      matchNavItemActive(contacto, "/", { isOnHome: true, homeSection: "inicio" })
    ).toBe(false);
    expect(
      matchNavItemActive(inicio, "/", { isOnHome: true, homeSection: "contacto" })
    ).toBe(false);
    expect(
      matchNavItemActive(contacto, "/", {
        isOnHome: true,
        homeSection: "contacto",
      })
    ).toBe(true);
  });

  it("deep: center CTA is HTTP /servicios/#consultoria-ux; still active on consulting paths", () => {
    const dockDeep = getDockNavItems("deep", labels, "Proceso");
    const consultoria = dockDeep.find((i) => i.id === "consultoria")!;
    const inicio = dockDeep.find((i) => i.id === "inicio")!;

    expect(consultoria.action).toEqual({ kind: "http", target: "/servicios/#consultoria-ux" });
    expect(matchNavItemActive(consultoria, "/consultoria")).toBe(true);
    expect(matchNavItemActive(consultoria, "/")).toBe(false);
    expect(matchNavItemActive(inicio, "/consultoria")).toBe(false);
  });
});

describe("executeNavAction · GTM nav_click", () => {
  beforeEach(() => {
    (window as Window & { dataLayer?: unknown[] }).dataLayer = [];
  });

  it("pushes nav_click before navigating (Servicios = HTTP, no hash route)", () => {
    const item = getHeaderPrimaryNavItems(labels, "Proceso")[1]!;
    expect(item.id).toBe("contacto");
    const navigate = vi.fn();
    executeNavAction(item, {
      pathname: "/proceso",
      navigate,
      pendingScrollRef: { current: null },
    });
    const layer = (window as Window & { dataLayer: unknown[] }).dataLayer;
    expect(layer).toContainEqual(
      expect.objectContaining({
        event: "nav_click",
        nav_id: "contacto",
        nav_kind: "anchor",
        nav_target: "#contacto",
      })
    );
    // Fuera de la home: vuelve a la home y luego scrollea a #contacto
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
