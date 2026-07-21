import { useEffect, useMemo } from 'react';
import { Contact } from '../components/organisms/Contact';
import { SEOHead } from '../components/atoms/SEOHead';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { canonicalFromPath } from '../lib/seo';
import { useNavigate, useLocation } from 'react-router-dom';
import { withHomeCrumb } from '../lib/breadcrumb-helpers';
import { toast } from 'sonner';
import { parseContactDraftFromState, type ContactDraft } from '../lib/contact-draft';
import {
  buildContactDraft,
  parseContactIntentFromSearch,
} from '../lib/navigate-to-contact';

function resolveContactDraft(
  state: unknown,
  search: string
): ContactDraft | null {
  const fromState = parseContactDraftFromState(state);
  if (fromState) return fromState;

  const intent = parseContactIntentFromSearch(search);
  if (!intent) return null;

  return buildContactDraft({ intent, source: 'cta', origin: 'other' });
}

const Contacto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const contactDraft = useMemo(
    () => resolveContactDraft(location.state, location.search),
    [location.search, location.state]
  );

  const draftKey = contactDraft
    ? `${contactDraft.source}-${contactDraft.intent ?? 'none'}-${contactDraft.message.slice(0, 40)}`
    : 'empty';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('sent') !== '1') return;

    toast.success(t.contact.form.success);
    params.delete('sent');
    const nextSearch = params.toString();
    navigate(
      { pathname: location.pathname, search: nextSearch ? `?${nextSearch}` : '' },
      { replace: true }
    );
  }, [location.pathname, location.search, navigate, t.contact.form.success]);

  return (
    <PageShell
      crumbs={withHomeCrumb(t.breadcrumbs.home, () => navigate('/'), [
        { label: t.breadcrumbs.contact, current: true },
      ])}
    >
      <SEOHead
        {...t.seo.pages.contact}
        keywords={t.seo.keywords}
        url={canonicalFromPath('/contacto')}
      />
      <Contact key={draftKey} contactDraft={contactDraft} />
    </PageShell>
  );
};

export default Contacto;
