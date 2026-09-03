import { Flame } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeader } from "../molecules/SectionHeader";
import { FigmaLinkCard } from "../molecules/FigmaLinkCard";
import { FIGMA_CALOR_STRIP_COPY, FIGMA_CALOR_VN } from "../../data/figma-calor";
import { useLanguage } from "../../lib/LanguageContext";

export function CalorVnStrip() {
  const { language } = useLanguage();
  const copy = FIGMA_CALOR_STRIP_COPY[language];
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="calor-vn"
      className="border-t border-border/60 px-4 py-16 md:py-20"
      aria-labelledby="calor-vn-heading"
      data-surface="calor-vn"
    >
      <div className="container mx-auto max-w-7xl">
        <SectionHeader
          badge={copy.badge}
          badgeIcon={Flame}
          title={copy.title}
          description={copy.description}
          titleId="calor-vn-heading"
        />

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FIGMA_CALOR_VN.map((item, index) => (
            <motion.div
              key={item.id}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <FigmaLinkCard item={item} language={language} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
