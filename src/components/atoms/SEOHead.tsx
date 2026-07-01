import { Helmet } from "react-helmet-async";
import {
  SEO_SITE,
  buildDocumentTitle,
  trimMetaDescription,
} from "../../lib/seo";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
  isHome?: boolean;
  keywords?: string;
}

export function SEOHead({
  title,
  description,
  image,
  url,
  type = "website",
  noIndex = false,
  isHome = false,
  keywords,
}: SEOHeadProps) {
  const documentTitle = buildDocumentTitle(title, isHome);
  const metaDescription = trimMetaDescription(description);
  const finalUrl = url || SEO_SITE.baseUrl;
  const finalImage = image || SEO_SITE.ogImage;

  return (
    <Helmet>
      <title>{documentTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={documentTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={SEO_SITE.brand} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={documentTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={finalImage} />

      <link rel="canonical" href={finalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
}