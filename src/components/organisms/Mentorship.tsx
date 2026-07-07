import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { GraduationCap } from "lucide-react";
import { PageSection } from "../layout/PageSection";
import { SectionHeader } from "../molecules/SectionHeader";
import { CompanyLogo } from "../atoms/CompanyLogo";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/i18n";
import { getMentorships } from "../../data/mentorship-data";

export function Mentorship() {
  const { language } = useLanguage();
  const t = useTranslation(language).mentorship;
  const mentorships = getMentorships(language);

  return (
    <PageSection
      id="mentorias"
      padding="compact"
      width="wide"
      tone="muted"
      aria-labelledby="mentorship-heading"
    >
      <SectionHeader
        badge={t.badge}
        badgeIcon={GraduationCap}
        title={t.title}
        description={t.description}
        titleId="mentorship-heading"
      />

      <div className="space-y-6">
        {mentorships.map((entry, index) => (
          <motion.article
            key={`${entry.organization}-${entry.period}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Card
              className={
                entry.isCurrent ? "border-primary/50 border-2 bg-primary/5" : "hover:shadow-lg transition-shadow"
              }
            >
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <CompanyLogo src={entry.logo} alt={`${entry.organization} logo`} size="md" />

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle>{entry.role}</CardTitle>
                        {entry.isCurrent && (
                          <Badge className="bg-green-500 text-white hover:bg-green-600">{t.current}</Badge>
                        )}
                        <Badge variant="outline" className="border-primary/25 text-foreground">
                          {t.cause}: {entry.cause}
                        </Badge>
                      </div>
                      <CardDescription>{entry.organization}</CardDescription>
                      {entry.partner && (
                        <p className="text-xs text-muted-foreground">
                          {t.viaPartner.replace("{partner}", entry.partner)}
                        </p>
                      )}
                    </div>
                  </div>

                  <Badge variant="secondary" className="self-start whitespace-nowrap">
                    {entry.period}
                  </Badge>
                </div>

                <p className="mt-2 text-sm font-medium text-foreground/90">{entry.summary}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-1.5" role="list" aria-label={t.achievementsLabel}>
                  {entry.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1 text-primary" aria-hidden="true">
                        •
                      </span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </div>
    </PageSection>
  );
}