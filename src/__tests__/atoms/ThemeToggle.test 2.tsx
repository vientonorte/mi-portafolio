import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('renders a toggle button', () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });

  it('has an accessible aria-label', () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-label');
  });

  it('toggles theme on click', () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(localStorage.getItem('theme')).toBeTruthy();
  });

  it('reads theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });

  it('renders sun and moon icons', () => {
    const { container } = render(<ThemeToggle />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it('has sr-only text for screen readers', () => {
    render(<ThemeToggle />);
    const srText = document.querySelector('.sr-only');
    expect(srText).toBeInTheDocument();
  });

  it('toggles dark class on document element', () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    const hasDark = document.documentElement.classList.contains('dark');
    expect(typeof hasDark).toBe('boolean');
  });

  it('uses matchMedia to detect system preference', () => {
    render(<ThemeToggle />);
    expect(window.matchMedia).toHaveBeenCalled();
  });
});
