# TODO — Dummy content checklist

Everything below was hand-authored as placeholder content while building out the dashboard UI. Replace as you go.

Find all inline markers: `grep -rn "TODO(dummy)" src/`

## `src/lib/data/profile.js`

- [ ] `handle` — currently `avej`
- [ ] `location` — currently `Seongnam, KR`
- [ ] `role` / `org` — currently `Software Engineer @ Naver`
- [ ] `editor` — currently `Neovim + Cursor + Claude Code`
- [ ] `shell` — currently `zsh + starship`
- [ ] `langs` — array of 5 languages
- [ ] `uptime` — currently `12 years in the industry`
- [ ] `now` — "what I'm working on" line (shown prominently on Home)
- [ ] `tagline` — quoted one-liner under the neofetch block
- [ ] `links` — github URL (email is already real)

Already accurate: `name` (from git config), `links.email`.

## `src/lib/data/projects.js`

- [ ] Replace 6 of the 7 entries with real repos (`avej-com` entry is real, keep or edit)
- [ ] Set `pinned: true` on the 3 projects you want on the Home dashboard
- [ ] `repoUrl`s all point to fictional `smgal/*` repos — fix or remove

Schema (see JSDoc at top of file): `id`, `name`, `desc`, `lang`, `stars`, `status`, `lastCommit`, `pinned`, `tags`, `repoUrl`, `summary`.

## `src/lib/data/activity.js`

- [ ] Replace all 10 events (every commit/PR/release/issue is fictional)
- [ ] Eventually: swap the whole module for a GitHub events API fetch (see comment in file)
- [ ] Note: relative times (`"2h ago"`) are strings and do not auto-update

## `src/routes/About.svelte`

- [ ] `bio` — 3 placeholder paragraphs
- [ ] `stack` — 6 placeholder rows (languages, editor, shell, infra, terminal, desktop)
- [ ] `principles` — 4 placeholder one-liners

## Not dummy, don't touch unless you want to

- `src/content/posts/*.md` — your real posts
- `src/lib/router.svelte.js`, `routes.js`, `posts.js`, `markdown.js` — routing + content infra
- `src/lib/stores/theme.svelte.js` — theme metadata and store
- `src/styles/variables.css` — theme palettes
- `src/lib/components/` — UI primitives (`ProjectRow`, `PostRow`, `ActivityRow`, `BackLink`, `NeofetchBlock`, `BreadcrumbNav`, `TerminalWindow`)
