<script>
  import "@/styles/variables.css";
  import TerminalWindow from "@/lib/components/TerminalWindow.svelte";
  import { router } from "@/lib/router.svelte.js";
  import { resolve } from "@/lib/routes.js";

  let CurrentPage = $derived(resolve(router.route));
</script>

<TerminalWindow>
  <CurrentPage />
</TerminalWindow>
