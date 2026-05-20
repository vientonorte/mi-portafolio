import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { User } from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";

const roles = [
  "Head UX",
  "Lead UX",
  "Product Designer",
  "UI Designer",
  "User Research",
  "Design Thinking Facilitator",
];

export function About() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true as const }, transition: { duration: 0.6, delay } };

  const bio = language === "es"
    ? "Lead UX con 3+ años implementando UX/UI para productos financieros (SURA, 5+ países) y de movilidad (Transvip/Karri). Combino research, Design Sprints y arquitectura de información para entregar soluciones con resultados medibles."
    : "Lead UX with 3+ years implementing UX/UI for financial products (SURA, 5+ countries) and mobility (Transvip/Karri). I combine research, Design Sprints, and information architecture to deliver solutions with measurable results.";

  return (
    <section
      id="sobre-mi"
      className="py-12 md:py-16 px-4 bg-muted/30"
      aria-labelledby="about-heading"
    >
      <div className="container max-w-4xl mx-auto">
        <SectionHeader
          badge={language === "es" ? "Sobre mí" : "About me"}
          badgeIcon={User}
          title={language === "es" ? "3+ años. 2 verticales. Impacto regional." : "3+ years. 2 verticals. Regional impact."}
          description=""
        />

        <div className="space-y-6">
          <motion.p
            {...fadeUp()}
            className="text-xl leading-relaxed text-muted-foreground"
          >
            {bio}
          </motion.p>

          <motion.div {...fadeUp(0.15)}>
            <Card className="border-2">
              <CardContent className="p-6">
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-semibold">
                  {language === "es" ? "Roles que desempeño" : "Roles I perform"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role, index) => (
                    <motion.div
                      key={role}
                      {...(prefersReducedMotion ? {} : { initial: { opacity: 0, scale: 0.9 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { delay: 0.2 + index * 0.05 } })}
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
                    >
                      <Badge
                        variant="secondary"
                        className="text-sm px-3 py-1.5 cursor-default hover:bg-primary/10 transition-colors"
                      >
                        {role}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
