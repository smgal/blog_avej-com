<script>
    import { profile } from "@/lib/data/profile.js";
    import NeofetchBlock from "@/lib/components/NeofetchBlock.svelte";
    import BackLink from "@/lib/components/BackLink.svelte";

    // TODO(dummy): placeholder bio paragraphs — rewrite in your voice.
    const bio = [
        'Software engineer. I spend most of my time on developer tooling — CLIs, browser extensions, editor plugins — anything that removes a small daily friction multiplied by a million.',
        'I lean toward static over dynamic, local-first over cloud-first, monospace over proportional. Not out of nostalgia, but because constraints make software honest.',
        'This site is my notebook. No analytics, no comments, no newsletter. If something here is useful to you, you are welcome.',
    ];

    // TODO(dummy): placeholder tech stack — reflects nothing real yet.
    const stack = [
        { k: 'Languages',   v: 'TypeScript · Rust · Go · Svelte · Python' },
        { k: 'Infra',       v: 'Cloudflare, GitHub Actions, fly.io for side-projects' },
        { k: 'Terminal',    v: 'Ghostty + tmux' },
        { k: 'Desktop',     v: 'macOS (daily), NixOS (tinkering)' },
    ];

    // TODO(dummy): placeholder principles — replace or delete.
    const principles = [
        'Write software you would still want to maintain in five years.',
        'Prefer boring tools that work to exciting tools that almost do.',
        'Delete more than you add.',
        'Static simplicity is a rebellious act.',
    ];
</script>

<div class="page">
    <div class="prompt">
        <span class="dollar">$</span> neofetch
    </div>
    <NeofetchBlock />

    <div class="prompt">
        <span class="dollar">$</span> cat about.md
    </div>

    <section class="bio">
        {#each bio as paragraph}
            <p>{paragraph}</p>
        {/each}
    </section>

    <section class="section">
        <div class="section-head">## current stack</div>
        <dl class="kv">
            {#each stack as { k, v }}
                <div><dt>{k}</dt><dd>{v}</dd></div>
            {/each}
        </dl>
    </section>

    <section class="section">
        <div class="section-head">## principles</div>
        <ul class="principles">
            {#each principles as p}
                <li>{p}</li>
            {/each}
        </ul>
    </section>

    <section class="section">
        <div class="section-head">## links</div>
        <ul class="links">
            {#each profile.links as { label, href }}
                <li>
                    <span class="link-key">{label}:</span>
                    <a {href} target="_blank" rel="noopener">{href.replace(/^mailto:/, "")}</a>
                </li>
            {/each}
        </ul>
    </section>

    <div class="footer">
        <BackLink to="/" />
    </div>
</div>

<style>
    .page {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        max-width: 820px;
    }

    .prompt {
        font-family: var(--font-mono);
        font-weight: bold;
        color: var(--fg-color);
    }
    .dollar { color: var(--accent-primary); margin-right: 0.25rem; }

    .bio {
        font-family: var(--font-post);
        line-height: 1.8;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }
    .bio p { margin: 0; }

    .section { display: flex; flex-direction: column; gap: 0.4rem; }
    .section-head {
        font-family: var(--font-mono);
        color: var(--accent-secondary);
        font-weight: bold;
    }

    .kv {
        font-family: var(--font-mono);
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        margin: 0;
        padding-left: 1rem;
    }
    .kv > div { display: flex; gap: 0.75rem; }
    .kv dt { color: var(--dim-color); width: 100px; margin: 0; }
    .kv dd { margin: 0; color: var(--fg-color); }

    .principles {
        font-family: var(--font-post);
        padding-left: 2rem;
        margin: 0;
        line-height: 1.8;
    }
    .principles li::marker { color: var(--accent-secondary); }

    .links {
        font-family: var(--font-mono);
        list-style: none;
        padding-left: 1rem;
        margin: 0;
    }
    .links li { margin: 0.2rem 0; }
    .link-key {
        color: var(--dim-color);
        display: inline-block;
        width: 70px;
    }
    .links a {
        color: var(--accent-secondary);
    }
    .links a:hover {
        color: var(--accent-primary);
    }

    .footer { margin-top: 0.5rem; }
</style>
