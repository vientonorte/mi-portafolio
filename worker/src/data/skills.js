/** Same artifact as @vientonorte/skills catalog.json · hosted /ops/skills/ */
export const SKILLS_CATALOG = {
  version: '0.1.0',
  updated: '2026-08-18',
  hosted: 'https://vientonorte.io/ops/skills/',
  kv: 'vn:skills',
  metodo_ro: {
    hours: { m1: 5.5, vn: 1.5, post: 0.75, algonova: 3.5 },
    no: ['80/10/10', '80/20'],
    contact: 'contacto@vientonorte.io',
    cierre_mail: 'draft Gmail branding VN + ## Retro deploy',
  },
  skills: [
    { id: 'vn-agent', slash: '/vn-agent', kind: 'router', mcp: true, hosted: 'https://vientonorte.io/ops/skills/vn-agent/SKILL.md' },
    { id: 'check-work', slash: '/check-work', kind: 'qa', mcp: true, hosted: 'https://vientonorte.io/ops/skills/check-work/SKILL.md' },
    { id: 'check-safety', slash: '/check-safety', kind: 'qa', mcp: true, hosted: 'https://vientonorte.io/ops/skills/check-safety/SKILL.md' },
    { id: 'org-hygiene', slash: '/org-hygiene', kind: 'ops', mcp: true, hosted: 'https://vientonorte.io/ops/skills/org-hygiene/SKILL.md' },
    { id: 'preprod-qa', slash: '/preprod-qa', kind: 'qa', mcp: true, hosted: 'https://vientonorte.io/ops/skills/preprod-qa/SKILL.md' },
    { id: 'docs-vn', slash: '/docs-vn', kind: 'vn', mcp: true },
    { id: 'seo-vn', slash: '/seo-vn', kind: 'vn', mcp: true },
    { id: 'google-ads-vn', slash: '/google-ads-vn', kind: 'vn', mcp: true },
    { id: 'ux-writing-vn', slash: '/ux-writing-vn', kind: 'vn', mcp: true },
    { id: 'lead-a11y-vn', slash: '/lead-a11y-vn', kind: 'vn', mcp: true },
    { id: 'kpi-vn', slash: '/kpi-vn', kind: 'vn', mcp: true },
    { id: 'design-sprint-vn', slash: '/design-sprint-vn', kind: 'vn', mcp: true },
    { id: 'cierre-sesion-vn', slash: '/cierre-sesion-vn', kind: 'vn', mcp: true },
    { id: 'cierre-vn-hoy', slash: '/CierreVNHOY', kind: 'vn', mcp: true },
    { id: 'm5-vn', slash: '/m5-vn', kind: 'vn', mcp: true },
  ],
};

export function getSkills(kind) {
  const list = SKILLS_CATALOG.skills;
  if (!kind || kind === 'all') return list;
  return list.filter((s) => s.kind === kind);
}

export function getSkill(id) {
  const key = String(id || '')
    .replace(/^\//, '')
    .toLowerCase();
  return SKILLS_CATALOG.skills.find(
    (s) => s.id === key || s.slash.replace(/^\//, '').toLowerCase() === key
  );
}
