import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ServiciosRedirect, buildServiciosRedirectUrl } from "@/components/layout/ServiciosRedirect";

describe("#/news → /servicios/ (TL 9-oct)", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("prod: /servicios/ y conserva UTM de la URL real y de la ruta hash", () => {
    expect(buildServiciosRedirectUrl("", "")).toBe("/servicios/");
    expect(buildServiciosRedirectUrl("?utm_source=li", "?utm_medium=org")).toBe(
      "/servicios/?utm_source=li&utm_medium=org"
    );
    expect(buildServiciosRedirectUrl("", "", "web-pymes")).toBe("/servicios/#web-pymes");
  });

  it("QA: respeta la base /qa/", () => {
    vi.stubEnv("BASE_URL", "/qa/");
    expect(buildServiciosRedirectUrl("", "")).toBe("/qa/servicios/");
  });

  it("la ruta hash /news y /news/<slug> hacen location.replace (sin historial)", () => {
    const replace = vi.fn();
    vi.spyOn(window, "location", "get").mockReturnValue({ ...window.location, search: "", replace } as Location);
    for (const path of ["/news", "/news/ley-21719"]) {
      replace.mockClear();
      render(
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/news/:slug" element={<ServiciosRedirect />} />
            <Route path="/news" element={<ServiciosRedirect />} />
          </Routes>
        </MemoryRouter>
      );
      expect(replace).toHaveBeenCalledWith("/servicios/");
    }
  });
});
