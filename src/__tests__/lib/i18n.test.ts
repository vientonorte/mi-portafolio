import { beforeAll, describe, expect, it } from 'vitest';
import { preloadAllTranslations } from '@/lib/i18n';
import type { Language, Translation } from '@/lib/i18n';

let translations: Record<Language, Translation>;

describe('translations', () => {
  beforeAll(async () => {
    translations = await preloadAllTranslations();
  });

  const languages: Language[] = ['es', 'en'];

  it('has both es and en keys', () => {
    expect(translations).toHaveProperty('es');
    expect(translations).toHaveProperty('en');
  });

  languages.forEach((lang) => {
    describe(`${lang} translations`, () => {
      it('has nav section with required keys', () => {
        const nav = translations[lang].nav;
        expect(nav).toHaveProperty('about');
        expect(nav).toHaveProperty('projects');
        expect(nav).toHaveProperty('contact');
        expect(nav).toHaveProperty('consulting');
        expect(nav).toHaveProperty('uxtools');
      });

      it('has hero path cards (3 audiences) and panels', () => {
        const nav = translations[lang].nav;
        const hero = translations[lang].hero;
        expect(hero).toHaveProperty('label');
        expect(hero).toHaveProperty('headlineLead');
        expect(hero).toHaveProperty('headlineFocus');
        expect(hero.unifiedBanner).toHaveProperty('groupLabel');
        // Path cards model (2026-07): Reclutadores · Empresas · Gratis/Radar
        expect(hero.unifiedBanner.tabs).toHaveProperty('negocios');
        expect(hero.unifiedBanner.tabs).toHaveProperty('contacto');
        expect(hero.unifiedBanner.tabs).toHaveProperty('auditorias');
        expect(hero.unifiedBanner).toHaveProperty('searchPlaceholder');
        expect(hero.unifiedBanner).toHaveProperty('liveSuggestionsCount');
        expect(hero.unifiedBanner).toHaveProperty('liveSuggestionsActive');
        expect(hero.unifiedBanner.suggestions.length).toBeGreaterThanOrEqual(3);
        expect(hero.unifiedBanner.suggestions.map((s) => s.id)).toEqual(
          expect.arrayContaining([
            'reclutadores-cx',
            'consultoria-viento-norte',
            'auditoria-accesibilidad',
          ])
        );
        expect(hero.unifiedBanner.tabs).toMatchObject({
          negocios: expect.any(String),
          contacto: expect.any(String),
          auditorias: expect.any(String),
        });
        expect(hero.unifiedBanner.panels.negocios).toHaveProperty('ctaPrimary');
        expect(hero.unifiedBanner.panels.contacto).toHaveProperty('ctaPrimary');
        expect(hero.unifiedBanner.panels.auditorias).toHaveProperty('ctaPrimary');
        expect(nav).toHaveProperty('consulting');
        expect(nav).toHaveProperty('uxtools');
      });

      it('has packagesSection with dual CTAs', () => {
        const packages = translations[lang].consultoria.packagesSection;
        expect(packages).toHaveProperty('cta');
        expect(packages).toHaveProperty('ctaForm');
        expect(packages).toHaveProperty('ctaDemo');
        expect(packages.cta.length).toBeGreaterThan(0);
        expect(packages.ctaForm.length).toBeGreaterThan(0);
        expect(packages.ctaDemo).toContain('{min}');
      });

      it('has timed path demos copy', () => {
        const pathDemos = translations[lang].consultoria.pathDemos;
        expect(pathDemos.title.length).toBeGreaterThan(8);
        expect(pathDemos.cta).toContain('{min}');
      });

      it('has about section with required keys', () => {
        const about = translations[lang].about;
        expect(about).toHaveProperty('title');
        expect(about).toHaveProperty('description');
      });

      it('has non-empty string values for nav items', () => {
        const nav = translations[lang].nav;
        (Object.values(nav) as string[]).forEach((value) => {
          expect(typeof value).toBe('string');
          expect(value.length).toBeGreaterThan(0);
        });
      });
    });
  });

  it('es and en have different content for nav.about', () => {
    expect(translations.es.nav.about).not.toBe(translations.en.nav.about);
  });
});
