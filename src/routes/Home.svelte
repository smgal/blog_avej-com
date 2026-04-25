<script>
    import { router } from "@/lib/router.svelte.js";
    import { getPinned } from "@/lib/data/projects.js";
    import { getActivity } from "@/lib/data/activity.js";
    import { getPosts } from "@/lib/posts.js";
    
    import ProjectRow from "@/lib/components/ProjectRow.svelte";
    import ActivityRow from "@/lib/components/ActivityRow.svelte";
    import PostRow from "@/lib/components/PostRow.svelte";

    // Data for dashboard
    const pinnedProjects = getPinned();
    const recentActivity = getActivity(6);
    const recentPosts = getPosts().slice(0, 3);
</script>

<div class="dashboard">
    <!-- Pinned Projects -->
    <section class="section">
        <div class="prompt">
            <span class="dollar">$</span> ls pinned/
        </div>
        <div class="list">
            {#each pinnedProjects as project}
                <ProjectRow {project} />
            {/each}
        </div>
    </section>

    <!-- Activity Feed -->
    <section class="section">
        <div class="prompt">
            <span class="dollar">$</span> git log --oneline -6
        </div>
        <div class="list">
            {#each recentActivity as event}
                <ActivityRow {event} />
            {/each}
        </div>
    </section>

    <!-- Recent Posts -->
    <section class="section">
        <div class="prompt">
            <span class="dollar">$</span> tail -n 3 posts/
        </div>
        <div class="list">
            {#each recentPosts as post}
                <PostRow {post} />
            {/each}
        </div>
    </section>

    <!-- Navigation Help -->
    <section class="section footer">
        <div class="prompt">
            <span class="dollar">$</span> help
        </div>
        <div class="nav-links">
            <button onclick={() => router.navigate("/posts")} class="cmd-link">[POSTS]</button>
            <span class="sep">·</span>
            <button onclick={() => router.navigate("/projects")} class="cmd-link">[PROJECTS]</button>
            <span class="sep">·</span>
            <button onclick={() => router.navigate("/about")} class="cmd-link">[ABOUT]</button>
        </div>
    </section>
</div>

<style>
    .dashboard {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 1000px;
    }

    .section {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .prompt {
        font-family: var(--font-mono);
        font-weight: bold;
        color: var(--fg-color);
    }
    .dollar { color: var(--accent-primary); margin-right: 0.25rem; }

    .list {
        display: flex;
        flex-direction: column;
    }

    .nav-links {
        display: flex;
        gap: 1rem;
        align-items: center;
        padding-left: 1rem;
    }
    
    .sep { color: var(--dim-color); }

    .cmd-link {
        background: none;
        border: none;
        color: var(--accent-secondary);
        font-family: var(--font-mono);
        font-size: 1rem;
        cursor: pointer;
        text-decoration: underline;
        padding: 0;
    }
    .cmd-link:hover {
        color: var(--accent-primary);
    }

    .footer {
        margin-top: 1rem;
    }
</style>
