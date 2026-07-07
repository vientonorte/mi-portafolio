import { describe, expect, it } from "vitest";
import { isChunkLoadError } from "@/lib/lazy-with-retry";

describe("isChunkLoadError", () => {
  it("detects module script import failures", () => {
    expect(
      isChunkLoadError(new Error("Importing a module script failed."))
    ).toBe(true);
  });

  it("detects vite dynamic import failures", () => {
    expect(
      isChunkLoadError(new Error("Failed to fetch dynamically imported module"))
    ).toBe(true);
  });

  it("ignores unrelated errors", () => {
    expect(isChunkLoadError(new Error("Cannot read property x"))).toBe(false);
  });
});