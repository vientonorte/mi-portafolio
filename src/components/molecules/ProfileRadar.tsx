import { useId, useMemo, useState } from "react";
import { useLanguage } from "../../lib/LanguageContext";
import { PERFIL_FIELD_AXES } from "../../data/perfil-estrategico";
import { cn } from "../../lib/utils";

const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const MAX_R = 108;
const LEVELS = 5;

function polar(i: number, n: number, r: number) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return {
    x: CX + r * Math.cos(angle),
    y: CY + r * Math.sin(angle),
  };
}

/**
 * Radar de campos del perfil estratégico (Dónde sumo).
 * SVG propio: liviano, a11y con tabla, un eje seleccionado a la vez.
 */
export function ProfileRadar({ className }: { className?: string }) {
  const { language } = useLanguage();
  const es = language === "es";
  const gid = useId().replace(/:/g, "");
  const axes = PERFIL_FIELD_AXES;
  const n = axes.length;
  const [activeId, setActiveId] = useState<string>(axes[0]?.id ?? "diseno");

  const gridPolys = useMemo(() => {
    return Array.from({ length: LEVELS }, (_, level) => {
      const r = (MAX_R * (level + 1)) / LEVELS;
      return axes
        .map((_, i) => {
          const p = polar(i, n, r);
          return `${p.x},${p.y}`;
        })
        .join(" ");
    });
  }, [axes, n]);

  const valuePoly = useMemo(() => {
    return axes
      .map((a, i) => {
        const r = (MAX_R * Math.min(LEVELS, Math.max(0, a.score))) / LEVELS;
        const p = polar(i, n, r);
        return `${p.x},${p.y}`;
      })
      .join(" ");
  }, [axes, n]);

  const labels = useMemo(() => {
    return axes.map((a, i) => {
      const p = polar(i, n, MAX_R + 22);
      return { ...a, ...p };
    });
  }, [axes, n]);

  const active = axes.find((a) => a.id === activeId) ?? axes[0];

  return (
    <div className={cn("mx-auto w-full max-w-md", className)}>
      <div className="relative mx-auto aspect-square w-full max-w-[320px]">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-full w-full"
          role="img"
          aria-labelledby={`${gid}-title ${gid}-desc`}
        >
          <title id={`${gid}-title`}>
            {es
              ? "Radar de perfil estratégico — dónde sumo"
              : "Strategic profile radar — where I add value"}
          </title>
          <desc id={`${gid}-desc`}>
            {axes
              .map(
                (a) =>
                  `${language === "es" ? a.labelEs : a.labelEn}: ${a.score} de 5`
              )
              .join(". ")}
          </desc>

          <defs>
            <linearGradient id={`${gid}-fill`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          {/* rings */}
          {gridPolys.map((pts, i) => (
            <polygon
              key={i}
              points={pts}
              fill="none"
              stroke="currentColor"
              className="text-border"
              strokeOpacity={0.45}
              strokeWidth={1}
            />
          ))}

          {/* axes */}
          {axes.map((_, i) => {
            const p = polar(i, n, MAX_R);
            return (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={p.x}
                y2={p.y}
                stroke="currentColor"
                className="text-border"
                strokeOpacity={0.4}
                strokeWidth={1}
              />
            );
          })}

          {/* value shape */}
          <polygon
            points={valuePoly}
            fill={`url(#${gid}-fill)`}
            stroke="var(--primary)"
            strokeWidth={2}
            strokeLinejoin="round"
          />

          {/* vertices */}
          {axes.map((a, i) => {
            const r = (MAX_R * a.score) / LEVELS;
            const p = polar(i, n, r);
            const on = a.id === activeId;
            return (
              <circle
                key={a.id}
                cx={p.x}
                cy={p.y}
                r={on ? 5 : 3.5}
                fill={on ? "var(--primary)" : "var(--background)"}
                stroke="var(--primary)"
                strokeWidth={2}
              />
            );
          })}

          {/* clickable labels */}
          {labels.map((a) => {
            const on = a.id === activeId;
            const label = es ? a.labelEs : a.labelEn;
            return (
              <g key={a.id}>
                <text
                  x={a.x}
                  y={a.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={on ? "var(--primary)" : "var(--muted-foreground)"}
                  style={{ fontSize: 11, fontWeight: on ? 700 : 600 }}
                >
                  {label}
                </text>
                {/* larger hit target */}
                <circle
                  cx={a.x}
                  cy={a.y}
                  r={16}
                  fill="transparent"
                  className="cursor-pointer"
                  onClick={() => setActiveId(a.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(a.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${label}: ${a.score}/5`}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel — one axis at a time */}
      {active && (
        <div
          className="mt-3 rounded-xl border border-border/50 bg-card/80 px-4 py-3 text-center"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-foreground">
            {es ? active.labelEs : active.labelEn}
            <span className="ml-2 font-mono text-xs font-normal text-primary">
              {active.score}/5
            </span>
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {es ? active.detailEs : active.detailEn}
          </p>
        </div>
      )}

      {/* SR / progressive table */}
      <table className="sr-only">
        <caption>
          {es ? "Scores del radar de perfil" : "Profile radar scores"}
        </caption>
        <thead>
          <tr>
            <th>{es ? "Campo" : "Field"}</th>
            <th>{es ? "Nivel" : "Level"}</th>
          </tr>
        </thead>
        <tbody>
          {axes.map((a) => (
            <tr key={a.id}>
              <td>{es ? a.labelEs : a.labelEn}</td>
              <td>
                {a.score} / {LEVELS}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
