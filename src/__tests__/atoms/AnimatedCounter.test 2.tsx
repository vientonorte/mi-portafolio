import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnimatedCounter } from '@/components/atoms/AnimatedCounter';

describe('AnimatedCounter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with prefix and suffix', () => {
    render(<AnimatedCounter end={100} prefix="+" suffix="%" />);
    const el = screen.getByText(/\+.*%/);
    expect(el).toBeInTheDocument();
  });

  it('renders span with tabular-nums class', () => {
    const { container } = render(<AnimatedCounter end={50} />);
    const span = container.querySelector('span.tabular-nums');
    expect(span).toBeInTheDocument();
  });

  it('renders without prefix/suffix by default', () => {
    const { container } = render(<AnimatedCounter end={10} />);
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
  });

  it('accepts duration prop without errors', () => {
    expect(() => render(<AnimatedCounter end={200} duration={3} />)).not.toThrow();
  });
});
