import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../../lib/LanguageContext";

interface ColorSwatchProps {
  name: string;
  value: string;
  variable: string;
  /** Path Figma / Tokens Studio (ej. color.brand.red) */
  path?: string;
  description?: string;
}

type CopyTarget = "hex" | "css" | "path";

export function ColorSwatch({
  name,
  value,
  variable,
  path,
  description,
}: ColorSwatchProps) {
  const { language } = useLanguage();
  const es = language === "es";
  const [copied, setCopied] = useState<CopyTarget | null>(null);

  const handleCopy = (target: CopyTarget, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(target);
    toast.success(es ? `Copiado: ${text}` : `Copied: ${text}`);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col gap-2 group">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleCopy("hex", value)}
        className="flex flex-col gap-0 cursor-pointer text-left w-full"
        aria-label={
          es
            ? `Copiar hex de ${name}: ${value}`
            : `Copy hex for ${name}: ${value}`
        }
      >
        <div
          className="h-20 w-full rounded-lg border-2 border-border shadow-sm relative overflow-hidden transition-all group-hover:shadow-md"
          style={{ backgroundColor: value }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: copied === "hex" ? 1 : 0 }}
            className="absolute inset-0 bg-black/25 flex items-center justify-center"
          >
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
              <Check className="h-5 w-5 text-green-600" />
            </div>
          </motion.div>
        </div>
      </motion.button>

      <div className="text-left space-y-0.5 min-w-0">
        <p className="text-sm font-medium truncate" title={name}>
          {name}
        </p>
        <button
          type="button"
          onClick={() => handleCopy("hex", value)}
          className="block font-mono text-xs text-foreground/80 hover:text-primary truncate w-full text-left"
          title={value}
        >
          {value}
        </button>
        <button
          type="button"
          onClick={() => handleCopy("css", variable)}
          className="block font-mono text-[11px] text-muted-foreground hover:text-primary truncate w-full text-left"
          title={variable}
        >
          {variable}
        </button>
        {path && (
          <button
            type="button"
            onClick={() => handleCopy("path", path)}
            className="block font-mono text-[10px] text-muted-foreground/80 hover:text-primary truncate w-full text-left"
            title={`Figma path: ${path}`}
          >
            {path}
          </button>
        )}
        {description && (
          <p className="text-[10px] text-muted-foreground leading-snug pt-0.5 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
