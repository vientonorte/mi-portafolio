import { afterEach, describe, expect, it } from "vitest";
import {
  attributionFields,
  cleanAnchor,
  landingPathWithAnchor,
  recordEntryAnchor,
  recordFirstTouch,
} from "@/lib/utm";

afterEach(() => sessionStorage.clear());

describe("landing_path con ancla (QA 13-oct)", () => {
  it("cleanAnchor acepta anclas de sección y descarta rutas hash y anclas neutras", () => {
    expect(cleanAnchor("#web-pymes")).toBe("#web-pymes");
    expect(cleanAnchor("#/privacy")).toBe("");
    expect(cleanAnchor("#contacto")).toBe("");
    expect(cleanAnchor("#main")).toBe("");
    expect(cleanAnchor("#a b")).toBe("");
    expect(cleanAnchor("")).toBe("");
  });

  it("primer toque con hash guarda /servicios/#consultoria-ux", () => {
    const t = recordFirstTouch({ pathname: "/servicios/", search: "?utm_source=x", hash: "#consultoria-ux" });
    expect(t?.landing_path).toBe("/servicios/#consultoria-ux");
  });

  it("attributionFields agrega el ancla de entrada si el primer toque no la traía", () => {
    recordFirstTouch({ pathname: "/servicios/", search: "", hash: "" });
    recordEntryAnchor("#revision-gratis");
    expect(attributionFields().landing_path).toBe("/servicios/#revision-gratis");
  });

  it("rubro sin ancla de entrada deja el path de la landing", () => {
    recordFirstTouch({ pathname: "/servicios/web-dental/", search: "?utm_source=ig", hash: "#contacto" });
    expect(attributionFields()).toMatchObject({ utm_source: "ig", landing_path: "/servicios/web-dental/" });
  });

  it("landingPathWithAnchor no supera 200 caracteres", () => {
    expect(landingPathWithAnchor("/" + "a".repeat(250), "#x").length).toBeLessThanOrEqual(200);
  });
});
