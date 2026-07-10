import { SectionHeader } from "../molecules/SectionHeader";
import { ComponentShowcase, type FigmaSpec } from "../molecules/ComponentShowcase";
import { Button } from '../ui/button';
import { Input } from "../ui/input";
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Checkbox } from '../ui/checkbox';
import { Slider } from "../ui/slider";
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Package, Info } from "lucide-react";
import { Logo } from "../atoms/Logo";
import { BarChart3 } from "lucide-react";
import { HeroResultCard } from "../atoms/HeroResultCard";
import { ImpactMetricCard } from "../molecules/ImpactMetricCard";
import { useLanguage } from "../../lib/LanguageContext";

/** Specs compartidos ES/EN — handoff Figma 1:1 */
const figmaSpecs = {
  logo: {
    componentSet: "Logo / RG",
    variants: ["size=sm|md|lg", "showText=true|false", "mark-only"],
    states: ["default", "hover (interactive)", "focus-visible"],
    tokens: [
      "color.brand.red / --brand-red",
      "color.logo.plate / --logo-plate",
      "effect.logo-plate-shadow",
      "typography: Chillax Medium/Bold",
    ],
    layout: "Mark 32–64px · plate radius radius.sm · gap mark↔wordmark 8px",
    a11y: "Focus ring 2px primary · target ≥ 44px si es control",
  },
  heroResult: {
    componentSet: "HeroResultCard",
    variants: ["withLogo", "metric emphasis"],
    states: ["default", "hover"],
    tokens: [
      "color.surface.matte-elevated",
      "color.logo.surface-border",
      "typography.display for metric (mono/bold)",
      "color.neutral.muted-foreground",
    ],
    layout: "Card padding 16–20px · gap 8px · logo wordmark-sm flat",
    a11y: "Contraste métrica ≥ 4.5:1 · sin glass/blur",
  },
  impact: {
    componentSet: "ImpactMetricCard",
    variants: ["collapsed", "expanded (spoiler)", "tint=blue|amber|rose|violet"],
    states: ["default", "hover", "focus", "pressed/tap"],
    tokens: [
      "color.stat.*",
      "color.surface.matte-elevated",
      "radius.xl",
      "spacing.4–6",
    ],
    layout: "Min height ~120px · icon 40px · spoiler reveal on hover/tap",
    a11y: "Keyboard activable · spoiler no solo por color · touch ≥ 44px",
  },
  button: {
    componentSet: "Button",
    variants: [
      "variant=Primary|Secondary|Outline|Ghost|Destructive",
      "size=sm|md|lg",
    ],
    states: ["default", "hover", "focus-visible", "disabled", "loading (optional)"],
    tokens: [
      "color.semantic.primary",
      "color.semantic.primary-foreground",
      "radius.md",
      "spacing.2–4 padding",
    ],
    layout: "Height sm 36 / md 40 / lg 44+ · padding-x 12–16",
    a11y: "Focus outline 2px · disabled aria · min height 44px en touch",
  },
  badge: {
    componentSet: "Badge",
    variants: ["variant=Default|Secondary|Outline|Destructive"],
    states: ["default"],
    tokens: ["radius.full", "typography.caption", "color.semantic.*"],
    layout: "Height ~22–24px · padding-x 8–10 · pill",
    a11y: "No usar solo color para significado",
  },
  card: {
    componentSet: "Card",
    variants: ["elevated matte", "default"],
    states: ["default", "hover (border primary/20)"],
    tokens: [
      "color.surface.matte-elevated",
      "color.logo.surface-border",
      "radius.xl",
      "spacing.4–6",
    ],
    layout: "Header gap 4 · Content padding 24 · shadow none en matte",
    a11y: "Contraste título/body · estructura heading",
  },
  input: {
    componentSet: "Input",
    variants: ["default", "disabled"],
    states: ["default", "hover", "focus", "disabled", "error (optional)"],
    tokens: [
      "color.neutral.border",
      "color.neutral.muted",
      "--input-background",
      "radius.md",
    ],
    layout: "Height 40–44px · full width · padding-x 12",
    a11y: "Label asociado · focus visible · error con texto",
  },
  alert: {
    componentSet: "Alert",
    variants: ["info", "default"],
    states: ["default"],
    tokens: ["color.neutral.border", "radius.lg", "spacing.4"],
    layout: "Icon 16 + title + description · gap 12 · padding 16",
    a11y: "role=alert si es dinámico · icono no solo decorativo si comunica estado",
  },
} satisfies Record<string, FigmaSpec>;

