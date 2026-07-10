import { motion } from "motion/react";
import { SectionHeader } from "../molecules/SectionHeader";
import { ColorSwatch } from "../atoms/ColorSwatch";
import { TokenDisplay } from "../atoms/TokenDisplay";
import {
  Palette,
  Type,
  Ruler,
  Circle,
  Layers,
  Sparkles,
  Timer,
} from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import {
  effectTokens,
  getColorsForGroup,
  motionTokens,
  radiusTokens,
  spacingTokens,
  typographyTokens,
} from "../../data/design-tokens";

const sectionCopy = {
  es: {
    colorsTitle: "Tokens de color",
    colorsDesc:
      "Regla 70-20-10. Cada swatch expone hex (Figma), CSS var y path Tokens Studio.",
    matteTitle: "Superficies mate",
    matteDesc:
      "Warm neutrals para métricas, testimonios y logos — sin glass ni blur.",
    statTitle: "Tintes de KPI",
    statDesc: "Fondos y foregrounds de ImpactMetricCard / stats.",
    typeTitle: "Sistema tipográfico",
    typeDesc:
      "Chillax + mono. Specs listos para Text styles de Figma (family · weight · size · lh · tracking).",
    spaceTitle: "Espaciado",
    spaceDesc: "Base 4px. Valores numéricos para Figma Variables. Touch ≥ 44px.",
    radiusTitle: "Border radius",
    radiusDesc: "Cards xl, badges full. px exactos para Variables.",
    effectsTitle: "Efectos",
    effectsDesc: "Gradiente de marca (~10%) y sombras mate.",
    motionTitle: "Motion",
    motionDesc: "Duraciones y easing · respeta prefers-reduced-motion.",
  },
  en: {
    colorsTitle: "Color tokens",
    colorsDesc:
      "70-20-10 rule. Each swatch exposes hex (Figma), CSS var, and Tokens Studio path.",
    matteTitle: "Matte surfaces",
    matteDesc:
      "Warm neutrals for metrics, testimonials, and logos — no glass or blur.",
    statTitle: "KPI tints",
    statDesc: "Backgrounds and foregrounds for ImpactMetricCard / stats.",
    typeTitle: "Type system",
    typeDesc:
      "Chillax + mono. Specs ready for Figma Text styles (family · weight · size · lh · tracking).",
    spaceTitle: "Spacing",
    spaceDesc: "4px base. Numeric values for Figma Variables. Touch ≥ 44px.",
    radiusTitle: "Border radius",
    radiusDesc: "Cards xl, badges full. Exact px for Variables.",
    effectsTitle: "Effects",
    effectsDesc: "Brand gradient (~10%) and matte shadows.",
    motionTitle: "Motion",
    motionDesc: "Durations and easing · respects prefers-reduced-motion.",
  },
} as const;

function TypePreview({
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
}: {
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}) {
  return (
    <span
      className="text-2xl leading-none"
      style={{
        fontFamily,
        fontWeight,
        fontSize: fontSize.startsWith("clamp") ? "1.75rem" : fontSize,
        lineHeight,
        letterSpacing,
      }}
    >
      Aa
    </span>
  );
}

