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
});