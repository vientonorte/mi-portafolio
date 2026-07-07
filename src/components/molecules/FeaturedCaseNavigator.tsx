import {
  FileText,
  Layers,
  LayoutDashboard,
  Search,
  Shield,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  "full-case": FileText,
  onboarding: Users,
  "auth-flows": Shield,
  prototypes: Layers,
  dashboard: LayoutDashboard,
  "ux-research": Search,
};

interface FeaturedCaseNavigatorProps {
  label: string;
  paths: FeaturedCasePath[];
  projectId: string;
}

export function FeaturedCaseNavigator({ label, paths, projectId }: FeaturedCaseNavigatorProps) {
  const navigate = useNavigate();

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
      });
      navigateFeaturedPath(navigate, path.href);
    },
  }));

  return <HeroAudienceCta label={label} options={options} />;
}