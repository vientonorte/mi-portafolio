import type { ConsultoriaDemoConfig } from "../data/consultoria-demos";
import { getPortfolioImages } from "./image-overrides";

/** Resuelve el poster estático de una demo de mockups (showcase + admin heatmap). */
export function consultoriaDemoPoster(config: ConsultoriaDemoConfig): string {
  const img = getPortfolioImages();
  switch (config.poster) {
    case "geesDashboard":
      return img.consultoria.geesDashboard;
    case "suraRia":
      return img.sura.riaOnboarding;
    case "suraAnalytics":
      return img.sura.analyticsGa4;
    case "transvipMobile":
      return img.transvip.appMobile;
    case "karriDelivery":
      return img.karri.deliveryBrand;
    case "edu21Pitch":
      return img.edu21.salesPitch;
    case "coworkingFunnel":
      return img.methodCoworking.funnelConversion;
    case "xCmsDashboard":
    default:
      return img.consultoria.xCmsDashboard;
  }
}
