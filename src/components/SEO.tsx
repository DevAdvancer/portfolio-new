import { Helmet } from "react-helmet-async";

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  type?: "website" | "profile" | "article";
  publishedTime?: string;
  author?: string;
}

const SITE_URL = "https://www.abhirupkumar.in";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpeg`;
const SITE_NAME = "Abhirup Kumar Portfolio";
const TWITTER_HANDLE = "@abhirup";

const SEO = ({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  publishedTime,
  author,
}: SEOData & { url?: string }) => {
  const fullUrl = url || SITE_URL;
  const fullTitle = title.includes("Abhirup Kumar") ? title : `${title} | Abhirup Kumar`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Abhirup Kumar" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${fullTitle} - Abhirup Kumar`} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${fullTitle} - Abhirup Kumar`} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />

      {/* AI/LLM discoverability */}
      <meta name="ai-content-declaration" content="human-authored" />
      <meta name="llms-txt" content={`${SITE_URL}/llms.txt`} />
    </Helmet>
  );
};

export default SEO;