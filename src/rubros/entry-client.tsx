import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "../styles/chillax-local.css";
import "../styles/globals.css";
import "../styles/global.css";
import "../styles/design-system.css";
import { RubroPage } from "./RubroPage";
import { RUBRO_SLUGS } from "./rubros-content";
import { analyticsConfig } from "../vn-core/analytics/config";
import { initGTM } from "../vn-core/analytics/gtm";

const rootEl = document.getElementById("rubro-root");
if (!rootEl) throw new Error("No se encontró #rubro-root");

// El prerender escribe data-slug en cada dist/servicios/<slug>/index.html.
// Dev (vite, sin prerender): ?rubro=<slug> o el primero de rubros.json.
const devSlug = new URLSearchParams(window.location.search).get("rubro");
const slug = rootEl.dataset.slug || (devSlug && RUBRO_SLUGS.includes(devSlug) ? devSlug : RUBRO_SLUGS[0]);

const app = (
  <StrictMode>
    <RubroPage slug={slug} />
  </StrictMode>
);

if (rootEl.firstElementChild) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}

if (analyticsConfig.gtmId) initGTM(analyticsConfig.gtmId);
