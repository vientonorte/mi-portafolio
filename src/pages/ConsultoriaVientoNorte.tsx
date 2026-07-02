import { useNavigate } from "react-router-dom";
import { SEOHead } from "../components/atoms/SEOHead";
import { PageShell } from "../components/layout/PageShell";
import { PremiumUxAuditBanner } from "../components/organisms/PremiumUxAuditBanner";
import { ConsultoriaOnboarding } from "../components/organisms/ConsultoriaOnboarding";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { canonicalFromPath } from "../lib/seo";
import { withHomeCrumb } from "../lib/breadcrumb-helpers";

export default function ConsultoriaVientoNorte() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <PageShell
      crumbs={withHomeCrumb(t.breadcrumbs.home, () => navigate("/"), [
        { label: t.breadcrumbs.consulting, current: true },
      ])}
    >
      <SEOHead
        {...t.seo.pages.consultoria}
        keywords={t.seo.keywords}
        url={canonicalFromPath("/consultoria")}
      />
      <PremiumUxAuditBanner
        variant="compact"
        onStartConsulting={() =>
          document.getElementById("consultoria-onboarding")?.scrollIntoView({ behavior: "smooth" })
        }
        onViewSampleAudit={() => navigate("/auditoria")}
      />
      <div id="consultoria-onboarding">
        <ConsultoriaOnboarding />
      </div>
    </PageShell>
  );
}