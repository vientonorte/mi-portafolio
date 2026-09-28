import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getCompanyLogo } from "@/lib/company-logos";
import { BRAND_CASES, SERVICIOS_EXPERIENCE } from "@/servicios/servicios-content";

/** Componentes nuevos del branding. Fallan si aparece una ruta fuera del canon. */
const FILES = [
  "src/components/marketing/ExperienceStrip.tsx",
  "src/components/marketing/FounderBand.tsx",
  "src/components/marketing/CaseCards.tsx",
  "src/components/organisms/HomeMarketing.tsx",
  "src/servicios/ServiciosPage.tsx",
];

const FORBIDDEN = [/\/s\//, /\/#\//, /\/news\//, /\/servicios\/[a-z0-9-]+\//];

describe("branding-home canon", () => {
  it("los componentes nuevos no contienen /s/, /#/, /news/ ni /servicios/<slug>/", () => {
    for (const rel of FILES) {
      const src = readFileSync(resolve(process.cwd(), rel), "utf8");
      for (const re of FORBIDDEN) {
        expect(src, `${rel} ${re}`).not.toMatch(re);
      }
    }
  });

  it("la franja es experiencia de Rö y toma los wordmarks de proyectos", () => {
    expect(SERVICIOS_EXPERIENCE.heading).toBe("Experiencia de Rö");
    expect(SERVICIOS_EXPERIENCE.names).toEqual(["Transvip", "Karri", "SURA Investments", "Pareti"]);
    expect(SERVICIOS_EXPERIENCE.heading.toLowerCase()).not.toContain("clientes");
    expect(getCompanyLogo("Transvip")?.wordmark).toBe(true);
    expect(getCompanyLogo("Karri")?.src).toContain("karri/logo");
    expect(getCompanyLogo("SURA Investments")?.src).toContain("sura/logo");
    expect(getCompanyLogo("Pareti")?.wordmark).toBeUndefined();
  });

  it("los tres casos apuntan solo a las anclas de /servicios/", () => {
    expect(BRAND_CASES.map((c) => c.ctaAnchor)).toEqual(["web-pymes", "revision-gratis", "consultoria-ux"]);
    expect(BRAND_CASES[0].result).toBeUndefined();
    expect(BRAND_CASES[1].result).toBeUndefined();
    expect(BRAND_CASES[2].result).toBe("−40% tiempo de reserva, +25% conversión, NPS 82.");
  });
});
