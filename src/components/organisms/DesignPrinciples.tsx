import { motion } from "motion/react";
import { SectionHeader } from "../molecules/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Accessibility,
  BarChart3,
  Building2,
  Layers,
  Target,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

const principles = {
  es: [
    {
      icon: Target,
      title: "Especialización en <10s",
      description:
        "El hero comunica nicho (Fintech & Mobility), métricas y CTA a negocios sin copy genérico.",
      examples: [
        "Headline + badges de especialización",
        "Cards de resultado con KPI (−40%, NPS 72)",
        "CTA primario → /proyectos",
      ],
    },
    {
      icon: BarChart3,
      title: "Evidencia medible",
      description:
        "Cada claim del landing tiene número, empresa y ruta a caso o proceso UX.",
      examples: [
        "HeroResultCard + ImpactStats enlazados",
        "Flagship Karri con 5 macroprocesos",
        "Métricas en cards de caso",
      ],
    },
    {
      icon: Building2,
      title: "Prueba social",
      description:
        "Logos de cliente legibles y recomendaciones LinkedIn con rol y tenure reales.",
      examples: [
        "wordmark-sm + flat en cards matte",
        "Testimonios con metadata verificable",
        "Experiencia con logo + resumen KPI",
      ],
    },
    {
      icon: Sparkles,
      title: "Superficies mate",
      description:
        "Warm neutrals en métricas y testimonios; gradiente reservado al ~10% (CTAs, acento RG).",
      examples: [
        "--surface-matte-elevated en cards",
        "--logo-surface solo fuera de cards",
        "Sin glass/blur en indicadores",
      ],
    },
    {
      icon: Accessibility,
      title: "Accesibilidad WCAG 2.2 AA",
      description: "Contraste, teclado, landmarks y touch targets como baseline SURA.",
      examples: [
        "Contraste ≥ 4.5:1 en texto",
        "Focus visible y skip-link",
        "Touch targets ≥ 44px",
      ],
    },
    {
      icon: Layers,
      title: "Atomic Design",
      description: "Átomos reutilizables (Logo, CompanyLogo, HeroResultCard) componen el landing.",
      examples: [
        "Logo horizontal en nav desktop; LogoMark en mobile y subpage toolbar",
        "SectionHeader + Card en secciones",
        "i18n ES/EN centralizado",
      ],
    },
    {
      icon: Target,
      title: "4 roles · checklist de código",
      description:
        "Producto/PM, Design Ops, Datos/perímetro y Fundador: data única con hero. Campañas se activan con código listo (deep links, SEO técnico), no con plan de medios en la UI.",
      examples: [
        "consultoria-hero-roles.ts como fuente única",
        "Path 2×2 en hero sin métricas meta",
        "DS #audience-roles = checklist de implementación",
      ],
    },
  ],
  en: [
    {
      icon: Target,
      title: "Specialization in <10s",
      description:
        "Hero states niche (Fintech & Mobility), metrics, and business CTA without generic copy.",
      examples: [
        "Headline + specialization badges",
        "Result cards with KPIs (−40%, NPS 72)",
        "Primary CTA → /proyectos",
      ],
    },
    {
      icon: BarChart3,
      title: "Measurable evidence",
      description:
        "Every landing claim has a number, company, and path to a case or UX process.",
      examples: [
        "HeroResultCard + ImpactStats linked",
        "Karri flagship with 5 macro-processes",
        "Metrics on case cards",
      ],
    },
    {
      icon: Building2,
      title: "Social proof",
      description:
        "Readable client logos and LinkedIn recommendations with real role and tenure.",
      examples: [
        "wordmark-sm + flat on matte cards",
        "Testimonials with verifiable metadata",
        "Experience with logo + KPI summary",
      ],
    },
    {
      icon: Sparkles,
      title: "Matte surfaces",
      description:
        "Warm neutrals on metrics and testimonials; gradient reserved to ~10% (CTAs, RG accent).",
      examples: [
        "--surface-matte-elevated on cards",
        "--logo-surface only outside cards",
        "No glass/blur on indicators",
      ],
    },
    {
      icon: Accessibility,
      title: "WCAG 2.2 AA accessibility",
      description: "Contrast, keyboard, landmarks, and touch targets as SURA baseline.",
      examples: [
        "Contrast ≥ 4.5:1 on text",
        "Visible focus and skip-link",
        "Touch targets ≥ 44px",
      ],
    },
    {
      icon: Layers,
      title: "Atomic Design",
      description: "Reusable atoms (Logo, CompanyLogo, HeroResultCard) compose the landing.",
      examples: [
        "Horizontal logo in desktop nav; LogoMark in mobile and subpage toolbar",
        "SectionHeader + Card in sections",
        "Centralized ES/EN i18n",
      ],
    },
    {
      icon: Target,
      title: "4 roles · code checklist",
      description:
        "Product/PM, Design Ops, Data/perimeter, and Founder: single source with hero. Campaigns use ready code (deep links, technical SEO) — no media plan in the UI.",
      examples: [
        "consultoria-hero-roles.ts as single source",
        "2×2 path in hero without meta metrics",
        "DS #audience-roles = implementation checklist",
      ],
    },
  ],
} as const;

