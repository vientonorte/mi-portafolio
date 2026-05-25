import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SectionDivider } from '@/components/atoms/SectionDivider';

describe('SectionDivider', () => {
  it('renders without crashing', () => {
    const { container } = render(<SectionDivider />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders default variant with border class', () => {
    const { container } = render(<SectionDivider variant="default" />);
    const line = container.querySelector('.bg-border');
    expect(line).toBeInTheDocument();
  });

  it('renders gradient variant', () => {
    const { container } = render(<SectionDivider variant="gradient" />);
    const gradient = container.querySelector('.bg-gradient-to-r');
    expect(gradient).toBeInTheDocument();
  });

  it('applies sm spacing class', () => {
    const { container } = render(<SectionDivider spacing="sm" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('my-12');
  });

  it('applies lg spacing class', () => {
    const { container } = render(<SectionDivider spacing="lg" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('my-20');
  });

  it('defaults to md spacing', () => {
    const { container } = render(<SectionDivider />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('my-16');
  });
});
