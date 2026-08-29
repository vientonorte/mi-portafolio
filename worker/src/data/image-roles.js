/** Espejo de src/data/image-roles.ts */

export const IMAGE_WEB_ROLES = [
  {
    id: 'share_home',
    label: 'Share redes · home',
    hint: 'LinkedIn / Meta al pegar vientonorte.io. 1200×630.',
    slotId: 'branding.ogHome',
    path: 'branding/og-home-1200.png',
    category: 'Branding',
    alt: 'Viento Norte — share home',
  },
  {
    id: 'share_consultoria',
    label: 'Share redes · consultoría',
    hint: 'Card /s/consultoria. 1200×630.',
    slotId: 'branding.ogConsultoria',
    path: 'branding/og-consultoria-1200.png',
    category: 'Branding',
    alt: 'Viento Norte — share consultoría',
  },
  {
    id: 'share_proceso',
    label: 'Share redes · proceso',
    hint: 'Card /s/proceso. 1200×630.',
    slotId: 'branding.ogProceso',
    path: 'branding/og-proceso-1200.png',
    category: 'Branding',
    alt: 'Viento Norte — share proceso',
  },
  {
    id: 'schema',
    label: 'Schema.org (logo)',
    hint: 'JSON-LD Organization.logo. Cuadrado ≥512.',
    slotId: 'branding.schemaLogo',
    path: 'icon-512x512.png',
    repoPath: 'public/icon-512x512.png',
    category: 'Branding',
    alt: 'Viento Norte — logo schema',
  },
  {
    id: 'favicon',
    label: 'Favicon',
    hint: 'Pestaña. ICO o PNG.',
    slotId: 'branding.favicon',
    path: 'favicon.ico',
    repoPath: 'public/favicon.ico',
    category: 'Branding',
    alt: 'Favicon Viento Norte',
  },
  {
    id: 'logo',
    label: 'Logo / isologo',
    hint: 'Toolbar. PNG cuadrado.',
    slotId: 'branding.isologo',
    path: 'branding/isologo-512.png',
    category: 'Branding',
    alt: 'Isologo Viento Norte',
  },
  {
    id: 'apple',
    label: 'Apple / PWA',
    hint: 'icon-192.',
    slotId: 'branding.appleTouch',
    path: 'icon-192x192.png',
    repoPath: 'public/icon-192x192.png',
    category: 'Branding',
    alt: 'Apple touch Viento Norte',
  },
  {
    id: 'hero_consultoria',
    label: 'Hero · operaciones CMS',
    hint: 'Pantalla de producto (CMS/CRM), no lifestyle. 16:10. Alt obligatorio.',
    slotId: 'branding.heroConsultoria',
    path: 'consultoria/x-cms-dashboard.png',
    category: 'Consultoría',
    alt: 'Dashboard CMS — operaciones digitales en el stack del cliente',
  },
  {
    id: 'faq',
    label: 'FAQ / ayuda',
    hint: 'Sin cable HTML automático.',
  },
  {
    id: 'gallery',
    label: 'Galería (sin cable)',
    hint: 'Solo R2 + CMS.',
  },
];

export const ROLE_BY_ID = Object.fromEntries(IMAGE_WEB_ROLES.map((r) => [r.id, r]));

export function roleToEntry(roleId, label) {
  const role = ROLE_BY_ID[roleId];
  if (!role?.slotId) return null;
  return {
    id: role.slotId,
    category: role.category || 'Branding',
    label: label || role.label,
    path: role.path,
    repoPath: role.repoPath,
    alt: role.alt || label || role.label,
    role: role.id,
  };
}
