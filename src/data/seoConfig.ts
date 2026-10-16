import { blogPosts } from "@/data/blogPosts";
import { projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";

export const SITE_URL = "https://www.abhirupkumar.in";
export const SITE_NAME = "Abhirup Kumar";
export const SOCIAL_IMAGE = { url: `${SITE_URL}/og-image.jpeg`, width: 960, height: 1280, alt: "Abhirup Kumar" };

export interface SEOData {
  title: string;
  description: string;
  type?: "website" | "profile" | "article";
  publishedTime?: string;
  noindex?: boolean;
}

const projectSlugs: Record<string, string> = {
  "1": "distributed-linux-kernel-attestation", "2": "charmcrafter", "3": "university-notes",
  "4": "formethica", "5": "femway", "6": "study-notes-viewer", "7": "nexterm",
};
export const getProjectPath = (project: Pick<Project, "id">) => `/projects/${projectSlugs[project.id]}`;
export const normalizePath = (path: string) => path.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
export const canonicalUrl = (path = "/") => `${SITE_URL}${normalizePath(path)}`;

export const SEO_CONFIG: Record<string, SEOData> = {
  "/": {
    title: "Abhirup Kumar — Software Developer in Kolkata",
    description: "Software developer, gamer, coffee person. Explore Abhirup Kumar’s web apps, AI tools, Linux systems projects, and work at Vizva Consultancy Services.",
    type: "profile",
  },
  "/projects": {
    title: "Projects — Abhirup Kumar",
    description: "Explore Abhirup Kumar’s software projects: Formethica, Nexterm, Linux kernel attestation, Femway, and tools for university notes. Code, features, and development roles.",
  },
  "/blog": {
    title: "Journal — Abhirup Kumar",
    description: "Notes by Abhirup Kumar on thoughtful software development, minimal design, and finding creativity in constraints.",
  },
  "/achievements": {
    title: "Achievements & Certifications — Abhirup Kumar",
    description: "Abhirup Kumar’s cybersecurity and software engineering certificates, university recognition, LeetCode milestone, and TryHackMe challenge results.",
  },
  "/contact": {
    title: "Contact Abhirup Kumar — Software Developer",
    description: "Contact Abhirup Kumar about software development, collaborations, or opportunities in Kolkata, Bangalore, and remote teams. Email, LinkedIn, GitHub, and résumé.",
  },
};
for (const post of blogPosts) SEO_CONFIG[`/blog/${post.id}`] = {
  title: `${post.title} — Abhirup Kumar`, description: post.excerpt, type: "article", publishedTime: post.date,
};
for (const project of projects) SEO_CONFIG[getProjectPath(project)] = {
  title: `${project.title} — Abhirup Kumar`,
  description: `${project.title} by ${profile.name}. Explore the features, technology stack, development role, and source repository.`,
};
export const indexablePaths = Object.keys(SEO_CONFIG);
export const getSEO = (path: string): SEOData => SEO_CONFIG[normalizePath(path)] ?? {
  title: "Page not found — Abhirup Kumar",
  description: "This page could not be found. Explore Abhirup Kumar’s projects, journal, or contact page.",
  noindex: true,
};
