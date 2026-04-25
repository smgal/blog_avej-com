<script>
    import { getPosts } from "@/lib/posts.js";
    import PostRow from "@/lib/components/PostRow.svelte";
    import BackLink from "@/lib/components/BackLink.svelte";

    const posts = getPosts();
</script>

<div class="page">
    <div class="prompt">
        <span class="dollar">$</span> ls posts/
        <span class="count">{posts.length} items</span>
    </div>

    <div class="list">
        {#each posts as post}
            <PostRow {post} />
        {/each}
        {#if posts.length === 0}
            <div class="empty">No logs found.</div>
        {/if}
        <div class="empty">— end of directory —</div>
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
    .count {
        color: var(--dim-color);
        font-weight: normal;
        margin-left: 0.5rem;
        font-size: 0.85rem;
    }

    .list {
        display: flex;
        flex-direction: column;
    }

    .empty {
        color: var(--dim-color);
        margin-top: 0.5rem;
        font-family: var(--font-mono);
        font-size: 0.9rem;
    }

    .footer {
        margin-top: 1rem;
    }
</style>
