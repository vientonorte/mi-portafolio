import { SectionHeader } from "../molecules/SectionHeader";
import { ComponentShowcase } from "../molecules/ComponentShowcase";
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
import { HeroResultCard } from "../atoms/HeroResultCard";
import { useLanguage } from "../../lib/LanguageContext";

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
              ? "Átomos y moléculas del landing en producción"
              : "Landing atoms and molecules in production"
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
