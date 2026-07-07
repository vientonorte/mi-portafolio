import type { NavigateFunction } from "react-router-dom";
import { ROUTES } from "./routes";
import { navigateToPageSection } from "./navigate-to-section";

/** `project/sura-ria-us` · `process/ux-research` · `route/auditoria` · `section/sobre-mi/experiencia` */
export function navigateFeaturedPath(
  navigate: NavigateFunction,
  href: string,
  currentPath = "/"
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
      if (id === "auditoria") navigate(ROUTES.audit);
      else if (id === "consultoria") navigate(ROUTES.consulting);
      else if (id === "contacto") navigate(ROUTES.contact);
      else if (id === "proyectos") navigate(ROUTES.projects);
      else if (id === "proceso") navigate(ROUTES.process);
      else if (id === "sobre-mi") navigate("/sobre-mi");
      else navigate(ROUTES.home);
      break;
    case "path": {
      const [pathname, sectionId] = id.split("#");
      if (sectionId) {
        navigateToPageSection(navigate, `/${pathname}`, sectionId, currentPath);
      } else {
        navigate(`/${id}`);
      }
      break;
    }
    case "section": {
      const [page, sectionId] = rest;
      navigateToPageSection(navigate, `/${page}`, sectionId, currentPath);
      break;
    }
    default:
      navigate(ROUTES.home);
  }
}