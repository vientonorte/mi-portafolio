import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { isDeepPortfolioPage } from "../../lib/page-depth";
import { useAnalytics } from "../../vn-core/analytics/react";
import { analyticsConfig } from "../../vn-core/analytics/config";

interface PortfolioChromeProps {
  children: ReactNode;
}

export function PortfolioChrome({ children }: PortfolioChromeProps) {
  const location = useLocation();
  const isDeepPage = isDeepPortfolioPage(location.pathname);
  const tracker = useAnalytics();

  useEffect(() => {
    document.documentElement.dataset.nav = isDeepPage ? "subpage" : "site";
    return () => {
      delete document.documentElement.dataset.nav;
    };
  }, [isDeepPage]);

  useEffect(() => {
    if (!analyticsConfig.enabled) return;
    const path = `${location.pathname}${location.search}${location.hash}`;
    tracker.page(path, document.title);
  }, [location.pathname, location.search, location.hash, tracker]);

  return <>{children}</>;
}