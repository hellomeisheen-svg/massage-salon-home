export type SEOHeadOptions = {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
};

const SITE_ORIGIN = "https://7heavenmassage.ru";
const SITE_NAME = "Седьмое небо";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/hero-portrait-solid.webp`;

export function buildSEOHead(options: SEOHeadOptions) {
  const {
    title,
    description,
    canonicalPath,
    ogTitle,
    ogDescription,
    ogImage,
    noindex = false,
    jsonLd,
  } = options;

  const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;
  const resolvedOgImage = ogImage ?? DEFAULT_OG_IMAGE;

  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: noindex ? "noindex, follow" : "index, follow" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: resolvedOgTitle },
    { property: "og:description", content: resolvedOgDescription },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: resolvedOgImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: resolvedOgImage },
  ];

  const links: Record<string, string>[] = [
    { rel: "canonical", href: canonicalUrl },
  ];

  const scripts: { type: string; children: string }[] = [];
  if (jsonLd) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify(jsonLd),
    });
  }

  return { meta, links, scripts };
}
