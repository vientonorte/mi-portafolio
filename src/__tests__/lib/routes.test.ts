import { describe, it, expect } from 'vitest';
import { ROUTES, isProcessPath } from '@/lib/routes';

describe('routes', () => {
  it('builds process phase path', () => {
    expect(ROUTES.processPhase('ux-analytics')).toBe('/proceso/fase/ux-analytics');
  });

  it('detects canonical and legacy process paths', () => {
    expect(isProcessPath('/proceso')).toBe(true);
    expect(isProcessPath('/proceso/fase/ux-research')).toBe(true);
    expect(isProcessPath('/cases')).toBe(true);
    expect(isProcessPath('/cases/process/ux-ui-design')).toBe(true);
    expect(isProcessPath('/proyectos')).toBe(false);
  });
});