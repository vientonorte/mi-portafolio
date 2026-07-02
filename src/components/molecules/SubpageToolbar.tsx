import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import { LanguageToggle } from "../atoms/LanguageToggle";
import { LogoMark } from "../atoms/Logo";
import { useLanguage } from "../../lib/LanguageContext";
import { cn } from "../../lib/utils";

export interface SubpageCrumb {
  label: string;
  onClick?: () => void;
  current?: boolean;
}

interface SubpageToolbarProps {
  crumbs: SubpageCrumb[];
  className?: string;
  showLogo?: boolean;
  trailing?: ReactNode;
}

export function SubpageToolbar({
  crumbs,
  className,
  showLogo = true,
  trailing,
}: SubpageToolbarProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "subpage-toolbar sticky top-0 z-50 backdrop-blur-xl bg-background/90 border-b border-border/40",
        className
      )}
      role="banner"
    >
      <div className="container max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {showLogo && (
              <button
                type="button"
                onClick={() => navigate("/")}
                className="shrink-0 rounded-lg p-1.5 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={language === "es" ? "Inicio" : "Home"}
              >
                <LogoMark size={28} interactive />
              </button>
            )}
            <Breadcrumbs links={crumbs} className="mb-0 min-w-0" />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {trailing}
            <LanguageToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
}