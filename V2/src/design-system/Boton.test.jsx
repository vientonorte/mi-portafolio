import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Boton } from '../design-system/Boton';

describe('Boton', () => {
  it('renderiza el texto y es accesible', () => {
    render(<Boton>Enviar</Boton>);
    const boton = screen.getByRole('button', { name: /enviar/i });
    expect(boton).toBeInTheDocument();
    expect(boton).toHaveAccessibleName('Enviar');
  });
});
