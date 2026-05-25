import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionBadge } from '@/components/atoms/SectionBadge';
import { Star } from 'lucide-react';

describe('SectionBadge', () => {
  it('renders children text', () => {
    render(<SectionBadge>Sobre mí</SectionBadge>);
    expect(screen.getByText('Sobre mí')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const { container } = render(<SectionBadge icon={Star}>Con icono</SectionBadge>);
    const icon = container.querySelector('svg[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
  });

  it('renders without icon when not provided', () => {
    const { container } = render(<SectionBadge>Sin icono</SectionBadge>);
    const icon = container.querySelector('svg[aria-hidden="true"]');
    expect(icon).not.toBeInTheDocument();
  });

  it('applies badge styles', () => {
    const { container } = render(<SectionBadge>Badge</SectionBadge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full');
  });
});
