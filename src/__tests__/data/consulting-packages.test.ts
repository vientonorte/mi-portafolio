import { describe, expect, it } from "vitest";
import {
  CONSULTING_PACKAGES,
  type ConsultingPackageId,
} from "@/data/vientonorte-consulting";
import { isPocModuleId } from "@/data/poc-product-modules";

const IDS: ConsultingPackageId[] = ["radar", "marco", "ops"];

describe("consulting pack contract", () => {
  it("three packs Diagnóstico / Prototipo / Proceso with the same shape", () => {
    expect(CONSULTING_PACKAGES.map((p) => p.id)).toEqual(IDS);
    for (const pack of CONSULTING_PACKAGES) {
      expect(pack.name.es.length).toBeGreaterThan(0);
      expect(pack.packLabel.es.length).toBeGreaterThan(0);
      expect(pack.tagline.es.length).toBeGreaterThan(0);
      expect(pack.duration.es.length).toBeGreaterThan(0);
      expect(pack.youGet.es.length).toBeGreaterThan(0);
      expect(pack.deliverables.es.length).toBeGreaterThan(0);
      expect(pack.name.en.length).toBeGreaterThan(0);
    }
    expect(CONSULTING_PACKAGES[0].name.es).toBe("Diagnóstico");
    expect(CONSULTING_PACKAGES[1].name.es).toBe("Prototipo");
    expect(CONSULTING_PACKAGES[2].name.es).toBe("Proceso de equipo");
  });
});

describe("isPocModuleId", () => {
  it("accepts tour modules and rejects pack ids", () => {
    expect(isPocModuleId("dashboard")).toBe(true);
    expect(isPocModuleId("radar")).toBe(false);
    expect(isPocModuleId("ops")).toBe(false);
  });
});
