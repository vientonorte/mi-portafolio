import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import { persistLanguage } from "../../lib/language-storage";
import { cn } from "../../lib/utils";

interface LanguageToggleBaseProps {
  className?: string;
  /** Icono compacto para header mobile (44×44). */
  compact?: boolean;
}

interface SpaLanguageToggleProps extends LanguageToggleBaseProps {
  variant?: "spa";
}

interface StaticLanguageToggleProps extends LanguageToggleBaseProps {
  /**
   * Variante estática (/servicios/ y rubros: prerender sin LanguageProvider).
   * La página es solo ES: el toggle es un link que guarda "en" con la misma clave que el
   * toggle de la home (lib/language-storage) y navega a `englishHref` (la home).
   */
  variant: "static";
  englishHref: string;
}

export type LanguageToggleProps = SpaLanguageToggleProps | StaticLanguageToggleProps;

/** Toggle de idioma: «🌐 ES» discreto (desktop) o «es» compacto (mobile), en la home y en las estáticas. */
export function LanguageToggle(props: LanguageToggleProps) {
  if (props.variant === "static") {
    return <StaticLanguageToggle {...props} />;
  }
  return <SpaLanguageToggle {...props} />;
}

const STATIC_ARIA = "Cambiar a English (página de inicio)";

/** Mismo look que el toggle de la home, sin provider: un `<a>` hacia la home en inglés. */
export function StaticLanguageToggle({
  className,
  compact = false,
  englishHref,
}: Omit<StaticLanguageToggleProps, "variant">) {
  const linkProps = {
    href: englishHref,
    hrefLang: "en",
    "data-lang-switch": "en",
    "data-lang-current": "es",
    onClick: () => persistLanguage("en"),
    "aria-label": STATIC_ARIA,
  };

  if (compact) {
    return (
      <Button
        asChild
        variant="ghost"
        size="icon"
        className={cn("relative text-foreground hover:text-foreground", className)}
      >
        <a {...linkProps}>
          <span className="text-[11px] font-semibold uppercase tracking-wide">es</span>
        </a>
      </Button>
    );
  }

  return (
    <div className={className}>
      <Button asChild variant="ghost" size="sm" className="relative group text-foreground hover:text-foreground">
        <a {...linkProps}>
          <Globe className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" aria-hidden="true" />
          <span className="font-medium uppercase">es</span>
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}

function SpaLanguageToggle({ className, compact = false }: SpaLanguageToggleProps) {
  const { language, setLanguage, isSwitching } = useLanguage();
  const nextLabel = language === "es" ? "English" : "Español";
  const nextLang = language === "es" ? "en" : "es";
  const aria = `${language === "es" ? "Cambiar a" : "Switch to"} ${nextLabel}`;

  if (compact) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setLanguage(nextLang)}
        disabled={isSwitching}
        className={cn("relative text-foreground hover:text-foreground", className)}
        aria-label={aria}
        aria-busy={isSwitching}
      >
        <span className="text-[11px] font-semibold uppercase tracking-wide">{language}</span>
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(nextLang)}
        disabled={isSwitching}
        className="relative group text-foreground hover:text-foreground"
        aria-label={aria}
        aria-busy={isSwitching}
      >
        <Globe className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
        <span className="font-medium uppercase">{language}</span>
        <motion.div
          className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    </motion.div>
  );
}
