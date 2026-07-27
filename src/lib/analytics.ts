/**
 * Analytics utility for tracking user interactions with Google Analytics 4
 * 
 * Usage:
 * 1. Add your GA4 Measurement ID in index.html
 * 2. Import and use the analytics object to track events
 * 
 * Example:
 * import { analytics } from '@/lib/analytics';
 * analytics.clickViewProjects();
 */

// gtag type is declared in src/vn-core/analytics/gtm.ts — no re-declaration needed

/**
 * Generic event tracking function
 * @param eventName - Name of the event to track
 * @param params - Additional parameters for the event
 */
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  } else {
    // Fallback for development/debugging - silent in production
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('[Analytics]', eventName, params);
    }
  }
};

/**
 * Pre-defined analytics events for common user interactions
 */
export const analytics = {
  // ===== CTA Clicks =====
  clickViewProjects: () => trackEvent("click_view_projects", {
    category: "engagement",
    label: "Hero CTA"
  }),
  
  clickCaseStudies: () => trackEvent("click_case_studies", {
    category: "engagement",
    label: "Navigation"
  }),

  clickHeroRecruiters: () => trackEvent("click_hero_recruiters", {
    category: "conversion",
    label: "Hero CTA — Recruiters",
  }),

  clickHeroAuditLeads: () => trackEvent("click_hero_audit_leads", {
    category: "conversion",
    label: "Hero CTA — Audit leads",
  }),

  clickHeroFreeAudit: () => trackEvent("click_hero_free_audit", {
    category: "conversion",
    label: "Hero CTA — Free B2B audit",
  }),

  /** Lead freemium a11y (Calendar booking o form prearmado). */
  generateLead: (params: {
    lead_type?: string;
    channel?: string;
    origin?: string;
    package_id?: string;
  }) =>
    trackEvent("generate_lead", {
      category: "conversion",
      lead_type: params.lead_type ?? "free_a11y",
      freemium: true,
      ...params,
    }),
  
  clickDesignSystem: () => trackEvent("click_design_system", {
    category: "engagement",
    label: "Navigation"
  }),
  
  clickContact: () => trackEvent("click_contact", {
    category: "conversion",
    label: "Contact CTA"
  }),
  
  // ===== Navigation Events =====
  viewCompany: (companyId: string, companyName?: string) => trackEvent("view_company", {
    category: "navigation",
    company_id: companyId,
    company_name: companyName
  }),
  
  viewProject: (projectId: string, projectName?: string) => trackEvent("view_project", {
    category: "navigation",
    project_id: projectId,
    project_name: projectName
  }),
  
  viewProcess: (processId: string, processName?: string) => trackEvent("view_process", {
    category: "navigation",
    process_id: processId,
    process_name: processName
  }),
  
  viewFramework: () => trackEvent("view_framework", {
    category: "navigation",
    label: "UX Framework"
  }),
  
  // ===== Engagement Events =====
  scrollDepth: (percentage: number) => trackEvent("scroll_depth", {
    category: "engagement",
    value: percentage
  }),
  
  timeOnPage: (seconds: number, pageName: string) => trackEvent("time_on_page", {
    category: "engagement",
    value: seconds,
    page: pageName
  }),
  
  toggleTheme: (theme: string) => trackEvent("toggle_theme", {
    category: "interaction",
    theme: theme
  }),
  
  toggleLanguage: (language: string) => trackEvent("toggle_language", {
    category: "interaction",
    language: language
  }),
  
  // ===== Download Events =====
  downloadCV: () => trackEvent("download_cv", {
    category: "conversion",
    label: "CV Download"
  }),
  
  // ===== Impact Stats =====
  viewImpactStat: (metric: string, destination?: string) => trackEvent("view_impact_stat", {
    category: "engagement",
    metric: metric,
    destination: destination
  }),
  
  // ===== Project Filters =====
  filterProjects: (filter: string) => trackEvent("filter_projects", {
    category: "interaction",
    filter: filter
  }),
  
  // ===== Form Events =====
  submitContactForm: (success: boolean, channel?: string) =>
    trackEvent("submit_contact_form", {
      category: "conversion",
      success,
      ...(channel ? { channel } : {}),
    }),
  
  // ===== External Links =====
  clickExternalLink: (url: string, label?: string) => trackEvent("click_external_link", {
    category: "outbound",
    url: url,
    label: label
  }),
  
  // ===== Search Events =====
  search: (query: string, resultCount: number) => trackEvent("search", {
    category: "interaction",
    search_term: query,
    results: resultCount
  }),
};

/**
 * Track page views (called automatically by router in most cases)
 * @param path - Page path
 * @param title - Page title
 */
export const trackPageView = (path: string, title?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "GA_MEASUREMENT_ID", {
      page_path: path,
      page_title: title
    });
  }
};
