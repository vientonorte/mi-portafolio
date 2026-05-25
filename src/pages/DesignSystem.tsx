import { motion } from "motion/react";
import { Button } from '../components/ui/button';
import { ArrowLeft } from "lucide-react";
import { DesignTokens } from "../components/organisms/DesignTokens";
import { ComponentsLibrary } from "../components/organisms/ComponentsLibrary";
import { DesignPrinciples } from "../components/organisms/DesignPrinciples";
import { PortfolioMaintenance } from "../components/organisms/PortfolioMaintenance";
import { ThemeToggle } from "../components/atoms/ThemeToggle";
import { LanguageToggle } from "../components/atoms/LanguageToggle";
import { useLanguage } from "../lib/LanguageContext";

interface DesignSystemProps {
  onBack: () => void;
}

export default function DesignSystem({ onBack }: DesignSystemProps) {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm supports-[backdrop-filter]:bg-background/80">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 hover:bg-primary/10 hover:text-primary transition-all"
            aria-label={language === "es" ? "Volver al portfolio" : "Back to portfolio"}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{language === "es" ? "Volver" : "Back"}</span>
          </Button>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section - Simplificado */}
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

        {/* Design Principles */}
        <DesignPrinciples />

        {/* Design Tokens */}
        <DesignTokens />

        {/* Components Library */}
        <ComponentsLibrary />

        {/* Portfolio Maintenance */}
        <PortfolioMaintenance />
      </main>
    </div>
  );
}