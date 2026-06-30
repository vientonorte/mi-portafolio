import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from 'lucide-react';
import { NavTabItem } from '@/components/atoms/NavTabItem';

describe('NavTabItem', () => {
  it('renders label and icon', () => {
    render(<NavTabItem icon={Home} label="Inicio" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Inicio' })).toBeInTheDocument();
  });

  it('marks active state with aria-current', () => {
    render(<NavTabItem icon={Home} label="Inicio" active onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Inicio' })).toHaveAttribute('aria-current', 'page');
  });

  it('calls onClick when tapped', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<NavTabItem icon={Home} label="Inicio" onClick={onClick} />);
    await user.click(screen.getByRole('button', { name: 'Inicio' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});