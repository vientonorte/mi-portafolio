import { describe, expect, it } from "vitest";
import {
  CAMPAIGN_CHANNELS,
  HERO_ROLES,
  getHeroRole,
} from "../../data/consultoria-hero-roles";

describe("consultoria-hero-roles", () => {
  it("defines exactly 4 hero roles with ES/EN copy", () => {
    expect(HERO_ROLES).toHaveLength(4);
    for (const role of HERO_ROLES) {
      expect(role.title.es.length).toBeGreaterThan(3);
      expect(role.title.en.length).toBeGreaterThan(3);
      expect(role.hint.es.length).toBeGreaterThan(3);
      expect(role.pain.es.length).toBeGreaterThan(10);
      expect(role.valueProp.es.length).toBeGreaterThan(10);
      expect(role.uiTokens.length).toBeGreaterThanOrEqual(2);
      expect(role.campaigns.igReels.es.length).toBeGreaterThan(10);
      expect(role.campaigns.seoGoogle.es.length).toBeGreaterThan(10);
      expect(role.campaigns.semLinkedin.es.length).toBeGreaterThan(10);
    }
  });

  it("maps packages used by hero onboarding", () => {
    expect(getHeroRole("product")?.packageId).toBe("marco");
    expect(getHeroRole("ops")?.packageId).toBe("ops");
    expect(getHeroRole("compliance")?.c1Goal).toBe(true);
    expect(getHeroRole("founder")?.packageId).toBe("radar");
  });

  it("documents IG Reels, SEO Google and SEM LinkedIn channels", () => {
    expect(CAMPAIGN_CHANNELS.map((c) => c.id)).toEqual([
      "ig_reels",
      "seo_google",
      "sem_linkedin",
    ]);
  });
});
