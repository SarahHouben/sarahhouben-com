@AGENTS.md

# sarahhouben.com

Sarah Houben's personal portfolio: a one-page site with case studies, built AI-first with Claude Code. It's also a showcase in its own right, so the code, tests and commit history should be something Sarah is happy for employers to read.

AGENTS.md (above) holds the general, up-to-date Next.js guidance. This file holds the rules for this project. Where they differ, this file wins.

## Stack

- Next.js (App Router) with TypeScript, React Compiler enabled
- CSS Modules plus global design tokens (CSS custom properties). No Tailwind, no CSS-in-JS, no UI libraries.
- MDX for case studies
- Deployed on Vercel. Supabase comes later (V1.1: contact form).
- Playwright with axe for end-to-end and accessibility tests (to be added)

## Commands

- `npm run dev`: local development
- `npm run build`: production build
- `npm run lint`: ESLint
- `npm run typecheck`: `tsc --noEmit` (to be added)
- `npm run format`: Prettier (to be added)
- `npm test`: Playwright tests (to be added)

Before opening a pull request, run lint, typecheck, build and tests.

Formatting is automatic: a Claude Code hook (`.claude/hooks/format.mjs`) runs Prettier on every file Claude Code edits. Don't reformat files by hand in a separate step, and don't disable the hook.

## Structure

- `src/app/`: routes. `/` is the one-page homepage; `/work/[slug]` renders a case study; `/accessibility` and `/privacy` are short static pages; `not-found.tsx` is the 404.
- `src/components/<Name>/`: one folder per component, with `<Name>.tsx`, `<Name>.module.css` and, if needed, `index.ts`.
- `src/content/case-studies/`: one `.mdx` file per case study.
- `src/app/globals.css`: design tokens, base styles and the theme rules. Nothing component-specific.
- `public/`: the CV PDF, social sharing image and favicons.
- `tests/`: Playwright tests.
- `docs/build-log.md`: a running log of how the site was built with Claude Code (see "Build log" below).

## React and Next.js conventions

- Server Components by default. Add `"use client"` only where a component needs the browser: the signature animation, the theme toggle and anything interactive.
- The React Compiler handles memoisation. Don't add `useMemo`, `useCallback` or `React.memo` unless a measured problem calls for it.
- Load the font with `next/font/google` (Atkinson Hyperlegible Next, weights 400 and 600), so it's self-hosted and visitors' browsers never contact Google.
- Use `next/image` for images, always with meaningful `alt` text, or `alt=""` for decoration.
- Set `metadata` on every page (title, description, Open Graph).

## Design

A calm "paper and ink" look: plenty of white space, one column, navy ink on light grey paper.

### Colour tokens

Every text colour meets WCAG AAA (7:1) against its background. Don't add new colours without checking contrast.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F8F9F9` | `#142130` | Page background |
| `--ink` | `#203242` | `#EEF1F4` | Text, headings, underlines, focus outline |
| `--muted` | `#3C4C59` | `#B9C3CD` | Secondary text |
| `--accent` | `#742A34` | `#E6A4AD` | **Only** for link hover (text and underline) |
| `--line` | `#D5DAE0` | `#2E3E50` | Hairline borders |

- Dark mode follows `prefers-color-scheme`, with `data-theme="light"` or `data-theme="dark"` on `<html>` as an override from the theme toggle.
- Links: navy text with a gentle, slightly wavy underline, drawn as a repeating SVG used as a CSS mask, so it takes `currentColor` and works in both themes. On hover, the text and underline turn `--accent`. Navigation links show the underline only on hover.
- Section headings (`h2`) have a bolder, hand-drawn squiggle underneath, in `--ink`.
- No photos of Sarah. No stock imagery.

### Typography

- Atkinson Hyperlegible Next only. Body about 18px on desktop and 17px on mobile, line height about 1.6.
- `h1` about 46px desktop and 30px mobile; `h2` about 30px and 25px. Use `clamp()` rather than breakpoints where possible.
- Sentence case for headings. No all-caps labels.

## The signature component

Sarah's handwritten signature, which "writes itself".

- The path data lives in `src/components/Signature/signature-data.ts`, generated from an automatic trace. Never edit or regenerate the path data by hand.
- Each pen stroke has its own ink outline, revealed by an animated mask along that stroke's centre line. That's what stops strokes revealing each other early, for example the H's crossbar during the downstrokes. Keep that structure.
- Variants:
  - `hero`: writes itself on the first visit
  - `logo`: static in the header, replays on hover and keyboard focus
  - `footer`: writes itself when scrolled into view
- Play the hero animation once per visit, using in-memory state only. **Don't** use localStorage, sessionStorage or cookies for this.
- With `prefers-reduced-motion: reduce`, show the finished signature instantly, with no animation.
- The signature is decoration, so the SVG is `aria-hidden="true"`, and Sarah's name always appears as real text on the page.

## Accessibility (non-negotiable)

Aim for WCAG 2.2 AAA where possible, and never fall below AA.

- Semantic HTML: `header`, `nav`, `main`, `footer`, one `h1` per page and headings in order.
- A skip link to the main content as the first focusable element.
- A visible focus outline on every interactive element: 3px solid `--ink`, with an offset.
- Everything works with a keyboard alone. Use native elements (`button`, `a`) rather than ARIA where possible.
- Touch targets at least 44×44px.
- Respect `prefers-reduced-motion` for **every** animation and transition, not just the signature.
- Never use colour alone to carry meaning.
- `lang="en-GB"` on `<html>`.
- No autoplaying media, no content that flashes.

