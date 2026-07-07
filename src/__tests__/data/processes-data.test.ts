import { describe, it, expect } from "vitest";
import { processesData } from "@/data/processes-data";

describe("processesData ux-analytics", () => {
  const analytics = processesData["ux-analytics"];

  it("defines tool categories with subcategories", () => {
    expect(analytics.toolCategories?.length).toBeGreaterThanOrEqual(5);

    const qual = analytics.toolCategories?.find((c) => c.id === "qualitative");
    expect(qual?.subcategories.map((s) => s.id)).toEqual(
      expect.arrayContaining(["grounded-theory", "focus-groups", "participatory-mapping"])
    );

    const platforms = analytics.toolCategories?.find((c) => c.id === "platforms");
    expect(platforms?.subcategories.map((s) => s.id)).toEqual(
      expect.arrayContaining(["crm", "cms"])
    );

    const ai = analytics.toolCategories?.find((c) => c.id === "ai-assisted");
    expect(ai?.subcategories.some((s) => s.id === "llm-synthesis")).toBe(true);
  });

  it("lists expanded tools including CRM, CMS and LLM", () => {
    expect(analytics.tools).toEqual(
      expect.arrayContaining(["CRM", "CMS", "LLM", "Grounded Theory"])
    );
  });
});