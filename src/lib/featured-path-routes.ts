import type { NavigateFunction } from "react-router-dom";
import { ROUTES } from "./routes";

/** `project/sura-ria-us` · `process/ux-research` · `company/sura-investments` */
export function navigateFeaturedPath(navigate: NavigateFunction, href: string) {
  const [kind, id] = href.split("/");

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
    default:
      navigate(ROUTES.home);
  }
}