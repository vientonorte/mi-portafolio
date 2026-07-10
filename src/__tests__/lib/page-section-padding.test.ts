import { describe, expect, it } from "vitest";
import { PAGE_SECTION_PADDING_CLASS } from "../../components/layout/PageSection";

describe("page section padding scale", () => {
  it("maps compact / default / spacious to CSS utility classes", () => {
    expect(PAGE_SECTION_PADDING_CLASS.compact).toBe("section-pad-compact");
    expect(PAGE_SECTION_PADDING_CLASS.default).toBe("section-pad-default");
    expect(PAGE_SECTION_PADDING_CLASS.spacious).toBe("section-pad-spacious");
  });

  it("keeps three distinct steps (no aliases)", () => {
    const values = Object.values(PAGE_SECTION_PADDING_CLASS);
    expect(new Set(values).size).toBe(3);
  });
});
