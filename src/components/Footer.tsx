import { Link } from 'react-router-dom';
import { SITE_CONTACT, getContactMailtoUrl } from '../lib/site-contact';
import { VIENTO_NORTE_LINKS } from '../lib/viento-norte-links';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';

const Footer = () => {
  const { language } = useLanguage();
  const t = useTranslation(language).footer;

  return (
    <footer
      role="contentinfo"
      className="site-footer mt-8 border-t border-[color:var(--logo-surface-border)] bg-[--color-pizarra] py-4 text-center text-white"
    >
      <nav aria-label={language === 'es' ? 'Enlaces del sitio' : 'Site links'}>
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
          <li>
            <a
              href={getContactMailtoUrl()}
              className="underline underline-offset-2 hover:text-white/90"
            >
              {t.contact}
            </a>
          </li>
          <li aria-hidden className="text-white/40">
            ·
          </li>
          <li>
            <a
              href={SITE_CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white/90"
            >
              {t.linkedin}
            </a>
          </li>
          <li aria-hidden className="text-white/40">
            ·
          </li>
          <li>
            <Link to="/privacy" className="underline underline-offset-2 hover:text-white/90">
              {t.privacy}
            </Link>
          </li>
          <li aria-hidden className="text-white/40">
            ·
          </li>
          <li>
            <a
              href={VIENTO_NORTE_LINKS.uxtools}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white/90"
            >
              {t.uxtools}
            </a>
          </li>
          <li aria-hidden className="text-white/40">
            ·
          </li>
          <li>
            <a
              href={VIENTO_NORTE_LINKS.research}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white/90"
            >
              {t.research}
            </a>
          </li>
        </ul>
      </nav>
      <p className="mt-2 text-sm text-white/90">
        © {new Date().getFullYear()} {t.copyright}
      </p>
      <p className="mt-1 text-xs text-white/60">{t.tagline}</p>
    </footer>
  );
};

export default Footer;