import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Mail, Link, MapPin, Send, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { SectionHeader } from "../molecules/SectionHeader";
import {
  SITE_CONTACT,
  CONTACT_API_URL,
  getContactMailtoUrl,
} from "../../lib/site-contact";
import { analytics } from "../../lib/analytics";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: SITE_CONTACT.email,
    href: getContactMailtoUrl(),
  },
  {
    icon: MapPin,
    label: "Modalidad",
    value: "Remoto / Híbrido",
  },
];

const socialLinks = [
  {
    icon: Link,
    label: "LinkedIn",
    href: SITE_CONTACT.linkedin,
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: "", // Honeypot field for spam protection
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Por favor ingresa un email válido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot - if filled, it's a bot
    if (formData._gotcha) {
      return;
    }

    if (!validateForm()) {
      toast.error("Por favor corrige los errores en el formulario");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _gotcha: formData._gotcha,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (response.ok && result.ok) {
        analytics.submitContactForm(true);
        toast.success("¡Mensaje enviado correctamente! Te responderé pronto.");
        setFormData({ name: "", email: "", message: "", _gotcha: "" });
        setErrors({});
      } else {
        analytics.submitContactForm(false);
        throw new Error(result.error || "Error en el envío");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      analytics.submitContactForm(false);
      toast.error(
        `No se pudo enviar el mensaje. Escríbeme a ${SITE_CONTACT.email} o usa LinkedIn.`,
      );
    } finally {
      setIsSubmitting(false);
    }
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
      className="py-12 md:py-16 px-4"
      aria-labelledby="contact-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <SectionHeader
            badge="Hablemos"
            badgeIcon={Send}
            title="Conversemos"
            description="Disponible para proyectos freelance y oportunidades full-time"
          />
          <Badge variant="secondary" className="mt-4">
            <Clock className="mr-2 h-3 w-3" />
            Respuesta típica: menos de 24h
          </Badge>
        </div>

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
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`transition-all focus:ring-2 focus:ring-primary ${errors.name ? "border-destructive" : ""}`}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-sm text-destructive mt-1">
                          {errors.name}
                        </p>
                      )}
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
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`transition-all focus:ring-2 focus:ring-primary ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive mt-1">
                          {errors.email}
                        </p>
                      )}
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
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`transition-all focus:ring-2 focus:ring-primary resize-none ${errors.message ? "border-destructive" : ""}`}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-destructive mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Honeypot field - hidden from users, for spam protection */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={handleChange}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

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