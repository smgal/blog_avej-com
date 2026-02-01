<script>
    import { router } from "../lib/router.svelte.js";
    import { getPosts } from "../lib/posts.js";

    // Fetch real posts from the filesystem
    const posts = getPosts();
</script>

<div class="page-content">
    <h2>/var/log/posts</h2>
    <p>
        <button onclick={() => router.navigate("/")} class="back-link"
            >cd ..</button
        >
    </p>
    <br />

    <div class="file-list">
        {#each posts as post}
            <button
                class="file-item-btn"
                onclick={() => router.navigate(`/posts/${post.slug}`)}
            >
                <div class="file-item">
                    <span class="date">{post.date}</span>
                    <span class="name">{post.title}</span>
                    <span class="meta">[{post.slug}.md]</span>
                </div>
            </button>
        {/each}
        {#if posts.length === 0}
            <div class="file-item empty">No logs found.</div>
        {/if}
        <div class="file-item empty">-- End of Directory --</div>
    </div>
</div>

<style>
    .back-link {
        background: none;
        border: none;
        color: var(--dim-color);
        font-family: inherit;
        cursor: pointer;
    }
    .back-link:hover {
        color: var(--fg-color);
    }

    .file-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .file-item-btn {
        display: block;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        width: 100%;
        text-align: left;
        font-family: inherit;
        font-size: inherit;
        cursor: pointer;
    }

    .file-item-btn:hover .file-item {
        background: rgba(255, 255, 255, 0.05);
        color: var(--accent-secondary);
    }

    .file-item {
        display: flex;
        align-items: baseline;
        padding: 0.2rem 0;
        border-bottom: 1px dashed var(--border-color);
    }

    .date {
        color: var(--accent-primary);
        width: 120px;
        flex-shrink: 0;
    }
    .name {
        color: var(--fg-color);
        font-weight: bold;
        margin-right: 1rem;
    }
    .meta {
        color: var(--dim-color);
        font-size: 0.8rem;
        margin-left: auto;
    }
    .empty {
        color: var(--dim-color);
        margin-top: 1rem;
        border: none;
    }
</style>
