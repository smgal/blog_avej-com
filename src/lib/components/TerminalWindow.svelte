<script>
  import { themeStore } from "../stores/theme.svelte.js";
  import BreadcrumbNav from "./BreadcrumbNav.svelte";

  let { children } = $props();

  // Simple time formatter
  let time = $state(new Date().toLocaleTimeString());

  $effect(() => {
    const interval = setInterval(() => {
      time = new Date().toLocaleTimeString();
    }, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="terminal-container">
  <!-- Top Status Bar -->
  <header class="status-bar">
    <div class="left">
      <span class="item">USER: VISITOR</span>
      <span class="item">HOST: AVEJ.COM</span>
    </div>
    <div class="right">
      <span class="item">{time}</span>
      <span class="item">MODE: READ-ONLY</span>
      <!-- Theme Dropdown -->
      <select
        class="theme-select"
        value={themeStore.value}
        onchange={(e) => themeStore.set(e.target.value)}
      >
        <option value="">NEO FUTURE</option>
        <option value="amber">AMBER RETRO</option>
        <option value="green">HACKER GREEN</option>
        <option value="dracula">DRACULA</option>
        <option value="monokai">MONOKAI</option>
        <option value="cmd">CMD CLASSIC</option>
      </select>
    </div>
  </header>

  <!-- Main Output Area -->
  <main class="output-area">
    <div class="scanline"></div>
    {@render children()}
  </main>

  <!-- Bottom Breadcrumb Navigation -->
  <BreadcrumbNav />
</div>

<style>
  .terminal-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    border: 2px solid var(--border-color);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    background: rgba(0, 0, 0, 0.2);
  }

  .status-bar {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background-color: var(--border-color);
    color: var(--bg-color);
    font-weight: bold;
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  .status-bar .item {
    margin-right: 1.5rem;
  }

  .theme-select {
    background: var(--bg-color);
    color: var(--fg-color);
    border: 1px solid var(--dim-color);
    font-family: inherit;
    font-size: 0.8rem;
    padding: 0.1rem 0.5rem;
    cursor: pointer;
    margin-left: 0.5rem;
    outline: none;
    text-transform: uppercase;
  }

  .theme-select:hover,
  .theme-select:focus {
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }

  .theme-select option {
    background: var(--bg-color);
    color: var(--fg-color);
  }

  .output-area {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    position: relative;
    text-align: left; /* Force left alignment */
    align-items: flex-start;
    width: 100%;
  }

  /* Retro CRT CSS Scanline Effect */
  .scanline {
    width: 100%;
    height: 100px;
    z-index: 10;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(255, 255, 255, 0.02) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    opacity: 0.1;
    position: absolute;
    bottom: 100%;
    animation: scanline 10s linear infinite;
    pointer-events: none;
  }

  @keyframes scanline {
    0% {
      bottom: 100%;
    }
    100% {
      bottom: -100px;
    }
  }

  /* Command bar styles removed as BreadcrumbNav is now used */
</style>
