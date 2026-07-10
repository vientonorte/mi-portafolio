import { motion } from "motion/react";
import { BrandIdentity } from "../components/organisms/BrandIdentity";
import { DesignTokens } from "../components/organisms/DesignTokens";
import { ComponentsLibrary } from "../components/organisms/ComponentsLibrary";
import { DesignPrinciples } from "../components/organisms/DesignPrinciples";
import { AudienceRolesSystem } from "../components/organisms/AudienceRolesSystem";
import { PortfolioMaintenance } from "../components/organisms/PortfolioMaintenance";
import { FigmaExportPanel } from "../components/organisms/FigmaExportPanel";
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
import { scrollToSection } from "../lib/scroll-to-section";
import { toast } from "sonner";

export default function DesignSystem() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const es = language === "es";

  const scrollToExport = () => {
    scrollToSection("figma-export");
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
    >
      <SEOHead
        {...t.seo.pages.designSystem}
        keywords={t.seo.keywords}
        url={canonicalFromPath("/design-system")}
      />

      {/* Intro compacta: sin doble ThemeToggle ni vacío enorme bajo el sticky */}
      <section
        className="section-pad-x border-b border-border/40 pb-8 pt-6 md:pb-10 md:pt-8"
        aria-labelledby="design-system-heading"
      >
        <div className="container mx-auto max-w-3xl space-y-4 text-center md:space-y-5">
          <motion.h1
            id="design-system-heading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-balance text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
          >
            {es
              ? "Sistema de diseño · Rodrigo Gaete"
              : "Design system · Rodrigo Gaete"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {es
              ? "Marca, tokens matte, 4 roles de consultoría (checklist de código para campañas) y export Figma-ready."
              : "Brand, matte tokens, 4 consulting roles (campaign code checklist), and Figma-ready export."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12 }}
            className="flex flex-wrap items-center justify-center gap-2.5 pt-1"
          >
            <Button
              size="default"
              onClick={quickDownloadTokensStudio}
              className="min-h-[44px] gap-2"
            >
              <Download className="h-4 w-4" aria-hidden />
              {es ? "Exportar a Figma (JSON)" : "Export to Figma (JSON)"}
            </Button>
            <Button
              size="default"
              variant="outline"
              onClick={scrollToExport}
              className="min-h-[44px] gap-2"
            >
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
    </PageShell>
  );
}
