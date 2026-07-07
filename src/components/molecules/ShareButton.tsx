import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Share2, Check, Copy } from "lucide-react";
import { Button } from '../ui/button';
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface ShareButtonProps {
  sectionId: string;
  sectionLabel: string;
  language?: "es" | "en";
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

export function ShareButton({ 
  sectionId, 
  sectionLabel, 
  language = "es",
  variant = "ghost",
  size = "sm",
  showLabel = false
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Get current URL and add section hash
      const currentUrl = window.location.origin + window.location.pathname;
      const shareUrl = `${currentUrl}#${sectionId}`;

      // Try to use native share API first (mobile)
      if (navigator.share) {
        try {
          await navigator.share({
            title: sectionLabel,
            url: shareUrl,
          });
          
          toast.success(
            language === "es" 
              ? "¡Enlace compartido!" 
              : "Link shared!",
            {
              description: language === "es" 
                ? `Sección: ${sectionLabel}` 
                : `Section: ${sectionLabel}`,
            }
          );
          return;
        } catch (err) {
          // User cancelled share or it's not available, fallback to clipboard
        }
      }

      // Fallback to clipboard
      await navigator.clipboard.writeText(shareUrl);
      
      // Visual feedback
      setCopied(true);
      
      // Toast notification
      toast.success(
        language === "es" 
          ? "¡Enlace copiado!" 
          : "Link copied!",
        {
          description: language === "es" 
            ? `Puedes compartir: ${sectionLabel}` 
            : `You can share: ${sectionLabel}`,
          duration: 3000,
        }
      );

      // Reset icon after 2s
      setTimeout(() => setCopied(false), 2000);

    } catch (err) {
      toast.error(
        language === "es" 
          ? "Error al copiar enlace" 
          : "Error copying link",
        {
          description: language === "es"
            ? "Por favor intenta de nuevo"
            : "Please try again"
        }
      );
    }
  };

  const tooltipContent = copied 
    ? (language === "es" ? "¡Copiado!" : "Copied!")
    : (language === "es" ? "Compartir sección" : "Share section");

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            onClick={handleShare}
            className="gap-2 group relative"
            aria-label={`${language === "es" ? "Compartir sección" : "Share section"}: ${sectionLabel}`}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="share"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: -180 }}
                  transition={{ duration: 0.2 }}
                >
                  <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {showLabel && (
              <span className="hidden md:inline">
                {copied 
                  ? (language === "es" ? "Copiado" : "Copied")
                  : (language === "es" ? "Compartir" : "Share")
                }
              </span>
            )}

            {/* Ripple effect on copy */}
            {copied && (
              <motion.div
                className="absolute inset-0 rounded-md bg-green-500/20"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={5}>
          <div className="flex items-center gap-2">
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            <span>{tooltipContent}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
