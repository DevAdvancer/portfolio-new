import { renderToString } from "react-dom/server";
import App from "@/App";
import AccessibilityProvider from "@/components/AccessibilityProvider";
import Index from "@/pages/Index";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import ProjectIndex from "@/pages/ProjectIndex";
import ProjectPage from "@/pages/ProjectPage";
import Achievements from "@/pages/Achievements";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Chatbot from "@/components/Chatbot";
import CommandPalette from "@/components/CommandPalette";

const pages = { Index, Blog, BlogPost, ProjectIndex, ProjectPage, Achievements, Contact, NotFound, Chatbot, CommandPalette };

export { indexablePaths } from "@/data/seoConfig";
export { getDiscoveryAssets } from "@/lib/searchContent";

export async function render(url: string, headHtml: string): Promise<string> {
  // Eager server imports preserve client code splitting without leaving any
  // public content behind a streaming payload that needs JavaScript to reveal.
  const html = "<!doctype html>" + renderToString(
    <html lang="en"><head dangerouslySetInnerHTML={{ __html: headHtml }} /><body><div id="root"><AccessibilityProvider><App url={url} pages={pages} /></AccessibilityProvider></div></body></html>,
  );
  const pending = html.search(/<!--\$[?!]-->|<template|\$RC\(/);
  if (pending >= 0) throw new Error(`Streaming fallback found in static page ${url}: ${html.slice(Math.max(0, pending - 120), pending + 280)}`);
  return html;
}
