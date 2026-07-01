import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { isDeepPortfolioPage } from "../../lib/page-depth";

interface PortfolioChromeProps {
  children: ReactNode;
}

export function PortfolioChrome({ children }: PortfolioChromeProps) {
  const { pathname } = useLocation();
  const isDeepPage = isDeepPortfolioPage(pathname);

  useEffect(() => {
    document.documentElement.dataset.nav = isDeepPage ? "subpage" : "site";
    return () => {
      delete document.documentElement.dataset.nav;
    };
  }, [isDeepPage]);

  return <>{children}</>;
}