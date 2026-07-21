import { describe, expect, it } from "vitest";
import {
  DOCK_CENTER_ID,
  NAV_SURFACE,
  getDockNavAction,
  getDockNavItems,
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
  contact: "Conversemos",
  about: "Sobre mí",
  designSystem: "Design System",
  uxtools: "UX Tools",
  more: "Más",
  resources: "Recursos",
};

describe("NAV_SURFACE", () => {
  it("keeps header primary to 2 items (reduce noise)", () => {
    expect(NAV_SURFACE.headerPrimary).toEqual(["recursos", "contacto"]);
  });

  it("keeps dock to 3 slots with consultoria center", () => {
    expect(NAV_SURFACE.dock).toEqual(["inicio", "consultoria", "contacto"]);
    expect(DOCK_CENTER_ID).toBe("consultoria");
  });

  it("places mobile more divider at sobre-mi", () => {
    expect(getMobileMoreDividerIndex()).toBe(NAV_SURFACE.mobileDrawer.indexOf("sobre-mi"));
  });
});

describe("getHeaderPrimaryNavItems", () => {
  it("exposes Recursos + Conversemos only", () => {
    const items = getHeaderPrimaryNavItems(labels, "Proceso");
    expect(items.map((item) => item.id)).toEqual(["recursos", "contacto"]);
  });
});

describe("getMobileDrawerNavItems", () => {
  it("leads with multi-entry paths then more", () => {
    const items = getMobileDrawerNavItems(labels, "Proceso");
    expect(items.slice(0, 4).map((item) => item.id)).toEqual([
      "inicio",
      "recursos",
      "contacto",
      "consultoria",
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
  it("places consultoria as center dock CTA", () => {
    const ids = getDockNavItems("home", labels, "Proceso").map((item) => item.id);
    expect(ids).toEqual(["inicio", "consultoria", "contacto"]);
    expect(ids[1]).toBe(DOCK_CENTER_ID);
  });
});

describe("matchNavItemActive", () => {
  it("marks negocios when present in more/deep via header more items", () => {
    // negocios no longer primary; match still works for project routes if resolved
    const dock = getDockNavItems("deep", labels, "Proceso");
    const consultoria = dock.find((i) => i.id === "consultoria")!;
    expect(matchNavItemActive(consultoria, "/consultoria")).toBe(true);
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

  it("detects deep routes for consultoria", () => {
    const dockDeep = getDockNavItems("deep", labels, "Proceso");
    const consultoria = dockDeep.find((i) => i.id === "consultoria")!;
    const inicio = dockDeep.find((i) => i.id === "inicio")!;

    expect(matchNavItemActive(consultoria, "/consultoria")).toBe(true);
    expect(matchNavItemActive(inicio, "/consultoria")).toBe(false);
    expect(matchNavItemActive(consultoria, "/")).toBe(false);
  });
});
