import { Calendar, User, Sparkles, Download, CheckCircle2, Circle, Clock } from 'lucide-react';
import { auditData } from '../data/audit-data';
import { useState } from 'react';
import { SEOHead } from '../components/atoms/SEOHead';
import { SITE_CONTACT } from '../lib/site-contact';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { canonicalFromPath } from '../lib/seo';

export default function AuditoriaPortfolio() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, task: "Reescribir hero con especialización clara", category: "Posicionamiento", status: "completed" },
    { id: 2, task: "Implementar schema.org/Person + CreativeWork", category: "SEO", status: "completed" },
    { id: 3, task: "Optimizar meta title y description", category: "SEO", status: "completed" },
    { id: 4, task: "Agregar métricas cuantificables en proyectos", category: "Contenido", status: "completed" },
    { id: 5, task: "Desarrollar 1 case study completo con framework", category: "Contenido", status: "completed" },
    { id: 6, task: "Incluir 3 testimonios con validación social", category: "Credibilidad", status: "completed" },
    { id: 7, task: "Agregar keywords estratégicas en proyectos", category: "SEO", status: "completed" },
    { id: 8, task: "Implementar estructura semántica H1-H6", category: "Accesibilidad", status: "completed" }
  ]);

  const handleStatusChange = (id: number) => {
    setChecklistItems(items =>
      items.map(item => {
        if (item.id === id) {
          const nextStatus =
            item.status === "pending" ? "in_progress" :
            item.status === "in_progress" ? "completed" : "pending";
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const completedCount = checklistItems.filter(item => item.status === "completed").length;
  const progressPercentage = Math.round((completedCount / checklistItems.length) * 100);

  const handleDownload = () => {
    window.print();
  };

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.audit, current: true }]}>
      <SEOHead
        {...t.seo.pages.audit}
        keywords={t.seo.keywords}
        url={canonicalFromPath('/auditoria')}
        type="article"
      />
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-orange-500/5">
        <div className="absolute inset-0 bg-brand-gradient opacity-5"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[70vh]">
            {/* Left - Content */}
            <div className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-24">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm w-fit mb-8">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-primary font-medium">Análisis Real</span>
              </span>

              <h1 className="text-4xl lg:text-5xl font-medium mb-6 leading-tight">
                Auditoría Portfolio <span className="text-brand-gradient">UX/UI</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-md">
                {auditData.meta.subtitle}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  Descargar PDF
                </button>
              </div>

              <div className="flex flex-col gap-3 text-sm pt-8 border-t border-border">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-brand-gradient font-medium">{auditData.meta.author}</span>
                  <span className="text-muted-foreground">· Lead UX Designer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">
                    {new Date(auditData.meta.date).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative lg:block hidden no-print">
              <div className="absolute inset-0 bg-brand-gradient opacity-10"></div>
              <img
                src="https://images.unsplash.com/photo-1621111848501-8d3634f82336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="UX Design Workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 lg:px-16 py-16 lg:py-24 space-y-24">

        {/* Resumen Ejecutivo */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-medium mb-3">Resumen Ejecutivo</h2>
            <div className="gradient-line"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-destructive/5 border border-destructive/20">
              <div className="text-4xl font-medium text-destructive mb-2">5</div>
              <div className="text-sm text-muted-foreground">Riesgos críticos</div>
            </div>
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
              <div className="text-4xl font-medium text-brand-gradient mb-2">6</div>
              <div className="text-sm text-muted-foreground">Quick wins SEO</div>
            </div>
            <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/20">
              <div className="text-4xl font-medium text-orange-600 mb-2">3</div>
              <div className="text-sm text-muted-foreground">Sesiones mentoría</div>
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-card to-muted/30 border border-border rounded-xl">
            <p className="text-lg leading-relaxed">{auditData.executiveSummary}</p>
          </div>
        </section>

        {/* Análisis Visual del Portfolio */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-medium mb-3">Análisis Visual</h2>
            <div className="gradient-line"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {auditData.portfolioSections.map((section, colIdx) => (
              <div key={section.id} className="relative">
                <div className="bg-card border border-border rounded p-4">
                  <div className="mb-3 pb-3 border-b border-border flex items-center justify-between">
                    <p className="text-sm font-medium">{section.title}</p>
                    <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive font-medium">
                      3 issues
                    </span>
                  </div>
                  <div className="aspect-[3/4] bg-muted/30 rounded flex flex-col items-center justify-center p-6 text-center">
                    {section.id === 'hero' && (
                      <>
                        <div className="w-16 h-16 rounded-full bg-muted mb-3"></div>
                        <p className="text-sm text-muted-foreground">"Digital and Front-end"</p>
                        <p className="text-xs text-muted-foreground mt-1">"layout Designer"</p>
                        <p className="text-xs text-primary mt-2 italic">"engaging user experiences"</p>
                      </>
                    )}
                    {section.id === 'projects' && (
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {['No-code', 'Digital', 'Frontend', 'UI'].map((label, i) => (
                          <div key={i} className="aspect-square bg-muted/30 rounded border border-border flex flex-col items-center justify-center gap-1">
                            <p className="text-xs text-muted-foreground">{label}</p>
                            <p className="text-[10px] text-primary">"Visit Page"</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {section.id === 'case-study' && (
                      <div className="space-y-2 w-full">
                        <div className="w-full h-24 bg-muted/30 rounded border border-dashed border-border flex items-center justify-center">
                          <p className="text-xs text-muted-foreground">Visual</p>
                        </div>
                        <div className="space-y-1">
                          <div className="h-2 bg-muted/50 rounded w-3/4"></div>
                          <div className="h-2 bg-muted/50 rounded w-full"></div>
                          <div className="p-2 bg-destructive/5 border border-destructive/20 rounded">
                            <p className="text-[10px] text-destructive text-center">CERO métricas</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {section.observations.slice(0, 2).map((obs, idx) => (
                  <div
                    key={idx}
                    className={`no-print absolute ${
                      colIdx === 0
                        ? idx === 0 ? '-top-3 -left-3 -rotate-2' : '-bottom-3 -right-3 rotate-1'
                        : colIdx === 1
                        ? idx === 0 ? 'top-0 -right-3 rotate-2' : '-bottom-3 left-0 -rotate-1'
                        : idx === 0 ? '-top-3 -right-3 rotate-1' : '-bottom-3 left-0 -rotate-2'
                    } w-48 p-3 bg-[#FFF1F2] border-l-2 border-primary rounded shadow-lg transform z-10`}
                  >
                    <p className="text-xs text-foreground leading-snug font-medium">{obs}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Hallazgos Principales */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-medium mb-3">Hallazgos</h2>
            <div className="gradient-line"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditData.mainFindings.map((finding, index) => (
              <div
                key={index}
                className={`p-5 rounded-lg border ${
                  finding.severity === 'high'
                    ? 'bg-destructive/5 border-destructive/20 border-l-4'
                    : 'bg-muted/50 border-border'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  {finding.severity === 'high' && (
                    <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-destructive text-xs font-bold">!</span>
                    </div>
                  )}
                  <h3 className={`flex-1 ${finding.severity === 'high' ? 'text-destructive' : ''}`}>
                    {finding.category}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                    finding.severity === 'high'
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {finding.severity === 'high' ? 'Alto' : 'Medio'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{finding.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Wins */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-orange-500/5 rounded-2xl -z-10"></div>
          <div className="p-8 lg:p-12">
            <div className="mb-12">
              <h2 className="text-3xl font-medium mb-3">Quick Wins</h2>
              <div className="gradient-line"></div>
              <p className="text-muted-foreground mt-4">Implementación inmediata</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {auditData.quickWins.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="number-badge w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm shadow-md">
                    {index + 1}
                  </div>
                  <p className="text-sm pt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plan de Mentoría */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-medium mb-3">Plan de Mentoría</h2>
            <div className="gradient-line"></div>
            <p className="text-muted-foreground mt-4">3 sesiones estratégicas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {auditData.mentorshipPlan.map((session) => (
              <div key={session.session} className="p-6 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="number-badge w-10 h-10 rounded-xl flex items-center justify-center text-base shadow-md">
                    {session.session}
                  </div>
                  <h3 className="text-lg">{session.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{session.objective}</p>
                <div className="space-y-3 pt-4 border-t border-border">
                  <p className="text-xs font-medium text-primary">Entregables</p>
                  <ul className="space-y-2">
                    {session.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KPIs */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-primary/5 rounded-2xl -z-10"></div>
          <div className="p-8 lg:p-12">
            <div className="mb-12">
              <h2 className="text-3xl font-medium mb-3">KPIs de Éxito</h2>
              <div className="gradient-line"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {auditData.kpis.map((kpi, index) => (
                <div key={index} className="p-6 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center">
                  <div className="text-4xl lg:text-5xl font-medium mb-3 text-brand-gradient">{kpi.target}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{kpi.metric}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FigJam Board */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-medium mb-3">FigJam Board</h2>
            <div className="gradient-line"></div>
            <p className="text-muted-foreground mt-4">Análisis completo interactivo</p>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl no-print">
            <iframe
              style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
              width="100%"
              height="450"
              src="https://embed.figma.com/board/lEGDG3EDlNI3OOUCucTyyx/PORTAFOLIO?node-id=2-41&embed-host=share"
              allowFullScreen
              className="w-full"
              title="FigJam Board - Auditoría Portfolio UX/UI"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            <a
              href="https://www.figma.com/board/lEGDG3EDlNI3OOUCucTyyx/PORTAFOLIO?node-id=2-41"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Abrir FigJam en nueva pestaña →
            </a>
          </p>
          {/* URL visible solo en PDF */}
          <p className="print-only hidden text-sm border border-border rounded-lg p-4 mt-4">
            <strong>FigJam Board:</strong> figma.com/board/lEGDG3EDlNI3OOUCucTyyx/PORTAFOLIO?node-id=2-41
          </p>
        </section>

        {/* SEO / AEO */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-medium mb-3">SEO / AEO</h2>
            <div className="gradient-line"></div>
            <p className="text-muted-foreground mt-4">Optimización para búsqueda IA</p>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "Schema Markup",
                description: "Implementar schema.org/Person + schema.org/CreativeWork para indexación por IA",
                impact: "Muy Alto"
              },
              {
                title: "Meta Title Optimizado",
                description: '"[Cliente] | UX Designer | Portfolio & Case Studies"',
                impact: "Alto"
              },
              {
                title: "Keywords Estratégicas",
                description: "Agregar especialización vertical en todos los proyectos (SaaS, Fintech, etc.)",
                impact: "Alto"
              },
              {
                title: "Open Graph Tags",
                description: "Optimizar OG tags para compartir en redes y mejorar visibilidad",
                impact: "Medio"
              },
              {
                title: "Estructura Semántica",
                description: "Jerarquía H1-H6 correcta + landmarks ARIA para accesibilidad",
                impact: "Medio"
              },
              {
                title: "FAQs Indexables",
                description: "Sección de preguntas frecuentes con schema.org/FAQPage para featured snippets",
                impact: "Medio"
              }
            ].map((item, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="number-badge w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                      {index + 1}
                    </div>
                    <h3 className="font-medium text-lg">{item.title}</h3>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    item.impact === "Muy Alto" ? "bg-destructive/10 text-destructive" :
                    item.impact === "Alto" ? "bg-orange-500/10 text-orange-600" :
                    "bg-yellow-500/10 text-yellow-600"
                  }`}>
                    {item.impact}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground ml-11 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist Interactivo */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-orange-500/5 rounded-2xl -z-10"></div>
          <div className="p-8 lg:p-12">
            <div className="mb-12">
              <h2 className="text-3xl font-medium mb-3">Plan de Acción</h2>
              <div className="gradient-line"></div>
              <p className="text-muted-foreground mt-4">Trackea tu progreso</p>
            </div>

            <div className="no-print mb-8 p-6 bg-card border border-border rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Progreso general</p>
                <p className="text-sm text-brand-gradient font-medium">{completedCount}/{checklistItems.length} completadas</p>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-gradient transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="grid gap-4">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleStatusChange(item.id)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all duration-300 ${
                    item.status === "completed"
                      ? "bg-primary/5 border-primary/30 shadow-sm"
                      : item.status === "in_progress"
                      ? "bg-orange-500/5 border-orange-500/30 shadow-sm"
                      : "bg-card border-border hover:border-primary/20 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {item.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : item.status === "in_progress" ? (
                        <Clock className="w-5 h-5 text-orange-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        item.status === "completed" ? "line-through text-muted-foreground" : ""
                      }`}>
                        {item.task}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="no-print text-sm text-muted-foreground mt-8 text-center">
              Haz clic para cambiar estado: Pendiente → En Progreso → Completado
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-16 mt-16 border-t border-border">
          <div className="h-2 bg-brand-gradient w-full mb-8 rounded-full"></div>
          <div className="text-center space-y-4">
            <div>
              <p className="text-2xl font-medium text-brand-gradient mb-1">{auditData.meta.author}</p>
              <p className="text-sm text-muted-foreground">Lead UX Designer</p>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <a
                href="https://vientonorte.github.io/mi-portafolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Portfolio
              </a>
              <span className="text-muted-foreground">·</span>
              <a
                href={SITE_CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-muted-foreground">·</span>
              <a
                href={SITE_CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                GitHub
              </a>
            </div>
            <p className="text-xs text-muted-foreground pt-4">
              {new Date(auditData.meta.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </footer>
      </main>
    </PageShell>
  );
}
