import React from 'react';

// Recibe un array de objetos y exporta CSV
const exportToCSV = (data, filename = 'casos.csv') => {
  if (!data || !data.length) return;
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(obj => Object.values(obj).map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));
  const csvContent = [header, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ExportarCSV = ({ data }) => (
  <button
    type="button"
    onClick={() => exportToCSV(data)}
    style={{ padding: '8px 16px', borderRadius: 4, background: '#0A2540', color: '#fff', border: 'none', marginBottom: 16, cursor: 'pointer' }}
    aria-label="Exportar resultados a CSV"
  >
    Exportar CSV
  </button>
);

export default ExportarCSV;
