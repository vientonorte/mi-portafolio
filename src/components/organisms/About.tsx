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
  "UX Lead",
  "Design Ops",
  "Product Designer",
  "Design Systems",
  "Design Thinking",
  "Docencia UX · UI",
];

export function About() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true as const }, transition: { duration: 0.6, delay } };

  const bio = language === "es"
    ? "UX Lead en SURA Investments (Estrategia Digital, Wealth Management regional). Aplico Design Ops como método: research, design systems y handoff medible en productos regulados y mobility. Antes lideré UX en Transvip/Karri; también docencia en Desafío Latam y trayectoria en agencias y retail (Havas/Claro, Walmart Chile)."
    : "UX Lead at SURA Investments (Digital Strategy, regional Wealth Management). I use Design Ops as a method: research, design systems, and measurable handoff in regulated products and mobility. Previously led UX at Transvip/Karri; also taught at Desafío Latam with agency and retail experience (Havas/Claro, Walmart Chile).";

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
          title={language === "es" ? "UX Lead regional · Fintech & Mobility" : "Regional UX Lead · Fintech & Mobility"}
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
              <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-border/60 md:h-40 md:w-40">
                <ProfileAvatar
                  alt={
                    language === "es"
                      ? "Rodrigo Gaete, UX Lead"
                      : "Rodrigo Gaete, UX Lead"
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
