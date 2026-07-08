import { useId } from "react";
import { motion } from "motion/react";
import { SEO_SITE } from "../../lib/seo";
import { BRAND_GRADIENT_STOPS, BRAND_MARK } from "../../lib/brand-mark";
import { cn } from "../../lib/utils";

export type LogoPlateVariant = "default" | "floating";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  /** Subtítulo (Lead UX Designer); ocultar en nav mobile compacto */
  showRole?: boolean;
  animated?: boolean;
  interactive?: boolean;
  plate?: LogoPlateVariant;
  className?: string;
}

const sizes = {
  sm: { mark: 28, text: "text-base", role: "text-[10px]", spacing: "gap-2.5" },
  md: { mark: 36, text: "text-xl", role: "text-[11px]", spacing: "gap-3" },
  lg: { mark: 48, text: "text-3xl", role: "text-sm", spacing: "gap-3.5" },
} as const;

interface LogoMarkSvgProps {
  size: number;
  className?: string;
  labelled?: boolean;
  interactive?: boolean;
  showPlate?: boolean;
  plate?: LogoPlateVariant;
}

/** Isologo RG — plato mate, arco focal y núcleo (reduce el ruido · foco). */
export function LogoMarkSvg({
  size,
  className,
  labelled = false,
  interactive = false,
  showPlate = true,
  plate = "default",
}: LogoMarkSvgProps) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `rg-grad-${uid}`;
  const shineId = `rg-shine-${uid}`;
  const { center, plateRadius, ringRadius, trackStroke, arcStroke, arcDash, arcRotation, coreRadius, shineRadius, shineOffsetY } =
    BRAND_MARK;

  return (
    <svg
      width={size}
      height={size}
      viewBox={BRAND_MARK.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "logo-mark shrink-0",
        interactive && "logo-mark--interactive",
        className
      )}
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      aria-label={labelled ? `${SEO_SITE.brand} · ${SEO_SITE.role}` : undefined}
    >
      <defs>
        <linearGradient id={gradientId} x1="8" y1="32" x2="32" y2="8" gradientUnits="userSpaceOnUse">
          {BRAND_GRADIENT_STOPS.map((stop) => (
            <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
          ))}
        </linearGradient>
        <radialGradient id={shineId} cx="0.35" cy="0.3" r="0.65">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {showPlate && (
        <circle
          className={cn(
            "logo-mark-plate",
            plate === "floating" && "logo-mark-plate--floating"
          )}
          cx={center}
          cy={center}
          r={plateRadius}
        />
      )}

      <circle
        className="logo-mark-track"
        cx={center}
        cy={center}
        r={ringRadius}
        strokeWidth={trackStroke}
      />

      <g className="logo-mark-arc-group">
        <circle
          className="logo-mark-arc"
          cx={center}
          cy={center}
          r={ringRadius}
          stroke={`url(#${gradientId})`}
          strokeWidth={arcStroke}
          strokeLinecap="round"
          strokeDasharray={arcDash}
          transform={`rotate(${arcRotation} ${center} ${center})`}
        />
      </g>

      <circle
        className="logo-mark-core"
        cx={center}
        cy={center}
        r={coreRadius}
        fill={`url(#${gradientId})`}
      />
      <circle
        className="logo-mark-core-shine"
        cx={center}
        cy={center + shineOffsetY}
        r={shineRadius}
        fill={`url(#${shineId})`}
      />
    </svg>
  );
}

export function Logo({
  size = "md",
  showText = true,
  showRole = true,
  animated = false,
  interactive = false,
  plate = "default",
  className,
}: LogoProps) {
  const { mark, text, role, spacing } = sizes[size];
  const roleLabel = SEO_SITE.role;

  const markNode = (
    <LogoMarkSvg
      size={mark}
      labelled={!showText}
      interactive={interactive}
      plate={plate}
    />
  );

  const content = (
    <div className={cn("flex min-w-0 items-center", spacing, className)}>
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
        <div className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              text,
              "truncate font-semibold tracking-tight text-foreground",
              !showRole && "max-w-[9.5rem]"
            )}
            style={{ fontFamily: "var(--font-chillax)" }}
          >
            {SEO_SITE.brand}
          </span>
          {showRole && (
            <span
              className={cn(
                role,
                "mt-1 inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.2em] text-muted-foreground"
              )}
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient"
                aria-hidden="true"
              />
              {roleLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return content;
}

export function LogoMark({
  size = 36,
  interactive = false,
  plate = "default",
}: {
  size?: number;
  interactive?: boolean;
  plate?: LogoPlateVariant;
}) {
  return (
    <LogoMarkSvg
      size={size}
      labelled
      interactive={interactive}
      plate={plate}
    />
  );
}