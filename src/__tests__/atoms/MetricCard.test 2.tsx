import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricCard } from '@/components/atoms/MetricCard';
import { TrendingUp } from 'lucide-react';

describe('MetricCard', () => {
  it('renders value and label', () => {
    render(<MetricCard value="+30%" label="Conversión" />);
    expect(screen.getByText('+30%')).toBeInTheDocument();
    expect(screen.getByText('Conversión')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    const { container } = render(
      <MetricCard value="5x" label="ROI" icon={TrendingUp} />
    );
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('renders without icon when not provided', () => {
    const { container } = render(<MetricCard value="100" label="Usuarios" />);
    expect(container.querySelector('svg[aria-hidden="true"]')).not.toBeInTheDocument();
  });

  it('applies custom color class', () => {
    const { container } = render(
      <MetricCard value="42" label="Score" color="text-green-500" />
    );
    const valueEl = container.querySelector('.text-green-500');
    expect(valueEl).toBeInTheDocument();
  });
});
