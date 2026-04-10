import React from 'react';
import { colores, tipografia, espaciado } from './colores';

export function CardCasoEstudio({ titulo, resumen, imagen, link }) {
  return (
    <article
      style={{
        background: colores.grisClaro,
        borderRadius: '8px',
        padding: espaciado.md,
        marginBottom: espaciado.lg,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        fontFamily: tipografia.fuentePrincipal,
      }}
      tabIndex={0}
      aria-label={`Caso de estudio: ${titulo}`}
    >
      {imagen && (
        <img
          src={imagen}
          alt={titulo}
          style={{ width: '100%', borderRadius: '4px', marginBottom: espaciado.sm }}
          loading="lazy"
        />
      )}
      <h2 style={{ fontSize: tipografia.tamanioTitulo, color: colores.primario }}>{titulo}</h2>
      <p style={{ fontSize: tipografia.tamanioSubtitulo, color: colores.texto }}>{resumen}</p>
      {link && (
        <a href={link} style={{ color: colores.secundario, textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
          Ver caso completo
        </a>
      )}
    </article>
  );
}
