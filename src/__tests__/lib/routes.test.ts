import { describe, it, expect } from 'vitest';
import {
  ROUTES,
  isProcessPath,
  isConsultingOfferPath,
  isConsultingFunnelPath,
} from '@/lib/routes';

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

  it('separates oferta tour vs embudo conversión', () => {
    expect(ROUTES.consulting).toBe('/consultoria');
    expect(ROUTES.consultingFunnel).toBe('/consultoria/embudo');
    expect(isConsultingOfferPath('/consultoria')).toBe(true);
    expect(isConsultingOfferPath('/consultoria/modulos/dashboard')).toBe(true);
    expect(isConsultingOfferPath('/consultoria/embudo')).toBe(false);
    expect(isConsultingFunnelPath('/consultoria/embudo')).toBe(true);
    expect(isConsultingFunnelPath('/consultoria')).toBe(false);
  });
});