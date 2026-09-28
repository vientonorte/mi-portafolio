import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "../styles/chillax-local.css";
import "../styles/globals.css";
import "../styles/global.css";
import "../styles/design-system.css";
import { ServiciosPage } from "./ServiciosPage";
import { analyticsConfig } from "../vn-core/analytics/config";
import { initGTM } from "../vn-core/analytics/gtm";

const rootEl = document.getElementById("servicios-root");
if (!rootEl) throw new Error("No se encontró #servicios-root");

const app = (
  <StrictMode>
    <ServiciosPage />
  </StrictMode>
);

// Build: HTML prerenderizado → hidratar. Dev (vite): sin prerender → render.
if (rootEl.firstElementChild) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}

if (analyticsConfig.gtmId) initGTM(analyticsConfig.gtmId);
