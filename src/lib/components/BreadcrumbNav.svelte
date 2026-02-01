<script>
    import { router } from "../router.svelte.js";

    // Computed path segments based on current route
    let segments = $derived.by(() => {
        const route = router.route;
        if (route === "/" || route === "") return [{ name: "~", path: "/" }];

        const parts = route.split("/").filter((p) => p);
        const result = [{ name: "~", path: "/" }];

        let currentPath = "";
        parts.forEach((part, index) => {
            currentPath += "/" + part;
            // For the last part (e.g. filename), keep it as is.
            // For 'posts', it maps to the list.
            result.push({
                name:
                    index === parts.length - 1 && part.length > 20
                        ? part.slice(0, 20) + "..."
                        : part,
                path: currentPath,
            });
        });
        return result;
    });

    function navigate(path) {
        router.navigate(path);
    }
</script>

<div class="breadcrumb-bar">
    <span class="prompt">visitor@avej.com:</span>
    <div class="crumbs">
        {#each segments as segment, index}
            {#if index > 0}
                <span class="separator">/</span>
            {/if}
            <button
                class="crumb"
                class:active={index === segments.length - 1}
                onclick={() => navigate(segment.path)}
            >
                {segment.name}
            </button>
        {/each}
        {#if segments.length > 0}
            <span class="cursor">_</span>
        {/if}
    </div>
</div>

<style>
    .breadcrumb-bar {
        padding: 0.8rem 1rem;
        border-top: 1px solid var(--border-color);
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        font-family: var(--font-mono);
    }

    .prompt {
        color: var(--accent-primary);
        margin-right: 0.5rem;
    }

    .crumbs {
        display: flex;
        align-items: center;
    }

    .separator {
        color: var(--dim-color);
        margin: 0 0.2rem;
    }

    .crumb {
        background: none;
        border: none;
        color: var(--accent-secondary);
        cursor: pointer;
        padding: 0;
        font-family: inherit;
        font-size: 1rem;
    }

    .crumb:hover {
        text-decoration: underline;
        color: var(--accent-primary);
    }

    .crumb.active {
        color: var(--fg-color);
        pointer-events: none; /* Current page shouldn't be clickable or look actionable */
        text-decoration: none;
    }

    .cursor {
        animation: blink 1s step-end infinite;
        font-weight: bold;
        color: var(--fg-color);
        margin-left: 0.5rem;
    }

    @keyframes blink {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }
</style>
