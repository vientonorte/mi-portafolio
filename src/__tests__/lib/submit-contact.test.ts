import { describe, expect, it, vi } from "vitest";
import {
  pickBestResult,
  submitContactMessage,
  type ContactSubmitResult,
} from "@/lib/submit-contact";

describe("pickBestResult", () => {
  it("returns the first ok result (worker only)", () => {
    const results: ContactSubmitResult[] = [
      { ok: false, channel: "worker", error: "x" },
      { ok: true, channel: "worker" },
    ];
    expect(pickBestResult(results)?.ok).toBe(true);
  });

  it("returns null when every channel failed", () => {
    expect(pickBestResult([{ ok: false, channel: "worker" }])).toBeNull();
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

  it("solo llama al worker (sin Google Forms ni FormSubmit) e incluye utm + landing_path con ancla", async () => {
    sessionStorage.setItem(
      "vn_first_touch",
      JSON.stringify({ utm_source: "google", utm_medium: "cpc", utm_campaign: "web", landing_path: "/servicios/" })
    );
    sessionStorage.setItem("vn_entry_anchor", "#web-pymes");
    const appendSpy = vi.spyOn(document.body, "appendChild");
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    const result = await submitContactMessage({
      name: "Ana",
      email: "ana@pyme.cl",
      message: "Necesito una web nueva",
      consent: true,
    });
    expect(result).toMatchObject({ ok: true, channel: "worker", workerConfirmed: true });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(String(fetchSpy.mock.calls[0][0])).toMatch(/\/api\/contact$/);
    const body = JSON.parse(String((fetchSpy.mock.calls[0][1] as RequestInit).body));
    expect(body).toMatchObject({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "web",
      landing_path: "/servicios/#web-pymes",
    });
    // Nada de iframes/forms hacia terceros.
    expect(appendSpy).not.toHaveBeenCalled();
    expect(document.querySelector("iframe, form[action*='google'], form[action*='formsubmit']")).toBeNull();
    fetchSpy.mockRestore();
    appendSpy.mockRestore();
    sessionStorage.clear();
  });

  it("si el worker falla devuelve mailto de respaldo, sin otro canal", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ ok: false, error: "boom" }), { status: 500 }));
    const result = await submitContactMessage({ name: "Ana", email: "ana@pyme.cl", message: "Necesito una web" });
    expect(result.ok).toBe(false);
    expect(result.mailtoUrl).toMatch(/^mailto:/);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    fetchSpy.mockRestore();
  });
});
