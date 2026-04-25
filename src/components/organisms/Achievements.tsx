import { motion } from "motion/react";
import { SectionHeader } from "../molecules/SectionHeader";
import { SectionBadge } from "../atoms/SectionBadge";
import { MetricCard } from "../atoms/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from '@vientonorte/ui/card';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Award,
  BarChart3,
  ThumbsUp,
  Clock,
  DollarSign,
  Trophy
} from "lucide-react";

const kpis = [
  {
    value: "+45%",
    label: "Incremento promedio en conversión",
    icon: TrendingUp,
    color: "text-green-600 dark:text-green-400",
  },
  {
    value: "+60%",
    label: "Mejora en satisfacción de usuarios",
    icon: ThumbsUp,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    value: "-35%",
    label: "Reducción en tiempo de tarea",
    icon: Clock,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    value: "2.5M+",
    label: "Usuarios impactados",
    icon: Users,
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    value: "+$5M",
    label: "Revenue generado por mejoras UX",
    icon: DollarSign,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    value: "85%",
    label: "NPS promedio en productos",
    icon: Target,
    color: "text-indigo-600 dark:text-indigo-400",
  },
];

const achievements = [
  {
    title: "Transformación Digital - Fintech",
    metrics: [
      { label: "Conversión", value: "+52%", trend: "up" },
      { label: "Drop-off", value: "-68%", trend: "down" },
      { label: "Time on task", value: "-45%", trend: "down" },
      { label: "CSAT", value: "4.8/5", trend: "up" },
    ],
    impact: "Rediseño completo del flujo de onboarding que resultó en 150K usuarios adicionales en 6 meses.",
  },
  {
    title: "Plataforma SaaS - B2B",
    metrics: [
      { label: "User adoption", value: "+73%", trend: "up" },
      { label: "Support tickets", value: "-55%", trend: "down" },
      { label: "Feature discovery", value: "+89%", trend: "up" },
      { label: "Retention", value: "+41%", trend: "up" },
    ],
    impact: "Implementación de design system y mejoras de usabilidad que aumentaron el ARR en $3.2M.",
  },
  {
    title: "E-commerce - Retail",
    metrics: [
      { label: "Cart conversion", value: "+38%", trend: "up" },
      { label: "Cart abandonment", value: "-42%", trend: "down" },
      { label: "AOV", value: "+28%", trend: "up" },
      { label: "Return rate", value: "-31%", trend: "down" },
    ],
    impact: "Optimización del checkout y búsqueda que generó $2.1M en revenue incremental mensual.",
  },
];

export function Achievements() {
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8" aria-labelledby="achievements-heading">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionBadge>Impacto</SectionBadge>
            <h2 id="achievements-heading" className="mt-4 mb-4">
              Resultados que Hablan
            </h2>
            <p className="text-muted-foreground text-lg">
              Métricas reales de proyectos UX que demuestran el valor del diseño centrado en el usuario
              y metodologías basadas en datos.
            </p>
          </motion.div>
        </div>

        {/* KPIs Overview */}
        <div>
          <SectionHeader
            badge="Impacto"
            badgeIcon={BarChart3}
            title="KPIs y Resultados"
            description="Métricas clave que demuestran el impacto real del diseño UX en el negocio"
            align="left"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {kpis.map((kpi, index) => (
              <MetricCard key={kpi.label} {...kpi} index={index} />
            ))}
          </div>
        </div>

        {/* Detailed Achievements */}
        <div>
          <SectionHeader
            badge="Logros"
            badgeIcon={Trophy}
            title="Casos Destacados"
            description="Proyectos con impacto medible y transformación comprobada"
            align="left"
          />

          <div className="space-y-6 md:space-y-8">
            {achievements.map((achievement, index) => (
              <motion.article
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl dark:hover:shadow-primary/5 transition-all duration-300">
                  <CardHeader className="bg-muted/30 dark:bg-muted/20">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Award className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-lg md:text-xl">
                        {achievement.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {achievement.metrics.map((metric) => (
                        <div 
                          key={metric.label}
                          className="text-center p-4 rounded-lg bg-muted/30"
                        >
                          <div className={`text-2xl mb-1 ${
                            metric.trend === "up" 
                              ? "text-green-600 dark:text-green-400" 
                              : metric.trend === "down" && metric.value.includes("-")
                              ? "text-green-600 dark:text-green-400"
                              : "text-primary"
                          }`}>
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border-l-4 border-primary">
                      <p className="text-sm">{achievement.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}