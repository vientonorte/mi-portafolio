import { describe, expect, it } from "vitest";
import {
  resolveOnboardingStartIndex,
  onboardingStepId,
} from "../../lib/consultoria-onboarding-entry";

describe("resolveOnboardingStartIndex", () => {
  it("starts at welcome when no package preselected", () => {
    expect(resolveOnboardingStartIndex({})).toBe(0);
    expect(resolveOnboardingStartIndex({ packagePreselected: false })).toBe(0);
    expect(onboardingStepId(0)).toBe("welcome");
  });

  it("skips welcome and package when package is preselected", () => {
    expect(
      resolveOnboardingStartIndex({ packagePreselected: true })
    ).toBe(2);
    expect(onboardingStepId(2)).toBe("context");
  });

  it("still lands on context with goal prefill + package", () => {
    expect(
      resolveOnboardingStartIndex({
        packagePreselected: true,
        goalPrefill: "offline tool",
      })
    ).toBe(2);
  });
});
