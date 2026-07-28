import { describe, it, expect, vi } from "vitest";
import { navigateFeaturedPath } from "@/lib/featured-path-routes";

describe("navigateFeaturedPath", () => {
  it("routes project, process and company paths", () => {
    const navigate = vi.fn();

    navigateFeaturedPath(navigate, "project/sura-ria-us");
    navigateFeaturedPath(navigate, "process/ux-research");
    navigateFeaturedPath(navigate, "company/sura-investments");

    expect(navigate).toHaveBeenNthCalledWith(1, "/proyecto/sura-ria-us");
    expect(navigate).toHaveBeenNthCalledWith(2, "/proceso/fase/ux-research");
    expect(navigate).toHaveBeenNthCalledWith(3, "/empresa/sura-investments");
  });

  it("routes hero search destinations", () => {
    const navigate = vi.fn();

    navigateFeaturedPath(navigate, "route/proyectos");
    navigateFeaturedPath(navigate, "route/sobre-mi");
    navigateFeaturedPath(navigate, "path/proyectos/autosuggest-fondos");
    navigateFeaturedPath(navigate, "path/consultoria#consultoria-demo");
    navigateFeaturedPath(navigate, "section/consultoria/consultoria-demo");

    expect(navigate).toHaveBeenNthCalledWith(1, "/proyectos");
    expect(navigate).toHaveBeenNthCalledWith(2, "/sobre-mi");
    expect(navigate).toHaveBeenNthCalledWith(3, "/proyectos/autosuggest-fondos");
    expect(navigate).toHaveBeenNthCalledWith(4, "/consultoria/embudo", {
      state: { scrollTo: "consultoria-demo" },
    });
    expect(navigate).toHaveBeenNthCalledWith(5, "/consultoria/embudo", {
      state: { scrollTo: "consultoria-demo" },
    });
  });
});