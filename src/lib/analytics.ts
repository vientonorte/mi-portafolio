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

// Type definition for gtag function
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'get',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

/**
 * Generic event tracking function
 * @param eventName - Name of the event to track
 * @param params - Additional parameters for the event
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  } else {
    // Fallback for development/debugging
    console.log('[Analytics]', eventName, params);
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
  
  // ===== Form Events =====
  submitContactForm: (success: boolean) => trackEvent("submit_contact_form", {
    category: "conversion",
    success: success
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
