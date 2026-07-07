import { portfolioImages } from "../lib/portfolio-image-urls";
import type { Language } from "../lib/i18n";

export interface MentorshipEntry {
  organization: string;
  role: string;
  period: string;
  isCurrent?: boolean;
  logo?: string;
  location: string;
  cause: string;
  summary: string;
  achievements: string[];
  partner?: string;
}

type LocalizedMentorship = {
  es: Omit<MentorshipEntry, "logo" | "isCurrent" | "partner">;
  en: Omit<MentorshipEntry, "logo" | "isCurrent" | "partner">;
  logo?: string;
  partner?: string;
  isCurrent?: boolean;
};

const mentorshipCatalog: LocalizedMentorship[] = [
  {
    isCurrent: true,
    logo: portfolioImages.sura.logo,
    partner: "Fundación SURA",
    es: {
      organization: "Fundación Belén Educa",
      role: "Voluntario",
      period: "Abr 2025 — Actualidad",
      location: "Chile",
      cause: "Infancia",
      summary: "1 año 4 meses · mentorías y charlas vocacionales en educación secundaria",
      achievements: [
        "Voluntario a través de Fundación SURA en programas de mentorías para estudiantes",
        "Charlas vocacionales en educación secundaria sobre diseño UX y trayectorias digitales",
        "Acompañamiento en orientación profesional y exploración de carreras creativas",
      ],
    },
    en: {
      organization: "Belén Educa Foundation",
      role: "Volunteer",
      period: "Apr 2025 — Present",
      location: "Chile",
      cause: "Childhood",
      summary: "1 yr 4 mo · mentorship and career talks in secondary education",
      achievements: [
        "Volunteer through SURA Foundation in student mentorship programs",
        "Vocational talks in secondary education on UX design and digital career paths",
        "Guidance on professional orientation and creative career exploration",
      ],
    },
  },
];

export function getMentorships(language: Language): MentorshipEntry[] {
  return mentorshipCatalog.map((item) => ({
    ...item[language],
    logo: item.logo,
    partner: item.partner,
    isCurrent: item.isCurrent,
  }));
}