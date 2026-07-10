import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useState } from "react";
import { Button } from '../ui/button';
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "../../lib/LanguageContext";

export interface FigmaSpec {
  /** Nombre del component set en Figma */
  componentSet?: string;
  /** Variantes (ej. variant=Primary, size=md) */
  variants?: string[];
  /** Estados a diseñar */
  states?: string[];
  /** Tokens CSS / Figma paths usados */
  tokens?: string[];
  /** Dimensiones / layout notes */
  layout?: string;
  /** Notas a11y */
  a11y?: string;
}

interface ComponentShowcaseProps {
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
  /** Specs Figma-ready (anatomy, variants, tokens) */
  figma?: FigmaSpec;
  index?: number;
}

export function ComponentShowcase({
  title,
  description,
  preview,
  code,
  figma,
  index = 0,
}: ComponentShowcaseProps) {
  const [copied, setCopied] = useState<"code" | "figma" | null>(null);
  const { language } = useLanguage();
  const es = language === "es";
  const hasFigma = Boolean(figma);

  const handleCopy = (kind: "code" | "figma", text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(kind);
    toast.success(es ? "Copiado" : "Copied");
    setTimeout(() => setCopied(null), 2000);
  };

  const figmaBlock = figma
    ? [
        figma.componentSet && `Component set: ${figma.componentSet}`,
        figma.variants?.length && `Variants:\n${figma.variants.map((v) => `  · ${v}`).join("\n")}`,
        figma.states?.length && `States:\n${figma.states.map((s) => `  · ${s}`).join("\n")}`,
        figma.tokens?.length && `Tokens:\n${figma.tokens.map((t) => `  · ${t}`).join("\n")}`,
        figma.layout && `Layout: ${figma.layout}`,
        figma.a11y && `A11y: ${figma.a11y}`,
      ]
        .filter(Boolean)
        .join("\n\n")
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="preview" className="w-full">
            <TabsList
              className={`grid w-full ${hasFigma ? "grid-cols-3" : "grid-cols-2"}`}
            >
              <TabsTrigger value="preview">
                {es ? "Vista previa" : "Preview"}
              </TabsTrigger>
              <TabsTrigger value="code">{es ? "Código" : "Code"}</TabsTrigger>
              {hasFigma && (
                <TabsTrigger value="figma">Figma</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <div className="p-6 md:p-8 border rounded-lg bg-muted/30 flex items-center justify-center min-h-[200px]">
                {preview}
              </div>
            </TabsContent>

            <TabsContent value="code" className="mt-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleCopy("code", code)}
                  aria-label={es ? "Copiar código" : "Copy code"}
                >
                  {copied === "code" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto text-xs md:text-sm">
                  <code>{code}</code>
                </pre>
              </div>
            </TabsContent>

            {hasFigma && (
              <TabsContent value="figma" className="mt-4">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => handleCopy("figma", figmaBlock)}
                    aria-label={es ? "Copiar specs Figma" : "Copy Figma specs"}
                  >
                    {copied === "figma" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto text-xs md:text-sm whitespace-pre-wrap">
                    <code>{figmaBlock}</code>
                  </pre>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
