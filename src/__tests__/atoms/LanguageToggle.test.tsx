import { afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageToggle } from '@/components/atoms/LanguageToggle';

const mockSetLanguage = vi.fn();

vi.mock('@/lib/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'es',
    setLanguage: mockSetLanguage,
    isSwitching: false,
  }),
}));

describe('LanguageToggle', () => {
  it('renders current language label', () => {
    render(<LanguageToggle />);
    expect(screen.getByText('es')).toBeInTheDocument();
  });

  it('renders a button', () => {
    render(<LanguageToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has descriptive aria-label for accessibility', () => {
    render(<LanguageToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Cambiar a English');
  });

  it('compact mode renders language code in icon button', () => {
    render(<LanguageToggle compact />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('es');
    expect(button).toHaveAttribute('aria-label', 'Cambiar a English');
  });

  it('calls setLanguage with "en" when current is "es"', () => {
    render(<LanguageToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockSetLanguage).toHaveBeenCalledWith('en');
  });

  it('renders Globe icon', () => {
    const { container } = render(<LanguageToggle />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

describe('LanguageToggle · variante estática (/servicios/, rubros)', () => {
  afterEach(() => localStorage.clear());

  it('es un link a la home en EN, con el mismo look «🌐 ES» (idioma actual) y sin par es / EN', () => {
    const { container } = render(<LanguageToggle variant="static" englishHref="/" />);
    const link = screen.getByRole('link', { name: 'Cambiar a English (página de inicio)' });
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveAttribute('hreflang', 'en');
    expect(link).toHaveAttribute('data-lang-switch', 'en');
    expect(link).toHaveTextContent(/^es$/);
    expect(link.querySelector('svg')).toBeInTheDocument(); // globo
    expect(container.textContent).not.toMatch(/en/i);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('respeta la base de QA en el href', () => {
    render(<LanguageToggle variant="static" englishHref="/qa/" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/qa/');
  });

  it('al hacer clic guarda "en" con la misma clave de la home y no bloquea la navegación', () => {
    localStorage.setItem('language', 'es');
    render(<LanguageToggle variant="static" englishHref="/" />);
    const notPrevented = fireEvent.click(screen.getByRole('link'));
    expect(notPrevented).toBe(true);
    expect(localStorage.getItem('language')).toBe('en');
    expect(mockSetLanguage).not.toHaveBeenCalledWith('en', expect.anything());
  });

  it('compact: «es» en un link de 44×44 sin globo, mismo destino', () => {
    render(<LanguageToggle variant="static" englishHref="/" compact className="mobile-ctrl" />);
    const link = screen.getByRole('link', { name: /English/ });
    expect(link).toHaveTextContent(/^es$/);
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveClass('mobile-ctrl');
    expect(link.querySelector('svg')).toBeNull();
  });
});