const componentExamples = {
  es: [
  {
    title: "Marca RG",
    description: "Isologo minimalista y wordmark Arquitecto UX",
    preview: (
      <div className="flex flex-wrap items-center gap-8">
        <Logo size="sm" />
        <Logo size="md" showText={false} />
      </div>
    ),
    code: `<Logo size="md" />
<LogoMark size={32} />`,
    figma: figmaSpecs.logo,
  },
  {
    title: "Indicador hero",
    description: "Métrica + logo cliente (wordmark-sm flat)",
    preview: (
      <div className="max-w-xs">
        <HeroResultCard
          metric="−40%"
          description="onboarding SURA"
          company="SURA Investments"
        />
      </div>
    ),
    code: `<HeroResultCard
  metric="−40%"
  description="onboarding SURA"
  company="SURA Investments"
/>`,
    figma: figmaSpecs.heroResult,
  },
  {
    title: "KPI interactivo (Impacto)",
    description: "Spoiler en hover/tap + enlace a fase del framework",
    preview: (
      <div className="max-w-sm w-full">
        <ImpactMetricCard
          value="−40%"
          label="Abandono en onboarding"
          description="SURA Ecosistema — 7-11 min vs 15+"
          spoiler="Analytics de abandono paso a paso en el funnel Hazte cliente."
          phase="UX Analytics"
          company="SURA"
          processId="ux-analytics"
          icon={BarChart3}
          valueColor="text-stat-tint-blue"
          iconBg="bg-stat-tint-blue"
          viewPhaseLabel="Ver fase"
          tapHint="Toca para ver contexto"
          tapNavigate="Toca de nuevo para abrir la fase"
          expanded={false}
          href="#/proceso/fase/ux-analytics"
          onActivate={() => undefined}
        />
      </div>
    ),
    code: `<ImpactMetricCard
  value="−40%"
  label="Abandono en onboarding"
  spoiler="…"
  phase="UX Analytics"
  company="SURA"
  href="#/proceso/fase/ux-analytics"
  onActivate={handleOpenPhase}
/>`,
    figma: figmaSpecs.impact,
  },
  {
    title: "Buttons",
    description: "Botones con múltiples variantes y tamaños",
    preview: (
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    ),
    code: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`,
    figma: figmaSpecs.button,
  },
  {
    title: "Badges",
    description: "Insignias para etiquetar y categorizar",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    ),
    code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`,
    figma: figmaSpecs.badge,
  },
  {
    title: "Cards",
    description: "Contenedores versátiles para información",
    preview: (
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This is the card content area.
          </p>
        </CardContent>
      </Card>
    ),
    code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>`,
    figma: figmaSpecs.card,
  },
  {
    title: "Inputs",
    description: "Campos de entrada de texto",
    preview: (
      <div className="w-full max-w-sm space-y-3">
        <Input placeholder="Default input" />
        <Input placeholder="Disabled input" disabled />
      </div>
    ),
    code: `<Input placeholder="Default input" />
<Input placeholder="Disabled" disabled />`,
    figma: figmaSpecs.input,
  },
  {
    title: "Form Controls",
    description: "Controles de formulario interactivos",
    preview: (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Switch id="switch" />
          <label htmlFor="switch" className="text-sm">Switch control</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="checkbox" />
          <label htmlFor="checkbox" className="text-sm">Checkbox control</label>
        </div>
        <div className="w-full max-w-sm">
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      </div>
    ),
    code: `<Switch id="switch" />
<Checkbox id="checkbox" />
<Slider defaultValue={[50]} max={100} />`,
  },
  {
    title: "Alerts",
    description: "Mensajes de notificación y estado",
    preview: (
      <Alert className="max-w-sm">
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This is an informational alert message.
        </AlertDescription>
      </Alert>
    ),
    code: `<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    Message content
  </AlertDescription>
</Alert>`,
    figma: figmaSpecs.alert,
  },
  {
    title: "Avatars",
    description: "Imágenes de perfil de usuario",
    preview: (
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </div>
    ),
    code: `<Avatar>
  <AvatarImage src="url" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
  },
  ],
  en: [
  {
    title: "RG brand",
    description: "Minimal mark and UX Architect wordmark",
    preview: (
      <div className="flex flex-wrap items-center gap-8">
        <Logo size="sm" />
        <Logo size="md" showText={false} />
      </div>
    ),
    code: `<Logo size="md" />
<LogoMark size={32} />`,
    figma: figmaSpecs.logo,
  },
  {
    title: "Hero indicator",
    description: "Metric + client logo (wordmark-sm flat)",
    preview: (
      <div className="max-w-xs">
        <HeroResultCard
          metric="−40%"
          description="SURA onboarding"
          company="SURA Investments"
        />
      </div>
    ),
    code: `<HeroResultCard
  metric="−40%"
  description="SURA onboarding"
  company="SURA Investments"
/>`,
    figma: figmaSpecs.heroResult,
  },
  {
    title: "Interactive KPI (Impact)",
    description: "Spoiler on hover/tap + link to framework phase",
    preview: (
      <div className="max-w-sm w-full">
        <ImpactMetricCard
          value="−40%"
          label="Onboarding drop-off"
          description="SURA Ecosystem — 7-11 min vs 15+"
          spoiler="Step-by-step abandonment analytics in the signup funnel."
          phase="UX Analytics"
          company="SURA"
          processId="ux-analytics"
          icon={BarChart3}
          valueColor="text-stat-tint-blue"
          iconBg="bg-stat-tint-blue"
          viewPhaseLabel="View phase"
          tapHint="Tap to see context"
          tapNavigate="Tap again to open phase"
          expanded={false}
          href="#/proceso/fase/ux-analytics"
          onActivate={() => undefined}
        />
      </div>
    ),
    code: `<ImpactMetricCard
  value="−40%"
  label="Onboarding drop-off"
  spoiler="…"
  phase="UX Analytics"
  company="SURA"
  href="#/proceso/fase/ux-analytics"
  onActivate={handleOpenPhase}
/>`,
    figma: figmaSpecs.impact,
  },
  {
    title: "Buttons",
    description: "Buttons with multiple variants and sizes",
    preview: (
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    ),
    code: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`,
    figma: figmaSpecs.button,
  },
  {
    title: "Badges",
    description: "Labels for tags and categories",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    ),
    code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`,
    figma: figmaSpecs.badge,
  },
  {
    title: "Cards",
    description: "Versatile content containers",
    preview: (
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Card content area.</p>
        </CardContent>
      </Card>
    ),
    code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>`,
    figma: figmaSpecs.card,
  },
  {
    title: "Inputs",
    description: "Text fields",
    preview: (
      <div className="w-full max-w-sm space-y-3">
        <Input placeholder="Default input" />
        <Input placeholder="Disabled input" disabled />
      </div>
    ),
    code: `<Input placeholder="Default input" />
<Input placeholder="Disabled" disabled />`,
    figma: figmaSpecs.input,
  },
  {
    title: "Form controls",
    description: "Interactive form elements",
    preview: (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Switch id="switch-en" />
          <label htmlFor="switch-en" className="text-sm">Switch control</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="checkbox-en" />
          <label htmlFor="checkbox-en" className="text-sm">Checkbox control</label>
        </div>
        <div className="w-full max-w-sm">
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
      </div>
    ),
    code: `<Switch id="switch" />
<Checkbox id="checkbox" />
<Slider defaultValue={[50]} max={100} />`,
  },
  {
    title: "Alerts",
    description: "Status and notification messages",
    preview: (
      <Alert className="max-w-sm">
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>Informational alert message.</AlertDescription>
      </Alert>
    ),
    code: `<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>Message</AlertDescription>
</Alert>`,
    figma: figmaSpecs.alert,
  },
  {
    title: "Avatars",
    description: "Profile images",
    preview: (
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </div>
    ),
    code: `<Avatar>
  <AvatarImage src="url" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
  },
  ],
} as const;

export function ComponentsLibrary() {
  const { language } = useLanguage();
  const examples = componentExamples[language];

  return (
    <section className="py-16 md:py-24 px-4 bg-surface-section" aria-labelledby="components-heading">
      <div className="container max-w-6xl mx-auto">
        <SectionHeader
          badge="UI Kit"
          badgeIcon={Package}
          title={language === "es" ? "Biblioteca de componentes" : "Component library"}
          description={
            language === "es"
              ? "Átomos y moléculas en producción · pestaña Figma con variants, estados y tokens"
              : "Production atoms and molecules · Figma tab with variants, states, and tokens"
          }
          align="left"
        />

        <div className="grid gap-6 md:gap-8">
          {examples.map((component, index) => (
            <ComponentShowcase key={component.title} {...component} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
