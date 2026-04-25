<script>
    import { getProjects } from "@/lib/data/projects.js";
    import ProjectRow from "@/lib/components/ProjectRow.svelte";
    import BackLink from "@/lib/components/BackLink.svelte";

    const STATUS_ORDER = ["ACTIVE", "WIP", "STALE", "ARCHIVED"];

    // Sort state. Default: active first, then by most-recent commit.
    let sortKey = $state("status");

    let projects = $derived.by(() => {
        const all = [...getProjects()];
        if (sortKey === "status") {
            all.sort((a, b) => {
                const s = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
                if (s !== 0) return s;
                return b.lastCommit.localeCompare(a.lastCommit);
            });
        } else if (sortKey === "stars") {
            all.sort((a, b) => b.stars - a.stars);
        } else if (sortKey === "recent") {
            all.sort((a, b) => b.lastCommit.localeCompare(a.lastCommit));
        } else if (sortKey === "name") {
            all.sort((a, b) => a.name.localeCompare(b.name));
        }
        return all;
    });

    const counts = {
        total: getProjects().length,
        active: getProjects().filter((p) => p.status === "ACTIVE").length,
        wip: getProjects().filter((p) => p.status === "WIP").length,
    };
</script>

<div class="page">
    <div class="prompt">
        <span class="dollar">$</span> ls -la projects/
    </div>

    <div class="summary">
        total {counts.total} · active {counts.active} · wip {counts.wip}
    </div>

    <div class="controls">
        <span class="ctrl-label">sort:</span>
        {#each [ ["status", "status"], ["recent", "recent-commit"], ["stars", "stars"], ["name", "name"] ] as [key, label]}
            <button
                class="ctrl"
                class:active={sortKey === key}
                onclick={() => (sortKey = key)}
            >
                --{label}
            </button>
        {/each}
    </div>

    <div class="list">
        {#each projects as project}
            <ProjectRow {project} />
        {/each}
    </div>

    <div class="footer">
        <BackLink to="/" />
    </div>
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        max-width: 1000px;
    }

    .prompt {
        font-family: var(--font-mono);
        font-weight: bold;
        color: var(--fg-color);
    }
    .dollar { color: var(--accent-primary); margin-right: 0.25rem; }

    .summary {
        color: var(--dim-color);
        font-family: var(--font-mono);
        font-size: 0.85rem;
    }

    .controls {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        font-family: var(--font-mono);
        font-size: 0.9rem;
        padding: 0.25rem 0;
        border-bottom: 1px solid var(--border-color);
    }
    .ctrl-label { color: var(--dim-color); }
    .ctrl {
        background: none;
        border: none;
        color: var(--accent-secondary);
        font-family: inherit;
        font-size: inherit;
        cursor: pointer;
        padding: 0;
    }
    .ctrl:hover { color: var(--accent-primary); }
    .ctrl.active {
        color: var(--fg-color);
        font-weight: bold;
        text-decoration: underline;
    }

    .list {
        display: flex;
        flex-direction: column;
    }

    .footer {
        margin-top: 1rem;
    }
</style>
