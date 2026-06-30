import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { User, Download } from "lucide-react";
import { ProfileAvatar } from "../atoms/ProfileAvatar";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import { analytics } from "../../lib/analytics";
import { getCvDownloadUrl } from "../../lib/site-contact";

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

  const handleDownloadCV = () => {
    analytics.downloadCV();
    window.open(getCvDownloadUrl(), "_blank", "noopener,noreferrer");
  };

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
          {/* Profile Photo & Bio Section */}
          <motion.div
            {...fadeUp()}
            className="flex flex-col md:flex-row gap-6 md:gap-8 items-start"
          >
            {/* Profile Photo - Add actual photo to public folder */}
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              className="flex-shrink-0 mx-auto md:mx-0"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-lg">
                <ProfileAvatar
                  alt={
                    language === "es"
                      ? "Rodrigo Gaete — Lead UX Designer"
                      : "Rodrigo Gaete — Lead UX Designer"
                  }
                />
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-xl leading-relaxed text-muted-foreground">
                {bio}
              </p>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleDownloadCV}
                className="mt-6 group border-2 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <Download className="mr-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                {language === "es" ? "Descargar CV" : "Download CV"}
              </Button>
            </div>
          </motion.div>

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
