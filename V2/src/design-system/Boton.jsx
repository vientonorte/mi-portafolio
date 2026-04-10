import React from 'react';
import { colores } from './colores';
import { tipografia } from './tipografia';
import { espaciado } from './espaciado';

export function Boton({ children, onClick, tipo = 'button', variante = 'primario', ...props }) {
  const bg = variante === 'primario' ? colores.primario : colores.secundario;
  const fg = variante === 'primario' ? '#FFF' : colores.primario;
  return (
    <button
      type={tipo}
      onClick={onClick}
      style={{
        background: bg,
        color: fg,
        border: 'none',
        borderRadius: '4px',
        padding: `${espaciado.sm} ${espaciado.md}`,
        fontFamily: tipografia.fuentePrincipal,
        fontWeight: tipografia.pesoNegrita,
        fontSize: tipografia.tamanioBase,
        cursor: 'pointer',
        outline: '2px solid transparent',
        transition: 'background 0.2s, outline 0.2s',
      }}
      aria-pressed="false"
      tabIndex={0}
      {...props}
      onFocus={e => e.target.style.outline = `2px solid ${colores.secundario}`}
      onBlur={e => e.target.style.outline = '2px solid transparent'}
      onMouseOver={e => e.target.style.background = colores.primario}
      onMouseOut={e => e.target.style.background = bg}
    >
      {children}
    </button>
  );
}
