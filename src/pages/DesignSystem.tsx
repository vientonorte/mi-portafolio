import { motion } from "motion/react";
import { DesignTokens } from "../components/organisms/DesignTokens";
import { ComponentsLibrary } from "../components/organisms/ComponentsLibrary";
import { DesignPrinciples } from "../components/organisms/DesignPrinciples";
import { PortfolioMaintenance } from "../components/organisms/PortfolioMaintenance";

interface DesignSystemProps {
  onBack: () => void;
}

export default function DesignSystem({ onBack }: DesignSystemProps) {
  return (
    <div className="min-h-screen bg-background pt-20">
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
              Sistema de Diseño Atómico
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-2xl mx-auto text-muted-foreground text-lg"
            >
              Componentes reutilizables construidos con React, TypeScript y Tailwind CSS v4
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