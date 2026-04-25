<script>
    import { router } from "@/lib/router.svelte.js";

    let { post } = $props();
</script>

<button class="row" onclick={() => router.navigate(`/posts/${post.slug}`)} title={post.summary || post.title}>
    <span class="date">{post.date}</span>
    <span class="title">{post.title}</span>
    {#if post.summary}
        <span class="summary">— {post.summary}</span>
    {/if}
    <span class="meta">[{post.slug}.md]</span>
</button>

<style>
    .row {
        display: grid;
        grid-template-columns: 110px auto 1fr auto;
        gap: 1rem;
        align-items: baseline;
        padding: 0.3rem 0.25rem;
        background: none;
        border: none;
        border-bottom: 1px dashed var(--border-color);
        font-family: var(--font-mono);
        font-size: 0.95rem;
        text-align: left;
        cursor: pointer;
        color: var(--fg-color);
        width: 100%;
    }
    .row:hover {
        background: rgba(255, 255, 255, 0.04);
    }

    .date    { color: var(--accent-primary); }
    .title   { font-weight: bold; }
    .summary {
        color: var(--dim-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .meta {
        color: var(--dim-color);
        font-size: 0.8rem;
    }

    @media (max-width: 700px) {
        .row {
            grid-template-columns: 100px 1fr;
            row-gap: 0.1rem;
        }
        .summary { grid-column: 1 / -1; }
        .meta { grid-column: 1 / -1; }
    }
</style>
