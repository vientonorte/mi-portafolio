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
    title: "Identidad · Viento Norte",
    description:
      "Isologo + lockup para lectura <10s. Mismas reglas en landing SEM (#/consultoria), nav, dock liquid y export Figma.",
    variantsTitle: "Variantes",
    markOnly: "Isologo + plato mate · interactive (hover arco 22°) — nav, dock, SEM",
    full: "Lockup Chillax «Viento Norte» + rol — header desktop y menú",
    usageTitle: "Uso en producto / SEM",
    usageLead:
      "Gradiente solo en acentos (~10%). En tour SEM: plate floating + interactive + tone onDark. Clientes en wordmark-sm matte.",
    rulesTitle: "Reglas de aplicación e interacción",
    dos: [
      "interactive={true} en nav, dock liquid y header SEM (arco gira 22° en hover/focus)",
      "plate=\"floating\" en dock y superficies oscuras; plato mate para legibilidad",
      "Wordmark «Viento Norte» + rol UXtech en lockup editorial",
      "Gradiente solo en CTAs, arco/núcleo del isologo y highlights (~10%)",
      "prefers-reduced-motion: sin rotación del arco",
    ],
    donts: [
      "No isologo estático sin interactive en CTAs o nav (rompe sistema DS)",
      "No Lucide + isologo + label decorativo en el mismo dock CTA",
      "No gradiente masivo en fondos de card",
      "No wordmark «mi-portafolio» ni jerga ops en lockup de marca",
    ],
    sampleMetric: "−40%",
    sampleDesc: "onboarding SURA",
    sampleCompany: "SURA Investments",
  },
  en: {
    badge: "Brand",
    title: "Identity · Viento Norte",
    description:
      "Mark + lockup for <10s scan. Same rules on SEM landing (#/consultoria), nav, liquid dock, and Figma export.",
    variantsTitle: "Variants",
    markOnly: "Mark + matte plate · interactive (hover arc 22°) — nav, dock, SEM",
    full: "Chillax lockup «Viento Norte» + role — desktop header and menu",
    usageTitle: "In-product / SEM usage",
    usageLead:
      "Gradient for accents only (~10%). SEM tour: floating plate + interactive + onDark tone. Clients as wordmark-sm matte.",
    rulesTitle: "Application & interaction rules",
    dos: [
      "interactive={true} on nav, liquid dock, and SEM header (arc rotates 22° on hover/focus)",
      "plate=\"floating\" on dock and dark surfaces; matte plate for legibility",
      "«Viento Norte» wordmark + UXtech role in editorial lockup",
      "Gradient only on CTAs, mark arc/core, and key highlights (~10%)",
      "prefers-reduced-motion: no arc rotation",
    ],
    donts: [
      "No static mark without interactive on CTAs or nav (breaks DS system)",
      "Do not stack Lucide + mark + decorative label on the same dock CTA",
      "Do not flood card backgrounds with the gradient",
      "No «mi-portafolio» wordmark or ops jargon in brand lockup",
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
    <section className="section-pad-default bg-surface-matte" aria-labelledby="brand-heading">
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
                <LogoMark size={40} interactive />
                <p className="text-sm text-muted-foreground">{t.markOnly}</p>
              </div>
              <Logo size="md" interactive />
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