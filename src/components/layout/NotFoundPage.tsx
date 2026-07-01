import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { PageShell } from "./PageShell";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

interface NotFoundPageProps {
  message: string;
  backLabel: string;
  onBack: () => void;
  crumbLabel: string;
}

export function NotFoundPage({
  message,
  backLabel,
  onBack,
  crumbLabel,
}: NotFoundPageProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const navigate = useNavigate();

  return (
    <PageShell
      crumbs={[
        { label: t.breadcrumbs.projects, onClick: () => navigate("/proyectos") },
        { label: crumbLabel, current: true },
      ]}
    >
      <div className="container max-w-3xl mx-auto py-24 px-4 text-center">
        <p className="text-muted-foreground mb-6">{message}</p>
        <Button type="button" variant="outline" onClick={onBack}>
          {backLabel}
        </Button>
      </div>
    </PageShell>
  );
}