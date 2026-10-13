import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SobreMiRedirect, buildSobreMiRedirectUrl } from "@/components/layout/SobreMiRedirect";
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

  it("#/sobre-mi replaces to the slash URL and keeps a section anchor", () => {
    expect(buildSobreMiRedirectUrl("", "")).toBe("/sobre-mi/");
    expect(buildSobreMiRedirectUrl("?utm_source=wa", "?utm_medium=chat")).toBe(
      "/sobre-mi/?utm_source=wa&utm_medium=chat"
    );
    expect(buildSobreMiRedirectUrl("", "", "experiencia")).toBe("/sobre-mi/#experiencia");
    vi.stubEnv("BASE_URL", "/qa/");
    expect(buildSobreMiRedirectUrl("?a=1", "")).toBe("/qa/sobre-mi/?a=1");
    vi.unstubAllEnvs();
  });

  it("the hash route replaces the document to /sobre-mi/", () => {
    const replace = vi.fn();
    vi.spyOn(window, "location", "get").mockReturnValue({
      ...window.location,
      search: "",
      replace,
    } as Location);
    render(
      <MemoryRouter initialEntries={[{ pathname: "/sobre-mi", state: { scrollTo: "experiencia" } }]}>
        <Routes>
          <Route path="/sobre-mi" element={<SobreMiRedirect />} />
        </Routes>
      </MemoryRouter>
    );
    expect(replace).toHaveBeenCalledWith("/sobre-mi/#experiencia");
    vi.restoreAllMocks();
  });
});
