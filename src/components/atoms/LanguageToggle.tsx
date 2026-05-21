import { motion } from "motion/react";
import { Button } from '../ui/button';
import { Globe } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
        className="relative group"
        aria-label="Toggle language"
      >
        <Globe className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
        <span className="font-medium uppercase">{language}</span>
        
        {/* Indicator dot */}
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
