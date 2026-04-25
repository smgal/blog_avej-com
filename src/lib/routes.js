import Home from '@/routes/Home.svelte';
import PostList from '@/routes/PostList.svelte';
import PostDetail from '@/routes/PostDetail.svelte';
import Projects from '@/routes/Projects.svelte';
import ProjectDetail from '@/routes/ProjectDetail.svelte';
import About from '@/routes/About.svelte';

// Ordered: the first matching pattern wins. Add routes here, not in App.svelte.
export const routes = [
    { pattern: /^\/?$/, component: Home },
    { pattern: /^\/posts\/?$/, component: PostList },
    { pattern: /^\/posts\/[^/]+\/?$/, component: PostDetail },
    { pattern: /^\/projects\/?$/, component: Projects },
    { pattern: /^\/projects\/[^/]+\/?$/, component: ProjectDetail },
    { pattern: /^\/about\/?$/, component: About },
];

export const fallback = Home;

export function resolve(route) {
    return routes.find((r) => r.pattern.test(route))?.component ?? fallback;
}
