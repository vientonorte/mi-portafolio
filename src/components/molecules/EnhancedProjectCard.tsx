import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  Workflow, 
  Target,
  Calendar,
  Users,
  Wrench
} from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface Process {
  name: string;
  description: string;
  tools?: string[];
}

interface ProjectDetails {
  challenge?: string;
  solution?: string;
  metrics?: string[];
  learnings?: string[];
}

interface EnhancedProjectCardProps {
  // Nivel 1: Empresa
  company: string;
  companyLogo?: string;
  role: string;
  period: string;
  projectName: string;
  description: string;
  image?: string;
  tags: string[];
  externalLink?: string;
  
  // Nivel 2: Procesos
  processes?: Process[]; // Made optional to prevent errors when undefined
  teamSize?: string;
  
  // Nivel 3: Detalles
  details: ProjectDetails;
  
  index: number;
  
  // Navigation
  id?: string;
  onNavigateToProject?: (projectId: string) => void;
  
  // i18n
  lang?: {
    processes: string;
    details: string;
    teamSize: string;
    challenge: string;
    solution: string;
    results: string;
    learnings: string;
    viewMore: string;
    viewLess: string;
    visitProject: string;
  };
}

export function EnhancedProjectCard({
  company,
  companyLogo,
  role,
  period,
  projectName,
  description,
  image,
  tags,
  externalLink,
  processes,
  teamSize,
  details,
  index,
  id,
  onNavigateToProject,
  lang = {
    processes: "Procesos",
    details: "Resultados",
    teamSize: "Equipo",
    challenge: "Desafío",
    solution: "Solución",
    results: "Resultados",
    learnings: "Aprendizajes",
    viewMore: "Ver más",
    viewLess: "Ver menos",
    visitProject: "Visitar Proyecto",
  },
}: EnhancedProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"processes" | "details">("processes");

  return (
    <motion.article
      id={company === "Framework Propio" ? "framework-project" : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
      }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 hover:border-primary/30 relative">
        {/* Gradient glow on hover */}
        <motion.div
          className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-5 blur-xl"
          initial={false}
          transition={{ duration: 0.5 }}
        />

        {/* Nivel 1: EMPRESA - Header con información principal */}
        <CardHeader className="pb-0 relative z-10">
          {/* Header - Info de empresa y período */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex-shrink-0"
              >
                {companyLogo ? (
                  <div className="h-12 w-12 rounded-xl overflow-hidden bg-muted flex items-center justify-center ring-2 ring-border">
                    <ImageWithFallback
                      src={companyLogo}
                      alt={`${company} logo`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-xl bg-brand-gradient flex items-center justify-center shadow-md">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                )}
              </motion.div>

              <div className="flex-1 min-w-0">
                <motion.h3
                  className="text-base truncate"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2 }}
                >
                  {company}
                </motion.h3>
                <motion.p
                  className="text-sm text-muted-foreground truncate"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.25 }}
                >
                  {role}
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.3 }}
              className="flex-shrink-0"
            >
              <Badge variant="secondary" className="whitespace-nowrap text-xs sm:text-sm">
                <Calendar className="h-3 w-3 mr-1" />
                {period}
              </Badge>
            </motion.div>
          </div>

          {/* Proyecto */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.35 }}
          >
            <h4 className="font-semibold text-base mb-2">
              {projectName}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.4 }}
          >
            {tags.map((tag, idx) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.4 + idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Badge variant="outline" className="text-xs">
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </CardHeader>

        {/* Imagen del proyecto */}
        {image && (
          <motion.div
            className="relative h-56 overflow-hidden mx-6 mt-4 rounded-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <ImageWithFallback
              src={image}
              alt={projectName}
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}

        <CardContent className="pt-4 relative z-10">
          {/* Botón para ver detalle completo */}
          {id && onNavigateToProject && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.6 }}
              className="mb-3"
            >
              <Button
                onClick={() => onNavigateToProject(id)}
                className="w-full bg-brand-gradient hover:opacity-90 transition-all group"
                size="sm"
              >
                <Target className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Ver proyecto completo
                <span className="ml-2">→</span>
              </Button>
            </motion.div>
          )}

          {/* Botón para link externo */}
          {externalLink && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + 0.6 }}
              className="mb-3"
            >
              <Button
                asChild
                className="w-full bg-brand-gradient hover:opacity-90 transition-all group"
                size="sm"
              >
                <a 
                  href={externalLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`${lang.visitProject} - ${projectName}`}
                >
                  <Target className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  {lang.visitProject}
                  <span className="ml-2">↗</span>
                </a>
              </Button>
            </motion.div>
          )}

          {/* Toggle para expandir */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between hover:bg-muted/50 transition-all"
            >
              <span className="text-sm font-medium">
                {isExpanded ? lang.viewLess : lang.viewMore}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>

          {/* Nivel 2 y 3: PROCESOS y DETALLES - Contenido expandible */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-4">
                  {/* Tabs */}
                  <div className="flex gap-2 border-b">
                    <motion.button
                      onClick={() => setActiveTab("processes")}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all relative ${
                        activeTab === "processes"
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Workflow className="h-4 w-4" />
                      {lang.processes}
                      {activeTab === "processes" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>

                    <motion.button
                      onClick={() => setActiveTab("details")}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all relative ${
                        activeTab === "details"
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Target className="h-4 w-4" />
                      {lang.details}
                      {activeTab === "details" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  </div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    {activeTab === "processes" ? (
                      <motion.div
                        key="processes"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {teamSize && (
                          <motion.div
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <Users className="h-4 w-4" />
                            <span>{lang.teamSize}: {teamSize}</span>
                          </motion.div>
                        )}

                        <div className="space-y-3">
                          {processes && processes.length > 0 ? (
                            processes.map((process, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.01, x: 4 }}
                                className="p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-all space-y-2 border border-transparent hover:border-primary/20"
                              >
                                <h5 className="font-semibold text-sm flex items-center gap-2">
                                  <motion.div
                                    className="h-7 w-7 rounded-lg bg-brand-gradient flex items-center justify-center flex-shrink-0 shadow-sm"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                  >
                                    <span className="text-xs text-white font-bold">
                                      {idx + 1}
                                    </span>
                                  </motion.div>
                                  {process.name}
                                </h5>
                                <p className="text-xs text-muted-foreground leading-relaxed pl-9">
                                  {process.description}
                                </p>
                                {process.tools && process.tools.length > 0 && (
                                  <div className="flex items-start gap-2 pl-9">
                                    <Wrench className="h-3 w-3 mt-0.5 text-muted-foreground flex-shrink-0" />
                                    <div className="flex flex-wrap gap-1">
                                      {process.tools.map((tool) => (
                                        <motion.div
                                          key={tool}
                                          whileHover={{ scale: 1.05, y: -2 }}
                                        >
                                          <Badge
                                            variant="secondary"
                                            className="text-xs px-2 py-0"
                                          >
                                            {tool}
                                          </Badge>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            ))
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="p-4 rounded-xl bg-muted/30 border border-dashed border-border text-center"
                            >
                              <p className="text-sm text-muted-foreground">
                                No hay procesos disponibles para este proyecto
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {details.challenge && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <h5 className="font-semibold text-sm mb-2 text-primary">{lang.challenge}</h5>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {details.challenge}
                            </p>
                          </motion.div>
                        )}

                        {details.solution && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <h5 className="font-semibold text-sm mb-2 text-primary">{lang.solution}</h5>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {details.solution}
                            </p>
                          </motion.div>
                        )}

                        {details.metrics && details.metrics.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <h5 className="font-semibold text-sm mb-3 text-primary">{lang.results}</h5>
                            <ul className="space-y-2">
                              {details.metrics.map((metric, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + idx * 0.05 }}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <motion.span
                                    className="text-primary mt-1 flex-shrink-0 font-bold"
                                    whileHover={{ scale: 1.2 }}
                                  >
                                    →
                                  </motion.span>
                                  <span className="text-muted-foreground">
                                    {metric}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}

                        {details.learnings && details.learnings.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <h5 className="font-semibold text-sm mb-3 text-primary">{lang.learnings}</h5>
                            <ul className="space-y-2">
                              {details.learnings.map((learning, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.4 + idx * 0.05 }}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <motion.span
                                    className="text-primary mt-1 flex-shrink-0"
                                    whileHover={{ scale: 1.2 }}
                                  >
                                    •
                                  </motion.span>
                                  <span className="text-muted-foreground">
                                    {learning}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.article>
  );
}