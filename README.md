# sasisundar.me

Personal site and engineering blog. Next.js 15 (App Router), TypeScript, Tailwind, MDX.

## Editorial rule

Every technical claim on this site links to the commit or file it rests on. If a number
cannot be reproduced by cloning the repository and running the stated command, it does
not go on the site. `src/lib/projects.ts` carries this rule in a comment at the top and
it is the reason that file exists instead of the numbers being scattered through JSX.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Adding a post

Create a file in `content/posts/`. Nothing in `src/` needs to change — the index, the
feed, the sitemap, tag pages and related-article links all derive from frontmatter.

```mdx
---
title: "Post title"
deck: "One sentence that earns the click. Optional."
description: "Used for meta description, cards and RSS."
date: "2026-09-02"
category: "AI Engineering"
tags: ["CI", "Verification"]
featured: false            # at most one true; drives the homepage slot
draft: false               # true hides it everywhere including the feed
repo: "https://github.com/..."   # optional but strongly preferred
evidence: "path or commit message the claim rests on"
---
```

Notes go in `content/notes/` with the same shape. They are shorter and revised in place.

Two custom MDX components are available inside any post:

```mdx
<Callout kind="warn">Something the reader should not skim past.</Callout>
<Evidence href="https://github.com/...">repo · path/to/file.py</Evidence>
```

## Architecture notes

**`src/lib/format.ts` vs `src/lib/content.ts`.** These are split deliberately.
`content.ts` reads the filesystem and is marked `server-only`. `format.ts` holds types
and pure helpers and imports no node builtins. Client components (`Search.tsx`,
`Cards.tsx`, `Article.tsx`) import from `format.ts` only.

Importing `content.ts` from a client component pulls `node:fs` into the browser bundle
and fails the build. That is intentional: the failure is the guardrail.

**Content pipeline.** `next-mdx-remote/rsc` renders `.mdx` at build time rather than
`@next/mdx` compiling each post as a route. Posts stay data; the UI stays code.

**Syntax highlighting.** `rehype-pretty-code` in dual-theme mode emits `--shiki-light`
and `--shiki-dark` CSS variables. `globals.css` consumes them under
`prefers-color-scheme`. Removing those rules produces colourless code blocks with no
build error.

## Structure

```
src/app/          routes: home, writing, notes, projects, about, now, uses, contact
                  plus rss.xml, sitemap.ts, robots.ts
src/components/   Nav, Footer, Cards, Article (TOC/progress/share), Search, DocPage
src/lib/          site.ts (config), format.ts (pure), content.ts (server), projects.ts
content/posts/    long-form articles
content/notes/    engineering notebook
```

## Deploy

Push to GitHub, import in Vercel, no configuration required. Set the production domain
and update `site.url` in `src/lib/site.ts`.
