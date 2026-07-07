import { useEffect } from 'react';
import { Contact } from '../components/organisms/Contact';
import { SEOHead } from '../components/atoms/SEOHead';
import { PageShell } from '../components/layout/PageShell';
import { useLanguage } from '../lib/LanguageContext';
import { useTranslation } from '../lib/i18n';
import { canonicalFromPath } from '../lib/seo';
import { useNavigate, useLocation } from 'react-router-dom';
import { withHomeCrumb } from '../lib/breadcrumb-helpers';
import { toast } from 'sonner';

type ContactDraftState = { contactDraft?: { message?: string } };

const Contacto = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const initialMessage =
    (location.state as ContactDraftState | null)?.contactDraft?.message ?? "";

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
  }, [location.pathname, location.search, navigate, t.contact.form.successFallback]);

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
      <Contact key={initialMessage} initialMessage={initialMessage} />
    </PageShell>
  );
};

export default Contacto;