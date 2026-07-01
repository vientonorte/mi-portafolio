import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo, LogoMark } from '@/components/atoms/Logo';
import { LanguageProvider } from '@/lib/LanguageContext';

function renderWithLanguage(ui: React.ReactNode) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe('Logo', () => {
  it('renders with default props in Spanish', () => {
    renderWithLanguage(<Logo />);
    expect(screen.getByText('Rodrigo Gaete')).toBeInTheDocument();
    expect(screen.getByText('UX Design Ops')).toBeInTheDocument();
  });

  it('hides text when showText=false', () => {
    renderWithLanguage(<Logo showText={false} />);
    expect(screen.queryByText('Rodrigo Gaete')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Rodrigo Gaete · UX Design Ops')).toBeInTheDocument();
  });

  it('renders svg icon with aria-hidden when text is shown', () => {
    const { container } = renderWithLanguage(<Logo />);
    const svg = container.querySelector('svg[aria-hidden="true"]');
    expect(svg).toBeInTheDocument();
  });

  it('applies correct size classes for sm', () => {
    const { container } = renderWithLanguage(<Logo size="sm" />);
    expect(container.firstChild).toHaveClass('gap-2');
  });

  it('applies correct size classes for lg', () => {
    const { container } = renderWithLanguage(<Logo size="lg" />);
    expect(container.firstChild).toHaveClass('gap-3');
  });
});

describe('LogoMark', () => {
  it('renders svg with accessible label', () => {
    render(<LogoMark />);
    expect(screen.getByLabelText('Rodrigo Gaete · UX Design Ops')).toBeInTheDocument();
  });

  it('accepts custom size', () => {
    render(<LogoMark size={64} />);
    const svg = screen.getByLabelText('Rodrigo Gaete · UX Design Ops');
    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
  });
});