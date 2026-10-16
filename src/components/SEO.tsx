import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { canonicalUrl, getSEO, SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "@/data/seoConfig";

const SEO = () => {
  const { pathname } = useLocation();
  const seo = getSEO(pathname);
  const url = canonicalUrl(pathname);
  return <Helmet>
    <title>{seo.title}</title>
    <meta name="description" content={seo.description} />
    <meta name="author" content="Abhirup Kumar" />
    <meta name="robots" content={seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
    {!seo.noindex && <link rel="canonical" href={url} />}
    <meta property="og:type" content={seo.type || "website"} />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
    <meta property="og:image" content={SOCIAL_IMAGE.url} />
    <meta property="og:image:width" content={String(SOCIAL_IMAGE.width)} />
    <meta property="og:image:height" content={String(SOCIAL_IMAGE.height)} />
    <meta property="og:image:alt" content={SOCIAL_IMAGE.alt} />
    <meta property="og:locale" content="en_IN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={seo.title} />
    <meta name="twitter:description" content={seo.description} />
    <meta name="twitter:image" content={SOCIAL_IMAGE.url} />
    <meta name="twitter:image:alt" content={SOCIAL_IMAGE.alt} />
    {seo.publishedTime && <meta property="article:published_time" content={seo.publishedTime} />}
    {seo.type === "article" && <meta property="article:author" content={canonicalUrl()} />}
    <link rel="alternate" type="application/rss+xml" title="Abhirup Kumar’s journal" href={`${SITE_URL}/feed.xml`} />
    <link rel="alternate" type="text/plain" title="Portfolio reference for AI readers" href={`${SITE_URL}/llms.txt`} />
    <link rel="alternate" type="application/json" title="Public portfolio data" href={`${SITE_URL}/profile.json`} />
  </Helmet>;
};
export default SEO;
