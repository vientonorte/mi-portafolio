import { describe, it, expect } from "vitest";
import { getAuditPageCopy } from "@/lib/audit-page-copy";

describe("getAuditPageCopy", () => {
  it("returns Spanish and English variants", () => {
    expect(getAuditPageCopy("es").sections.executiveSummary).toBe("Resumen ejecutivo");
    expect(getAuditPageCopy("en").sections.executiveSummary).toBe("Executive summary");
  });

  it("includes accessibility strings for external links and progress", () => {
    const es = getAuditPageCopy("es");
    expect(es.opensNewTab.length).toBeGreaterThan(0);
    expect(es.progressLabel.length).toBeGreaterThan(0);
    expect(es.checklistToggle.length).toBeGreaterThan(0);
  });
});