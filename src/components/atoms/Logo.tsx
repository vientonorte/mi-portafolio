import { useId } from "react";
import { motion } from "motion/react";
import { SEO_SITE } from "../../lib/seo";
import { cn } from "../../lib/utils";

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
  className?: string;
  labelled?: boolean;
}

const LOGO_CENTER = 20;
const LOGO_RING_RADIUS = 13;
const LOGO_RING_STROKE = 5;
const LOGO_RING_DASH = "70 16";
const LOGO_RING_ROTATION = -106;
const LOGO_DOT_RADIUS = 5.2;

/** Isologo circular — variante principal del sistema de marca 2026. */
export function LogoMarkSvg({
  size,
  className,
  labelled = false,
}: LogoMarkSvgProps) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("logo-mark shrink-0", className)}
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      aria-label={labelled ? `${SEO_SITE.brand} · ${SEO_SITE.role}` : undefined}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="8"
          y1="32"
          x2="32"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--brand-red, #FF1D25)" />
          <stop offset="1" stopColor="var(--brand-orange, #FF931E)" />
        </linearGradient>
      </defs>
      <circle
        cx={LOGO_CENTER}
        cy={LOGO_CENTER}
        r={LOGO_RING_RADIUS}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={LOGO_RING_STROKE}
        strokeLinecap="round"
        strokeDasharray={LOGO_RING_DASH}
        transform={`rotate(${LOGO_RING_ROTATION} ${LOGO_CENTER} ${LOGO_CENTER})`}
      />
      <circle
        cx={LOGO_CENTER}
        cy={LOGO_CENTER}
        r={LOGO_DOT_RADIUS}
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

export function Logo({ size = "md", showText = true, animated = false }: LogoProps) {
  const { mark, text, role, spacing } = sizes[size];
  const roleLabel = SEO_SITE.role;

  const markNode = (
    <LogoMarkSvg size={mark} labelled={!showText} />
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
            {SEO_SITE.brand}
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
  return (
    <LogoMarkSvg
      size={size}
      labelled
    />
  );
}