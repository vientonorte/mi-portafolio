import React, { useState, useEffect } from 'react';
import ExportarCSV from './ExportarCSV';

// Mock de casos institucionales
const casosMock = [
  { id: 1, nombre: 'Caso SURA/AFP', descripcion: 'Fricción institucional en fondos de pensiones.' },
  { id: 2, nombre: 'Caso Mapuche', descripcion: 'Conflicto territorial y registro institucional.' },
  { id: 3, nombre: 'Caso Lobby', descripcion: 'Audiencias y transparencia en el Estado.' },
  { id: 4, nombre: 'Caso Catrillanca', descripcion: 'Violencia institucional y evidencia material.' },
];

const Buscador = () => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    // Simula fetch con delay
    const timeout = setTimeout(() => {
      if (query === 'error') {
        setError('No se pudo cargar los casos.');
        setResultados([]);
      } else {
        const filtrados = casosMock.filter(caso =>
          caso.nombre.toLowerCase().includes(query.toLowerCase()) ||
          caso.descripcion.toLowerCase().includes(query.toLowerCase())
        );
        setResultados(filtrados);
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <section aria-labelledby="buscador-title" style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
      <h2 id="buscador-title">Buscador de casos</h2>
      <label htmlFor="buscador-input" className="sr-only">Buscar caso</label>
      <input
        id="buscador-input"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Busca por palabra clave, actor o campo"
        aria-describedby="buscador-help"
        style={{ width: '100%', padding: 12, fontSize: 16, borderRadius: 4, border: '1px solid #ccc', marginBottom: 8 }}
      />
      <div id="buscador-help" style={{ fontSize: 14, color: '#4B5563', marginBottom: 16 }}>
        Escribe para filtrar casos institucionales. Prueba: "SURA", "Mapuche", "Lobby".
      </div>
      <ExportarCSV data={resultados} />
      {loading && <div role="status" aria-live="polite">Cargando…</div>}
      {error && <div role="alert" style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && (
        <ul aria-live="polite" aria-label="Resultados de búsqueda">
          {resultados.length === 0 ? (
            <li>No se encontraron resultados.</li>
          ) : (
            resultados.map(caso => (
              <li key={caso.id} style={{ marginBottom: 12, background: '#F9FAFB', padding: 12, borderRadius: 4 }}>
                <strong>{caso.nombre}</strong><br />
                <span>{caso.descripcion}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
};

export default Buscador;
