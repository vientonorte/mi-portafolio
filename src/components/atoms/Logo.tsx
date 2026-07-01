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
  md: { mark: 36, text: "text-xl", role: "text-xs", spacing: "gap-2.5" },
  lg: { mark: 48, text: "text-3xl", role: "text-sm", spacing: "gap-3" },
} as const;

interface LogoMarkSvgProps {
  size: number;
  gradientId: string;
  className?: string;
  labelled?: boolean;
}

/** Isologo minimalista RG — marco arquitectónico + acento de marca (10%). */
export function LogoMarkSvg({
  size,
  gradientId,
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
      aria-label={labelled ? "Rodrigo Gaete · UX Architect" : undefined}
    >
      <defs>
        <linearGradient id={gradientId} x1="6" y1="36" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF1D25" />
          <stop offset="1" stopColor="#FF931E" />
        </linearGradient>
      </defs>
      <rect
        x="5"
        y="5"
        width="30"
        height="30"
        rx="7"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-foreground/85"
      />
      <path
        d="M9 33.5H31"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M31 9V15"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="20"
        y="23.5"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontSize="12.5"
        fontWeight="700"
        letterSpacing="-0.06em"
        className="text-foreground"
      >
        RG
      </text>
    </svg>
  );
}

export function Logo({ size = "md", showText = true, animated = false }: LogoProps) {
  const { language } = useLanguage();
  const gradientId = useId();
  const { mark, text, role, spacing } = sizes[size];
  const roleLabel = language === "es" ? "Arquitecto UX" : "UX Architect";

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
            className={`${role} font-mono uppercase tracking-[0.18em] text-muted-foreground mt-1`}
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