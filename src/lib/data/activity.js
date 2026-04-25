/**
 * @typedef {'commit'|'pr'|'release'|'issue'} EventKind
 *
 * @typedef {Object} Event
 * @property {string}    time     human-readable relative time, e.g. "2h ago"
 * @property {EventKind} kind
 * @property {string}    repo     matches a project id, or a free-form repo name
 * @property {string}    message
 * @property {string}   [sha]     short commit SHA, for kind === "commit"
 */

// TODO(dummy): every entry in the `activity` array below is placeholder
// content. Update manually as you ship, or later swap this whole module for
// a client-side fetch of the GitHub events API:
//   /users/{user}/events/public  (60 req/hr unauth)
// Note: relative times ("2h ago") are stored as strings and do not
// auto-update — you must rewrite them or compute from real timestamps.

/** @type {Event[]} */
export const activity = [
    { time: '2h ago',  kind: 'commit',  repo: 'pinscribe',    message: 'fix: clipboard fallback on Safari tech preview',     sha: 'a8f1e2c' },
    { time: '5h ago',  kind: 'commit',  repo: 'pinscribe',    message: 'feat: command palette keybinding via chord',         sha: 'd41a9b2' },
    { time: '1d ago',  kind: 'release', repo: 'lumen-cli',    message: 'v0.4.0 — smooth-scrolling slide transitions' },
    { time: '1d ago',  kind: 'commit',  repo: 'avej-com',     message: 'refactor: route table + markdown pipeline',           sha: 'f290b37' },
    { time: '2d ago',  kind: 'pr',      repo: 'helix-orbit',  message: 'Merge pull request #18: parallel worktree sync' },
    { time: '3d ago',  kind: 'commit',  repo: 'helix-orbit',  message: 'wip: mutex-free concurrent branch updates',          sha: '71c04ee' },
    { time: '4d ago',  kind: 'issue',   repo: 'lumen-cli',    message: 'Closed #23 — Pandoc-flavored tables not rendering' },
    { time: '6d ago',  kind: 'commit',  repo: 'dotroot',      message: 'chore: bump starship prompt config',                  sha: '0e8b4f1' },
    { time: '1w ago',  kind: 'commit',  repo: 'pinscribe',    message: 'perf: dedupe ring buffer on write',                   sha: '3f9a0d4' },
    { time: '2w ago',  kind: 'release', repo: 'pinscribe',    message: 'v0.2.0 — cross-device sync (experimental)' },
];

export function getActivity(limit = activity.length) {
    return activity.slice(0, limit);
}
