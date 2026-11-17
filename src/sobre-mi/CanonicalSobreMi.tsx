import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { PortfolioFrame } from "../App";
import { AnalyticsProvider } from "../vn-core/analytics/react";
import { analyticsConfig } from "../vn-core/analytics/config";
import { ImageManifestProvider } from "../lib/ImageManifestProvider";
import { LanguageProvider } from "../lib/LanguageContext";
import SobreMi from "../pages/SobreMi";
import { apexHashRedirectUrl } from "./apex-hash-redirect";
import { createSobreMiHttpHistory } from "./http-history";

/**
 * Ficha pública en /sobre-mi/. `#/sobre-mi` no es otra página: index.html
 * la manda aquí antes de montar la SPA. Si el hash llega igual, se quita.
 * En el primer paint, `#/empresa/…` y `#/proyecto/…` en ro.vientonorte.io
 * salen a https://vientonorte.io/#/…, donde vive el HashRouter.
 * Un hash de otra ruta (#/proyectos) sale por origen + hash.
 */
export function CanonicalSobreMi() {
  const [history] = useState(() => createSobreMiHttpHistory());

  useEffect(() => {
    const stripSobreMiHash = (hash: string) =>
      hash === "#/sobre-mi" || hash === "#/sobre-mi/";

    const applyHash = () => {
      const hash = window.location.hash;
      if (stripSobreMiHash(hash)) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        return true;
      }
      const apex = apexHashRedirectUrl(hash, window.location.hostname);
      if (apex) {
        window.location.replace(apex);
        return true;
      }
      return false;
    };

    applyHash();

    const onHash = () => {
      if (applyHash()) return;
      const next = window.location.hash;
      if (!next.startsWith("#/")) return;
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
