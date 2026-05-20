import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { BarChart3, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

export function ImpactStats() {
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
    },
    {
      icon: BarChart3,
      value: "NPS 72",
      label: language === "es" ? "Plataforma inversiones SURA" : "SURA investments platform",
      description: language === "es" ? "+25 pts sobre baseline" : "+25 pts above baseline",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
    },
    {
      icon: TrendingUp,
      value: "+35%",
      label: language === "es" ? "Activación shoppers Karri" : "Karri shopper activation",
      description: language === "es" ? "Calculadora de ganancias" : "Earnings calculator",
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-50 dark:bg-rose-950/20",
    },
    {
      icon: Zap,
      value: "+58%",
      label: language === "es" ? "Engagement notificaciones" : "Notification engagement",
      description: language === "es" ? "Hub centralizado Karri" : "Karri centralized hub",
      color: "text-violet-600 dark:text-violet-400",
      bgColor: "bg-violet-50 dark:bg-violet-950/20",
    },
  ];

  return (
    <section className="py-10 md:py-14 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                {...fadeUp(index * 0.1)}
                whileHover={prefersReducedMotion ? undefined : { y: -5 }}
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
          {...fadeUp(0.4)}
          className="mt-10"
        >
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden hover:border-primary/50 transition-all duration-500">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Left Side */}
                <div className="md:col-span-2 relative bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex flex-col justify-between min-h-[200px]">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-4 w-fit">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                      {language === "es" ? "Proyecto Destacado" : "Featured Project"}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                      RIA SURA Investments US
                    </h3>
                    <p className="text-muted-foreground">
                      {language === "es" ? "Plataforma RIA para mercado estadounidense" : "RIA Platform for US market"}
                    </p>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Right Side - compact metrics */}
                <div className="md:col-span-3 p-8 flex flex-col justify-between gap-6">
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
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {metric}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t flex items-center gap-6 text-sm">
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
