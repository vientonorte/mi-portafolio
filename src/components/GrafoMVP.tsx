import React from 'react';

// Datos mock para el grafo
const nodos = [
  { id: 1, label: 'SURA/AFP', color: '#FFD700', x: 80, y: 100, tipo: 'ética' },
  { id: 2, label: 'Mapuche', color: '#0074D9', x: 220, y: 60, tipo: 'institucional' },
  { id: 3, label: 'Lobby', color: '#2ECC40', x: 220, y: 180, tipo: 'material' },
  { id: 4, label: 'Catrillanca', color: '#FF4136', x: 350, y: 120, tipo: 'ética' },
];
const aristas = [
  { from: 1, to: 2, intensidad: 0.7 },
  { from: 2, to: 3, intensidad: 0.85 },
  { from: 3, to: 4, intensidad: 0.5 },
  { from: 1, to: 4, intensidad: 0.9 },
];

const leyenda = [
  { color: '#FFD700', label: 'Ética' },
  { color: '#0074D9', label: 'Institucional' },
  { color: '#2ECC40', label: 'Material' },
  { color: '#FF4136', label: 'Ética (crítica)' },
];

const GrafoMVP = () => (
  <section aria-labelledby="grafo-title" style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
    <h2 id="grafo-title">Grafo de relaciones institucionales</h2>
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Red de casos institucionales"
      tabIndex={0}
      style={{ background: '#F9FAFB', borderRadius: 8, marginBottom: 16, width: '100%', height: 'auto', maxWidth: 400, display: 'block' }}
    >
      {/* Aristas */}
      {aristas.map((a, i) => {
        const from = nodos.find(n => n.id === a.from);
        const to = nodos.find(n => n.id === a.to);
        if (!from || !to) return null;
        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#888"
            strokeWidth={2 + a.intensidad * 2}
            opacity={0.5 + a.intensidad / 2}
            aria-label={`Conexión ${from.label} - ${to.label}, intensidad ${a.intensidad}`}
          />
        );
      })}
      {/* Nodos */}
      {nodos.map(nodo => (
        <g key={nodo.id} tabIndex={0} aria-label={nodo.label}>
          <circle
            cx={nodo.x}
            cy={nodo.y}
            r={24}
            fill={nodo.color}
            stroke="#222"
            strokeWidth={nodo.tipo === 'ética' ? 3 : 1}
          />
          <text
            x={nodo.x}
            y={nodo.y + 38}
            textAnchor="middle"
            fontSize={14}
            fill="#222"
          >
            {nodo.label}
          </text>
        </g>
      ))}
    </svg>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
      {leyenda.map(l => (
        <span key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 16, height: 16, borderRadius: '50%', background: l.color, display: 'inline-block', border: '1px solid #222' }} aria-hidden="true" />
          <span style={{ fontSize: 14 }}>{l.label}</span>
        </span>
      ))}
    </div>
    <div style={{ fontSize: 13, color: '#4B5563' }}>
      <strong>Tip:</strong> Navega con tabulador para explorar nodos. El grosor de la línea indica intensidad de fricción.
    </div>
  </section>
);

export default GrafoMVP;
