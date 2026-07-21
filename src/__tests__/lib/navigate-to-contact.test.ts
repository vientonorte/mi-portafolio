import { describe, expect, it, vi } from "vitest";
import {
  buildContactDraft,
  isContactIntent,
  navigateToContactAssistant,
  parseContactIntentFromSearch,
} from "@/lib/navigate-to-contact";

describe("isContactIntent", () => {
  it("accepts known intents", () => {
    expect(isContactIntent("consulting")).toBe(true);
    expect(isContactIntent("recruiter")).toBe(true);
    expect(isContactIntent("nope")).toBe(false);
  });
});

describe("parseContactIntentFromSearch", () => {
  it("reads intent query param", () => {
    expect(parseContactIntentFromSearch("?intent=consulting")).toBe("consulting");
    expect(parseContactIntentFromSearch("intent=freelance")).toBe("freelance");
    expect(parseContactIntentFromSearch("?intent=invalid")).toBeNull();
  });
});

describe("buildContactDraft", () => {
  it("defaults source to cta", () => {
    expect(buildContactDraft({ intent: "consulting" })).toEqual({
      message: "",
      source: "cta",
      intent: "consulting",
      packageId: undefined,
      industry: undefined,
      timeline: undefined,
      recruiterMode: undefined,
      consultingQ1: undefined,
    });
  });
});

describe("navigateToContactAssistant", () => {
  it("navigates to /contacto with state and analytics-safe draft", () => {
    const navigate = vi.fn();
    navigateToContactAssistant(navigate, {
      origin: "audit-banner",
      intent: "consulting",
      packageId: "radar",
      message: "Solicito auditoría",
    });

    expect(navigate).toHaveBeenCalledWith(
      { pathname: "/contacto", search: "" },
      {
        replace: undefined,
        state: {
          contactDraft: expect.objectContaining({
            source: "cta",
            intent: "consulting",
            packageId: "radar",
            message: "Solicito auditoría",
          }),
        },
      }
    );
  });

  it("adds ?intent= when only intent is provided", () => {
    const navigate = vi.fn();
    navigateToContactAssistant(navigate, { intent: "recruiter" });
    expect(navigate).toHaveBeenCalledWith(
      { pathname: "/contacto", search: "?intent=recruiter" },
      expect.objectContaining({
        state: {
          contactDraft: expect.objectContaining({ intent: "recruiter", message: "" }),
        },
      })
    );
  });
});
