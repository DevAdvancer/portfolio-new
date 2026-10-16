import { blogPosts } from "@/data/blogPosts";
import { projects, type Project } from "@/data/projects";
import { achievements } from "@/data/achievements";
import { profile } from "@/data/profile";
import { canonicalUrl, getProjectPath, getSEO, indexablePaths, normalizePath, SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "@/data/seoConfig";

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;
const reference = (id: string) => ({ "@id": id });
const projectEntity = (project: Project) => ({
  "@type": "SoftwareSourceCode",
  "@id": `${canonicalUrl(getProjectPath(project))}#software`,
  name: project.title,
  description: project.problem,
  url: canonicalUrl(getProjectPath(project)),
  codeRepository: project.githubUrl,
  ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  image: new URL(project.image, SITE_URL).href,
  keywords: project.techStack.join(", "),
  programmingLanguage: project.techStack.filter(tech => ["Python", "C", "Rust", "TypeScript", "JavaScript"].includes(tech)),
  author: reference(personId),
});

export function getStructuredData(pathname: string) {
  const path = normalizePath(pathname);
  const seo = getSEO(path);
  if (seo.noindex) return null;
  const url = canonicalUrl(path);
  const post = blogPosts.find(post => path === `/blog/${post.id}`);
  const project = projects.find(project => path === getProjectPath(project));
  const pageId = `${url}#webpage`;
  const person = {
    "@type": "Person", "@id": personId,
    name: profile.name, alternateName: "DevAdvancer", givenName: "Abhirup", familyName: "Kumar",
    url: canonicalUrl(), image: SOCIAL_IMAGE.url, description: profile.description,
    jobTitle: profile.role, email: profile.email,
    worksFor: { "@type": "Organization", name: profile.employer },
    homeLocation: { "@type": "Place", name: profile.location },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.university },
    sameAs: [profile.github, profile.linkedin], knowsAbout: [...profile.skills],
  };
  const website = {
    "@type": "WebSite", "@id": websiteId, name: SITE_NAME, url: canonicalUrl(),
    inLanguage: "en", publisher: reference(personId),
  };
  const page = {
    "@type": path === "/" ? "ProfilePage" : path === "/contact" ? "ContactPage" : ["/blog", "/projects", "/achievements"].includes(path) ? "CollectionPage" : "WebPage",
    "@id": pageId, url, name: seo.title, description: seo.description,
    isPartOf: reference(websiteId), about: reference(personId), inLanguage: "en",
    ...(path === "/" ? { mainEntity: reference(personId) } : {}),
    ...(project ? { mainEntity: reference(`${url}#software`) } : {}),
    ...(post ? { mainEntity: reference(`${url}#article`) } : {}),
  };
  const crumbs = [{ name: "Home", item: canonicalUrl() }];
  if (post) crumbs.push({ name: "Journal", item: canonicalUrl("/blog") }, { name: post.title, item: url });
  else if (project) crumbs.push({ name: "Projects", item: canonicalUrl("/projects") }, { name: project.title, item: url });
  else if (path !== "/") crumbs.push({ name: path === "/blog" ? "Journal" : path.slice(1).replace(/^./, char => char.toUpperCase()), item: url });
  const graph: object[] = [person, website, page];
  if (crumbs.length > 1) graph.push({
    "@type": "BreadcrumbList", "@id": `${url}#breadcrumbs`,
    itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, ...crumb })),
  });
  if (project) graph.push(projectEntity(project));
  if (path === "/projects") graph.push({
    "@type": "ItemList", "@id": `${url}#projects`, name: "Software projects by Abhirup Kumar",
    itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, item: projectEntity(project) })),
  });
  if (post) graph.push({
    "@type": "BlogPosting", "@id": `${url}#article`, headline: post.title, description: post.excerpt,
    datePublished: post.date, author: reference(personId), publisher: reference(personId),
    mainEntityOfPage: reference(pageId), url, inLanguage: "en", keywords: post.tags.join(", "),
  });
  if (path === "/blog") graph.push({
    "@type": "Blog", "@id": `${url}#journal`, name: "Abhirup Kumar’s journal", url,
    author: reference(personId), blogPost: blogPosts.map(post => ({
      "@type": "BlogPosting", headline: post.title, url: canonicalUrl(`/blog/${post.id}`),
      datePublished: post.date, author: reference(personId),
    })),
  });
  if (path === "/achievements") graph.push({
    "@type": "ItemList", "@id": `${url}#achievements`, name: "Achievements and certifications",
    itemListElement: achievements.map((achievement, index) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": achievement.type === "certification" ? "EducationalOccupationalCredential" : "CreativeWork",
        name: achievement.title, description: achievement.description,
        ...(achievement.link ? { url: achievement.link } : {}),
        ...(achievement.type === "certification" ? { recognizedBy: { "@type": "Organization", name: achievement.issuer } } : { publisher: { "@type": "Organization", name: achievement.issuer } }),
      },
    })),
  });
  return { "@context": "https://schema.org", "@graph": graph };
}

