<script>
    import { router } from "../lib/router.svelte.js";
    import { getPosts } from "../lib/posts.js";
    import { marked } from "marked";
    import hljs from "highlight.js";
    import "highlight.js/styles/base16/ros-pine-moon.css"; // A terminal-like modern theme

    let slug = $derived(router.route.split("/").pop());

    let post = $derived(getPosts().find((p) => p.slug === slug));

    function parseTerminalMd(text) {
        if (!text) return "";
        // Use marked with breaks: true to emulate terminal-like line breaks
        return marked.parse(text, { breaks: true });
    }

    // Apply syntax highlighting whenever the post content updates
    $effect(() => {
        if (post) {
            // Wait for DOM update
            setTimeout(() => {
                document.querySelectorAll("pre code").forEach((el) => {
                    hljs.highlightElement(el);
                });
            }, 0);
        }
    });
</script>

<div class="page-content">
    {#if post}
        <div class="post-header">
            <div class="meta-row">
                <span class="label">FILE:</span>
                <span class="value">{post.slug}.md</span>
            </div>
            <div class="meta-row">
                <span class="label">DATE:</span>
                <span class="value">{post.date}</span>
            </div>
            {#if post.tags && post.tags.length > 0}
                <div class="meta-row">
                    <span class="label">TAGS:</span>
                    <span class="value">[{post.tags.join(", ")}]</span>
                </div>
            {/if}
            {#if post.summary}
                <div class="meta-row">
                    <span class="label">DESC:</span>
                    <span class="value">{post.summary}</span>
                </div>
            {/if}
        </div>

        <h1 class="post-title">{post.title}</h1>

        <div class="separator">
            ==================================================
        </div>

        <article class="post-content">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html parseTerminalMd(post.content)}
        </article>

        <div class="separator">
            ==================================================
        </div>
        <div class="footer-nav">
            <button onclick={() => router.navigate("/posts")} class="nav-btn"
                >[ cd .. ]</button
            >
        </div>
    {:else}
        <div class="error-box">
            <h2>404 - FILE NOT FOUND</h2>
            <p>The system cannot find the file specified: {slug}</p>
            <button onclick={() => router.navigate("/posts")} class="nav-btn"
                >[ Return ]</button
            >
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

    .nav-btn {
        background: none;
        border: none;
        color: var(--dim-color);
        cursor: pointer;
        font-family: inherit;
        font-size: 1rem;
        padding: 0;
    }
    .nav-btn:hover {
        color: var(--accent-primary);
    }
    .error-box {
        border: 1px solid red;
        padding: 1rem;
        color: red;
    }
</style>
