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
        const hero = translations[lang].hero;
        expect(hero).toHaveProperty('label');
        expect(hero).toHaveProperty('headlineLead');
        expect(hero).toHaveProperty('headlineFocus');
        expect(hero.cta).toHaveProperty('primary');
        expect(hero.cta).toHaveProperty('secondary');
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
