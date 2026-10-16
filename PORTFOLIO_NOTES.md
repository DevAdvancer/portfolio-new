# Portfolio field notes

Run `npm run dev` and open http://localhost:8080. Nothing has been deployed.

The design is a warm personal studio: butter-yellow paper, burnt orange, mustard, peach, sage, and plum. An oversized name, an illustrated interactive desk note, a coffee-and-gaming sticker, and staggered project layouts set the composition. The intro, bio, and “play” desk note reflect Abhirup’s confirmed interests: coding, gaming, and coffee. All seven projects remain available through “more in the workshop.” All eight existing achievements appear on the homepage, with a navigation link and the retained achievements page sharing `src/data/achievements.ts`.

The desk drawing changes between interfaces, systems, experiments, and play, with short drawing-entry animations. Paper lifts on hover and the small flower turns. Reduced-motion preferences disable these effects. The original AK vector monogram is shared by the navbar, footer, and SVG favicon in `public/ak-monogram.svg`. The chat header says only “Abhirup Kumar,” without a logo, assistant tagline, or model label.

## Existing AI assistant

The existing Groq integration in `src/lib/groq.ts` and its `llama-3.1-8b-instant` model are retained. The assistant still uses the original portfolio knowledge base and falls back to it when Groq is unavailable. The local preview has no configured Groq key, so live model responses could not be verified; its knowledge fallback and local hints were tested.

`src/lib/discoveryHints.ts` provides progress-aware clues before sending a general question to the model. Asking for a hint never advances the trail or opens the terminal. The assistant can be minimized while exploring, and its conversation scrolls independently of the portfolio.

The chat and terminal now share a relaxed, first-person writing style based on Abhirup’s messages in this conversation: short, direct, lightly humorous, with occasional “bro,” “lol,” or “:)” rather than forced slang. The model can answer general questions about games, coding, coffee, and other topics instead of treating the portfolio as a topic boundary. Personal game favorites, ranks, coffee orders, and life stories are never filled in without supplied facts. The chat has no live browsing and must not claim current prices, releases, or scores were verified.

`src/lib/assistantConversation.ts` separates personal questions from general questions in saved chat mode. It provides a small set of evergreen general answers and an honest unavailable message when a live answer is needed. General game hints and Linux terminal questions do not automatically trigger the portfolio clue trail. Optional follow-up suggestions are limited to two, and malformed metadata is stripped rather than shown to visitors.

## Discovery trail — spoilers

1. The full stop after “Kumar” reveals a nudge toward the desk notes.
2. The anomaly outside the paper reveals the first signal. The three desk-note controls change the drawing and the area of work being described.
3. The matching mark beside “Small-town roots. Wide-open tabs.” opens a margin note. Answer `space` (or `spacebar`) to solve it. An incorrect answer offers a hint.
4. The bracketed footnote at the very bottom opens the terminal once the earlier clues are solved. Clicking it early gives a nudge, without skipping the trail.

Progress is saved in the visitor’s browser. After discovery, any of the three trail marks reopens the terminal. `reset` clears progress and restarts the hunt. Touch and keyboard interactions work as well as pointer clicks; there are no hover-only clues.

## Personal content

Edit `src/data/secretContent.ts` to add the stories, interests, notes, and other personal details Abhirup chooses to share. Public about, project, and achievement files are populated from the portfolio. Coffee and gaming interests were added from Abhirup’s explicit request. Specific game titles, ranks, coffee preferences, and personal notes have not been invented.

Each key is a filename, and each value is the text shown by `cat <filename>`. New entries automatically appear in `ls` and filename autocomplete. This is a public website discovery, not private storage: content is included in the client bundle. Use it for publicly shareable personal material.

The terminal accepts `help`, `ls`, `cat`, `context`, `ask`, `ai`, `whoami`, `date`, `clear`, `exit`, and `reset`. `ask <question>` (or `ai <question>`) uses the existing Groq model with the terminal files, recent AI history, and the last file read. The local fallback answers from saved files and is labeled honestly. A pending request can be canceled, is aborted on close, and times out after 25 seconds; stale responses are discarded. `clear` and `reset` also clear AI history and the last-read-file context. The terminal supports arrow-key history and Tab completion, treats input as text, and never executes shell commands. Escape closes the dialog and restores focus.

## Main files

- `src/portfolio.css`: design tokens, layout, responsive styles.
- `src/components/ExplorationProvider.tsx`: progress, clues, and the margin-note puzzle.
- `src/components/SecretTerminal.tsx`: terminal interaction.
- `src/lib/terminalAssistant.ts`: terminal AI context and saved-knowledge fallback.
- `src/lib/assistantConversation.ts`: personal/general intent routing and saved conversational replies.
- `src/data/achievements.ts`: existing achievement records shared across the home section, dedicated page, and terminal context.
- `src/hooks/use-exploration.ts`: shared discovery context.
- `src/components/Hero.tsx`: desk-note explorer, original SVG drawings, and the full-stop Easter egg.

## Validation

The production build passes. Focused ESLint checks pass for the changed source files. Full repository lint and TypeScript checks expose existing issues in the shared UI library (including calendar, chart, resizable panels, sidebar, and empty wrapper interfaces) and Tailwind configuration. Those unrelated dependency/API issues are outside this redesign.

Run `npm run test:assistant` for focused conversation regressions. The tests use the installed Vite/esbuild toolchain, mock provider requests, and never contact Groq. They cover personal/general questions, hint routing, terminal file context, voice and model request instructions, failure fallback, cancellation, empty replies, and follow-up parsing. They do not establish the quality of live model generation; that needs a configured Groq key.

Browser checks covered 320px, 390px, and 1440px widths; the desk-note controls; early and ordered clue clicks; incorrect and correct puzzle answers; terminal commands, history, autocomplete, reset, and close; progress-aware assistant hints; project expansion; journal/contact navigation; loaded brand assets and favicon; and reduced-motion styles. The colorful studio revision was checked again for narrow-screen overflow and the complete hint-to-terminal flow. Contact form submission and live Groq responses were not exercised.

## Search and AI discovery update

- Production builds now prerender 15 indexable routes plus a noindex 404, using the same React pages that hydrate in the browser. Public content is present without JavaScript; no bot-specific alternate page is served.
- Every project has a stable `/projects/<slug>` page with the existing problem, role, stack, features, code, and live/report links. Existing homepage project interactions remain.
- One route metadata source and one JSON-LD graph replace conflicting head tags, unseen FAQ markup, the fictional freelance employer, and an unsupported X profile link. The existing portrait's real 960×1280 dimensions replace the incorrect 1200×630 claim.
- The generated sitemap includes all articles and projects. RSS, plain text references, and a public JSON export derive from the existing public records. DLKA and Femway descriptions are corrected. Hidden clue answers and placeholder personal notes are excluded.
- `npm run test:seo` checks raw documents, schema, links, status codes, redirects, and discovery assets. See README for Vercel deployment and indexing checks. These improvements establish technical eligibility; search rankings and AI citations are not guaranteed.
