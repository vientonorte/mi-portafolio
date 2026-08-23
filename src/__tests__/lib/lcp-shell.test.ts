import { describe, expect, it } from "vitest";
import { pathFromHash, shouldSkipLcpShell } from "../../lib/lcp-shell";

describe("LCP shell vs HashRouter reload", () => {
  it("keeps the shell on home and SEM consultoria", () => {
    expect(shouldSkipLcpShell("")).toBe(false);
    expect(shouldSkipLcpShell("#")).toBe(false);
    expect(shouldSkipLcpShell("#/")).toBe(false);
    expect(shouldSkipLcpShell("#/?utm=ads")).toBe(false);
    expect(shouldSkipLcpShell("#/consultoria")).toBe(false);
    expect(shouldSkipLcpShell("#/consultoria?pack=ops")).toBe(false);
  });

  it("skips the home overlay on inner routes like /#/sobre-mi", () => {
    expect(pathFromHash("#/sobre-mi")).toBe("/sobre-mi");
    expect(shouldSkipLcpShell("#/sobre-mi")).toBe(true);
    expect(shouldSkipLcpShell("#/contacto")).toBe(true);
    expect(shouldSkipLcpShell("#/proyectos")).toBe(true);
    expect(shouldSkipLcpShell("#/admin")).toBe(true);
  });
});
