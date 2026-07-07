import type { Language } from "./i18n";

export interface AuditPageCopy {
  downloadPdf: string;
  opensNewTab: string;
  progressLabel: string;
  progressSummary: string;
  checklistHint: string;
  checklistToggle: string;
  statusLabels: {
    pending: string;
    in_progress: string;
    completed: string;
  };
  sections: {
    executiveSummary: string;
    visualAnalysis: string;
    findings: string;
    quickWins: string;
    quickWinsSubtitle: string;
    mentorship: string;
    mentorshipSubtitle: string;
    deliverables: string;
    kpis: string;
    figjam: string;
    figjamSubtitle: string;
    figjamOpen: string;
    figjamEmbedTitle: string;
    figjamEmbedDescription: string;
    seoAeo: string;
    seoAeoSubtitle: string;
    actionPlan: string;
    actionPlanSubtitle: string;
  };
  stats: {
    criticalRisks: string;
    seoQuickWins: string;
    mentorshipSessions: string;
  };
  severity: {
    high: string;
    medium: string;
    highAnnouncement: string;
    mediumAnnouncement: string;
  };
  impact: {
    veryHigh: string;
    high: string;
    medium: string;
  };
  issuesCount: string;
  visualMock: string;
  footerPortfolio: string;
}

const COPY: Record<Language, AuditPageCopy> = {
  es: {
    downloadPdf: "Descargar PDF",
    opensNewTab: "se abre en nueva pestaña",
    progressLabel: "Progreso del plan de acción",
    progressSummary: "{completed} de {total} completadas",
    checklistHint:
      "Usa los botones para cambiar estado: Pendiente → En progreso → Completado",
    checklistToggle: "Cambiar estado de la tarea",
    statusLabels: {
      pending: "Pendiente",
      in_progress: "En progreso",
      completed: "Completada",
    },
    sections: {
      executiveSummary: "Resumen ejecutivo",
      visualAnalysis: "Análisis visual",
      findings: "Hallazgos",
      quickWins: "Quick wins",
      quickWinsSubtitle: "Implementación inmediata",
      mentorship: "Plan de mentoría",
      mentorshipSubtitle: "3 sesiones estratégicas",
      deliverables: "Entregables",
      kpis: "KPIs de éxito",
      figjam: "FigJam board",
      figjamSubtitle: "Análisis completo interactivo",
      figjamOpen: "Abrir FigJam en nueva pestaña",
      figjamEmbedTitle: "Tablero FigJam — auditoría de portfolio UX/UI",
      figjamEmbedDescription:
        "Vista embebida del tablero FigJam. Si no puedes interactuar con el embed, usa el enlace para abrirlo en Figma.",
      seoAeo: "SEO / AEO",
      seoAeoSubtitle: "Optimización para búsqueda IA",
      actionPlan: "Plan de acción",
      actionPlanSubtitle: "Trackea tu progreso",
    },
    stats: {
      criticalRisks: "Riesgos críticos",
      seoQuickWins: "Quick wins SEO",
      mentorshipSessions: "Sesiones de mentoría",
    },
    severity: {
      high: "Alta",
      medium: "Media",
      highAnnouncement: "Severidad alta",
      mediumAnnouncement: "Severidad media",
    },
    impact: {
      veryHigh: "Muy alto",
      high: "Alto",
      medium: "Medio",
    },
    issuesCount: "{count} hallazgos",
    visualMock: "Vista simulada de la sección auditada",
    footerPortfolio: "Portfolio",
  },
  en: {
    downloadPdf: "Download PDF",
    opensNewTab: "opens in a new tab",
    progressLabel: "Action plan progress",
    progressSummary: "{completed} of {total} completed",
    checklistHint: "Use the buttons to cycle status: Pending → In progress → Completed",
    checklistToggle: "Change task status",
    statusLabels: {
      pending: "Pending",
      in_progress: "In progress",
      completed: "Completed",
    },
    sections: {
      executiveSummary: "Executive summary",
      visualAnalysis: "Visual analysis",
      findings: "Findings",
      quickWins: "Quick wins",
      quickWinsSubtitle: "Immediate implementation",
      mentorship: "Mentorship plan",
      mentorshipSubtitle: "3 strategic sessions",
      deliverables: "Deliverables",
      kpis: "Success KPIs",
      figjam: "FigJam board",
      figjamSubtitle: "Full interactive analysis",
      figjamOpen: "Open FigJam in a new tab",
      figjamEmbedTitle: "FigJam board — UX/UI portfolio audit",
      figjamEmbedDescription:
        "Embedded FigJam board. If the embed is not usable, open it in Figma via the link below.",
      seoAeo: "SEO / AEO",
      seoAeoSubtitle: "Optimization for AI search",
      actionPlan: "Action plan",
      actionPlanSubtitle: "Track your progress",
    },
    stats: {
      criticalRisks: "Critical risks",
      seoQuickWins: "SEO quick wins",
      mentorshipSessions: "Mentorship sessions",
    },
    severity: {
      high: "High",
      medium: "Medium",
      highAnnouncement: "High severity",
      mediumAnnouncement: "Medium severity",
    },
    impact: {
      veryHigh: "Very high",
      high: "High",
      medium: "Medium",
    },
    issuesCount: "{count} findings",
    visualMock: "Simulated view of the audited section",
    footerPortfolio: "Portfolio",
  },
};

export function getAuditPageCopy(language: Language): AuditPageCopy {
  return COPY[language];
}