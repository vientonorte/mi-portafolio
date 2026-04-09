import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ExternalLink, Info } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface ProcessApplied {
  id: string;
  name: string;
  description: string;
  impact: string;
}

interface ProjectShowcaseProps {
  projectName: string;
  role: string;
  period: string;
  description: string;
  image?: string;
  tags: string[];
  processesApplied: ProcessApplied[];
  designComponents?: React.ComponentType[];
  designComponentNames?: string[];
  language?: "es" | "en";
  index?: number;
}

export function ProjectShowcase({
  projectName,
  role,
  period,
  description,
  image,
  tags,
  processesApplied,
  designComponents = [],
  designComponentNames = [],
  language = "es",
  index = 0,
}: ProjectShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const [selectedProcess, setSelectedProcess] = useState<ProcessApplied | null>(null);

  const fadeInVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.article
      variants={fadeInVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
      aria-labelledby={`project-${index}-title`}
    >
      <Card className="border-2 hover:border-primary/50 transition-all overflow-hidden">
        <CardContent className="p-0">
          {/* Project Header */}
          <div className="p-8 bg-muted/30">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 id={`project-${index}-title`} className="text-2xl mb-2">
                  {projectName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  <span className="sr-only">
                    {language === "es" ? "Rol:" : "Role:"}
                  </span>
                  {role} • {period}
                </p>
              </div>
              
              {/* Process Count Badge */}
              <Badge variant="outline" className="bg-primary/10 border-primary/30">
                {processesApplied.length} {language === "es" ? "procesos" : "processes"}
              </Badge>
            </div>

            <p className="text-muted-foreground mb-6">{description}</p>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2 mb-6"
              role="list"
              aria-label={language === "es" ? "Tecnologías y herramientas" : "Technologies and tools"}
            >
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" role="listitem">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Processes Applied - Horizontal Pills */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Info className="h-4 w-4 text-primary" />
                <span className="uppercase tracking-wide">
                  {language === "es" ? "Macroprocesos aplicados:" : "Applied Macro-processes:"}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {processesApplied.map((process) => (
                  <Dialog key={process.id}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-auto py-2 px-3 hover:bg-primary/10 hover:border-primary/50 transition-all"
                      >
                        <span className="text-xs">{process.name}</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{process.name}</DialogTitle>
                        <DialogDescription className="text-base pt-2">
                          {process.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium mb-2">
                          {language === "es" ? "Impacto en el proyecto:" : "Project Impact:"}
                        </h4>
                        <p className="text-muted-foreground">{process.impact}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>

          {/* Design Preview */}
          {designComponents.length > 0 && (
            <div className="border-t border-border">
              <Tabs defaultValue="screen-0" className="w-full">
                <div className="bg-muted/20 px-8 pt-6">
                  <TabsList className="w-full justify-start">
                    {designComponentNames.map((name, idx) => (
                      <TabsTrigger key={idx} value={`screen-${idx}`} className="gap-2">
                        <span>{name}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {designComponents.map((DesignComponent, idx) => (
                  <TabsContent key={idx} value={`screen-${idx}`} className="m-0">
                    <div className="bg-gradient-to-b from-muted/20 to-muted/5 p-8">
                      <div className="mx-auto max-w-sm">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-lg shadow-2xl overflow-hidden border border-border/50"
                        >
                          <DesignComponent />
                        </motion.div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {/* Fallback Image */}
          {designComponents.length === 0 && image && (
            <div className="aspect-video overflow-hidden border-t border-border">
              <img
                src={image}
                alt={`${language === "es" ? "Captura de pantalla del proyecto" : "Project screenshot"}: ${projectName}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.article>
  );
}
