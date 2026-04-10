import React from 'react';
import { colores } from './colores';
import { tipografia } from './tipografia';
import { espaciado } from './espaciado';

export function Input({ label, id, required, error, ...props }) {
  return (
    <div style={{ marginBottom: espaciado.md }}>
      <label htmlFor={id} style={{
        display: 'block',
        marginBottom: espaciado.xs,
        fontFamily: tipografia.fuentePrincipal,
        fontWeight: tipografia.pesoNegrita,
        color: colores.primario,
      }}>{label}{required && <span aria-hidden="true" style={{color: colores.error}}> *</span>}</label>
      <input
        id={id}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        style={{
          width: '100%',
          padding: espaciado.sm,
          border: error ? `2px solid ${colores.error}` : `1px solid ${colores.grisOscuro}`,
          borderRadius: '4px',
          fontFamily: tipografia.fuentePrincipal,
          fontSize: tipografia.tamanioBase,
          outline: '2px solid transparent',
          transition: 'border 0.2s, outline 0.2s',
        }}
        aria-label={label}
        {...props}
        onFocus={e => e.target.style.outline = `2px solid ${colores.secundario}`}
        onBlur={e => e.target.style.outline = '2px solid transparent'}
      />
      {error && (
        <span role="alert" style={{ color: colores.error, fontSize: '0.9em' }}>{error}</span>
      )}
    </div>
  );
}
