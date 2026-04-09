import { motion } from "motion/react";
import { SectionHeader } from "../molecules/SectionHeader";
import { ColorSwatch } from "../atoms/ColorSwatch";
import { TokenDisplay } from "../atoms/TokenDisplay";
import { Palette, Type, Ruler, Circle } from "lucide-react";

const colors = [
  { name: "Primary", value: "#6366f1", variable: "--primary" },
  { name: "Secondary", value: "#f1f5f9", variable: "--secondary" },
  { name: "Accent", value: "#e9ebef", variable: "--accent" },
  { name: "Muted", value: "#ececf0", variable: "--muted" },
  { name: "Destructive", value: "#d4183d", variable: "--destructive" },
  { name: "Background", value: "#ffffff", variable: "--background" },
  { name: "Foreground", value: "#0a0a0a", variable: "--foreground" },
  { name: "Border", value: "rgba(0, 0, 0, 0.1)", variable: "--border" },
];

const typography = [
  { 
    name: "Heading 1", 
    value: "clamp(2rem, 5vw, 3.5rem)",
    example: <span className="text-2xl md:text-3xl">Aa</span>
  },
  { 
    name: "Heading 2", 
    value: "clamp(1.75rem, 4vw, 2.5rem)",
    example: <span className="text-xl md:text-2xl">Aa</span>
  },
  { 
    name: "Heading 3", 
    value: "clamp(1.25rem, 3vw, 1.75rem)",
    example: <span className="text-lg md:text-xl">Aa</span>
  },
  { 
    name: "Body", 
    value: "var(--text-base)",
    example: <span className="text-base">Aa</span>
  },
];

const spacing = [
  { name: "Extra Small", value: "0.25rem (4px)", example: <div className="w-1 h-4 bg-primary rounded" /> },
  { name: "Small", value: "0.5rem (8px)", example: <div className="w-2 h-4 bg-primary rounded" /> },
  { name: "Medium", value: "1rem (16px)", example: <div className="w-4 h-4 bg-primary rounded" /> },
  { name: "Large", value: "1.5rem (24px)", example: <div className="w-6 h-4 bg-primary rounded" /> },
  { name: "Extra Large", value: "2rem (32px)", example: <div className="w-8 h-4 bg-primary rounded" /> },
  { name: "2XL", value: "3rem (48px)", example: <div className="w-12 h-4 bg-primary rounded" /> },
];

const borderRadius = [
  { name: "Small", value: "calc(var(--radius) - 4px)", example: <div className="w-12 h-12 bg-primary rounded-sm" /> },
  { name: "Medium", value: "calc(var(--radius) - 2px)", example: <div className="w-12 h-12 bg-primary rounded-md" /> },
  { name: "Large", value: "var(--radius) / 0.75rem", example: <div className="w-12 h-12 bg-primary rounded-lg" /> },
  { name: "Extra Large", value: "calc(var(--radius) + 4px)", example: <div className="w-12 h-12 bg-primary rounded-xl" /> },
  { name: "Full", value: "9999px", example: <div className="w-12 h-12 bg-primary rounded-full" /> },
];

export function DesignTokens() {
  return (
    <section className="py-16 md:py-24 px-4" aria-labelledby="tokens-heading">
      <div className="container max-w-6xl mx-auto space-y-16 md:space-y-24">
        {/* Colors */}
        <div>
          <SectionHeader
            badge="Paleta"
            badgeIcon={Palette}
            title="Tokens de Color"
            description="Sistema de colores base utilizado en todo el diseño"
            align="left"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {colors.map((color, index) => (
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

        {/* Typography */}
        <div>
          <SectionHeader
            badge="Tipografía"
            badgeIcon={Type}
            title="Sistema Tipográfico"
            description="Escala tipográfica fluida y responsive"
            align="left"
          />
          <div className="space-y-2">
            {typography.map((type, index) => (
              <TokenDisplay key={type.name} {...type} index={index} />
            ))}
          </div>
        </div>

        {/* Spacing */}
        <div>
          <SectionHeader
            badge="Espaciado"
            badgeIcon={Ruler}
            title="Sistema de Espaciado"
            description="Escala de espaciado consistente para layouts y componentes"
            align="left"
          />
          <div className="grid sm:grid-cols-2 gap-2">
            {spacing.map((space, index) => (
              <TokenDisplay key={space.name} {...space} index={index} />
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div>
          <SectionHeader
            badge="Bordes"
            badgeIcon={Circle}
            title="Border Radius"
            description="Tokens de redondeo para componentes"
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