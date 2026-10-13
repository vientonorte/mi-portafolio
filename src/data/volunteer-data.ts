import type { Language } from "../lib/i18n";

/** Causas públicas. Sin métricas inventadas y sin la barra «Otros perfiles» de LinkedIn. */
export interface VolunteerEntry {
  role: string;
  org: string;
  period: string;
  cause: string;
  summary: string;
}

const catalog: { es: VolunteerEntry; en: VolunteerEntry }[] = [
  {
    es: {
      role: "Voluntario",
      org: "Fundación Belén Educa",
      period: "abr. 2025 — jun. 2026 · 1 año 3 meses",
      cause: "Infancia",
      summary:
        "Voluntario a través de Fundación SURA, en mentorías y charlas vocacionales de educación secundaria.",
    },
    en: {
      role: "Volunteer",
      org: "Fundación Belén Educa",
      period: "Apr 2025 — Jun 2026 · 1 yr 3 mos",
      cause: "Childhood",
      summary:
        "Volunteer through Fundación SURA, in mentoring and career talks for secondary school.",
    },
  },
  {
    es: {
      role: "Voluntario",
      org: "Observatorio de Derechos Humanos",
      period: "abr. 2022 — mar. 2023 · 1 año",
      cause: "Derechos humanos",
      summary: "Parte de un equipo de la causa. Colaboré desde comunicaciones.",
    },
    en: {
      role: "Volunteer",
      org: "Observatorio de Derechos Humanos",
      period: "Apr 2022 — Mar 2023 · 1 yr",
      cause: "Human rights",
      summary: "On a team committed to the cause. I worked in communications.",
    },
  },
  {
    es: {
      role: "Cofundador",
      org: "Centro de Estudios Antropológicos Comunitarios Valdivia",
      period: "jul. 2015 — ago. 2017 · 2 años 2 meses",
      cause: "Servicios sociales",
      summary:
        "Con estudiantes de antropología y en alianza con la Universidad Austral fundamos el CEAC. Apoyé su dirección y las investigaciones.",
    },
    en: {
      role: "Co-founder",
      org: "Centro de Estudios Antropológicos Comunitarios Valdivia",
      period: "Jul 2015 — Aug 2017 · 2 yrs 2 mos",
      cause: "Social services",
      summary:
        "With anthropology students and in partnership with Universidad Austral, we founded CEAC. I supported its direction and research.",
    },
  },
  {
    es: {
      role: "Voluntario",
      org: "TECHO-Chile",
      period: "feb. 2010 — mar. 2010 · 2 meses",
      cause: "Lucha contra la pobreza",
      summary:
        "En la reconstrucción de Constitución, después del terremoto y tsunami de 2010, fui parte del voluntariado de TECHO-Chile que construyó viviendas de emergencia.",
    },
    en: {
      role: "Volunteer",
      org: "TECHO-Chile",
      period: "Feb 2010 — Mar 2010 · 2 mos",
      cause: "Poverty relief",
      summary:
        "During the reconstruction of Constitución after the 2010 earthquake and tsunami, I joined TECHO-Chile’s volunteer crew building emergency housing.",
    },
  },
];

export function getVolunteerEntries(language: Language): VolunteerEntry[] {
  const key = language === "en" ? "en" : "es";
  return catalog.map((entry) => entry[key]);
}
