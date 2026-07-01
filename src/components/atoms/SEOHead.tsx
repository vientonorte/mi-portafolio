import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

export function SEOHead({
  title,
  description,
  image,
  url,
  type = "website",
  noIndex = false,
}: SEOHeadProps) {
  const defaultImage = "https://vientonorte.github.io/mi-portafolio/images/branding/og-portfolio.png";
  const siteUrl = "https://vientonorte.github.io/mi-portafolio";
  const fullTitle = `${title} | Rodrigo Gaete - Lead UX`;
  const finalUrl = url || siteUrl;
  const finalImage = image || defaultImage;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content="Rodrigo Gaete - Lead UX Portfolio" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={finalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}
