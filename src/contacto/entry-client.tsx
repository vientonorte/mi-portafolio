import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "../styles/chillax-local.css";
import "../styles/globals.css";
import "../styles/global.css";
import "../styles/design-system.css";
import { CanonicalContacto } from "./CanonicalContacto";
import { loadTranslation } from "../lib/i18n/loader";
import { readStoredLanguage } from "../lib/language-storage";
import { initTracking } from "../lib/track";

const rootEl = document.getElementById("contacto-root");
if (!rootEl) throw new Error("No se encontró #contacto-root");

const app = (
  <StrictMode>
    <CanonicalContacto />
  </StrictMode>
);

const lang = readStoredLanguage();
await loadTranslation(lang);

if (lang === "es" && rootEl.firstElementChild) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}

initTracking();
