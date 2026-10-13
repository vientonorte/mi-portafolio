import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { PortfolioFrame } from "../App";
import { AnalyticsProvider } from "../vn-core/analytics/react";
import { analyticsConfig } from "../vn-core/analytics/config";
import { ImageManifestProvider } from "../lib/ImageManifestProvider";
import { LanguageProvider } from "../lib/LanguageContext";
import SobreMi from "../pages/SobreMi";
import { createSobreMiHttpHistory } from "./http-history";

/**
 * Ficha pública en /sobre-mi/. `#/sobre-mi` no es otra página: index.html
 * la manda aquí antes de montar la SPA. Si el hash llega igual, se quita.
 * Un hash de otra ruta (#/proyectos) sale al apex, donde vive el HashRouter.
 */
export function CanonicalSobreMi() {
  const [history] = useState(() => createSobreMiHttpHistory());

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#/sobre-mi" || hash === "#/sobre-mi/") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    const onHash = () => {
      const next = window.location.hash;
      if (!next.startsWith("#/")) return;
      if (next === "#/sobre-mi" || next === "#/sobre-mi/") {
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
                <SobreMi />
              </PortfolioFrame>
            </ImageManifestProvider>
          </HistoryRouter>
        </AnalyticsProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}
