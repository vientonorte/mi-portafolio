import { describe, expect, it } from "vitest";
import {
  CAMPAIGN_CODE_CHECKLIST,
  HERO_ROLES,
  getHeroRole,
} from "../../data/consultoria-hero-roles";

describe("consultoria-hero-roles", () => {
  it("defines exactly 4 hero offers with ES/EN product copy", () => {
    expect(HERO_ROLES).toHaveLength(4);
    for (const role of HERO_ROLES) {
      expect(role.title.es.length).toBeGreaterThan(3);
      expect(role.title.en.length).toBeGreaterThan(3);
      expect(role.hint.es.length).toBeGreaterThan(3);
      expect(role.pain.es.length).toBeGreaterThan(10);
      expect(role.valueProp.es.length).toBeGreaterThan(10);
      expect(role.uiTokens.length).toBeGreaterThanOrEqual(2);
      expect(role.deepLinkQuery).toMatch(/role=/);
      expect(role.deepLinkQuery).toMatch(/package=/);
      expect(role).not.toHaveProperty("campaigns");
    }
  });

  it("maps offers to packages and app network flag", () => {
    expect(getHeroRole("diagnostic")?.packageId).toBe("radar");
    expect(getHeroRole("prototype")?.packageId).toBe("marco");
    expect(getHeroRole("process")?.packageId).toBe("ops");
    expect(getHeroRole("app")?.packageId).toBe("marco");
    expect(getHeroRole("app")?.appGoal).toBe(true);
  });

  it("exposes code checklist for campaigns without media-plan copy", () => {
    expect(CAMPAIGN_CODE_CHECKLIST.length).toBeGreaterThanOrEqual(8);
    for (const item of CAMPAIGN_CODE_CHECKLIST) {
      expect(item.codeHint.length).toBeGreaterThan(2);
      expect(item.label.es.length).toBeGreaterThan(8);
      expect(item.label.es.toLowerCase()).not.toMatch(/reel|linkedin ads|plan de medios/);
    }
  });
});
