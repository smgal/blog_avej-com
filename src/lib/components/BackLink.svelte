<script>
    import { router } from "@/lib/router.svelte.js";

    /**
     * @type {{ to: string, label?: string }}
     */
    let { to, label = "cd .." } = $props();
</script>

<button class="back-link" onclick={() => router.navigate(to)}>
    <span class="arrow" aria-hidden="true">←</span>
    <span class="label">{label}</span>
</button>

<style>
    .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.9rem;
        background: none;
        border: 1px solid var(--border-color);
        color: var(--accent-secondary);
        font-family: var(--font-mono);
        font-size: 1rem;
        cursor: pointer;
        transition:
            color 120ms,
            border-color 120ms,
            background-color 120ms;
    }
    .back-link:hover,
    .back-link:focus-visible {
        color: var(--accent-primary);
        border-color: var(--accent-primary);
        background: rgba(255, 255, 255, 0.04);
        outline: none;
    }
    .arrow {
        font-size: 1.1em;
        line-height: 1;
        transition: transform 120ms;
    }
    .back-link:hover .arrow {
        transform: translateX(-2px);
    }
</style>
