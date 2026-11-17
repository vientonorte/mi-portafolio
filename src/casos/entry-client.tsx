import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "../styles/chillax-local.css";
import "../styles/globals.css";
import "../styles/global.css";
import "../styles/design-system.css";
import { CasoView } from "./CasoView";
import { CASOS } from "../data/casos";
import { analyticsConfig } from "../vn-core/analytics/config";
import { initGTM } from "../vn-core/analytics/gtm";
import { initTracking } from "../lib/track";
import { preloadAllTranslations } from "../lib/i18n";

await preloadAllTranslations();

const rootEl = document.getElementById("caso-root");
if (!rootEl) throw new Error("No se encontró #caso-root");

const fromPath = window.location.pathname.split("/").filter(Boolean);
const casoIndex = fromPath.indexOf("casos");
const pathCaso = casoIndex >= 0 ? fromPath[casoIndex + 1] : "";
const pathPiece = casoIndex >= 0 ? fromPath[casoIndex + 2] ?? "" : "";
const casoSlug = rootEl.dataset.caso || pathCaso || CASOS[0].slug;
const pieceSlug = rootEl.dataset.piece || pathPiece || "";

const app = (
  <StrictMode>
    <CasoView casoSlug={casoSlug} pieceSlug={pieceSlug} />
  </StrictMode>
);

if (rootEl.firstElementChild) hydrateRoot(rootEl, app);
else createRoot(rootEl).render(app);

if (analyticsConfig.gtmId) initGTM(analyticsConfig.gtmId);
initTracking();
