## Abhirup's Portfolio

This is a personal portfolio site for **Abhirup**, built with:

- **Vite + React + TypeScript**
- **Tailwind CSS**
- **shadcn/ui**

### Getting started

```sh
npm install
npm run dev
```

### Live AI assistant

Copy `.env.example` to `.env` and set `GROQ_API_KEY` to your Groq key. The key is read only by the server; do not use a `VITE_` prefix for secrets. `GROQ_MODEL` defaults to `openai/gpt-oss-20b`, verified against the account's available models. The previous `llama-3.1-8b-instant` model returned `404 model_not_found`.

Both `npm run dev` and `npm run preview` serve `/api/chat` locally. Restart the development server after changing environment settings. The floating chat and hidden terminal call this endpoint, with saved answers and a connection notice when the provider is unavailable.

For Vercel, add `GROQ_API_KEY` (and optionally `GROQ_MODEL`) under the project's environment variables for the intended environments, remove the old `VITE_GROQ_API_KEY` variable, and redeploy. A local `.env` file does not update Vercel. `api/chat.mjs` runs as a Node serverless function alongside the prerendered pages; uploading only `dist/` to a static host will not provide live AI. Rotate any key previously included in a public browser bundle.

### Available scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run preview` – preview the production build
- `npm run lint` – run ESLint

### Search and AI discovery

`npm run build` bundles the client, then runs real React prerendering. `dist/` contains complete HTML for the homepage, projects index, seven project detail pages, journal, three articles, achievements, contact, and a noindex `404.html`. Hydration keeps the AI assistant, hidden clue trail, and animations interactive. Without JavaScript, the public text and links remain readable.

- `src/data/profile.ts` contains shared public identity and skills.
- `src/data/seoConfig.ts` defines the canonical origin, public URLs, and page metadata.
- `src/lib/searchContent.ts` builds the schema graph and search reference exports from the existing public project, article, and achievement data.
- `prerender.mjs` refreshes `public/` and `dist/` versions of `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `profile.json`, and `feed.xml`. Edit their TypeScript sources rather than these generated copies. Sitemap dates are omitted because reliable per-page modification dates are not tracked.
- `llms.txt` is an optional reference convention, not a ranking requirement or a guarantee of AI citations. The site preserves its existing open crawl policy; public crawling is allowed and `/api/` and `/admin/` are excluded for every crawler. There are no confidential files behind the visual terminal puzzle.

The production origin is `https://www.abhirupkumar.in`. Vercel already redirects the non-www domain there. `vercel.json` maps extensionless URLs to generated HTML and removes trailing slashes. Keep the build command as `npm run build` and output directory as `dist`; a catch-all SPA rewrite would hide real 404 responses. Other static hosts need equivalent clean-URL mapping and a custom 404 page.

```sh
npm run build
npm run test:seo
npm run test:assistant
npm run preview
```

The preview command serves generated HTML with clean URLs and actual 404 responses. SEO tests check HTTP status and content types, metadata uniqueness, raw HTML content, internal link reachability, schema, sitemap, RSS, and reference-data consistency.

After deploying, verify the sitemap in Google Search Console and Bing Webmaster Tools, inspect a project and article URL, and check structured data with Google's Rich Results Test. Confirm hosting/firewall settings allow legitimate crawlers; a permissive robots file cannot override a firewall. These account-level checks and indexing outcomes cannot be confirmed by a local build. No Search Console ownership tokens or IndexNow credentials are fabricated.
