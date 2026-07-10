import { motion } from "motion/react";
import { BrandIdentity } from "../components/organisms/BrandIdentity";
import { DesignTokens } from "../components/organisms/DesignTokens";
import { ComponentsLibrary } from "../components/organisms/ComponentsLibrary";
import { DesignPrinciples } from "../components/organisms/DesignPrinciples";
import { AudienceRolesSystem } from "../components/organisms/AudienceRolesSystem";
import { PortfolioMaintenance } from "../components/organisms/PortfolioMaintenance";
import { FigmaExportPanel } from "../components/organisms/FigmaExportPanel";
import { ThemeToggle } from "../components/atoms/ThemeToggle";
import { PageShell } from "../components/layout/PageShell";
import { withHomeCrumb } from "../lib/breadcrumb-helpers";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { SEOHead } from "../components/atoms/SEOHead";
import { canonicalFromPath } from "../lib/seo";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Download, Frame } from "lucide-react";
import { downloadExport } from "../lib/design-tokens-export";
import { toast } from "sonner";

export default function DesignSystem() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const es = language === "es";

  const scrollToExport = () => {
    document.getElementById("figma-export")?.scrollIntoView({ behavior: "smooth" });
  };

  const quickDownloadTokensStudio = () => {
    downloadExport("tokens-studio", language);
    toast.success(
      es ? "Descargado: Tokens Studio JSON" : "Downloaded: Tokens Studio JSON"
    );
  };

  return (
    <PageShell
      crumbs={withHomeCrumb(t.breadcrumbs.home, () => navigate("/"), [
        { label: t.breadcrumbs.designSystem, current: true },
      ])}
      trailing={<ThemeToggle />}
    >
      <SEOHead
        {...t.seo.pages.designSystem}
        keywords={t.seo.keywords}
        url={canonicalFromPath("/design-system")}
      />
      <main>
        <section className="py-12 md:py-20 px-4">
          <div className="container max-w-6xl mx-auto text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              {es
                ? "Sistema de diseño · Rodrigo Gaete"
                : "Design system · Rodrigo Gaete"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl mx-auto text-muted-foreground text-lg"
            >
              {es
                ? "Marca minimalista, tokens matte, 4 roles de consultoría (campañas IG · SEO · LinkedIn) y export Figma-ready (Tokens Studio, W3C DTCG, CSS y prompt AI)."
                : "Minimal brand, matte tokens, 4 consulting roles (IG · SEO · LinkedIn campaigns), and Figma-ready export (Tokens Studio, W3C DTCG, CSS, and AI prompt)."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <Button onClick={quickDownloadTokensStudio} className="gap-2">
                <Download className="h-4 w-4" aria-hidden />
                {es ? "Exportar a Figma (JSON)" : "Export to Figma (JSON)"}
              </Button>
              <Button variant="outline" onClick={scrollToExport} className="gap-2">
                <Frame className="h-4 w-4" aria-hidden />
                {es ? "Guía de importación" : "Import guide"}
              </Button>
            </motion.div>
          </div>
        </section>

        <FigmaExportPanel />
        <BrandIdentity />
        <AudienceRolesSystem />
        <DesignPrinciples />
        <DesignTokens />
        <ComponentsLibrary />
        <PortfolioMaintenance />
      </main>
    </PageShell>
  );
}