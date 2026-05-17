<script>
  import "@/styles/variables.css";
  import Layout from "@/lib/components/Layout.svelte";
  import { router } from "@/lib/router.svelte.js";
  import { resolve } from "@/lib/routes.js";

  let CurrentPage = $derived(resolve(router.route));
</script>

<Layout>
  <CurrentPage />
</Layout>
