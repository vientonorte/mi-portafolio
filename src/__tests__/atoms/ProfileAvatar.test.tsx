import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProfileAvatar } from '@/components/atoms/ProfileAvatar';

describe('ProfileAvatar', () => {
  it('renders profile image by default', () => {
    render(<ProfileAvatar alt="Rodrigo Gaete" />);
    expect(screen.getByRole('img', { name: 'Rodrigo Gaete' })).toBeInTheDocument();
  });
});