## Privacy

- No tracking, no cookies and no third-party requests at runtime.
- Browser storage only for the theme choice, and only after the visitor actively chooses light or dark.
- No analytics unless Sarah agrees to a cookieless option first.

## Content and copy

- British English.
- Plain, neutral wording: no superlatives, no boasting, no filler.
- Never invent facts about Sarah's experience. Only use content she has written or confirmed; if something is missing, leave a clear `[TODO: …]` placeholder.
- Describe past employers' work in general terms: no internal project names, colleagues' names, customer names or security details.

## Code style

- TypeScript strict mode. No `any`; prefer precise types and `readonly` props.
- Function components with named exports. Default exports only where Next.js requires them (pages and layouts).
- PascalCase for component files and folders; camelCase for CSS Module class names.
- Keep components small and focused.
- Comments explain *why*, not *what*. Don't add comments that restate the code.
- When replacing a file or component, delete the old one in the same change.
- Ask before adding a dependency.

## Testing

- Playwright tests for each page, including automated accessibility checks with `@axe-core/playwright` that must report no violations, in light mode, dark mode and with reduced motion.
- Test the signature's reduced-motion behaviour and that its SVG stays hidden from screen readers.
- Every bug fix gets a test that fails without the fix.

## Responsive design and performance

- Mobile first. The layout must work from 320px wide (WCAG reflow) and with text zoomed to 200%.
- Use `rem` for type and spacing, so the page respects the visitor's font size.
- Support the last two versions of Chrome, Firefox, Safari and Edge, including Safari on iOS.
- Keep client-side JavaScript small: only interactive components ship JavaScript.
- Targets: Lighthouse 95 or more for performance, accessibility, best practices and SEO; LCP under 2.5s, INP under 200ms, CLS under 0.1.
- Images: modern formats through `next/image`, with explicit sizes to avoid layout shift.

## SEO and sharing

- A title, description and canonical URL on every page, plus an Open Graph image.
- `sitemap.xml` and `robots.txt`, generated with Next.js's metadata files.
- Case studies are listed only when their front matter has `status: published`; drafts are never linked or included in the sitemap.

## AI search and assistants (AIO)

People increasingly look candidates up through AI assistants and AI search, so the site should be easy for them to read and quote accurately.

- All content must be in the server-rendered HTML. Nothing important should appear only after client-side JavaScript runs.
- Structured data (JSON-LD): a `Person` on the homepage (name, job title, URL, and `sameAs` links to LinkedIn and GitHub), and an `Article` for each case study (headline, date, author).
- Write factual, self-contained text: headings that say what a section is about, and key facts (role, stack, location) in plain sentences, consistent with Sarah's CV and LinkedIn.
- Provide `/llms.txt`: a short Markdown summary of who Sarah is, with links to the main pages and published case studies. It's a proposed convention rather than a standard, but it's cheap to maintain; update it whenever a case study is published.
- `robots.txt` allows search engines and AI crawlers. Nothing on the site is private.
- Never put a phone number or home address on the site. Email, LinkedIn and GitHub only.

## Security and secrets

- Security headers in `next.config.ts`: a Content Security Policy, HSTS, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`. Keep the CSP as strict as the site allows.
- Secrets live only in `.env.local` (git-ignored) and Vercel's environment settings. Document every variable, without values, in `.env.example`.
- For Supabase later: only the public anon key may reach the browser. The service role key stays on the server.

## Definition of done

A change is ready for review when:

- lint, typecheck, build and tests pass
- it works with a keyboard alone, in light and dark mode, on a phone-sized screen and with reduced motion
- new content has been checked against the copy rules
- CLAUDE.md, the README and the build log are updated if the change affects them

## Build log

`docs/build-log.md` is raw material for a future case study on building this site AI-first. After each pull request, propose a short entry for Sarah to approve: the date, what was built, how Claude Code helped, and what Sarah changed or corrected. Keep entries brief and factual.

## Working with Claude Code

Draft everything, apply nothing without a yes.

- **Explicit approval required** before you:
  - commit, push, merge or open a pull request
  - install, remove or upgrade a dependency
  - change CI, deployment, Vercel or environment settings
  - run anything destructive: deleting files outside the task, `git reset --hard`, `git clean`, force-pushing, rewriting history, deleting branches
- **Never push to `main`.** Work on a branch and open a pull request.
- For anything larger than a small fix, **propose a plan first** and wait for approval before writing code.
- Before asking to commit, run lint, typecheck, build and tests, and show a short summary of what changed and why. Draft the commit message and pull request description for review.
- Never read, print or commit secrets. Don't open `.env` files unless asked.
- Only change files inside this repository.
- If something is unclear, or a task turns out bigger than expected, stop and ask rather than guessing.

## Workflow

- One branch and one small pull request per change. Name branches after the commit type, e.g. `feat/signature-component` or `fix/focus-outline`.
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`.
- CI (GitHub Actions) runs lint, typecheck, build and tests on every pull request; Vercel creates a preview for each one.
- Keep this file up to date: when a rule changes, or an agent gets something wrong more than once, update CLAUDE.md in the same pull request.
- Ask before changing design tokens, copy or the page structure.
