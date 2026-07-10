import { motion } from "motion/react";
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Code, Database, GitBranch, Layers, Rocket, Scale } from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";

export function PortfolioMaintenance() {
  const { language } = useLanguage();

  const principles = [
    {
      icon: Layers,
      title: language === "es" ? "Arquitectura Atómica" : "Atomic Architecture",
      description: language === "es" 
        ? "Atoms → Molecules → Organisms. Componentes reutilizables que escalan sin duplicación."
        : "Atoms → Molecules → Organisms. Reusable components that scale without duplication.",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      icon: Database,
      title: language === "es" ? "Datos Centralizados" : "Centralized Data",
      description: language === "es"
        ? "Única fuente de verdad en /data/projects-data.ts para todos los proyectos."
        : "Single source of truth in /data/projects-data.ts for all projects.",
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-50 dark:bg-violet-950/20",
    },
    {
      icon: Code,
      title: language === "es" ? "Type Safety" : "Type Safety",
      description: language === "es"
        ? "TypeScript garantiza integridad al agregar proyectos. IDs únicos obligatorios."
        : "TypeScript ensures integrity when adding projects. Unique IDs required.",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
    },
  ];

  const workflow = [
    {
      step: "01",
      title: language === "es" ? "Agregar Empresa" : "Add Company",
      description: language === "es"
        ? "Crear CompanyHub con metadata completa (logo, descripción, período, industria)"
        : "Create CompanyHub with complete metadata (logo, description, period, industry)",
    },
    {
      step: "02",
      title: language === "es" ? "Definir Proyectos" : "Define Projects",
      description: language === "es"
        ? "Array de EnhancedProject con IDs únicos, detalles completos y procesos UX aplicados"
        : "Array of EnhancedProject with unique IDs, complete details and applied UX processes",
    },
    {
      step: "03",
      title: language === "es" ? "Actualizar Navegación" : "Update Navigation",
      description: language === "es"
        ? "Agregar a projectMap en App.tsx para navegación automática y funcional"
        : "Add to projectMap in App.tsx for automatic and functional navigation",
    },
  ];

  return (
    <section className="section-pad-spacious relative overflow-hidden bg-gradient-to-br from-muted/50 via-background to-muted/30">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto relative">
        {/* Eye-catching header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border-2 border-primary/30 mb-6"
          >
            <Rocket className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary">
              {language === "es" ? "Sistema Escalable" : "Scalable System"}
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {language === "es" 
              ? "🏗️ Arquitectura que crece contigo" 
              : "🏗️ Architecture that grows with you"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === "es"
              ? "Sistema robusto diseñado para agregar empresas y proyectos sin perder calidad ni consistencia. Aquí te explico cómo mantener este portafolio."
              : "Robust system designed to add companies and projects without losing quality or consistency. Here's how to maintain this portfolio."}
          </p>
        </motion.div>

        <SectionHeader
          badge={language === "es" ? "Principios de Diseño" : "Design Principles"}
          badgeIcon={Layers}
          title={language === "es" 
            ? "Tres pilares fundamentales" 
            : "Three fundamental pillars"}
          description=""
        />

        {/* Principles Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-2 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${principle.bgColor} flex items-center justify-center mb-4`}>
                    <principle.icon className={`h-6 w-6 ${principle.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{principle.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Workflow Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">
            {language === "es" ? "Flujo de Trabajo" : "Workflow"}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {workflow.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="relative overflow-hidden border-2 hover:border-primary/30 transition-all">
                  <CardContent className="p-6">
                    {/* Step number */}
                    <div className="absolute top-0 right-0 text-8xl font-bold text-primary/5 leading-none">
                      {step.step}
                    </div>
                    <Badge variant="secondary" className="mb-4">
                      {language === "es" ? "Paso" : "Step"} {step.step}
                    </Badge>
                    <h4 className="text-lg font-bold mb-2 relative z-10">{step.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-muted/50 to-background">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GitBranch className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">
                  {language === "es" ? "Ejemplo de Implementación" : "Implementation Example"}
                </h3>
              </div>
              
              <div className="bg-muted rounded-lg p-6 font-mono text-sm overflow-x-auto border">
                <div className="text-muted-foreground mb-2">// /data/projects-data.ts</div>
                <div>
                  <span className="text-blue-400">export const</span>{" "}
                  <span className="text-yellow-400">newCompanyHub</span>:{" "}
                  <span className="text-green-400">CompanyHub</span> = {"{"}
                </div>
                <div className="ml-4">
                  <div>id: <span className="text-orange-400">"nueva-empresa"</span>,</div>
                  <div>name: <span className="text-orange-400">"Nueva Empresa"</span>,</div>
                  <div>industry: <span className="text-orange-400">"Tech"</span>,</div>
                  <div>period: <span className="text-orange-400">"2025"</span>,</div>
                  <div>totalProjects: <span className="text-purple-400">4</span>,</div>
                  <div>projects: [</div>
                  <div className="ml-4">
                    <div>{"{"}</div>
                    <div className="ml-4">
                      <div>id: <span className="text-orange-400">"unique-id-001"</span>,</div>
                      <div>projectName: <span className="text-orange-400">"Nombre Proyecto"</span>,</div>
                      <div>description: <span className="text-orange-400">"..."</span>,</div>
                      <div>{"// ... más campos"}</div>
                    </div>
                    <div>{"}"}</div>
                  </div>
                  <div>]</div>
                </div>
                <div>{"}"}</div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-sm flex items-start gap-2">
                  <span className="text-amber-600 dark:text-amber-400 mt-0.5">⚠️</span>
                  <span className="text-amber-900 dark:text-amber-100">
                    <strong>{language === "es" ? "Importante:" : "Important:"}</strong>{" "}
                    {language === "es"
                      ? "Cada proyecto debe tener un ID único para evitar conflictos de navegación."
                      : "Each project must have a unique ID to avoid navigation conflicts."}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <Card className="text-center border-2 hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <Scale className="h-10 w-10 text-primary mx-auto mb-3" />
              <h4 className="font-bold mb-2">
                {language === "es" ? "Escalable" : "Scalable"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === "es"
                  ? "Sin límites para agregar empresas y proyectos"
                  : "No limits to add companies and projects"}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <Layers className="h-10 w-10 text-primary mx-auto mb-3" />
              <h4 className="font-bold mb-2">
                {language === "es" ? "Mantenible" : "Maintainable"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === "es"
                  ? "Código limpio con separación de responsabilidades"
                  : "Clean code with separation of concerns"}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <Code className="h-10 w-10 text-primary mx-auto mb-3" />
              <h4 className="font-bold mb-2">
                {language === "es" ? "Consistente" : "Consistent"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === "es"
                  ? "Mismo patrón para todos los proyectos"
                  : "Same pattern for all projects"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}