import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@vientonorte/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@vientonorte/ui/tabs';
import { useState } from "react";
import { Button } from '@vientonorte/ui/button';
import { Copy, Check } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ComponentShowcaseProps {
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
  index?: number;
}

export function ComponentShowcase({ 
  title, 
  description, 
  preview, 
  code,
  index = 0 
}: ComponentShowcaseProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Código copiado");
    setTimeout(() => setCopied(false), 2000);
  };

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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">Vista previa</TabsTrigger>
              <TabsTrigger value="code">Código</TabsTrigger>
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
                  onClick={handleCopy}
                  aria-label="Copiar código"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto text-xs md:text-sm">
                  <code>{code}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}
