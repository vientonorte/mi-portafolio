import type { NavigateFunction } from "react-router-dom";
import { ROUTES } from "./routes";
import { navigateToPageSection } from "./navigate-to-section";
import { openFreeRadarEntry } from "./free-radar-entry";
import type { Language } from "./i18n";

/** Secciones del embudo de conversión (no existen en el tour oferta). */
const EMBUDO_SECTIONS = new Set([
  "modalidades",
  "consultoria-onboarding",
  "metodo-n2n",
  "partner-educacion",
  "consultoria-demo",
  "contacto",
  "arbol",
  "valor",
]);

/** Destino canónico: oferta vs embudo según ancla. */
function resolveConsultoriaPath(pathname: string, sectionId?: string): string {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/consultoria" || p === "consultoria") {
    if (sectionId && EMBUDO_SECTIONS.has(sectionId)) {
      return ROUTES.consultingFunnel;
    }
  }
  if (p.startsWith("/")) return p;
  return `/${p}`;
}

/** `project/sura-ria-us` · `process/ux-research` · `route/radar-gratis` · `section/sobre-mi/experiencia` */
export function navigateFeaturedPath(
  navigate: NavigateFunction,
  href: string,
  currentPath = "/",
  language: Language = "es"
) {
  const [kind, ...rest] = href.split("/");
  const id = rest.join("/");

  switch (kind) {
    case "project":
      navigate(ROUTES.project(id));
      break;
    case "process":
      navigate(ROUTES.processPhase(id));
      break;
    case "company":
      navigate(ROUTES.company(id));
      break;
    case "route":
      // SEM freemium · NO /auditoria (mentoría portfolio)
      if (id === "radar-gratis" || id === "auditoria") {
        openFreeRadarEntry(navigate, language, "hero-path");
      } else if (id === "consultoria") navigate(ROUTES.consulting);
      else if (id === "consultoria/embudo" || id === "embudo")
        navigate(ROUTES.consultingFunnel);
      else if (id === "contacto") navigate(ROUTES.contact);
      else if (id === "proyectos") navigate(ROUTES.projects);
      else if (id === "proceso") navigate(ROUTES.process);
      else if (id === "sobre-mi") navigate("/sobre-mi");
      else navigate(ROUTES.home);
      break;
    case "path": {
      const [pathname, sectionId] = id.split("#");
      if (sectionId) {
        const raw = pathname && pathname !== "" ? `/${pathname.replace(/^\//, "")}` : "/";
        const dest = resolveConsultoriaPath(raw, sectionId);
        navigateToPageSection(navigate, dest, sectionId, currentPath);
      } else {
        navigate(id ? `/${id}` : ROUTES.home);
      }
      break;
    }
    case "section": {
      const [page, sectionId] = rest;
      const dest = resolveConsultoriaPath(`/${page}`, sectionId);
      navigateToPageSection(navigate, dest, sectionId, currentPath);
      break;
    }
    default:
      navigate(ROUTES.home);
  }
}