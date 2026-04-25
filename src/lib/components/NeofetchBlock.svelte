<script>
    import { profile } from "@/lib/data/profile.js";
</script>

<div class="neofetch">
    <div class="nf-head">{profile.handle}@terminal</div>
    <div class="nf-rule">{'─'.repeat(profile.handle.length + 10)}</div>
    <div class="nf-row"><span class="nf-k">Name</span><span class="nf-v">{profile.name}</span></div>
    <div class="nf-row"><span class="nf-k">Location</span><span class="nf-v">{profile.location}</span></div>
    <div class="nf-row"><span class="nf-k">Role</span><span class="nf-v">{profile.role} @ {profile.org}</span></div>
    <div class="nf-row"><span class="nf-k">Editor</span><span class="nf-v">{profile.editor}</span></div>
    <div class="nf-row"><span class="nf-k">Shell</span><span class="nf-v">{profile.shell}</span></div>
    <div class="nf-row"><span class="nf-k">Languages</span><span class="nf-v">{profile.langs.join(" · ")}</span></div>
    <div class="nf-row"><span class="nf-k">Uptime</span><span class="nf-v">{profile.uptime}</span></div>
    <div class="nf-row nf-now"><span class="nf-k">Now</span><span class="nf-v">{profile.now}</span></div>
    <div class="nf-quote">{profile.tagline}</div>
</div>

<style>
    .neofetch {
        font-family: var(--font-mono);
        padding-left: 1rem;
        line-height: 1.6;
    }
    .nf-head {
        color: var(--accent-primary);
        font-weight: bold;
    }
    .nf-rule {
        color: var(--dim-color);
        margin-bottom: 0.25rem;
    }
    .nf-row {
        display: grid;
        grid-template-columns: 110px 1fr;
        gap: 0.5rem;
    }
    .nf-k { color: var(--accent-secondary); }
    .nf-v { color: var(--fg-color); }
    .nf-now .nf-v { color: var(--accent-primary); }
    .nf-quote {
        margin-top: 0.75rem;
        color: var(--dim-color);
        font-style: italic;
    }
</style>
