import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from '@vientonorte/ui/card';
import { Badge } from '@vientonorte/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@vientonorte/ui/tabs';

interface SuraEcosistemaEvidencesProps {
  lang: "es" | "en";
}

export function SuraEcosistemaEvidences({ lang }: SuraEcosistemaEvidencesProps) {
  const content = {
    es: {
      title: "Evidencias del Ecosistema Digital",
      tab1: "Contexto & Timeline",
      tab2: "Design System",
      tab3: "Flujo Onboarding",
      tab4: "Casos de Error",
      contextTitle: "Problemática Inicial",
      contextItems: [
        "+20 sitios web públicos fragmentados sin identidad de marca unificada",
        "Sin CMS ni gobierno de contenidos",
        "Dependencia total de TI para cualquier cambio",
        "Sitio web = touchpoint más importante (según research)",
      ],
      timelineTitle: "Fases del Proyecto",
      phase1: "Discovery (Nov 23 - Ene 24)",
      phase1desc: "Research, auditoría de sitios, stakeholder interviews",
      phase2: "Estructuración (Mar 24 - Ago 24)",
      phase2desc: "Arquitectura de información, CMS strategy, Design System",
      phase3: "Implementación Fase 1 (Sep 24 - Oct 25)",
      phase3desc: "Rollout Chile 🇨🇱 - Sitios públicos + Onboarding",
      phase4: "Fase 2 Regional (En curso)",
      phase4desc: "Expansión a otros países de la región",
      dsTitle: "Design System Implementado",
      dsItem1: "Atomic Design",
      dsItem1desc: "50+ componentes reutilizables organizados en átomos, moléculas y organismos",
      dsItem2: "Sistema de Colores SURA",
      dsItem2desc: "Paleta unificada: #0b2dce (brand blue), grises (#314158, #717182, #45556c)",
      dsItem3: "Tipografía Inter",
      dsItem3desc: "Sistema tipográfico: Regular, Medium, Semi Bold para jerarquías claras",
      dsItem4: "Componentes Core",
      dsItem4desc: "Cards, Badges, Progress bars, Icons, Forms, Buttons con estados consistentes",
      onboardingTitle: "Flujo 'Hazte Cliente' Optimizado",
      onboardingDesc: "Proceso de registro rediseñado en 4 pasos claros",
      step1: "Paso 1: Ingreso de datos",
      step1time: "1-2 min",
      step2: "Paso 2: Validación de correo",
      step2time: "2-3 min",
      step3: "Paso 3: Verificación de identidad",
      step3time: "3-5 min",
      step4: "Paso 4: Confirmación",
      step4time: "< 1 min",
      totalTime: "Tiempo total: 7-11 min (vs 15+ min previo)",
      improvements: "Mejoras Implementadas",
      improvement1: "✅ Progress bars visuales por paso",
      improvement2: "✅ Time badges con estimación de duración",
      improvement3: "✅ Validaciones en tiempo real",
      improvement4: "✅ Success states con feedback claro",
      improvement5: "✅ Iconografía específica por paso",
      improvement6: "✅ Layout responsive con mobile-first",
      errorsTitle: "Casos de Error Diseñados",
      errorsDesc: "6 escenarios de error con UX específico y mensajes claros",
      error1: "Usuario es cliente de la CB",
      error1desc: "Se levanta mensaje de que ya es cliente y se le invita a ingresar al sitio",
      error2: "Bloqueado por cumplimiento",
      error2desc: "Se levanta mensaje de que debe contactar al Call Center o asesor",
      error3: "No se puede confirmar identidad",
      error3desc: "Se levanta mensaje de que debe contactar al Call Center o asesor",
      error4: "Error servicio",
      error4desc: "Se levanta mensaje de volver a intentarlo con botón recargar",
      error5: "No se pueden generar preguntas",
      error5desc: "Se levanta mensaje de volver a intentarlo con botón recargar",
      error6: "Error código de verificación",
      error6desc: "Se levanta mensaje de error y volver a enviar el código",
    },
    en: {
      title: "Digital Ecosystem Evidence",
      tab1: "Context & Timeline",
      tab2: "Design System",
      tab3: "Onboarding Flow",
      tab4: "Error Cases",
      contextTitle: "Initial Problem",
      contextItems: [
        "+20 fragmented public websites without unified brand identity",
        "No CMS or content governance",
        "Total dependency on IT for any change",
        "Website = most important touchpoint (according to research)",
      ],
      timelineTitle: "Project Phases",
      phase1: "Discovery (Nov 23 - Jan 24)",
      phase1desc: "Research, site audit, stakeholder interviews",
      phase2: "Structuring (Mar 24 - Aug 24)",
      phase2desc: "Information architecture, CMS strategy, Design System",
      phase3: "Implementation Phase 1 (Sep 24 - Oct 25)",
      phase3desc: "Chile rollout 🇨🇱 - Public sites + Onboarding",
      phase4: "Regional Phase 2 (Ongoing)",
      phase4desc: "Expansion to other regional countries",
      dsTitle: "Implemented Design System",
      dsItem1: "Atomic Design",
      dsItem1desc: "50+ reusable components organized in atoms, molecules and organisms",
      dsItem2: "SURA Color System",
      dsItem2desc: "Unified palette: #0b2dce (brand blue), grays (#314158, #717182, #45556c)",
      dsItem3: "Inter Typography",
      dsItem3desc: "Type system: Regular, Medium, Semi Bold for clear hierarchies",
      dsItem4: "Core Components",
      dsItem4desc: "Cards, Badges, Progress bars, Icons, Forms, Buttons with consistent states",
      onboardingTitle: "'Become a Client' Optimized Flow",
      onboardingDesc: "Redesigned registration process in 4 clear steps",
      step1: "Step 1: Data entry",
      step1time: "1-2 min",
      step2: "Step 2: Email validation",
      step2time: "2-3 min",
      step3: "Step 3: Identity verification",
      step3time: "3-5 min",
      step4: "Step 4: Confirmation",
      step4time: "< 1 min",
      totalTime: "Total time: 7-11 min (vs 15+ min previous)",
      improvements: "Implemented Improvements",
      improvement1: "✅ Visual progress bars per step",
      improvement2: "✅ Time badges with duration estimate",
      improvement3: "✅ Real-time validations",
      improvement4: "✅ Success states with clear feedback",
      improvement5: "✅ Specific iconography per step",
      improvement6: "✅ Responsive layout with mobile-first",
      errorsTitle: "Designed Error Cases",
      errorsDesc: "6 error scenarios with specific UX and clear messages",
      error1: "User is already a client",
      error1desc: "Message shown indicating they are already a client and invited to log in",
      error2: "Blocked by compliance",
      error2desc: "Message shown to contact Call Center or advisor",
      error3: "Cannot confirm identity",
      error3desc: "Message shown to contact Call Center or advisor",
      error4: "Service error",
      error4desc: "Message shown to try again with reload button",
      error5: "Cannot generate questions",
      error5desc: "Message shown to try again with reload button",
      error6: "Verification code error",
      error6desc: "Error message shown with option to resend code",
    },
  };

  const t = content[lang];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="mb-4">{t.title}</h2>
      </motion.div>

      <Tabs defaultValue="context" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="context">{t.tab1}</TabsTrigger>
          <TabsTrigger value="design-system">{t.tab2}</TabsTrigger>
          <TabsTrigger value="onboarding">{t.tab3}</TabsTrigger>
          <TabsTrigger value="errors">{t.tab4}</TabsTrigger>
        </TabsList>

        {/* Tab 1: Contexto & Timeline */}
        <TabsContent value="context" className="space-y-6">
          {/* Contexto */}
          <Card className="border-2 border-destructive/30">
            <CardHeader>
              <h3>{t.contextTitle}</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {t.contextItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-destructive mt-1">⚠️</span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <h3>{t.timelineTitle}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge>01</Badge>
                  <h4 className="text-base">{t.phase1}</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-12">{t.phase1desc}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge>02</Badge>
                  <h4 className="text-base">{t.phase2}</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-12">{t.phase2desc}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-600">03</Badge>
                  <h4 className="text-base">{t.phase3}</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-12">{t.phase3desc}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">04</Badge>
                  <h4 className="text-base">{t.phase4}</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-12">{t.phase4desc}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Design System */}
        <TabsContent value="design-system" className="space-y-6">
          <Card>
            <CardHeader>
              <h3>{t.dsTitle}</h3>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚛️</span>
                  <h4 className="text-base">{t.dsItem1}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{t.dsItem1desc}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  <h4 className="text-base">{t.dsItem2}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{t.dsItem2desc}</p>
                <div className="flex gap-2 mt-2">
                  <div className="w-10 h-10 rounded-lg bg-[#0b2dce]" title="#0b2dce"></div>
                  <div className="w-10 h-10 rounded-lg bg-[#314158]" title="#314158"></div>
                  <div className="w-10 h-10 rounded-lg bg-[#717182]" title="#717182"></div>
                  <div className="w-10 h-10 rounded-lg bg-[#45556c]" title="#45556c"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔤</span>
                  <h4 className="text-base">{t.dsItem3}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{t.dsItem3desc}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🧩</span>
                  <h4 className="text-base">{t.dsItem4}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{t.dsItem4desc}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Onboarding */}
        <TabsContent value="onboarding" className="space-y-6">
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <h3>{t.onboardingTitle}</h3>
              <p className="text-sm text-muted-foreground">{t.onboardingDesc}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm">{t.step1}</h4>
                    <Badge variant="secondary" className="text-xs">{t.step1time}</Badge>
                  </div>
                  <div className="h-2 bg-[#0b2dce] rounded-full"></div>
                </div>

                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm">{t.step2}</h4>
                    <Badge variant="secondary" className="text-xs">{t.step2time}</Badge>
                  </div>
                  <div className="h-2 bg-[#0b2dce] rounded-full"></div>
                </div>

                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm">{t.step3}</h4>
                    <Badge variant="secondary" className="text-xs">{t.step3time}</Badge>
                  </div>
                  <div className="h-2 bg-[#0b2dce] rounded-full"></div>
                </div>

                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border-2 border-[#0b2dce]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm">{t.step4}</h4>
                    <Badge className="bg-[#0b2dce] text-xs">{t.step4time}</Badge>
                  </div>
                  <div className="h-2 bg-[#0b2dce] rounded-full"></div>
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border-2 border-green-200 dark:border-green-800">
                <p className="text-center">{t.totalTime}</p>
              </div>
            </CardContent>
          </Card>

          {/* Improvements */}
          <Card>
            <CardHeader>
              <h3>{t.improvements}</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <p className="text-sm text-muted-foreground">{t.improvement1}</p>
                <p className="text-sm text-muted-foreground">{t.improvement2}</p>
                <p className="text-sm text-muted-foreground">{t.improvement3}</p>
                <p className="text-sm text-muted-foreground">{t.improvement4}</p>
                <p className="text-sm text-muted-foreground">{t.improvement5}</p>
                <p className="text-sm text-muted-foreground">{t.improvement6}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Errors */}
        <TabsContent value="errors" className="space-y-6">
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <h3>{t.errorsTitle}</h3>
              <p className="text-sm text-muted-foreground">{t.errorsDesc}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm">{t.error1}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.error1desc}</p>
                </div>

                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm">{t.error2}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.error2desc}</p>
                </div>

                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm">{t.error3}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.error3desc}</p>
                </div>

                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border-2 border-[#0b2dce]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm">{t.error4}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.error4desc}</p>
                </div>

                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border-2 border-[#0b2dce]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm">{t.error5}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.error5desc}</p>
                </div>

                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg border-2 border-[#0b2dce]">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm">{t.error6}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.error6desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}