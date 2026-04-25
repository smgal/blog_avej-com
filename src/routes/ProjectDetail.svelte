<script>
    import { router } from "@/lib/router.svelte.js";
    import { getProject } from "@/lib/data/projects.js";
    import BackLink from "@/lib/components/BackLink.svelte";

    let id = $derived(router.route.split("/").filter(Boolean).pop());
    let project = $derived(getProject(id));
</script>

<div class="page">
    {#if project}
        <div class="prompt">
            <span class="dollar">$</span> cat projects/{project.name}.md
        </div>

        <header class="header">
            <div class="title-row">
                <span class="status status-{project.status.toLowerCase()}">
                    [{project.status}]
                </span>
                <h1 class="name">{project.name}</h1>
                <span class="stars">⭐ {project.stars}</span>
            </div>
            <p class="desc">{project.desc}</p>
        </header>

        <dl class="meta">
            <div><dt>LANG</dt><dd>{project.lang}</dd></div>
            <div><dt>LAST</dt><dd>{project.lastCommit}</dd></div>
            <div><dt>TAGS</dt><dd>{project.tags.map((t) => "#" + t).join(" ")}</dd></div>
            <div>
                <dt>REPO</dt>
                <dd><a href={project.repoUrl} target="_blank" rel="noopener">{project.repoUrl}</a></dd>
            </div>
        </dl>

        <div class="separator">==================================================</div>

        <article class="body">
            <p>{project.summary}</p>
        </article>

        <div class="separator">==================================================</div>

        <div class="footer">
            <BackLink to="/projects" />
        </div>
    {:else}
        <div class="error-box">
            <h2>404 — PROJECT NOT FOUND</h2>
            <p>No entry for: {id}</p>
            <BackLink to="/projects" label="back to projects" />
        </div>
    {/if}
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        max-width: 900px;
    }
    .prompt {
        font-family: var(--font-mono);
        font-weight: bold;
        color: var(--fg-color);
    }
    .dollar { color: var(--accent-primary); margin-right: 0.25rem; }

    .header { display: flex; flex-direction: column; gap: 0.3rem; }
    .title-row {
        display: flex;
        align-items: baseline;
        gap: 0.75rem;
        flex-wrap: wrap;
    }
    .status { font-family: var(--font-mono); font-weight: bold; }
    .status-active    { color: var(--accent-secondary); }
    .status-wip       { color: var(--accent-primary); }
    .status-stale     { color: var(--dim-color); }
    .status-archived  { color: var(--dim-color); text-decoration: line-through; }

    .name {
        font-size: 1.5rem;
        font-family: var(--font-mono);
        margin: 0;
        color: var(--fg-color);
    }
    .stars { color: var(--dim-color); font-family: var(--font-mono); }

    .desc {
        color: var(--accent-secondary);
        margin: 0;
        font-family: var(--font-mono);
    }

    .meta {
        font-family: var(--font-mono);
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        margin: 0;
    }
    .meta > div { display: flex; gap: 0.75rem; }
    .meta dt { color: var(--dim-color); width: 60px; margin: 0; }
    .meta dd { margin: 0; color: var(--accent-secondary); }
    .meta a { color: var(--accent-secondary); }
    .meta a:hover { color: var(--accent-primary); }

    .separator {
        color: var(--dim-color);
        margin: 0.5rem 0;
        user-select: none;
    }

    .body {
        font-family: var(--font-post);
        line-height: 1.8;
    }

    .footer { margin-top: 0.5rem; }

    .error-box {
        border: 1px solid var(--accent-primary);
        padding: 1rem;
        color: var(--accent-primary);
    }
</style>
