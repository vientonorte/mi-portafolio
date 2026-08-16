import { describe, expect, it } from "vitest";
import { HERO_ROLES } from "../../data/consultoria-hero-roles";
import {
  SERVICE_PATH_DEMOS,
  demoMinutes,
  getServicePathDemo,
  packToServicePath,
  resolveServicePathId,
} from "../../data/service-path-demos";
import { DEMO_X_CMS_DURATION_SEC } from "../../lib/demo-x-cms-campaign";

describe("service-path-demos", () => {
  it("covers the 4 service paths with a time limit", () => {
    expect(SERVICE_PATH_DEMOS).toHaveLength(4);
    expect(SERVICE_PATH_DEMOS.map((d) => d.id)).toEqual(
      HERO_ROLES.map((r) => r.id)
    );
    for (const demo of SERVICE_PATH_DEMOS) {
      expect(demo.durationSec).toBeGreaterThanOrEqual(3 * 60);
      expect(demo.durationSec).toBeLessThanOrEqual(5 * 60);
      expect(demo.warnSec).toBeGreaterThan(0);
      expect(demo.warnSec).toBeLessThan(demo.durationSec);
      expect(demo.poster.length).toBeGreaterThan(8);
      expect(demo.headline.es.length).toBeGreaterThan(8);
      expect(demo.headline.en.length).toBeGreaterThan(8);
      expect(demoMinutes(demo)).toBe(Math.round(demo.durationSec / 60));
    }
  });

  it("keeps prototype on the campaign 5-minute clock", () => {
    expect(getServicePathDemo("prototype")?.durationSec).toBe(
      DEMO_X_CMS_DURATION_SEC
    );
    expect(getServicePathDemo("diagnostic")?.durationSec).toBe(3 * 60);
    expect(getServicePathDemo("diagnostic")?.iframeUrl).toBeUndefined();
    expect(getServicePathDemo("process")?.durationSec).toBe(4 * 60);
    expect(getServicePathDemo("app")?.durationSec).toBe(5 * 60);
  });

  it("resolves pack and campaign aliases", () => {
    expect(resolveServicePathId("radar")).toBe("diagnostic");
    expect(resolveServicePathId("marco")).toBe("prototype");
    expect(resolveServicePathId("x-cms")).toBe("prototype");
    expect(resolveServicePathId("ops")).toBe("process");
    expect(resolveServicePathId("APP")).toBe("app");
    expect(resolveServicePathId("nope")).toBeUndefined();
  });

  it("maps packs to the matching path", () => {
    expect(packToServicePath("radar")).toBe("diagnostic");
    expect(packToServicePath("marco")).toBe("prototype");
    expect(packToServicePath("ops")).toBe("process");
  });
});
