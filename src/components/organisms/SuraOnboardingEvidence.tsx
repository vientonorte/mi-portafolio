import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import FlujoDeDiagramaUsuario from "../../imports/FlujoDeDiagramaUsuario";
import Paso1 from "../../imports/Paso1";
import FAQ from "../../imports/Faq";

interface SuraOnboardingEvidenceProps {
  lang: "es" | "en";
}

export function SuraOnboardingEvidence({ lang }: SuraOnboardingEvidenceProps) {
  const content = {
    es: {
      title: "Evidencias del Proyecto",
      flowDiagram: "Flujo UX Completo",
      flowDesc: "Diagrama del proceso de registro optimizado en 4 pasos",
      uiImplementation: "Implementación UI - Paso 1",
      uiDesc: "Interfaz real del primer paso: validación de identidad",
      designSystem: "Design System & Componentes",
      dsDesc: "Sistema de diseño atómico implementado",
      timeEstimate: "Tiempo total: 7-11 min",
    },
    en: {
      title: "Project Evidence",
      flowDiagram: "Complete UX Flow",
      flowDesc: "Optimized 4-step registration process diagram",
      uiImplementation: "UI Implementation - Step 1",
      uiDesc: "Real interface of first step: identity validation",
      designSystem: "Design System & Components",
      dsDesc: "Implemented atomic design system",
      timeEstimate: "Total time: 7-11 min",
    },
  };

  const t = content[lang];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="mb-2">{t.title}</h2>
        <Badge variant="secondary" className="text-xs">
          {t.timeEstimate}
        </Badge>
      </motion.div>

      {/* Flujo completo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-brand-gradient flex items-center justify-center">
                <span className="text-white">📊</span>
              </div>
              <div>
                <h3 className="text-lg">{t.flowDiagram}</h3>
                <p className="text-sm text-muted-foreground">{t.flowDesc}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white rounded-lg overflow-x-auto">
              <FlujoDeDiagramaUsuario />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grid de evidencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* UI Paso 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all h-full">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-brand-gradient flex items-center justify-center">
                  <span className="text-white">🎨</span>
                </div>
                <div>
                  <h3 className="text-lg">{t.uiImplementation}</h3>
                  <p className="text-sm text-muted-foreground">{t.uiDesc}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 overflow-x-auto">
                <Paso1 />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Design System */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card className="overflow-hidden border-2 hover:border-primary/30 transition-all h-full">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-brand-gradient flex items-center justify-center">
                  <span className="text-white">⚛️</span>
                </div>
                <div>
                  <h3 className="text-lg">{t.designSystem}</h3>
                  <p className="text-sm text-muted-foreground">{t.dsDesc}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 overflow-x-auto">
                <FAQ />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Design System Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10 border-2 border-blue-200/50 dark:border-blue-800/30">
          <div className="text-3xl mb-2">🎨</div>
          <h4 className="text-sm mb-1">Design System</h4>
          <p className="text-xs text-muted-foreground">
            Atomic Design
            <br />
            50+ componentes
          </p>
        </Card>

        <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10 border-2 border-green-200/50 dark:border-green-800/30">
          <div className="text-3xl mb-2">📐</div>
          <h4 className="text-sm mb-1">Layout & Navigation</h4>
          <p className="text-xs text-muted-foreground">
            Grid responsive
            <br />
            CMS + Arquitectura unificada
          </p>
        </Card>

        <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10 border-2 border-purple-200/50 dark:border-purple-800/30">
          <div className="text-3xl mb-2">✨</div>
          <h4 className="text-sm mb-1">UX/UI Improvements</h4>
          <p className="text-xs text-muted-foreground">
            Progress indicators
            <br />
            Time badges por paso
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
