import { Link } from 'react-router-dom';
import { SITE_CONTACT, getContactMailtoUrl } from '../lib/site-contact';
import { VIENTO_NORTE_LINKS } from '../lib/viento-norte-links';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';

interface FooterProps {
  /**
   * "contact-only": footer de páginas estáticas (/servicios/) — un único enlace
   * mailto, sin router ni i18n. Default = footer completo del sitio.
   */
  variant?: 'site' | 'contact-only';
}

export function ContactOnlyFooter() {
  return (
    <footer
      role="contentinfo"
      className="site-footer border-t border-border/40 bg-[#0A0A0A] py-8 text-center text-[#E8E5DF]"
    >
      <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-brand-gradient" aria-hidden />
      <p className="text-sm">
        <a
          href={`mailto:${SITE_CONTACT.email}`}
          className="inline-flex min-h-11 items-center underline underline-offset-2 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {SITE_CONTACT.email}
        </a>
      </p>
      <p className="mt-1 text-sm text-white/75">Viento Norte · Diseño que reduce el ruido.</p>
    </footer>
  );
}

const Footer = ({ variant = 'site' }: FooterProps = {}) => {
  if (variant === 'contact-only') return <ContactOnlyFooter />;
  return <SiteFooter />;
};

const SiteFooter = () => {
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