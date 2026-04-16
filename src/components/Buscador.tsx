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
    <section aria-labelledby="buscador-title" className="max-w-lg mx-auto p-6">
      <h2 id="buscador-title">Buscador de casos</h2>
      <label htmlFor="buscador-input" className="sr-only">Buscar caso</label>
      <input
        id="buscador-input"
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Busca por palabra clave, actor o campo"
        aria-describedby="buscador-help"
        className="w-full p-3 text-base rounded border border-border mb-2 bg-background text-foreground"
      />
      <div id="buscador-help" className="text-sm text-muted-foreground mb-4">
        Escribe para filtrar casos institucionales. Prueba: "SURA", "Mapuche", "Lobby".
      </div>
      <ExportarCSV data={resultados} />
      {loading && <div role="status" aria-live="polite">Cargando…</div>}
      {error && <div role="alert" className="text-destructive">{error}</div>}
      {!loading && !error && (
        <ul aria-live="polite" aria-label="Resultados de búsqueda">
          {resultados.length === 0 ? (
            <li>No se encontraron resultados.</li>
          ) : (
            resultados.map(caso => (
              <li key={caso.id} className="mb-3 bg-muted p-3 rounded">
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
