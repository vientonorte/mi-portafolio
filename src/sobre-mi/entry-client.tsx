import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "../styles/chillax-local.css";
import "../styles/globals.css";
import "../styles/global.css";
import "../styles/design-system.css";
import { SobreMiPublicPage } from "./SobreMiPublicPage";
import { analyticsConfig } from "../vn-core/analytics/config";
import { initGTM } from "../vn-core/analytics/gtm";
import { initTracking } from "../lib/track";

const rootEl = document.getElementById("sobre-mi-root");
if (!rootEl) throw new Error("No se encontró #sobre-mi-root");

const app = (
  <StrictMode>
    <SobreMiPublicPage />
  </StrictMode>
);

if (rootEl.firstElementChild) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}

if (analyticsConfig.gtmId) initGTM(analyticsConfig.gtmId);
initTracking();
