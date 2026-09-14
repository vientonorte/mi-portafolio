import { describe, expect, it } from "vitest";
import { ROUTES } from "@/lib/routes";
import { ROUTES as CoreRoutes } from "@/vn-core/routes";
import { SEO_SITE } from "@/lib/seo";
import { SEO_SITE as CoreSeo } from "@/vn-core/seo";
import type { ContactSubmitter } from "@/vn-core/contact";
import { isPagesServiciosPath, isSharePath } from "../../../worker/src/lib/public-paths.js";

describe("vn-core DIP adapters", () => {
  it("lib/routes and lib/seo re-export vn-core SSOT", () => {
    expect(ROUTES).toBe(CoreRoutes);
    expect(SEO_SITE).toBe(CoreSeo);
    expect(ROUTES.contact).toBe("/contacto");
  });

  it("ContactSubmitter is a function type port", () => {
    const submit: ContactSubmitter = async () => ({ ok: true, channel: "worker" });
    expect(typeof submit).toBe("function");
  });
});

describe("worker public paths", () => {
  it("Pages owns /servicios; worker share does not", () => {
    expect(isPagesServiciosPath("/servicios")).toBe(true);
    expect(isPagesServiciosPath("/servicios/asistente-ia/")).toBe(true);
    expect(isSharePath("/s/consultoria/")).toBe(true);
    expect(isSharePath("/s/servicios/")).toBe(false);
    expect(isSharePath("/servicios/")).toBe(false);
    expect(isSharePath("/s/proceso/")).toBe(true);
  });
});
