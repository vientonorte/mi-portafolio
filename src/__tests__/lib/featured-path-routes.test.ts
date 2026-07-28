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
    // currentPath deep: si ya estamos en home, section scroll no llama navigate
    const fromDeep = "/proyectos";

    navigateFeaturedPath(navigate, "route/proyectos", fromDeep);
    navigateFeaturedPath(navigate, "route/sobre-mi", fromDeep);
    navigateFeaturedPath(navigate, "path/proyectos/autosuggest-fondos", fromDeep);
    navigateFeaturedPath(navigate, "path/consultoria#consultoria-demo", fromDeep);
    navigateFeaturedPath(navigate, "section/consultoria/consultoria-demo", fromDeep);

    expect(navigate).toHaveBeenNthCalledWith(1, "/proyectos");
    expect(navigate).toHaveBeenNthCalledWith(2, "/sobre-mi");
    expect(navigate).toHaveBeenNthCalledWith(3, "/proyectos/autosuggest-fondos");
    // Embudo FO = home (/)
    expect(navigate).toHaveBeenNthCalledWith(4, "/", {
      state: { scrollTo: "consultoria-demo" },
    });
    expect(navigate).toHaveBeenNthCalledWith(5, "/", {
      state: { scrollTo: "consultoria-demo" },
    });
  });
});