import { Clock, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { HERO_ROLES } from "../../data/consultoria-hero-roles";
import {
  demoMinutes,
  getServicePathDemo,
} from "../../data/service-path-demos";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { trackEvent } from "../../lib/analytics";
import { ROUTES } from "../../lib/routes";

/**
 * Home: una demo con reloj por path de servicio.
 * SEM no monta esta sección.
 */
export function ServicePathDemos() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language).consultoria.pathDemos;

  return (
    <PageSection
      id="consultoria-demo"
      padding="default"
      width="wide"
      tone="default"
      aria-labelledby="service-path-demos-heading"
    >
      <SectionHeader
        badge={t.badge}
        badgeIcon={Play}
        title={t.title}
        description={t.description}
        titleId="service-path-demos-heading"
        align="left"
      />

      <ul className="grid gap-5 sm:grid-cols-2" role="list">
        {HERO_ROLES.map((role) => {
          const demo = getServicePathDemo(role.id);
          if (!demo) return null;
          const mins = demoMinutes(demo);
          return (
            <li key={role.id}>
              <Card className="flex h-full flex-col overflow-hidden border-2 border-[color:var(--logo-surface-border)] bg-surface-matte-elevated">
                <figure className="relative aspect-[16/9] overflow-hidden border-b border-[color:var(--logo-surface-border)] bg-muted">
                  <img
                    src={demo.poster}
                    alt=""
                    className="h-full w-full object-cover object-top"
                  />
                  <figcaption className="sr-only">
                    {demo.caption[language]}
                  </figcaption>
                </figure>
                <CardContent className="flex flex-1 flex-col gap-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {role.title[language]}
                  </p>
                  <p className="text-lg font-semibold tracking-tight">
                    {demo.caption[language]}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {role.hint[language]}
                  </p>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button
                    type="button"
                    variant="outline"
                    className="min-h-[44px] w-full"
                    onClick={() => {
                      trackEvent("service_path_demo_open", {
                        path_id: demo.id,
                        package_id: demo.packageId,
                        duration_sec: demo.durationSec,
                      });
                      navigate(ROUTES.serviceDemo(demo.id));
                    }}
                  >
                    <Clock className="mr-2 h-4 w-4" aria-hidden />
                    {t.cta.replace("{min}", String(mins))}
                  </Button>
                </CardFooter>
              </Card>
            </li>
          );
        })}
      </ul>
    </PageSection>
  );
}
