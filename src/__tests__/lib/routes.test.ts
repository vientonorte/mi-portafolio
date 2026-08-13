import { describe, it, expect } from 'vitest';
import {
  ROUTES,
  LEGACY_ROUTES,
  isProcessPath,
  isConsultingOfferPath,
  isConsultingFunnelPath,
  isConsultingPath,
  isAdminPath,
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

  it('home = embudo FO · /consultoria = SEM oferta', () => {
    expect(ROUTES.home).toBe('/');
    expect(ROUTES.consultingFunnel).toBe('/');
    expect(ROUTES.consulting).toBe('/consultoria');
    expect(LEGACY_ROUTES.consultingFunnelLegacy).toBe('/consultoria/embudo');

    expect(isConsultingFunnelPath('/')).toBe(true);
    expect(isConsultingFunnelPath('/consultoria/embudo')).toBe(true);
    expect(isConsultingFunnelPath('/consultoria')).toBe(false);

    expect(isConsultingOfferPath('/consultoria')).toBe(true);
    expect(isConsultingOfferPath('/consultoria/modulos/dashboard')).toBe(true);
    expect(isConsultingOfferPath('/')).toBe(false);
    expect(isConsultingOfferPath('/consultoria/embudo')).toBe(false);

    expect(isConsultingPath('/')).toBe(true);
    expect(isConsultingPath('/consultoria')).toBe(true);
  });

  it('admin hub and photos are admin paths', () => {
    expect(ROUTES.admin).toBe('/admin');
    expect(ROUTES.adminPhotos).toBe('/admin/fotos');
    expect(isAdminPath('/admin')).toBe(true);
    expect(isAdminPath('/admin/fotos')).toBe(true);
    expect(isAdminPath('/contacto')).toBe(false);
    expect(isAdminPath('/proyectos')).toBe(false);
  });
});
