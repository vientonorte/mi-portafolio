import { motion } from "motion/react";
import { SectionHeader } from "../molecules/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Logo, LogoMark } from "../atoms/Logo";
import { CompanyLogoFromName } from "../atoms/CompanyLogoFromName";
import { HeroResultCard } from "../atoms/HeroResultCard";
import { Sparkles, Check, X } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

const copy = {
  es: {
    badge: "Marca",
    title: "Identidad · Rodrigo Gaete",
    description:
      "Isologo minimalista para lectura rápida (<10s) y coherencia con evidencia medible, prueba social y superficies mate del landing.",
    variantsTitle: "Variantes",
    markOnly: "Solo isologo — navegación y favicon",
    full: "Marca completa — presentaciones y hero",
    usageTitle: "Uso en producto",
    usageLead:
      "El gradiente de marca aparece solo en acentos (≈10%). Métricas y logos de cliente usan superficies mate.",
    rulesTitle: "Reglas de aplicación",
    dos: [
      "Isologo RG en nav, toolbar y favicon",
      "Wordmark «Rodrigo Gaete · UX Design Ops» en contextos editoriales",
      "Logos de cliente en wordmark-sm + flat sobre cards matte",
      "Gradiente solo en CTAs, acento del isologo y highlights clave",
    ],
    donts: [
      "No repetir gradiente en fondos de card o iconografía masiva",
      "No mezclar isologo solar legacy ni cajas cuadradas para wordmarks",
      "No duplicar nombre de empresa si el logo ya es legible",
      "No glass/blur sobre métricas — priorizar contraste WCAG 2.2 AA",
    ],
    sampleMetric: "−40%",
    sampleDesc: "onboarding SURA",
    sampleCompany: "SURA Investments",
  },
  en: {
    badge: "Brand",
    title: "Identity · Rodrigo Gaete",
    description:
      "Minimal mark for fast scanning (<10s), aligned with measurable evidence, social proof, and matte landing surfaces.",
    variantsTitle: "Variants",
    markOnly: "Mark only — navigation and favicon",
    full: "Full lockup — decks and hero",
    usageTitle: "In-product usage",
    usageLead:
      "Brand gradient is reserved for accents (~10%). Client logos and metrics sit on matte surfaces.",
    rulesTitle: "Application rules",
    dos: [
      "RG mark in nav, toolbar, and favicon",
      "«Rodrigo Gaete · UX Design Ops» wordmark in editorial contexts",
      "Client logos as wordmark-sm + flat on matte cards",
      "Gradient only on CTAs, mark accent, and key highlights",
    ],
    donts: [
      "Do not flood card backgrounds or icons with the gradient",
      "Do not use legacy sun mark or square boxes for horizontal wordmarks",
      "Do not repeat company names when the logo is already readable",
      "No glass/blur on metrics — keep WCAG 2.2 AA contrast",
    ],
    sampleMetric: "−40%",
    sampleDesc: "SURA onboarding",
    sampleCompany: "SURA Investments",
  },
} as const;

export function BrandIdentity() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="py-16 md:py-24 px-4 bg-surface-matte" aria-labelledby="brand-heading">
      <div className="container max-w-6xl mx-auto space-y-12">
        <SectionHeader
          badge={t.badge}
          badgeIcon={Sparkles}
          title={t.title}
          description={t.description}
          align="left"
          titleId="brand-heading"
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-surface-matte-elevated border-[color:var(--logo-surface-border)] shadow-none">
            <CardHeader>
              <CardTitle className="text-base">{t.variantsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center gap-4">
                <LogoMark size={32} />
                <p className="text-sm text-muted-foreground">{t.markOnly}</p>
              </div>
              <Logo size="md" />
              <p className="text-sm text-muted-foreground">{t.full}</p>
            </CardContent>
          </Card>

          <Card className="bg-surface-matte-elevated border-[color:var(--logo-surface-border)] shadow-none">
            <CardHeader>
              <CardTitle className="text-base">{t.usageTitle}</CardTitle>
              <p className="text-sm text-muted-foreground">{t.usageLead}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <HeroResultCard
                metric={t.sampleMetric}
                description={t.sampleDesc}
                company={t.sampleCompany}
              />
              <div className="flex items-center gap-3 pt-2">
                <CompanyLogoFromName company="Karri" size="wordmark-sm" flat />
                <CompanyLogoFromName company="Transvip" size="wordmark-sm" flat />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">{t.rulesTitle}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-[color:var(--logo-surface-border)] shadow-none">
              <CardContent className="pt-6 space-y-2">
                {t.dos.map((item) => (
                  <p key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden />
                    {item}
                  </p>
                ))}
              </CardContent>
            </Card>
            <Card className="border-[color:var(--logo-surface-border)] shadow-none">
              <CardContent className="pt-6 space-y-2">
                {t.donts.map((item) => (
                  <p key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <X className="h-4 w-4 text-destructive/80 shrink-0 mt-0.5" aria-hidden />
                    {item}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}