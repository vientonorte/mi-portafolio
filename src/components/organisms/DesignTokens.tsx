import { motion } from "motion/react";
import { SectionHeader } from "../molecules/SectionHeader";
import { ColorSwatch } from "../atoms/ColorSwatch";
import { TokenDisplay } from "../atoms/TokenDisplay";
import { Palette, Type, Ruler, Circle, Layers } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

const brandColors = [
  { name: "Brand Red", value: "#FF1D25", variable: "--brand-red" },
  { name: "Brand Orange", value: "#FF931E", variable: "--brand-orange" },
  { name: "Primary", value: "#FF1D25", variable: "--primary" },
  { name: "Foreground", value: "#171717", variable: "--foreground" },
  { name: "Background", value: "#ffffff", variable: "--background" },
  { name: "Muted", value: "#f5f5f5", variable: "--muted" },
  { name: "Border", value: "#e5e5e5", variable: "--border" },
];

const matteColors = [
  { name: "Surface Matte", value: "#f0eeea", variable: "--surface-matte" },
  { name: "Matte Elevated", value: "#f7f5f1", variable: "--surface-matte-elevated" },
  { name: "Logo Surface", value: "#e8e5df", variable: "--logo-surface" },
  { name: "Section", value: "#ebe8e3", variable: "--surface-section" },
];

const typography = [
  {
    name: "Display / Hero",
    value: "clamp(2.5rem, 6vw, 5rem)",
    example: <span className="text-3xl font-black tracking-tight">Aa</span>,
  },
  {
    name: "Heading 2",
    value: "clamp(1.75rem, 4vw, 2.5rem)",
    example: <span className="text-2xl font-bold">Aa</span>,
  },
  {
    name: "Body",
    value: "1rem (16px)",
    example: <span className="text-base">Aa</span>,
  },
  {
    name: "Mono / Labels",
    value: "0.75rem · tracking widest",
    example: <span className="font-mono text-xs uppercase tracking-widest">Aa</span>,
  },
];

const spacing = [
  { name: "XS", value: "0.25rem (4px)", example: <div className="w-1 h-4 bg-primary rounded" /> },
  { name: "SM", value: "0.5rem (8px)", example: <div className="w-2 h-4 bg-primary rounded" /> },
  { name: "MD", value: "1rem (16px)", example: <div className="w-4 h-4 bg-primary rounded" /> },
  { name: "LG", value: "1.5rem (24px)", example: <div className="w-6 h-4 bg-primary rounded" /> },
  { name: "XL", value: "2rem (32px)", example: <div className="w-8 h-4 bg-primary rounded" /> },
  { name: "2XL", value: "3rem (48px)", example: <div className="w-12 h-4 bg-primary rounded" /> },
];

const borderRadius = [
  { name: "SM", value: "calc(var(--radius) - 4px)", example: <div className="w-12 h-12 bg-primary rounded-sm" /> },
  { name: "MD", value: "var(--radius)", example: <div className="w-12 h-12 bg-primary rounded-lg" /> },
  { name: "XL", value: "calc(var(--radius) + 4px)", example: <div className="w-12 h-12 bg-primary rounded-xl" /> },
  { name: "Full", value: "9999px", example: <div className="w-12 h-12 bg-primary rounded-full" /> },
];

const sectionCopy = {
  es: {
    colorsTitle: "Tokens de color",
    colorsDesc: "Regla 70-20-10: neutros dominan, acento primary, gradiente solo en highlights (~10%).",
    matteTitle: "Superficies mate",
    matteDesc: "Warm neutrals para métricas, testimonios y logos — sin glass ni blur.",
    typeTitle: "Sistema tipográfico",
    typeDesc: "Chillax + mono para métricas y roles. Escala fluida en hero.",
    spaceTitle: "Espaciado",
    spaceDesc: "Base 4px. Touch targets ≥ 44px (WCAG 2.5.5).",
    radiusTitle: "Border radius",
    radiusDesc: "Cards xl (0.75rem+), badges full.",
  },
  en: {
    colorsTitle: "Color tokens",
    colorsDesc: "70-20-10 rule: neutrals dominate, primary accent, gradient on highlights only (~10%).",
    matteTitle: "Matte surfaces",
    matteDesc: "Warm neutrals for metrics, testimonials, and logos — no glass or blur.",
    typeTitle: "Type system",
    typeDesc: "Chillax + mono for metrics and roles. Fluid scale on hero.",
    spaceTitle: "Spacing",
    spaceDesc: "4px base. Touch targets ≥ 44px (WCAG 2.5.5).",
    radiusTitle: "Border radius",
    radiusDesc: "Cards xl (0.75rem+), badges full.",
  },
} as const;

export function DesignTokens() {
  const { language } = useLanguage();
  const t = sectionCopy[language];

  return (
    <section className="py-16 md:py-24 px-4" aria-labelledby="tokens-heading">
      <div className="container max-w-6xl mx-auto space-y-16 md:space-y-24">
        <div>
          <SectionHeader
            badge={language === "es" ? "Paleta" : "Palette"}
            badgeIcon={Palette}
            title={t.colorsTitle}
            description={t.colorsDesc}
            align="left"
            titleId="tokens-heading"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {brandColors.map((color, index) => (
              <motion.div
                key={color.variable}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ColorSwatch {...color} />
              </motion.div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl border border-[color:var(--logo-surface-border)] bg-brand-gradient text-white text-sm font-medium">
            --brand-gradient · linear-gradient(135deg, #FF1D25 0%, #FF931E 100%)
          </div>
        </div>

        <div>
          <SectionHeader
            badge={language === "es" ? "Superficies" : "Surfaces"}
            badgeIcon={Layers}
            title={t.matteTitle}
            description={t.matteDesc}
            align="left"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {matteColors.map((color, index) => (
              <motion.div
                key={color.variable}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ColorSwatch {...color} />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            badge={language === "es" ? "Tipografía" : "Typography"}
            badgeIcon={Type}
            title={t.typeTitle}
            description={t.typeDesc}
            align="left"
          />
          <div className="space-y-2">
            {typography.map((type, index) => (
              <TokenDisplay key={type.name} {...type} index={index} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            badge={language === "es" ? "Espaciado" : "Spacing"}
            badgeIcon={Ruler}
            title={t.spaceTitle}
            description={t.spaceDesc}
            align="left"
          />
          <div className="grid sm:grid-cols-2 gap-2">
            {spacing.map((space, index) => (
              <TokenDisplay key={space.name} {...space} index={index} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            badge={language === "es" ? "Bordes" : "Borders"}
            badgeIcon={Circle}
            title={t.radiusTitle}
            description={t.radiusDesc}
            align="left"
          />
          <div className="grid sm:grid-cols-2 gap-2">
            {borderRadius.map((radius, index) => (
              <TokenDisplay key={radius.name} {...radius} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}