export function DesignTokens() {
  const { language } = useLanguage();
  const t = sectionCopy[language];

  const brandColors = [
    ...getColorsForGroup("brand"),
    ...getColorsForGroup("semantic").filter((c) =>
      ["--primary", "--primary-foreground", "--destructive"].includes(c.cssVar)
    ),
    ...getColorsForGroup("neutral").filter((c) =>
      [
        "--background",
        "--foreground",
        "--muted",
        "--muted-foreground",
        "--border",
      ].includes(c.cssVar)
    ),
  ];

  const matteColors = [
    ...getColorsForGroup("surface"),
    ...getColorsForGroup("logo").filter((c) =>
      ["--logo-surface", "--logo-plate"].includes(c.cssVar)
    ),
  ];

  const statColors = getColorsForGroup("stat");

  const brandGradient = effectTokens.find(
    (e) => e.path === "effect.brand-gradient"
  );

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
                key={color.path}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <ColorSwatch
                  name={color.name}
                  value={color.value}
                  variable={color.cssVar}
                  path={color.path}
                  description={color.description}
                />
              </motion.div>
            ))}
          </div>
          {brandGradient && (
            <div
              className="mt-6 p-4 rounded-xl border border-[color:var(--logo-surface-border)] text-white text-sm font-medium space-y-1"
              style={{ backgroundImage: brandGradient.value }}
            >
              <p className="font-mono text-xs opacity-90">{brandGradient.path}</p>
              <p className="font-mono text-[11px] opacity-80 break-all">
                {brandGradient.cssVar} · {brandGradient.value}
              </p>
              {brandGradient.description && (
                <p className="text-xs opacity-90 pt-1">{brandGradient.description}</p>
              )}
            </div>
          )}
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
                key={color.path}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <ColorSwatch
                  name={color.name}
                  value={color.value}
                  variable={color.cssVar}
                  path={color.path}
                  description={color.description}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            badge="KPI"
            badgeIcon={Sparkles}
            title={t.statTitle}
            description={t.statDesc}
            align="left"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {statColors.map((color, index) => (
              <motion.div
                key={color.path}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <ColorSwatch
                  name={color.name}
                  value={color.value}
                  variable={color.cssVar}
                  path={color.path}
                />
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
            {typographyTokens.map((type, index) => (
              <TokenDisplay
                key={type.path}
                name={`${type.name} · ${type.path}`}
                value={`${type.fontFamily} · ${type.fontWeight} · ${type.fontSize} / ${type.lineHeight} · ${type.letterSpacing}`}
                example={
                  <TypePreview
                    fontFamily={type.fontFamily}
                    fontWeight={type.fontWeight}
                    fontSize={type.fontSize}
                    lineHeight={type.lineHeight}
                    letterSpacing={type.letterSpacing}
                  />
                }
                index={index}
              />
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
            {spacingTokens.map((space, index) => (
              <TokenDisplay
                key={space.path}
                name={`${space.name}${space.description ? ` · ${space.description}` : ""}`}
                value={`${space.px}px · ${space.path} · ${space.cssVar}`}
                example={
                  <div
                    className="h-4 bg-primary rounded shrink-0"
                    style={{ width: Math.min(space.px, 64) }}
                    aria-hidden
                  />
                }
                index={index}
              />
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
            {radiusTokens.map((radius, index) => (
              <TokenDisplay
                key={radius.path}
                name={`${radius.name}${radius.description ? ` · ${radius.description}` : ""}`}
                value={`${radius.px === 9999 ? "9999" : radius.px}px · ${radius.path}`}
                example={
                  <div
                    className="w-12 h-12 bg-primary shrink-0"
                    style={{
                      borderRadius:
                        radius.px === 9999 ? "9999px" : `${Math.min(radius.px, 24)}px`,
                    }}
                    aria-hidden
                  />
                }
                index={index}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            badge={language === "es" ? "Efectos" : "Effects"}
            badgeIcon={Sparkles}
            title={t.effectsTitle}
            description={t.effectsDesc}
            align="left"
          />
          <div className="space-y-2">
            {effectTokens.map((effect, index) => (
              <TokenDisplay
                key={effect.path}
                name={`${effect.name} · ${effect.path}`}
                value={effect.value}
                example={
                  effect.type === "gradient" ? (
                    <div
                      className="w-12 h-8 rounded-md border border-border shrink-0"
                      style={{ backgroundImage: effect.value }}
                      aria-hidden
                    />
                  ) : (
                    <div
                      className="w-12 h-8 rounded-md bg-card border border-border shrink-0"
                      style={{ boxShadow: effect.value }}
                      aria-hidden
                    />
                  )
                }
                index={index}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            badge="Motion"
            badgeIcon={Timer}
            title={t.motionTitle}
            description={t.motionDesc}
            align="left"
          />
          <div className="grid sm:grid-cols-2 gap-2">
            {motionTokens.map((m, index) => (
              <TokenDisplay
                key={m.path}
                name={`${m.name} · ${m.path}`}
                value={`${m.value} · ${m.cssVar}`}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
