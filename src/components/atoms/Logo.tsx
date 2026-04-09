import { motion } from "motion/react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  animated?: boolean;
}

export function Logo({ size = "md", showText = true, animated = false }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg", spacing: "gap-2" },
    md: { icon: 48, text: "text-2xl", spacing: "gap-3" },
    lg: { icon: 64, text: "text-4xl", spacing: "gap-4" },
  };

  const { icon, text, spacing } = sizes[size];

  const LogoIcon = () => (
    <svg
      width={icon}
      height={icon}
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGradient" x1="72.2227" y1="87.7735" x2="-10.5419" y2="42.3562" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF1D25" />
          <stop offset="1" stopColor="#FF931E" />
        </linearGradient>
      </defs>
      <path
        d="M39 0C60.54 0 78 17.46 78 39C78 60.54 60.54 78 39 78C17.46 78 0 60.54 0 39C0 17.46 17.46 0 39 0ZM39 15.6C26.52 15.6 15.6 26.52 15.6 39C15.6 51.48 26.52 62.4 39 62.4C51.48 62.4 62.4 51.48 62.4 39C62.4 26.52 51.48 15.6 39 15.6ZM39 31.2C43.98 31.2 46.8 34.02 46.8 39C46.8 43.98 43.98 46.8 39 46.8C34.02 46.8 31.2 43.98 31.2 39C31.2 34.02 34.02 31.2 39 31.2Z"
        fill="url(#logoGradient)"
      />
    </svg>
  );

  const content = (
    <div className={`flex items-center ${spacing}`}>
      {animated ? (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <LogoIcon />
        </motion.div>
      ) : (
        <LogoIcon />
      )}
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${text} font-bold tracking-wide leading-none`}>
            RODRIGO GAETE
          </span>
          <span className="text-sm text-muted-foreground leading-none mt-1">
            Designer
          </span>
        </div>
      )}
    </div>
  );

  return content;
}

export function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 78 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rodrigo Gaete Logo"
    >
      <defs>
        <linearGradient id="logoMarkGradient" x1="72.2227" y1="87.7735" x2="-10.5419" y2="42.3562" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF1D25" />
          <stop offset="1" stopColor="#FF931E" />
        </linearGradient>
      </defs>
      <path
        d="M39 0C60.54 0 78 17.46 78 39C78 60.54 60.54 78 39 78C17.46 78 0 60.54 0 39C0 17.46 17.46 0 39 0ZM39 15.6C26.52 15.6 15.6 26.52 15.6 39C15.6 51.48 26.52 62.4 39 62.4C51.48 62.4 62.4 51.48 62.4 39C62.4 26.52 51.48 15.6 39 15.6ZM39 31.2C43.98 31.2 46.8 34.02 46.8 39C46.8 43.98 43.98 46.8 39 46.8C34.02 46.8 31.2 43.98 31.2 39C31.2 34.02 34.02 31.2 39 31.2Z"
        fill="url(#logoMarkGradient)"
      />
    </svg>
  );
}
