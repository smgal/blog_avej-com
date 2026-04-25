<script>
    import { router } from "@/lib/router.svelte.js";

    let { project, compact = false } = $props();

    function open() {
        router.navigate(`/projects/${project.id}`);
    }
</script>

<button class="row" onclick={open} title={project.desc}>
    <span class="status status-{project.status.toLowerCase()}">
        [{project.status}]
    </span>
    <span class="name">{project.name}</span>
    <span class="lang">{project.lang}</span>
    <span class="stars">⭐ {project.stars}</span>
    {#if !compact}
        <span class="desc">{project.desc}</span>
    {/if}
</button>

<style>
    .row {
        display: grid;
        grid-template-columns: 110px 1fr 90px 70px 2fr;
        gap: 1rem;
        align-items: baseline;
        padding: 0.3rem 0.25rem;
        width: 100%;
        text-align: left;
        background: none;
        border: none;
        border-bottom: 1px dashed var(--border-color);
        font-family: var(--font-mono);
        font-size: 0.95rem;
        color: var(--fg-color);
        cursor: pointer;
    }
    .row:hover {
        background: rgba(255, 255, 255, 0.04);
    }

    .status {
        font-weight: bold;
        letter-spacing: 0.02em;
    }
    .status-active    { color: var(--accent-secondary); }
    .status-wip       { color: var(--accent-primary); }
    .status-stale     { color: var(--dim-color); }
    .status-archived  { color: var(--dim-color); text-decoration: line-through; }

    .name  { font-weight: bold; }
    .lang  { color: var(--dim-color); }
    .stars { color: var(--dim-color); }
    .desc  { color: var(--accent-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    @media (max-width: 700px) {
        .row {
            grid-template-columns: 90px 1fr;
            row-gap: 0.1rem;
        }
        .lang, .stars, .desc {
            grid-column: 2;
        }
    }
</style>
