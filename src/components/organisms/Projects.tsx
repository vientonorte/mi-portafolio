import { Briefcase } from "lucide-react";
import { SectionHeader } from "../molecules/SectionHeader";
import { EnhancedProjectCard } from "../molecules/EnhancedProjectCard";
import { StatCard } from "../molecules/StatCard";
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { allProjects } from "../../data/projects-data";
import { useState } from "react";
import { analytics } from "../../lib/analytics";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";

type FilterCategory = 'all' | 'fintech' | 'mobility' | 'featured';

export function Projects({
  onNavigateToCaseStudies,
  onNavigateToProject,
}: {
  onNavigateToCaseStudies?: () => void;
  onNavigateToProject?: (projectId: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const stats = [
    { value: "3+", label: t.projects.stats.experience },
    { value: "8+", label: t.projects.stats.projects },
    { value: "G48", label: t.projects.stats.generation },
    { value: "100%", label: t.projects.stats.designThinking },
  ];

  const handleFilterChange = (filter: FilterCategory) => {
    setActiveFilter(filter);
    analytics.filterProjects(filter);
  };

  const filteredProjects = allProjects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'fintech') {
      return project.tags.some(tag => 
        tag.toLowerCase().includes('fintech') || 
        tag.toLowerCase().includes('investment') ||
        tag.toLowerCase().includes('financial')
      );
    }
    if (activeFilter === 'mobility') {
      return project.company?.toLowerCase().includes('karri') || 
             project.company?.toLowerCase().includes('transvip') ||
             project.tags.some(tag => tag.toLowerCase().includes('mobility'));
    }
    if (activeFilter === 'featured') {
      // Mark first 3 projects as featured
      return allProjects.indexOf(project) < 3;
    }
    return true;
  });

  const filters: { value: FilterCategory; label: string; count: number }[] = [
    { value: 'all', label: t.projectsList.filters.all, count: allProjects.length },
    { value: 'featured', label: t.projectsList.filters.featured, count: 3 },
    { value: 'fintech', label: t.projectsList.filters.fintech, count: allProjects.filter(p => p.tags.some(tag => tag.toLowerCase().includes('fintech') || tag.toLowerCase().includes('investment'))).length },
    { value: 'mobility', label: t.projectsList.filters.mobility, count: allProjects.filter(p => p.company?.toLowerCase().includes('karri') || p.company?.toLowerCase().includes('transvip')).length },
  ];

  return (
    <section 
      id="proyectos" 
      className="py-20 md:py-28 px-4"
      aria-labelledby="projects-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <SectionHeader
          badge={t.projects.badge}
          badgeIcon={Briefcase}
          title={t.projectsList.title}
          description={t.projectsList.description}
        />

        {/* Filter Tabs */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12 justify-center"
        >
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              onClick={() => handleFilterChange(filter.value)}
              className={`transition-all ${activeFilter === filter.value ? 'shadow-md' : ''}`}
            >
              {filter.label}
              <Badge 
                variant={activeFilter === filter.value ? "secondary" : "outline"} 
                className="ml-2"
              >
                {filter.count}
              </Badge>
            </Button>
          ))}
        </motion.div>

        {/* Enhanced Projects Grid */}
        <motion.div 
          layout
          className="grid gap-8 md:gap-10"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              layout
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <EnhancedProjectCard
                {...project}
                index={index}
                onNavigateToProject={onNavigateToProject}
                {...(index < 3 && activeFilter === 'all' ? { isFeatured: true } : {})}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t.projectsList.noResults}
            </p>
          </div>
        )}

        {/* CTA to Case Studies */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-12 md:pt-16"
        >
          <Button 
            size="lg" 
            className="bg-brand-gradient hover:opacity-90 transition-opacity group"
            onClick={onNavigateToCaseStudies}
          >
            <FileText className="mr-2 h-5 w-5 inline group-hover:scale-110 transition-transform" />
            {t.projectsList.viewFullCases}
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="metric-card-grid pt-12 md:pt-16">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
