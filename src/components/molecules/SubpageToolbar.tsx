import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";
import { LanguageToggle } from "../atoms/LanguageToggle";
import { ThemeToggle } from "../atoms/ThemeToggle";
import { MOBILE_HEADER_CONTROL_CLASS } from "./mobile-header-classes";
import { Logo } from "../atoms/Logo";
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
  /**
   * Wordmark junto al isologo. En superficies de marca servicio (p. ej. /consultoria)
   * conviene false: solo isologo, sin “Rodrigo Gaete”.
   */
  showLogoText?: boolean;
  trailing?: ReactNode;
}

export function SubpageToolbar({
  crumbs,
  className,
  showLogo = true,
  showLogoText = true,
  trailing,
}: SubpageToolbarProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "subpage-toolbar sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/85",
        className
      )}
      role="banner"
    >
      <div className="container mx-auto max-w-7xl px-4 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {showLogo && (
              <button
                type="button"
                onClick={() => navigate("/")}
                className="shrink-0 rounded-lg p-1.5 transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={
                  language === "es"
                    ? showLogoText
                      ? "Inicio"
                      : "Viento Norte · Inicio"
                    : showLogoText
                      ? "Home"
                      : "Viento Norte · Home"
                }
              >
                {/* Mobile: solo isologo; sm+: wordmark si showLogoText */}
                <span className="sm:hidden">
                  <Logo size="sm" showText={false} showRole={false} interactive />
                </span>
                <span className="hidden sm:block">
                  <Logo
                    size="sm"
                    showText={showLogoText}
                    showRole={false}
                    interactive
                  />
                </span>
              </button>
            )}
            <Breadcrumbs links={crumbs} className="mb-0 min-w-0" />
          </div>
          {/* Idioma + tema siempre visibles (reclutador / a11y de contraste).
              Mobile: 44×44. sm+: idioma con label ES/EN legible. */}
          <div
            className="flex shrink-0 items-center gap-1.5 sm:gap-2"
            role="group"
            aria-label={
              language === "es"
                ? "Idioma y accesibilidad visual"
                : "Language and visual accessibility"
            }
          >
            {trailing}
            <ThemeToggle
              className={MOBILE_HEADER_CONTROL_CLASS}
            />
            <span className="sm:hidden">
              <LanguageToggle compact className={MOBILE_HEADER_CONTROL_CLASS} />
            </span>
            <span className="hidden sm:inline-flex">
              <LanguageToggle
                className={cn(
                  MOBILE_HEADER_CONTROL_CLASS,
                  "h-11 w-auto min-w-[4.5rem] gap-1.5 px-3"
                )}
              />
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}