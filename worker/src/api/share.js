const PAGES = {
  "": {
    title: "Viento Norte · UXtech · Módulos a medida",
    description: "Software que se instala. Cliente dueño del dato.",
    image: "https://vientonorte.io/images/branding/og-home-1200.png",
    dest: "https://vientonorte.io/",
  },
  consultoria: {
    title: "Consultoría UX · Viento Norte",
    description: "Diagnóstico, prototipo o proceso. Kickoff en 30 min.",
    image: "https://vientonorte.io/images/branding/og-consultoria-1200.png",
    dest: "https://vientonorte.io/#/consultoria",
  },
};

function html(page) {
  return `<!DOCTYPE html><html lang="es"><head>
<meta charset="utf-8"><title>${page.title}</title>
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.description}">
<meta property="og:image" content="${page.image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta http-equiv="refresh" content="0;url=${page.dest}">
<script>location.replace(${JSON.stringify(page.dest)})</script>
</head><body><a href="${page.dest}">${page.title}</a></body></html>`;
}

export function handleShare(url) {
  const parts = url.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  const slug = parts[0] === "s" ? parts[1] || "" : "";
  const page = PAGES[slug];
  if (!page) return new Response("Not found", { status: 404 });
  return new Response(html(page), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
