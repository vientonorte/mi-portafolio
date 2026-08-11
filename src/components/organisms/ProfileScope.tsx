import { motion, useReducedMotion } from "motion/react";
import { Globe2, Cpu, LayoutPanelLeft, Map } from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { TrajectoryRail } from "./TrajectoryRail";
import { useLanguage } from "../../lib/LanguageContext";
import { cn } from "../../lib/utils";

/**
 * L2 de card-sort: alcance del perfil.
 * Va DESPUÉS de “Método en una mirada” (Skills), no compite con el wall.
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
            ? "Nacional, regional e internacional — en paralelo a Viento Norte."
            : "National, regional, and international — alongside Viento Norte."
        }
      />

      <ul
        className="mb-8 grid gap-2 sm:grid-cols-3"
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
    </PageSection>
  );
}
