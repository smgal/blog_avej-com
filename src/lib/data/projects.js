/**
 * @typedef {'ACTIVE'|'WIP'|'STALE'|'ARCHIVED'} ProjectStatus
 *
 * @typedef {Object} Project
 * @property {string}         id          slug used in /projects/:id
 * @property {string}         name        display name
 * @property {string}         desc        one-line description
 * @property {string}         lang        primary language
 * @property {number}         stars
 * @property {ProjectStatus}  status
 * @property {string}         lastCommit  ISO YYYY-MM-DD
 * @property {boolean}        pinned      shown on Home
 * @property {string[]}       tags
 * @property {string}         repoUrl
 * @property {string}         summary     longer body for /projects/:id
 */

// TODO(dummy): every entry in the `projects` array below is placeholder
// content (except the `avej-com` entry, which is this site). Replace with
// your real repos, or later swap this whole module for a client-side fetch
// of the GitHub REST API (60 req/hr unauth).
// See https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user

/** @type {Project[]} */
export const projects = [
    {
        id: 'pinscribe',
        name: 'pinscribe',
        desc: 'Cross-tab code snippet sync for Chromium browsers',
        lang: 'TypeScript',
        stars: 214,
        status: 'ACTIVE',
        lastCommit: '2026-04-22',
        pinned: true,
        tags: ['chrome-extension', 'dx', 'clipboard'],
        repoUrl: 'https://github.com/smgal/pinscribe',
        summary: 'A drop-in Chromium extension that keeps a ring buffer of highlighted code fragments across tabs, syncing via the browser\'s native storage API — no server, no account. Command palette (Ctrl+Shift+P) replays any snippet from the last 200. Built to scratch my own itch of constantly losing context when jumping between docs, PRs, and the editor.',
    },
    {
        id: 'helix-orbit',
        name: 'helix-orbit',
        desc: 'Orbit multiple git worktrees with a single CLI',
        lang: 'Rust',
        stars: 81,
        status: 'WIP',
        lastCommit: '2026-04-20',
        pinned: true,
        tags: ['rust', 'cli', 'git', 'developer-experience'],
        repoUrl: 'https://github.com/smgal/helix-orbit',
        summary: 'Think tmux-for-git. Spin up N worktrees from the same repo — each in its own branch, its own dependency state — and hop between them with `orb <n>`. Written in Rust, ships as a single static binary, zero config in the common case. Currently landing parallel branch-sync.',
    },
    {
        id: 'lumen-cli',
        name: 'lumen-cli',
        desc: 'Markdown → terminal slide deck via stdin',
        lang: 'Go',
        stars: 47,
        status: 'ACTIVE',
        lastCommit: '2026-04-18',
        pinned: true,
        tags: ['go', 'cli', 'presentation'],
        repoUrl: 'https://github.com/smgal/lumen-cli',
        summary: '`cat deck.md | lumen` — instant in-terminal presentation with arrow-key navigation, ANSI colors, ASCII diagrams, and live-reload on file change. No framework, no browser, no build step. Great for tech talks over SSH.',
    },
    {
        id: 'avej-com',
        name: 'avej.com',
        desc: 'This site. Svelte 5 + Vite SPA, terminal aesthetic',
        lang: 'Svelte',
        stars: 3,
        status: 'ACTIVE',
        lastCommit: '2026-04-24',
        pinned: false,
        tags: ['svelte', 'blog', 'static', 'github-pages'],
        repoUrl: 'https://github.com/smgal/blog_avej-com',
        summary: 'A hand-rolled static SPA: hash routing, markdown bundled at build time, themes as CSS variable sets. Deployed to GitHub Pages on every push to main. This very page you are reading.',
    },
    {
        id: 'zsh-prefetch',
        name: 'zsh-prefetch',
        desc: 'Predictive shell history with inline suggestions',
        lang: 'Shell',
        stars: 19,
        status: 'STALE',
        lastCommit: '2025-11-03',
        pinned: false,
        tags: ['zsh', 'shell', 'productivity'],
        repoUrl: 'https://github.com/smgal/zsh-prefetch',
        summary: 'A zsh plugin that precomputes likely next commands from `pwd` and recent history, surfacing them as greyed-out inline hints. Works, but I\'ve since migrated to fish for daily use so this is on the back burner.',
    },
    {
        id: 'dotroot',
        name: 'dotroot',
        desc: 'Dotfiles, kept honest',
        lang: 'Shell',
        stars: 8,
        status: 'ACTIVE',
        lastCommit: '2026-04-10',
        pinned: false,
        tags: ['dotfiles', 'shell', 'config'],
        repoUrl: 'https://github.com/smgal/dotroot',
        summary: 'My zsh / nvim / tmux / git configs, versioned with GNU stow. A fresh machine goes from login to productive in under 5 minutes. Includes a bootstrap script that installs brew, rustup, and mise.',
    },
    {
        id: 'tickertrack',
        name: 'tickertrack',
        desc: 'Terminal-style crypto/stock ticker',
        lang: 'TypeScript',
        stars: 112,
        status: 'ARCHIVED',
        lastCommit: '2024-08-15',
        pinned: false,
        tags: ['cli', 'finance', 'archive'],
        repoUrl: 'https://github.com/smgal/tickertrack',
        summary: 'Pulled live ticker data and rendered a running ASCII chart in the terminal. Retired when the upstream free tier closed; kept around as a reference for anyone wanting to implement sparkline rendering in pure Node.',
    },
];

export function getProjects() {
    return projects;
}

export function getPinned() {
    return projects.filter((p) => p.pinned);
}

export function getProject(id) {
    return projects.find((p) => p.id === id);
}
