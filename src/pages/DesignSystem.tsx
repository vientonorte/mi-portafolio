import { motion } from "motion/react";
import { DesignTokens } from "../components/organisms/DesignTokens";
import { ComponentsLibrary } from "../components/organisms/ComponentsLibrary";
import { DesignPrinciples } from "../components/organisms/DesignPrinciples";
import { PortfolioMaintenance } from "../components/organisms/PortfolioMaintenance";
import { ThemeToggle } from "../components/atoms/ThemeToggle";
import { PageShell } from "../components/layout/PageShell";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";

export default function DesignSystem() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <PageShell
      crumbs={[{ label: t.breadcrumbs.designSystem, current: true }]}
      trailing={<ThemeToggle />}
    >
      <main>
        <section className="py-12 md:py-20 px-4">
          <div className="container max-w-6xl mx-auto text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              {language === "es" ? "Sistema de Diseño Atómico" : "Atomic Design System"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl mx-auto text-muted-foreground text-lg"
            >
              {language === "es"
                ? "Componentes reutilizables construidos con React, TypeScript y Tailwind CSS v4"
                : "Reusable components built with React, TypeScript, and Tailwind CSS v4"}
            </motion.p>
          </div>
        </section>

        <DesignPrinciples />
        <DesignTokens />
        <ComponentsLibrary />
        <PortfolioMaintenance />
      </main>
    </PageShell>
  );
}