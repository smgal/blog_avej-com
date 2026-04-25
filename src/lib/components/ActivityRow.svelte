<script>
    let { event } = $props();

    const KIND_SIGIL = {
        commit:  '·',
        pr:      '↰',
        release: '★',
        issue:   '!',
    };
</script>

<div class="row" title={event.kind}>
    <span class="sigil kind-{event.kind}">{KIND_SIGIL[event.kind] ?? '·'}</span>
    <span class="time">{event.time}</span>
    <span class="repo">{event.repo}</span>
    <span class="msg">{event.message}</span>
    {#if event.sha}
        <span class="sha">{event.sha}</span>
    {/if}
</div>

<style>
    .row {
        display: grid;
        grid-template-columns: 20px 80px 140px 1fr auto;
        gap: 0.75rem;
        align-items: baseline;
        padding: 0.2rem 0.25rem;
        font-family: var(--font-mono);
        font-size: 0.9rem;
        color: var(--fg-color);
    }

    .sigil {
        text-align: center;
        font-weight: bold;
    }
    .kind-commit  { color: var(--dim-color); }
    .kind-pr      { color: var(--accent-secondary); }
    .kind-release { color: var(--accent-primary); }
    .kind-issue   { color: var(--accent-primary); }

    .time { color: var(--dim-color); }
    .repo { color: var(--accent-secondary); }
    .msg  { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sha  { color: var(--dim-color); font-size: 0.8rem; }

    @media (max-width: 700px) {
        .row {
            grid-template-columns: 20px 1fr auto;
            row-gap: 0.1rem;
        }
        .time, .repo { grid-column: 2; }
        .msg  { grid-column: 1 / -1; padding-left: 28px; }
    }
</style>
