/**
 * portfolio-tools.js
 *
 * Tool definitions (OpenAI/Ollama function-calling format) and their
 * handlers.  All data is read from portfolio-context.json at startup so
 * no TypeScript compilation is needed at runtime.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Load context once at startup
// ---------------------------------------------------------------------------
let context = null;

function getContext() {
  if (!context) {
    const contextPath = join(__dirname, '..', 'data', 'portfolio-context.json');
    try {
      context = JSON.parse(readFileSync(contextPath, 'utf8'));
    } catch (err) {
      throw new Error(
        `portfolio-context.json not found. Run "npm run export:skills" first.\n${err.message}`
      );
    }
  }
  return context;
}

// ---------------------------------------------------------------------------
// Tool definitions (schema sent to Ollama)
// ---------------------------------------------------------------------------
export const TOOL_DEFINITIONS = [
  {
    type: 'function',
    function: {
      name: 'get_skills',
      description:
        'Returns the skills and tools used by Rodrigo Gaete, optionally filtered by role or company.',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description:
              'Optional filter: company name (e.g. "SURA", "Viento Norte", "micro1") or role keyword (e.g. "UX", "AI", "docencia").',
          },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_experience',
      description:
        'Returns professional experience entries — context, role, impact and achievements — optionally filtered by company.',
      parameters: {
        type: 'object',
        properties: {
          company: {
            type: 'string',
            description:
              'Optional company name to filter results (e.g. "SURA", "Transvip", "Desafío Latam").',
          },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_projects',
      description:
        'Returns portfolio projects with descriptions, tags and outcomes, optionally filtered by tag or type.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description:
              'Optional keyword to filter projects (e.g. "UX", "design system", "accessibility", "AI", "mobile").',
          },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_methodology',
      description:
        "Returns Rodrigo's strategic methodology: the Perfil Estratégico cycle (Observa→Escala) and the N2N method (del problema al prototipo).",
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_context',
      description:
        'Full-text search across all portfolio data (experience, projects, skills, methodology). Use when the other tools are too specific.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search term or phrase.',
          },
        },
        required: ['query'],
      },
    },
  },
];

// ---------------------------------------------------------------------------
// Tool handlers
// ---------------------------------------------------------------------------

function get_skills({ category } = {}) {
  const ctx = getContext();
  let entries = ctx.experience || [];

  if (category) {
    const q = category.toLowerCase();
    entries = entries.filter((e) => {
      const haystack = [
        e.company,
        e.position,
        e.stage,
        ...(e.tools || []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  return entries.map((e) => ({
    company: e.company,
    position: e.position,
    stage: e.stage,
    tools: e.tools || [],
  }));
}

function get_experience({ company } = {}) {
  const ctx = getContext();
  let entries = ctx.experience || [];

  if (company) {
    const q = company.toLowerCase();
    entries = entries.filter((e) => e.company.toLowerCase().includes(q));
  }

  return entries.map((e) => ({
    company: e.company,
    position: e.position,
    period: e.period,
    stage: e.stage,
    context: e.context,
    role: e.role,
    impact: e.impact,
    achievements: e.achievements || [],
  }));
}

function get_projects({ type } = {}) {
  const ctx = getContext();
  let projects = ctx.projects || [];

  if (type) {
    const q = type.toLowerCase();
    projects = projects.filter((p) => {
      const haystack = [p.projectName, p.description, ...(p.tags || [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  return projects.map((p) => ({
    company: p.company,
    projectName: p.projectName,
    role: p.role,
    period: p.period,
    description: p.description,
    tags: p.tags || [],
  }));
}

function get_methodology() {
  const ctx = getContext();
  return {
    perfilCycle: ctx.perfilCycle || [],
    n2nPhases: ctx.n2nPhases || [],
    perfilAxes: ctx.perfilAxes || [],
    perfilDoes: ctx.perfilDoes || [],
    equation: ctx.equation || {},
  };
}

function search_context({ query }) {
  if (!query || typeof query !== 'string') return [];
  const ctx = getContext();
  const q = query.toLowerCase();
  const results = [];

  // Search experience
  for (const e of ctx.experience || []) {
    const haystack = JSON.stringify(e).toLowerCase();
    if (haystack.includes(q)) {
      results.push({ type: 'experience', data: e });
    }
  }

  // Search projects
  for (const p of ctx.projects || []) {
    const haystack = JSON.stringify(p).toLowerCase();
    if (haystack.includes(q)) {
      results.push({ type: 'project', data: p });
    }
  }

  // Search methodology
  const methodologyText = JSON.stringify({
    perfilCycle: ctx.perfilCycle,
    n2nPhases: ctx.n2nPhases,
    perfilAxes: ctx.perfilAxes,
  }).toLowerCase();
  if (methodologyText.includes(q)) {
    results.push({ type: 'methodology', data: get_methodology() });
  }

  return results;
}

// ---------------------------------------------------------------------------
// Dispatcher
// ---------------------------------------------------------------------------
export function executeTool(name, args) {
  const parsedArgs = typeof args === 'string' ? JSON.parse(args) : (args || {});
  switch (name) {
    case 'get_skills':
      return get_skills(parsedArgs);
    case 'get_experience':
      return get_experience(parsedArgs);
    case 'get_projects':
      return get_projects(parsedArgs);
    case 'get_methodology':
      return get_methodology();
    case 'search_context':
      return search_context(parsedArgs);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
