import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SobreMiRedirect, buildSobreMiRedirectUrl } from "@/components/layout/SobreMiRedirect";
import { canonicalFromPath } from "@/vn-core/seo";
import { sobreMiHttpStays } from "@/sobre-mi/http-history";

describe("sobre-mi HTTP ficha", () => {
  it("canonicalizes the profile to ro.vientonorte.io", () => {
    expect(canonicalFromPath("/sobre-mi")).toBe("https://ro.vientonorte.io/");
    expect(canonicalFromPath("/sobre-mi/")).toBe("https://ro.vientonorte.io/");
    expect(canonicalFromPath("/proyectos")).toBe("https://vientonorte.io/");
  });

  it("keeps this ficha on /sobre-mi and leaves the other SPA routes", () => {
    expect(sobreMiHttpStays("/sobre-mi")).toBe(true);
    expect(sobreMiHttpStays("/sobre-mi/")).toBe(true);
    expect(sobreMiHttpStays("#experiencia")).toBe(true);
    expect(sobreMiHttpStays("/")).toBe(false);
    expect(sobreMiHttpStays("/empresa/transvip")).toBe(false);
  });

  it("#/sobre-mi replaces to ro.vientonorte.io and keeps a section anchor", () => {
    expect(buildSobreMiRedirectUrl("", "")).toBe("https://ro.vientonorte.io/");
    expect(buildSobreMiRedirectUrl("?utm_source=wa", "?utm_medium=chat")).toBe(
      "https://ro.vientonorte.io/?utm_source=wa&utm_medium=chat"
    );
    expect(buildSobreMiRedirectUrl("", "", "experiencia")).toBe("https://ro.vientonorte.io/#experiencia");
    vi.stubEnv("BASE_URL", "/qa/");
    expect(buildSobreMiRedirectUrl("?a=1", "")).toBe("https://ro.vientonorte.io/?a=1");
    vi.unstubAllEnvs();
  });

  it("the hash route replaces the document to ro.vientonorte.io", () => {
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
    expect(replace).toHaveBeenCalledWith("https://ro.vientonorte.io/#experiencia");
    vi.restoreAllMocks();
  });
});
