// import { browser } from '$app/environment'; // Note: In Vite SPA, we might not have $app. Using simple check.

const isBrowser = typeof window !== 'undefined';

function createThemeStore() {
    // Try to load from localStorage, default to 'neo-future' (empty string uses root defaults)
    let initialTheme = '';
    if (isBrowser) {
        initialTheme = localStorage.getItem('theme') || '';
        if (initialTheme) {
            document.documentElement.setAttribute('data-theme', initialTheme);
        }
    }

    // Svelte 5 Runes state
    let theme = $state(initialTheme);

    return {
        get value() {
            return theme;
        },
        set(newTheme) {
            theme = newTheme;
            if (isBrowser) {
                if (newTheme) {
                    document.documentElement.setAttribute('data-theme', newTheme);
                    localStorage.setItem('theme', newTheme);
                } else {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.removeItem('theme');
                }
            }
        }
    };
}

export const themeStore = createThemeStore();
