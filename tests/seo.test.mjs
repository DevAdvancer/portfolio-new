import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { once } from "node:events";
import { createServer } from "vite";
import { createStaticServer } from "../scripts/preview-static.mjs";

let vite, content, config, server, origin;
const fromDist = name => readFile(new URL(`../dist/${name}`, import.meta.url), "utf8");
const fileFor = route => route === "/" ? "index.html" : `${route.slice(1)}.html`;
const tags = (html, pattern) => [...html.matchAll(pattern)];

before(async () => {
  vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: "custom" });
  [content, config] = await Promise.all([vite.ssrLoadModule("/src/lib/searchContent.ts"), vite.ssrLoadModule("/src/data/seoConfig.ts")]);
  server = createStaticServer().listen(0, "127.0.0.1");
  await once(server, "listening");
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { await vite?.close(); if (server) await new Promise(resolve => server.close(resolve)); });

test("all public pages ship unique metadata and real content before JavaScript", async () => {
  const titles = new Set();
  for (const route of config.indexablePaths) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
    const title = tags(head, /<title>([^<]*)<\/title>/g);
    assert.equal(title.length, 1, `${route}: one title`);
    assert.equal(titles.has(title[0][1]), false, `${route}: unique title`);
    titles.add(title[0][1]);
    assert.equal(tags(head, /<meta name="description" /g).length, 1, `${route}: one description`);
    assert.equal(tags(head, /<link rel="canonical" /g).length, 1, `${route}: one canonical`);
    assert.ok(head.includes(`href="${config.canonicalUrl(route)}"`), `${route}: correct canonical`);
    assert.equal(tags(head, /<meta name="robots" /g).length, 1, `${route}: one robots policy`);
    assert.doesNotMatch(head, /content="noindex|ai-content-declaration|name="keywords"|twitter:creator/);
    assert.equal(tags(html, /<h1\b/g).length, 1, `${route}: one main heading`);
    assert.match(html, /<main id="main-content"/);
    assert.doesNotMatch(html, /<!--app-html-->|BAILOUT_TO_CLIENT_SIDE_RENDERING|<!--\$\?-->|<template id="B:|\$RC\(|aria-label="Loading page"/);
    assert.ok(html.length > 10000, `${route}: actual document content`);
    const scripts = tags(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    assert.equal(scripts.length, 1, `${route}: one consistent schema graph`);
    const graph = JSON.parse(scripts[0][1])["@graph"];
    assert.ok(graph.some(node => node["@type"] === "Person" && node.worksFor.name === "Vizva Consultancy Services"));
    const person = graph.find(node => node["@type"] === "Person");
    assert.equal(person.homeLocation.name, "Gurugram, Haryana, India");
    assert.equal(person.alumniOf.name, "Adamas University");
    assert.ok(graph.some(node => node.url === config.canonicalUrl(route)));
    assert.equal(new Set(graph.map(node => node["@id"])).size, graph.length, `${route}: unique entity identifiers`);
  }
});

test("every indexed page is discoverable by following internal links from home", async () => {
  const visited = new Set();
  const queue = ["/"];
  while (queue.length) {
    const route = queue.shift();
    if (visited.has(route)) continue;
    visited.add(route);
    const html = await fromDist(fileFor(route));
    for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"#]+)"/g)) {
      const url = new URL(href, config.SITE_URL);
      const path = config.normalizePath(url.pathname);
      if (url.origin === config.SITE_URL && config.indexablePaths.includes(path) && !visited.has(path)) queue.push(path);
    }
  }
  assert.deepEqual([...visited].sort(), [...config.indexablePaths].sort());
});

test("article and project schema describe the page being read", async () => {
  for (const route of config.indexablePaths.filter(path => path.startsWith("/blog/") || path.startsWith("/projects/"))) {
    const html = await fromDist(fileFor(route));
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"];
    const entity = graph.find(node => node["@type"] === (route.startsWith("/blog/") ? "BlogPosting" : "SoftwareSourceCode"));
    assert.equal(entity.url, config.canonicalUrl(route));
    if (entity["@type"] === "BlogPosting") { assert.match(entity.datePublished, /^2024-12-\d{2}$/); assert.match(html, /rel="author"/); assert.match(html, /<time dateTime="2024-12-/); }
    else { assert.match(entity.codeRepository, /^https:\/\/github.com\/DevAdvancer\//); assert.ok(entity.description.length > 40); }
  }
});

test("sitemap, AI references, public JSON, and RSS are fresh exports of public content", async () => {
  for (const [name, expected] of Object.entries(content.getDiscoveryAssets())) {
    assert.equal(await fromDist(name), expected, name);
    const response = await fetch(`${origin}/${name}`);
    assert.equal(response.status, 200, name);
    assert.doesNotMatch(response.headers.get("content-type"), /text\/html/);
  }
  const sitemap = await fromDist("sitemap.xml");
  const urls = tags(sitemap, /<loc>(.*?)<\/loc>/g).map(match => match[1]);
  assert.deepEqual(urls.sort(), config.indexablePaths.map(config.canonicalUrl).sort());
  assert.doesNotMatch(sitemap, /<lastmod>|<priority>|<changefreq>/);
  const profile = JSON.parse(await fromDist("profile.json"));
  assert.equal(profile.location, "Gurugram, Haryana, India");
  assert.equal(profile.educationStatus, "Graduated");
  assert.equal(profile.projects.length, 7);
  assert.equal(profile.achievements.items.length, 8);
  assert.equal(profile.articles.length, 3);
  const full = await fromDist("llms-full.txt");
  assert.match(full, /Distributed Linux Kernel Attestation System/);
  assert.match(full, /Women.s Safety Car Booking Platform/);
  assert.doesNotMatch(full, /Digital Library of Knowledge Articles|Women-focused product discovery|spacebar|ak:between-the-lines/);
  assert.equal(tags(await fromDist("feed.xml"), /<item>/g).length, 3);
});

test("missing URLs return an actual noindex 404 rather than the homepage", async () => {
  for (const route of ["/not-a-real-page", "/blog/not-a-post", "/projects/not-a-project", "/404"]) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 404, route);
    const html = await response.text();
    assert.match(html, /content="noindex, follow"/);
    assert.doesNotMatch(html, /rel="canonical"|application\/ld\+json/);
    assert.match(html, /Oops! Page not found/);
  }
});

test("clean URLs redirect duplicate forms and HEAD requests retain crawlable headers", async () => {
  const redirect = await fetch(`${origin}/projects/formethica.html?ref=test`, { redirect: "manual" });
  assert.equal(redirect.status, 308);
  assert.equal(redirect.headers.get("location"), "/projects/formethica?ref=test");
  const slash = await fetch(`${origin}/blog/`, { redirect: "manual" });
  assert.equal(slash.status, 308);
  assert.equal(slash.headers.get("location"), "/blog");
  const head = await fetch(`${origin}/projects/nexterm`, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.match(head.headers.get("content-type"), /text\/html/);
  assert.equal(await head.text(), "");
});

test("crawl policy permits public content without misplaced bot-specific restrictions", async () => {
  const robots = await fromDist("robots.txt");
  assert.match(robots, /User-agent: \*\nAllow: \/\nDisallow: \/api\/\nDisallow: \/admin\//);
  assert.doesNotMatch(robots, /Crawl-delay|Disallow: \/\s*$/m);
  const deployment = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  assert.equal(deployment.cleanUrls, true);
  assert.equal(deployment.trailingSlash, false);
  assert.equal(deployment.rewrites, undefined, "no catch-all SPA rewrite that turns missing pages into 200s");
});
