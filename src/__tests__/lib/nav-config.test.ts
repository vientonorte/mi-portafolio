import { describe, expect, it } from "vitest";
import {
  DOCK_CENTER_ID,
  NAV_SURFACE,
  getDockNavAction,
  getDockNavItems,
  getHeaderMoreNavItems,
  getHeaderPrimaryNavItems,
  getMobileDrawerNavItems,
  getMobileMoreDividerIndex,
  matchNavItemActive,
} from "@/lib/nav-config";

const labels = {
  home: "Inicio",
  projects: "Negocios",
  experience: "Experiencia",
  consulting: "Consultoría ✦",
  audit: "Auditoría UX",
  contact: "Contacto",
  about: "Sobre mí",
  designSystem: "Design System",
  uxtools: "UX Tools",
  more: "Más",
};

describe("NAV_SURFACE", () => {
  it("P0: dock has 3 slots with liquid consultoria in the center", () => {
    expect([...NAV_SURFACE.dock]).toEqual(["inicio", "consultoria", "contacto"]);
    expect(NAV_SURFACE.dock[1]).toBe(DOCK_CENTER_ID);
    expect(NAV_SURFACE.dock).toHaveLength(3);
  });

  it("P0: desktop primary is FO-safe (proceso + contacto, no Negocios)", () => {
    expect([...NAV_SURFACE.headerPrimary]).toEqual(["proceso", "contacto"]);
    expect(NAV_SURFACE.headerPrimary).toHaveLength(2);
    expect(NAV_SURFACE.headerPrimary).not.toContain("negocios");
  });

  it("moves portfolio destinations into Más while drawer keeps full catalog", () => {
    for (const id of ["experiencia", "consultoria", "negocios"] as const) {
      expect(NAV_SURFACE.headerMore).toContain(id);
      expect(NAV_SURFACE.headerPrimary).not.toContain(id);
    }
    expect(NAV_SURFACE.mobileDrawer).toContain("negocios");
    expect(NAV_SURFACE.mobileDrawer).toContain("auditoria");
  });

  it("places mobile more divider at sobre-mi", () => {
    expect(getMobileMoreDividerIndex()).toBe(NAV_SURFACE.mobileDrawer.indexOf("sobre-mi"));
  });
});

describe("getHeaderPrimaryNavItems", () => {
  it("exposes proceso and contacto on desktop primary", () => {
    const items = getHeaderPrimaryNavItems(labels, "Proceso");
    expect(items.map((item) => item.id)).toEqual(["proceso", "contacto"]);
  });
});

describe("getHeaderMoreNavItems", () => {
  it("includes negocios under Más (portfolio secondary)", () => {
    const ids = getHeaderMoreNavItems(labels, "Proceso").map((item) => item.id);
    expect(ids).toEqual([
      "negocios",
      "experiencia",
      "consultoria",
      "sobre-mi",
      "auditoria",
      "design-system",
      "uxtools",
    ]);
  });
});

describe("getMobileDrawerNavItems", () => {
  it("follows hero-aligned order before more section", () => {
    const items = getMobileDrawerNavItems(labels, "Proceso");
    expect(items.slice(0, 7).map((item) => item.id)).toEqual([
      "inicio",
      "negocios",
      "experiencia",
      "consultoria",
      "auditoria",
      "proceso",
      "contacto",
    ]);
  });
});

describe("getDockNavAction", () => {
  it("uses anchor contact on home and route on deep pages", () => {
    expect(getDockNavAction("contacto", "home").kind).toBe("anchor");
    expect(getDockNavAction("contacto", "deep").kind).toBe("contact");
  });

  it("routes consultoria from the liquid center slot to FO home (embudo)", () => {
    expect(DOCK_CENTER_ID).toBe("consultoria");
    expect(getDockNavAction("consultoria", "deep")).toEqual({
      kind: "route",
      target: "/",
    });
  });

  it("funnel (home): liquid center scrolls to kickoff; inicio/contacto anchors", () => {
    expect(getDockNavAction("consultoria", "funnel")).toEqual({
      kind: "anchor",
      target: "#consultoria-onboarding",
      homeRoute: "/",
    });
    expect(getDockNavAction("inicio", "funnel")).toEqual({
      kind: "anchor",
      target: "#inicio",
      homeRoute: "/",
    });
    expect(getDockNavAction("contacto", "funnel")).toEqual({
      kind: "anchor",
      target: "#contacto",
      homeRoute: "/",
    });
  });
});

describe("getDockNavItems", () => {
  it("places consultoria as center CTA between inicio and contacto", () => {
    const ids = getDockNavItems("home", labels, "Proceso").map((item) => item.id);
    expect(ids).toEqual(["inicio", "consultoria", "contacto"]);
    expect(ids[1]).toBe(DOCK_CENTER_ID);
  });

  it("funnel dock keeps 3 slots with kickoff action on center", () => {
    const items = getDockNavItems("funnel", labels, "Proceso");
    expect(items.map((i) => i.id)).toEqual(["inicio", "consultoria", "contacto"]);
    expect(items[1]!.action).toEqual({
      kind: "anchor",
      target: "#consultoria-onboarding",
      homeRoute: "/",
    });
  });
});

describe("matchNavItemActive", () => {
  it("marks proceso active on process routes; negocios only in Más", () => {
    const proceso = getHeaderPrimaryNavItems(labels, "Proceso")[0]!;
    expect(proceso.id).toBe("proceso");
    expect(matchNavItemActive(proceso, "/proceso")).toBe(true);
    expect(matchNavItemActive(proceso, "/proceso/fase/ux-research")).toBe(true);
    expect(matchNavItemActive(proceso, "/")).toBe(false);

    const negocios = getHeaderMoreNavItems(labels, "Proceso").find(
      (i) => i.id === "negocios"
    )!;
    expect(matchNavItemActive(negocios, "/proyectos")).toBe(true);
    expect(matchNavItemActive(negocios, "/proyecto/sura")).toBe(true);
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

  it("deep: center CTA routes to home embudo; SEM not dock-active", () => {
    const dockDeep = getDockNavItems("deep", labels, "Proceso");
    const consultoria = dockDeep.find((i) => i.id === "consultoria")!;
    const inicio = dockDeep.find((i) => i.id === "inicio")!;

    expect(consultoria.action).toEqual({ kind: "route", target: "/" });
    // SEM fullscreen: no dock “activo” por ruta oferta
    expect(matchNavItemActive(consultoria, "/consultoria")).toBe(true);
    expect(matchNavItemActive(consultoria, "/consultoria/modulos/dashboard")).toBe(
      true
    );
    expect(matchNavItemActive(consultoria, "/")).toBe(false);
    expect(matchNavItemActive(inicio, "/consultoria")).toBe(false);
  });
});
