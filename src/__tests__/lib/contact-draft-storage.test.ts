import { afterEach, describe, expect, it } from "vitest";
import {
  clearContactSession,
  readContactSession,
  writeContactSession,
} from "@/lib/contact-draft-storage";

describe("contact-draft-storage", () => {
  afterEach(() => {
    clearContactSession();
  });

  it("persists only name, email, message and tab in sessionStorage", () => {
    writeContactSession({
      name: "Rö",
      email: "ro@example.com",
      message: "Hola",
      activeTab: "form",
    });

    expect(readContactSession()).toEqual(
      expect.objectContaining({
        name: "Rö",
        email: "ro@example.com",
        message: "Hola",
        activeTab: "form",
      })
    );

    const raw = sessionStorage.getItem("vn-contact-session-v1");
    expect(raw).not.toBeNull();
    expect(raw).not.toContain("consent");
  });

  it("clears session on demand", () => {
    writeContactSession({
      name: "Test",
      email: "t@t.com",
      message: "x",
      activeTab: "assistant",
    });
    clearContactSession();
    expect(readContactSession()).toBeNull();
  });
});