import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "../styles/chillax-local.css";
import "../styles/globals.css";
import "../styles/global.css";
import "../styles/design-system.css";
import { NoticiaPage } from "./NoticiaPage";
import { NEWS_CATALOG } from "../data/news-editions";
import { analyticsConfig } from "../vn-core/analytics/config";
import { initGTM } from "../vn-core/analytics/gtm";
import { initTracking } from "../lib/track";

const rootEl = document.getElementById("noticia-root");
if (!rootEl) throw new Error("No se encontró #noticia-root");

// El prerender escribe data-slug en cada dist/noticias/<slug>/index.html.
// Dev (vite, sin prerender): ?noticia=<slug> o la primera edición.
const slugs = NEWS_CATALOG.editions.map((e) => e.slug);
const devSlug = new URLSearchParams(window.location.search).get("noticia");
const slug = rootEl.dataset.slug || (devSlug && slugs.includes(devSlug) ? devSlug : slugs[0]);

const app = (
  <StrictMode>
    <NoticiaPage slug={slug} />
  </StrictMode>
);

if (rootEl.firstElementChild) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}

if (analyticsConfig.gtmId) initGTM(analyticsConfig.gtmId);
initTracking();
