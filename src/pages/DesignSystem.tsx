import { motion } from "motion/react";
import { BrandIdentity } from "../components/organisms/BrandIdentity";
import { DesignTokens } from "../components/organisms/DesignTokens";
import { ComponentsLibrary } from "../components/organisms/ComponentsLibrary";
import { DesignPrinciples } from "../components/organisms/DesignPrinciples";
import { PortfolioMaintenance } from "../components/organisms/PortfolioMaintenance";
import { ThemeToggle } from "../components/atoms/ThemeToggle";
import { PageShell } from "../components/layout/PageShell";
import { withHomeCrumb } from "../lib/breadcrumb-helpers";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { SEOHead } from "../components/atoms/SEOHead";
import { canonicalFromPath } from "../lib/seo";
import { useNavigate } from "react-router-dom";

export default function DesignSystem() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

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
        url={canonicalFromPath('/design-system')}
      />
      <main>
        <section className="py-12 md:py-20 px-4">
          <div className="container max-w-6xl mx-auto text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              {language === "es"
                ? "Sistema de diseño · Rodrigo Gaete"
                : "Design system · Rodrigo Gaete"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl mx-auto text-muted-foreground text-lg"
            >
              {language === "es"
                ? "Marca minimalista, tokens matte y patrones de evidencia medible aplicados al portafolio Lead UX en Fintech & Mobility."
                : "Minimal brand, matte tokens, and measurable-evidence patterns applied to the Lead UX portfolio in Fintech & Mobility."}
            </motion.p>
          </div>
        </section>

        <BrandIdentity />
        <DesignPrinciples />
        <DesignTokens />
        <ComponentsLibrary />
        <PortfolioMaintenance />
      </main>
    </PageShell>
  );
}