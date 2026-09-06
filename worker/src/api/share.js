const PATHS = ["Diagnóstico", "Prototipo", "Proceso de equipo"];

const PAGES = {
  "": {
    title: "Tecnología para empresas · Viento Norte",
    description:
      "Tecnología para empresas: diagnóstico, prototipo, proceso de equipo o app. Software que se instala, dueño del dato.",
    image: "https://vientonorte.io/images/branding/og-home-1200.png",
    dest: "https://vientonorte.io/",
    canonical: "https://vientonorte.io/",
  },
  consultoria: {
    title: "Consultoría UX · Viento Norte",
    description:
      "Tecnología para empresas: diagnóstico, prototipo o proceso. Kickoff en 30 min.",
    image: "https://vientonorte.io/images/branding/og-consultoria-1200.png",
    dest: "https://vientonorte.io/#/consultoria",
    canonical: "https://vientonorte.io/s/consultoria/",
  },
};

function html(page) {
  const items = PATHS.map((name) => `<li>${name}</li>`).join("");
  return `<!DOCTYPE html><html lang="es"><head>
<meta charset="utf-8"><title>${page.title}</title>
<meta name="description" content="${page.description}">
<link rel="canonical" href="${page.canonical}">
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.description}">
<meta property="og:image" content="${page.image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
</head><body>
<main>
<h1>Tecnología para empresas</h1>
<p>${page.description}</p>
<ul>${items}</ul>
<p><a href="${page.dest}">${page.title}</a></p>
</main>
</body></html>`;
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
