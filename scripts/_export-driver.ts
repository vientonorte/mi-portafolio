/**
 * _export-driver.ts
 *
 * Driver file bundled by esbuild to extract portfolio data into JSON.
 * Not imported directly — run via: npm run export:skills
 *
 * import.meta.env.BASE_URL is replaced at bundle time via esbuild --define.
 */

import { getExperiences } from '../src/data/experience-data';
import {
  PERFIL_CYCLE,
  PERFIL_FIELD_AXES,
  PERFIL_DOES,
  PERFIL_EQUATION,
  PERFIL_TOOLS,
  PERFIL_QUOTE,
  PERFIL_TAGLINE,
  PERFIL_IDENTITY,
  PERFIL_NORTAMIENTO,
} from '../src/data/perfil-estrategico';
import { N2N_PHASES } from '../src/data/n2n-method';
import { allProjects } from '../src/data/projects-data';

const experiences = getExperiences('es');

const context = {
  // ------------------------------------------------------------------
  // Experiencia profesional (en español para mayor legibilidad del LLM)
  // ------------------------------------------------------------------
  experience: experiences.map((e) => ({
    company: e.company,
    position: e.position,
    period: e.period,
    location: e.location,
    stage: e.stage,
    context: e.context,
    role: e.role,
    impact: e.impact,
    achievements: e.achievements,
    tools: e.tools ?? [],
  })),

  // ------------------------------------------------------------------
  // Proyectos
  // ------------------------------------------------------------------
  projects: allProjects.map((p) => ({
    company: p.company,
    projectName: p.projectName,
    role: p.role,
    period: p.period,
    description: p.description,
    tags: p.tags ?? [],
  })),

  // ------------------------------------------------------------------
  // Metodología — Perfil Estratégico
  // ------------------------------------------------------------------
  perfilCycle: PERFIL_CYCLE.map((s) => ({
    n: s.n,
    titleEs: s.titleEs,
    titleEn: s.titleEn,
    bodyEs: s.bodyEs,
    bodyEn: s.bodyEn,
  })),

  perfilAxes: PERFIL_FIELD_AXES.map((a) => ({
    id: a.id,
    labelEs: a.labelEs,
    labelEn: a.labelEn,
    detailEs: a.detailEs,
    detailEn: a.detailEn,
    score: a.score,
  })),

  perfilDoes: PERFIL_DOES.es,
  perfilTools: Array.from(PERFIL_TOOLS),
  perfilIdentity: PERFIL_IDENTITY.es,

  equation: {
    parts: Array.from(PERFIL_EQUATION.es.parts),
    result: PERFIL_EQUATION.es.result,
    tagline: PERFIL_EQUATION.es.tagline,
  },

  quote: PERFIL_QUOTE.es,
  tagline: PERFIL_TAGLINE.es,
  nortamiento: PERFIL_NORTAMIENTO.es,

  // ------------------------------------------------------------------
  // Método N2N
  // ------------------------------------------------------------------
  n2nPhases: N2N_PHASES.map((p) => ({
    id: p.id,
    step: p.step,
    title: p.title.es,
    outcome: p.outcome.es,
  })),

  // ------------------------------------------------------------------
  // Metadata
  // ------------------------------------------------------------------
  exportedAt: new Date().toISOString(),
  version: '1.0.0',
};

// Write to stdout so export-skills.mjs can pipe it to a file
process.stdout.write(JSON.stringify(context, null, 2));
