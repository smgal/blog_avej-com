<script>
    import { siteConfig } from "@/lib/data/site-config.js";
</script>

<div class="home-container">
    <!-- Hero Section -->
    <section class="hero structured-block">
        <div class="hero-desc">
            {#each siteConfig.hero.introText as line}
                <p>{line}</p>
            {/each}
        </div>

        <div class="hero-links">
            {#each siteConfig.hero.links as link}
                <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link"
                >
                    <span class="link-name">{link.name}:</span>
                    {link.icon}
                </a>
            {/each}
        </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="featured-projects">
        <h2 class="section-title structured-header">Featured Projects</h2>

        <div class="projects-grid">
            {#each siteConfig.featuredProjects as project}
                <div class="project-card structured-block">
                    <div class="project-image-wrapper">
                        <!-- We use a placeholder image if it doesn't load or is a placeholder text, but here we just render img -->
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            class="project-image"
                        />
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">{project.title}</h3>
                        <p class="project-desc">{project.description}</p>
                        <div class="project-tags">
                            {#each project.tags as tag}
                                <span class="tag">{tag}</span>
                            {/each}
                        </div>
                        <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="repo-link"
                        >
                            View Repository &rarr;
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</div>

<style>
    .home-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    /* Hero Section */
    .hero {
        text-align: left;
    }

    .hero-desc {
        --hero-text-color: #8fae8f; /* 약간의 녹색이 들어간 부드러운 올리브/민트 톤의 연초록색 */
        font-size: 1rem;
        color: var(--hero-text-color);
        line-height: 1;
        font-weight: 500;
        margin-bottom: 2rem;
    }

    .hero-desc p {
        margin: 0 0 0.5rem 0;
    }

    .hero-links {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
    }

    .social-link {
        font-size: 1rem;
        color: var(--accent-secondary);
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .social-link:hover {
        color: var(--accent-primary);
    }

    .link-name {
        color: var(--fg-muted);
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 0.05em;
    }

    /* Projects Grid */
    .projects-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    /* Project Card */
    .project-card {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 0; /* Override structured-block padding to allow full-width image */
        overflow: hidden;
    }

    .project-image-wrapper {
        width: 100%;
        aspect-ratio: 16 / 9;
        background-color: var(--bg-color); /* Fallback bg for missing images */
        border-bottom: 1px solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .project-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .project-info {
        padding: 0 1.5rem 1.5rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .project-title {
        font-size: 1.5rem;
        color: var(--accent-primary);
        margin: 0;
    }

    .project-desc {
        color: var(--fg-muted);
        font-size: 0.95rem;
        line-height: 1.6;
        margin: 0;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .tag {
        font-size: 0.8rem;
        color: var(--bg-color);
        background-color: var(--fg-muted);
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
        font-weight: 600;
    }

    .repo-link {
        margin-top: auto;
        display: inline-block;
        font-weight: bold;
        color: var(--accent-primary);
        text-transform: uppercase;
        font-size: 0.9rem;
        letter-spacing: 0.05em;
    }

    .repo-link:hover {
        color: var(--fg-color);
    }

    @media (min-width: 768px) {
        .projects-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
