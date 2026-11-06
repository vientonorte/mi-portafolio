import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { PortfolioFrame } from "../App";
import { AnalyticsProvider } from "../vn-core/analytics/react";
import { analyticsConfig } from "../vn-core/analytics/config";
import { ImageManifestProvider } from "../lib/ImageManifestProvider";
import { LanguageProvider } from "../lib/LanguageContext";
import Contacto from "../pages/Contacto";
import { createFichaHttpHistory } from "../sobre-mi/http-history";

/**
 * Ficha pública en /contacto/. El hash #/contacto sigue siendo la ruta de la SPA.
 * Un hash de otra ruta (#/proyectos) sale al apex, donde vive el HashRouter.
 */
export function CanonicalContacto() {
  const [history] = useState(() => createFichaHttpHistory("/contacto"));

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#/contacto" || hash === "#/contacto/") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    const onHash = () => {
      const next = window.location.hash;
      if (!next.startsWith("#/")) return;
      if (next === "#/contacto" || next === "#/contacto/") {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        return;
      }
      const base = import.meta.env.BASE_URL || "/";
      const root = base.endsWith("/") ? base : `${base}/`;
      window.location.replace(`${window.location.origin}${root}${next}`);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <HelmetProvider>
      <LanguageProvider>
        <AnalyticsProvider config={analyticsConfig}>
          <HistoryRouter history={history}>
            <ImageManifestProvider>
              <PortfolioFrame>
                <Contacto />
              </PortfolioFrame>
            </ImageManifestProvider>
          </HistoryRouter>
        </AnalyticsProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}
