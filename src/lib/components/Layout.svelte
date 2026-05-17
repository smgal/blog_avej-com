<script>
  import { router } from "@/lib/router.svelte.js";

  let { children } = $props();

  const links = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/posts", label: "Board" },
    { path: "/about", label: "About" }
  ];
</script>

<div class="layout-container">
  <header class="navbar">
    <div class="nav-content">
      <div class="logo" onclick={() => router.navigate("/")}>
        AVEJ.COM
      </div>
      <nav class="nav-links">
        {#each links as link}
          <button 
            class="nav-btn {router.route === link.path || (router.route.startsWith('/posts') && link.path === '/posts') || (router.route.startsWith('/projects') && link.path === '/projects') ? 'active' : ''}" 
            onclick={() => router.navigate(link.path)}
          >
            {link.label}
          </button>
        {/each}
      </nav>
    </div>
  </header>

  <main class="main-content">
    {@render children()}
  </main>

  <footer class="footer">
    <div class="footer-content">
      &copy; {new Date().getFullYear()} smgal. All rights reserved.
    </div>
  </footer>
</div>

<style>
  .layout-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .navbar {
    background-color: var(--bg-color);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-content {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--accent-primary);
    cursor: pointer;
    letter-spacing: 0.05em;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-btn {
    background: none;
    border: none;
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 1rem;
    cursor: pointer;
    padding: 0.25rem 0;
    transition: color 0.2s;
  }

  .nav-btn:hover {
    color: var(--accent-primary);
  }

  .nav-btn.active {
    color: var(--accent-primary);
    border-bottom: 1px solid var(--accent-primary);
  }

  .main-content {
    flex: 1;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 3rem 2rem;
    width: 100%;
  }

  .footer {
    border-top: 1px solid var(--border-color);
    padding: 2rem;
    margin-top: auto;
  }

  .footer-content {
    max-width: var(--max-width);
    margin: 0 auto;
    color: var(--fg-muted);
    font-size: 0.85rem;
    text-align: center;
  }

  @media (max-width: 600px) {
    .nav-content {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
    
    .main-content {
      padding: 2rem 1rem;
    }
  }
</style>
