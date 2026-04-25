# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally

No lint or test scripts are configured.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and publishes `dist/` to the `gh-pages` branch via `JamesIves/github-pages-deploy-action`. The site is served at `avej.com` (see `public/CNAME`). `vite.config.js` sets `base: './'` so built assets use relative paths — do not change this without also reconsidering the Pages setup.

## Architecture

Single-page Svelte 5 + Vite 6 app (not SvelteKit). Everything is static and built at compile time.

**Routing is hash-based and hand-rolled.** `src/lib/router.svelte.js` exposes a `router` singleton with a `$state`-backed `route` field driven by `window.location.hash`. Route definitions live in `src/lib/routes.js` as an ordered `{ pattern, component }[]` — add new routes there, not in `App.svelte`. First matching pattern wins; no history API, no route params — slug is parsed by `router.route.split("/").pop()` inside `PostDetail.svelte`. Navigate via `router.navigate(path)` (sets `window.location.hash`).

**Posts are bundled, not fetched.** `src/lib/posts.js` uses `import.meta.glob('/src/content/posts/*.md', { query: '?raw', eager: true })` to inline every markdown file at build time. Filenames must match `YYYY_MMDD_SEQ.md` (e.g. `2026_0201_A.md`) — the loader splits on `_` to derive the post's `date` and `seq`, and sorts DESC by both. A renamed/malformed filename will break the list silently.

**Frontmatter is parsed by `js-yaml`.** `posts.js` splits the `---`-delimited YAML block with a regex, then hands it to `yaml.load` (gray-matter was tried first but needs Node's `Buffer` and breaks in the browser). `getPosts()` reads `title`, `summary`, and `tags` from the parsed `data`. Other fields pass through untouched — extend the returned object if you need them. Filenames must match `YYYY_MMDD_SEQ` (uppercase alphanumeric seq); the loader throws on mismatch rather than silently degrading.

**Markdown → HTML happens in the browser.** `src/lib/markdown.js` registers `marked-highlight` + `highlight.js` with `marked` once at module load and exports `parseMarkdown(text)`. Highlighting is injected at parse time (no post-render DOM walk), so the output HTML is self-contained. Call sites just do `{@html parseMarkdown(content)}`. `marked`, `marked-highlight`, and `highlight.js` are runtime dependencies.

**Theming is data-attribute driven.** `src/lib/stores/theme.svelte.js` writes `data-theme` on `<html>` and persists to `localStorage`. The `themes` array in that same file is the source of truth for the UI dropdown (`TerminalWindow.svelte` iterates it). CSS values live as variable overrides in `src/styles/variables.css` (`:root` = Neo Future default, then `[data-theme="amber"]`, etc.). To add a theme: add a `[data-theme="<id>"]` block in `variables.css` and a `{ id, label }` entry in the `themes` array.

**Svelte 5 runes throughout.** The codebase uses `$state`, `$derived`, `$derived.by`, `$props`, and `$effect`. Don't introduce Svelte 4 reactive (`$:`) syntax or the legacy store contract (`$store` auto-subscription) — the existing stores (`router`, `themeStore`) are plain singleton objects with runes internally and getter-based access (`themeStore.value`, `router.route`).

## Path alias

`@` → `src/` (configured in both `vite.config.js` and `jsconfig.json`). Convention: cross-directory imports use `@/...`; same-directory imports stay `./...`.

**Dashboard data is dummy and lives in `src/lib/data/`.** Three modules — `profile.js`, `projects.js`, `activity.js` — feed the Home dashboard (neofetch block, pinned projects, git-log feed) plus the `/projects`, `/projects/:id`, and `/about` routes. All of it is hand-authored placeholder content; the JSDoc `@typedef`s in `projects.js` and `activity.js` define the shape. The long-term intent is to replace `projects.js` / `activity.js` with a client-side fetch of the GitHub REST API (unauth rate limit = 60 req/hr, which is fine for a personal site) — the existing shape is a rough match for what those endpoints return so the swap should be mechanical.

## Content authoring

New posts go in `src/content/posts/` as `YYYY_MMDD_SEQ.md` with frontmatter:

```
---
title: ...
summary: ...
tags: [a, b]
---
```

New projects go in `src/lib/data/projects.js` (add a `Project` entry). Pinned projects (`pinned: true`) show on the Home dashboard; everything else is reachable via `/projects`. Activity entries live in `src/lib/data/activity.js` and are purely manual until the GitHub API swap.

No rebuild-triggering content pipeline — just commit the file, push to `main`, and the Pages workflow handles the rest.

