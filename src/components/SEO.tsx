import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = "Abhirup Kumar - Software Engineer & Full Stack Developer | Portfolio",
  description = "Portfolio of Abhirup Kumar - Software Engineer, Full Stack Developer, and Computer Science student at Adamas University. Specializing in React, TypeScript, Node.js, and building scalable web applications.",
  keywords = "Abhirup Kumar, Software Engineer, Full Stack Developer, React Developer, TypeScript, Web Developer, Portfolio, Computer Science, Adamas University, Kolkata, India",
  image = "https://www.abhriupkumar.in/og-image.png",
  url,
  type = "website",
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = url || `https://www.abhriupkumar.in${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Update basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("title", title);

    // Update Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:type", type, true);

    // Update Twitter Card tags
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);
    updateMetaTag("twitter:url", currentUrl);

    // Update canonical URL
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;
  }, [title, description, keywords, image, currentUrl, type]);

  return null;
};

export default SEO;
