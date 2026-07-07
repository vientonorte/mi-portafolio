import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ColorSwatchProps {
  name: string;
  value: string;
  variable: string;
}

export function ColorSwatch({ name, value, variable }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(variable);
    setCopied(true);
    toast.success(`Copiado: ${variable}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className="flex flex-col gap-2 cursor-pointer group"
      aria-label={`Copiar variable de color ${name}`}
    >
      <div
        className="h-20 w-full rounded-lg border-2 border-border shadow-sm relative overflow-hidden transition-all group-hover:shadow-md"
        style={{ backgroundColor: value }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: copied ? 1 : 0 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center"
        >
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <Check className="h-5 w-5 text-green-600" />
          </div>
        </motion.div>
      </div>
      <div className="text-left">
        <p className="text-sm">{name}</p>
        <code className="text-xs text-muted-foreground">{variable}</code>
      </div>
    </motion.button>
  );
}
