<script>
    import { router } from "@/lib/router.svelte.js";
    import { getPinned } from "@/lib/data/projects.js";
    import { getActivity } from "@/lib/data/activity.js";
    import { getPosts } from "@/lib/posts.js";
    import ProjectRow from "@/lib/components/ProjectRow.svelte";
    import ActivityRow from "@/lib/components/ActivityRow.svelte";
    import PostRow from "@/lib/components/PostRow.svelte";

    const pinned = getPinned();
    const recentActivity = getActivity(6);
    const recentPosts = getPosts().slice(0, 3);
</script>

<div class="dashboard">
    <!-- pinned projects -->
    <section class="block">
        <div class="prompt">
            <span class="dollar">$</span> ls pinned/
            <span class="count">{pinned.length} items</span>
        </div>
        <div class="list">
            {#each pinned as project}
                <ProjectRow {project} />
            {/each}
        </div>
        <button class="cmd-link" onclick={() => router.navigate("/projects")}>
            [ cd projects/ ] → see all
        </button>
    </section>

    <!-- recent activity -->
    <section class="block">
        <div class="prompt">
            <span class="dollar">$</span> git log --oneline -{recentActivity.length}
        </div>
        <div class="list">
            {#each recentActivity as event}
                <ActivityRow {event} />
            {/each}
        </div>
    </section>

    <!-- recent posts -->
    <section class="block">
        <div class="prompt">
            <span class="dollar">$</span> tail -n {recentPosts.length} posts/
        </div>
        <div class="list">
            {#each recentPosts as post}
                <PostRow {post} />
            {/each}
        </div>
        <button class="cmd-link" onclick={() => router.navigate("/posts")}>
            [ cd posts/ ] → see all
        </button>
    </section>

    <!-- help -->
    <section class="block">
        <div class="prompt">
            <span class="dollar">$</span> help
        </div>
        <div class="help">
            <button class="cmd-link" onclick={() => router.navigate("/projects")}>cd projects/</button>
            <span class="sep">·</span>
            <button class="cmd-link" onclick={() => router.navigate("/posts")}>cd posts/</button>
            <span class="sep">·</span>
            <button class="cmd-link" onclick={() => router.navigate("/about")}>cd about/</button>
        </div>
    </section>
</div>

<style>
    .dashboard {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 900px;
    }

    .block {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .prompt {
        font-family: var(--font-mono);
        color: var(--fg-color);
        font-weight: bold;
        letter-spacing: 0.02em;
    }
    .dollar {
        color: var(--accent-primary);
        margin-right: 0.25rem;
    }
    .count {
        color: var(--dim-color);
        font-weight: normal;
        margin-left: 0.5rem;
        font-size: 0.85rem;
    }

    .list {
        display: flex;
        flex-direction: column;
        padding-left: 0.5rem;
    }

    .cmd-link {
        background: none;
        border: none;
        color: var(--accent-secondary);
        font-family: var(--font-mono);
        font-size: 0.95rem;
        padding: 0;
        margin-top: 0.4rem;
        cursor: pointer;
        text-align: left;
    }
    .cmd-link:hover {
        color: var(--accent-primary);
        text-decoration: underline;
    }

    .help {
        font-family: var(--font-mono);
        display: flex;
        gap: 0.75rem;
        padding-left: 1rem;
    }
    .help .cmd-link { margin-top: 0; }
    .sep { color: var(--dim-color); }

</style>
