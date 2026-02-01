<script>
    import { router } from "../router.svelte.js";
    import { getPosts } from "../posts.js";
    import { themeStore } from "../stores/theme.svelte.js";

    let input = $state("");
    let inputElement;

    // Auto-focus input on mount
    $effect(() => {
        inputElement?.focus();
    });

    const commands = {
        help: () => {
            // Logic for help (perhaps emit event or navigate to a help page?)
            // For now, we'll just log or alert, but ideally this should print to terminal output
            // Since our output area is slotted, communicating back 'up' is tricky without a store.
            // A simple alert for now, or maybe just navigate to a help post if we had one.
            alert(`Available commands:
  ls          - List all posts
  cd [name]   - Navigate to a post (e.g., cd 2026_0115_A)
  cd ..       - Go to post list
  home        - Go to home page
  theme [name]- Set theme (neo, amber, green, etc.)
  clear       - Clear terminal (not fully imp'd yet)
  help        - Show this help`);
        },
        ls: () => {
            router.navigate("/posts");
        },
        cd: (args) => {
            const target = args[0];
            if (!target || target === "~") {
                router.navigate("/");
            } else if (target === "..") {
                router.navigate("/posts");
            } else {
                // Check if post exists
                const posts = getPosts();
                const post = posts.find(
                    (p) =>
                        p.slug === target ||
                        p.slug === target.replace(".md", ""),
                );

                if (post) {
                    router.navigate(`/posts/${post.slug}`);
                } else {
                    alert(`cd: ${target}: No such file or directory`);
                }
            }
        },
        home: () => {
            router.navigate("/");
        },
        theme: (args) => {
            const newTheme = args[0];
            if (
                ["", "amber", "green", "dracula", "monokai", "cmd"].includes(
                    newTheme,
                )
            ) {
                themeStore.set(newTheme);
            } else if (newTheme === "neo") {
                themeStore.set("");
            } else {
                alert(
                    `theme: ${newTheme}: Unknown theme. Try: neo, amber, green, dracula, monokai, cmd`,
                );
            }
        },
        clear: () => {
            // TODO: Implement output clearing logic if possible
            // For now just clear input, which happens anyway
        },
    };

    function handleKeydown(e) {
        if (e.key === "Enter") {
            const parts = input.trim().split(" ");
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);

            if (commands[cmd]) {
                commands[cmd](args);
            } else if (cmd !== "") {
                alert(`visitor@avej.com: command not found: ${cmd}`);
            }

            input = "";
        }
    }

    // Keep focus on input when clicking anywhere in the container
    function handleContainerClick() {
        inputElement?.focus();
    }
</script>

<div
    class="command-bar"
    onclick={handleContainerClick}
    role="button"
    tabindex="0"
    onkeydown={(e) => {
        if (e.key === "Enter") handleContainerClick();
    }}
>
    <span class="prompt">visitor@avej.com:~$</span>
    <input
        bind:this={inputElement}
        bind:value={input}
        onkeydown={handleKeydown}
        type="text"
        class="cmd-input"
        spellcheck="false"
        autocomplete="off"
    />
</div>

<style>
    .command-bar {
        padding: 1rem;
        border-top: 1px solid var(--border-color);
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        cursor: text;
    }

    .prompt {
        color: var(--accent-primary);
        margin-right: 0.5rem;
        white-space: nowrap;
    }

    .cmd-input {
        background: transparent;
        border: none;
        color: var(--fg-color);
        font-family: var(--font-mono);
        font-size: 1rem;
        flex: 1;
        outline: none;
        caret-color: var(--accent-secondary);
    }
</style>
