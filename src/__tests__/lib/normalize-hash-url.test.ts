import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  consumePendingSectionScroll,
  normalizeDoubleHashUrl,
} from "@/lib/normalize-hash-url";

describe("normalizeDoubleHashUrl", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.stubGlobal("history", {
      replaceState: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rewrites double-hash embudo section URLs on /consultoria to embudo path", () => {
    vi.stubGlobal("location", {
      hash: "#/consultoria#consultoria-demo",
      pathname: "/",
      search: "",
    });

    normalizeDoubleHashUrl();

    expect(history.replaceState).toHaveBeenCalledWith(
      null,
      "",
      "/#/consultoria/embudo"
    );
    expect(sessionStorage.getItem("rg-pending-section-scroll")).toBe(
      JSON.stringify({
        route: "/consultoria/embudo",
        sectionId: "consultoria-demo",
      })
    );
  });

  it("keeps embudo path when already on embudo", () => {
    vi.stubGlobal("location", {
      hash: "#/consultoria/embudo#contacto",
      pathname: "/",
      search: "",
    });

    normalizeDoubleHashUrl();

    expect(history.replaceState).toHaveBeenCalledWith(
      null,
      "",
      "/#/consultoria/embudo"
    );
    expect(sessionStorage.getItem("rg-pending-section-scroll")).toBe(
      JSON.stringify({
        route: "/consultoria/embudo",
        sectionId: "contacto",
      })
    );
  });

  it("ignores valid single-hash URLs", () => {
    vi.stubGlobal("location", {
      hash: "#/consultoria",
      pathname: "/",
      search: "",
    });

    normalizeDoubleHashUrl();

    expect(history.replaceState).not.toHaveBeenCalled();
    expect(sessionStorage.getItem("rg-pending-section-scroll")).toBeNull();
  });
});

describe("consumePendingSectionScroll", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("returns section id when route matches and clears storage", () => {
    sessionStorage.setItem(
      "rg-pending-section-scroll",
      JSON.stringify({
        route: "/consultoria/embudo",
        sectionId: "consultoria-demo",
      })
    );

    expect(consumePendingSectionScroll("/consultoria/embudo")).toBe(
      "consultoria-demo"
    );
    expect(sessionStorage.getItem("rg-pending-section-scroll")).toBeNull();
  });

  it("returns undefined when route does not match", () => {
    sessionStorage.setItem(
      "rg-pending-section-scroll",
      JSON.stringify({
        route: "/consultoria/embudo",
        sectionId: "consultoria-demo",
      })
    );

    expect(consumePendingSectionScroll("/auditoria")).toBeUndefined();
    expect(sessionStorage.getItem("rg-pending-section-scroll")).not.toBeNull();
  });
});
