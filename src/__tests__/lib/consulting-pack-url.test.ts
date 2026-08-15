import { describe, expect, it } from "vitest";
import {
  parsePackFromSearch,
  withPackQuery,
} from "../../lib/consulting-pack-url";

describe("consulting-pack-url", () => {
  it("parses radar | marco | ops from search", () => {
    expect(parsePackFromSearch("?pack=radar")).toBe("radar");
    expect(parsePackFromSearch("pack=marco")).toBe("marco");
    expect(parsePackFromSearch("?pack=ops&utm_source=google")).toBe("ops");
  });

  it("ignores unknown pack", () => {
    expect(parsePackFromSearch("?pack=auditoria")).toBeUndefined();
    expect(parsePackFromSearch("")).toBeUndefined();
  });

  it("appends pack to Calendar URL", () => {
    expect(
      withPackQuery("https://calendar.app.google/abc", "radar")
    ).toBe("https://calendar.app.google/abc?pack=radar");
  });
});
