import { Briefcase, ClipboardCheck, FileText, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeroAudienceCta, type HeroAudienceOption } from "./HeroAudienceCta";
import { navigateFeaturedPath } from "../../lib/featured-path-routes";
import { trackEvent } from "../../lib/analytics";

export interface FeaturedCasePath {
  id: string;
  title: string;
  hint: string;
  href: string;
  featured?: boolean;
  badge?: string;
}

const PATH_ICONS: Record<string, LucideIcon> = {
  reclutadores: User,
  leads: Briefcase,
  auditoria: ClipboardCheck,
};

interface FeaturedCaseNavigatorProps {
  label: string;
  paths: FeaturedCasePath[];
  projectId: string;
  layout?: "stacked" | "equal";
}

export function FeaturedCaseNavigator({
  label,
  paths,
  projectId,
  layout = "equal",
}: FeaturedCaseNavigatorProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const options: HeroAudienceOption[] = paths.map((path) => ({
    id: path.id,
    icon: PATH_ICONS[path.id] ?? FileText,
    title: path.title,
    hint: path.hint,
    badge: path.badge,
    featured: path.featured,
    onClick: () => {
      trackEvent("featured_case_path", {
        path_id: path.id,
        href: path.href,
        project_id: projectId,
        layout,
      });
      navigateFeaturedPath(navigate, path.href, location.pathname);
    },
  }));

  return <HeroAudienceCta label={label} options={options} layout={layout} />;
}