import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { User, Lightbulb, Zap } from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";
import { useLanguage } from "../../lib/LanguageContext";

const philosophy = [
  {
    icon: Lightbulb,
    title: { es: "Idea", en: "Idea" },
    description: { 
      es: "Conceptualización y estrategia detrás de cada experiencia. El pensamiento que da forma a la solución.",
      en: "Conceptualization and strategy behind each experience. The thinking that shapes the solution."
    },
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
  },
  {
    icon: Zap,
    title: { es: "Cuerpo", en: "Body" },
    description: { 
      es: "Ejecución tangible e interfaz. La materialización de ideas en productos digitales funcionales.",
      en: "Tangible execution and interface. The materialization of ideas into functional digital products."
    },
    color: "text-rose-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
  },
];

const values = [
  {
    label: { es: "Naturaleza", en: "Nature" },
    description: { 
      es: "Diseño orgánico basado en patrones naturales y comportamientos humanos reales",
      en: "Organic design based on natural patterns and real human behaviors"
    },
  },
  {
    label: { es: "Contemplación", en: "Contemplation" },
    description: { 
      es: "Espacios para reflexión y decisiones informadas, sin presión ni ruido",
      en: "Spaces for reflection and informed decisions, without pressure or noise"
    },
  },
  {
    label: { es: "Creatividad", en: "Creativity" },
    description: { 
      es: "Soluciones innovadoras que rompen convenciones cuando es necesario",
      en: "Innovative solutions that break conventions when necessary"
    },
  },
];

const roles = [
  "Head UX",
  "Lead UX",
  "Product Designer",
  "UI Designer",
  "User Research",
  "Design Thinking Facilitator",
];

export function About() {
  const { language } = useLanguage();

  return (
    <section
      id="sobre-mi"
      className="py-20 md:py-28 px-4 bg-muted/30"
      aria-labelledby="about-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge={language === "es" ? "Sobre mí" : "About me"}
          badgeIcon={User}
          title={language === "es" ? "Lead UX especializado en estrategia digital" : "Lead UX specialized in digital strategy"}
          description=""
        />

        {/* Philosophy: Idea y Cuerpo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="text-center max-w-4xl mx-auto mb-10">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              {language === "es" ? "Filosofía de Diseño" : "Design Philosophy"}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              {language === "es" 
                ? "Inspirado en la naturaleza de las cosas y su relación con el mundo humano, tomo los conceptos de \"Idea\" y \"Cuerpo\" para representar orden y fuerza desde la perspectiva del diseño y sus posibilidades."
                : "Inspired by the nature of things and their relationship with the human world, I take the concepts of \"Idea\" and \"Body\" to represent order and strength from the perspective of design and its possibilities."}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {philosophy.map((item, index) => (
              <motion.div
                key={item.title[language]}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 h-full">
                  {/* Subtle background on hover */}
                  <motion.div
                    className={`absolute inset-0 ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={false}
                  />

                  <CardContent className="p-8 relative">
                    <motion.div
                      className="mb-6"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${item.bgColor} border-2 border-border`}>
                        <item.icon className={`h-8 w-8 ${item.color}`} />
                      </div>
                    </motion.div>

                    <h4 className="text-2xl font-bold mb-3">{item.title[language]}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description[language]}
                    </p>

                    {/* Decorative line with primary color */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
                      className={`mt-6 h-1 bg-primary rounded-full origin-left`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Values inspired by moodboard */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12">
            {values.map((value, index) => (
              <motion.div
                key={value.label[language]}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <h5 className="font-bold text-lg mb-2 text-brand-gradient">
                        {value.label[language]}
                      </h5>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description[language]}
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column - About */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Main description */}
            <div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl leading-relaxed"
              >
                {language === "es" 
                  ? <>Mi rol se centra en la <strong className="text-primary">implementación correcta del diseño de experiencia</strong> en iniciativas tecnológicas regionales y locales.</>
                  : <>My role focuses on <strong className="text-primary">proper implementation of experience design</strong> in regional and local technology initiatives.</>
                }
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground leading-relaxed text-lg"
              >
                {language === "es"
                  ? <>Diseño <strong className="text-foreground">lineamientos de experiencia e interfaz</strong> durante la ideación, estructuración e implementación de nuevas iniciativas.</>
                  : <>I design <strong className="text-foreground">experience and interface guidelines</strong> during ideation, structuring and implementation of new initiatives.</>
                }
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground leading-relaxed text-lg"
              >
                {language === "es"
                  ? <>Adapto <strong className="text-foreground">Design Thinking</strong> a contextos enterprise, combinando research con metodologías ágiles.</>
                  : <>I adapt <strong className="text-foreground">Design Thinking</strong> to enterprise contexts, combining research with agile methodologies.</>
                }
              </motion.p>
            </div>

            {/* Roles Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-semibold">
                    {language === "es" ? "Roles que desempeño" : "Roles I perform"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((role, index) => (
                      <motion.div
                        key={role}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.35 + index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="text-sm px-3 py-1.5 cursor-default hover:bg-primary/10 transition-colors"
                        >
                          {role}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Column - Quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:sticky lg:top-24 space-y-6"
          >
            {/* Main Philosophy Quote - Fusionada */}
            <Card className="relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-500 bg-gradient-to-br from-background to-muted/20">
              {/* Quote background decoration */}
              <div className="absolute -top-4 -right-4 text-primary/5 text-[180px] leading-none select-none pointer-events-none font-serif">
                "
              </div>

              <CardContent className="p-8 md:p-10 relative">
                <motion.blockquote
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6"
                >
                  <p className="text-xl md:text-2xl leading-relaxed">
                    "Como diseñador especialista en experiencias e interfaces, me interesa profundizar en los{" "}
                    <span className="text-primary font-semibold not-italic">valores y filosofía</span>{" "}
                    que inspiran mi trabajo diario."
                  </p>

                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    "El{" "}
                    <span className="text-primary font-semibold not-italic">buen diseño se anticipa a la ley</span>.
                    No diseñamos solo para cumplir regulaciones, sino para{" "}
                    <span className="text-primary font-semibold not-italic">crear experiencias éticas</span>{" "}
                    que respetan la privacidad, accesibilidad y dignidad humana desde el primer día."
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <div className="h-12 w-12 rounded-full bg-brand-gradient flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Rodrigo Gaete</div>
                      <div className="text-sm text-muted-foreground">Lead UX Designer · BrandBook 2023</div>
                    </div>
                  </div>
                </motion.blockquote>

                {/* Decorative gradient line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mt-6 h-1 bg-brand-gradient rounded-full origin-left"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}