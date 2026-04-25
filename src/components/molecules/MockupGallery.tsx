import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Card } from '@vientonorte/ui/card';
import { AspectRatio } from "../ui/aspect-ratio";
import { Monitor, Smartphone } from "lucide-react";

interface MockupGalleryProps {
  mockups: string[];
  title?: string;
  description?: string;
  language: "es" | "en";
}

export function MockupGallery({ mockups, title, description, language }: MockupGalleryProps) {
  if (!mockups || mockups.length === 0) return null;

  const defaultTitle = language === "es" 
    ? "Evidencias Visuales del Proyecto" 
    : "Project Visual Evidence";

  const defaultDescription = language === "es"
    ? "Mockups de alta fidelidad del diseño UX/UI implementado"
    : "High-fidelity mockups of the implemented UX/UI design";

  return (
    <section 
      className="py-16 md:py-24 px-4 scroll-mt-20" 
      aria-labelledby="mockups-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Monitor className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {language === "es" ? "Mockups" : "Mockups"}
            </span>
          </div>

          <h2 id="mockups-heading" className="text-3xl md:text-4xl mb-4">
            {title || defaultTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description || defaultDescription}
          </p>
        </motion.div>

        <div className="grid gap-8">
          {mockups.map((mockupUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-2 border-border/40 hover:border-primary/40 transition-all duration-300 group">
                <AspectRatio ratio={16 / 10}>
                  <ImageWithFallback
                    src={mockupUrl}
                    alt={`${language === "es" ? "Mockup del proyecto" : "Project mockup"} ${index + 1}`}
                    className="w-full h-full object-contain bg-muted/30 group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </AspectRatio>

                {/* Caption opcional */}
                <div className="px-6 py-4 bg-muted/30 border-t">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    <span>
                      {language === "es" 
                        ? `Vista de diseño ${index + 1} de ${mockups.length}`
                        : `Design view ${index + 1} of ${mockups.length}`
                      }
                    </span>
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
