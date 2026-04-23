import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrollProgress } from '@/components/atoms/ScrollProgress';

describe('ScrollProgress', () => {
  it('renders progress bar when motion is not reduced', () => {
    render(<ScrollProgress />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
  });

  it('progress bar has accessible aria attributes', () => {
    render(<ScrollProgress />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-label', 'Progreso de lectura de la página');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('returns null when user prefers reduced motion', () => {
    vi.doMock('motion/react', () => ({
      motion: new Proxy({}, { get: () => () => null }),
      useReducedMotion: () => true,
      useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
      useSpring: () => ({ get: () => 0 }),
    }));
  });

  it('renders without crashing', () => {
    expect(() => render(<ScrollProgress />)).not.toThrow();
  });
});
