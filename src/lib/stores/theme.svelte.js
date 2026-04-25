const isBrowser = typeof window !== 'undefined';

// Single source of truth for theme metadata. Add a new theme here AND in
// src/styles/variables.css as a `[data-theme="<id>"]` block. The default
// theme has id = '' (no data-theme attribute, uses :root variables).
export const themes = [
    { id: '', label: 'Neo Future' },
    { id: 'amber', label: 'Amber Retro' },
    { id: 'green', label: 'Hacker Green' },
    { id: 'dracula', label: 'Dracula' },
    { id: 'monokai', label: 'Monokai' },
    { id: 'cmd', label: 'CMD Classic' },
];

function createThemeStore() {
    let initialTheme = '';
    if (isBrowser) {
        initialTheme = localStorage.getItem('theme') || '';
        if (initialTheme) {
            document.documentElement.setAttribute('data-theme', initialTheme);
        }
    }

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
