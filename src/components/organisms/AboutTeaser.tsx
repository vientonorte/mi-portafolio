import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MessageSquare, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { CompanyLogo } from "../atoms/CompanyLogo";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { portfolioImages } from "../../lib/portfolio-image-urls";
import { scrollToSection } from "../../lib/scroll-to-section";

/** Logos con asset propio — el resto del relato va en chips de texto. */
const FEATURED_BRAND_LOGOS = [
  { name: "SURA Investments", src: portfolioImages.sura.logo },
  { name: "Transvip", src: portfolioImages.transvip.logo },
  { name: "Karri", src: portfolioImages.karri.logo },
] as const;

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

  const brandChips = Array.isArray(t.brands) ? t.brands : [];

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
          badge={t.badge}
          badgeIcon={User}
          title={t.title}
          description=""
          align="left"
          titleId="about-teaser-heading"
        />

        <motion.div {...fadeUp} className="mt-4 space-y-5">
          <p className="max-w-2xl text-lg leading-relaxed text-foreground/90">{t.lead}</p>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{t.detail}</p>

          {/* Marcas ancla (logos) + relato completo (chips) */}
          <div className="space-y-3 border-t border-border/60 pt-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {t.brandsLabel}
            </p>
            <ul
              className="flex flex-wrap items-center gap-3"
              role="list"
              aria-label={t.brandsLabel}
            >
              {FEATURED_BRAND_LOGOS.map((brand) => (
                <li key={brand.name}>
                  <CompanyLogo
                    src={brand.src}
                    alt={brand.name}
                    size="wordmark-sm"
                  />
                </li>
              ))}
            </ul>
            {brandChips.length > 0 && (
              <ul className="flex flex-wrap gap-2" role="list">
                {brandChips.map((name) => (
                  <li key={name}>
                    <span className="inline-flex min-h-[32px] items-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-foreground">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
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
