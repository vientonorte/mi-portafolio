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
      });

      it('has hero section with required keys', () => {
        const nav = translations[lang].nav;
        const hero = translations[lang].hero;
        expect(hero).toHaveProperty('label');
        expect(hero).toHaveProperty('headlineLead');
        expect(hero).toHaveProperty('headlineFocus');
        expect(hero.unifiedBanner).toHaveProperty('groupLabel');
        expect(hero.unifiedBanner.tabs).toHaveProperty('recursos');
        expect(hero.unifiedBanner.tabs).toHaveProperty('consultoria');
        expect(hero.unifiedBanner.tabs).toHaveProperty('contacto');
        expect(hero.unifiedBanner).toHaveProperty('searchPlaceholder');
        expect(hero.unifiedBanner).toHaveProperty('liveSuggestionsCount');
        expect(hero.unifiedBanner).toHaveProperty('liveSuggestionsActive');
        // X | CMS + GEES + contacto + auditoría (mín. 3; crece con demos)
        expect(hero.unifiedBanner.suggestions.length).toBeGreaterThanOrEqual(3);
        expect(hero.unifiedBanner.suggestions.map((s) => s.id)).toEqual(
          expect.arrayContaining(['recursos-home', 'consultoria-metodo', 'contacto-hablar'])
        );
        expect(hero.unifiedBanner.tabs).toMatchObject({
          recursos: expect.any(String),
          consultoria: expect.any(String),
          contacto: expect.any(String),
        });
        expect(hero.unifiedBanner.panels.recursos).toHaveProperty('composerHint');
        expect(hero.unifiedBanner.panels.recursos).toHaveProperty('ctaPrimary');
        expect(hero.unifiedBanner.panels.consultoria).toHaveProperty('ctaPrimary');
        expect(hero.unifiedBanner.panels.contacto).toHaveProperty('ctaPrimary');
        expect(nav).toHaveProperty('consulting');
        expect(nav).toHaveProperty('resources');
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