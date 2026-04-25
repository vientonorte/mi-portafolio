import { motion } from "motion/react";
import { Button } from '@vientonorte/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@vientonorte/ui/card';
import { Input } from "../ui/input";
import { Textarea } from '@vientonorte/ui/textarea';
import { Label } from '@vientonorte/ui/label';
import { Mail, Linkedin, Github, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { SectionHeader } from "../molecules/SectionHeader";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "gaete.gaona@gmail.com",
    href: "mailto:gaete.gaona@gmail.com",
  },
  {
    icon: MapPin,
    label: "Modalidad",
    value: "Remoto / Híbrido",
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rodrigogaete",
  },
];

const benefits = [
  "Experiencia en implementación de UX en contextos enterprise",
  "Enfoque en desarrollo evolutivo y resultados medibles",
  "Metodologías: Design Thinking, Design Sprints, Product Design",
  "Experto en Figma, Frameworks y Accesibilidad",
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Mensaje enviado correctamente. Te responderé pronto!");
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section 
      id="contacto"
      className="py-20 md:py-28 px-4"
      aria-labelledby="contact-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge="Hablemos"
          badgeIcon={Send}
          title="Conversemos"
          description="¿Tienes un proyecto en mente? ¿Buscas un Lead UX para tu equipo? Me encantaría conocer más sobre tus necesidades."
        />

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Info */}
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">
                    Información de Contacto
                  </CardTitle>
                  <CardDescription>
                    Disponible para proyectos freelance y oportunidades full-time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href}
                            className="hover:text-primary transition-colors break-all"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="break-words">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Sígueme en</p>
                    <div className="flex gap-2">
                      {socialLinks.map((social) => (
                        <Button 
                          key={social.label}
                          variant="outline" 
                          size="icon"
                          asChild
                          className="hover:border-primary hover:text-primary transition-all"
                        >
                          <a 
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visitar perfil de ${social.label}`}
                          >
                            <social.icon className="h-4 w-4" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl">
                    ¿Por qué trabajar conmigo?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm" role="list">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-primary mt-1 flex-shrink-0" aria-hidden="true">
                          ✓
                        </span>
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  Envíame un mensaje
                </CardTitle>
                <CardDescription>
                  Completa el formulario y te responderé en menos de 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Nombre <span className="text-destructive" aria-label="requerido">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="transition-all focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive" aria-label="requerido">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="transition-all focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Mensaje <span className="text-destructive" aria-label="requerido">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Cuéntame sobre tu proyecto o necesidad..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="transition-all focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-brand-gradient hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 md:mt-24 pt-8 border-t text-center text-sm text-muted-foreground"
          role="contentinfo"
        >
          <p>© 2025 Rodrigo Gaete Gaona · Lead UX Designer. Diseñado con atención al detalle y accesibilidad.</p>
        </motion.footer>
      </div>
    </section>
  );
}