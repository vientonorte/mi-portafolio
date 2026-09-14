import { describe, expect, it } from "vitest";
import {
  allowedIntentsForSurface,
  contactPathForSurface,
  defaultIntentForSurface,
  hidesRecruiterAndFreelance,
  isFreeA11yDraft,
  pathIsAuditoriaMentoria,
  resolveContactSurface,
} from "@/lib/contact-surface";
import type { ContactDraft } from "@/lib/contact-draft";
import { ROUTES } from "@/lib/routes";

const radarDraft: ContactDraft = {
  message: "Hola — revisión gratis",
  source: "cta",
  intent: "consulting",
  packageId: "radar",
  consultingQ1: "radar-free",
};

describe("contact surfaces", () => {
  it("maps radar-free draft to freeA11y even if UI said default", () => {
    expect(isFreeA11yDraft(radarDraft)).toBe(true);
    expect(resolveContactSurface("default", radarDraft)).toBe("freeA11y");
    expect(defaultIntentForSurface("freeA11y")).toBe("consulting");
  });

  it("consulting and freeA11y hide recruiter/freelance", () => {
    expect(hidesRecruiterAndFreelance("consulting")).toBe(true);
    expect(hidesRecruiterAndFreelance("freeA11y")).toBe(true);
    expect(hidesRecruiterAndFreelance("default")).toBe(false);
    expect(allowedIntentsForSurface("consulting")).toEqual(["consulting"]);
    expect(allowedIntentsForSurface("default")).toContain("recruiter");
  });

  it("contact path is never /auditoria", () => {
    expect(contactPathForSurface("freeA11y")).toBe(ROUTES.contact);
    expect(contactPathForSurface("consulting")).toBe("/contacto");
    expect(pathIsAuditoriaMentoria("/auditoria")).toBe(true);
    expect(pathIsAuditoriaMentoria("/contacto")).toBe(false);
    expect(pathIsAuditoriaMentoria("/ads/auditoria-accesibilidad")).toBe(false);
  });
});
