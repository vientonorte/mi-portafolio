import { describe, expect, it } from "vitest";
import {
  mergeContactMessage,
  parseContactDraftFromState,
  resolveAssistantInitialStep,
  shouldSkipAssistantWizard,
} from "@/lib/contact-draft";

describe("parseContactDraftFromState", () => {
  it("returns null for empty or invalid state", () => {
    expect(parseContactDraftFromState(null)).toBeNull();
    expect(parseContactDraftFromState({})).toBeNull();
    expect(parseContactDraftFromState({ contactDraft: { message: "   " } })).toBeNull();
  });

  it("parses legacy message-only draft", () => {
    expect(
      parseContactDraftFromState({
        contactDraft: { message: "Hola desde onboarding" },
      })
    ).toEqual({
      message: "Hola desde onboarding",
      source: "direct",
    });
  });

  it("parses intent-only draft for conversion CTAs", () => {
    expect(
      parseContactDraftFromState({
        contactDraft: {
          message: "",
          source: "cta",
          intent: "consulting",
        },
      })
    ).toEqual({
      message: "",
      source: "cta",
      intent: "consulting",
    });
  });

  it("parses structured draft from onboarding", () => {
    expect(
      parseContactDraftFromState({
        contactDraft: {
          message: "Solicitud consultoría",
          source: "onboarding",
          intent: "consulting",
          packageId: "marco",
          industry: "Fintech",
          timeline: "1 mes",
        },
      })
    ).toEqual({
      message: "Solicitud consultoría",
      source: "onboarding",
      intent: "consulting",
      packageId: "marco",
      industry: "Fintech",
      timeline: "1 mes",
    });
  });
});

describe("shouldSkipAssistantWizard", () => {
  it("skips wizard for onboarding, quoter and partner-edu sources", () => {
    expect(
      shouldSkipAssistantWizard({
        message: "x",
        source: "onboarding",
      })
    ).toBe(true);
    expect(
      shouldSkipAssistantWizard({
        message: "x",
        source: "quoter",
      })
    ).toBe(true);
    expect(
      shouldSkipAssistantWizard({
        message: "x",
        source: "partner-edu",
      })
    ).toBe(true);
    expect(
      shouldSkipAssistantWizard({
        message: "x",
        source: "direct",
      })
    ).toBe(false);
  });

  it("skips wizard for cta drafts with a prebuilt message", () => {
    expect(
      shouldSkipAssistantWizard({
        message: "Solicito auditoría",
        source: "cta",
        intent: "consulting",
      })
    ).toBe(true);
    expect(
      shouldSkipAssistantWizard({
        message: "",
        source: "cta",
        intent: "consulting",
      })
    ).toBe(false);
  });
});

describe("resolveAssistantInitialStep", () => {
  it("opens compose when wizard is skipped", () => {
    expect(
      resolveAssistantInitialStep({
        message: "prebuilt",
        source: "quoter",
      })
    ).toBe("compose");
    expect(resolveAssistantInitialStep(null)).toBe("intent");
  });

  it("opens detail when intent is pre-selected without full prefill", () => {
    expect(
      resolveAssistantInitialStep({
        message: "",
        source: "cta",
        intent: "consulting",
      })
    ).toBe("detail");
  });
});

describe("mergeContactMessage", () => {
  it("keeps user-edited message when preferCurrent", () => {
    expect(
      mergeContactMessage("Mi mensaje editado", "Generado", { preferCurrent: true })
    ).toBe("Mi mensaje editado");
  });

  it("uses generated message when current is empty", () => {
    expect(mergeContactMessage("", "Generado")).toBe("Generado");
  });
});