import { describe, expect, it } from "vitest";
import {
  VALUE_PROOF_EXTERNAL_URLS,
  VALUE_PROOF_ITEMS,
  getValueProofItems,
} from "@/data/value-content-arsenal";
import { getPortfolioImages } from "@/lib/image-overrides";

/** Claves de portfolioImages esperadas por card — imagen alineada a contenido y evidencia. */
const EXPECTED_IMAGE_KEYS: Record<string, string> = {
  "x-cms-demo": "consultoria.xCmsDashboard",
  "gees-propuesta": "consultoria.geesDashboard",
  "ria-us": "sura.riaOnboarding",
  "ria-celula-evolutiva": "sura.celulaEvolutivaFlow",
  "poc-ia-dei": "sura.iaAutomationDashboard",
  "sura-inversiones-dashboard": "sura.riaOnboarding",
  "ecosistema-sura": "sura.benchmarkNavigation",
  "sura-ux-enterprise": "sura.uxProcess",
  autosuggest: "sura.webPrototype",
  "transvip-app-premium": "transvip.appDesktop",
  "transvip-mobile": "transvip.appMobile",
  "transvip-design-system": "transvip.figmaPrototype",
  "valuesite-avem-landing": "sura.onboardingFlags",
  "karri-calculadora": "karri.boosmapBenchmark",
  "karri-notificaciones": "karri.deliveryBrand",
  "karri-design-sprint": "karri.okrsBoard",
  "proceso-ux": "framework.uxValueChain",
  "design-system": "sura.componentPipeline",
  "uxtools-suite": "uxTools.designSystem",
  "uxtools-journey-map": "uxTools.journeyMap",
  "uxtools-user-flow": "uxTools.userFlow",
  "uxtools-usability-test": "uxTools.usabilityTest",
  "uxtools-design-system": "uxTools.designSystem",
  "method-funnel-structure": "methodCoworking.funnelStructure",
  "method-a11y-contrast": "methodCoworking.a11yContrast",
  "method-i18n-gap": "methodCoworking.i18nGap",
  "method-service-discovery": "methodCoworking.serviceDiscovery",
  "edu21-heuristic-web": "edu21.heuristicWeb",
  "edu21-service-strategy": "edu21.serviceStrategy",
  "edu21-sales-pitch": "edu21.salesPitch",
  "edu21-storyboard": "edu21.storyboard",
  "sura-ia-case": "sura.iaAutomationDashboard",
  "auditoria-ejemplo": "sura.analyticsGa4",
  "figjam-audit-board": "sura.hotjarDashboard",
  "consultoria-arbol": "framework.uxValueChain",
  "ux-analytics": "sura.analyticsGa4",
  "sura-booking-flow": "sura.riaOnboarding",
};

const IMAGE_PATH_SNIPPETS: Record<string, string> = {
  "consultoria.xCmsDashboard": "consultoria/x-cms-dashboard",
  "consultoria.geesDashboard": "consultoria/gees-dashboard",
  "uxTools.journeyMap": "ux-tools/journey-map",
  "uxTools.userFlow": "ux-tools/user-flow",
  "uxTools.usabilityTest": "ux-tools/usability-test",
  "uxTools.designSystem": "ux-tools/design-system",
  "methodCoworking.funnelStructure": "method/coworking/funnel-structure",
  "methodCoworking.a11yContrast": "method/coworking/a11y-contrast",
  "methodCoworking.i18nGap": "method/coworking/i18n-gap",
  "methodCoworking.serviceDiscovery": "method/coworking/service-discovery",
  "edu21.heuristicWeb": "cases/edu21/01-heuristic-web",
  "edu21.serviceStrategy": "cases/edu21/03-service-strategy",
  "edu21.salesPitch": "cases/edu21/04-sales-pitch",
  "edu21.storyboard": "cases/edu21/05-storyboard",
  "sura.riaOnboarding": "sura/ria-onboarding",
  "sura.celulaEvolutivaFlow": "sura/celula-evolutiva-flow",
  "sura.iaAutomationDashboard": "sura/ia-automation-dashboard",
  "sura.benchmarkNavigation": "sura/benchmark-navigation",
  "sura.uxProcess": "sura/ux-process",
  "sura.webPrototype": "sura/web-prototype",
  "sura.onboardingFlags": "sura/onboarding-flags",
  "sura.componentPipeline": "sura/component-pipeline",
  "sura.analyticsGa4": "sura/analytics-ga4",
  "sura.hotjarDashboard": "sura/hotjar-dashboard",
  "transvip.appDesktop": "transvip/app-desktop",
  "transvip.appMobile": "transvip/app-mobile",
  "transvip.figmaPrototype": "transvip/figma-prototype",
  "transvip.productVision": "transvip/product-vision",
  "karri.boosmapBenchmark": "karri/boosmap-benchmark",
  "karri.deliveryBrand": "karri/delivery-brand",
  "karri.okrsBoard": "karri/okrs-board",
  "framework.uxValueChain": "framework/ux-value-chain",
};

function resolveImageKey(
  resolver: (images: ReturnType<typeof getPortfolioImages>) => string
): string {
  const resolved = resolver(getPortfolioImages());
  for (const [key, snippet] of Object.entries(IMAGE_PATH_SNIPPETS)) {
    if (resolved.includes(snippet)) return key;
  }
  return resolved;
}

describe("VALUE_PROOF_ITEMS", () => {
  it("tiene una entrada de imagen esperada por cada card", () => {
    expect(VALUE_PROOF_ITEMS.length).toBe(Object.keys(EXPECTED_IMAGE_KEYS).length);
    for (const item of VALUE_PROOF_ITEMS) {
      expect(EXPECTED_IMAGE_KEYS[item.id], `missing image key for ${item.id}`).toBeDefined();
    }
  });

  it("alinea imagen, copy y evidencia por card", () => {
    for (const item of VALUE_PROOF_ITEMS) {
      const imageKey = resolveImageKey(item.imagePath);
      expect(imageKey).toBe(EXPECTED_IMAGE_KEYS[item.id]);

      expect(item.copy.es.title.length).toBeGreaterThan(0);
      expect(item.copy.en.title.length).toBeGreaterThan(0);
      expect(item.copy.es.outcome.length).toBeGreaterThan(0);
      expect(item.copy.en.outcome.length).toBeGreaterThan(0);

      const evidenceHref = VALUE_PROOF_EXTERNAL_URLS[item.id] ?? item.href;
      expect(evidenceHref.length).toBeGreaterThan(0);

      if (item.external) {
        expect(evidenceHref.startsWith("http")).toBe(true);
      }
    }
  });

  it("expone URLs externas solo para evidencia off-site", () => {
    for (const [id, url] of Object.entries(VALUE_PROOF_EXTERNAL_URLS)) {
      expect(url.startsWith("http"), id).toBe(true);
      const item = VALUE_PROOF_ITEMS.find((entry) => entry.id === id);
      expect(item, `orphan external url: ${id}`).toBeDefined();
    }
  });

  it("getValueProofItems resuelve imágenes y copy en ambos idiomas", () => {
    for (const lang of ["es", "en"] as const) {
      const items = getValueProofItems(lang);
      expect(items).toHaveLength(VALUE_PROOF_ITEMS.length);
      for (const item of items) {
        expect(item.image).toMatch(/^https?:\/\/|^\//);
        expect(item.title).toBeTruthy();
        expect(item.kindLabel).toBeTruthy();
      }
    }
  });
});