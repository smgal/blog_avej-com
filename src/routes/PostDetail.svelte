<script>
    import { router } from "@/lib/router.svelte.js";
    import { getPosts } from "@/lib/posts.js";
    import { parseMarkdown } from "@/lib/markdown.js";
    import BackLink from "@/lib/components/BackLink.svelte";
    import "highlight.js/styles/base16/ros-pine-moon.css"; // A terminal-like modern theme

    let slug = $derived(router.route.split("/").filter(Boolean).pop());
    let post = $derived(getPosts().find((p) => p.slug === slug));
    let rendered = $derived(post ? parseMarkdown(post.content) : "");
</script>

<div class="page-content">
    {#if post}
        <div class="post-header">
            <div class="meta-row">
                <span class="label">DATE:</span>
                <span class="value">{post.date}</span>
            </div>
            {#if post.summary}
                <div class="meta-row">
                    <span class="label">DESC:</span>
                    <span class="value">{post.summary}</span>
                </div>
            {/if}
            {#if post.tags && post.tags.length > 0}
                <div class="meta-row">
                    <span class="label">TAGS:</span>
                    <span class="value"
                        >{post.tags.map((t) => "#" + t).join(" ")}</span
                    >
                </div>
            {/if}
        </div>

        <h1 class="post-title">{post.title}</h1>

        <div class="separator">
            ==================================================
        </div>

        <article class="post-content">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html rendered}
        </article>

        <div class="separator">
            ==================================================
        </div>
        <div class="footer-nav">
            <BackLink to="/posts" />
        </div>
    {:else}
        <div class="error-box">
            <h2>404 - FILE NOT FOUND</h2>
            <p>The system cannot find the file specified: {slug}</p>
            <BackLink to="/posts" label="back to posts" />
        </div>
    {/if}
</div>

<style>
    .post-header {
        margin-bottom: 1rem;
        font-family: var(--font-mono);
    }
    .meta-row {
        display: flex;
    }
    .label {
        width: 60px;
        color: var(--dim-color);
    }
    .value {
        color: var(--accent-secondary);
    }

    .separator {
        color: var(--dim-color);
        margin: 1rem 0;
        user-select: none;
    }

    .post-content {
        line-height: 1.8;
        font-family: var(--font-post);
    }

    /* Force font inheritance for all inject children */
    :global(.post-content *) {
        font-family: var(--font-post) !important;
    }

    /* Global styles for dynamic HTML content are tricky in scoped Svelte. 
     We use :global() for the injected HTML classes. */
    :global(.post-content h1) {
        color: var(--accent-primary);
        font-size: 1.5rem;
        margin-top: 1rem;
        border-bottom: 1px solid var(--dim-color);
        display: inline-block;
    }
    :global(.post-content h2) {
        color: var(--accent-secondary);
        font-size: 1.2rem;
        margin-top: 1rem;
    }
    :global(.post-content h3) {
        color: var(--fg-color);
        font-weight: bold;
        margin-top: 0.5rem;
        text-decoration: underline;
    }
    :global(.post-content h4) {
        color: var(--dim-color);
        font-weight: bold;
        margin-top: 0.5rem;
        font-style: italic;
    }
    :global(.post-content strong) {
        color: #fff;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    }
    :global(pre) {
        background: var(
            --code-bg
        ) !important; /* Theme-aware background - Force override */
        border: 1px solid var(--dim-color);
        padding: 1rem;
        margin: 1rem 0;
        overflow-x: auto;
        border-radius: 4px;
    }

    /* Override highlight.js theme background */
    :global(.hljs),
    :global(code.hljs) {
        background: transparent !important; /* Let pre background show through */
    }
    :global(.post-content code) {
        font-family: "Courier New", Courier, monospace !important; /* Keep code monospace */
        /* color is handled by highlight.js */
        font-size: 0.9em;
    }

    /* FIX: Force all elements inside code blocks (like syntax highlighting spans) to inherit the monospace font */
    :global(.post-content pre code *) {
        font-family: inherit !important;
    }

    .error-box {
        border: 1px solid red;
        padding: 1rem;
        color: red;
    }
</style>
