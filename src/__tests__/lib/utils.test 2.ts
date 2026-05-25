import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn (className merge)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });

  it('deduplicates tailwind classes (last wins)', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles undefined and null gracefully', () => {
    expect(cn(undefined, null, 'valid')).toBe('valid');
  });

  it('returns empty string when no classes given', () => {
    expect(cn()).toBe('');
  });

  it('merges array of classes', () => {
    const result = cn('p-2', 'p-4');
    expect(result).toBe('p-4');
  });
});