const usage = {
  es: [
    {
      title: "Marca RG",
      code: `import { LogoMark, Logo } from '../atoms/Logo'

<LogoMark size={32} />
<Logo size="md" />`,
    },
    {
      title: "Logos de cliente",
      code: `<CompanyLogoFromName
  company="SURA Investments"
  size="wordmark-sm"
  flat
/>`,
    },
    {
      title: "Tokens matte",
      code: `.card-metric {
  background: var(--surface-matte-elevated);
  border-color: var(--logo-surface-border);
}`,
    },
  ],
  en: [
    {
      title: "RG brand",
      code: `import { LogoMark, Logo } from '../atoms/Logo'

<LogoMark size={32} />
<Logo size="md" />`,
    },
    {
      title: "Client logos",
      code: `<CompanyLogoFromName
  company="SURA Investments"
  size="wordmark-sm"
  flat
/>`,
    },
    {
      title: "Matte tokens",
      code: `.card-metric {
  background: var(--surface-matte-elevated);
  border-color: var(--logo-surface-border);
}`,
    },
  ],
} as const;

export function DesignPrinciples() {
  const { language } = useLanguage();
  const items = principles[language];
  const guides = usage[language];

  return (
    <section className="section-pad-default" aria-labelledby="principles-heading">
      <div className="container max-w-6xl mx-auto space-y-16 md:space-y-24">
        <div>
          <SectionHeader
            badge={language === "es" ? "Research" : "Research"}
            badgeIcon={BookOpen}
            title={language === "es" ? "Principios del portafolio" : "Portfolio principles"}
            description={
              language === "es"
                ? "Decisiones derivadas de auditoría UX, benchmark recruiter y validación en landing."
                : "Decisions from UX audit, recruiter benchmark, and landing validation."
            }
            align="left"
            titleId="principles-heading"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {items.map((principle, index) => (
              <motion.article
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full bg-surface-matte-elevated border-[color:var(--logo-surface-border)] shadow-none hover:border-primary/20 transition-colors">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <principle.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-base md:text-lg">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                    <ul className="space-y-1 text-sm" role="list">
                      {principle.examples.map((example) => (
                        <li key={example} className="flex items-start gap-2">
                          <span className="text-primary mt-1 flex-shrink-0" aria-hidden="true">
                            •
                          </span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            badge={language === "es" ? "Guía" : "Guide"}
            title={language === "es" ? "Implementación" : "Implementation"}
            description={
              language === "es"
                ? "Patrones usados en producción en este repositorio."
                : "Patterns used in production in this repository."
            }
            align="left"
          />

          <div className="space-y-4 md:space-y-6">
            {guides.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-[color:var(--logo-surface-border)] shadow-none">
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto text-xs md:text-sm">
                      <code>{item.code}</code>
                    </pre>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}