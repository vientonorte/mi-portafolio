import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

interface ResponsiveDesignFrameProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

/**
 * Escala frames Figma (1920×1080) al ancho del contenedor sin scroll horizontal.
 */
export function ResponsiveDesignFrame({
  children,
  className,
  label,
}: ResponsiveDesignFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const update = () => {
      const width = node.clientWidth;
      setScale(Math.min(1, width / DESIGN_WIDTH));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      className={cn(
        "w-full overflow-hidden rounded-xl border-2 border-border/50 bg-muted/10 shadow-lg",
        className
      )}
    >
      <div
        ref={containerRef}
        className="w-full"
        style={{ height: Math.ceil(DESIGN_HEIGHT * scale) }}
      >
        <div
          className="origin-top-left"
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
      {label && (
        <figcaption className="border-t border-border/40 px-4 py-2 text-xs text-muted-foreground">
          {label}
        </figcaption>
      )}
    </figure>
  );
}