import { describe, expect, it } from "vitest";
import { canonicalFromPath } from "@/vn-core/seo";
import { sobreMiHttpStays } from "@/sobre-mi/http-history";

describe("sobre-mi HTTP ficha", () => {
  it("canonicalizes the profile to the HTTP URL", () => {
    expect(canonicalFromPath("/sobre-mi")).toBe("https://vientonorte.io/sobre-mi/");
    expect(canonicalFromPath("/sobre-mi/")).toBe("https://vientonorte.io/sobre-mi/");
    expect(canonicalFromPath("/proyectos")).toBe("https://vientonorte.io/");
  });

  it("keeps this ficha on /sobre-mi and leaves the other SPA routes", () => {
    expect(sobreMiHttpStays("/sobre-mi")).toBe(true);
    expect(sobreMiHttpStays("/sobre-mi/")).toBe(true);
    expect(sobreMiHttpStays("#experiencia")).toBe(true);
    expect(sobreMiHttpStays("/")).toBe(false);
    expect(sobreMiHttpStays("/empresa/transvip")).toBe(false);
  });

});
