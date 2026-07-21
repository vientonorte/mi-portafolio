import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MessageSquare, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { scrollToSection } from "../../lib/scroll-to-section";

export function AboutTeaser() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).aboutTeaser;
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const },
        transition: { duration: 0.5 },
      };

  return (
    <PageSection
      id="sobre-mi"
      padding="compact"
      width="narrow"
      tone="muted"
      aria-labelledby="about-teaser-heading"
    >
        <div className="overflow-hidden rounded-2xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated p-6 md:p-8">
        <SectionHeader
          badge={language === "es" ? "Sobre mí" : "About me"}
          badgeIcon={User}
          title={t.title}
          description=""
          align="left"
          titleId="about-teaser-heading"
        />

        <motion.div {...fadeUp} className="mt-4 space-y-4">
          <p className="max-w-2xl text-lg leading-relaxed text-foreground/90">{t.lead}</p>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{t.detail}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              className="bg-brand-gradient font-semibold"
              onClick={() => scrollToSection("contacto")}
            >
              <MessageSquare className="mr-2 h-4 w-4" aria-hidden />
              {language === "es" ? "Conversemos" : "Let's talk"}
            </Button>
            <Button
              variant="outline"
              className="group border-2 hover:border-primary hover:bg-primary/5"
              onClick={() => navigate("/sobre-mi")}
            >
              {t.cta}
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Button>
          </div>
        </motion.div>
        </div>
    </PageSection>
  );
}