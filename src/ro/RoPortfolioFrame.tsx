import type React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "../components/organisms/Navigation";
import { BottomNav } from "../components/molecules/BottomNav";
import { DeepPageNav } from "../components/molecules/DeepPageNav";
import { QaEnvBanner } from "../components/molecules/QaEnvBanner";
import { PortfolioChrome } from "../components/layout/PortfolioChrome";
import { ScrollManager } from "../components/layout/ScrollManager";
import { PageSectionsProvider } from "../lib/page-sections";
import { isDeepPortfolioPage } from "../lib/page-depth";
import { ROUTES, shouldHideSiteChrome } from "../lib/routes";

function RouterNavigation() {
  const navigate = useNavigate();
  return (
    <Navigation
      onNavigateToDesignSystem={() => navigate(ROUTES.designSystem)}
      onNavigateToCaseStudies={() => navigate(ROUTES.process)}
    />
  );
}

/**
 * Marco de la ficha para el build de ro (`npm run build:ro`). Copia del PortfolioFrame de App.tsx
 * (mismo chrome: nav, dock, skip-link), pero en un módulo que no importa App ni el HashRouter
 * ni las páginas lazy. vite.ro.config.ts lo inyecta en lugar de `../App` solo para
 * src/sobre-mi/CanonicalSobreMi.tsx. El apex no lo usa. Si cambia PortfolioFrame en App.tsx,
 * cambiar aquí también (test: src/__tests__/ro/ro-portfolio-frame.test.ts).
 */
export function PortfolioFrame({ children }: { children: React.ReactNode }) {
  const pathname = useLocation().pathname;
  const isDeepPage = isDeepPortfolioPage(pathname);
  /**
   * Gate único de shell (Navigation/BottomNav/DeepPageNav): tour de módulos
   * fullscreen, demo con reloj, panel `/admin` y la landing SEM aislada
   * (`/ads/auditoria-accesibilidad`) — evita fuga de clics/nav del tráfico pago.
   * Ver `shouldHideSiteChrome` en `src/lib/routes.ts`.
   */
  const hideSiteChrome = shouldHideSiteChrome(pathname);

  return (
    <PortfolioChrome>
      <PageSectionsProvider>
        <QaEnvBanner />
        <ScrollManager />
        <a href="#main" className="skip-link">
          Ir al contenido principal
        </a>
        {/* Nav compartida en todas las vistas con chrome (home y subpáginas). Sin SubpageToolbar ni migas (TL 9-oct). */}
        {!hideSiteChrome && <RouterNavigation />}
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        {/* Footer de links/copyright retirado: contacto y UX Tools en nav; privacidad en header */}
        {!isDeepPage && !hideSiteChrome && <BottomNav />}
        {isDeepPage && !hideSiteChrome && <DeepPageNav />}
      </PageSectionsProvider>
    </PortfolioChrome>
  );
}

