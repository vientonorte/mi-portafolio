import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageToggle } from '@/components/atoms/LanguageToggle';

const mockSetLanguage = vi.fn();

vi.mock('@/lib/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es', setLanguage: mockSetLanguage }),
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

  it('has aria-label for accessibility', () => {
    render(<LanguageToggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Toggle language');
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
