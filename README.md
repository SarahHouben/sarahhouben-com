# sarahhouben.com

The source code for my personal website, [sarahhouben.com](https://sarahhouben.com).

I'm a full stack engineer working with React, TypeScript and Node.js. This site is also a small showcase of how I work: accessible, well tested, and built AI-first with Claude Code.

**Status:** version 1 in progress.

## What's in it

- A one-page portfolio: about me, how I work with AI, case studies, and contact details
- A handwritten signature that writes itself, drawn with SVG masks, with a still version for reduced motion
- Light and dark mode

## Principles

- **Accessibility:** aiming for WCAG 2.2 AAA, and never below AA, with automated accessibility checks in the tests.
- **Privacy:** no tracking, no cookies and no third-party requests. The font is self-hosted.
- **AI-first:** built with Claude Code. The project rules it follows are in [CLAUDE.md](CLAUDE.md), and [docs/build-log.md](docs/build-log.md) records what was built, how AI helped and what I changed.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with TypeScript and the React Compiler
- CSS Modules and design tokens
- MDX for case studies
- Hosted on [Vercel](https://vercel.com)
- Planned: Playwright with axe for end-to-end and accessibility tests, and Supabase for the contact form

## Running it locally

You'll need Node.js 22 (see [.nvmrc](.nvmrc)).

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm run lint` | Runs ESLint |
| `npm run typecheck` | Checks TypeScript types |
| `npm run format` | Formats the code with Prettier |

## Licence

The code is released under the [MIT licence](LICENSE).

The licence doesn't cover the written content, case studies, images or the signature design. These are © Sarah Houben and aren't licensed for reuse.
