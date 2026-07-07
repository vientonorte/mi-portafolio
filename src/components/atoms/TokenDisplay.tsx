import { motion } from "motion/react";
import { Copy } from "lucide-react";
import { Button } from '../ui/button';
import { toast } from "sonner";

interface TokenDisplayProps {
  name: string;
  value: string;
  example?: React.ReactNode;
  index?: number;
}

export function TokenDisplay({ name, value, example, index = 0 }: TokenDisplayProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success(`Copiado: ${value}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          {example && <div className="flex-shrink-0">{example}</div>}
          <div className="min-w-0">
            <p className="text-sm truncate">{name}</p>
            <code className="text-xs text-muted-foreground">{value}</code>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        aria-label={`Copiar ${name}`}
        className="flex-shrink-0"
      >
        <Copy className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
