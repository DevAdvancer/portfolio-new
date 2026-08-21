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

- `src/components/GlobalBackground.tsx` — Fixed, mostly-static ambient background (radial gradient, blurred aurora blobs, faint masked grid). Purely CSS; no per-frame JS. Rendered once at the app root behind all routes.
- `src/components/CustomCursor.tsx` — Optional magnetic cursor dot. Rendered once at the app root. Self-gating: bails unless `(pointer: fine)` matches and `useReducedMotion()` is false. One passive `pointermove` + a single rAF loop driving `transform: translate3d` (compositor-only). Adds `has-custom-cursor` to `<html>` to trigger the native-cursor-hiding CSS hook.
- `src/components/SectionHeader.tsx` — Reusable editorial section header (zero-padded numeral + tick + kicker + serif title + optional intro). Renders the numeral/tick/kicker in the section's accent via `text-section`/`bg-section`. Built on `ScrollReveal`. Use this for every content section instead of hand-rolling label/`h2`/intro.
- `src/components/LiveTerminalPanel.tsx` — Glass "terminal" card in the hero's right column (macOS traffic-lights, `$` prompts, a live IST clock via a 1s interval gated by `useReducedMotion`, `live-ping` status dot).
- `src/components/Chatbot.tsx` — Floating assistant. Uses pattern matching from `chatbotKnowledge.ts` with a remote LLM call and a client-side fallback.
- `src/components/SEO.tsx` — Dynamically updates document meta tags (OG, Twitter cards, canonical URL). Domain: `abhirupkumar.in`.
- `src/components/ScrollReveal.tsx` — Intersection Observer wrapper for scroll-triggered animations.

### Path Alias

`@/` resolves to `./src/` (configured in both `vite.config.ts` and `tsconfig.json`). Always use `@/` imports.

### Styling

- Dark theme with HSL CSS custom properties defined in `src/index.css`
- Custom fonts: DM Sans (sans), Crimson Pro (serif), SF Mono (mono)
- shadcn/ui components live in `src/components/ui/`
- Blog content is rendered with `react-markdown` + `remark-gfm` and styled via Tailwind typography plugin

#### Per-section accent system (multi-accent)

Each content section owns a distinct accent so the page isn't monochrome-blue. A section wrapper sets one of the `.accent-*` helper classes (`accent-blue`/`accent-teal`/`accent-violet`/`accent-pink`/`accent-amber`), which set the `--section-accent` CSS var from the `--chart-*` palette. Descendants consume it via the Tailwind `section` color: `text-section` / `bg-section` / `border-section` (opacity modifiers like `border-section/40` work). The five palette hues are registered as `chart-1..5` Tailwind colors, so `bg-chart-3`, `text-chart-4`, etc. also resolve directly.

Current mapping: Hero/Value = blue, Skills = teal, Projects = violet, Experience = pink, Education = amber, Manifesto = multi (gradient).

Reusable surfaces/effects in `index.css` (accent-aware where noted): `.card-premium` (gradient hairline border on hover), `.section-divider` (gradient hairline between sections), `.section-glow`, `.noise-overlay`, `.aurora-blob`, `.live-ping`, `.char`/`.char.in` (hero name split-reveal). New JS/rAF animation must self-gate with `useReducedMotion()`; the global reduced-motion kill-switch in `AccessibilityProvider.tsx` only neutralizes CSS animations.

### TypeScript

Relaxed strictness: `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`. Project compiles via `@vitejs/plugin-react-swc`.

### Static Assets

Project images and other static files go in the `/public` directory and are referenced with absolute paths (e.g., `"/charmcrafter.png"`).
