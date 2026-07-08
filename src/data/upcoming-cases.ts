import type { Language } from "../lib/i18n";

export interface UpcomingCase {
  id: string;
  company: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  period: string;
  tags: string[];
}

export const upcomingCases: UpcomingCase[] = [
  {
    id: "havas-claro",
    company: "Havas / Claro",
    title: {
      es: "Experiencia digital telecom",
      en: "Telecom digital experience",
    },
    description: {
      es: "Diseño de servicios y flujos para clientes enterprise en agencia y operador.",
      en: "Service design and flows for enterprise clients at agency and carrier.",
    },
    period: "2019 — 2021",
    tags: ["Agency", "Telecom", "B2B"],
  },
  {
    id: "ibm-portal",
    company: "IBM",
    title: {
      es: "Portal corporativo",
      en: "Corporate portal",
    },
    description: {
      es: "Entregables HTML/CSS y UX para portal remoto — evidencia visual en preparación.",
      en: "HTML/CSS and UX deliverables for a remote portal — visual evidence in progress.",
    },
    period: "Freelance",
    tags: ["Enterprise", "Web", "Remote"],
  },
  {
    id: "walmart-chile",
    company: "Walmart Chile",
    title: {
      es: "Canales digitales retail",
      en: "Retail digital channels",
    },
    description: {
      es: "Diseño y contenido para e-commerce enterprise — caso corto en documentación.",
      en: "Design and content for enterprise e-commerce — short case in documentation.",
    },
    period: "May — Jun 2022",
    tags: ["Retail", "Content", "Enterprise"],
  },
];