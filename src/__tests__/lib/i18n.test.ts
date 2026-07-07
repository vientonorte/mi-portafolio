import { describe, it, expect } from 'vitest';
import { translations, type Language } from '@/lib/i18n';

describe('translations', () => {
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
      });

      it('has hero section with required keys', () => {
        const nav = translations[lang].nav;
        const hero = translations[lang].hero;
        expect(hero).toHaveProperty('label');
        expect(hero).toHaveProperty('headlineLead');
        expect(hero).toHaveProperty('headlineFocus');
        expect(hero.unifiedBanner).toHaveProperty('groupLabel');
        expect(hero.unifiedBanner.tabs).toHaveProperty('negocios');
        expect(hero.unifiedBanner.tabs).toHaveProperty('contacto');
        expect(hero.unifiedBanner.tabs).toHaveProperty('auditorias');
        expect(hero.unifiedBanner).toHaveProperty('searchPlaceholder');
        expect(hero.unifiedBanner.suggestions).toHaveLength(3);
        expect(hero.unifiedBanner.panels.negocios).toHaveProperty('composerHint');
        expect(hero.unifiedBanner.panels.negocios).toHaveProperty('ctaPrimary');
        expect(hero.unifiedBanner.panels.contacto).toHaveProperty('ctaPrimary');
        expect(hero.unifiedBanner.panels.auditorias).toHaveProperty('privacyNote');
        expect(nav).toHaveProperty('consulting');
        expect(nav).toHaveProperty('audit');
        expect(nav).toHaveProperty('uxtools');
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