const xml = (value: string) => value.replace(/[<>&"']/g, char => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]!);
const link = (name: string, path: string, description: string) => `- [${name}](${canonicalUrl(path)}): ${description}`;

// Generated from the same public data used by the pages. No hidden-room spoilers or invented biographical facts.
export function getDiscoveryAssets(): Record<string, string> {
  const llms = `# ${profile.name}\n\n> ${profile.description}\n\n## Portfolio\n\n${[
    link("Profile", "/", "Work, experience, skills, and background."),
    link("Projects", "/projects", "Software projects with source repositories and development roles."),
    link("Achievements", "/achievements", "Certifications, university recognition, and challenge milestones."),
    link("Journal", "/blog", "Notes on design, software development, and the creative process."),
    link("Contact", "/contact", "Email, professional profiles, résumé, and contact form."),
  ].join("\n")}\n\n## Project references\n\n${projects.map(project => link(project.title, getProjectPath(project), project.problem)).join("\n")}\n\n## Articles\n\n${blogPosts.map(post => link(post.title, `/blog/${post.id}`, post.excerpt)).join("\n")}\n\n## Additional formats\n\n- [Full reference](${SITE_URL}/llms-full.txt): Public profile, projects, and achievements.\n- [Public JSON](${SITE_URL}/profile.json): Structured portfolio data with source URLs.\n- [RSS feed](${SITE_URL}/feed.xml): Journal articles.\n`;
  const full = `# ${profile.name}: public portfolio reference\n\n${profile.description}\n\nSource: ${canonicalUrl()}\n\n## Profile\n\n- Role: ${profile.role}\n- Work: ${profile.employer}\n- Education: ${profile.education}, ${profile.university}\n- Location: ${profile.location}\n- Hometown: ${profile.hometown}\n- Skills: ${profile.skills.join(", ")}\n- Interests: ${profile.interests.join(", ")}\n- Email: ${profile.email}\n- GitHub: ${profile.github}\n- LinkedIn: ${profile.linkedin}\n\n## Projects\n\n${projects.map(project => `### ${project.title}\n\n${project.problem}\n\nRole: ${project.role}\n\nTechnologies: ${project.techStack.join(", ")}\n\nFeatures:\n${project.features.map(feature => `- ${feature}`).join("\n")}\n\nSource: ${canonicalUrl(getProjectPath(project))}\nRepository: ${project.githubUrl}${project.liveUrl ? `\nLive project: ${project.liveUrl}` : ""}`).join("\n\n")}\n\n## Achievements\n\n${achievements.map(item => `- ${item.title} — ${item.issuer}, ${item.date}.${item.description ? ` ${item.description}` : ""}${item.link ? ` Reference: ${item.link}` : ""}`).join("\n")}\n\nSource: ${canonicalUrl("/achievements")}\n\n## Journal\n\n${blogPosts.map(post => `### ${post.title}\n\nPublished: ${post.date}\nSource: ${canonicalUrl(`/blog/${post.id}`)}\n\n${post.content.replace(/^\s*# [^\n]+\n/, "").trim()}`).join("\n\n")}\n`;
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePaths.map(path => `  <url><loc>${xml(canonicalUrl(path))}</loc></url>`).join("\n")}\n</urlset>\n`;
  const feed = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Abhirup Kumar’s journal</title><link>${canonicalUrl("/blog")}</link><description>Notes on design, development, and creativity by Abhirup Kumar.</description><language>en</language><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${blogPosts.map(post => `<item><title>${xml(post.title)}</title><link>${canonicalUrl(`/blog/${post.id}`)}</link><guid isPermaLink="true">${canonicalUrl(`/blog/${post.id}`)}</guid><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate><description>${xml(post.excerpt)}</description></item>`).join("")}</channel></rss>\n`;
  const publicData = { schemaVersion: 1, canonicalUrl: canonicalUrl(), ...profile,
    projects: projects.map(({ image: _image, ...project }) => ({ ...project, source: canonicalUrl(getProjectPath(project)) })),
    achievements: { source: canonicalUrl("/achievements"), items: achievements },
    articles: blogPosts.map(({ content: _content, ...post }) => ({ ...post, author: profile.name, source: canonicalUrl(`/blog/${post.id}`) })),
  };
  const robots = `# Public portfolio. Search and AI search crawlers may read these pages.\n# This preserves the existing open crawl policy, including training crawlers.\nUser-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  return { "llms.txt": llms, "llms-full.txt": full, "profile.json": `${JSON.stringify(publicData, null, 2)}\n`, "sitemap.xml": sitemap, "feed.xml": feed, "robots.txt": robots };
}
