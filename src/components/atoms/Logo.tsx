import { useId } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../lib/LanguageContext";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  animated?: boolean;
}

const sizes = {
  sm: { mark: 28, text: "text-base", role: "text-[10px]", spacing: "gap-2" },
  md: { mark: 36, text: "text-xl", role: "text-[11px]", spacing: "gap-2.5" },
  lg: { mark: 48, text: "text-3xl", role: "text-sm", spacing: "gap-3" },
} as const;

interface LogoMarkSvgProps {
  size: number;
  gradientId: string;
  className?: string;
  labelled?: boolean;
}

/** Isologo circular — variante principal del sistema de marca 2026. */
export function LogoMarkSvg({
  size,
  gradientId: _gradientId,
  className,
  labelled = false,
}: LogoMarkSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      aria-label={labelled ? "Rodrigo Gaete · UX Design Ops" : undefined}
    >
      <circle
        cx="20"
        cy="20"
        r="13"
        fill="none"
        stroke="#FF5A1F"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="70 16"
        transform="rotate(-106 20 20)"
      />
      <circle cx="20" cy="20" r="5.2" fill="#FF5A1F" />
    </svg>
  );
}

export function Logo({ size = "md", showText = true, animated = false }: LogoProps) {
  const { language } = useLanguage();
  const gradientId = useId();
  const { mark, text, role, spacing } = sizes[size];
  const roleLabel = language === "es" ? "UX Design Ops" : "UX Design Ops";

  const markNode = (
    <LogoMarkSvg size={mark} gradientId={gradientId} labelled={!showText} />
  );

  const content = (
    <div className={`flex items-center ${spacing}`}>
      {animated ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {markNode}
        </motion.div>
      ) : (
        markNode
      )}

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${text} font-semibold tracking-tight text-foreground`}>
            Rodrigo Gaete
          </span>
          <span
            className={`${role} font-mono uppercase tracking-[0.24em] text-muted-foreground mt-1`}
          >
            {roleLabel}
          </span>
        </div>
      )}
    </div>
  );

  return content;
}

export function LogoMark({ size = 36 }: { size?: number }) {
  const gradientId = useId();

  return (
    <LogoMarkSvg
      size={size}
      gradientId={gradientId}
      labelled
      className="shrink-0"
    />
  );
}