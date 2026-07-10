import { describe, expect, it } from "vitest";
import {
  CAMPAIGN_CODE_CHECKLIST,
  HERO_ROLES,
  getHeroRole,
} from "../../data/consultoria-hero-roles";

describe("consultoria-hero-roles", () => {
  it("defines exactly 4 hero roles with ES/EN product copy", () => {
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
      // No campaign ad hooks on public role objects
      expect(role).not.toHaveProperty("campaigns");
    }
  });

  it("maps packages used by hero onboarding", () => {
    expect(getHeroRole("product")?.packageId).toBe("marco");
    expect(getHeroRole("ops")?.packageId).toBe("ops");
    expect(getHeroRole("compliance")?.c1Goal).toBe(true);
    expect(getHeroRole("founder")?.packageId).toBe("radar");
  });

  it("exposes code checklist for campaigns without media-plan copy", () => {
    expect(CAMPAIGN_CODE_CHECKLIST.length).toBeGreaterThanOrEqual(8);
    for (const item of CAMPAIGN_CODE_CHECKLIST) {
      expect(item.codeHint.length).toBeGreaterThan(2);
      expect(item.label.es.length).toBeGreaterThan(8);
      // No ad/plan language in checklist labels
      expect(item.label.es.toLowerCase()).not.toMatch(/reel|linkedin ads|plan de medios/);
    }
  });
});
