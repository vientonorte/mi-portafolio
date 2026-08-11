import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileQuestion, Home } from "lucide-react";
import { Button } from "../ui/button";
import { PageShell } from "./PageShell";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { withHomeCrumb } from "../../lib/breadcrumb-helpers";
import { ROUTES } from "../../lib/routes";

interface NotFoundPageProps {
  message: string;
  backLabel: string;
  onBack: () => void;
  crumbLabel: string;
  /** HTTP-style status shown large — default 404 */
  statusCode?: number;
  title?: string;
}

/**
 * Visible client-side not-found surface.
 * HashRouter never returns real HTTP 404 for SPA paths — this is the UI signal.
 */
export function NotFoundPage({
  message,
  backLabel,
  onBack,
  crumbLabel,
  statusCode = 404,
  title,
}: NotFoundPageProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const navigate = useNavigate();
  const heading =
    title ??
    (language === "en" ? "Page not found" : "Página no encontrada");

  return (
    <PageShell
      crumbs={withHomeCrumb(t.breadcrumbs.home, () => navigate(ROUTES.home), [
        { label: t.breadcrumbs.projects, onClick: () => navigate(ROUTES.projects) },
        { label: crumbLabel, current: true },
      ])}
    >
      <div
        className="container max-w-2xl mx-auto py-16 sm:py-24 px-4 text-center space-y-6"
        role="alert"
        aria-live="polite"
        data-error-status={statusCode}
        data-testid="error-status-page"
      >
        <div className="flex justify-center" aria-hidden>
          <div className="w-20 h-20 rounded-2xl bg-muted/60 flex items-center justify-center border border-border/60">
            <FileQuestion className="w-10 h-10 text-muted-foreground" />
          </div>
        </div>

        <p
          className="text-7xl sm:text-8xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent tabular-nums"
          aria-label={language === "en" ? `Error ${statusCode}` : `Error ${statusCode}`}
        >
          {statusCode}
        </p>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">{heading}</h1>
          <p className="text-muted-foreground max-w-md mx-auto">{message}</p>
          <p className="text-xs text-muted-foreground/80 font-mono">
            HTTP {statusCode}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Button>
          <Button
            type="button"
            onClick={() => navigate(ROUTES.home)}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            {t.errors.backToHome}
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
