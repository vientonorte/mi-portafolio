import { motion, useReducedMotion } from "motion/react";
import { Globe2, Cpu, LayoutPanelLeft, Map } from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { TrajectoryRail } from "./TrajectoryRail";
import { ProfileRadar } from "../molecules/ProfileRadar";
import { useLanguage } from "../../lib/LanguageContext";
import { cn } from "../../lib/utils";

/**
 * L2 alcance: radar del perfil estratégico + prueba compacta + rail.
 */
const PROOF = {
  es: [
    {
      icon: LayoutPanelLeft,
      label: "Interfaces",
      detail: "Producto en empresas CL y wealth regional",
    },
    {
      icon: Globe2,
      label: "Latam + EE.UU.",
      detail: "SURA multi-país · micro1 remoto US",
    },
    {
      icon: Cpu,
      label: "Hoy",
      detail: "UX Manager VN · AI Trainer micro1",
    },
  ],
  en: [
    {
      icon: LayoutPanelLeft,
      label: "Interfaces",
      detail: "Product UI for CL companies and regional wealth",
    },
    {
      icon: Globe2,
      label: "Latam + US",
      detail: "SURA multi-country · micro1 US remote",
    },
    {
      icon: Cpu,
      label: "Now",
      detail: "UX Manager VN · AI Trainer micro1",
    },
  ],
} as const;

export function ProfileScope() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const proof = PROOF[language];
  const es = language === "es";

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true as const },
          transition: { duration: 0.4, delay },
        };

  return (
    <PageSection
      id="alcance"
      padding="compact"
      width="wide"
      tone="section"
      aria-labelledby="scope-heading"
    >
      <SectionHeader
        badge={es ? "Alcance" : "Scope"}
        badgeIcon={Map}
        titleId="scope-heading"
        title={es ? "Dónde sumo" : "Where I add value"}
        description={
          es
            ? "Radar del perfil estratégico: campos donde integro diseño, datos, regulación e IA."
            : "Strategic profile radar: fields where I integrate design, data, regulation, and AI."
        }
      />

      <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
        <motion.div {...fadeUp(0)} className="order-2 lg:order-1">
          <ProfileRadar />
          <p className="mt-3 text-center text-[11px] text-muted-foreground lg:text-left">
            {es
              ? "Toca un eje para el detalle. Escala 1–5 según trayectoria (SURA, DS, a11y, micro1, VN)."
              : "Tap an axis for detail. Scale 1–5 from trajectory (SURA, DS, a11y, micro1, VN)."}
          </p>
        </motion.div>

        <div className="order-1 space-y-6 lg:order-2">
          <ul
            className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1"
            role="list"
            aria-label={es ? "Qué suma el perfil" : "What the profile adds up to"}
          >
            {proof.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.label}
                  {...fadeUp(0.04 * index)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border border-[color:var(--logo-surface-border)] bg-surface-matte-elevated px-3 py-3"
                  )}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="block text-xs text-muted-foreground">
                      {item.detail}
                    </span>
                  </span>
                </motion.li>
              );
            })}
          </ul>

          <TrajectoryRail />
        </div>
      </div>
    </PageSection>
  );
}
