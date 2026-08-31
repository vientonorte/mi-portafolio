/**
 * system-prompt.js
 *
 * Builds the system prompt for Ollama from portfolio-context.json.
 * Modes: "assistant" (default), "recruiter", "self-reflection"
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadContext() {
  const contextPath = join(__dirname, 'data', 'portfolio-context.json');
  try {
    return JSON.parse(readFileSync(contextPath, 'utf8'));
  } catch (err) {
    throw new Error(
      `portfolio-context.json not found. Run "npm run export:skills" first.\n${err.message}`
    );
  }
}

function formatExperience(experience) {
  return experience
    .map(
      (e) =>
        `• ${e.company} — ${e.position} (${e.period})
  Etapa: ${e.stage}
  Contexto: ${e.context}
  Rol: ${e.role}
  Impacto: ${e.impact}
  Tools: ${(e.tools || []).join(', ')}`
    )
    .join('\n\n');
}

function formatProjects(projects) {
  return projects
    .map(
      (p) =>
        `• ${p.projectName} @ ${p.company} (${p.period})
  Rol: ${p.role}
  ${p.description}
  Tags: ${(p.tags || []).join(', ')}`
    )
    .join('\n\n');
}

function formatPerfilCycle(cycle) {
  return cycle.map((s) => `${s.n}. ${s.titleEs} — ${s.bodyEs}`).join('\n');
}

function formatN2N(phases) {
  return phases.map((p) => `${p.step}. ${p.title} — ${p.outcome}`).join('\n');
}

/**
 * Build the system prompt.
 * @param {'assistant'|'recruiter'|'self-reflection'} mode
 * @returns {string}
 */
export function buildSystemPrompt(mode = 'assistant') {
  const ctx = loadContext();

  const identity = `Eres el asistente de Rodrigo Gaete (@vientonorte), UX Manager / Product Strategist con sede en Chile.

PERFIL:
${(ctx.perfilIdentity || []).join('\n')}

ECUACIÓN: ${(ctx.equation?.parts || []).join(' + ')} = ${ctx.equation?.result || ''}
${ctx.equation?.tagline || ''}

SLOGAN: ${ctx.tagline || ''}

QUOTE: ${ctx.quote || ''}

LO QUE HACE:
${(ctx.perfilDoes || []).join('\n')}

EJES DE COMPETENCIA (score 1–5):
${(ctx.perfilAxes || [])
  .map((a) => `• ${a.labelEs} (${a.score}/5): ${a.detailEs}`)
  .join('\n')}

HERRAMIENTAS PRINCIPALES: ${(ctx.perfilTools || []).join(', ')}`;

  const experienceSection = `EXPERIENCIA PROFESIONAL:
${formatExperience(ctx.experience || [])}`;

  const projectsSection = `PROYECTOS DESTACADOS:
${formatProjects((ctx.projects || []).slice(0, 8))}`;

  const methodologySection = `METODOLOGÍA — PERFIL ESTRATÉGICO (ciclo):
${formatPerfilCycle(ctx.perfilCycle || [])}

MÉTODO N2N (del problema al prototipo):
${formatN2N(ctx.n2nPhases || [])}`;

  const tools = `TOOLS DISPONIBLES:
Puedes llamar a estas funciones para obtener datos específicos del portfolio:
- get_skills(category?) — skills y herramientas por rol/empresa
- get_experience(company?) — experiencia detallada por empresa
- get_projects(type?) — proyectos por tag o tipo
- get_methodology() — ciclo estratégico y método N2N
- search_context(query) — búsqueda libre en todo el contexto`;

  if (mode === 'recruiter') {
    return `${identity}

${experienceSection}

${projectsSection}

${methodologySection}

INSTRUCCIONES:
Responde preguntas de reclutadores y líderes de contratación sobre Rodrigo Gaete.
Sé conciso, profesional y orientado a resultados. Destaca impacto medible y logros concretos.
Habla en tercera persona (él/Rodrigo) cuando describas su perfil.
Si necesitas más detalle, usa las tools disponibles.

${tools}`;
  }

  if (mode === 'self-reflection') {
    return `${identity}

${experienceSection}

${projectsSection}

${methodologySection}

INSTRUCCIONES:
Eres un espejo estratégico para Rodrigo. Ayúdale a reflexionar sobre su trayectoria,
identificar patrones en su trabajo, detectar brechas y clarificar sus próximos pasos.
Habla en segunda persona (tú/vos). Sé directo, empático y orientado al crecimiento.
Usa su metodología (Observa→Escala, N2N) para estructurar el análisis.

${tools}`;
  }

  // default: 'assistant'
  return `${identity}

${experienceSection}

${projectsSection}

${methodologySection}

INSTRUCCIONES:
Eres el asistente de Rodrigo para su trabajo diario. Responde preguntas sobre sus proyectos,
skills y metodología. Ayúdale a redactar, analizar y decidir usando el contexto de su portfolio.
Responde en el mismo idioma en que te hablen (español o inglés).
Cuando no tengas suficiente contexto, usa las tools disponibles para buscarlo.

${tools}`;
}
