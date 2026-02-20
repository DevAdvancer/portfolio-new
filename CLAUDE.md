# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (runs on port 8080)
- **Build:** `npm run build`
- **Dev build:** `npm run build:dev`
- **Lint:** `npm run lint`
- **Preview production build:** `npm run preview`

No test framework is configured.

## Architecture

This is a personal portfolio SPA built with **React 19 + TypeScript + Vite 7**, using **Tailwind CSS** for styling and **shadcn/ui** (Radix UI primitives) for the component library.

### Routing & Pages

React Router DOM handles client-side routing in `src/App.tsx`. Routes are wrapped in `PageTransition` for animations:

- `/` — Index (Hero, About, Skills, Experience, Education, Projects, BlogPreview, Footer)
- `/blog` and `/blog/:id` — Blog listing and individual posts
- `/achievements` — Achievements page
- `/contact` — Contact form (uses Web3Forms API)

### Content Management

All content is static TypeScript — no CMS or database:

- `src/data/projects.ts` — Project entries with `Project` interface
- `src/data/blogPosts.ts` — Blog posts with inline markdown content (`BlogPost` interface)
- `src/data/chatbotKnowledge.ts` — Keyword/pattern-matched Q&A knowledge base, exports `findBestMatch()`

To add a project or blog post, add an entry to the respective data file.

### Key Components

- `src/components/HeroScene.tsx` — 3D animated scene using React Three Fiber (`@react-three/fiber` + `@react-three/drei`). Contains animated sphere with distort material and floating particles.
- `src/components/Chatbot.tsx` — AI-like chatbot that runs entirely client-side using pattern matching from `chatbotKnowledge.ts` (no API calls).
- `src/components/SEO.tsx` — Dynamically updates document meta tags (OG, Twitter cards, canonical URL). Domain: `abhirupkumar.in`.
- `src/components/ScrollReveal.tsx` — Intersection Observer wrapper for scroll-triggered animations.

### Path Alias

`@/` resolves to `./src/` (configured in both `vite.config.ts` and `tsconfig.json`). Always use `@/` imports.

### Styling

- Dark theme with HSL CSS custom properties defined in `src/index.css`
- Custom fonts: DM Sans (sans), Crimson Pro (serif), SF Mono (mono)
- shadcn/ui components live in `src/components/ui/`
- Blog content is rendered with `react-markdown` + `remark-gfm` and styled via Tailwind typography plugin

### TypeScript

Relaxed strictness: `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`. Project compiles via `@vitejs/plugin-react-swc`.

### Static Assets

Project images and other static files go in the `/public` directory and are referenced with absolute paths (e.g., `"/charmcrafter.png"`).
