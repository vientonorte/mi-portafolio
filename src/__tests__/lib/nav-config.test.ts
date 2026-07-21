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

  it("P0: desktop primary nav is 2 destinations (work + close)", () => {
    expect([...NAV_SURFACE.headerPrimary]).toEqual(["negocios", "contacto"]);
    expect(NAV_SURFACE.headerPrimary).toHaveLength(2);
  });

  it("moves secondary destinations into Más while drawer keeps full catalog", () => {
    for (const id of ["experiencia", "consultoria", "proceso"] as const) {
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
  it("exposes only negocios and contacto on desktop primary", () => {
    const items = getHeaderPrimaryNavItems(labels, "Proceso");
    expect(items.map((item) => item.id)).toEqual(["negocios", "contacto"]);
  });
});

describe("getHeaderMoreNavItems", () => {
  it("includes former primary destinations under Más", () => {
    const ids = getHeaderMoreNavItems(labels, "Proceso").map((item) => item.id);
    expect(ids).toEqual([
      "experiencia",
      "consultoria",
      "proceso",
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

  it("routes consultoria from the liquid center slot", () => {
    expect(DOCK_CENTER_ID).toBe("consultoria");
    expect(getDockNavAction("consultoria", "home")).toEqual({
      kind: "route",
      target: "/consultoria",
    });
  });
});

describe("getDockNavItems", () => {
  it("places consultoria as center CTA between inicio and contacto", () => {
    const ids = getDockNavItems("home", labels, "Proceso").map((item) => item.id);
    expect(ids).toEqual(["inicio", "consultoria", "contacto"]);
    expect(ids[1]).toBe(DOCK_CENTER_ID);
  });
});

describe("matchNavItemActive", () => {
  it("marks negocios active across project routes", () => {
    const negocios = getHeaderPrimaryNavItems(labels, "Proceso")[0]!;
    expect(matchNavItemActive(negocios, "/proyectos")).toBe(true);
    expect(matchNavItemActive(negocios, "/proyecto/sura")).toBe(true);
    expect(matchNavItemActive(negocios, "/")).toBe(false);
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

  it("detects deep routes for consultoria from dock", () => {
    const dockDeep = getDockNavItems("deep", labels, "Proceso");
    const consultoria = dockDeep.find((i) => i.id === "consultoria")!;
    const inicio = dockDeep.find((i) => i.id === "inicio")!;

    expect(matchNavItemActive(consultoria, "/consultoria")).toBe(true);
    expect(matchNavItemActive(inicio, "/consultoria")).toBe(false);
    expect(matchNavItemActive(consultoria, "/")).toBe(false);
  });
});
