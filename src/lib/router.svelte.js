const isBrowser = typeof window !== 'undefined';

function createRouter() {
    let route = $state('/');

    if (isBrowser) {
        // Initialize from current hash
        const onHashChange = () => {
            let hash = window.location.hash.slice(1);
            if (!hash) hash = '/';
            route = hash;
        };

        window.addEventListener('hashchange', onHashChange);
        // Set initial value
        onHashChange();
    }

    return {
        get route() {
            return route;
        },
        navigate(path) {
            if (isBrowser) {
                window.location.hash = path;
            }
        }
    };
}

export const router = createRouter();
