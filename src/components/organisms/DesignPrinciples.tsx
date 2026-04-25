import { motion } from "motion/react";
import { SectionHeader } from "../molecules/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from '@vientonorte/ui/card';
import { 
  Accessibility, 
  Smartphone, 
  Zap, 
  Users, 
  Layers,
  Target,
  BookOpen
} from "lucide-react";

const principles = [
  {
    icon: Accessibility,
    title: "Accesibilidad Primero",
    description: "WCAG 2.1 AA compliant. Todos los componentes son navegables por teclado y compatibles con lectores de pantalla.",
    examples: [
      "Roles ARIA semánticos",
      "Contraste de color ≥ 4.5:1",
      "Focus visible en todos los elementos",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Diseño responsive que prioriza la experiencia móvil con breakpoints optimizados.",
    examples: [
      "Breakpoints: 640px, 768px, 1024px, 1280px",
      "Touch targets mínimo 44x44px",
      "Navegación adaptativa",
    ],
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Componentes optimizados para carga rápida y animaciones fluidas a 60fps.",
    examples: [
      "Motion con GPU acceleration",
      "Lazy loading de imágenes",
      "Code splitting por componente",
    ],
  },
  {
    icon: Layers,
    title: "Atomic Design",
    description: "Arquitectura modular y escalable basada en átomos, moléculas y organismos.",
    examples: [
      "Atoms: Botones, badges, inputs",
      "Molecules: Cards, forms, headers",
      "Organisms: Navigation, sections",
    ],
  },
  {
    icon: Users,
    title: "Diseño Centrado en Usuario",
    description: "Componentes diseñados a partir de research y testing con usuarios reales.",
    examples: [
      "Patrones de UI familiares",
      "Feedback visual inmediato",
      "Mensajes de error claros",
    ],
  },
  {
    icon: Target,
    title: "Consistencia",
    description: "Sistema de diseño unificado con tokens y variables reutilizables.",
    examples: [
      "Design tokens centralizados",
      "Nomenclatura predecible",
      "Documentación completa",
    ],
  },
];

const usage = [
  {
    title: "Instalación de Componentes",
    code: `import { Button } from "./components/ui/button"
import { Card } from '@vientonorte/ui/card'`,
  },
  {
    title: "Uso de Design Tokens",
    code: `/* En tu CSS */
.element {
  color: var(--primary);
  border-radius: var(--radius);
}`,
  },
  {
    title: "Extensión de Componentes",
    code: `<Button 
  variant="outline" 
  size="lg"
  className="custom-class"
>
  Click me
</Button>`,
  },
];

export function DesignPrinciples() {
  return (
    <section className="py-16 md:py-24 px-4" aria-labelledby="principles-heading">
      <div className="container max-w-6xl mx-auto space-y-16 md:space-y-24">
        {/* Principles */}
        <div>
          <SectionHeader
            badge="Fundamentos"
            badgeIcon={BookOpen}
            title="Principios de Diseño"
            description="Los valores que guían cada decisión en nuestro sistema de diseño"
            align="left"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {principles.map((principle, index) => (
              <motion.article
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <principle.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-base md:text-lg">
                      {principle.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {principle.description}
                    </p>
                    <ul className="space-y-1 text-sm" role="list">
                      {principle.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-2">
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

        {/* Usage Examples */}
        <div>
          <SectionHeader
            badge="Guía"
            title="Cómo Usar el Sistema"
            description="Ejemplos de implementación y mejores prácticas"
            align="left"
          />

          <div className="space-y-4 md:space-y-6">
            {usage.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base md:text-lg">
                      {item.title}
                    </CardTitle>
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
