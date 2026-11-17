import { describe, expect, it } from "vitest";
import {
  APEX_ORIGIN,
  apexHashRedirectUrl,
  isEmpresaOrProyectoHash,
} from "@/sobre-mi/apex-hash-redirect";
import { spaHrefFor } from "@/sobre-mi/http-history";

describe("apex hash redirect (ro → vientonorte.io)", () => {
  it("reconoce hashes de empresa y proyecto, y rechaza el resto", () => {
    expect(isEmpresaOrProyectoHash("#/empresa/transvip")).toBe(true);
    expect(isEmpresaOrProyectoHash("#/empresa/transvip/")).toBe(true);
    expect(isEmpresaOrProyectoHash("/proyecto/transvip-app-premium")).toBe(true);
    expect(isEmpresaOrProyectoHash("#/proyecto/transvip-app-premium?x=1")).toBe(true);
    expect(isEmpresaOrProyectoHash("#/empresa")).toBe(true);
    expect(isEmpresaOrProyectoHash("#/proyectos")).toBe(false);
    expect(isEmpresaOrProyectoHash("#/sobre-mi")).toBe(false);
    expect(isEmpresaOrProyectoHash("#/casos/transvip/")).toBe(false);
    expect(isEmpresaOrProyectoHash("")).toBe(false);
    expect(isEmpresaOrProyectoHash("#/empresas/transvip")).toBe(false);
  });

  it("solo redirige en ro.vientonorte.io hacia el apex", () => {
    const hash = "#/empresa/transvip";
    expect(apexHashRedirectUrl(hash, "ro.vientonorte.io")).toBe(
      `${APEX_ORIGIN}/#/empresa/transvip`,
    );
    expect(apexHashRedirectUrl("#/proyecto/transvip-app-premium/", "ro.vientonorte.io")).toBe(
      `${APEX_ORIGIN}/#/proyecto/transvip-app-premium`,
    );
    expect(apexHashRedirectUrl("#/empresa/transvip?from=sobre-mi", "ro.vientonorte.io")).toBe(
      `${APEX_ORIGIN}/#/empresa/transvip?from=sobre-mi`,
    );
    expect(apexHashRedirectUrl(hash, "vientonorte.io")).toBeNull();
    expect(apexHashRedirectUrl(hash, "localhost")).toBeNull();
    expect(apexHashRedirectUrl(hash, "127.0.0.1")).toBeNull();
    expect(apexHashRedirectUrl(hash, "qa.vientonorte.io")).toBeNull();
    expect(apexHashRedirectUrl("#/proyectos", "ro.vientonorte.io")).toBeNull();
    expect(apexHashRedirectUrl("#/sobre-mi", "ro.vientonorte.io")).toBeNull();
  });
});

describe("spaHref desde Sobre mí", () => {
  it("manda /empresa y /proyecto al apex cuando el host es ro", () => {
    expect(spaHrefFor("/empresa/transvip", "ro.vientonorte.io")).toBe(
      "https://vientonorte.io/#/empresa/transvip",
    );
    expect(spaHrefFor("/proyecto/transvip-app-premium", "ro.vientonorte.io")).toBe(
      "https://vientonorte.io/#/proyecto/transvip-app-premium",
    );
  });

  it("no manda a producción desde localhost, el apex o un host que no es ro", () => {
    expect(spaHrefFor("/empresa/transvip", "localhost")).toBe("/#/empresa/transvip");
    expect(spaHrefFor("/empresa/transvip", "vientonorte.io")).toBe("/#/empresa/transvip");
    expect(spaHrefFor("/empresa/transvip", "127.0.0.1")).toBe("/#/empresa/transvip");
    expect(spaHrefFor("/proyectos", "ro.vientonorte.io")).toBe("/#/proyectos");
  });
});
