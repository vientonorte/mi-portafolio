import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";
import { cn } from "../../lib/utils";

interface LanguageToggleProps {
  className?: string;
  /** Icono compacto para header mobile (44×44). */
  compact?: boolean;
}

export function LanguageToggle({ className, compact = false }: LanguageToggleProps) {
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