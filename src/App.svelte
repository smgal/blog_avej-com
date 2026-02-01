<script>
  import "@/styles/variables.css";
  import TerminalWindow from "@/lib/components/TerminalWindow.svelte";
  import { router } from "@/lib/router.svelte.js";

  // Route Components
  import Home from "@/routes/Home.svelte";
  import PostList from "@/routes/PostList.svelte";
  import PostDetail from "@/routes/PostDetail.svelte";

  // Simple Route Matcher
  // Simple Route Matcher
  let CurrentPage = $derived(
    router.route === "/" || router.route === ""
      ? Home
      : router.route === "/posts"
        ? PostList
        : router.route.startsWith("/posts/")
          ? PostDetail
          : Home,
  );
</script>

<TerminalWindow>
  <CurrentPage />
</TerminalWindow>
