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
  contact: "Contacto",
  about: "Sobre mí",
  designSystem: "Design System",
  uxtools: "UX Tools",
  more: "Más",
};

describe("NAV_SURFACE", () => {
  it("keeps strategic order aligned across header and mobile", () => {
    const sharedPrefix = ["negocios", "experiencia", "consultoria"] as const;
    for (const id of sharedPrefix) {
      expect(NAV_SURFACE.headerPrimary).toContain(id);
      expect(NAV_SURFACE.mobileDrawer).toContain(id);
    }
    expect(NAV_SURFACE.headerPrimary.indexOf("consultoria")).toBeGreaterThan(
      NAV_SURFACE.headerPrimary.indexOf("experiencia")
    );
    expect(NAV_SURFACE.mobileDrawer.indexOf("auditoria")).toBeGreaterThan(
      NAV_SURFACE.mobileDrawer.indexOf("consultoria")
    );
  });

  it("places mobile more divider at sobre-mi", () => {
    expect(getMobileMoreDividerIndex()).toBe(NAV_SURFACE.mobileDrawer.indexOf("sobre-mi"));
  });
});

describe("getHeaderPrimaryNavItems", () => {
  it("includes consultoria in desktop primary nav", () => {
    const items = getHeaderPrimaryNavItems(labels, "Proceso");
    expect(items.map((item) => item.id)).toEqual([
      "negocios",
      "experiencia",
      "consultoria",
      "proceso",
      "contacto",
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
  it("places consultoria as center dock CTA between work and process", () => {
    const ids = getDockNavItems("home", labels, "Proceso").map((item) => item.id);
    expect(ids).toEqual(["inicio", "negocios", "consultoria", "proceso", "contacto"]);
    expect(ids[2]).toBe(DOCK_CENTER_ID);
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

  it("detects deep routes for consultoria and proceso", () => {
    const dockDeep = getDockNavItems("deep", labels, "Proceso");
    const consultoria = dockDeep.find((i) => i.id === "consultoria")!;
    const proceso = dockDeep.find((i) => i.id === "proceso")!;
    const inicio = dockDeep.find((i) => i.id === "inicio")!;

    expect(matchNavItemActive(consultoria, "/consultoria")).toBe(true);
    expect(matchNavItemActive(proceso, "/proceso")).toBe(true);
    expect(matchNavItemActive(proceso, "/proceso/fase/ux-research")).toBe(true);
    expect(matchNavItemActive(inicio, "/consultoria")).toBe(false);
    expect(matchNavItemActive(consultoria, "/")).toBe(false);
  });
});