import { describe, expect, it, vi } from "vitest";
import {
  pickBestResult,
  submitContactMessage,
  type ContactSubmitResult,
} from "@/lib/submit-contact";

describe("pickBestResult", () => {
  it("prefers google_forms over formsubmit and worker", () => {
    const results: ContactSubmitResult[] = [
      { ok: true, channel: "worker" },
      { ok: true, channel: "formsubmit" },
      { ok: true, channel: "google_forms" },
    ];
    expect(pickBestResult(results)?.channel).toBe("google_forms");
  });

  it("falls back to worker when google_forms failed", () => {
    const results: ContactSubmitResult[] = [
      { ok: false, channel: "google_forms", error: "timeout" },
      { ok: true, channel: "formsubmit" },
      { ok: true, channel: "worker" },
    ];
    expect(pickBestResult(results)?.channel).toBe("worker");
  });

  it("falls back to formsubmit when google_forms and worker failed", () => {
    const results: ContactSubmitResult[] = [
      { ok: false, channel: "google_forms", error: "timeout" },
      { ok: true, channel: "formsubmit" },
      { ok: false, channel: "worker", error: "pending_activation" },
    ];
    expect(pickBestResult(results)?.channel).toBe("formsubmit");
  });

  it("returns null when every channel failed", () => {
    const results: ContactSubmitResult[] = [
      { ok: false, channel: "google_forms" },
      { ok: false, channel: "formsubmit" },
      { ok: false, channel: "worker", error: "pending_activation" },
    ];
    expect(pickBestResult(results)).toBeNull();
  });
});

describe("submitContactMessage", () => {
  it("short-circuits honeypot without network calls", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const result = await submitContactMessage({
      name: "Bot",
      email: "bot@spam.test",
      message: "spam message here",
      _gotcha: "filled",
    });
    expect(result.ok).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});