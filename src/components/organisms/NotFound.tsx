import { motion } from "motion/react";
import { Button } from '../ui/button';
import { Home, ArrowLeft, FileQuestion } from "lucide-react";
import { useLanguage } from "../../lib/LanguageContext";

interface NotFoundProps {
  onBack: () => void;
  onHome?: () => void;
}

export function NotFound({ onBack, onHome }: NotFoundProps) {
  const { language } = useLanguage();

  const content = {
    es: {
      title: "Página no encontrada",
      subtitle: "Lo sentimos, no pudimos encontrar lo que buscas.",
      description: "La página que intentas visitar no existe o ha sido movida.",
      backButton: "Volver atrás",
      homeButton: "Ir al inicio",
    },
    en: {
      title: "Page not found",
      subtitle: "Sorry, we couldn't find what you're looking for.",
      description: "The page you're trying to visit doesn't exist or has been moved.",
      backButton: "Go back",
      homeButton: "Go home",
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <div className="container max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* 404 Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-32 h-32 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center"
              >
                <FileQuestion className="w-16 h-16 text-muted-foreground/60" />
              </motion.div>

              {/* Floating particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/20 rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + (i % 2) * 60}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Error Code */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-8xl font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h2 className="text-2xl font-semibold">{t.title}</h2>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {t.description}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backButton}
            </Button>

            {onHome && (
              <Button
                onClick={onHome}
                size="lg"
                className="w-full sm:w-auto bg-brand-gradient hover:opacity-90 transition-opacity"
              >
                <Home className="mr-2 h-4 w-4" />
                {t.homeButton}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
