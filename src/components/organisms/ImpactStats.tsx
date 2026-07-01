import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { BarChart3, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../lib/LanguageContext";
import { analytics } from "../../lib/analytics";
import { CompanyLogoFromName } from "../atoms/CompanyLogoFromName";

export function ImpactStats() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true as const }, transition: { duration: 0.5, delay } };

  const stats = [
    {
      icon: TrendingDown,
      value: "-40%",
      label: language === "es" ? "Abandono en onboarding" : "Onboarding drop-off",
      description: language === "es" ? "SURA Ecosistema — 7-11 min vs 15+" : "SURA Ecosystem — 7-11 min vs 15+",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      link: "/#/cases/process/ux-analytics",
      processId: "ux-analytics",
      company: "SURA",
    },
    {
      icon: BarChart3,
      value: "NPS 72",
      label: language === "es" ? "Plataforma inversiones SURA" : "SURA investments platform",
      description: language === "es" ? "+25 pts sobre baseline" : "+25 pts above baseline",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      link: "/#/cases/process/ux-research",
      processId: "ux-research",
      company: "SURA",
    },
    {
      icon: TrendingUp,
      value: "+35%",
      label: language === "es" ? "Activación shoppers Karri" : "Karri shopper activation",
      description: language === "es" ? "Calculadora de ganancias" : "Earnings calculator",
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/20",
      link: "/#/cases/process/ux-ui-design",
      processId: "ux-ui-design",
      company: "Karri",
    },
    {
      icon: Zap,
      value: "+58%",
      label: language === "es" ? "Engagement notificaciones" : "Notification engagement",
      description: language === "es" ? "Hub centralizado Karri" : "Karri centralized hub",
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-50 dark:bg-violet-950/20",
      link: "/#/cases/process/refinamiento",
      processId: "refinamiento",
      company: "Karri",
    },
  ];

  const handleStatClick = (stat: typeof stats[0]) => {
    analytics.viewImpactStat(stat.value, stat.company);
    navigate(`/cases/process/${stat.processId}`);
  };

  const ctaLabel = language === "es" ? "Ver aplicación del método" : "View method in action";

  return (
    <section
      className="py-12 md:py-16 px-4 bg-muted/30"
      aria-labelledby="impact-stats-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <h2 id="impact-stats-heading" className="sr-only">
          {language === "es" ? "Métricas de impacto" : "Impact metrics"}
        </h2>

        <div className="metric-card-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.value}
                {...fadeUp(index * 0.1)}
                whileHover={prefersReducedMotion ? undefined : { y: -5, scale: 1.02 }}
                className="h-full"
              >
                <Card className="metric-card-interactive h-full p-0 overflow-hidden">
                  <a
                    href={stat.link}
                    onClick={(e) => {
                      e.preventDefault();
                      handleStatClick(stat);
                    }}
                    className="metric-card-body h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    aria-label={`${stat.label}: ${stat.value}. ${ctaLabel}`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 md:h-7 md:w-7 ${stat.color}`} aria-hidden="true" />
                      </div>
                      <CompanyLogoFromName company={stat.company} size="sm" className="shadow-sm" />
                    </div>
                    <div className={`metric-card-value ${stat.color}`}>
                      {stat.value}
                    </div>
                    <h3 className="metric-card-label">
                      {stat.label}
                    </h3>
                    <p className="metric-card-meta">
                      {stat.description}
                    </p>
                    <p className="text-xs text-primary/60 mt-2">
                      {language === "es" ? "Ver aplicación →" : "View application →"}
                    </p>
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Highlight - RIA SURA Project */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-12 md:mt-16"
        >
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden hover:border-primary/50 transition-all duration-500">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 relative bg-gradient-to-br from-primary/20 to-primary/5 p-6 md:p-8 flex flex-col justify-between min-h-[200px]">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-4 w-fit">
                    <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-sm font-semibold text-primary">
                      {language === "es" ? "Proyecto Destacado" : "Featured Project"}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <CompanyLogoFromName
                      company="SURA Investments"
                      size="md"
                      className="shadow-md bg-card"
                    />
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                      RIA SURA Investments US
                    </h3>
                    <p className="text-muted-foreground">
                      {language === "es" ? "Plataforma RIA para mercado estadounidense" : "RIA Platform for US market"}
                    </p>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
                </div>

                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between gap-6">
                  <div className="flex flex-wrap gap-3">
                    {[
                      language === "es" ? "8 prototipos interactivos" : "8 interactive prototypes",
                      language === "es" ? "-40% tiempo onboarding" : "-40% onboarding time",
                      language === "es" ? "3 flujos de autenticación" : "3 auth flows",
                    ].map((metric) => (
                      <span
                        key={metric}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                        {metric}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">{language === "es" ? "Empresa:" : "Company:"}</span>{" "}
                      <span className="font-semibold">SURA Investments</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{language === "es" ? "Rol:" : "Role:"}</span>{" "}
                      <span className="font-semibold">Lead UX/UI Designer</span>
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