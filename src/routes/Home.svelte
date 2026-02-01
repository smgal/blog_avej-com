<script>
    import { router } from "../lib/router.svelte.js";
</script>

<div class="page-content">
    <h2>SYSTEM READY...</h2>
    <p>Welcome to the digital archive of AVEJ.</p>
    <br />
    <p>Available Commands:</p>
    <ul>
        <li>
            <button onclick={() => router.navigate("/posts")} class="cmd-link"
                >[POSTS]</button
            >
            - Read development logs and thoughts.
        </li>
        <li>
            <button onclick={() => router.navigate("/about")} class="cmd-link"
                >[ABOUT]</button
            >
            - User profile and philosophy.
        </li>
    </ul>
</div>

<style>
    .cmd-link {
        background: none;
        border: none;
        color: var(--accent-secondary);
        font-family: inherit;
        font-size: inherit;
        cursor: pointer;
        text-decoration: underline;
        padding: 0;
    }
    .cmd-link:hover {
        color: var(--accent-primary);
    }
    ul {
        list-style-type: square;
        padding-left: 1.5rem;
    }
    li {
        margin-bottom: 0.5rem;
    }
</style>
