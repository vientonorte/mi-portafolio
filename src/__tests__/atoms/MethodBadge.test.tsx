import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MethodBadge } from '@/components/atoms/MethodBadge';
import { Users } from 'lucide-react';

describe('MethodBadge', () => {
  it('renders label text', () => {
    render(<MethodBadge icon={Users} label="Design Thinking" />);
    expect(screen.getByText('Design Thinking')).toBeInTheDocument();
  });

  it('renders icon with aria-hidden', () => {
    const { container } = render(<MethodBadge icon={Users} label="UX Research" />);
    const icon = container.querySelector('svg[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
  });

  it('applies pill styles', () => {
    const { container } = render(<MethodBadge icon={Users} label="Test" />);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('inline-flex', 'rounded-full', 'text-sm');
  });

  it('accepts index prop without errors', () => {
    expect(() => render(<MethodBadge icon={Users} label="Test" index={3} />)).not.toThrow();
  });
});
