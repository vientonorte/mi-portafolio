import { getFeaturedCaseStudies } from "../data/case-study-cards";
import type { Language } from "./i18n";
import { getTranslationSync } from "./i18n";
import { SITE_CONTACT } from "./site-contact";
import { SEO_SITE } from "./seo";

const SITE_URL = SEO_SITE.baseUrl;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PROFILE_ID = `${SITE_URL}/#profile`;

function projectUrl(projectId: string): string {
  return `${SITE_URL}/#/proyecto/${projectId}`;
}

function absoluteImageUrl(image: string): string {
  if (image.startsWith("http")) return image;
  if (image.startsWith("/")) return `https://vientonorte.io${image}`;
  return `${SITE_URL}/${image}`;
}

export function buildPortfolioStructuredData(language: Language) {
  const t = getTranslationSync(language);
  const hero = t.hero;
  const caseStudies = getFeaturedCaseStudies(language);

  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SEO_SITE.brand,
    jobTitle: SEO_SITE.role,
    description: hero.valueProp,
    url: SITE_URL,
    image: "https://vientonorte.io/mi-portafolio/images/branding/og-portfolio.png",
    email: SITE_CONTACT.email,
    sameAs: [SITE_CONTACT.linkedin, SITE_CONTACT.github],
    knowsAbout: hero.specialties,
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: language === "es" ? `Portafolio ${SEO_SITE.role} · ${SEO_SITE.brand}` : `${SEO_SITE.brand} · ${SEO_SITE.role} Portfolio`,
    description: hero.valueProp,
    inLanguage: language === "es" ? "es-CL" : "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": PROFILE_ID,
    url: SITE_URL,
    name: `${SEO_SITE.brand} · ${SEO_SITE.role}`,
    description: hero.valueProp,
    inLanguage: language === "es" ? "es-CL" : "en",
    mainEntity: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };

  const portfolioWork = {
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/#portfolio`,
    name:
      language === "es"
        ? "Portafolio UX — Casos Fintech & Mobility"
        : "UX Portfolio — Fintech & Mobility Cases",
    description: hero.valueProp,
    url: SITE_URL,
    inLanguage: language === "es" ? "es-CL" : "en",
    creator: { "@id": PERSON_ID },
    about: hero.specialties,
    genre: "UX Design Portfolio",
  };

  const caseStudyWorks = caseStudies.map((study) => ({
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/#/proyecto/${study.id}`,
    name: study.title,
    description: study.description,
    url: projectUrl(study.id),
    image: absoluteImageUrl(study.image),
    creator: { "@id": PERSON_ID },
    about: study.tags,
    genre: "UX Case Study",
    isPartOf: { "@id": `${SITE_URL}/#portfolio` },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, portfolioWork, ...caseStudyWorks],
  };
}