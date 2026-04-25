import { motion } from "motion/react";
import { Card, CardContent } from '@vientonorte/ui/card';
import { BarChart3, Users, Building2, Zap } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

export function ImpactStats() {
  const { language } = useLanguage();

  const stats = [
    {
      icon: Building2,
      value: "2",
      label: language === "es" ? "Empresas de nivel enterprise" : "Enterprise-level companies",
      description: language === "es" ? "Transvip & SURA Investments" : "Transvip & SURA Investments",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      icon: Zap,
      value: "8+",
      label: language === "es" ? "Prototipos interactivos diseñados" : "Interactive prototypes designed",
      description: language === "es" ? "Alta fidelidad con Figma" : "High-fidelity with Figma",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
    },
    {
      icon: Users,
      value: "12+",
      label: language === "es" ? "Personas en equipos multidisciplinarios" : "People in multidisciplinary teams",
      description: language === "es" ? "UX, UI, Dev, Product, Compliance" : "UX, UI, Dev, Product, Compliance",
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/20",
    },
    {
      icon: BarChart3,
      value: "5",
      label: language === "es" ? "Macroprocesos UX aplicados" : "UX macro-processes applied",
      description: language === "es" ? "Framework completo end-to-end" : "Complete end-to-end framework",
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-50 dark:bg-violet-950/20",
    },
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-3">
            {language === "es" ? "Impacto Medible" : "Measurable Impact"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "es" 
              ? "Resultados concretos aplicando metodología UX en proyectos enterprise"
              : "Concrete results applying UX methodology in enterprise projects"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-2 hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-7 w-7 ${stat.color}`} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`text-4xl font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                      <h3 className="font-semibold leading-tight min-h-[48px] flex items-center justify-center">
                        {stat.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Highlight - RIA SURA Project */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden group hover:border-primary/50 transition-all duration-500">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Left Side - Visual Impact */}
                <div className="md:col-span-2 relative bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex flex-col justify-between min-h-[300px]">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-4 w-fit backdrop-blur-sm">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                      {language === "es" ? "Proyecto Destacado" : "Featured Project"}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="space-y-4 flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                      {language === "es" 
                        ? "RIA SURA Investments US"
                        : "RIA SURA Investments US"}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {language === "es"
                        ? "Plataforma RIA para mercado estadounidense"
                        : "RIA Platform for US market"}
                    </p>
                  </div>

                  {/* Decorative gradient orb */}
                  <motion.div
                    className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </div>

                {/* Right Side - Details */}
                <div className="md:col-span-3 p-8 space-y-6">
                  {/* Description */}
                  <p className="text-lg leading-relaxed">
                    {language === "es"
                      ? "Diseño UX/UI end-to-end desde arquitectura de información hasta especificaciones UI detalladas. Sistema completo incluyendo autenticación, onboarding multi-rol, dashboards financieros y comunicaciones."
                      : "End-to-end UX/UI design from information architecture to detailed UI specifications. Complete system including authentication, multi-role onboarding, financial dashboards, and communications."}
                  </p>

                  {/* Key Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-sm font-semibold text-primary">
                          {language === "es" ? "Arquitectura" : "Architecture"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-4">
                        {language === "es" ? "Información completa" : "Complete information"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-sm font-semibold text-primary">
                          {language === "es" ? "Onboarding" : "Onboarding"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-4">
                        {language === "es" ? "Multi-rol (3 perfiles)" : "Multi-role (3 profiles)"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-sm font-semibold text-primary">
                          {language === "es" ? "Dashboards" : "Dashboards"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-4">
                        {language === "es" ? "Financieros + Analytics" : "Financial + Analytics"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-sm font-semibold text-primary">
                          {language === "es" ? "Sistema de diseño" : "Design system"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-4">
                        {language === "es" ? "Componentes reutilizables" : "Reusable components"}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Line */}
                  <div className="pt-4 border-t flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          {language === "es" ? "Empresa:" : "Company:"}
                        </span>{" "}
                        <span className="font-semibold">SURA Investments</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          {language === "es" ? "Rol:" : "Role:"}
                        </span>{" "}
                        <span className="font-semibold">Lead UX/UI Designer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}